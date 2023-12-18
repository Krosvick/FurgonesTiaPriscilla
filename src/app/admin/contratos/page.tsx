import { Container } from "~/app/_components/Container";
import { Card } from "~/app/_components/Card";
import Link from "next/link";

export default async function ContratosIndex(){
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
                </div>
            </Container>
        </section>
    );
}