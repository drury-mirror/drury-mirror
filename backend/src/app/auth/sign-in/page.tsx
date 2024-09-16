'use client'

import { signIn } from '@/lib/auth/sign-in'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

export default function SignIn() {
    const form = useForm({
        defaultValues: {
            email: 'example@example.com',
            password: 'DevelopmentPassword1!'
        }
    })

    return (
        <div className={'w-full flex justify-center items-center pt-32'}>
            <Card className='w-[350px]'>
                <CardHeader>
                    <CardTitle>Sign in</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form id={'form'} action={signIn}>
                            <FormField
                                control={form.control}
                                name={'email'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={'password'}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type={'password'} {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <Button type='submit' form={'form'}>Sign in</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
