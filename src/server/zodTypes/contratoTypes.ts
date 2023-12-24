import z from "zod";

export const contratoFrontendSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.string().transform((str) => new Date(str)),
    rut: z.string()
});

export const contratoBackendSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.date(),
    rut: z.string()
});
export const contratoUpdateSchema = z.object({
    idContrato: z.string().uuid(),
    nombre: z.string().nullable(),
    descripcion: z.string().nullable(),
    fechaInicio: z.coerce.date(),
    fechaTermino: z.string().transform((str) => new Date(str)).nullable(),
    Apoderado: z.object({
        rut: z.string(),
        nombre: z.string(),
        apellido: z.string(),
    }).nullable(),
});

export const contratoShowSchema = z.object({
    nombre:z.string(),
    descripcion: z.string(),
    fechaInicio: z.string(),
    apoderado: z.object({
        nombre: z.string(),
        apellido: z.string(),
        rut: z.string(),
        telefono: z.string(),
        email: z.string().email(),
    })
})

export const detalleSchema = z.object({
    precio: z.number().optional(),
    tipo: z.enum(["ida", "vuelta", "idaYvuelta"]),
    idContrato: z.string().uuid().optional(),
    idPupilo: z.string().uuid().optional(),
});

export const pagoSchema = z.object({
    monto: z.number().positive(),
    fechaInicio: z.date(),
    fechaTermino: z.date(),
    idContrato: z.string().uuid(),
    idApoderado: z.string().uuid(),
    estado: z.enum(["Pagado", "Pendiente", "Atrasado", "Inactivo"]),
    fechaPago: z.date().optional(),
});

export const pagoFormSchema = z.object({
    fechaInicio: z.string().transform((str) => new Date(str)),
    idContrato: z.string().uuid().optional(),
});

export const gestionarPagoSchema = z.object({
    idPago: z.string().uuid().optional(),
    fechaInicio: z.string().transform((str) => new Date(str)),
    fechaTermino: z.string().transform((str) => new Date(str)),
    estado: z.enum(["Pagado", "Pendiente", "Atrasado", "Inactivo"]),
    monto: z.number().positive(),
    fechaPago: z.string().transform((str) => new Date(str)).nullable(),
});

//this is the response example
/*
{
  "vci": "TSY",
  "amount": 10000,
  "status": "AUTHORIZED",
  "buy_order": "ordenCompra12345678",
  "session_id": "sesion1234557545",
  "card_detail": {
      "card_number": "6623"
  },
  "accounting_date": "0522",
  "transaction_date": "2019-05-22T16:41:21.063Z",
  "authorization_code": "1213",
  "payment_type_code": "VN",
  "response_code": 0,
  "installments_number": 0
}*/
export const webpayResponseSchema = z.object({
    vci: z.string(),
    amount: z.number().positive(),
    status: z.enum(["INITIALIZED", "AUTHORIZED", "FAILED", "NULLIFIED", "PARTIALLY_NULLIFIED", "REVERSED", "CAPTURED"]),
    buy_order: z.string(),
    session_id: z.string(),
    card_detail: z.object({
        card_number: z.string(),
    }),
    accounting_date: z.string(),
    transaction_date: z.string(),
    authorization_code: z.string(),
    payment_type_code: z.string(),
    response_code: z.number(),
    installments_amount: z.number().positive(),
    installments_number: z.number().positive(),
    balance: z.number().positive(),
    idPago: z.string().uuid().nullable(),
});

export const webpayCreateSchema = z.object({
    token: z.string(),
    url: z.string(),
});