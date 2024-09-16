'use client'

import { signOut } from '@/lib/auth/sign-out'
import { Button } from '@/components/ui/button'

export default function SignOutButton() {
    return <form action={signOut}>
        <Button type={'submit'} variant={'outline'}>Sign out</Button>
    </form>
}
