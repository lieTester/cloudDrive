// types.ts
export interface File {
   name: string;
   size: number;
   owner: string;
   trash?: boolean;
   shared?: boolean;
   fileLink: string;
   isFolder: boolean;
   isStarred?: boolean;
   parentFolder: string;
   storageFileName: string;
}

export interface Folder {
   name: string;
   owner: string;
   trash?: boolean;
   shared?: boolean;
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
