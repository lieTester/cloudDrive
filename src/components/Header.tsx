import Logo from "./subcomponent/Logo";
import { IoIosSearch } from "react-icons/io";
import { BsQuestionCircle, BsCircle } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { IoApps } from "react-icons/io5";
import { signOut } from "next-auth/react";

const Header = () => {
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
            <div className="h-full flex font-extrabold text-extra2 [&>span]:mx-[2px] ">
               <span className="p-3  hover:bg-seco2 flex justify-center rounded-full">
                  <BsQuestionCircle className="  text-[22px] " />
               </span>
               <span className="p-3  hover:bg-seco2 flex justify-center rounded-full">
                  <AiOutlineSetting className="  text-[22px] " />
               </span>
               <span className="p-3  hover:bg-seco2 flex justify-center rounded-full">
                  <IoApps className="  text-[22px] " />
               </span>
               <span
                  className="p-3  hover:bg-seco2 flex justify-center rounded-full"
                  onClick={() => signOut}
               >
                  <BsCircle className="  text-[22px] " />
               </span>
            </div>
         </div>
      </div>
   );
};

export default Header;
