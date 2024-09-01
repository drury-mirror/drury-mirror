import db from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

export async function GET() {
    return Response.json(await db.user.findMany({ include: { roles: true } }))
}

const passwordSchema = (z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .refine((password) => /[A-Z]/.test(password), {
        message: 'Password must contain at least one uppercase character',
    })
    .refine((password) => /[a-z]/.test(password), {
        message: 'Password must contain at least one lowercase character',
    })
    .refine((password) => /[0-9]/.test(password), {
        message: 'Password must contain at least one digit',
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message: 'Password must contain at least one special character',
    }))
    .or(z
        .string()
        .min(16),
    )

const userSchema = z.object({
    email: z.string().email(),
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    password: passwordSchema,
    confirm_password: z.string(),
}).refine(user => user.password === user.confirm_password, {
    message: 'Passwords do not match', path: ['confirm_password'],
})

export async function POST(request: Request) {
    let data

    try {
        data = await request.json()
    } catch (error) {
        return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
    }

    const valid = userSchema.safeParse(data)

    if (!valid.success) {
        return Response.json({ error: valid.error }, { status: 400 })
    }

    if (await db.user.findUnique({ where: { email: valid.data.email } })) {
        return Response.json({ error: 'A user with that email already exists.' }, { status: 400 })
    }

    const salt = await bcrypt.genSalt(11)
    const hash = await bcrypt.hash(valid.data.password, salt)

    await db.user.create({
        data: {
            email: valid.data.email,
            first_name: valid.data.first_name,
            last_name: valid.data.last_name,
            hash: hash,
        },
    })

    return Response.json('Created user.', { status: 200 })
}
