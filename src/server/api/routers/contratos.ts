import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { contratoSchema } from "~/server/zodTypes/contratoTypes";

export const ContratosRouter = createTRPCRouter({
    create: adminProcedure
        .input(contratoSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.contratos.create({
            data: {
                nombre: input.nombre,
                descripcion: input.descripcion,
                fechaInicio: input.fechaInicio,
                fechaTermino: input.fechaTermino,
                Apoderado: {
                    connect: {
                        rut: input.rut,
                    },
                },
            },
        });
    }),
});
