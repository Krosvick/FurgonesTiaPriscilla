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
import { updatePagoSchema } from "~/server/zodTypes/contratoTypes";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";



type PagoUpdate = z.infer<typeof updatePagoSchema>;
type UpdatePagoModalProps = {
    pago: PagoUpdate;
}

export function UpdatePagoModal({pago}: UpdatePagoModalProps){
    const queryClient = useQueryClient();

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    const methods = useForm<PagoUpdate>({
        resolver: zodResolver(updatePagoSchema),
    });

    const updatePago = api.contratos.updatePagoModal.useMutation({
        onSuccess: () => {
            //@ts-expect-error
            queryClient.invalidateQueries("contratos.getAllPagos").
            catch((error) => {
                console.log(error);
            });
        }
    });

    const onSubmit: SubmitHandler<PagoUpdate> = async (data) => {
        await updatePago.mutateAsync(data);
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
                                            <Input type="text" label="Estado" {...register("estado")} defaultValue={pago.estado ?? ''}/> 
                                            <Input type="number" label="Monto" {...register("monto")} defaultValue={pago.monto.toString()}/> 
                                            <Input type="date" label="Fecha de inicio" {...register("fechaInicio")} defaultValue={pago.fechaInicio.toISOString().split('T')[0]}/>
                                            <Input type="date" label="Fecha de vencimiento" {...register("fechaTermino")} defaultValue={pago.fechaTermino!.toISOString().split('T')[0]}/>
                                            <Input type="date" label="Fecha de pago" {...register("fechaPago")} defaultValue={pago.fechaPago?.toISOString().split('T')[0]}/>
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