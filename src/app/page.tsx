"use client";

import { useSession } from "next-auth/react";
import Login from "./Auth/page";
import Landing from "@/pages/Landing";
import LoadingPage from "@/components/subcomponent/LoderComponent";
import { FileFolderProvider } from "../context/FileDataContext";

export default function Home() {
   // session
   const { data: session } = useSession();
   console.log(session);

   return (
      <main className="w-screen h-screen bg-prim1 ">
         {session !== undefined ? (
            session?.user ? (
               <FileFolderProvider>
                  <Landing session={session} />
               </FileFolderProvider>
            ) : (
               <Login />
            )
         ) : (
            <LoadingPage />
         )}
      </main>
   );
}
