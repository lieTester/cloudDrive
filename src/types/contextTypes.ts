import { ReactNode } from "react";
import { Session } from "next-auth";
import { File, FolderWithID } from "@/types/modelTypes";

// FolderInfo context types
export type FolderInfo = {
   parentFolder: string;
};

export type FolderInfoContextType = {
   folderInfo: FolderInfo;
   setFolderInfo: React.Dispatch<React.SetStateAction<FolderInfo>>;
};

// FileFolderContext.tsx
export type FileFolderContextType = {
   addedFileFolder: boolean;
   setAddedFileFolder: React.Dispatch<React.SetStateAction<boolean>>;
   allFiles: File[];
   setAllFiles: React.Dispatch<React.SetStateAction<File[]>>;
   allFolders: FolderWithID[];
   setAllFolders: React.Dispatch<React.SetStateAction<FolderWithID[]>>;
};

// SessionContext.tsx
export type SessionContextType = {
   session: any;
   setSession: React.Dispatch<React.SetStateAction<any>>;
};
