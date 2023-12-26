import { Image } from "@nextui-org/react";
import Link from "next/link";

export function Footer(){
    return (
      <footer className="max-w-screen p-5 bg-white outline outline-2">
          <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-5 text-center">
            <div className="place-self-center lg:place-self-start">
              <Image
                src="/logo/logo.png"
                width={50}
                height={50}
                alt="Logo"
              />
            </div>

            <ul className="text-center">
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
                <Link href="/">
                  <button className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800">
                    Inicio
                  </button>
                </Link>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
                <Link href="/nosotros">
                  <button className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800">
                    Nosotros
                  </button>
                </Link>
              </li>
              <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300 dark:before:text-gray-600">
                <Link href="/pagar">
                  <button className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800">
                    Pagar
                  </button>
                </Link>
              </li>
            </ul>

            <div className="md:text-end space-x-2">
              <Link className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="https://web.facebook.com/profile.php?id=100054458799644">
                <svg className="flex-shrink-0 w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            </div>
          </div>
      </footer>
    );
}