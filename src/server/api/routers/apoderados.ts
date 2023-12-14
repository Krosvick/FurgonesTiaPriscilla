import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

import { apoderadoSchema } from "~/server/zodTypes/apoderadoTypes";


export const ApoderadosRouter = createTRPCRouter({
  nombre: adminProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hola ${input.text}`,
      };
    }),

  create: adminProcedure
    .input(apoderadoSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.apoderado.create({
        data: {
          nombre: input.nombre,
          apellido: input.apellido,
          telefono: input.telefono,
          correo: input.correo,
          rut: input.rut,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.apoderado.findFirst({
      orderBy: { CreatedAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.apoderado.findMany();
  }),
});

