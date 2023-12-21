"use client";
import { Card } from "../Card"
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
import { pupiloSchema } from "~/server/zodTypes/pupilosTypes";
import { detalleSchema } from "~/server/zodTypes/contratoTypes";
import { useRut } from "react-rut-formatter";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useQueryClient } from "@tanstack/react-query";


type PupilosModalProps = {
    idApoderado: string;
    idContrato: string;
}

export function PupilosModal({idApoderado, idContrato}: PupilosModalProps) {
    const queryClient = useQueryClient();

    const combinedSchema = z.object({
        pupilo: pupiloSchema,
        detalle: detalleSchema,
    })

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const { rut, updateRut, isValid } = useRut();

    const methods = useForm<z.infer<typeof combinedSchema>>({
        resolver: zodResolver(combinedSchema),
    });

    const createPupilo = api.pupilos.create.useMutation({
        onSuccess: (data) => {
            console.log("success")
            //@ts-ignore
            queryClient.invalidateQueries("pupilos.getAll");
        },
    });

    const createDetalle = api.contratos.createDetalleContrato.useMutation({
        onSuccess: (data) => {
            console.log("success")
            //@ts-ignore
            queryClient.invalidateQueries("contratos.getAll");
        },
    });



    const onSubmit: SubmitHandler<z.infer<typeof combinedSchema>> = async (data) => {
        if (!isValid) {
            methods.setError("pupilo.rut", {
                type: "manual",
                message: "Rut invalido",
            });
        }
        if (isValid){
            const pupiloData = {
                ...data.pupilo,
                idApoderado: idApoderado
            };
            const detalleData = {
                ...data.detalle,
                idContrato: idContrato
            };
            const result = await createPupilo.mutateAsync(pupiloData);
            detalleData.idPupilo = result.idPupilo;
            await createDetalle.mutateAsync(detalleData);
            onOpenChange();
            
        }    
    }
    return (
        <Card
            title="Pupilos"
            description="Aqui se pueden manejar los pupilos"
            dark={false}
            headElements={[
            <div>
                <Button color="primary" radius="md" size="lg" variant="shadow" className="font-medium" onClick={onOpen}>Crear</Button>
                <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Agregar Pupilo</ModalHeader>
                        <ModalBody>
                            <Form methods={methods} onSubmit={onSubmit} className="flex flex-col gap-1">
                                {({ register, setValue, formState:{errors} }) => (
                                    <>
                                        {errors.detalle?.tipo && <span className="text-red-500">{errors.detalle?.tipo.message}</span>}
                                        <Input type="text" label="Nombre" {...register("pupilo.nombre")} />
                                        <Input type="text" label="Apellido" {...register("pupilo.apellido")} />
                                        <Input  
                                            value={rut.formatted} 
                                            type="text" 
                                            placeholder="Rut" 
                                            {...register("pupilo.rut",{
                                                onChange:(e) => {
                                                    updateRut(e.target.value);
                                                    setValue("pupilo.rut", e.target.value);
                                                }
                                            })} 
                                        />
                                        <Input type="text" label="Colegio" {...register("pupilo.colegio")} />
                                        <Select label="Tipo de trayecto" {...register("detalle.tipo")}>
                                            <SelectItem key="ida" value="ida">Ida</SelectItem>
                                            <SelectItem key="vuelta" value="vuelta">Vuelta</SelectItem>
                                            <SelectItem key="idaYvuelta" value="idaYvuelta">Ida y vuelta</SelectItem>
                                        </Select>
                                        <button className="btn" type="submit">Agregar</button>
                                    </>
                                )}
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
        ]}
        >
        </Card>
    )
}