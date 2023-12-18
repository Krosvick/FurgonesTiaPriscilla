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

type Contrato = z.infer<typeof contratoFrontendSchema>;
type Apoderado = z.infer<typeof apoderadoSchema>;

export function CreateContrato() {
    const [step, setStep] = useState(1);
    const [contrato, setContrato] = useState<Contrato>();
    const [apoderado, setApoderado] = useState<Apoderado>();
    const { rut, updateRut, isValid } = useRut();

    const methods = useForm<Contrato | Apoderado>({
        resolver: zodResolver(step == 1 ? contratoFrontendSchema : apoderadoSchema),
    });

    const router = useRouter();

    

    const createContrato = api.contratos.create.useMutation({
        onSuccess: () => {
            console.log("success")
        },
    });

    const createApoderado = api.apoderados.create.useMutation({
        onSuccess: () => {
            //router push to /admin/contratos/${contrato.idContrato}
            router.push(`/admin/contratos/${contrato?.idContrato}`);
        },
    });

    const onSubmit: SubmitHandler<Contrato | Apoderado> = async (data) => {
        if (step == 1) {
            setContrato(data as Contrato);
            setStep(2);
            methods.reset();
        } 
        else if (step == 2) {
            setApoderado(data as Apoderado);
            try {
                //add rut from apoderado to contrato data
                if (!isValid) {
                    methods.setError("rut", {
                        type: "manual",
                        message: "Rut invalido",
                    });
                }
                if (contrato && isValid){
                    contrato.rut = data.rut
                    await createApoderado.mutateAsync(data as Apoderado);
                    await createContrato.mutateAsync(contrato as Contrato);
                }
            } catch (error) {
                console.log(error);
            }
        }else{
            return;
        }
    }


    return (
        <Form methods={methods} onSubmit={onSubmit} className="flex flex-col m-5">
            {({ register, setValue, formState: { errors } }) => {
                if (step === 1) {
                    return (
                        <>
                            <input type="text" placeholder="Nombre" {...register("nombre")} />
                            <input type="text" placeholder="Descripción" {...register("descripcion")} />
                            <input type="datetime-local" placeholder="Fecha de inicio" {...register("fechaInicio")} />
                            <input type="datetime-local" placeholder="Fecha de termino" {...register("fechaTermino")} />
                            <button className="btn" type="submit">Next</button>
                        </>
                    );
                } else if (step === 2) {
                    return (
                        <>
                            {errors.rut && <p>{errors.rut.message}</p>}
                            <input type="text" placeholder="Nombre" {...register("nombre")} />
                            <input type="text" placeholder="Apellido" {...register("apellido")} />
                            <input type="text" placeholder="Telefono" {...register("telefono")} />
                            <input type="text" placeholder="Correo" {...register("correo")} />
                            <input  
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
                            <button className="btn" type="submit">Create</button>
                        </>
                    );
                }
            }}
        </Form>
    )
}