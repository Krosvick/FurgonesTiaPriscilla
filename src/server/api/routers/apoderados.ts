import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { WebpayPlus } from "transbank-sdk";

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
      return ctx.db.apoderados.create({
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
    return ctx.db.apoderados.findFirst({
      orderBy: { CreatedAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.apoderados.findMany();
  }),

  webpayTest: publicProcedure
  .input(z.object({ returnURL: z.string() }))
  .query(async ({ ctx, input }) => {
    let buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    let sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    let amount = Math.floor(Math.random() * 1000) + 1001;
    let returnUrl = input.returnURL;
    const createResponse = await (new WebpayPlus.Transaction()).create(
      buyOrder, 
      sessionId, 
      amount, 
      returnUrl
    );
    let token = createResponse.token;
    let url = createResponse.url;
    return { token, url, amount };
  }),
});

