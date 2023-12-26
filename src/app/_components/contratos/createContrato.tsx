"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRut } from "react-rut-formatter";
import { contratoFrontendSchema } from "~/server/zodTypes/contratoTypes";
import { apoderadoSchema } from "~/server/zodTypes/apoderadoTypes";
import Form from "~/app/_components/Form"
import { Input,Button } from "@nextui-org/react";

type Contrato = z.infer<typeof contratoFrontendSchema>;
type Apoderado = z.infer<typeof apoderadoSchema>;

export function CreateContrato() {
    const [step, setStep] = useState(1);
    const [contrato, setContrato] = useState<Contrato>();
    const [apoderado, setApoderado] = useState<Apoderado>();
    const { rut, updateRut, isValid } = useRut();

    const methods = useForm<Contrato | Apoderado>({
        resolver: zodResolver(step == 1 ? apoderadoSchema : contratoFrontendSchema),
    });

    const router = useRouter();

    

    const createContrato = api.contratos.create.useMutation({
        onSuccess: (data) => {
            console.log("success")
            router.push(`/admin/contratos/${data.idContrato}`);
        },
    });

    const createApoderado = api.apoderados.create.useMutation({
        onSuccess: (data) => {
            console.log("success")
        },
    });

    const onSubmit: SubmitHandler<Contrato | Apoderado> = async (data) => {
        if (step == 1) {
            setApoderado(data as Apoderado);
            try {
                setStep(2);
                methods.reset();
            } catch (error) {
                console.log(error);
            }
        } 
        else if (step == 2) {
            setContrato(data as Contrato);
            if (contrato && isValid){
                if(apoderado?.rut){
                    contrato.rut = apoderado?.rut
                }
                if (contrato.rut) {
                    await createApoderado.mutateAsync(apoderado!);
                    await createContrato.mutateAsync(contrato);
                } else {
                    console.error('Rut is undefined');
                }
            }
        }else{
            return;
        }
    }

    return (
        <Form methods={methods} onSubmit={onSubmit} className="flex flex-col gap-3 mt-5">
            {({ register, setValue, formState: { errors } }) => {
                if (step === 1) {
                    return (
                        <>
                            <h1 className="underline font-bold underline-offset-4">Creación de apoderado</h1>
                            <Input type="text" placeholder="Nombre" {...register("nombre")} />
                            <Input type="text" placeholder="Apellido" {...register("apellido")} />
                            <Input type="text" placeholder="Telefono" {...register("telefono")} />
                            <Input type="text" placeholder="Correo" {...register("correo")} />
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
                            <Button className="w-fit bg-gray-700 text-white py-6" radius="sm" type="submit" isDisabled={!isValid}>Siguiente</Button>
                        </>
                    );
                } else if (step === 2) {
                    return (
                        <>
                            <h1 className="underline font-bold underline-offset-4">Creación de contrato</h1>
                            <input type="hidden" {...register("rut")} value={apoderado?.rut} />
                            <Input type="text" placeholder="Titulo" {...register("nombre")} />
                            <Input type="text" placeholder="Descripción" {...register("descripcion")} />
                            <label className="text-gray-700">Fecha de inicio</label>
                            <Input type="date" placeholder="Fecha de inicio" {...register("fechaInicio")} 
                            description="Fecha en que se inicia el contrato" />
                            <Button className="w-fit bg-gray-700 text-white" type="submit" isLoading={createContrato.isLoading}>Crear</Button>
                        </>
                    );
                }
            }}
        </Form>
    )
}