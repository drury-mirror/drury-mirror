import db from '@/lib/db'
import { userHasRole } from '@/lib/auth/token'
import { notFound } from 'next/navigation'
import { Ellipsis, Pencil, Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { RoleSelect, Role } from '@/app/admin/users/combobox'

export default async function Page() {
    if (!(await userHasRole('admin'))) {
        return notFound()
    }

    const users = await db.user.findMany({ include: { roles: true } })
    const roles = await db.role.findMany()

    const emptyRole: Role = {
        value: 'none',
        description: 'Has no permissions.'
    }

    return <div className={'flex gap-4 flex-col p-4 max-w-[1024px] mx-auto'}>
        {users.map(user => (
            <div key={user.id} className='flex rounded-lg border p-4 items-center justify-between'>
                <div className='flex flex-col gap-2'>
                    <Link href={'#'} className={'font-bold'}>{user.first_name} {user.last_name}</Link>
                    <div className=''>{user.email}</div>
                </div>
                <div className={'flex gap-4 items-center'}>
                    {/*<Select defaultValue={user.roles.length > 0 ? user.roles[0].id : 'none'}>*/}
                    {/*    <SelectTrigger className='w-[180px]'>*/}
                    {/*        <SelectValue placeholder='Role'/>*/}
                    {/*    </SelectTrigger>*/}
                    {/*    <SelectContent>*/}
                    {/*        <SelectItem value={'none'} >*/}
                    {/*            <div className='flex gap-0 flex-col'>*/}
                    {/*                <span className={'capitalize'}>None</span>*/}
                    {/*                <span className={'text-muted-foreground'}>Has no permissions.</span>*/}
                    {/*            </div>*/}
                    {/*        </SelectItem>*/}
                    {/*        {roles.map(role => (*/}
                    {/*            <SelectItem key={role.id} value={role.id}>*/}
                    {/*                <div className='flex gap-0 flex-col'>*/}
                    {/*                    <span className={'capitalize'}>{role.name}</span>*/}
                    {/*                    <span className={'text-muted-foreground'}>{role.description}</span>*/}
                    {/*                </div>*/}
                    {/*            </SelectItem>*/}
                    {/*        ))}*/}
                    {/*    </SelectContent>*/}
                    {/*</Select>*/}
                    <RoleSelect roles={[emptyRole].concat(roles.map(role => ({ value: role.name, description: role.description})))} currentValue={user.roles.length > 0 ? user.roles[0].name : emptyRole.value}/>
                    {/*<Button variant={'outline'} size={'icon'}>*/}
                    {/*    <Pencil className='h-[1.2rem] w-[1.2rem]'/>*/}
                    {/*</Button>*/}
                    {/*<Button variant={'outline'} size={'icon'}>*/}
                    {/*    <Trash className='h-[1.2rem] w-[1.2rem] text-destructive'/>*/}
                    {/*</Button>*/}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'ghost'} size={'icon'}>
                                <Ellipsis className='h-[1.2rem] w-[1.2rem]'/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={'end'}>
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
