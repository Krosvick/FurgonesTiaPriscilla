"use client";
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
import { CrearPagoForm } from "./CrearPagoForm";
import { GestionarPagoForm } from "./GestionarPagoForm";

type Pago = z.infer<typeof pagoFormSchema>;

export function PagosModal({ idContrato }: { idContrato: string }) {
  const [hasPago, setHasPago] = useState(false);

  const { data, isLoading, isError } = api.contratos.getCurrentPago.useQuery(idContrato);
  useEffect(() => {
    if (data) {
      setHasPago(true);
    }
  }, [data]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        color="primary"
        radius="md"
        size="lg"
        variant="shadow"
        className="font-medium"
        onClick={onOpen}
      >
        {hasPago ? "Gestionar Pago" : "Activar Mensualidad"}
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Gestionar Pago</ModalHeader>
              <ModalBody>
                {!hasPago ? (
                 <CrearPagoForm idContrato={idContrato} onOpenChange={onOpenChange} />
                ) : (
                    <GestionarPagoForm idContrato={idContrato} onOpenChange={onOpenChange} />
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
    </div>
  );
}
