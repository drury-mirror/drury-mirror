'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import db from '@/lib/db'

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

export async function deleteToken() {
    cookies().delete('token')
}

export async function verifyToken() {
    const token = cookies().get('token')?.value

    if (!token) {
        redirect('/auth/sign-in')
    }

    // await extendToken()
    return decrypt(token)
}

export async function getUser(user_id: string) {
    return db.user.findUnique({ where: { id: user_id }, include: { roles: true } })
}

export async function userHasRole(role: string) {
    const token = await verifyToken()

    if (!token || typeof token === 'string') {
        return false
    }

    const user = await getUser(token.id)

    if (!user) {
        return false
    }

    for (const user_role of user.roles) {
        if (user_role.name === role) {
            return true
        }
    }

    return false
}

export async function isLoggedIn() {
    return cookies().get('token') !== undefined
}
