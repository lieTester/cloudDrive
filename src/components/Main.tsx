import { useEffect, useContext, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
import FileFolderContext from "../context/FileDataContext";
import { useSession } from "next-auth/react";
import FolderUI from "./subcomponent/FolderUI";
import FilesUI from "./subcomponent/FilesUI";
import { useSearchParams } from "next/navigation";
import { FolderInfo } from "@/types/index";
import fetchFileFolders from "@/hook/fetchFileFolders";

const Main: React.FC = () => {
   const { data: session } = useSession();

   // as over context value is undefined as primarrly so direct destructuring will give warning
   const contextValue = useContext(FileFolderContext);
   const addedFileFolder = contextValue?.addedFileFolder; // if we added any new file or folder this will trigger use effect for realtime data
   const setAddedFileFolder = contextValue?.setAddedFileFolder; // if we added any new file or folder this will trigger use effect for realtime data
   const folderInfo = contextValue?.folderInfo;
   const setFolderInfo = contextValue?.setFolderInfo;
   const allFiles = contextValue?.allFiles;
   const setAllFiles = contextValue?.setAllFiles;
   const allFolders = contextValue?.allFolders;
   const setAllFolders = contextValue?.setAllFolders;

   // below code is to use shallow routing for  folder structure move nestedly and comeback
   const searchParams = useSearchParams();
   useEffect(() => {
      // The url ID changed!
      // console.log(searchParams?.get("id"));
      let id = searchParams?.get("id") || "My Drive"; // if we are on / direct then "My Drive" act as id
      if (setFolderInfo && id) {
         setFolderInfo((prev) => {
            return { ...prev, parentFolder: id } as FolderInfo; // Added type annotation here
         });
      }
   }, [searchParams?.get("id")]);

   // below effect for fetch files and folders from firebase
   // Use the custom hook to handle the file and folder fetching logic

   // Add a useEffect to call useFetchFileFolders when dependencies change
   useEffect(() => {
      fetchFileFolders({
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

export default Main;
