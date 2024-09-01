import db from '@/lib/db'
import Link from 'next/link'
import { SignInButton } from '@/components/auth/signin-button'

export default async function Home() {
    const articles = await db.article.findMany()

    return (
        <div>
            <SignInButton/>
            {articles.map(article => (
                <div key={article.id}>
                    <Link href={`articles/${article.id}`}>{article.title}</Link>
                </div>
            ))}
        </div>
    )
}
