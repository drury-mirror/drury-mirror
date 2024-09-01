import db from '@/lib/db'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const signInSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export async function POST(request: Request) {
    let data

    try {
        data = await request.json()
    } catch (error) {
        return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
    }

    const valid = signInSchema.safeParse(data)

    if (!valid.success) {
        return Response.json({ error: valid.error }, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { email: valid.data.email } })

    if (!user || !(await bcrypt.compare(valid.data.password, user.password_hash))) {
        return Response.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    const jwtSecret = process.env.AUTH_SECRET

    if (!jwtSecret) {
        console.log('Please set the \'AUTH_SECRET\' environment variable in the \'.env\' file.')
        return Response.json({ error: 'Internal server error.' }, { status: 500 })
    }

    const token = jwt.sign({ id: user.id }, jwtSecret)

    return Response.json({ token: token }, { status: 200 })
}
