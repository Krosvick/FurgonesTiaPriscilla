import z from "zod";

export const pupiloSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    rut: z.string(),
    colegio: z.string(),
});


export const pupiloBackendSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    rut: z.string(),
    colegio: z.string(),
    idApoderado: z.string().uuid(),
});

export const pupiloUpdateSchema = z.object({
    idPupilo: z.string().uuid(),
    nombre: z.string(),
    apellido: z.string(),
    rut: z.string(),
    colegio: z.string(),
    tipo: z.enum(["ida", "vuelta", "idaYvuelta"]),
});