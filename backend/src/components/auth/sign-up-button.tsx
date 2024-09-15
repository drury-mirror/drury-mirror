import Link from 'next/link'

export default function SignUpButton() {
    return <div className={'flex px-3 rounded border-gray-700 border h-10 hover:bg-gray-800 items-center'}>
        <Link href={'/auth/sign-up'}>Sign up</Link>
    </div>
}
