"use client";
import { Container } from "~/app/_components/Container";
import { api } from "~/trpc/react";
import { ContratoCard } from "~/app/_components/dataDisplay/ContratoCard";
import { Card } from "~/app/_components/Card";
import { PupilosModal } from "~/app/_components/pupilos/PupilosModal";

export default function Page({ params }: { params: { id: string } }) {
    const {data: contrato, isLoading, isFetched} = api.contratos.getById.useQuery(params.id);
    const {data:pupilos, isLoading:isLoadingPupilos, isFetched:isFetchedPupilos} = api.pupilos.getAll.useQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return(
        <section className="w-full">
            <Container bgColor="bg-gray-100" className="rounded-3xl bg-opacity-50">
                <div className="w-full">
                    {isFetched && contrato && <ContratoCard contrato={contrato} />}
                </div>
                <div className="mt-5 mb-1">
                    {contrato && contrato.Apoderado && <PupilosModal idApoderado={contrato.Apoderado.idApoderado} idContrato={contrato.idContrato} />}
                </div>
                <Card dark={false}>
                    {isFetchedPupilos && pupilos && pupilos.map((pupilo) => (
                        <div key={pupilo.idPupilo} className="p-4 border-b-2 border-gray-200">
                            <h2 className="text-xl font-bold">Nombre: {pupilo.nombre} {pupilo.apellido}</h2>
                            <p className="text-gray-600">Rut: {pupilo.rut}</p>
                            <p className="text-gray-600">Colegio: {pupilo.colegio}</p>
                        </div>
                    ))}
                </Card>
            </Container>
        </section>
    )
}