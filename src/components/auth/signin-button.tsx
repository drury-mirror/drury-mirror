'use client'

import { login } from '@/components/auth/signin'

export function SignInButton() {
    const click = async () => {
        await login()
    }

    return <button onClick={() => click()}>
        Sign in
    </button>
}
