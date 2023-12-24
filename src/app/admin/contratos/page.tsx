import { Container } from "~/app/_components/Container";
import { Card } from "~/app/_components/Card";
import Link from "next/link";
import { api } from "~/trpc/server";
import { Divider} from "@nextui-org/react";

export default async function ContratosIndex(){
    const contratos = await api.contratos.getAll.query();
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-100" className="rounded-3xl bg-opacity-50">
                <div className="w-full h-fit">
                    <Card
                        title="Contratos"
                        description="Aqui se pueden ver todos los contratos"
                        dark={false}
                        headElements={[
                        <Link href="/admin/contratos/crear"><button className="btn btn-neutral">Crear Contrato</button></Link>
                    ]}
                    >
                    </Card>
                    <div className="mt-5">
                    {contratos?.map((contrato) => (
                        <div className="p-6 bg-slate-100 border border-gray-200 rounded-lg shadow mb-4 flex flex-col" key={contrato.idContrato}>
                            <div className="w-full mb-4 md:mb-0">
                                <div className="flex items-center">
                                    <h1 className="text-2xl mb-2 mr-2">Nombre del contrato:</h1>
                                    <h1 className="text-2xl font-bold mb-2">{contrato.nombre}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                    <p className="font-bold text-lg mb-1">Descripción:</p>
                                    <p className="mb-2">{contrato.descripcion}</p>
                                    <p className="font-bold text-lg mb-1">Fecha de inicio:</p>
                                    <p className="mb-2">{contrato.fechaInicio.toLocaleDateString()}</p>
                                    <p className="font-bold text-lg mb-1">Fecha de termino:</p>
                                    <p className="mb-2">{contrato.fechaTermino?.toLocaleDateString()}</p>
                                </div>
                                <div className="w-full md:w-1/3">
                                    <p className="font-bold text-lg mb-1">Apoderado:</p>
                                    <p className="mb-2">{contrato.Apoderado?.nombre} {contrato.Apoderado?.apellido}</p>
                                    <p className="font-bold text-lg mb-1">Rut:</p>
                                    <p className="mb-2">{contrato.Apoderado?.rut}</p>
                                    <Link href={`/admin/contratos/${contrato.idContrato}`} className="mt-5">
                                        <button className="btn btn-neutral">Ver Contrato</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))    
                    }
                    </div>
                </div>
            </Container>
        </section>
    );
}