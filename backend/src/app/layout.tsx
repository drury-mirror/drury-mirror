import React from 'react'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import SignedIn from '@/components/auth/signed-in'
import SignedOut from '@/components/auth/signed-out'
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
import { Separator } from "@/components/ui/separator"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return <html lang='en'>
    <body className={inter.className}>
    <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
    >
        <header className={'h-16 flex px-4 items-center justify-between mx-auto max-w-[1536px]'}>
            <Link href={'/'}>Drury Mirror Admin</Link>
            <NavigationMenu>
                <NavigationMenuList>
                    <SignedIn userHasRoles={['admin']}>
                        <NavigationMenuItem>
                            <Link href='/' legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href='/admin/users' legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Users</NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </SignedIn>
                </NavigationMenuList>
            </NavigationMenu>
            <div className={'flex gap-2 h-10'}>
                <ModeToggle/>
                <SignedIn>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={'outline'} size={'icon'}><User className='h-[1.2rem] w-[1.2rem]'/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={'/profile'}><Settings className='mr-2 h-4 w-4'/>Settings</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem asChild>
                                <Link href={'/auth/sign-out'}><LogOut className='mr-2 h-4 w-4'/>Sign out</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SignedIn>
                <SignedOut>
                    <Separator orientation={'vertical'}/>
                    <Button variant={'outline'} asChild><Link href={'/auth/sign-in'}>Sign in</Link></Button>
                    <Button asChild><Link href={'/auth/sign-up'}>Sign up</Link></Button>
                </SignedOut>
            </div>
        </header>
        <main className={'mx-auto max-w-[1280px]'}>{children}</main>
    </ThemeProvider>
    </body>
    </html>
}
