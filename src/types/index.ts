import { ReactNode } from "react";
import { Session } from "next-auth";
import { FileWithID, FolderWithID } from "@/types/modelTypes";

export type AuthCredType = {
   clientId: string;
   clientSecret: string;
};

export type CreateEditFileFolderUIProps = {
   isOpen: boolean;
   name?: string;
   id?: string;
};

export type FileUploads = {
   fileName: String;
   progress: number;
   isVisible: boolean;
   onClose: () => void;
};

export type ChildrenProp = {
   children: ReactNode;
};

export type FolderGridProps = {
   folders: FolderWithID[] | undefined;
};

export type FileGridProps = {
   files: FileWithID[] | undefined;
};
export type SessionProp = {
   session: Session;
};

export type SidebarProps = {
   headerHeight: number | undefined;
};

export type InfoComponentProps = {
   folderOrFile: string; // 'folder' or 'file'
   file?: { name: string; link: string; id: string }; // file detail
   folder?: { name: string; id: string }; // folder detail
   trash?: boolean; // will use it in Trash path
   shared?: boolean; // will use it in shared path
};
