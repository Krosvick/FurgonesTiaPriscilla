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
import { updateApoderadoSchema } from "~/server/zodTypes/apoderadoTypes";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import { useRut } from "react-rut-formatter";
import { useEffect } from "react";



type ApoderadoUpdate = z.infer<typeof updateApoderadoSchema>;
type UpdateApoderadoModalProps = {
    apoderado : ApoderadoUpdate;
}

export function UpdateApoderadoModal({apoderado}: UpdateApoderadoModalProps){
    const queryClient = useQueryClient();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const methods = useForm<ApoderadoUpdate>({
        resolver: zodResolver(updateApoderadoSchema),
    });
    const { rut, updateRut, isValid } = useRut();
    useEffect(() => {
        updateRut(apoderado.rut);
    }, [apoderado.rut])

    const updateApoderado = api.apoderados.update.useMutation({
        onSuccess: (data) => {
            console.log("success")
            //@ts-expect-error
            queryClient.invalidateQueries("apoderado.getAll")
            .catch((error) => console.log(error));
        },
    });

    const onSubmit: SubmitHandler<ApoderadoUpdate> = async (data) => {
        try{
            await updateApoderado.mutateAsync(data);
            onOpenChange();
        } catch (error) {
            console.log(error);
        }
        onOpenChange();
    }

    return (
             <div>
                <Button color="primary" radius="md" size="lg" variant="shadow" className="font-medium" onClick={onOpen}>Actualizar</Button>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Actualizar informacion de apoderado</ModalHeader>
                        <ModalBody>
                            <Form methods={methods} onSubmit={onSubmit} className="flex flex-col gap-1">
                                {({ register, setValue, formState:{errors} }) => {
                                    return (
                                        <>
                                            <input type="" hidden {...register("idApoderado")} defaultValue={apoderado.idApoderado ?? ''}/>
                                            <input type="" hidden {...register("idContrato")} defaultValue={apoderado.idContrato ?? ''}/>
                                            <Input type="text" label="Nombre" {...register("nombre")} defaultValue={apoderado.nombre ?? ''}/>
                                            <Input type="text" label="Apellido" {...register("apellido")} defaultValue={apoderado.apellido ?? ''}/>
                                            <Input  
                                                value={rut.formatted} 
                                                type="text" 
                                                placeholder="Rut" 
                                                {...register("rut",{
                                                    onChange:(e) => {
                                                        updateRut(e.target.value);
                                                        setValue("rut", e.target.value);
                                                    }
                                                })} 
                                            />
                                            <Input type="text" label="Telefono" {...register("telefono")} defaultValue={apoderado.telefono ?? ''}/>
                                             <Input type="text" label="Correo" {...register("correo")} defaultValue={apoderado.correo ?? ''}/>   
                                            <Input type="date" label="Fecha de alta" {...register("CreatedAt")} defaultValue={apoderado.CreatedAt.toISOString().split('T')[0]}/>
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