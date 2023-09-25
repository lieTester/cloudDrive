import React, { FC, useState } from "react";

const CreateFolderUI: FC<CreateFolderUIProps> = ({ isOpen, onClose }) => {
   const [folderName, setFolderName] = useState("");

   const handleFolderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFolderName(e.target.value);
   };

   const handleCreateFolder = () => {
      // You can implement folder creation logic here
      console.log("Creating folder:", folderName);
      onClose();
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
