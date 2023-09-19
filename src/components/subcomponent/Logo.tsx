import Image from "next/image";

const Logo = () => {
   return (
      <>
         <div className="w-[18%] flex  items-center">
            <Image
               className="pl-2"
               src={"/img/drive.png"}
               alt="drive-img"
               width={"40"}
               height={"40"}
            />
            <label className=" font-productSans text-prim1 text-[22px] ml-4">
               Drive
            </label>
         </div>
      </>
   );
};

export default Logo;
