import Link from 'next/link'

export default function SignInButton() {
    return <div className={'flex px-3 rounded border-gray-700 border h-10 hover:bg-gray-800 items-center'}>
        <Link href={'/auth/sign-in'}>Sign in</Link>
    </div>
}
