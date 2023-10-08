"use client";
import { useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import { FileFolderContext } from "@/context/FileFolderContext";
import { FolderInfoContext } from "@/context/FolderInfoContext";
import { SessionContext } from "@/context/SessionContext";
import FolderUI from "@/components/subcomponent/FolderUI";
import FilesUI from "@/components/subcomponent/FilesUI";

import FetchFileFolders from "@/functions/FetchFileFolders";

const MyDrive: React.FC = () => {
   const folderInfoContext = useContext(FolderInfoContext);
   const fileFolderContext = useContext(FileFolderContext);
   const sessionContext = useContext(SessionContext);

   const session = sessionContext?.session;
   const addedFileFolder = fileFolderContext?.addedFileFolder;
   const setAddedFileFolder = fileFolderContext?.setAddedFileFolder;
   const folderInfo = folderInfoContext?.folderInfo;
   const setFolderInfo = folderInfoContext?.setFolderInfo;
   const allFiles = fileFolderContext?.allFiles;
   const setAllFiles = fileFolderContext?.setAllFiles;
   const allFolders = fileFolderContext?.allFolders;
   const setAllFolders = fileFolderContext?.setAllFolders;

   const searchParams = useSearchParams();

   useEffect(() => {
      let id = searchParams?.get("id") || "My Drive";
      if (setFolderInfo && id) {
         setFolderInfo((prev) => {
            return { ...prev, parentFolder: id };
         });
      }
   }, [searchParams?.get("id")]);

   useEffect(() => {
      // Fetch files and folders using the provided functions from the custom hook
      // Use addedFileFolder as a dependency
      FetchFileFolders({
         setAddedFileFolder,
         folderInfo,
         session,
         setAllFiles,
         setAllFolders,
      });
   }, [session, folderInfo, addedFileFolder]);

   return (
      <section className="w-[50%] md:w-[75%] lg:w-[79%] h-full bg-prim2 rounded-xl px-2 py-3 flex flex-col ">
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
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
      </section>
   );
};

export default MyDrive;
