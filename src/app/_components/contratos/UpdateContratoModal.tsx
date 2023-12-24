"use client";
import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Input,
  Select,
  SelectItem,
  Button
} from "@nextui-org/react";
import Form from "../Form";
import { SubmitHandler, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contratoUpdateSchema } from "~/server/zodTypes/contratoTypes";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";



type ContratoUpdate = z.infer<typeof contratoUpdateSchema>;
type UpdateContratoModalProps = {
    contrato: ContratoUpdate
}

export function UpdateContratoModal({contrato}: UpdateContratoModalProps) {
    const queryClient = useQueryClient();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const methods = useForm<ContratoUpdate>({
        resolver: zodResolver(contratoUpdateSchema),
    });

    const updatePupilo = api.contratos.update.useMutation({
        onSuccess: (data) => {
            console.log("success")
            //@ts-expect-error
            queryClient.invalidateQueries("contratos.getById")
            .catch((error) => console.log(error));
        },
    });

    const onSubmit: SubmitHandler<ContratoUpdate> = async (data) => {
        const dataWithDateString = {
            ...data,
            fechaTermino: data.fechaTermino instanceof Date ? data.fechaTermino.toISOString() : data.fechaTermino
        };
        await updatePupilo.mutateAsync(dataWithDateString);
        onOpenChange();
    }

    return (
             <div>
                <Button color="primary" radius="md" size="lg" variant="shadow" className="font-medium" onClick={onOpen}>Actualizar</Button>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Actualizar informacion de pupilo</ModalHeader>
                        <ModalBody>
                            <Form methods={methods} onSubmit={onSubmit} className="flex flex-col gap-1">
                                {({ register, reset, setValue, formState:{errors} }) => {
                                    return (
                                        <>
                                            <input type="hidden" {...register("Apoderado.nombre")} value={contrato.Apoderado?.nombre ?? ''}/>
                                            <input type="hidden" {...register("Apoderado.apellido")} value={contrato.Apoderado?.apellido ?? ''}/>
                                            <input type="hidden" {...register("idContrato")} value={contrato.idContrato}/>
                                            <input type="hidden" {...register("Apoderado.rut")} value={contrato.Apoderado?.rut ?? ''}/>
                                            <Input type="text" label="Nombre" {...register("nombre")} defaultValue={contrato.nombre ?? ''}/>
                                            <Input type="text" label="Apellido" {...register("descripcion")} defaultValue={contrato.descripcion ?? ''}/>
                                            <Input type="date" label="fechaInicio" {...register("fechaInicio")} defaultValue={contrato.fechaInicio.toISOString().split('T')[0]}/>
                                            <Input type="date" label="fechaTermino" {...register("fechaTermino")} defaultValue={contrato.fechaTermino ? contrato.fechaTermino.toISOString().split('T')[0] : ''}/>
                                            <Button className="bg-gray-600 py-5 text-white" variant="solid" type="submit">Terminar</Button>
                                        </>
                                    );
                                }}
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <button className="btn btn-error" onClick={onClose}>
                            Cancelar
                            </button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
            </div>
    )
}