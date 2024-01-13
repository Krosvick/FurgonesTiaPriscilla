"use client";
import { 
    Card,
    CardBody,
    Input,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
 } from "@nextui-org/react";
import { api } from "~/trpc/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRut } from "react-rut-formatter";
import Form from "~/app/_components/Form";;
import { useState } from "react";
import { env } from "../../env.js";

export interface pupilos {
    nombre: string;
    apellido: string;
    colegio: string;
    tipoTrayecto: string;
}

export interface DatosdePago{
    monto: number;
    fechaTermino: Date | null;
    estado: string;
    pupilos: pupilos[];

}

export default function PagoCliente(){
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [datosdePago, setDatosPago] = useState<DatosdePago>();
  const [hayDatos, setHayDatos] = useState<boolean>(false);
  const methods = useForm<{ rut: string; }>();
  const { rut, isValid, updateRut } = useRut();
  const { isLoading, data:DatosPago, refetch, isFetched, isError } = api.apoderados.detallesPagoMensual.useQuery(rut.formatted, {
    onSuccess: (data) => {
      const datosPago: DatosdePago = ({
        monto: data?.pagos[0]?.monto ?? 0,
        fechaTermino: data?.pagos[0]?.fechaTermino ?? null,
        estado: data?.pagos[0]?.estado ?? "",
        pupilos: data?.detallesContrato.map((detalle) => ({
          nombre: detalle?.pupilo?.nombre,
          apellido: detalle?.pupilo?.apellido,
          colegio: detalle?.pupilo?.colegio,
          tipoTrayecto: detalle?.tipo,
        })) ?? [],
      })
      if(data?.detallesContrato != undefined){
        setDatosPago(datosPago);
        setHayDatos(true);
      }else{
        setHayDatos(false);
      }
    },
    enabled: false,
  });
  const returnUrl = env.NEXT_PUBLIC_PAYMENT_API_URL + "/" + rut.formatted;
  const onSubmit: SubmitHandler<{ rut: string; }> = async (data) => {
    await refetch();
  };

    const { data: webpayData, isLoading: isLoadingWebpay} = api.apoderados.webpayPago.useQuery(
    {
        returnURL: returnUrl, 
        monto: datosdePago?.monto ?? 0,
    }, 
    {
        enabled: (isFetched && hayDatos && datosdePago?.estado != "Pagado" && datosdePago?.estado != "Inactivo" && datosdePago?.pupilos?.length != 0)
    }
    );
    console.log(webpayData);

    
    return (
      <section className="min-w-screen flex min-h-screen justify-center p-5">
        <Card className="h-fit w-5/6 lg:w-1/3 mt-20">
          <CardBody className="flex gap-5">
            <h1>Ingrese su Rut de cliente</h1>
            <Form methods={methods} onSubmit={onSubmit}>
              {({ setValue, register }) => (
                <>
                  <Input
                    value={rut.formatted}
                    type="text"
                    color="primary"
                    placeholder="Rut"
                    {...register("rut", {
                      onChange: (e) => {
                        updateRut(e.target.value);
                        setValue("rut", e.target.value);
                      },
                    })}
                  />
                  <Button
                    color="primary"
                    radius="sm"
                    size="lg"
                    className="font-medium mt-5"
                    onClick={onOpen}
                    type="submit"
                    isDisabled={!isValid}
                  >
                    Buscar
                  </Button>
                </>
              )}
            </Form>
            <Modal
              backdrop="blur"
              isOpen={isOpen}
              placement="center"
              onOpenChange={onOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader>Gestionar Pago</ModalHeader>
                    <ModalBody>

                      {hayDatos && !isLoading && datosdePago && !isLoadingWebpay && datosdePago.estado != "Pagado" && datosdePago.estado != "Inactivo" ? (
                        <form action={webpayData?.url} method="post">
                          <input type="hidden" name="token_ws" value={webpayData?.token}/>
                          <Button isDisabled={isLoadingWebpay} type="submit" color="secondary" radius="sm" size="lg" variant="ghost" className="font-medium">
                            Monto a pagar: ${webpayData?.amount}
                          </Button>
                        </form>
                      ) : !hayDatos && !isLoading || isError || datosdePago?.pupilos?.length == 0 ? (
                        <p>No hay datos asociados a este Rut</p>
                      ) : datosdePago?.estado == "Pagado" ? (
                        <p>La cuota de este mes ya esta pagada</p>
                      ) : (
                        <p>Buscando...</p>
                      )}
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={() => {
                          onClose();
                        }}
                      >
                        Cancelar
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </CardBody>
        </Card>
      </section>
    );
}