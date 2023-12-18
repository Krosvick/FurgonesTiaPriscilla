import z from "zod";

export const contratoSchema = z.object({
    nombre: z.string(),
    descripcion: z.string(),
    fechaInicio: z.date(),
    fechaTermino: z.date(),
});