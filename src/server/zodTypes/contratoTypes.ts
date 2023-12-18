import z from "zod";

export const contratoFrontendSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.string().transform((str) => new Date(str)),
    fechaTermino: z.string().transform((str) => new Date(str)),
    rut: z.string().optional(),
});

export const contratoBackendSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.date(),
    fechaTermino: z.date(),
    rut: z.string()
});