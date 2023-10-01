// types.ts
export interface File {
   name: string;
   size: number;
   type: string;
   timestamp: any; // Use Firestore Timestamp type
   owner: string;
   isFolder: boolean;
}

export interface Folder {
   name: string;
   owner: string;
   isFolder: true;
}

export interface User {
   username: string;
   email: string;
   filesCount: number;
   storageUsed: number;
}
