"use client"
import React, { useEffect, useState } from "react"
import HeroSection from "../Shared/HeroSection"
import Skeleton from "../Shared/Skeleton"
import TravelPlanCard from "./TravelPlanCard"
import Pagination from "../Shared/Pagination"
import { Code2 } from "lucide-react"

interface TravelPlan {
    id: string
    destination: string
    startDate: string
    endDate: string
    budget: number
    travelType: string
    description: string
    user: {
        name: string
        email: string
    }
}

const TravelPlansPageClient = () => {
    const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        loadTravelPlans()
    }, [currentPage])

    const loadTravelPlans = async () => {
        setIsLoading(true)
        try {
            const res = await fetch(`https://assignment8-api-server.vercel.app/api/v1/travel-plans?limit=12&page=${currentPage}`, {
                credentials: "include" // ✅ include cookie for auth
            })
            const data = await res.json()
            if (data.success) {
                setTravelPlans(data.data)
                setTotalPages(data.meta.totalPage || 1)
            }
        } catch (error) {
            console.error("Failed to fetch travel plans:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const filteredPlans = travelPlans.filter(plan => {
        return (
            plan.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
            plan.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })

    return (
        <>
            {/* Hero Section */}
            <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                title="Travel Plans"
                subtitle="Explore trips planned by users with budget, dates, and travel type"
                icon={<Code2 className="w-4 h-4 mr-2" />}
                topText="Travel"
            />

            {/* Travel Plans Section */}
            <section className="py-16 max-w-7xl mx-auto px-6">
                {isLoading ? (
                    <Skeleton />
                ) : filteredPlans.length === 0 ? (
                    <div className="text-center py-20">
                        <Code2 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-2xl font-semibold mb-2">No travel plans found</h3>
                        <p className="text-muted-foreground">
                            {searchQuery ? "Try a different search term" : "Travel plans coming soon"}
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPlans.map(plan => (
                                <TravelPlanCard key={plan.id} travelPlan={plan} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}
                            />
                        )}
                    </>
                )}
            </section>
        </>
    )
}

export default TravelPlansPageClient
