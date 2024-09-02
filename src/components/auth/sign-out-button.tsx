'use client'

import { signOut } from '@/lib/auth/sign-out'

export default function SignOutButton() {
    return <form action={signOut}>
        <button type={'submit'}>Sign out</button>
    </form>
}
