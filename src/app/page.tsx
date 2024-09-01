import db from '@/lib/db'
import Link from 'next/link'

export default async function Home() {
    const articles = await db.article.findMany()

    return (
        <div>
            {articles.map(article => (
                <div key={article.id}>
                    <Link href={`/articles/${article.id}/${article.slug}`}>{article.title}</Link>
                </div>
            ))}
        </div>
    )
}
