import { ReactNode } from "react";
import { File, FolderWithID } from "@/types/modelTypes";
export type AuthCredType = {
   clientId: string;
   clientSecret: string;
};

export type CreateFolderUIProps = {
   isOpen: boolean;
   onClose: () => void;
};

export type FileUploads = {
   fileName: String;
   progress: number;
   isVisible: boolean;
   onClose: () => void;
};

// file folder related types
export type FolderInfo = {
   parentFolder: string;
};

export type FileFolderContextType = {
   folderInfo: FolderInfo;
   setFolderInfo: React.Dispatch<React.SetStateAction<FolderInfo>>;
   allFiles: File[];
   setAllFiles: React.Dispatch<React.SetStateAction<File[]>>;
   allFolders: FolderWithID[];
   setAllFolders: React.Dispatch<React.SetStateAction<FolderWithID[]>>;
};

export type FileFolderProviderProps = {
   children: ReactNode;
};
