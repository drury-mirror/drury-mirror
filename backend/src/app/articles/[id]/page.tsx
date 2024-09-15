import db from '@/lib/db'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { id: string } }) {
    const article = await db.article.findUnique({ where: { id: params.id }, include: { author: true } })

    if (!article) {
        return notFound()
    }

    return (
        <div>
            <p>Title: {article.title}</p>
            <p>Author: {article.author.first_name} {article.author.last_name}</p>
        </div>
    )
}
