import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { pupiloBackendSchema } from "~/server/zodTypes/pupilosTypes";

export const PupilosRouter = createTRPCRouter({
    create: adminProcedure
        .input(pupiloBackendSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.pupilos.create({
            data: {
                nombre: input.nombre,
                apellido: input.apellido,
                rut: input.rut,
                colegio: input.colegio,
                apoderado: {
                    connect: {
                        idApoderado: input.idApoderado,
                    },
                }
            },
        });
    }),
    getAll: adminProcedure.query(({ ctx }) => {
        return ctx.db.pupilos.findMany({
            where: {
                DeletedAt: null,
            },
            select:{
                idPupilo: true,
                nombre: true,
                apellido: true,
                rut: true,
                colegio: true,
                detalle:{
                    select:{
                        tipo: true,
                    }
                },
            }
        });
    }),
    getById: adminProcedure
        .input(z.string().uuid())
        .query(async ({ ctx, input }) => {
        const pupilo = await ctx.db.pupilos.findUnique({
            where: {
                idPupilo: input,
            },
        });
        if (!pupilo) {
            throw new Error("Pupilo no encontrado");
        }
        return pupilo;
    }),
    getByApoderadoId: adminProcedure
        .input(z.string().uuid())
        .query(async ({ ctx, input }) => {
        const pupilo = await ctx.db.pupilos.findMany({
            where: {
                idApoderado: input,
            },
            select:{
                idPupilo: true,
                nombre: true,
                apellido: true,
                rut: true,
                colegio: true,
                detalle:{
                    select:{
                        tipo: true,
                    }
                },
            }
        });
        if (!pupilo) {
            throw new Error("Pupilo no encontrado");
        }
        return pupilo;
    }),

});

