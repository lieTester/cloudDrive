import React from "react";
import Image from "next/image";

const Logo = () => {
   return (
      <>
         <div className="w-0 sm:w-[40%] md:w-[35%] lg:w-[25%] flex  items-center">
            <Image
               className="pl-2"
               src={"/img/drive.png"}
               alt="drive-img"
               width={"50"}
               height={"50"}
            />
            <label className=" font-productSans text-prim1 text-[22px] ml-2">
               Drive
            </label>
         </div>
      </>
   );
};

export default Logo;
