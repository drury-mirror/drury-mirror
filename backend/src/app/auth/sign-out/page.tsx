'use client'

import { signOut } from '@/lib/auth/sign-out'

export default function Page() {
    signOut().then(_r => {
        return
    })
}
