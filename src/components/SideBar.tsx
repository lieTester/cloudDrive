// react, next
import { useState, useContext, FC } from "react";
import Image from "next/image";
// icons
import { MdUploadFile } from "react-icons/md";
import { BsFolderPlus, BsFolderSymlink } from "react-icons/bs";
// contexts
import { FileFolderContext } from "@/context/FileFolderContext";
import { FolderInfoContext } from "@/context/FolderInfoContext";
import { SessionContext } from "@/context/SessionContext";
// functions
import UploadFile from "@/functions/UploadFile";
// components
import FileUpload from "@/components/subcomponent/FileFolder/FileUploadsUI";
import NavigationList from "@/components/subcomponent/NavigationItems";

const SideBar: FC<{ toggle: boolean; setToggle: () => void }> = ({
   toggle,
   setToggle,
}) => {
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const folderInfoContext = useContext(FolderInfoContext);
   const fileFolderContext = useContext(FileFolderContext);
   const sessionContext = useContext(SessionContext);

   const folderInfo = folderInfoContext?.folderInfo; // Use optional chaining here
   const setAddedFileFolder = fileFolderContext?.setAddedFileFolder;
   const setFolderFileHandler = fileFolderContext?.setFolderFileHandler;
   const session = sessionContext?.session;

   const [fileFolderOpt, setfileFolderOpt] = useState(false);

   // to create add new folder window
   const openCloseAddEditFolderUI = () => {
      if (setFolderFileHandler) {
         setFolderFileHandler((prev) => {
            return { ...prev, isOpen: !prev.isOpen };
         });
      }
   };

   // Upload file UI visibility
   const [fileUploadCompVisiblity, setfileUploadCompVisiblity] =
      useState(false);
   const closeUploadBlock = () => {
      // console.log("close upload block");
      setfileUploadCompVisiblity(false);
   };

   // fileUpload related function and states
   const [file, setFile] = useState("");
   const [progress, setProgress] = useState(0);

   const handleFileChange = (e: any) => {
      // console.log(e.target.files[0], file, session?.user?.email);
      // console.log(folderInfo);

      setFile(e.target.files[0].name);
      setfileUploadCompVisiblity(true);
      if (
         session?.user?.email &&
         folderInfo?.parentFolder &&
         setAddedFileFolder
      ) {
         UploadFile(
            e.target.files[0],
            session.user.email,
            folderInfo.parentFolder,
            setProgress,
            setAddedFileFolder // to set that file isuploaded and we can now fetchin realtime
         );
      }
   };

   // floating button toggles
   const [isExpanded, setExpanded] = useState(true);
   const toggleExpanded = () => {
      setExpanded(!isExpanded);
   };

   return (
      <div
         className={`absolute sm:!left-0 ${
            toggle ? " left-0 " : " -left-full "
         } top-0 w-full  sm:relative  sm:w-[40%] md:w-[35%] lg:w-[25%] bg-prim1 transition-all duration-100 h-full p-2 z-10 flex flex-col`}
      >
         <div
            className="w-full relative text-prim1 z-20"
            onBlur={(e) => {
               e.stopPropagation();
               setTimeout(() => {
                  setfileFolderOpt(false);
               }, 300);
            }}
            tabIndex={0}
         >
            <button
               onClick={() => {
                  setfileFolderOpt(true);
               }}
               className="hidden sm:block p-2 px-4  text-4xl bg-prim2 rounded-lg drop-shadow hover:bg-seco1"
            >
               +<span className="ml-3 text-sm align-middle ">New</span>
            </button>
            <ul
               className={` ${
                  fileFolderOpt
                     ? "  h-fit translate-y-0 opacity-100"
                     : " h-0 -translate-y-2 opacity-0"
               }  transition-all ease-in duration-200  absolute cursor-pointer overflow-hidden top-0 text-[13px] bg-prim2 w-[120%] [&>li]:h-8 [&>li:hover]:bg-seco2 drop-shadow-md shadow-slate-800 rounded-[5px]`}
            >
               <li
                  className="px-2 pt-2 pb-1  flex"
                  onClick={openCloseAddEditFolderUI}
               >
                  <BsFolderPlus size={18} className="mx-2" /> New folder
               </li>
               <li className=" px-2 pt-2 pb-1 flex ">
                  <MdUploadFile size={18} className="mx-2" /> File Upload
                  <input
                     className="absolute left-0 top-8 w-full h-8  opacity-0 cursor-pointer"
                     type="file"
                     onChange={(e) => {
                        handleFileChange(e);
                     }}
                  />
               </li>
               <li className="px-2 pt-2 pb-1  flex">
                  <BsFolderSymlink size={18} className="mx-2" /> Folder Upload
               </li>
            </ul>

            <FileUpload
               isVisible={fileUploadCompVisiblity}
               onClose={closeUploadBlock}
               fileName={file}
               progress={progress}
            />
         </div>
         <div
            className="flex-grow overflow-y-auto"
            // onClick={() => setfileFolderOpt(false)}
         >
            <NavigationList setToggle={setToggle} />
            <span className="inline-block w-full text-center text-prim2 text-base border-2 border-seco2 rounded-full py-1 hover:bg-seco1">
               Get more storage
            </span>
         </div>
         {/* floating button for small devices---------------------------------------------------------------------------------------------- */}
         <div className="flex sm:hidden fixed bottom-8 right-8  flex-col space-y-3 z-10">
            <div className="relative [&>*]:cursor-pointer [&>*]:shadow-[#FFFFFF_-1px_1px_4px_4px,#888BF3_-1px_-1px_1px_2px,#888BF3_1px_-1px_1px_2px,#888BF3_-1px_1px_2px_2px] [&>*]:dark:shadow-[var(--bg-prim1)_-1px_1px_4px_4px,var(--bg-seco1)_1px_-1px_1px_2px,var(--bg-seco1)_-1px_1px_2px_2px]">
               <button
                  className={`absolute top-1 left-1 w-[40px] h-[40px] bg-green-500 rounded-full text-white flex items-center justify-center shadow-lg transition-transform ease-in-out duration-300 ${
                     isExpanded ? "translate-y-0" : "-translate-y-[96px]"
                  }`}
               >
                  <input
                     className="absolute top-0 left-0 opacity-0 w-full h-full"
                     type="file"
                     onChange={(e) => {
                        handleFileChange(e);
                     }}
                  />
                  <MdUploadFile size={18} />
               </button>
               <button
                  onClick={openCloseAddEditFolderUI}
                  className={`absolute top-1 left-1 w-[40px] h-[40px] bg-indigo-500 rounded-full text-white flex items-center justify-center shadow-lg transition-transform ease-in-out duration-300 ${
                     isExpanded ? "translate-y-0" : "-translate-y-[50px]"
                  }`}
               >
                  <BsFolderPlus size={18} />
               </button>
               <button
                  className=" w-[47px] h-[47px] rounded-full bg-seco1 flex items-center justify-center drop-shadow-sm  "
                  onClick={toggleExpanded}
               >
                  <Image
                     className="p-[6px] transition-transform transform rotate-0 ease-in-out duration-300 hover:rotate-180"
                     src={"/img/drive.png"}
                     alt="drive-img"
                     width={"35"}
                     height={"35"}
                  />
               </button>
            </div>
         </div>
      </div>
   );
};

export default SideBar;
