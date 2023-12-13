import Link from "next/link";
import { Navbar } from "./_components/Navbar";
import { Container } from "./_components/Container";
import { Contacto } from "./_components/Contacto";
import { Footer } from "./_components/Footer";

export default async function Home() {
  return (
    <main className="bg-gradient-to-b from-pink-300 to-rose-400">
      <header className="max-w-screen p-5 sticky top-0 z-50">
        <Navbar 
          title="Furgones Tia Priscilla"
          elements={[
            <Link href="/envios">Envio</Link>,
            <Link href="/rastreo">Rastreo</Link>,
            <Link href="/cotizacion">Cotizacion</Link>,
          ]}
          showAuthInfo={true}
          className="rounded-md bg-gray-100"
        />
      </header>
      <section className="max-w-screen p-5">
        <Container>
          <div className="flex justify-center items-center h-screen">
            <div className="w-3/4">
              <h1 className="text-4xl font-bold">Furgones Tia Priscilla</h1>
              <p className="text-lg">
                Bienvenido a la pagina de Furgones Tia Priscilla, aqui podras
                encontrar toda la informacion necesaria para poder realizar tus
                envios con nosotros.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Servicios</h2>
              <p className="text-lg">
                Ofrecemos servicios de envio de paquetes y encomiendas a todo el
                pais.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <Contacto />
      <Footer />
    </main>
  );
}