import db from '@/lib/db'
import { userHasRole } from '@/lib/auth/token'
import { notFound } from 'next/navigation'

export default async function Page() {
    if (!(await userHasRole('admin'))) {
        return notFound()
    }

    const users = await db.user.findMany({ include: { roles: true } })

    return <div className={'flex gap-4 flex-col p-4'}>
        {users.map(user => (
            <div key={user.id} className={'border rounded border-gray-700 p-4'}>
                <div>Name: {user.first_name} {user.last_name}</div>
                <div>Email: {user.email}</div>
                <div>Roles: {user.roles.map(role => role.name[0].toUpperCase() + role.name.substring(1)).join(', ')}</div>
            </div>
        ))}
    </div>
}
