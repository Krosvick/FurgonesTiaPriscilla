import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.apoderado.create({
    data: {
        nombre: 'Alice',
        apellido: 'Palacios',
        rut: '12345678-9',
        correo: 'lol@lol.com',
        telefono: '12345678',
    }
  })
  console.log({ alice})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })