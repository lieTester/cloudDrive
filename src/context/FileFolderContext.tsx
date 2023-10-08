// FileFolderContext.tsx
import React, { createContext, ReactNode, useState } from "react";
import { File, FolderWithID } from "@/types/modelTypes";
import { FileFolderContextType } from "@/types/contextTypes";
import { ChildrenProp } from "@/types/index";

export const FileFolderContext = createContext<
   FileFolderContextType | undefined
>(undefined);

export const FileFolderProvider = ({ children }: ChildrenProp) => {
   const [addedFileFolder, setAddedFileFolder] = useState<boolean>(false);
   const [allFiles, setAllFiles] = useState<File[]>([]);
   const [allFolders, setAllFolders] = useState<FolderWithID[]>([]);

   return (
      <FileFolderContext.Provider
         value={{
            addedFileFolder,
            setAddedFileFolder,
            allFiles,
            setAllFiles,
            allFolders,
            setAllFolders,
         }}
      >
         {children}
      </FileFolderContext.Provider>
   );
};
