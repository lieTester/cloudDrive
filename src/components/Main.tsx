import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
const Main = () => {
   return (
      <>
         <div className="h-full w-[79%] bg-prim2 rounded-xl p-3">
            <ul className="inline-block [&>li]:text-2xl [&>li]:px-4 [&>li]:py-1 [&>li]:rounded-full">
               <li className="hover:bg-seco2">My Drive</li>
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
         <div className="w-auto"></div>
      </>
   );
};

export default Main;
