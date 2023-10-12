// react, next
import { useContext, FC } from "react";
import Link from "next/link";
// icons
import { BsThreeDotsVertical, BsTrash } from "react-icons/bs";
import { AiOutlineDownload, AiOutlineFolderView } from "react-icons/ai";
import { RiUserShared2Line } from "react-icons/ri";
import { MdDriveFileRenameOutline } from "react-icons/md";
// contexts
import { FileFolderContext } from "@/context/FileFolderContext";
// functions
import DeleteFile from "@/functions/DeleteFile";
// types
import { FileWithID } from "@/types/modelTypes";

type InfoComponentProps = {
   folderOrFile: string; // 'folder' or 'file'
   file?: FileWithID; // file detail
};

const InfoComponent: FC<InfoComponentProps> = ({ folderOrFile, file }) => {
   const fileFolderContext = useContext(FileFolderContext);
   const setAddedFileFolder = fileFolderContext?.setAddedFileFolder;

   const deleteFile = () => {
      if (file && setAddedFileFolder && folderOrFile === "file") {
         DeleteFile(file?.data.name, file?.id, setAddedFileFolder);
      }
   };
   return (
      <div className="relative inline-block [&>div]:invisible [&>div]:focus-within:visible">
         <button className="text-prim1 text-sm focus:outline-none">
            <BsThreeDotsVertical className="text-prim1 w-[25px] h-[25px] -mr-2 rounded-full hover:bg-seco2 p-1 " />
         </button>
         <div className="absolute -right-3 mt-2 w-24 bg-prim2  border-seco2 border-[1px] rounded-[4px] shadow-lg overflow-hidden z-10">
            <div className="[&>*]:p-1 [&>*:hover]:bg-seco1 [&>*]:text-prim1 [&>*]:text-xs">
               {file && (
                  <button className="w-full   ">
                     <Link
                        href={file?.data.fileLink}
                        target="_blank"
                        className="flex items-center space-x-2"
                     >
                        <AiOutlineFolderView />
                        <span>open</span>
                     </Link>
                  </button>
               )}
               <button className="w-full flex items-center space-x-2 ">
                  <MdDriveFileRenameOutline />
                  <span>Rename</span>
               </button>
               <button className="w-full flex items-center space-x-2 ">
                  <RiUserShared2Line />
                  <span>Share</span>
               </button>
               {folderOrFile === "file" && (
                  <button className="w-full flex items-center space-x-2 ">
                     <AiOutlineDownload />
                     <span>Download</span>
                  </button>
               )}
               <button
                  onClick={deleteFile}
                  className="w-full flex items-center space-x-2 hover:text-red-500"
               >
                  <BsTrash />
                  <span>Delete</span>
               </button>
            </div>
         </div>
      </div>
   );
};

export default InfoComponent;
