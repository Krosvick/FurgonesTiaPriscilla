"use client";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

interface NavbarProps {
  logo?: string;
  title: string;
  elements: React.ReactNode[];
  showAuthInfo: boolean;
}

export function Navbar({ logo, title, elements, showAuthInfo }: NavbarProps){
    return (
      <nav className="navbar mx-auto py-5 rounded-md shadow-lg bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80">
        <div className="flex-1">
          {logo && <Image src={logo} alt="Logo" />}
          <Link href="/" className="btn btn-ghost text-xl">{title}</Link>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn lg:hidden">Dropdown</div>
          <ul tabIndex={0} className="menu dropdown-content lg:menu-horizontal flex items-center px-1">
            {elements.map((element, index) => (
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
            {elements.map((element, index) => (
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
      </nav>
    );
}

