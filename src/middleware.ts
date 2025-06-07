import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicPaths = ['/sign-in', '/sign-up']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = req.cookies.get('token')?.value

  if (publicPaths.includes(pathname)) {
    if (token) {
        
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next() 
  }

  if (!token) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/product-details/:path*', '/sign-in', '/sign-up'],
}
