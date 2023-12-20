"use client";
import {
  
  Input,
  Select,
  SelectItem,
  Button,
} from "@nextui-org/react";
import Form from "../Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "~/trpc/react";
import { gestionarPagoSchema } from "~/server/zodTypes/contratoTypes";
import { useQueryClient } from "@tanstack/react-query";

type Pago = z.infer<typeof gestionarPagoSchema>;

interface CrearPagoFormProps {
    idContrato: string;
    onOpenChange: () => void;
}

export function GestionarPagoForm({ idContrato, onOpenChange }: CrearPagoFormProps) {
    const methods = useForm<Pago>({
        resolver: zodResolver(gestionarPagoSchema),
    });
    const queryClient = useQueryClient();
    const updatePago = api.contratos.updatePago.useMutation({
        onSuccess: (data) => {
        console.log("success");
        //@ts-ignore
        queryClient.invalidateQueries("contratos.getAll");
        },
    });
    const { data: dataPago, isLoading, isError } = api.contratos.getCurrentPago.useQuery(idContrato);
    const onSubmit: SubmitHandler<Pago> = async (data) => {
        if (dataPago) {
          await updatePago.mutateAsync({
              ...data,
              idPago: dataPago.idPago,
              fechaInicio: data.fechaInicio.toISOString(),
              fechaTermino: data.fechaTermino.toISOString(),
              //@ts-ignore
              fechaPago: !isNaN(data.fechaPago?.getTime()) ? data.fechaPago?.toISOString() : null,
          });
          methods.reset();
          onOpenChange();
        }
    }
    return (
        <Form<Pago>
                  methods={methods}
                  onSubmit={onSubmit}
                >
                {({ setValue, register, formState: { errors } }) => {
                  return (
                  <>
                    <div className="flex flex-col space-y-2">
                      <Input
                        {...register("monto", { required: true, valueAsNumber: true })}
                        label="Monto"
                        placeholder="Monto"
                        defaultValue={dataPago?.monto.toString()}
                        type="number"
                        errorMessage={errors.monto?.message}
                      />
                      <Input
                        label="Fecha de Inicio"
                        type="date"
                        defaultValue={dataPago?.fechaInicio.toISOString().split("T")[0]}
                        placeholder="Fecha Inicio"
                        {...register("fechaInicio", { required: true })}
                        errorMessage={errors.fechaInicio?.message}
                      />
                      <Input
                        label="Fecha de Termino"
                        type="date"
                        defaultValue={dataPago?.fechaTermino?.toISOString().split("T")[0]}
                        placeholder="Fecha Termino"
                        {...register("fechaTermino", { required: true })}
                        errorMessage={errors.fechaTermino?.message}
                      />
                      <Select label="Estado" {...register("estado", { required: true })} defaultSelectedKeys={ dataPago?.estado ? [dataPago.estado.toString()] : []}>
                        <SelectItem key="Pagado" value="Pagado">
                          Pagado
                        </SelectItem>
                        <SelectItem key="Pendiente" value="Pendiente">
                          Pendiente
                        </SelectItem>
                        <SelectItem key="Atrasado" value="Atrasado">
                          Atrasado
                        </SelectItem>
                        <SelectItem key="Inactivo" value="Inactivo">
                          Inactivo
                        </SelectItem>
                      </Select>
                      <Input label="Fecha en que se pago" type="date" placeholder="Fecha de pago" {...register("fechaPago")} defaultValue={dataPago?.fechaPago?.toISOString().split("T")[0]} />
                    </div>
                    <div className="flex flex-row justify-end">
                      <Button
                        type="submit"
                        color="primary"
                        radius="md"
                        size="lg"
                        className="font-medium mt-5"
                      >
                        Actualizar Pago
                      </Button>
                    </div>
                  </>
                  )
                }}
              </Form>
    )
}