import { Container } from "../_components/Container";
import { api } from "~/trpc/server";
import { CreateApoderado } from "../_components/apoderados/createApoderado";



export default async function Admin(){
    const apoderados = await api.apoderados.getAll.query();
    
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-800" className="rounded-3xl bg-opacity-20">
                <div className="w-full min-h-screen">
                    {apoderados?.map((apoderado) => (
                        <div className="bg-red-300" key={apoderado.idApoderado}>
                            <h1>este es el aporado: {apoderado.idApoderado}</h1>
                            <h1>nombre: {apoderado.nombre}</h1>
                            <h2>apellido: {apoderado.apellido}</h2>
                            <h3>telefono: {apoderado.telefono}</h3>
                            <h4>correo: {apoderado.correo}</h4>
                            <h4>rut: {apoderado.rut}</h4>
                        </div>
                    ))}
                    <CreateApoderado />
                </div>
            </Container>
        </section>
    );
}