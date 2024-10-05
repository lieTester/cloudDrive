import { ReactNode } from "react";
import { Session } from "next-auth";
import { FileWithID, FolderWithID } from "@/types/modelTypes";
import { CreateEditFileFolderUIProps } from "@/types/index";

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
   folderFileHandler: CreateEditFileFolderUIProps;
   setFolderFileHandler: React.Dispatch<
      React.SetStateAction<CreateEditFileFolderUIProps>
   >;
   folderFileShareHandler: {
      isOpen: boolean;
      id?: string;
   };
   setFolderFileShareHandler: React.Dispatch<
      React.SetStateAction<{
         isOpen: boolean;
         id?: string;
      }>
   >;
   addedFileFolder: boolean;
   setAddedFileFolder: React.Dispatch<React.SetStateAction<boolean>>;
   allFiles: FileWithID[];
   setAllFiles: React.Dispatch<React.SetStateAction<FileWithID[]>>;
   allFolders: FolderWithID[];
   setAllFolders: React.Dispatch<React.SetStateAction<FolderWithID[]>>;
};

// SessionContext.tsx
export type SessionContextType = {
   session: any;
   setSession: React.Dispatch<React.SetStateAction<any>>;
};
// MessageContext.tsx
export type MessageContextType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   message: string;
   setMessage: React.Dispatch<React.SetStateAction<string>>;
   severity: string;
   setSeverity: React.Dispatch<React.SetStateAction<string>>;
};
