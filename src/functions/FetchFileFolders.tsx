import { Dispatch, SetStateAction, useEffect } from "react";
import {
   getFolderContents,
   getNestedShareFolderContents,
} from "@/schema/dataFunctions";
import { File, Folder, FolderWithID, FileWithID } from "@/types/modelTypes";
import { FolderInfo } from "@/types/contextTypes";

export const FetchFileFolders = async ({
   session,
   folderInfo,
   setAllFiles,
   setAllFolders,
   setAddedFileFolder,
}: {
   session?: any;
   folderInfo?: FolderInfo | null;
   setAllFiles?: Dispatch<SetStateAction<FileWithID[]>>;
   setAddedFileFolder?: Dispatch<SetStateAction<boolean>>;
   setAllFolders?: Dispatch<SetStateAction<FolderWithID[]>>;
}) => {
   if (setAddedFileFolder) setAddedFileFolder(false);
   if (session?.user?.email && folderInfo) {
      try {
         await getFolderContents({
            folderId: folderInfo.parentFolder,
            owner: session.user.email,
         }).then((res) => {
            const files: FileWithID[] = [];
            const folders: FolderWithID[] = [];

            res?.data?.forEach((detail: FileWithID | FolderWithID) => {
               // console.log(detail);
               if (detail !== undefined) {
                  // to check i thier is any undefiend which means trash value
                  if (detail.data.isFolder) {
                     const folderData: FolderWithID = {
                        data: detail.data as Folder,
                        id: detail.id,
                     };
                     folders.push(folderData);
                  } else {
                     const fileData: FileWithID = {
                        data: detail.data as File,
                        id: detail.id,
                     };
                     files.push(fileData);
                  }
               }
            });
            if (setAllFiles && setAllFolders) {
               setAllFiles(files);
               setAllFolders(folders);
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};
export const FetchShareFileFolders = async ({
   folderInfo,
   userEmail,
   setAllFiles,
   setAllFolders,
}: {
   folderInfo: FolderInfo;
   userEmail: string;
   setAllFiles?: Dispatch<SetStateAction<FileWithID[]>>;
   setAllFolders?: Dispatch<SetStateAction<FolderWithID[]>>;
}) => {
   if (folderInfo) {
      try {
         await getNestedShareFolderContents({
            folderId: folderInfo.parentFolder,
            userEmail,
         }).then((res) => {
            const files: FileWithID[] = [];
            const folders: FolderWithID[] = [];
            res?.data?.forEach((detail: FileWithID | FolderWithID) => {
               // console.log(detail);
               if (detail !== undefined) {
                  // to check i thier is any undefiend which means trash value
                  if (detail.data.isFolder) {
                     const folderData: FolderWithID = {
                        data: detail.data as Folder,
                        id: detail.id,
                     };
                     folders.push(folderData);
                  } else {
                     const fileData: FileWithID = {
                        data: detail.data as File,
                        id: detail.id,
                     };
                     files.push(fileData);
                  }
               }
            });
            if (setAllFiles && setAllFolders) {
               setAllFiles(files);
               setAllFolders(folders);
            }
         });
      } catch (error) {
         console.log(error);
      }
   }
};
