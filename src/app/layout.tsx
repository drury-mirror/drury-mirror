import React from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import SignedIn from '@/components/auth/signed-in'
import SignOutButton from '@/components/auth/sign-out-button'
import SignedOut from '@/components/auth/signed-out'
import SignInButton from '@/components/auth/sign-in-button'
import SignUpButton from '@/components/auth/sign-up-button'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang='en'>
    <body className={inter.className}>
    <header>
        <SignedIn>
            <SignOutButton/>
        </SignedIn>
        <SignedOut>
            <SignInButton/>
            <SignUpButton/>
        </SignedOut>
    </header>
    <main>{children}</main>
    </body>
    </html>
}
