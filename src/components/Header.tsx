"use client";
// react, next
import { useContext, FC } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
// icons
import { IoIosSearch } from "react-icons/io";
import { BsQuestionCircle, BsCircle } from "react-icons/bs";
import { HiMenu } from "react-icons/hi";
import { AiOutlineSetting, AiOutlineCloseCircle } from "react-icons/ai";
import { IoApps } from "react-icons/io5";
// components
import Logo from "./subcomponent/Logo";
// context
import { SessionContext } from "@/context/SessionContext";

const Header: FC<{
   setToggle: () => void;
   toggle: boolean;
}> = ({ toggle, setToggle }) => {
   const sessionContext = useContext(SessionContext);
   const session = sessionContext?.session;

   return (
      <div className="w-full h-fit  flex p-2 !important  text-prim1 z-20">
         <Logo />
         <div className="w-[100%] sm:w-[60%] md:w-[75%] lg:w-[85%] flex justify-between ">
            <div className="w-[60%] flex-grow md:flex-grow-0 relative bg-seco1 p-2 rounded-full focus-within:bg-prim2">
               <input
                  className="pr-8 md:pr-0 w-full bg-transparent pl-8 outline-none rounded-full "
                  type="text"
                  placeholder="Search in Drive"
               />
               <span className="hidden sm:flex left-1  top-1 p-1 absolute  hover:bg-seco2  justify-center rounded-full">
                  <IoIosSearch className="  text-[25px]" />
               </span>
               <span
                  className="flex sm:hidden left-1  top-1 p-1 absolute  hover:bg-seco2  justify-center rounded-full"
                  onClick={() => setToggle()}
               >
                  <HiMenu
                     className={`${toggle ? "hidden" : ""}  text-[25px]`}
                  />
                  <AiOutlineCloseCircle
                     className={`${toggle ? "" : "hidden"}  text-[25px]`}
                  />
               </span>
               <span className="absolute md:hidden w-fit right-0 top-0 p-1 bg-seco2 flex justify-center rounded-full [&:hover>ul]:visible [&:hover>ul]:opacity-100">
                  {session?.user?.image && (
                     <Image
                        src={session?.user?.image}
                        alt="user profile image"
                        width={32}
                        height={32}
                        className="rounded-full "
                     />
                  )}
                  <ul className=" absolute -bottom-[30px] right-0  invisible transition-all duration-100 ease-linear cursor-pointer">
                     <li className="p-1 before:absolute before:right-3 before:top-[3px] before:rotate-45 before:w-[12px] before:h-[12px]   before:bg-extra2 before:rounded-sm "></li>
                     <li
                        className="text-xs font-normal bg-extra2 text-seco1 rounded-sm p-1 px-3"
                        onClick={() => {
                           signOut();
                           console.log("signOut");
                        }}
                     >
                        Signout
                     </li>
                  </ul>
               </span>
            </div>
            <div className="h-full flex items-center font-extrabold text-extra2 [&>span]:mx-[2px] ">
               <span className="hidden md:flex p-2 !mx-1 hover:bg-seco2  justify-center rounded-full">
                  <BsQuestionCircle className="  text-[22px] " />
               </span>
               <span className="hidden md:flex  p-2 !mx-1 hover:bg-seco2  justify-center rounded-full">
                  <AiOutlineSetting className="  text-[22px] " />
               </span>
               <span className=" hidden md:flex p-2  !mx-1 hover:bg-seco2  justify-center rounded-full">
                  <IoApps className="  text-[22px] " />
               </span>
               <span className="hidden md:flex absolute right-0 md:relative !mx-1 p-1 hover:bg-seco2  justify-center rounded-full [&:hover>ul]:visible [&:hover>ul]:opacity-100">
                  {session?.user?.image && (
                     <Image
                        src={session?.user?.image}
                        alt="user profile image"
                        width={30}
                        height={30}
                        className="rounded-full "
                     />
                  )}
                  <ul className="absolute -bottom-[30px] right-0  invisible transition-all duration-100 ease-linear cursor-pointer">
                     <li className="p-1 before:absolute before:right-3 before:top-[3px] before:rotate-45 before:w-[12px] before:h-[12px]   before:bg-extra2 before:rounded-sm "></li>
                     <li
                        className="text-xs font-normal bg-extra2 text-seco1 rounded-sm p-1 px-3"
                        onClick={() => {
                           signOut();
                           console.log("signOut");
                        }}
                     >
                        Signout
                     </li>
                  </ul>
               </span>
            </div>
         </div>
      </div>
   );
};

export default Header;
