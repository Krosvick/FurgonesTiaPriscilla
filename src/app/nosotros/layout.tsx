import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Navbar } from "../_components/Navbar";
import { SignedIn } from "@clerk/nextjs";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function PagoLayout(props: AdminLayoutProps) {
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
            {props.children}
        </main>
    );
}