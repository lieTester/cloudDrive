import Logo from "./subcomponent/Logo";
import { IoIosSearch } from "react-icons/io";
import { BsQuestionCircle, BsCircle } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { IoApps } from "react-icons/io5";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
   const { data: session } = useSession();
   return (
      <div className="w-full h-[8%] flex p-2 !important  text-prim1 ">
         <Logo />
         <div className="w-[82%] flex justify-between ">
            <div className="w-[60%] relative bg-seco1 p-2 rounded-full focus-within:bg-prim2">
               <input
                  className="w-full bg-transparent pl-10 outline-none rounded-full "
                  type="text"
                  placeholder="Search in Drive"
               />
               <span className="left-1  top-1 p-1 absolute  hover:bg-seco2 flex justify-center rounded-full">
                  <IoIosSearch className="  text-[25px]" />
               </span>
            </div>
            <div className="h-full flex items-center font-extrabold text-extra2 [&>span]:mx-[2px] ">
               <span className=" p-2 !mx-1 hover:bg-seco2 flex justify-center rounded-full">
                  <BsQuestionCircle className="  text-[22px] " />
               </span>
               <span className="p-2 !mx-1 hover:bg-seco2 flex justify-center rounded-full">
                  <AiOutlineSetting className="  text-[22px] " />
               </span>
               <span className="p-2  !mx-1 hover:bg-seco2 flex justify-center rounded-full">
                  <IoApps className="  text-[22px] " />
               </span>
               <span
                  className=" relative !mx-1 p-1 hover:bg-seco2 flex justify-center rounded-full"
                  onClick={() => signOut}
               >
                  {session?.user?.image && (
                     <Image
                        src={session?.user?.image}
                        alt="user profile image"
                        width={30}
                        height={30}
                        className="rounded-full "
                     />
                  )}
               </span>
            </div>
         </div>
      </div>
   );
};

export default Header;
