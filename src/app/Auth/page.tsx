"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

const Login = () => {
   const handleSignIn = (provider: string) => {
      signIn(provider, {
         callbackUrl: process.env.NEXTAUTH_URL,
      });
   };

   return (
      <div className="flex min-h-screen bg-gradient-to-r from-seco2 to-prim2 justify-center items-center">
         <div className="bg-prim2 p-8 rounded-lg shadow-lg text-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-screen-sm mx-2">
            <Image
               src="/img/drive.png"
               alt="Google Drive"
               width={100}
               height={100}
               className="mx-auto mb-4"
            />
            <h2 className="text-3xl font-semibold mb-6 text-prim1">
               Welcome Back to Cloud-Drive!
            </h2>
            <p className="text-prim1 text-sm mb-6">
               Sign in with your social account
            </p>
            <button
               onClick={() => handleSignIn("google")}
               className="px-3 py-1 space-x-2 mb-3 mx-auto rounded-full text-prim1 font-medium outline outline-1   hover:ring-2 hover:ring-[#616161] hover:-outline-offset-[.5px]  hover:outline-[#616161] transition-all duration-300"
            >
               <FcGoogle className="inline text-[18px] mb-1 mr-1" /> Sign in
               with Google
            </button>
            <br />
            <button
               onClick={() => handleSignIn("github")}
               className="px-3 py-1 space-x-2 mx-auto rounded-full text-prim1 font-medium outline outline-1   hover:ring-2 hover:ring-[#616161] hover:-outline-offset-[.5px]  hover:outline-[#616161] transition-all duration-300"
            >
               <FaGithub className="inline text-[18px] mb-1 mr-1" /> Sign in
               with GitHub
            </button>
         </div>
      </div>
   );
};

export default Login;
