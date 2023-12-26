import Link from "next/link";
import { Navbar } from "./_components/Navbar";
import { Container } from "./_components/Container";
import { Contacto } from "./_components/Contacto";
import { Footer } from "./_components/Footer";
import { Button, Card, CardHeader } from "@nextui-org/react";
import { SignedIn } from "@clerk/nextjs";
import { Carousel } from "./_components/Carousel";
import Image from "next/image";

export default async function Home() {
  return (
    <main className="bg-gradient-to-br from-violet-200 to-pink-200">
      <header className="max-w-screen sticky top-0 z-50">
        <Navbar 
          logo="/logo/logo.png"
          title="Furgones Tía Priscilla"
          elements={[
            <Link href="/pagar">
              <Button radius="sm" variant="shadow" color="secondary" className="mx-5 scale-150 font-semibold">Pagar</Button>
            </Link>,
            <Link href="/nosotros">
              <Button color="primary" radius="sm" variant="solid" className="font-semibold">Conócenos!</Button>
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
      <section className="glass p-5 min-h-screen m-5">
        <div className="max-w-[85rem] h-full mx-auto p-4 sm:px-6 lg:p-8">
          <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
            <div className="lg:col-span-3">
              <h1 className="block text-4xl font-medium text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white leading-none underline decoration-amber-400">Furgones Tía Priscilla</h1>
              <p className="mt-4 text-xl text-gray-700 dark:text-gray-300 leading-relaxed">Transporte escolar seguro para tus hijos en la comuna de Alto Hospicio.</p>

              <div className="mt-6 lg:mt-12">
                <span className="text-xs font-medium text-gray-800 uppercase dark:text-gray-200">Nuestras redes:</span>
                <Link 
                  href="https://web.facebook.com/profile.php?id=100054458799644" 
                  className="flex items-center mt-3 text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-400 transition duration-300 ease-in-out transform hover:scale-110 origin-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path>
                    <path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
                </svg>
                </Link>

              </div>
            </div>

            <div className="lg:col-span-4 mt-10 lg:mt-0">
              <Image className="w-full h-full rounded-xl" width={500} height={500} src="/images/furgon2.png" alt="Image Description"/>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}