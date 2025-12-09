import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

import { cookies } from "next/headers";
import Link from "next/link";
import { NavUser } from "./NavUser";

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            items: [
                {
                    title: "Overview",
                    url: "/dashboard",
                },
                {
                    title: "Add Blog",
                    url: "/dashboard/add-blog",
                },
                {
                    title: "Add Project",
                    url: "/dashboard/add-project",
                },
            ],
        }
    ],
};

export async function getCurrentUserServer() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('accessToken')?.value

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
            headers: {
                Authorization: `${token}`
            },
            cache: 'no-store'
        })

        if (!res.ok) return null
        return await res.json()
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null
    }
}

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    //  const userInfo = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`)
    const userInfo = await getCurrentUserServer();
    const user = userInfo.data;

    return (
        <Sidebar {...props}>
            <SidebarHeader>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>{item.title}</Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}