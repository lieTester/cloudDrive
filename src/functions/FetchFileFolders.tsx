import { useEffect } from "react";
import { getFolderContents } from "@/schema/dataFunctions";
import { File, Folder, FolderWithID, FileWithID } from "@/types/modelTypes";
import { FolderInfo } from "@/types/contextTypes";

const FetchFileFolders = ({
   setAddedFileFolder,
   folderInfo,
   session,
   setAllFiles,
   setAllFolders,
}: {
   setAddedFileFolder?: (value: boolean) => void;
   folderInfo?: FolderInfo | null;
   session?: any;
   setAllFiles?: (files: FileWithID[]) => void;
   setAllFolders?: (folders: FolderWithID[]) => void;
}) => {
   if (setAddedFileFolder) setAddedFileFolder(false);
   if (session?.user?.email && folderInfo) {
      try {
         getFolderContents(folderInfo.parentFolder, session.user.email).then(
            (arr: any) => {
               const files: FileWithID[] = [];
               const folders: FolderWithID[] = [];
               arr.forEach((detail: FileWithID | FolderWithID) => {
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
            }
         );
      } catch (error) {
         console.log(error);
      }
   }
};

export default FetchFileFolders;
