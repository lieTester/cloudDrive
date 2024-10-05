// types.ts
export interface File {
   name: string;
   size: number;
   owner: string;
   isFolder: boolean;
   fileLink: string;
   storageFileName: string;
   parentFolder: string;
   trash?: boolean;
   shared?: boolean;
   isStarred?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface Folder {
   name: string;
   owner: string;
   isFolder: boolean;
   parentFolder: string;
   trash?: boolean;
   shared?: boolean;
   createdAt?: Date;
   updatedAt?: Date;
}

export interface FolderWithID {
   data: Folder;
   id: string;
}
export interface FileWithID {
   data: File;
   id: string;
}
