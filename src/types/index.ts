import { ReactNode } from "react";
import { Session } from "next-auth";
import { FileWithID, FolderWithID } from "@/types/modelTypes";

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
