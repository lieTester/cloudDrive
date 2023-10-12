// FileFolderContext.tsx
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { FileWithID, FolderWithID } from "@/types/modelTypes";
import { FileFolderContextType } from "@/types/contextTypes";
import { ChildrenProp, CreateEditFileFolderUIProps } from "@/types/index";

export const FileFolderContext = createContext<
   FileFolderContextType | undefined
>(undefined);

export const FileFolderProvider = ({ children }: ChildrenProp) => {
   const [folderFileHandler, setFolderFileHandler] =
      useState<CreateEditFileFolderUIProps>({
         isOpen: false,
      });
   const [addedFileFolder, setAddedFileFolder] = useState<boolean>(false);
   const [allFiles, setAllFiles] = useState<FileWithID[]>([]);
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
            folderFileHandler,
            setFolderFileHandler,
         }}
      >
         {children}
      </FileFolderContext.Provider>
   );
};
