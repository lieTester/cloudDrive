"use client";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
   const handelsignin = () => {
      signIn("google", {
         callbackUrl: "http://localhost:3000/",
      });
   };
   // return <Button onclick={handelsignin} btnValue="signup" btnClasses="" />;
   return (
      <div className="flex h-screen justify-center items-center bg-indigo-900">
         <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-3xl font-semibold mb-6 text-indigo-900">
               Welcome Back!
            </h2>
            <p className="text-gray-600 text-sm mb-6">
               Sign in with your social account
            </p>
            <button
               onClick={() => handelsignin()}
               className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2 mb-4"
            >
               <FaGoogle />
               <span>Sign in with Google</span>
            </button>
            <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full flex items-center justify-center space-x-2">
               <FaGithub />
               <span>Sign in with GitHub</span>
            </button>
         </div>
      </div>
   );
};

export default Login;
