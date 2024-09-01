import db from '@/lib/db'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    if (isNaN(Number(params.id))) {
        return Response.json(`Invalid request: '${params.id}' is not a number.`, { status: 400 })
    }

    const article = await db.article.findUnique({ where: { id: Number(params.id) }, include: { author: true } })

    if (!article) {
        return Response.json('Article not found.', { status: 404 })
    }

    return Response.json(article)
}
