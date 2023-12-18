import Link from "next/link";
import { Card } from "~/app/_components/Card";
import { Container } from "~/app/_components/Container";
import { CreateContrato } from "~/app/_components/contratos/createContrato";

export default async function CrearContrato(){
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-100" className="rounded-3xl bg-opacity-50">
                <div className="w-full h-screen">
                    <Card
                        title="Crear Contrato"
                        description="Aqui se pueden crear los contratos"
                        dark={false}
                        headElements={[
                        <Link href="/admin/contratos"><button className="btn btn-neutral">Volver</button></Link>
                    ]}
                    >
                    </Card>
                <CreateContrato/>
                </div>
            </Container>
        </section>
    );
}