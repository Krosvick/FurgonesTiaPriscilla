import { z } from "zod";

import { adminProcedure, createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { contratoBackendSchema, detalleSchema, updatePagoSchema, pagoFormSchema, gestionarPagoSchema, contratoUpdateSchema} from "~/server/zodTypes/contratoTypes";
import { calculateFechaInicio, calculateFechaTermino } from "~/server/utils";

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
            select: {
                idContrato: true,
                nombre: true,
                descripcion: true,
                fechaInicio: true,
                fechaTermino: true,
                Apoderado: {
                    select: {
                        idApoderado: true,
                        nombre: true,
                        apellido: true,
                        rut: true,
                    },
                },
            },
        });
        return contrato;
    }),
    update: adminProcedure
        .input(contratoUpdateSchema)
        .mutation(async ({ ctx, input }) => {
        return ctx.db.contratos.update({
            where: {
                idContrato: input.idContrato,
            },
            data: {
                nombre: input.nombre,
                descripcion: input.descripcion,
                fechaInicio: input.fechaInicio,
                fechaTermino: input.fechaTermino,
                Apoderado: {
                    connect: {
                        rut: input.Apoderado?.rut,
                    },
                },
            },
        });
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
        if (pagos.length === 0) {
            return null;
        }
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
        const pagos = await ctx.db.pagos.findMany({
            where: {
                estado: "Pendiente",
                fechaTermino: {
                    lte: new Date(new Date().setDate(new Date().getDate() - 7)),
                }
            },
        });

        const updatedPagos = await Promise.all(pagos.map(async (pago) => {
            return ctx.db.pagos.update({
                where: {
                    idPago: pago.idPago,
                },
                data: {
                    estado: "Atrasado",
                },
            });
        }));

        return updatedPagos;
    }),

    createNewPagos: publicProcedure
    .mutation(async ({ ctx }) => {
        const date37daysAgo = new Date(new Date().setDate(new Date().getDate() - 37));
        const pagos = await ctx.db.pagos.findMany({
            where: {
                fechaTermino: {
                    gte: date37daysAgo,
                },
            },
        });
        type Pago = typeof pagos[0];

        const pagosMap = new Map<string, Pago>();
        pagos.forEach((pago) => {
            if (!pagosMap.has(pago.idApoderado)) {
                pagosMap.set(pago.idApoderado, pago);
            } else {
                const pagoMap = pagosMap.get(pago.idApoderado)!;
                if (pagoMap.fechaInicio.getTime() < pago.fechaInicio.getTime()) {
                    pagosMap.set(pago.idApoderado, pago);
                }
            }
        });
        
        const pagosArray = Array.from(pagosMap.values());

        const newPagosPromises = pagosArray.map(async (pago) => {
            if(pago.estado !== "Pagado" || pago.fechaTermino!.getTime() > new Date().getTime()) {
                return;
            }
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
                console.error('Contrato, detallesContrato, or Apoderado not found for pago id:', pago.idPago);
                return;
            }
            if (contrato?.fechaTermino && contrato.fechaTermino.getTime() <= new Date().getTime()) {
                console.error('Contrato is expired for pago id:', pago.idPago);
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

            const fechaInicio = calculateFechaInicio(pago);
            const fechaTermino = calculateFechaTermino(fechaInicio);

            return await ctx.db.pagos.create({
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

        const newPagos = await Promise.all(newPagosPromises);
        return newPagos.filter(pago => pago !== undefined);
    }),
    getAllPagos: adminProcedure
    .query(async ({ ctx }) => {
        const pagos = await ctx.db.pagos.findMany({
            select: {
                idPago: true,
                fechaInicio: true,
                fechaTermino: true,
                estado: true,
                monto: true,
                fechaPago: true,
                idContrato: true,
                idApoderado: true,
                apoderado: {
                    select: {
                        nombre: true,
                        apellido: true,
                        rut: true,
                    },
                },
            }
        });
        return pagos;
    }),
    updatePagoModal: adminProcedure
    .input(updatePagoSchema)
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

});
