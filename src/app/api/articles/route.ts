import db from '@/lib/db'
import { z } from 'zod'

export async function GET() {
    return Response.json(await db.article.findMany({ include: { author: true } }))
}

const articleSchema = z.object({
    title: z.string().min(1),
})

export async function POST(request: Request) {
    let data

    try {
        data = await request.json()
    } catch (error) {
        return Response.json({ error: 'Invalid JSON.' }, { status: 400 })
    }

    const valid = articleSchema.safeParse(data)

    if (!valid.success) {
        return Response.json({ error: 'Invalid article.' }, { status: 400 })
    }

    await db.article.create({
        data: {
            user_id: (await db.user.findFirst())?.id || '',
            title: valid.data.title,
            slug: 'e'
        },
    })

    return Response.json('Created article.', { status: 200 })
}
