"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { apoderadoSchema } from "~/server/zodTypes/apoderadoTypes";

type Apoderado = z.infer<typeof apoderadoSchema>;

export function CreateApoderado() {
    const { data: apoderadoData, isLoading } = api.apoderados.getLatest.useQuery();
    const router = useRouter();

    const { register, handleSubmit, formState: {errors} } = useForm<Apoderado>({
        resolver: zodResolver(apoderadoSchema),
        defaultValues: isLoading ? {} : {
            nombre: apoderadoData?.nombre,
            apellido: apoderadoData?.apellido,
            telefono: apoderadoData?.telefono,
            correo: apoderadoData?.correo,
            rut: apoderadoData?.rut,
        }
    });

    const createApoderado = api.apoderados.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    const onSubmit: SubmitHandler<Apoderado> = async (data) => {
        await createApoderado.mutateAsync(data);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Nombre" {...register("nombre")} />
                <input type="text" placeholder="Apellido" {...register("apellido")} />
                <input type="text" placeholder="Telefono" {...register("telefono")} />
                <input type="text" placeholder="Correo" {...register("correo")} />
                <input type="text" placeholder="rut" {...register("rut")} />                            
                <input type="submit" value="Enviar" />
            </form>
        </div>
    )
}