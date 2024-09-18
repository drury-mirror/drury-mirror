import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

async function hashPassword(password: string) {
    return bcrypt.hash(password, 11)
}

async function createRoles() {
    await db.role.create({
        data: {
            name: 'admin',
            description: 'Can delete users and manage their roles.',
        },
    })

    await db.role.create({
        data: {
            name: 'publisher',
            description: 'Can create, edit, and delete articles.',
        },
    })

    await db.role.create({
        data: {
            name: 'none',
            description: 'Has no permissions.',
        },
    })
}

async function createUsers() {
    await db.user.create({
        data: {
            email: 'example@example.com',
            first_name: 'Admin',
            last_name: 'User',
            password_hash: await hashPassword('DevelopmentPassword1!'),
            role: { connect: { name: 'admin' } },
        },
    })

    await db.user.create({
        data: {
            email: 'example2@example.com',
            first_name: 'Publisher',
            last_name: 'User',
            password_hash: await hashPassword('DevelopmentPassword1!'),
            role: { connect: { name: 'publisher' } },
        },
    })

    await db.user.create({
        data: {
            email: 'example3@example.com',
            first_name: 'Default',
            last_name: 'User',
            password_hash: await hashPassword('DevelopmentPassword1!'),
            role: { connect: { name: 'none' } },
        },
    })
}

async function createArticles() {
    await db.article.create({
        data: {
            title: 'Article 1',
            author: { connect: { email: 'example@example.com' } },
        },
    })

    await db.article.create({
        data: {
            title: 'Article 2',
            author: { connect: { email: 'example2@example.com' } },
        },
    })

    await db.article.create({
        data: {
            title: 'Article 3',
            author: { connect: { email: 'example3@example.com' } },
        },
    })
}

async function main() {
    await createRoles()
    await createUsers()
    await createArticles()
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })
