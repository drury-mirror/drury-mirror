import db from '@/lib/db'
import { userHasRole } from '@/lib/auth/token'
import { notFound } from 'next/navigation'
import { Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'
import { RoleSelect } from '@/app/admin/users/role-select'

export default async function Page() {
    if (!(await userHasRole('admin'))) {
        return notFound()
    }

    const users = await db.user.findMany({ include: { role: true } })
    const roles = await db.role.findMany()

    return <div className={'flex gap-4 flex-col p-4 max-w-[1024px] mx-auto'}>
        {users.map(user => (
            <div key={user.id} className='flex rounded-lg border p-4 items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <Link href={'#'} className={''}>{user.first_name} {user.last_name}</Link>
                    <div className={'text-muted-foreground'}>{user.email}</div>
                </div>
                <div className={'flex gap-4 items-center'}>
                    <RoleSelect roles={roles.map(role => ({ value: role.name, description: role.description}))} currentValue={user.role.name}/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'} size={'icon'}>
                                <Ellipsis className='h-[1.2rem] w-[1.2rem]'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={'end'}>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Edit</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Disable...</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Delete...</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        ))}
    </div>
}
