import { PrismaClient } from '@prisma/client'

export declare global {
    declare module globalThis {
        var db: PrismaClient
    }
}
