"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Login from "./Auth/page";
import Landing from "@/pages/Landing";
import LoadingPage from "@/components/subcomponent/LoderComponent";

export default function Home() {
   const { data: session } = useSession();
   const [isLoding, setIsLoding] = useState(true);
   useEffect(() => {
      console.log(isLoding);
      if (session) setIsLoding(false);
      setTimeout(() => {
         setIsLoding(false);
      }, 300);
   }, [session]);

   return (
      <main className="w-screen h-screen bg-prim1 ">
         {!isLoding ? (
            session ? (
               <Landing />
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
