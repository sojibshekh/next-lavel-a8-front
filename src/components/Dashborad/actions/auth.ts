"use server"
import { cookies } from "next/headers"

export async function handleLogout() {
    try {
        // Optional: Call backend logout endpoint
        const cookieStore = await cookies()
        const token = cookieStore.get('accessToken')?.value

        if (token) {
            try {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                })
            } catch (error) {
                // Ignore backend errors, still clear cookies
                console.error('Backend logout failed:', error)
            }
        }

        // Clear cookies
        cookieStore.delete('accessToken')
        cookieStore.delete('refreshToken')

        return { success: true }
    } catch (error) {
        console.error('Logout error:', error)
        return { success: false, message: 'Logout failed' }
    }
}