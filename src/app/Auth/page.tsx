"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Image from "next/image";

const Login = () => {
   const handleSignIn = (provider: string) => {
      signIn(provider, {
         callbackUrl: process.env.NEXTAUTH_URL,
      });
   };

   return (
      <div className="flex min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 justify-center items-center">
         <div className="bg-white p-8 rounded-lg shadow-lg text-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-screen-sm mx-2">
            <Image
               src="/img/drive.png"
               alt="Google Drive"
               width={100}
               height={100}
               className="mx-auto mb-4"
            />
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
               Welcome Back to Cloud-Drive!
            </h2>
            <p className="text-gray-600 text-sm mb-6">
               Sign in with your social account
            </p>
            <button
               onClick={() => handleSignIn("google")}
               className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full flex items-center justify-center space-x-2 mb-4 mx-auto"
            >
               <FaGoogle />
               <span className="font-semibold">Sign in with Google</span>
            </button>
            <button
               onClick={() => handleSignIn("github")}
               className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full flex items-center justify-center space-x-2 mx-auto"
            >
               <FaGithub />
               <span className="font-semibold">Sign in with GitHub</span>
            </button>
         </div>
      </div>
   );
};

export default Login;
