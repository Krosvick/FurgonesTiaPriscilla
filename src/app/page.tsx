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
      <header className="max-w-screen sticky top-0 z-50">
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
          className="bg-gray-100"
        />
      </header>
      <section className="min-w-screen min-h-screen p-5">
          <Container bgColor="bg-gray-100" className="bg-opacity-50 rounded-md">
            <div>Bv</div>
            <div>Bv</div>
          </Container>
      </section>
      <Footer />
    </main>
  );
}