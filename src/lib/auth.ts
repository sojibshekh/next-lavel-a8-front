// lib/auth.ts
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireAuth() {

    const cookieStore = await cookies()
      console.log("cookieStore",cookieStore);
    const token = cookieStore.get('accessToken')?.value
     console.log("token",token);
    if (!token) {
        redirect('/login')
    }

    return token
}