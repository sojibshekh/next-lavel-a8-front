// lib/auth.ts
"use server";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAuth() {

    const cookieStore = await cookies()

    const token = cookieStore.get('accessToken')?.value

    if (!token) {
        redirect('/login')
    }

    return token
}