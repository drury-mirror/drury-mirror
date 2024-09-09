import db from '@/lib/db'
import { userHasRole } from '@/lib/auth/token'
import { notFound } from 'next/navigation'

export default async function Page() {
    if (!(await userHasRole('admin'))) {
        return notFound()
    }

    const users = await db.user.findMany()

    return <div>
        {users.map(user => (
            <div key={user.id}>
                <span>{user.email}</span>
                <span>{user.first_name}</span>
                <span>{user.last_name}</span>
            </div>
        ))}
    </div>
}
