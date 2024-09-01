import db from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
// import { readFile } from 'node:fs/promises'
// import { marked } from 'marked'
// import DOMPurify from 'isomorphic-dompurify'

export default async function Page({ params }: { params: { id: string } }) {
    const article = await db.article.findUnique({ where: { id: params.id[0] }, include: { author: true } })

    if (!article) {
        return notFound()
    }

    if (params.id.length > 1 && params.id[1] !== article.slug || params.id.length > 2) {
        redirect(`/articles/${article.id}/${article.slug}`)
    }

    // const markdown_file = await readFile(`./public/articles/${params.id}/article.md`, 'utf-8')
    // const parsed_html = await marked.parse(markdown_file)
    // const sanitized_html = DOMPurify.sanitize(parsed_html)

    return (
        <div>
            <p>Title: {article.title}</p>
            <p>Author: {article.author.first_name} {article.author.last_name}</p>
            {/*<div dangerouslySetInnerHTML={{ __html: sanitized_html }}></div>*/}
        </div>
    )
}
