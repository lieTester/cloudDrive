"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react"

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
         {!session ? (
            <div className=""> in</div>
         ) : (
            <div>out</div>
         )}
      </main>
   );
}
