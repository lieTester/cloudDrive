import { FC, useState, useContext } from "react";
import { CreateFolderUIProps } from "@/types";
import { useSession } from "next-auth/react";
import FileFolderContext from "@/context/FileDataContext";
import { createFolderInFolder } from "@/schema/dataFunctions";

const CreateFolderUI: FC<CreateFolderUIProps> = ({ isOpen, onClose }) => {
   const { data: session } = useSession();
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const contextValue = useContext(FileFolderContext);
   const folderInfo = contextValue?.folderInfo; // Use optional chaining here
   const setAddedFileFolder = contextValue?.setAddedFileFolder; // will use this if we create a new folder

   // create folder name
   const [folderName, setFolderName] = useState("");
   const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFolderName(e.target.value);
   };

   const handleCreateFolder = () => {
      // You can implement folder creation logic here
      console.log("Creating folder:", folderName);
      if (session?.user?.email && folderInfo?.parentFolder) {
         const data = {
            name: folderName,
            owner: session?.user?.email,
            isFolder: true,
            parentFolder: folderInfo?.parentFolder,
         };
         // console.log(data);
         createFolderInFolder(data).then((res) => {
            // console.log("Folder created:", res); //will get id of folder create in firestore
            if (setAddedFileFolder) setAddedFileFolder(true);
            onClose();
         });
      }
   };

   const handleOverlayClick = () => {
      onClose();
   };

   return (
      <div
         className={`${
            isOpen ? "fixed inset-0 flex items-center justify-center" : "hidden"
         } bg-black bg-opacity-50 z-50`}
         onClick={handleOverlayClick} // Close when the faded portion is clicked
      >
         <div
            className="bg-prim2 rounded-lg p-6 w-96"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-2xl mb-4">New Folder</h2>
            <div className="mb-4">
               <input
                  type="text"
                  placeholder="Untitled folder"
                  className="w-full outline-none px-3 py-2 border-[2px] border-[var(--text-prim1)] focus:border-[var(--text-prim2)] rounded-[4px]"
                  value={folderName}
                  onChange={handleFolderNameChange}
               />
            </div>
            <div className="flex justify-end">
               <button
                  onClick={onClose}
                  className="px-4 py-1 mr-2 hover:bg-seco1 text-prim2 rounded-lg"
               >
                  Cancel
               </button>
               <button
                  onClick={handleCreateFolder}
                  className="px-4 py-1 text-prim2 hover:bg-seco1 rounded-lg"
               >
                  Create
               </button>
            </div>
         </div>
      </div>
   );
};

export default CreateFolderUI;
