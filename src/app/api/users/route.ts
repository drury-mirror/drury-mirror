import db from '@/lib/db'

export async function GET() {
    return Response.json(await db.user.findMany({ include: { roles: true } }))
}
