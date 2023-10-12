// types.ts
export interface File {
   name: string;
   size: number;
   owner: string;
   isFolder: boolean;
   fileLink: string;
   parentFolder: string;
}

export interface Folder {
   name: string;
   owner: string;
   isFolder: boolean;
   parentFolder: string;
}

export interface FolderWithID {
   data: Folder;
   id: string;
}
export interface FileWithID {
   data: File;
   id: string;
}
