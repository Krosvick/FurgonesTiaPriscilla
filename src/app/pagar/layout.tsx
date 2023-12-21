import Link from "next/link";
import { Button } from "@nextui-org/react";
import { Navbar } from "../_components/Navbar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function PagoLayout(props: AdminLayoutProps) {
    return (
        <main className="bg-gradient-to-b from-pink-300 to-rose-400">
            <header className="max-w-screen">
                <Navbar 
                title="Furgones Tia Priscilla"
                elements={[
                    <Link href="/"><Button color="primary">Inicio</Button></Link>,
                    
                ]}
                showAuthInfo={true}
                className="bg-gray-100"
                />
            </header>
            {props.children}
        </main>
    );
}