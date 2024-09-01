import db from '@/lib/db'
import { z } from 'zod'

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

    if (!user || valid.data.password !== user.hash) {
        return Response.json({ error: 'Incorrect email or password.' }, { status: 401 })
    }

    return Response.json({ email: user.email }, { status: 200 })
}
