import React from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
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
    <header className={'h-16 bg-gray-900 flex px-4 items-center justify-between'}>
        <div>
            <Link href={'/'}>Drury Mirror Admin</Link>
        </div>
        <div className={'flex gap-4'}>
            <SignedIn userHasRoles={['admin']}>
                <div className={'flex px-3 rounded border-gray-700 border h-10 hover:bg-gray-800 items-center'}>
                    <Link href={'/admin/users'}>Users</Link>
                </div>
            </SignedIn>
            <SignedIn>
                <div className={'flex px-3 rounded border-gray-700 border h-10 hover:bg-gray-800 items-center'}>
                    <Link href={'/profile'}>Profile</Link>
                </div>
                <SignOutButton/>
            </SignedIn>
            <SignedOut>
                <SignInButton/>
                <SignUpButton/>
            </SignedOut>
        </div>
    </header>
    <main>{children}</main>
    </body>
    </html>
}
