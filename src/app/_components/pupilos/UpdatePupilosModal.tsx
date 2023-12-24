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
import { pupiloUpdateSchema } from "~/server/zodTypes/pupilosTypes";
import { useRut } from "react-rut-formatter";
import { useEffect } from "react";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";
import type { TiposDeContrato } from "@prisma/client";

type Pupilo = {
    idPupilo: string;
    nombre: string;
    apellido: string;
    rut: string;
    colegio: string;
    detalle: { tipo: TiposDeContrato; } | null;
}

type UpdatePupilosModalProps = {
    pupilo: Pupilo;
}
type PupiloUpdate = z.infer<typeof pupiloUpdateSchema>;

export function UpdatePupilosModal({pupilo}: UpdatePupilosModalProps) {
    const queryClient = useQueryClient();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { rut, updateRut, isValid } = useRut()
    useEffect(() => {
        updateRut(pupilo.rut);
    }, [pupilo.rut])

    const methods = useForm<PupiloUpdate>({
        resolver: zodResolver(pupiloUpdateSchema),
    });

    const updatePupilo = api.pupilos.update.useMutation({
        onSuccess: (data) => {
            console.log("success")
            //@ts-ignore
            queryClient.invalidateQueries("pupilos.getAll");
        },
    });

    const onSubmit: SubmitHandler<PupiloUpdate> = async (data) => {
        console.log(data);
        await updatePupilo.mutateAsync(data);
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
                                            <input type="hidden" {...register("idPupilo")} value={pupilo.idPupilo}/>
                                            <Input type="text" label="Nombre" {...register("nombre")} defaultValue={pupilo.nombre}/>
                                            <Input type="text" label="Apellido" {...register("apellido")} defaultValue={pupilo.apellido}/>
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
                                            <Input type="text" label="Colegio" {...register("colegio")} defaultValue={pupilo.colegio}/>
                                            <Select label="Tipo de trayecto" {...register("tipo")} defaultSelectedKeys={[pupilo.detalle?.tipo]}>
                                                <SelectItem key="ida" value="ida">Ida</SelectItem>
                                                <SelectItem key="vuelta" value="vuelta">Vuelta</SelectItem>
                                                <SelectItem key="idaYvuelta" value="idaYvuelta">Ida y vuelta</SelectItem>
                                            </Select>
                                            <Button className="bg-gray-600 py-5 text-white" variant="solid" type="submit" isDisabled={!isValid}>Terminar</Button>
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