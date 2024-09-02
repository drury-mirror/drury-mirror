import React from 'react'
import { isLoggedIn } from '@/lib/auth/token'

export default async function SignedIn({ children }: { children: React.ReactNode }) {
    return (await isLoggedIn()) ? <>{children}</> : <></>
}
