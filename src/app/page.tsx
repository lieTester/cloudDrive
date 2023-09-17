"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Login from "./Auth/page";
import Body from "@/components/Body";
import Header from "@/components/Header";
import LoadingPage from "@/components/subcomponent/LoderComponent";

export default function Home() {
   const { data: session } = useSession();
   const [isLoding, setIsLoding] = useState(true);
   useEffect(() => {
      console.log(isLoding);
      if (session) setIsLoding(false);
      setTimeout(() => {
         setIsLoding(false);
      }, 200);
   }, [session]);

   return (
      <main className="w-screen h-screen bg-prim1 font-openSans">
         {!isLoding ? (
            session ? (
               <>
                  <Header />
                  <Body />
               </>
            ) : (
               // <>
               //    <Header />
               //    <Body />
               // </>
               <Login />
            )
         ) : (
            <LoadingPage />
         )}
      </main>
   );
}
