"use client";
// react, next
import React from "react";
import { useRouter } from "next/navigation";
// icons
import { FaFolderOpen } from "react-icons/fa";
// hook
import useQueryParams from "@/hook/useQueryParams";
// types
import { FolderGridProps } from "@/types/index";
// components
import InfoComponent from "@/components/subcomponent/FileFolder/InfoFileOrFolder";

const FolderGrid: React.FC<FolderGridProps> = ({ folders }) => {
   const router = useRouter();
   const { urlSearchParams, setQueryParams } = useQueryParams();
   const changeParentFolder = (id: string) => {
      setQueryParams({ id: id });
      // router.push(`/?id=${id}`, undefined);
   };

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
         {folders &&
            folders.map((folder, index) => (
               <div
                  key={folder.id}
                  title={`To open "${folder.data.name}" double click`}
                  className="relative bg-prim1 p-4 rounded-lg border-seco2 border-[1px]  hover:shadow-md transition duration-300 flex items-center cursor-pointer"
                  onDoubleClick={(e) => {
                     !folder.data?.trash && changeParentFolder(folder.id);
                  }}
               >
                  <FaFolderOpen className="text-prim1 w-[15%] " />
                  <p className="w-[80%] ml-2 truncate text-sm text-prim1 font-medium">
                     {folder.data.name}
                  </p>

                  {folder.data?.isFolder === true &&
                  folder.data?.shared === true ? (
                     <></>
                  ) : (
                     <InfoComponent
                        folderOrFile="folder"
                        folder={{
                           name: folder.data.name,
                           id: folder.id,
                        }}
                        trash={folder.data?.trash || false}
                        shared={folder.data?.shared || false}
                     />
                  )}
               </div>
            ))}
      </div>
   );
};

export default FolderGrid;
