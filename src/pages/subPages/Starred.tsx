// react next
import Image from "next/image";
import React, { useContext, useEffect } from "react";
// icons
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
// context
import { FileFolderContext } from "@/context/FileFolderContext";
import { SessionContext } from "@/context/SessionContext";
// types
import { FileWithID, Folder, FolderWithID, File } from "@/types/modelTypes";
// components
import FilesUI from "@/components/subcomponent/FileFolder/FilesUI";
import FolderUI from "@/components/subcomponent/FileFolder/FolderUI";
import { getAllStarredData } from "@/schema/dataFunctions";

const Starred = () => {
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const sessionContext = useContext(SessionContext);
   const fileFolderContext = useContext(FileFolderContext);

   const allFiles = fileFolderContext?.allFiles;
   const setAllFiles = fileFolderContext?.setAllFiles;
   const allFolders = fileFolderContext?.allFolders;
   const setAllFolders = fileFolderContext?.setAllFolders;
   const session = sessionContext?.session;

   useEffect(() => {
      getAllStarredData(session.user.email).then((res) => {
         const files: FileWithID[] = [];
         const folders: FolderWithID[] = [];
         res?.data?.forEach((detail: FileWithID | FolderWithID) => {
            if (detail !== undefined) {
               if (detail.data.isFolder) {
                  const folderData: FolderWithID = {
                     data: { ...detail.data, shared: true } as Folder,
                     id: detail.id,
                  };
                  folders.push(folderData);
               } else {
                  const fileData: FileWithID = {
                     data: { ...detail.data, shared: true } as File,
                     id: detail.id,
                  };
                  files.push(fileData);
               }
            }
         });
         if (setAllFiles && setAllFolders) {
            setAllFiles(files);
            setAllFolders(folders);
         }
      });
   }, []);
   return (
      <>
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
               <li className="hover:bg-seco2">Stared</li>
            </ul>
            <ul className="float-right mr-3 flex [&>li]:m-1">
               <li
                  title="have this view only"
                  className="flex p-2  hover:bg-seco2 align-middle rounded-full"
               >
                  <BsCardList className="text-xl " />
               </li>
               <li
                  title="info details"
                  className="flex p-2  hover:bg-seco2 align-middle rounded-full"
               >
                  <BiInfoCircle className="text-xl " />
               </li>
            </ul>
         </div>
         {allFiles && allFiles?.length > 0 ? (
            <div className="w-auto px-3 flex-grow overflow-y-auto">
               <label className="block text-[14px] text-prim1 !my-3 font-medium">
                  Folders
               </label>
               <FolderUI folders={allFolders} />
               <label className="block text-[14px] text-prim1 my-3 font-medium">
                  Files
               </label>
               <FilesUI files={allFiles} />
            </div>
         ) : (
            <div className="w-auto px-3 flex-grow overflow-y-auto flex justify-center items-center bg-red text-prim1 ">
               <ul className="w-full lg:w-[60%] text-center">
                  <li className="flex justify-center">
                     <Image
                        className="w-[50px] h-[50px] md:w-[90px] md:h-[90px] lg:w-[150px] lg:h-[150px] "
                        width={20}
                        height={20}
                        src={"/Starred.svg"}
                        alt="computer-svg image"
                     />
                  </li>
                  <li className="font-normal text-2xl">No starred files</li>
                  <li className="text-sm mt-2 ">
                     Add stars to things that you want to easily find later
                  </li>
               </ul>
            </div>
         )}
      </>
   );
};

export default Starred;
