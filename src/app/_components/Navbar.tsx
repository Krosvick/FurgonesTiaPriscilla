"use client";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";

interface NavbarProps {
  logo?: string;
  title: string;
  elements?: React.ReactNode[];
  showAuthInfo: boolean;
  className?: string;
}

export function Navbar({ logo, title, elements = [], showAuthInfo, className }: NavbarProps){
    return (
      //add classname props to nav
      <nav className={`navbar mx-auto py-5 shadow-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80 ${className}`}>
        <div className="flex-1">
          {logo && <Link href="/"><Image src={logo} alt="Logo" width={100} height={100} /> </Link>}
          <Link href="/" className="btn btn-ghost text-xl">{title}</Link>
        </div>
        <div className="dropdown dropdown-end">
          <Button tabIndex={0} role="button" isIconOnly className="lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM135 241c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l87 87 87-87c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 345c-9.4 9.4-24.6 9.4-33.9 0L135 241z"/></svg>
          </Button>
          <ul tabIndex={0} className="menu dropdown-content lg:menu-horizontal flex items-center px-1 bg-gray-100 outline outline-2 rounded-lg gap-5">
            {elements?.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
            {showAuthInfo ? 
              <div className="ml-5">
                <SignedIn><UserButton /></SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="btn shadow-md">Iniciar Sesion</button>
                  </SignInButton>
                </SignedOut>
              </div>
            : null}
          </ul>
        </div>
        <div className="hidden lg:flex">
          <ul className="menu menu-horizontal flex items-center px-1">
            {elements?.map((element, index) => (
              <li key={index}>{element}</li>
            ))}
            {showAuthInfo ? 
              <div className="mx-5">
                <div className="scale-150 mx-5">
                  <SignedIn><UserButton /></SignedIn>
                </div>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="btn shadow-md">Iniciar Sesion</button>
                  </SignInButton>
                </SignedOut>
              </div>
            : null}
          </ul>
        </div>
      </nav>
    );
}

