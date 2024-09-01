import { PrismaClient } from '@prisma/client'

const db_global = globalThis as unknown as { db: PrismaClient }
const db = db_global.db || new PrismaClient()

export default db
