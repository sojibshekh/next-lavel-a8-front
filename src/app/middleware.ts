// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    console.log('Middleware running for:', request.nextUrl.pathname)

    const token = request.cookies.get('accessToken')?.value
    console.log('Token found:', !!token)

    const { pathname } = request.nextUrl

    const protectedRoutes = ['/dashboard']
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    )

    console.log('Is protected route:', isProtectedRoute)

    if (isProtectedRoute && !token) {
        console.log('Redirecting to login')
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    if (token && pathname === '/login') {
        console.log('Redirecting to dashboard')
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/login']
}