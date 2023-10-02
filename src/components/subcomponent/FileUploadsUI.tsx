import React, { useState, FC } from "react";
import { FiX } from "react-icons/fi";
import {
   BiSolidUpArrow,
   BiSolidDownArrow,
   BiSolidCheckCircle,
} from "react-icons/bi";
import { FileUploads } from "@/types";
const FileUpload: FC<FileUploads> = ({
   fileName,
   progress,
   isVisible,
   onClose,
}) => {
   const [minimized, setMinimized] = useState(false);
   const radius = 10; // Radius of the circle
   const circumference = (2 * 22 * radius) / 7;
   const dashOffset = circumference - (progress / 100) * circumference;
   return (
      <div
         className={
            (isVisible ? "visible" : " hidden") +
            ` fixed w-[300px] bottom-0 right-4 bg-prim2 border border-seco2 shadow-lg rounded-lg transition-transform 
         }`
         }
      >
         <div className="flex items-center justify-between p-2 bg-seco2 rounded-t-lg">
            <p className="ml-1 text-prim1 text-sm font-semibold">
               Upload Files
            </p>
            <div className="flex items-center space-x-2">
               <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={() => setMinimized(!minimized)}
               >
                  {minimized ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
               </button>
               <button className="focus:outline-none" onClick={() => onClose()}>
                  <FiX />
               </button>
            </div>
         </div>
         <div
            className={
               minimized
                  ? "h-0 opacity-0"
                  : "h-fit opacity-100" +
                    " transition-all ease-in duration-200  pt-2 p-4  flex justify-start items-center"
            }
         >
            <div className="flex items-center justify-center p-1">
               {progress !== 100 && progress !== 0 && (
                  <>
                     <svg className="transform -rotate-90 w-[40px] h-[40px]">
                        <circle
                           cx="20"
                           cy="20"
                           r={radius}
                           stroke="currentColor"
                           strokeWidth="2"
                           fill="transparent"
                           className="text-extra1"
                        />

                        <circle
                           cx="20"
                           cy="20"
                           r={radius}
                           stroke="currentColor"
                           strokeWidth="2"
                           fill="transparent"
                           strokeDasharray={circumference}
                           strokeDashoffset={dashOffset}
                           className="text-prim2"
                        />
                     </svg>
                     <span className="absolute text-[9px] text-center">{`${Math.floor(
                        progress
                     )}`}</span>
                  </>
               )}
               {progress == 100 && (
                  <BiSolidCheckCircle className="text-green-500" />
               )}
            </div>
            <p className=" truncate max-w-xs text-prim1 text-xs font-openSans ml-3">
               {fileName}
            </p>
         </div>
      </div>
   );
};

export default FileUpload;
