'use server'

import { deleteToken } from '@/lib/auth/token'
import { redirect } from 'next/navigation'

export async function signOut() {
    await deleteToken()
    redirect('/')
}
