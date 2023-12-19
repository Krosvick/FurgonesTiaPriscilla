import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { contratoBackendSchema } from "~/server/zodTypes/contratoTypes";

export const ContratosRouter = createTRPCRouter({
    create: adminProcedure
        .input(contratoBackendSchema)
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
    getAll: adminProcedure.query(({ ctx }) => {
        return ctx.db.contratos.findMany({
            where: {
                DeletedAt: null,
            },
            include: {
                Apoderado: true,
            },
        });
    }),
    getById: adminProcedure
        .input(z.string().uuid())
        .query(async ({ ctx, input }) => {
        return ctx.db.contratos.findUnique({
            where: {
                idContrato: input,
            },
            include: {
                Apoderado: true,
            },
        });
    }),

});
