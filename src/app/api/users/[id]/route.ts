import db from '@/lib/db'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
    if (isNaN(Number(params.id))) {
        return Response.json(`Invalid request: '${params.id}' is not a number.`, { status: 400 })
    }

    const user = await db.user.findUnique({ where: { id: Number(params.id) }, include: { roles: true } })

    if (!user) {
        return Response.json('User not found.', { status: 404 })
    }

    return Response.json(user)
}
