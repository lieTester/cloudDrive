// react next
import { useContext, useEffect } from "react";
// icons
import { BsCardList } from "react-icons/bs";
// context
import { FileFolderContext } from "@/context/FileFolderContext";
import { SessionContext } from "@/context/SessionContext";
// types
import { FileWithID, Folder, FolderWithID, File } from "@/types/modelTypes";
// compon ents
import FilesUI from "@/components/subcomponent/FileFolder/FilesUI";
import FolderUI from "@/components/subcomponent/FileFolder/FolderUI";
// schema
import { getTrash } from "@/schema/dataFunctions";

const Trash = () => {
   // as over context value is undefined as primarrly so direct destructuring will give warning

   const sessionContext = useContext(SessionContext);
   const fileFolderContext = useContext(FileFolderContext);

   const allFiles = fileFolderContext?.allFiles;
   const setAllFiles = fileFolderContext?.setAllFiles;
   const allFolders = fileFolderContext?.allFolders;
   const setAllFolders = fileFolderContext?.setAllFolders;
   const addedFileFolder = fileFolderContext?.addedFileFolder;

   const session = sessionContext?.session;
   useEffect(() => {
      getTrash(session.user.email).then((trash: any) => {
         const files: FileWithID[] = [];
         const folders: FolderWithID[] = [];
         trash.forEach((detail: FileWithID | FolderWithID) => {
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
   }, [addedFileFolder]);
   return (
      <>
         <div className="relative   w-full flex items-center justify-between">
            <ul className="inline-block [&>li]:text-[22px] [&>li]:px-2  [&>li]:rounded-full">
               <li className="hover:bg-seco2">Trash</li>
            </ul>
            <ul className="float-right mr-3 flex [&>li]:m-1">
               <li className="flex p-2  hover:bg-seco2 align-middle rounded-full">
                  <BsCardList className="text-xl " />
               </li>
            </ul>
         </div>
         <div className="w-auto px-3 flex-grow overflow-y-auto">
            <label className="block text-[14px] text-prim1 !my-3 font-medium">
               Folders
            </label>
            <FolderUI folders={allFolders} />
            <label className="block text-[14px] text-prim1 my-3 font-medium">
               Files
            </label>
            <FilesUI files={allFiles} />
         </div>
      </>
   );
};

export default Trash;
