"use client";
// react, next
import React from "react";
import { useRouter } from "next/navigation";
// icons
import { FaFolderOpen } from "react-icons/fa";
// types
import { FolderGridProps } from "@/types/index";
// components
import InfoComponent from "@/components/subcomponent/InfoFileOrFolder";

const FolderGrid: React.FC<FolderGridProps> = ({ folders }) => {
   const router = useRouter();
   const changeParentFolder = (id: string) => {
      router.push(`/?id=${id}`, undefined);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         {folders &&
            folders.map((folder, index) => (
               <div
                  key={folder.id}
                  className="relative bg-prim1 p-4 rounded-lg border hover:shadow-md transition duration-300 flex items-center cursor-pointer"
                  onDoubleClick={(e) => {
                     console.log(folder.id);
                     changeParentFolder(folder.id);
                  }}
               >
                  <FaFolderOpen className="text-prim1 w-[15%] " />
                  <p className="w-[80%] ml-2 truncate text-sm text-prim1 font-medium">
                     {folder.data.name}
                  </p>

                  <InfoComponent
                     folderOrFile="folder"
                     folder={{
                        name: folder.data.name,
                        id: folder.id,
                     }}
                     trash={folder.data?.trash}
                  />
               </div>
            ))}
      </div>
   );
};

export default FolderGrid;
