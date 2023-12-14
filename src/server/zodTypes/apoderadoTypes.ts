import z from "zod";

export const apoderadoSchema = z.object({
    nombre: z.string(),
    apellido: z.string(),
    telefono: z.string(),
    correo: z.string(),
    rut: z.string(),
});