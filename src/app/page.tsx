"use client";

import { useSession } from "next-auth/react";
import Login from "./Auth/page";
import Landing from "@/pages/Landing";
import LoadingPage from "@/components/subcomponent/LoderComponent";
import { FileFolderProvider } from "../context/FileFolderContext";
import { FolderInfoProvider } from "../context/FolderInfoContext";
import { SessionProvider } from "../context/SessionContext";
import { MessageContextProvider } from "@/context/MessageContext";

export default function Home() {
   // session
   const { data: session } = useSession();
   // console.log(session);

   return (
      <main className="w-screen h-screen bg-prim1 ">
         {session !== undefined ? (
            session?.user ? (
               <SessionProvider>
                  {/* // session */}
                  <FolderInfoProvider>
                     {/* // current folder if on main path */}
                     <FileFolderProvider>
                        {/* // urgent message displayer at top */}
                        <MessageContextProvider>
                           {/* // files or folders need to fetch related to subPages */}
                           <Landing session={session} />
                        </MessageContextProvider>
                     </FileFolderProvider>
                  </FolderInfoProvider>
               </SessionProvider>
            ) : (
               <Login />
            )
         ) : (
            <LoadingPage />
         )}
      </main>
   );
}
