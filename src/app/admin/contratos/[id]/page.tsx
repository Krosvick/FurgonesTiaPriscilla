"use client";
import { Container } from "~/app/_components/Container";
import { api } from "~/trpc/react";
import { ContratoCard } from "~/app/_components/dataDisplay/ContratoCard";
import { Card } from "~/app/_components/Card";
import { CreatePupilosModal } from "~/app/_components/pupilos/CreatePupilosModal";
import { UpdatePupilosModal } from "~/app/_components/pupilos/UpdatePupilosModal";

export default function Page({ params }: { params: { id: string } }) {
    const {data: contrato, isLoading, isFetched} = api.contratos.getById.useQuery(params.id);
    const { data: pupilos, isLoading: isLoadingPupilos, isFetched: isFetchedPupilos } = api.pupilos.getByApoderadoId.useQuery(contrato?.Apoderado?.idApoderado || '', {
    enabled: !!contrato?.Apoderado,});

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
                    {contrato && contrato.Apoderado && <CreatePupilosModal idApoderado={contrato.Apoderado.idApoderado} idContrato={contrato.idContrato} />}
                </div>
                    {isFetchedPupilos && pupilos && pupilos.map((pupilo) => (
                    <Card dark={false} className="flex justify-between">
                            <div key={pupilo.idPupilo} className="p-4 w-3/4">
                                <h2 className="text-xl font-bold">Nombre: {pupilo.nombre} {pupilo.apellido}</h2>
                                <p className="text-gray-600">Rut: {pupilo.rut}</p>
                                <p className="text-gray-600">Colegio: {pupilo.colegio}</p>
                                <p className="text-gray-600">Tipo de contrato: {pupilo.detalle?.tipo === "ida" ? "Ida" : pupilo.detalle?.tipo === "vuelta" ? "Vuelta" : "Ida y vuelta"}</p>
                            </div>
                            <div className="flex items-center">
                                <UpdatePupilosModal pupilo={pupilo} />
                            </div>
                    </Card>
                    ))}
            </Container>
        </section>
    )
}