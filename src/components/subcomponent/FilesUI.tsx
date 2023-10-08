"use client";
// react, next
import React from "react";
// icons
import { BsFillFileEarmarkFill } from "react-icons/bs";
// types
import { FileGridProps } from "@/types/index";

const FilesUI: React.FC<FileGridProps> = ({ files }) => {
   // Filter out only files (not folders) from the files array
   const filteredFiles = files && files.filter((item) => !item.isFolder);

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         {filteredFiles &&
            filteredFiles.map((file, index) => (
               <div
                  key={index}
                  className="bg-prim1 p-2 rounded-lg border hover:shadow-md transition duration-300 cursor-pointer hover:bg-seco2"
               >
                  <p className="truncate text-sm text-prim1">{file.name}</p>
                  <BsFillFileEarmarkFill className="text-gray-500 text-4xl mb-2 mx-auto my-3" />
               </div>
            ))}
      </div>
   );
};

export default FilesUI;
