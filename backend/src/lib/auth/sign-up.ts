'use server'

import db from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { createToken } from '@/lib/auth/token'
import { redirect } from 'next/navigation'

const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(128)
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase character' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase character' })
    .regex(/[0-9]/, { message: 'Password must contain at least one digit' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character' })

const userSchema = z.object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    password: passwordSchema,
    confirm_password: z.string(),
}).refine(user => user.password === user.confirm_password, {
    message: 'Passwords do not match', path: ['confirm_password'],
})

export async function hashPassword(password: string) {
    return bcrypt.hash(password, 11)
}

export async function signUp(formData: FormData) {
    const data = {
        email: formData.get('email'),
        first_name: formData.get('first_name'),
        last_name: formData.get('last_name'),
        password: formData.get('password'),
        confirm_password: formData.get('password'),
    }

    const valid = userSchema.safeParse(data)

    if (!valid.success) {
        return { error: valid.error }
    }

    if (await db.user.findUnique({ where: { email: valid.data.email } })) {
        throw new Error('A user with that email already exists.')
    }

    const passwordHash = await hashPassword(valid.data.password)

    const user = await db.user.create({
        data: {
            email: valid.data.email,
            first_name: valid.data.first_name,
            last_name: valid.data.last_name,
            password_hash: passwordHash,
            role: { connect: { name: 'none' } },
        },
    })

    await createToken(user.id)
    redirect('/')
}
