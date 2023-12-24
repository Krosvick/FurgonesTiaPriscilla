"use client";
import {
  Input,
  Card,
  Button,
} from "@nextui-org/react";
import Form from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { pagoFormSchema } from "~/server/zodTypes/contratoTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { Pagos } from "@prisma/client";

type Pago = z.infer<typeof pagoFormSchema>;

interface CrearPagoFormProps {
    idContrato: string;
    onOpenChange: () => void;
}

export function CrearPagoForm({ idContrato, onOpenChange }: CrearPagoFormProps) {
    const methods = useForm<Pago>({
        resolver: zodResolver(pagoFormSchema),
    });
    const queryClient = useQueryClient();
    const createPago = api.contratos.createPago.useMutation({
        onSuccess: (data) => {
          console.log("success");
          //@ts-expect-error
          queryClient.invalidateQueries("contratos.getAll")
          .catch((error) => console.log(error));
        },
    });

    const onSubmit: SubmitHandler<Pago> = async (data) => {
        await createPago.mutateAsync({
        ...data, 
        idContrato,
        fechaInicio: data.fechaInicio.toISOString(),
        });
        methods.reset();
        onOpenChange();
    }
    return (
        <Form<Pago>
                  methods={methods}
                  onSubmit={onSubmit}
                >
                {({ register, formState: { errors } }) => (
                  <>
                    <Card>
                      <Input
                        label="Fecha de Inicio"
                        type="date"
                        placeholder="Fecha"
                        {...register("fechaInicio")}
                        isRequired
                        errorMessage={errors.fechaInicio?.message}
                      />
                    </Card>
                    <Button
                      type="submit"
                      radius="sm"
                      size="lg"
                      variant="shadow"
                      className="font-medium mt-5"
                    >
                      Activar Mensualidad
                    </Button>
                  </>
                )}
                </Form>
    )
}