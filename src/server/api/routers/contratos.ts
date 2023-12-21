import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { contratoBackendSchema, detalleSchema, pagoSchema, pagoFormSchema, gestionarPagoSchema} from "~/server/zodTypes/contratoTypes";

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
    createPago: adminProcedure
    .input(pagoFormSchema)
    .mutation(async ({ ctx, input }) => {
        try {
            if (!input.idContrato || !input.fechaInicio) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Invalid input',
                });
            }

            const contrato = await ctx.db.contratos.findUnique({
                where: {
                    idContrato: input.idContrato,
                },
                include: {
                    detallesContrato: true,
                    Apoderado: true,
                },
            });

            if (!contrato?.detallesContrato || !contrato?.Apoderado) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Contrato, detallesContrato, or Apoderado not found',
                });
            }

            let total = 0;
            contrato.detallesContrato.forEach((detalle) => {
                total += detalle.precio;
            });

            const fechaTermino = new Date(input.fechaInicio);
            fechaTermino.setMonth(fechaTermino.getMonth() + 1);

            return ctx.db.pagos.create({
                data: {
                    monto: total,
                    fechaInicio: input.fechaInicio,
                    fechaTermino: fechaTermino,
                    contrato: {
                        connect: {
                            idContrato: input.idContrato,
                        },
                    },
                    apoderado: {
                        connect: {
                            rut: contrato.Apoderado.rut,
                        },
                    },
                    estado: "Pendiente",
                    fechaPago: null,
                },
            });
        } catch (error) {
            if (error instanceof TRPCError) {
                throw error;
            }
            console.error(error);
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'An unexpected error occurred',
            });
        }
    }),
    getCurrentPago: adminProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
        const pagos = await ctx.db.pagos.findMany({
            where: {
                idContrato: input,
            },
            orderBy: {
                fechaInicio: "desc",
            },
            take: 1,
        });
        return pagos[0];
    }),
    updatePago: adminProcedure
    .input(gestionarPagoSchema)
    .mutation(async ({ ctx, input }) => {
        const pago = await ctx.db.pagos.findUnique({
            where: {
                idPago: input.idPago,
            },
        });

        if (!pago) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Pago not found',
            });
        }
        return ctx.db.pagos.update({
            where: {
                idPago: input.idPago,
            },
            data: {
                fechaInicio: input.fechaInicio,
                fechaTermino: input.fechaTermino,
                fechaPago: input.fechaPago,
                estado: input.estado,
                monto: input.monto,
            },
        });
    }),
    checkPagos: publicProcedure
    .mutation(async ({ ctx }) => {
        //this is the thing
        //this will check all current pagos fechaTermino
        //if is 7 days from fechaTermino and estado is Pendiente
        //then update estado to Atrasado
        const pagos = await ctx.db.pagos.findMany({
            where: {
                estado: "Pendiente",
                fechaTermino: {
                    lte: new Date(new Date().setDate(new Date().getDate() - 7)),
                }
            },
        });
        pagos.forEach(async (pago) => {
            await ctx.db.pagos.update({
                where: {
                    idPago: pago.idPago,
                },
                data: {
                    estado: "Atrasado",
                },
            });
        });
        return pagos;
    }),

    createNewPagos: publicProcedure
    .mutation(async ({ ctx }) => {
        const pagos = await ctx.db.pagos.findMany({
            where: {
                estado: "Pagado",
                fechaTermino: {
                    lte: new Date(),
                }
            },
        });

        const pagosPromises = pagos.map(async (pago) => {
            const contrato = await ctx.db.contratos.findUnique({
                where: {
                    idContrato: pago.idContrato,
                },
                include: {
                    detallesContrato: true,
                    Apoderado: true,
                },
            });

            if (!contrato?.detallesContrato || !contrato?.Apoderado) {
                // Log the error and continue with the next pago
                console.error('Contrato, detallesContrato, or Apoderado not found for pago id:', pago.idPago);
                return;
            }

            let total = 0;
            contrato.detallesContrato.forEach((detalle) => {
                total += detalle.precio;
            });
            if (pago.fechaTermino === null) {
                console.error('fechaTermino is null for pago id:', pago.idPago);
                return;
            }
            let fechaInicio;
            if (pago.fechaPago !== null && pago.fechaTermino < pago.fechaPago) {
                fechaInicio = new Date(pago.fechaPago);
            } else {
                fechaInicio = new Date(pago.fechaTermino);
            }
            fechaInicio.setMonth(fechaInicio.getMonth() + 1);

            const fechaTermino = new Date(fechaInicio);
            fechaTermino.setMonth(fechaTermino.getMonth() + 1);

            await ctx.db.pagos.create({
                data: {
                    monto: total,
                    fechaInicio: fechaInicio,
                    fechaTermino: fechaTermino,
                    contrato: {
                        connect: {
                            idContrato: pago.idContrato,
                        },
                    },
                    apoderado: {
                        connect: {
                            rut: contrato.Apoderado.rut,
                        },
                    },
                    estado: "Pendiente",
                    fechaPago: null,
                },
            });
        });

        await Promise.all(pagosPromises);
        return pagos;
    }),
});
