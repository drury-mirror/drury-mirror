import db from '@/lib/db'
import { userHasRole } from '@/lib/auth/token'
import { notFound } from 'next/navigation'
import { Ellipsis } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'

export default async function Page() {
    if (!(await userHasRole('admin'))) {
        return notFound()
    }

    const users = await db.user.findMany({ include: { roles: true } })

    return <div className={'flex gap-4 flex-col p-4'}>
        {users.map(user => (
            <div key={user.id} className='flex rounded-lg border p-4 items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <Link href={'#'} className={'font-bold'}>{user.first_name} {user.last_name}</Link>
                    <div className=''>{user.email}</div>
                </div>
                <div className={'flex gap-4 items-center'}>
                    <span className={'text-muted-foreground'}>{user.roles.length > 0 ? user.roles[0].name[0].toUpperCase() + user.roles[0].name.substring(1) : 'None'}</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'secondary'} size={'icon'}>
                                <Ellipsis className='h-[1.2rem] w-[1.2rem]'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Manage</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Change role...</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Disable...</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Remove...</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        ))}
    </div>
}
