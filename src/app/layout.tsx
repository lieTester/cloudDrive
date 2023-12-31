import { SessionAuthProvider } from "@/functions/SessionAuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Cloud-Drive",
   description: "A google drive clone",
};
export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang="en">
         <body className={inter.className}>
            <SessionAuthProvider>{children}</SessionAuthProvider>
         </body>
      </html>
   );
}
