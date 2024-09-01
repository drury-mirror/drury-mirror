import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import db from '@/lib/db'
import type { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        Credentials({
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'example@example.com',
                },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                return { id: 'e', name: 'Test', email: 'example@example.com' }
            },
        }),
    ],
})
