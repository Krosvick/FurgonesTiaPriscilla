import { api } from "~/trpc/server"

export async function GET() {

  const pagos = await api.contratos.createNewPagos.mutate()
 
  return Response.json({ pagos })
}