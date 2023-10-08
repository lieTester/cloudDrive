// react, next
import { useState, useContext, FC } from "react";
// icons
import { ImDrive } from "react-icons/im";
import { MdDevices, MdUploadFile } from "react-icons/md";
import { FaUserGroup } from "react-icons/fa6";
import { BiTimeFive } from "react-icons/bi";
import { RiSpam2Line } from "react-icons/ri";
import { AiOutlineCloud, AiOutlineStar } from "react-icons/ai";
import { BsFolderPlus, BsFolderSymlink } from "react-icons/bs";
// contexts
import { FileFolderContext } from "@/context/FileFolderContext";
import { FolderInfoContext } from "@/context/FolderInfoContext";
import { SessionContext } from "@/context/SessionContext";
// functions
import UploadFile from "@/functions/UploadFile";
// components
import FileUpload from "@/components/subcomponent/FileUploadsUI";
import CreateFolderUI from "@/components/subcomponent/CreateFolderUI";
import NavigationList from "@/components/subcomponent/NavigationItems";

const SideBar: FC<{ toggle: boolean }> = ({ toggle }) => {
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const folderInfoContext = useContext(FolderInfoContext);
   const fileFolderContext = useContext(FileFolderContext);
   const sessionContext = useContext(SessionContext);

   const folderInfo = folderInfoContext?.folderInfo; // Use optional chaining here
   const setAddedFileFolder = fileFolderContext?.setAddedFileFolder;
   const session = sessionContext?.session;

   const [fileFolderOpt, setfileFolderOpt] = useState(false);
   const [openCreateFolder, setOpenCreateFolder] = useState(false);

   // to create add new folder window
   const handelCreateFolder = () => {
      setOpenCreateFolder(!openCreateFolder);
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

   return (
      <div
         className={`absolute sm:!left-0 ${
            toggle ? " left-0 " : " -left-full "
         } top-0 w-full  sm:relative  sm:w-[40%] md:w-[35%] lg:w-[25%] bg-prim1 transition-all duration-100 h-full p-2 z-10 flex flex-col`}
      >
         <div className="w-full relative z-20">
            <button
               onClick={() => {
                  setfileFolderOpt(!fileFolderOpt);
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
               }  transition-all ease-in duration-200  absolute cursor-pointer overflow-hidden top-0 text-[13px] bg-prim2 w-[120%] [&>li:hover]:bg-seco2 drop-shadow-md shadow-slate-800 rounded-[5px]`}
               onClick={() => {
                  setfileFolderOpt(!fileFolderOpt);
               }}
            >
               <li
                  className="px-2 pt-2 pb-1  flex"
                  onClick={handelCreateFolder}
               >
                  <BsFolderPlus size={18} className="mx-2" /> New folder
               </li>
               <li className="!relative px-2 pt-2 pb-1  flex">
                  <input
                     className="absolute top-0 left-0 opacity-0 w-full h-full"
                     type="file"
                     onChange={(e) => {
                        handleFileChange(e);
                     }}
                  />
                  <MdUploadFile size={18} className="mx-2" /> File Upload
               </li>
               <li className="px-2 pt-2 pb-1  flex">
                  <BsFolderSymlink size={18} className="mx-2" /> Folder Upload
               </li>
            </ul>
            <CreateFolderUI
               isOpen={openCreateFolder}
               onClose={handelCreateFolder}
            />
            <FileUpload
               isVisible={fileUploadCompVisiblity}
               onClose={closeUploadBlock}
               fileName={file}
               progress={progress}
            />
         </div>
         <div
            className="flex-grow overflow-y-auto"
            onClick={() => setfileFolderOpt(false)}
         >
            {/* <ul className="w-[90%] py-3 text-prim1 text-[13px] [&>li]:rounded-full [&>li]:m-1 [&>li]:w-full [&>li]:pl-3 [&>li]:py-1 cursor-pointer">
               <li className="flex bg-extra1  hover:bg-seco2 align-middle">
                  <ImDrive className="mr-3  text-xl mt-[1px]" />
                  My Drive
               </li>
               <li className="flex  hover:bg-seco2">
                  <MdDevices className="mr-3  text-xl mt-[1px]" />
                  Computers
               </li>
               <li className="flex  hover:bg-seco2">
                  <FaUserGroup className="mr-3  text-xl mt-[1px]" />
                  Shared with me
               </li>
               <li className="flex  hover:bg-seco2">
                  <BiTimeFive className="mr-3  text-xl mt-[1px]" />
                  Recent
               </li>
               <li className="flex  hover:bg-seco2">
                  <AiOutlineStar className="mr-2  text-xl mt-[1px]" /> Stared
               </li>
               <li className="flex  hover:bg-seco2">
                  <RiSpam2Line className="mr-2  text-xl mt-[1px]" /> Spam
               </li>
               <li className="flex  hover:bg-seco2">
                  <BsTrash className="mr-2 text-xl mt-[1px]" /> Trash
               </li>
               <li className="flex  hover:bg-seco2">
                  <AiOutlineCloud className="mr-2  text-xl mt-[1px]" /> Storage
               </li>
            </ul> */}
            <NavigationList />
            <span className="inline-block w-full text-center text-prim2 text-base border-2 border-seco2 rounded-full py-1 hover:bg-seco1">
               Get more storage
            </span>
         </div>
      </div>
   );
};

export default SideBar;
