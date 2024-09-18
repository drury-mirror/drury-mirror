import React from 'react'
import { isLoggedIn, userHasRole } from '@/lib/auth/token'

export default async function SignedIn({ children, validRoles }: { children: React.ReactNode, validRoles?: string[] }) {
    if (await isLoggedIn()) {
        if (!validRoles) {
            return <>{children}</>
        }

        for (const role of validRoles) {
            if (await userHasRole(role)) {
                return <>{children}</>
            }
        }
    }

    return <></>
    // return (await isLoggedIn() && (!requiredRole || await userHasRole(requiredRole))) ? <>{children}</> : <></>
}
