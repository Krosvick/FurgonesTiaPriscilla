import Link from "next/link";
import { Navbar } from "./_components/Navbar";
import { Container } from "./_components/Container";
import { Contacto } from "./_components/Contacto";
import { Footer } from "./_components/Footer";
import { Button, Card, CardHeader, Image } from "@nextui-org/react";
import { SignedIn } from "@clerk/nextjs";

export default async function Home() {
  return (
    <main className="bg-gradient-to-br from-violet-200 to-pink-200">
      <header className="max-w-screen p-5 sticky top-0 z-50">
        <Navbar 
          logo="/logo/logo.png"
          title="Furgones Tia Priscilla"
          elements={[
            <Link href="/pagar">
              <Button radius="sm" variant="shadow" color="secondary" className="mx-5 scale-150 font-semibold">Pagar</Button>
            </Link>,
            <Link href="/nosotros">
              <Button color="primary" radius="sm" variant="solid" className="font-semibold">Conocenos!</Button>
            </Link>,
            <SignedIn>
              <Link href="/admin">
                <Button color="success" radius="sm" variant="solid" className="font-semibold text-white">Panel de administrador</Button>
              </Link>
            </SignedIn>

          ]}
          showAuthInfo={true}
          className="outline outline-2 bg-gray-100"
        />
      </header>
      <section className="max-w-screen p-5">
        <Container bgColor="bg-gray-100" className="bg-opacity-50 rounded-md outline outline-2">
          <div className="flex justify-center items-center h-screen">
            <div className="w-3/4">
              <Card className="col-span-12 sm:col-span-4 text-black min-h-screen mr-5">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-2xl font-bold">Furgones Tia Priscilla</p>
                  <h4 className="font-medium text-large">Para lo más importante en tu vida</h4>
                </CardHeader>
              </Card>
            </div>
            <div className="w-1/4 min-h-full flex items-center justify-center">
              <Card className="col-span-12 sm:col-span-4 text-black h-screen">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-tiny uppercase font-bold">Brindamos seguridad</p>
                  <h4 className="font-medium text-large">Para lo más importante en tu vida</h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-contain"
                  src="images/furgon1.jpg"
                />
              </Card>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}