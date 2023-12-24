export function calculateFechaInicio(pago) {
    let fechaInicio;
    if (pago.fechaPago !== null && pago.fechaTermino.getTime() < pago.fechaPago.getTime()) {
        fechaInicio = new Date(pago.fechaPago);
    } else {
        fechaInicio = new Date(pago.fechaTermino);
        fechaInicio.setMonth(fechaInicio.getMonth() + 1);
    }
    return fechaInicio;
}

export function calculateFechaTermino(fechaInicio) {
    const fechaTermino = new Date(fechaInicio);
    fechaTermino.setMonth(fechaTermino.getMonth() + 1);
    return fechaTermino;
}