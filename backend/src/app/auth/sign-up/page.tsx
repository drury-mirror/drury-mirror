'use client'

import { signUp } from '@/lib/auth/sign-up'

export default function SignUp() {
    return <form action={signUp}>
        <div>
            <label htmlFor='email'>Email</label>
            <input className={'text-black'} id='email' name='email' type='email' placeholder='Email'
                   defaultValue={'example@example.com'}/>
        </div>
        <div>
            <label htmlFor='first_name'>First name</label>
            <input className={'text-black'} id='first_name' name='first_name' type='text' placeholder='First name'
                   defaultValue={'Foo'}/>
        </div>
        <div>
            <label htmlFor='last_name'>Last name</label>
            <input className={'text-black'} id='last_name' name='last_name' type='text' placeholder='Last name'
                   defaultValue={'Bar'}/>
        </div>
        <div>
            <label htmlFor='password'>Password</label>
            <input className={'text-black'} id='password' name='password' type='password' defaultValue={'DevelopmentPassword1!'}/>
        </div>
        <div>
            <label htmlFor='confirm_password'>Confirm password</label>
            <input className={'text-black'} id='confirm_password' name='confirm_password' type='password' defaultValue={'DevelopmentPassword1!'}/>
        </div>
        <button type='submit'>Sign Up</button>
    </form>
}
