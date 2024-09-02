import React from 'react'
import { isLoggedIn } from '@/lib/auth/token'

export default async function SignedOut({ children }: { children: React.ReactNode }) {
    return (await isLoggedIn()) ? <></> : <>{children}</>
}
