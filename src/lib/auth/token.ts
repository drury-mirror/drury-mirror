import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export async function encrypt(user_id: string) {
    const jwtSecret = process.env.AUTH_SECRET

    if (!jwtSecret) {
        throw new Error('Please set the \'AUTH_SECRET\' environment variable in the \'.env\' file.')
    }

    return jwt.sign({ id: user_id }, jwtSecret, { expiresIn: '7d' })
}

export async function decrypt(token: string) {
    return jwt.decode(token)
}

export async function createToken(user_id: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const token = await encrypt(user_id)

    cookies().set('token', token, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/',
    })

    return token
}

export async function extendToken() {
    const token = cookies().get('token')?.value

    if (!token) {
        return null
    }

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

    cookies().set('token', token, {
        httpOnly: true,
        secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/',
    })
}

export function deleteToken() {
    cookies().delete('token')
}
