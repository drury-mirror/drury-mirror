import db from '@/lib/db'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    const user = await db.user.findUnique({ where: { id: params.id }, include: { roles: true } })

    if (!user) {
        return Response.json('User not found.', { status: 404 })
    }

    return Response.json(user)
}
