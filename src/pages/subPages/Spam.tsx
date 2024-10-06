import React from "react";
import Image from "next/image";
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
const Spam = () => {
   return (
      <>
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
               <li className="hover:bg-seco2">Spam</li>
            </ul>
            <ul className="float-right mr-3 flex [&>li]:m-1">
               <li
                  title="have this view only"
                  className="flex p-2  hover:bg-seco2 align-middle rounded-full"
               >
                  <BsCardList className="text-xl " />
               </li>
               <li
                  title="info details"
                  className="flex p-2  hover:bg-seco2 align-middle rounded-full"
               >
                  <BiInfoCircle className="text-xl " />
               </li>
            </ul>
         </div>
         <div className="w-auto px-3 flex-grow overflow-y-auto flex justify-center items-center bg-red text-prim1 ">
            <ul className="w-full lg:w-[60%] text-center">
               <li className="flex justify-center">
                  <Image
                     className="w-[50px] h-[50px] md:w-[90px] md:h-[90px] lg:w-[150px] lg:h-[150px] "
                     width={20}
                     height={20}
                     src={"/Spam.svg"}
                     alt="computer-svg image"
                  />
               </li>
               <li className="font-normal text-2xl">Your spam is empty</li>
               <li className="text-sm mt-2 ">
                  All Spam data will be visible here.
               </li>
               <li className="font-normal text-lg text-prim2 font-baloo">
                  Not functionallity added in Spam till Now.
               </li>
            </ul>
         </div>
      </>
   );
};

export default Spam;
