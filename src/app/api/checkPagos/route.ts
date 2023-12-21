import { api } from "~/trpc/server"

export async function GET() {

  const pagos = await api.contratos.checkPagos.mutate()
 
  return Response.json({ pagos })
}