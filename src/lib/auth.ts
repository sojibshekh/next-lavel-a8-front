// lib/auth.ts
"use server";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAuth() {

    const cookieStore = await cookies()

    console.log('Cookies:', cookieStore.getAll())
    const token = cookieStore.get('accessToken')?.value

    console.log('Access Token:', token)

    if (!token) {
        redirect('/login')
    }

    return token
}