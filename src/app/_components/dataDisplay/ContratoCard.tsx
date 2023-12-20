import { Card, CardBody } from '@nextui-org/react';
import { Contratos as PrismaContrato, Apoderados } from '@prisma/client';
import { PagosModal } from "../contratos/PagosModals";

type Contrato = PrismaContrato & {
  Apoderado: Apoderados | null;
};

export function ContratoCard({ contrato }: { contrato: Contrato }) {
    return(
        <Card className="w-full bg-slate-100">
            <CardBody className='flex flex-row px-5 py-10'>
                <div className="w-3/4 flex flex-col items-start justify-start">
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-1/3">
                            <span className="text-gray-500">Contrato</span>
                            <span className="text-gray-800">{contrato.nombre}</span>
                        </div>
                        <div className="w-1/3">
                            <span className="text-gray-500">Descripción</span>
                            <span className="text-gray-800">{contrato.descripcion}</span>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-1/3">
                            <span className="text-gray-500">Cliente</span>
                            <span className="text-gray-800">{contrato.Apoderado?.apellido}</span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center w-1/4">
                    <PagosModal idContrato={contrato.idContrato} />
                </div>
            </CardBody>
        </Card>
    )
}