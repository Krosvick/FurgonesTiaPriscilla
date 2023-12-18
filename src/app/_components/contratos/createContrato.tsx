"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { contratoSchema } from "~/server/zodTypes/contratoTypes";
import Form from "~/app/_components/Form"

type Contrato = z.infer<typeof contratoSchema>;

export function CreateContrato() {

    const methods = useForm<Contrato>({
        resolver: zodResolver(contratoSchema),
    });

    const router = useRouter();

    

    const createApoderado = api.apoderados.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    const onSubmit: SubmitHandler<Contrato> = async (data) => {
       try{
        await createApoderado.mutateAsync(data);
       } catch (error) {
              console.log(error);
        } 
    }


    return (
            <Form methods={methods} onSubmit={onSubmit} className="flex flex-col m-5">
                {({ register, setValue, formState: { errors } }) => {
                    return (
                        <>
                            <input type="text" placeholder="Nombre" {...register("nombre")} />
                            <input type="text" placeholder="Descripción" {...register("descripcion")} />
                            <input type="datetime-local" placeholder="Fecha de inicio" {...register("fechaInicio")} />
                            <input type="datetime-local" placeholder="Fecha de termino" {...register("fechaTermino")} />
                            <input className="btn" type="submit" value="Enviar" />
                        </>
                    );
                }}
            </Form>
    )
}