// react, next
import { useState, FC } from "react";
// icons
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { RiUserShared2Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";

type InfoComponentProps = {
   folderOrFile: string; // 'folder' or 'file'
};

const InfoComponent: FC<InfoComponentProps> = ({ folderOrFile }) => {
   return (
      <div className="relative inline-block [&>div]:invisible [&>div]:focus-within:visible">
         <button className="text-prim1 text-sm focus:outline-none">
            <BsThreeDotsVertical className="text-prim1 w-[25px] h-[25px] -mr-2 rounded-full hover:bg-seco2 p-1 " />
         </button>
         <div className="absolute -right-3 mt-2 w-24 bg-prim2  border-seco2 border-[1px] rounded-[4px] shadow-lg overflow-hidden">
            <div className="[&>button]:p-1 [&>button:hover]:bg-seco1 [&>button]:text-prim1 [&>button]:text-xs">
               <button className="w-full flex items-center space-x-2 ">
                  <AiOutlineInfoCircle />
                  <span>Info</span>
               </button>
               <button className="w-full flex items-center space-x-2 ">
                  <MdDriveFileRenameOutline />
                  <span>Rename</span>
               </button>
               <button className="w-full flex items-center space-x-2 ">
                  <RiUserShared2Line />
                  <span>Share</span>
               </button>
               <button className="w-full flex items-center space-x-2 hover:text-red-500">
                  <BsTrash />
                  <span>Delete</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default InfoComponent;
