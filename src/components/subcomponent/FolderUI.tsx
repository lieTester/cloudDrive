import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { FaFolderOpen } from "react-icons/fa";
import { FolderWithID } from "@/types/modelTypes";

type FolderGridProps = {
   folders: FolderWithID[] | undefined;
};

const FolderGrid: React.FC<FolderGridProps> = ({ folders }) => {
   // as over context value is undefined as primarrly so direct destructuring will give warning

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
                  className="bg-prim1 p-4 rounded-lg border hover:shadow-md transition duration-300 flex items-center cursor-pointer"
                  onClick={(e) => {
                     console.log(folder.id);
                     changeParentFolder(folder.id);
                  }}
               >
                  <FaFolderOpen className="text-prim1 w-[15%] " />
                  <p className="w-[80%] ml-2 truncate text-sm text-prim1">
                     {folder.data.name}
                  </p>
               </div>
            ))}
      </div>
   );
};

export default FolderGrid;
