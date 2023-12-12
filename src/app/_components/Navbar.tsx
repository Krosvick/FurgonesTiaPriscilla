"use client";
import Link from "next/link";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export function Navbar(){
    return (
      <nav className="navbar mx-auto py-5 rounded-md shadow-lg bg-gray-100 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">Furgones Tia Priscilla</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <SignedIn>
                <UserButton />
            </SignedIn>
            <SignedOut>
                <SignInButton mode="modal">
                    <button className="btn shadow-md">Inicia Sesion</button>
                </SignInButton>
            </SignedOut>
          </ul>
        </div>
      </nav>
    );
}

