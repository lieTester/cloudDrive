import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
const Storage = () => {
   return (
      <>
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
               <li className="hover:bg-seco2">Storage</li>
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
      </>
   );
};

export default Storage;
