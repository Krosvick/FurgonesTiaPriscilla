import { Card } from "../Card";
import * as z from "zod";
import { Contratos as PrismaContrato, Apoderados } from '@prisma/client';

type Contrato = PrismaContrato & {
  Apoderado: Apoderados | null;
};

export function ContratoCard({ contrato }: { contrato: Contrato }) {
    return(
        <Card className="w-full" dark={false}>
            <div className="w-full flex flex-col">
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
        </Card>
    )
}