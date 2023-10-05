import React, { useState, createContext, ReactNode } from "react";
import {
   FolderInfo,
   FileFolderContextType,
   FileFolderProviderProps,
} from "@/types/index";
import { File, FolderWithID } from "@/types/modelTypes";

const FileFolderContext = createContext<FileFolderContextType | undefined>(
   undefined
);

export const FileFolderProvider = ({ children }: FileFolderProviderProps) => {
   const [folderInfo, setFolderInfo] = useState<FolderInfo>({
      parentFolder: "My Drive",
   });

   const [addedFileFolder, setAddedFileFolder] = useState<boolean>(false); // if we added any new file or folder this will trigger use effect for realtime data

   const [allFiles, setAllFiles] = useState<File[]>([]); // Initialize as an array

   const [allFolders, setAllFolders] = useState<FolderWithID[]>([]);

   return (
      <FileFolderContext.Provider
         value={{
            folderInfo,
            setFolderInfo,
            allFiles,
            setAllFiles, // Updated to match the type
            allFolders,
            setAllFolders,
            addedFileFolder,
            setAddedFileFolder,
         }}
      >
         {children}
      </FileFolderContext.Provider>
   );
};

export default FileFolderContext;
