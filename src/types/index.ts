import { ReactNode } from "react";

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
};

export type FileFolderProviderProps = {
   children: ReactNode;
};
