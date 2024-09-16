import db from '@/lib/db'
import Link from 'next/link'
import { verifyToken } from '@/lib/auth/token'

export default async function Home() {
    await verifyToken()

    const articles = await db.article.findMany()

    return <div>
        {articles.map(article => (
            <div key={article.id}>
                <Link href={`/articles/${article.id}`}>{article.title}</Link>
            </div>
        ))}
    </div>
}
