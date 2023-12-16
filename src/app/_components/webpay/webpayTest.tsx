"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { api } from "~/trpc/react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUrl } from "nextjs-current-url";


export function WebpayForm() {
    const router = useRouter();
    const currentUrl = useUrl();
    const routeParams = currentUrl?.search;
    const { data: responseData, isLoading } = api.apoderados.webpayTest.useQuery({returnURL: currentUrl?.href});

    const { register, handleSubmit, formState: {errors}, setValue  } = useForm({
    });

    useEffect(() => {
        if(!isLoading && responseData) {
            
        }
    }
    , [responseData, isLoading, setValue]);

    const createApoderado = api.apoderados.create.useMutation({
        onSuccess: () => {
            router.refresh();
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <form action={responseData?.url} method="post">
                <input type="hidden" name="token_ws" value={responseData?.token}/>
                <input className="btn" type="submit" value={`Test de pago Webpay, monto: $${responseData?.amount}`}/>
            </form>
        </div>
    )
}