import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { WebpayPlus } from "transbank-sdk";

import { apoderadoSchema } from "~/server/zodTypes/apoderadoTypes";
import { webpayResponseSchema, webpayCreateSchema } from "~/server/zodTypes/contratoTypes";

type webpayResponse = z.infer<typeof webpayResponseSchema>;
type webpayCreate = z.infer<typeof webpayCreateSchema>;

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

  webpayPago: publicProcedure
  .input(z.object({ 
    returnURL: z.string(),
    monto: z.number()
  }))
  .query(async ({ ctx, input }) => {
    const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
    const amount = input.monto;
    const returnUrl = input.returnURL;
    //@ts-expect-error
    const createResponse = await (new WebpayPlus.Transaction()).create(
      buyOrder, 
      sessionId, 
      amount, 
      returnUrl
    ) as webpayCreate;
    const token = createResponse.token;
    const url = createResponse.url;
    return { token, url, amount };
  }),

  webpayCommit: publicProcedure
  .input(z.object({ 
    token: z.string(),
    rut: z.string()
  }))
  .mutation(async ({ ctx, input }) => {
    let token = input.token;
    //@ts-expect-error
    const commitResponse = await (new WebpayPlus.Transaction()).commit(token) as webpayResponse;
    
    //if commitResponse.response_code == 0 then we set the apoderado.pago[](the last one)
    if (commitResponse.response_code == 0) {
      const apoderado = await ctx.db.apoderados.findFirst({
        where: {
          rut: input.rut
        },
        select: {
          pagos: {
            take: 1,
            orderBy: {
              fechaInicio: 'desc'
            }
          }
        }
      });
      if (apoderado && apoderado.pagos && apoderado.pagos.length > 0) {
        const firstPago = apoderado.pagos[0];
        if (firstPago) {
          commitResponse.idPago = firstPago.idPago;
          await ctx.db.pagos.update({
            where: {
              idPago: firstPago.idPago
            },
            data: {
              estado: "Pagado",
              fechaPago: new Date()
            }
          });
        }
      }
    }
    return commitResponse;
  }),

  detallesPagoMensual: publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const rut = input;
    const detalles = await ctx.db.contratos.findFirst({
      where: {
        Apoderado: {
          rut: rut
        }
      },
      select: {
        detallesContrato: {
          select: {
            pupilo: {
              select: {
                nombre: true,
                apellido: true,
                colegio: true,
              },
            },
            tipo: true,
          }
        },
        pagos: {
          take: 1,
          orderBy: {
            fechaInicio: 'desc'
          },
          select: {
            monto: true,
            fechaTermino: true,
            estado: true,
          }
        }
    }
    });
    return detalles;
  }),
  detallePagoActivo: publicProcedure
  .input(z.string())
  .query(async ({ ctx, input }) => {
    const rut = input;
    const detalles = await ctx.db.apoderados.findFirst({
      where: {
        rut: rut
      },
      select: {
        pagos: {
          take: 1,
          orderBy: {
            fechaInicio: 'desc'
          },
          select: {
            idPago: true,
            monto: true,
            fechaTermino: true,
            fechaPago: true,
            estado: true,
          }
        }
      }
    });
    return detalles;
  }),
});

