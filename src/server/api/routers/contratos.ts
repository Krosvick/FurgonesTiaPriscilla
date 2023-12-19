import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { contratoBackendSchema, detalleSchema } from "~/server/zodTypes/contratoTypes";

export const ContratosRouter = createTRPCRouter({
    create: adminProcedure
        .input(contratoBackendSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.contratos.create({
            data: {
                nombre: input.nombre,
                descripcion: input.descripcion,
                fechaInicio: input.fechaInicio,
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
        const contrato = await ctx.db.contratos.findUnique({
            where: {
                idContrato: input,
            },
            include: {
                Apoderado: true,
            },
        });
        return contrato;
    }),
    createDetalleContrato: adminProcedure
        .input(detalleSchema)
        .mutation(async ({ ctx, input }) => {
        switch (input.tipo) {
            case "ida":
                input.precio = 40000;
                break;
            case "vuelta":
                input.precio = 40000;
                break;
            case "idaYvuelta":
                input.precio = 70000;
                break;
            default:
                input.precio = 0;
                break;
        }
        return ctx.db.contratoDetallePupilo.create({
            data: {
                precio: input.precio,
                tipo: input.tipo,
                contrato: {
                    connect: {
                        idContrato: input.idContrato,
                    },
                },
                pupilo: {
                    connect: {
                        idPupilo: input.idPupilo,
                    },
                },
            },
        });
    }),

});
