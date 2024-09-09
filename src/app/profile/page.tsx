import { getUser, verifyToken } from '@/lib/auth/token'
import { notFound } from 'next/navigation'

export default async function Page() {
    const token = await verifyToken()

    if (!token || typeof token === 'string') {
        return notFound()
    }

    const user = await getUser(token.id)

    if (!user) {
        return notFound()
    }

    return <div className={'flex gap-4 flex-col p-4'}>
        <div className={'border rounded border-gray-700 p-4'}>
            <div>Name: {user.first_name} {user.last_name}</div>
            <div>Email: {user.email}</div>
            <div>Roles: {user.roles.map(role => role.name[0].toUpperCase() + role.name.substring(1)).join(', ')}</div>
        </div>
    </div>
}
