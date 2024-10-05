// react next
import React, { useContext, useEffect } from "react";
import { useSearchParams } from "next/navigation";
// icons
import { BiInfoCircle } from "react-icons/bi";
import { BsCardList } from "react-icons/bs";
// context
import { FolderInfoContext } from "@/context/FolderInfoContext";
import { FileFolderContext } from "@/context/FileFolderContext";
import { SessionContext } from "@/context/SessionContext";
// types
import { FileWithID, Folder, FolderWithID, File } from "@/types/modelTypes";
// components
import FilesUI from "@/components/subcomponent/FileFolder/FilesUI";
import FolderUI from "@/components/subcomponent/FileFolder/FolderUI";
import { collectShareData } from "@/schema/dataFunctions";
import { FetchShareFileFolders } from "@/functions/FetchFileFolders";
const SharedWithMe = () => {
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const sessionContext = useContext(SessionContext);
   const folderInfoContext = useContext(FolderInfoContext);
   const fileFolderContext = useContext(FileFolderContext);

   const allFiles = fileFolderContext?.allFiles;
   const setAllFiles = fileFolderContext?.setAllFiles;
   const allFolders = fileFolderContext?.allFolders;
   const setAllFolders = fileFolderContext?.setAllFolders;
   const folderInfo = folderInfoContext?.folderInfo;
   const setFolderInfo = folderInfoContext?.setFolderInfo;
   const session = sessionContext?.session;
   const searchParams = useSearchParams();

   // // param for checking which folder view to present
   const fetchTrashData = async () => {
      try {
         let id = searchParams?.get("id") || "";
         if (id.length === 0) {
            await collectShareData(session?.user?.email)
               .then((res) => {
                  const files: FileWithID[] = [];
                  const folders: FolderWithID[] = [];

                  res?.data?.forEach((detail: FileWithID | FolderWithID) => {
                     // console.log(detail);
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
               })
               .catch((err) => {
                  throw err;
               });
         }
         if (setFolderInfo && id) {
            setFolderInfo((prev) => {
               return { ...prev, parentFolder: id };
            });
         }
      } catch (error) {
         console.error(error);
      }
   };
   useEffect(() => {
      fetchTrashData();
   }, [searchParams?.get("id")]);

   useEffect(() => {
      // Fetch files and folders using the provided functions from the custom hook
      FetchShareFileFolders({
         folderInfo,
         setAllFiles,
         setAllFolders,
      });
   }, [folderInfo]);

   return (
      <>
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
               <li className="hover:bg-seco2">Shared with me</li>
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
      </>
   );
};

export default SharedWithMe;
