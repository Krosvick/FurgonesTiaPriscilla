import { Container } from "~/app/_components/Container";
import { Card } from "~/app/_components/Card";
import Link from "next/link";
import { api } from "~/trpc/server";

export default async function ContratosIndex(){
    const contratos = await api.contratos.getAll.query();
    console.log(contratos);
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-100" className="rounded-3xl bg-opacity-50">
                <div className="w-full h-screen">
                    <Card
                        title="Contratos"
                        description="Aqui se pueden ver todos los contratos"
                        dark={false}
                        headElements={[
                        <Link href="/admin/contratos/crear"><button className="btn btn-neutral">Crear Contrato</button></Link>
                    ]}
                    >
                    </Card>
                    {contratos && contratos.map((contrato) => (
                        <div className="bg-red-300" key={contrato.idContrato}>
                            <h1>este es el contrato: {contrato.idContrato}</h1>
                            <h1>nombre: {contrato.nombre}</h1>
                            <h3>descripción: {contrato.descripcion}</h3>
                            <h3>fecha de Inicio: {new Date(contrato.fechaInicio).toLocaleDateString()}</h3>
                            <h3>fecha de Termino: {new Date(contrato.fechaTermino).toLocaleDateString()}</h3>
                            <h4>apoderado nombre: {contrato.Apoderado?.nombre}</h4>
                            <h4>apoderado rut: {contrato.Apoderado?.rut}</h4>
                            <Link href={`/admin/contratos/${contrato.idContrato}`}><button className="btn btn-neutral">Ver Contrato</button></Link>
                        </div>
                    ))    
                    }
                </div>
            </Container>
        </section>
    );
}