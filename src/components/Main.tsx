import { useEffect, useContext, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import FileFolderContext from "../context/FileDataContext";
import { getFolderContents } from "@/schema/dataFunctions";
import { useSession } from "next-auth/react";
import FolderUI from "./subcomponent/FolderUI";
import FilesUI from "./subcomponent/FilesUI";

import { File, Folder, FolderWithID } from "@/types/modelTypes";

const Main = () => {
   const { data: session } = useSession();

   // as over context value is undefined as primarrly so direct destructuring will give warning
   const contextValue = useContext(FileFolderContext);
   const folderInfo = contextValue?.folderInfo; // Use optional chaining here
   const allFiles = contextValue?.allFiles;
   const setAllFiles = contextValue?.setAllFiles;
   const allFolders = contextValue?.allFolders;
   const setAllFolders = contextValue?.setAllFolders;

   // below effect for fetch files and folders from firebase
   useEffect(() => {
      if (session?.user?.email && folderInfo) {
         try {
            getFolderContents(folderInfo.parentFolder, session.user.email).then(
               (arr) => {
                  const files: File[] = [];
                  const folders: FolderWithID[] = [];

                  arr.forEach((detail: any) => {
                     // console.log(detail);
                     // Use type assertion to check if 'detail[0]' is a File
                     if ((detail[0] as File).isFolder !== undefined) {
                        if ((detail[0] as File).isFolder) {
                           const folderData: FolderWithID = {
                              data: detail[0] as Folder,
                              id: detail[1],
                           };
                           folders.push(folderData);
                        } else {
                           files.push(detail[0] as File);
                        }
                     }
                  });
                  // console.log(files);
                  if (setAllFiles && setAllFolders) {
                     setAllFiles(files);
                     setAllFolders(folders);
                  }
               }
            );
         } catch (error) {
            console.log(error);
         }
      }
   }, [session, folderInfo, allFiles, allFolders]);

   return (
      <section className="w-[79%] h-full bg-prim2 rounded-xl px-2 py-3 flex flex-col ">
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
         <div className="w-auto px-3 flex-grow">
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

export default Main;
