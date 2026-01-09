"use server"
import { cookies } from "next/headers"

export async function handleLogin(email: string, password: string) {
    try {
        // Call your backend API here for cookie setup
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            body: JSON.stringify({ email, password }),
        })

        if (!response.ok) {
            const error = await response.json()
            return {
                success: false,
                message: error.message || 'Login failed'
            }
        }

        const data = await response.json()

        // Set cookies on server side

        // const cookieStore = await cookies()

        // if ( data.data?.accessToken) {
        //     console.log("Setting access token cookie:", data.data.accessToken);
        //     cookieStore.set('accessToken', data.data.accessToken, {
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'none',
        //         path: '/',
        //     })
        // }

        // if (data.data?.refreshToken) {
        //     console.log("Setting refresh token cookie:", data.data.refreshToken);
        //     cookieStore.set('refreshToken', data.data.refreshToken, {
        //         httpOnly: true,
        //         secure: true,        // MUST be true for SameSite=None
        //         sameSite: "none",      // required for cross-site
        //         path: '/',
        //     })
        // }

        return {
            success: true,
            user: data.data?.user
        }
    } catch (error) {
        console.error('Login error:', error)
        return {
            success: false,
            message: 'An error occurred. Please try again.'
        }
    }
}