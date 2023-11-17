// react, next
import { useContext, FC, useState } from "react";
import Link from "next/link";
// icons
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { AiOutlineDownload, AiOutlineFolderView } from "react-icons/ai";
import { RiUserShared2Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaTrashRestore } from "react-icons/fa";
// types
import { InfoComponentProps } from "@/types/index";
// contexts
import { FileFolderContext } from "@/context/FileFolderContext";
// functions
import DeleteFile from "@/functions/DeleteFile";
// schema
import {
   deleteFolder,
   moveToTrash,
   restoreToDrive,
} from "@/schema/dataFunctions";

const InfoComponent: FC<InfoComponentProps> = ({
   folderOrFile,
   file,
   folder,
   trash,
}) => {
   const fileFolderContext = useContext(FileFolderContext);
   const setAddedFileFolder = fileFolderContext?.setAddedFileFolder;
   const setFolderFileHandler = fileFolderContext?.setFolderFileHandler;

   const removeFileFolder = async () => {
      if (setAddedFileFolder && folderOrFile) {
         if (folderOrFile === "folder") {
            if (folder && trash && trash === true) {
               await deleteFolder(folder.id).then((res) => {
                  setAddedFileFolder(true);
               });
            } else if (folder && setAddedFileFolder) {
               moveToTrash(folder.id).then((res) => {
                  setAddedFileFolder(true);
               });
            }
         } else if (file && setAddedFileFolder && folderOrFile === "file") {
            if (trash === true)
               DeleteFile(file?.name, file?.id, setAddedFileFolder);
            else {
               moveToTrash(file.id).then((res) => {
                  setAddedFileFolder(true);
               });
            }
         }
      }
   };

   const renameFolder = () => {
      if (setFolderFileHandler && folder) {
         setFolderFileHandler((prev) => {
            return { isOpen: true, name: folder.name, id: folder.id };
         });
      }
   };
   const restoreItem = async () => {
      if (folder && setAddedFileFolder) {
         await restoreToDrive(folder.id).then((res) => {
            setAddedFileFolder(true);
         });
      } else if (file && setAddedFileFolder) {
         await restoreToDrive(file.id).then((res) => {
            setAddedFileFolder(true);
         });
      }
   };

   return (
      <>
         <div className="relative inline-block [&>div]:invisible [&>div]:focus-within:visible">
            <button className="text-prim1 text-sm focus:outline-none">
               <BsThreeDotsVertical className="text-prim1 w-[25px] h-[25px] -mr-2 rounded-full hover:bg-seco2 p-1 " />
            </button>

            <div className="absolute -right-3 mt-2 w-24 bg-prim2  border-seco2 border-[1px] rounded-[4px] shadow-lg overflow-hidden z-30">
               <div className="[&>*]:p-1 [&>*:hover]:bg-seco1 [&>*]:text-prim1 [&>*]:text-xs">
                  {file && !trash && (
                     <button className="w-full   ">
                        <Link
                           href={file?.link}
                           target="_blank"
                           className="flex items-center space-x-2"
                        >
                           <AiOutlineFolderView />
                           <span>open</span>
                        </Link>
                     </button>
                  )}
                  {trash ? (
                     <button
                        onClick={restoreItem}
                        className="w-full flex items-center space-x-2 "
                     >
                        <FaTrashRestore />
                        <span>Restore</span>
                     </button>
                  ) : (
                     <button
                        onClick={renameFolder}
                        className="w-full flex items-center space-x-2 "
                     >
                        <MdDriveFileRenameOutline />
                        <span>Rename</span>
                     </button>
                  )}

                  {/* {trash == undefined && (
                     <button className="w-full flex items-center space-x-2 ">
                        <RiUserShared2Line />
                        <span>Share</span>
                     </button>
                  )} */}

                  {trash ? (
                     <button
                        onClick={removeFileFolder}
                        className="w-full flex items-center space-x-2 hover:text-red-500"
                     >
                        <BsTrash />
                        <span>Delete</span>
                     </button>
                  ) : (
                     <button
                        onClick={removeFileFolder}
                        className="w-full flex items-center space-x-2 hover:text-red-500"
                     >
                        <BsTrash />
                        <span>Trash</span>
                     </button>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

export default InfoComponent;