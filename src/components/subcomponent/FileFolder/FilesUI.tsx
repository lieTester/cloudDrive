"use client";
// react, next
import React from "react";
// icons
import { BsFillFileEarmarkFill } from "react-icons/bs";
// types
import { FileGridProps } from "@/types/index";
// components
import InfoComponent from "@/components/subcomponent/FileFolder/InfoFileOrFolder";

const FilesUI: React.FC<FileGridProps> = ({ files }) => {
   // Filter out only files (not folders) from the files array

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         {files &&
            files.map((file, index) => (
               <div
                  key={index}
                  className="bg-prim1 p-2 rounded-lg border-seco2 border-[1px] hover:shadow-md transition duration-300 cursor-pointer "
               >
                  <div className="flex justify-between px-1">
                     <p className="truncate text-sm text-prim1 font-medium">
                        {file.data.name}
                     </p>
                     <InfoComponent
                        folderOrFile="file"
                        file={{
                           name: file.data.name,
                           link: file.data.fileLink,
                           id: file.id,
                           starred: file.data?.isStarred || false,
                        }}
                        trash={file.data?.trash || false}
                        shared={file.data?.shared || false}
                     />
                  </div>
                  <BsFillFileEarmarkFill className="text-gray-500 text-4xl mb-2 mx-auto my-3" />
               </div>
            ))}
      </div>
   );
};

export default FilesUI;
