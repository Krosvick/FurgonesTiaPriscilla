"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { apoderadoSchema } from "~/server/zodTypes/apoderadoTypes";
import { useEffect } from "react";
import { useRut } from "react-rut-formatter";
import Form from "~/app/_components/Form"

type Apoderado = z.infer<typeof apoderadoSchema>;

export function CreateApoderado() {

    const methods = useForm<Apoderado>({
        resolver: zodResolver(apoderadoSchema),
    });

    const { rut, updateRut, isValid } = useRut();
    const { data: apoderadoData, isLoading } = api.apoderados.getLatest.useQuery();
    const router = useRouter();

    

    const createApoderado = api.apoderados.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    const onSubmit: SubmitHandler<Apoderado> = async (data) => {
       try{
            if (!isValid) {
                methods.setError("rut", {
                    type: "manual",
                    message: "Rut invalido",
                });
                console.log("rut invalido");
            }else{
            await createApoderado.mutateAsync(data);
            }
       } catch (error) {
              console.log(error);
        } 
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Form methods={methods} onSubmit={onSubmit} className="">
                {({ register, setValue, formState: { errors } }) => {
                    useEffect(() => {
                        if(!isLoading && apoderadoData) {
                            setValue("nombre", apoderadoData.nombre);
                            setValue("apellido", apoderadoData.apellido);
                            setValue("telefono", apoderadoData.telefono);
                            setValue("correo", apoderadoData.correo);
                        }
                    }, [apoderadoData, isLoading, setValue]);

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
                            <input className="btn" type="submit" value="Enviar" />
                        </>
                    );
                }}
            </Form>
        </div>
    )
}