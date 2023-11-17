import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import Image from "next/image";

const Computer = () => {
   return (
      <>
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
               <li className="hover:bg-seco2">Computers</li>
            </ul>
            <ul className="float-right mr-3 flex [&>li]:m-1">
               <li className="flex p-2  hover:bg-seco2 align-middle rounded-full">
                  <BsCardList className="text-xl " />
               </li>
               <li className="flex p-2  hover:bg-seco2 align-middle rounded-full">
                  <BiInfoCircle className="text-xl " />
               </li>
            </ul>
         </div>
         <div className="w-auto px-3 flex-grow overflow-y-auto flex justify-center items-center bg-red text-prim1 ">
            <ul className="w-full lg:w-[60%] text-center">
               <li className="flex justify-center">
                  <Image
                     className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] lg:w-[200px] lg:h-[200px] "
                     width={20}
                     height={20}
                     src={"/Computers.svg"}
                     alt="computer-svg image"
                  />
               </li>
               <li className="font-normal text-2xl">No computers syncing</li>
               <li className="text-sm mt-2 ">
                  Folders on your computer that you sync with Drive using Drive
                  for desktop will show up here.
               </li>
               <li className="font-normal text-lg text-prim2 font-baloo">
                  Not functionallity added in Computers till Now.
               </li>
            </ul>
         </div>
      </>
   );
};

export default Computer;
