// FolderInfoContext.tsx
import React, { createContext, useState } from "react";
import { FolderInfo, FolderInfoContextType } from "@/types/contextTypes";
import { ChildrenProp } from "@/types/index";

export const FolderInfoContext = createContext<
   FolderInfoContextType | undefined
>(undefined);

export const FolderInfoProvider = ({ children }: ChildrenProp) => {
   const [folderInfo, setFolderInfo] = useState<FolderInfo>({
      parentFolder: "My Drive",
   });

   return (
      <FolderInfoContext.Provider value={{ folderInfo, setFolderInfo }}>
         {children}
      </FolderInfoContext.Provider>
   );
};
