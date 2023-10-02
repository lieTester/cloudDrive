import React, { useState, createContext, ReactNode } from "react";
import {
   FolderInfo,
   FileFolderContextType,
   FileFolderProviderProps,
} from "@/types/index";

const FileFolderContext = createContext<FileFolderContextType | undefined>(
   undefined
);

export const FileFolderProvider = ({ children }: FileFolderProviderProps) => {
   const [folderInfo, setFolderInfo] = useState<FolderInfo>({
      parentFolder: "My Drive",
   });

   return (
      <FileFolderContext.Provider value={{ folderInfo, setFolderInfo }}>
         {children}
      </FileFolderContext.Provider>
   );
};

export default FileFolderContext;
