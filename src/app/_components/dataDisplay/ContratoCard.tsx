import { Card, CardBody } from '@nextui-org/react';
import { PagosModal } from "../contratos/PagosModals";
import { UpdateContratoModal } from '../contratos/UpdateContratoModal';
import { contratoUpdateSchema } from '~/server/zodTypes/contratoTypes';
import * as z from 'zod';

type Contrato = z.infer<typeof contratoUpdateSchema>;

export function ContratoCard({ contrato }: { contrato: Contrato }) {
    return(
        <Card className="w-full bg-slate-100 rounded-lg shadow-lg overflow-hidden">
            <CardBody className='grid grid-cols-1 md:grid-cols-4 gap-4 px-5 py-10'>
                <div className="grid grid-rows-2 gap-4 md:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Contrato</h2>
                            <h1 className="text-gray-800 text-lg font-bold">{contrato.nombre}</h1>
                        </div>
                        <div>
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Descripción</h2>
                            <p className="text-gray-800 text-lg">{contrato.descripcion}</p>
                        </div>
                    </div>
                    <div className='flex gap-5'>
                        <div>
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Cliente</h2>
                            <p className="text-gray-800 text-lg">{contrato.Apoderado?.nombre} {contrato.Apoderado?.apellido}</p>
                        </div>
                        <div>
                            <h2 className="text-gray-500 text-sm uppercase tracking-wide">Rut cliente</h2>
                            <p className="text-gray-800 text-lg">{contrato.Apoderado?.rut}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:col-span-1">
                    {contrato.Apoderado?._count?.pupilos ?? 0 > 0 ? (
                        <PagosModal idContrato={contrato.idContrato} />
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <h1 className="text-2xl font-bold">No hay pupilos para empezar la mensualidad</h1>
                            <p className="text-lg">Agregue pupilos para empezar la mensualidad</p>
                        </div>
                    )}
                    <UpdateContratoModal contrato={contrato} />
                </div>
            </CardBody>
        </Card>
    );
}