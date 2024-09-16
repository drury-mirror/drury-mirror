import db from '@/lib/db'
import { userHasRole } from '@/lib/auth/token'
import { notFound } from 'next/navigation'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export default async function Page() {
    if (!(await userHasRole('admin'))) {
        return notFound()
    }

    const users = await db.user.findMany({ include: { roles: true } })
    const roles = await db.role.findMany()

    return <div className={'flex gap-4 flex-col p-4'}>
        {users.map(user => (
            <div key={user.id} className={'border rounded border-gray-700 p-4'}>
                <div>Name: {user.first_name} {user.last_name}</div>
                <div>Email: {user.email}</div>
                <div>Role</div>
                <Select defaultValue={user.roles.length > 0 ? user.roles[0].id : 'none'}>
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Role'/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={'none'}>None</SelectItem>
                        {roles.map(role => (
                            <SelectItem key={role.id} value={role.id}>
                                {role.name[0].toUpperCase() + role.name.substring(1)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>
        ))}
    </div>
}
