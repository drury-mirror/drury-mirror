'use server'

import db from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createToken } from '@/lib/auth/token'
import { redirect } from 'next/navigation'

const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export async function signIn(formData: FormData) {
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const valid = signInSchema.safeParse(data)

    if (!valid.success) {
        return { error: valid.error }
    }

    const user = await db.user.findUnique({ where: { email: valid.data.email } })

    if (!user || !(await bcrypt.compare(valid.data.password, user.password_hash))) {
        return { error: 'Invalid username or password' }
    }

    await createToken(user.id)
    redirect('/')
}
