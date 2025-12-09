"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
    currentPage: number
    setCurrentPage: (page: number) => void
    totalPages: number
}

export default function Pagination({ currentPage, setCurrentPage, totalPages }: PaginationProps) {
    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages: (number | string)[] = []
        const maxVisible = 5

        if (totalPages <= maxVisible) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Calculate range around current page
            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            // Adjust range if at start or end
            if (currentPage <= 3) {
                end = 4
            }
            if (currentPage >= totalPages - 2) {
                start = totalPages - 3
            }

            // Add ellipsis after first page if needed
            if (start > 2) {
                pages.push('...')
            }

            // Add middle pages
            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            // Add ellipsis before last page if needed
            if (end < totalPages - 1) {
                pages.push('...')
            }

            // Always show last page
            pages.push(totalPages)
        }

        return pages
    }

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return
        setCurrentPage(page)
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9 w-9"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => handlePageChange(page)}
                            className="h-9 w-9"
                        >
                            {page}
                        </Button>
                    ) : (
                        <span key={index} className="px-2 text-muted-foreground">
                            {page}
                        </span>
                    )
                ))}
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9 w-9"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}