import { Container } from "../_components/Container";
import { api } from "~/trpc/server";
import { CreateApoderado } from "../_components/apoderados/createApoderado";
import { Card } from "../_components/Card"; 
import Link from "next/link";



export default async function Admin(){
    const apoderados = await api.apoderados.getAll.query();
    
    return (
        <section className="w-full">
            <Container bgColor="bg-gray-200" className="rounded-3xl bg-opacity-40">
                <div className="min-w-full min-h-fit">
                    <Card
                        title="Pagos vencidos"
                        description="Aqui se pueden ver todos los pagos atrazados"
                        dark={false}
                    >
                    </Card>
                    
                </div>
            </Container>
        </section>
    );
}