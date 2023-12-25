import z from "zod";

export const apoderadoSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    telefono: z.string(),
    correo: z.string().email(),
    rut: z.string(),
});

export const updateApoderadoSchema = z.object({
    idApoderado: z.string().uuid(),
    nombre: z.string(),
    apellido: z.string(),
    rut: z.string(),
    telefono: z.string(),
    correo: z.string().email(),
    idContrato: z.string().uuid().nullable(),
    CreatedAt: z.coerce.date(),
});