"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SignedIn, UserButton, SignedOut, SignInButton } from "@clerk/nextjs";

export function Navbar(){
    return (
      <nav className="navbar glass rounded-md outline outline-1">
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
                    <button className="btn">Inicia Sesion</button>
                </SignInButton>
            </SignedOut>
          </ul>
        </div>
      </nav>
    );
}

