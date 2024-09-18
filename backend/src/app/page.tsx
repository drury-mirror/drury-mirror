import db from '@/lib/db'
import Link from 'next/link'
import { verifyToken } from '@/lib/auth/token'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Ellipsis, Plus } from 'lucide-react'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

export default async function Home() {
    await verifyToken()

    const articles = await db.article.findMany({ include: { author: true } })

    return <div>
        <div className={'flex gap-3 justify-between p-4'}>
            <Button asChild><Link href={'/articles/new'}><Plus className='mr-2 h-4 w-4'/>New article</Link></Button>
            <Input placeholder={'Search'}/>
            <Select>
                <SelectTrigger className={'w-[180px]'}>
                    <SelectValue placeholder={'Filter'}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='published'>Published</SelectItem>
                        <SelectItem value='author'>Author</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className={'w-[180px]'}>
                    <SelectValue placeholder={'Sort'}/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value='published'>Published</SelectItem>
                        <SelectItem value='author'>Author</SelectItem>
                        <SelectItem value='date'>Date</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
        <div className='flex flex-col gap-4 p-4 pt-0'>
            {articles.map(article => (
                <div key={article.id} className={'flex rounded-lg border justify-between p-4 gap-4'}>
                    <Image className={'rounded'} alt={''} src={`https://picsum.photos/seed/${article.id}/128/128`} width={128} height={128}/>
                    <Link href={`/articles/${article.id}`} className='flex flex-col gap-1 flex-grow'>
                        <span>{article.title}</span>
                        <span className={'text-muted-foreground'}>{article.created_at.toDateString()}</span>
                        <span
                            className={'text-muted-foreground'}>By {article.author.first_name} {article.author.last_name}</span>
                    </Link>
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
                                <Link href={'#'}>Publish...</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={'#'}>Delete...</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
        </div>
    </div>
}
