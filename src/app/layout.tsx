import "~/styles/globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import { esES } from "@clerk/localizations";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Furgones Tia Priscilla",
  description: "Furgones Alto Hospicio",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={esES}
    appearance={{
      elements:{
        footer: 'hidden',
      },
    }}> 
        <html lang="en" className="light">
          <body className={`font-sans ${inter.variable}  min-h-screen`}>
            <Providers>
              <TRPCReactProvider cookies={cookies().toString()}>
                {children}
              </TRPCReactProvider>
            </Providers>
            <SpeedInsights/>
          </body>
        </html>
    </ClerkProvider>
  );
}
