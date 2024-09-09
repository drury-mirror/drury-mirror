import React from 'react'
import { isLoggedIn, userHasRole } from '@/lib/auth/token'

export default async function SignedIn({ children, userHasRoles }: { children: React.ReactNode, userHasRoles?: string[] }) {
    if (!userHasRoles) {
        userHasRoles = []
    }

    if (await isLoggedIn()) {
        let userHasAllRoles = true

        for (const role of userHasRoles) {
            if (!(await userHasRole(role))) {
                userHasAllRoles = false
            }
        }

        if (userHasAllRoles) {
            return <>{children}</>
        }
    }

    return <></>
}
