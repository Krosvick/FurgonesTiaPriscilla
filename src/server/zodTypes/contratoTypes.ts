import z from "zod";

export const contratoFrontendSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.string().transform((str) => new Date(str)),
    rut: z.string().optional(),
});

export const contratoBackendSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.date(),
    rut: z.string()
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