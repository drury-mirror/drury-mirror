'use client'

import { signIn } from '@/lib/auth/sign-in'

export default function SignIn() {
    return <form action={signIn}>
        <div>
            <label htmlFor='email'>Email</label>
            <input className={'text-black'} id='email' name='email' type='email' placeholder='Email'
                   defaultValue={'example@example.com'}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input className={'text-black'} id='password' name='password' type='password' defaultValue={'DevelopmentPassword1!'}/>
        </div>
        <button type='submit'>Sign In</button>
    </form>
}
