import db from '@/lib/db'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    const article = await db.article.findUnique({ where: { id: params.id }, include: { author: true } })

    if (!article) {
        return Response.json('Article not found.', { status: 404 })
    }

    return Response.json(article)
}
