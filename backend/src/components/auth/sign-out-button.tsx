'use client'

import { signOut } from '@/lib/auth/sign-out'

export default function SignOutButton() {
    return <form className={'flex px-3 rounded border-gray-700 border h-10 hover:bg-gray-800'} action={signOut}>
        <button type={'submit'}>Sign out</button>
    </form>
}
