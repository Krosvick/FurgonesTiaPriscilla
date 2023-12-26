import { Container } from "../_components/Container";
import { api } from "~/trpc/server";
import { CreateApoderado } from "../_components/apoderados/createApoderado";
import { Card } from "../_components/Card"; 
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { UpdatePagoModal } from "../_components/contratos/updatePagoModal";



export default async function Admin(){
    const pagosAtrasados = await api.contratos.getPagosAtrasados.query();
    
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-200" className="rounded-3xl bg-opacity-40">
                <div className="min-w-full min-h-fit">
                    <Card
                        title="Pagos vencidos"
                        description="Aquí se pueden ver todos los pagos atrasados"
                        dark={false}
                    >
                    </Card>
                    <div className="mt-5">
                        {pagosAtrasados?.length > 0 ? (
                            pagosAtrasados?.map((Pagos) => (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-100 border border-gray-200 rounded-lg shadow mb-4" key={Pagos.idPago}>
                                    <div className="md:col-span-3">
                                        <h1 className="text-2xl mb-2 mr-2">Estado:</h1>
                                        <h1 className="text-2xl font-bold mb-2">{Pagos.estado}</h1>
                                    </div>
                                    <div className="md:col-span-3 grid md:grid-cols-3 gap-4">
                                        <div>
                                            <p className="font-bold text-lg mb-1">Monto:</p>
                                            <p className="mb-2">{Pagos.monto}</p>
                                            <p className="font-bold text-lg mb-1">Fecha de inicio:</p>
                                            <p className="mb-2">{Pagos.fechaInicio.toISOString().split('T')[0]}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg mb-1">Fecha de vencimiento:</p>
                                            <p className="mb-2">{Pagos.fechaTermino?.toISOString().split('T')[0]}</p>
                                            <p className="font-bold text-lg mb-1">Fecha en que se pago:</p>
                                            <p className="mb-2">{Pagos.fechaPago?.toISOString().split('T')[0]}</p>
                                        </div>
                                        <div>
                                            <div>
                                                <p className="font-bold text-lg mb-1">Apoderado:</p>
                                                <p className="mb-2">{Pagos.apoderado.nombre} {Pagos.apoderado.apellido}</p>
                                                <p className="font-bold text-lg mb-1">Rut:</p>
                                                <p className="mb-2">{Pagos.apoderado.rut}</p>
                                            </div>
                                            <div className="flex gap-5 justify-center items-center">
                                                <Link href={`/admin/contratos/${Pagos.idContrato}`}>
                                                    <Button color="primary" radius="md" size="lg" variant="shadow" className="font-medium">Ver Contrato</Button>
                                                </Link>
                                                <UpdatePagoModal pago={Pagos}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-100 border border-gray-200 rounded-lg shadow mb-4">
                                    <div className="md:col-span-3">
                                        <h1 className="text-2xl mb-2 mr-2">No hay pagos atrasados</h1>
                                    </div>
                                </div>
                            )}
                    </div>
                </div>
            </Container>
        </section>
    );
}