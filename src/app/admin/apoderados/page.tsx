import { Container } from "~/app/_components/Container";
import { Card } from "~/app/_components/Card";
import Link from "next/link";
import { api } from "~/trpc/server";
import { Button } from "@nextui-org/react";
import { UpdateApoderadoModal } from "~/app/_components/apoderados/UpdateApoderadoModal";

export default async function ApoderadosIndex(){
    const apoderados = await api.apoderados.getAll.query();
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-100" className="rounded-3xl bg-opacity-50">
                <div className="w-full h-fit">
                    <Card
                        title="Apoderados"
                        description="Aqui se pueden ver todos los apoderados"
                        dark={false}
                    >
                    </Card>
                    <div className="mt-5">
                    {apoderados?.map((apoderado) => (
                        <div className="p-6 bg-slate-100 border border-gray-200 rounded-lg shadow mb-4 flex flex-col" key={apoderado.idContrato}>
                            <div className="w-full mb-4 md:mb-0">
                                <div className="flex items-center">
                                    <h1 className="text-2xl mb-2 mr-2">Nombre del apoderado:</h1>
                                    <h1 className="text-2xl font-bold mb-2">{apoderado.nombre} {apoderado.apellido}</h1>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                                    <p className="font-bold text-lg mb-1">Rut:</p>
                                    <p className="mb-2">{apoderado.rut}</p>
                                    <p className="font-bold text-lg mb-1">Correo:</p>
                                    <p className="mb-2">{apoderado.correo}</p>
                                    <p className="font-bold text-lg mb-1">Fecha de alta:</p>
                                    <p className="mb-2">{apoderado.CreatedAt.toISOString().split('T')[0]}</p>
                                </div>
                                <div className="w-full md:w-1/3 flex lg:flex-col gap-5 items-center justify-center">
                                    <UpdateApoderadoModal apoderado={apoderado}/>
                                    <Link href={`/admin/contratos/${apoderado.idContrato}`}>
                                        <Button color="primary" radius="md" size="lg" variant="shadow" className="font-medium">Ver Contrato</Button>
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