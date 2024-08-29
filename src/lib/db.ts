import { PrismaClient } from '@prisma/client'

let db: PrismaClient

global.db = new PrismaClient()
db = global.db

export default db
