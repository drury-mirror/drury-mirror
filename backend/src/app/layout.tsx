import React from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import SignedIn from '@/components/auth/signed-in'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Button } from '@/components/ui/button'
import { LogOut, Settings, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/ui/mode-toggle-button'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Drury Mirror',
    icons: {
        icon: [
            {
                media: '(prefers-color-scheme: light)',
                url: '/images/favicon/favicon-light.png',
                href: '/images/favicon/favicon-light.png',
            },
            {
                media: '(prefers-color-scheme: dark)',
                url: '/images/favicon/favicon-dark.png',
                href: '/images/favicon/favicon-dark.png',
            },
        ],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang='en'>
    <body className={inter.className}>
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
        <SignedIn>
            <header className={'border-b'}>
                <div className={'h-16 flex items-center justify-between mx-auto max-w-[1280px] px-4'}>
                    <div className='flex gap-2 items-center'>
                        <Link className={'hover:scale-105'} href={'/'}>
                            <Image src={'/images/logo/logo.png'} alt={'Drury Mirror'} width={32} height={32}/>
                        </Link>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <SignedIn validRoles={['admin', 'publisher']}>
                                    <NavigationMenuItem>
                                        <Link href='/' legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </SignedIn>
                                <SignedIn validRoles={['admin']}>
                                    <NavigationMenuItem>
                                        <Link href='/admin/users' legacyBehavior passHref>
                                            <NavigationMenuLink
                                                className={navigationMenuTriggerStyle()}>Users</NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                </SignedIn>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className={'flex gap-2 h-10'}>
                        <ModeToggle/>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'outline'} size={'icon'}><User
                                    className='h-[1.2rem] w-[1.2rem]'/></Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={'end'}>
                                <DropdownMenuItem asChild>
                                    <Link href={'/profile'}><Settings className='mr-2 h-4 w-4'/>Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem asChild>
                                    <Link href={'/auth/sign-out'}><LogOut className='mr-2 h-4 w-4'/>Sign out</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>
        </SignedIn>
        <main className={'mx-auto max-w-[1280px]'}>{children}</main>
    </ThemeProvider>
    </body>
    </html>
}
