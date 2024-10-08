"use client";
// react, next
import { FC, useState, useContext, useEffect } from "react";
// types
import { CreateEditFileFolderUIProps } from "@/types/index";
// context
import { FileFolderContext } from "@/context/FileFolderContext";
import { FolderInfoContext } from "@/context/FolderInfoContext";
import { SessionContext } from "@/context/SessionContext";
// firebase shema
import { createFolderInFolder, renameFolder } from "@/schema/dataFunctions";
import MessageContext from "@/context/MessageContext";

const CreateEditFolderUI: FC<CreateEditFileFolderUIProps> = ({
   isOpen,
   name,
   id,
}) => {
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const folderInfoContext = useContext(FolderInfoContext);
   const fileFolderContext = useContext(FileFolderContext);
   const sessionContext = useContext(SessionContext);
   const messageContext = useContext(MessageContext);

   const setOpen = messageContext?.setOpen;
   const setMessage = messageContext?.setMessage;
   const setSeverity = messageContext?.setSeverity;

   const session = sessionContext?.session; // Use optional chaining here
   const folderInfo = folderInfoContext?.folderInfo; // Use optional chaining here
   const setAddedFileFolder = fileFolderContext?.setAddedFileFolder; // will use this if we create a new folder
   const setFolderFileHandler = fileFolderContext?.setFolderFileHandler; // will use this if we create a new folder

   // create Edit folder name
   const [folderName, setFolderName] = useState("");
   useEffect(() => {
      name && setFolderName(name);
   }, [name]);
   const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFolderName(e.target.value);
   };
   const onClose = () => {
      setFolderName("");
      setFolderFileHandler && setFolderFileHandler({ isOpen: false });
   };

   const handleCreateFolder = async () => {
      // folder creation logic here
      if (session?.user?.email && folderInfo?.parentFolder) {
         const data = {
            name: folderName,
            owner: session?.user?.email,
            isFolder: true,
            parentFolder: folderInfo?.parentFolder,
         };

         await createFolderInFolder(data).then((res) => {
            setAddedFileFolder && setAddedFileFolder(true);
            onClose();
            setOpen && setOpen(true);
            setSeverity && setSeverity("success");
            setMessage && setMessage("Folder Create Successfully");
         });
      }
   };
   // Rename folder
   const handelRenameFolder = async () => {
      if (id) {
         await renameFolder({ folderName, folderId: id }).then((res) => {
            if (setAddedFileFolder) setAddedFileFolder(true);
            onClose();
            setOpen && setOpen(true);
            setSeverity && setSeverity("warning");
            setMessage && setMessage("Folder Renamed Successfully!");
         });
      }
   };

   return (
      <div
         className={`${
            isOpen ? "fixed inset-0 flex items-center justify-center" : "hidden"
         } bg-black bg-opacity-50 z-[90]`}
         onClick={() => onClose()} // Close when the faded portion is clicked
      >
         <div
            className="bg-prim2 rounded-lg py-3 px-5 w-[90%] sm:w-96"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-lg mb-2 text-prim1">
               {name ? "Rename Folder" : "New Folder"}
            </h2>
            <div className="mb-3">
               <input
                  type="text"
                  placeholder="Untitled folder"
                  className="w-full outline-none bg-prim2 text-prim1 px-2 py-1 border-[2px] text-sm border-[var(--text-prim1)] focus:border-[var(--text-prim2)] rounded-[4px]"
                  value={folderName}
                  onChange={handleFolderNameChange}
               />
            </div>
            <div className="flex justify-end text-sm">
               <button
                  onClick={onClose}
                  className="px-4 py-1 mr-2 hover:bg-seco1 text-prim2 rounded-lg"
               >
                  Cancel
               </button>
               <button
                  onClick={name ? handelRenameFolder : handleCreateFolder}
                  className="px-4 py-1 text-prim2 hover:bg-seco1 rounded-lg"
               >
                  {name ? "Rename" : "Create"}
               </button>
            </div>
         </div>
      </div>
   );
};

export default CreateEditFolderUI;
