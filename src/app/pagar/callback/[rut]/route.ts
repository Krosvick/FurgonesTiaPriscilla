import { api } from "~/trpc/server"

import { redirect } from "next/navigation"
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { rut: string } }) {
    //save search param of url into token variable
    const token = request.nextUrl.searchParams.get('token_ws')
    if (token === null) {
    // Handle the case where token is null
    // For example, you could throw an error or return a response indicating that the token parameter is required
        throw new Error('Token parameter is required')
    }

    const rut = params.rut

    const detallePagoActual = await api.apoderados.detallePagoActivo.query(rut)

    if (detallePagoActual?.pagos[0]?.estado === 'Pagado') {
        console.log('Ya pagado')
        return redirect(`/pagar/${detallePagoActual.pagos[0].idPago}/confirmado`)
    }
    const webpayResponse = await api.apoderados.webpayCommit.mutate({
        token: token,
        rut: rut
    })

    console.log(webpayResponse)
    const domain = request.nextUrl.origin
    const urltoRedirect = domain + '/pagar/' + webpayResponse.idPago + '/confirmado'
    console.log(urltoRedirect)
    //redirect to /pagar/rut/confirmado
    return redirect(`/pagar/${webpayResponse.idPago}/confirmado`)
}