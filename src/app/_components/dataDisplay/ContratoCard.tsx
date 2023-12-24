import { Card, CardBody } from '@nextui-org/react';
import { PagosModal } from "../contratos/PagosModals";
import { UpdateContratoModal } from '../contratos/UpdateContratoModal';
import { contratoUpdateSchema } from '~/server/zodTypes/contratoTypes';
import * as z from 'zod';

type Contrato = z.infer<typeof contratoUpdateSchema>;

export function ContratoCard({ contrato }: { contrato: Contrato }) {
    return(
        <Card className="w-full bg-slate-100 rounded-lg shadow-lg overflow-hidden">
            <CardBody className='flex flex-col md:flex-row px-5 py-10'>
                <div className="w-full md:w-3/4 flex flex-col items-start justify-start">
                    <div className="w-full flex flex-col md:flex-row justify-between mb-4">
                        <div className="w-full md:w-1/3 mb-4 md:mb-0">
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Contrato</h2>
                            <h1 className="text-gray-800 text-lg font-bold">{contrato.nombre}</h1>
                        </div>
                        <div className="w-full md:w-1/3">
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Descripción</h2>
                            <p className="text-gray-800 text-lg">{contrato.descripcion}</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <div className="w-full md:w-1/3">
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Cliente</h2>
                            <p className="text-gray-800 text-lg">{contrato.Apoderado?.nombre} {contrato.Apoderado?.apellido}</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end items-center w-full md:w-1/4 mt-4 md:mt-0">
                    <PagosModal idContrato={contrato.idContrato} />
                    <UpdateContratoModal contrato={contrato} />
                </div>
            </CardBody>
        </Card>
    )
}