import { api } from "~/trpc/server"

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new Response('Unauthorized', {
        status: 401,
        });
    }
    const pagos = await api.contratos.createNewPagos.mutate()
    
    return Response.json({ pagos })
}