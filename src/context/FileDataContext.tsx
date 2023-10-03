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
         }}
      >
         {children}
      </FileFolderContext.Provider>
   );
};

export default FileFolderContext;
