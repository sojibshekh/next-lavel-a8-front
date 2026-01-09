"use client"
import {
    ChevronsUpDown,
    LogOut,
    User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
    Avatar,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { toast } from "sonner";
import { handleLogout } from "./actions/auth";



export function NavUser({ user }: { user: { name: string, email: string } }) {
    const { isMobile } = useSidebar()
    const router = useRouter()

    const handleLogOut = async () => {
        try {
            const result = await handleLogout()

            if (result.success) {
                toast.success("Logged out successfully!")

                // Redirect to login
                router.push("/login")
                router.refresh()
            } else {
                toast.error("Logout failed. Please try again.")
            }
        } catch (error) {
            console.error('Logout error:', error)
            toast.error("An error occurred during logout")
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <User />
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user?.name}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuItem onClick={handleLogOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
