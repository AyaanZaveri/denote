import { NextResponse } from 'next/server'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase'

export async function middleware(req: any) {
  const [user] = useAuthState(auth)

  // If the user is valid.
  if (user) {
    // Continue to the app.
    return NextResponse.next()
  }

  // If the token is invalid.
  if (!user && req.nextUrl.pathname !== '/login') {
    // Redirect to the login page.
    return NextResponse.redirect('/login')
  }

  if (user && req.nextUrl.pathname === '/login') {
    // Redirect to the home page.
    return NextResponse.redirect('/')
  }
}
