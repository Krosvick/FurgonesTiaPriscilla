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