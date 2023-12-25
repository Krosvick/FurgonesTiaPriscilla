import { Container } from "~/app/_components/Container";
import { Card } from "~/app/_components/Card";
import Link from "next/link";
import { api } from "~/trpc/server";
import { Button } from "@nextui-org/react";
import { UpdateApoderadoModal } from "~/app/_components/apoderados/UpdateApoderadoModal";

export default async function PagosIndex(){
    const pagos = await api.contratos.getAllPagos.query();
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-100" className="rounded-3xl bg-opacity-50">
                <div className="w-full h-fit">
                    <Card
                        title="pagos"
                        description="Aqui se pueden ver todos los pagos"
                        dark={false}
                    >
                    </Card>
                    <div className="mt-5">
                    {pagos?.map((pago) => (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-slate-100 border border-gray-200 rounded-lg shadow mb-4" key={pago.idPago}>
                            <div className="md:col-span-3">
                                <h1 className="text-2xl mb-2 mr-2">Estado:</h1>
                                <h1 className="text-2xl font-bold mb-2">{pago.estado}</h1>
                            </div>
                            <div className="md:col-span-3 grid md:grid-cols-3 gap-4">
                                <div>
                                    <p className="font-bold text-lg mb-1">Monto:</p>
                                    <p className="mb-2">{pago.monto}</p>
                                    <p className="font-bold text-lg mb-1">Fecha de inicio:</p>
                                    <p className="mb-2">{pago.fechaInicio.toISOString().split('T')[0]}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg mb-1">Fecha de vencimiento:</p>
                                    <p className="mb-2">{pago.fechaTermino?.toISOString().split('T')[0]}</p>
                                    <p className="font-bold text-lg mb-1">Fecha en que se pago:</p>
                                    <p className="mb-2">{pago.fechaPago?.toISOString().split('T')[0]}</p>
                                </div>
                                <div>
                                    <div>
                                        <p className="font-bold text-lg mb-1">Apoderado:</p>
                                        <p className="mb-2">{pago.apoderado.nombre} {pago.apoderado.apellido}</p>
                                        <p className="font-bold text-lg mb-1">Rut:</p>
                                        <p className="mb-2">{pago.apoderado.rut}</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <Link href={`/admin/contratos/${pago.idContrato}`}>
                                            <Button color="primary" radius="md" size="lg" variant="shadow" className="font-medium">Ver Contrato</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}