// import db from '@/lib/db'
// import Link from 'next/link'
//
// export default async function Home() {
//     const articles = await db.article.findMany()
//
//     return (
//         <div>
//             <form
//                 action={async (formData) => {
//                     'use server'
//                     await signIn('resend', formData)
//                 }}
//             >
//                 <input className={'text-black'} type='text' name='email' placeholder='Email'/>
//                 <button type='submit'>Sign in with Resend</button>
//             </form>
//             {articles.map(article => (
//                 <div key={article.id}>
//                     <Link href={`articles/${article.id}`}>{article.title}</Link>
//                 </div>
//             ))}
//         </div>
//     )
// }

import { SignInButton } from '@/components/auth/signin-button'

export default function Home() {
    return <div>
        <SignInButton/>
    </div>
}
