import { useEffect } from "react";
import { getFolderContents } from "@/schema/dataFunctions";
import { File, Folder, FolderWithID } from "@/types/modelTypes";
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
   setAllFiles?: (files: File[]) => void;
   setAllFolders?: (folders: FolderWithID[]) => void;
}) => {
   if (setAddedFileFolder) setAddedFileFolder(false);
   if (session?.user?.email && folderInfo) {
      try {
         getFolderContents(folderInfo.parentFolder, session.user.email).then(
            (arr) => {
               const files: File[] = [];
               const folders: FolderWithID[] = [];
               arr.forEach((detail: any) => {
                  if ((detail[0] as File).isFolder !== undefined) {
                     if ((detail[0] as File).isFolder) {
                        const folderData: FolderWithID = {
                           data: detail[0] as Folder,
                           id: detail[1],
                        };
                        folders.push(folderData);
                     } else {
                        files.push(detail[0] as File);
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
