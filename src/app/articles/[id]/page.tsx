import db from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    if (isNaN(Number(params.id))) {
        return notFound()
    }

    const article = await db.article.findUnique({ where: { id: Number(params.id) }, include: { author: true } })

    if (!article) {
        return notFound()
    }

    return (
        <div>
            <p>{article.id}</p>
            <p>{article.title}</p>
            <p>{article.author.email}</p>
        </div>
    )
}
