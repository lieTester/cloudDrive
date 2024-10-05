"use client";
// react, next
import { FC, useState, useContext, useEffect } from "react";
import Image from "next/image";
//icons
import { RiUserShared2Line } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
// context
import { FileFolderContext } from "@/context/FileFolderContext";
import { SessionContext } from "@/context/SessionContext";
// firebase shema
import { shareWith, searchUsers } from "@/schema/user/userFunctions";

const ShareFileFolder: FC<{}> = ({}) => {
   // as over context value is undefined as primarrly so direct destructuring will give warning
   const fileFolderContext = useContext(FileFolderContext);
   const sessionContext = useContext(SessionContext);
   const folderFileShareHandler = fileFolderContext?.folderFileShareHandler;
   const setFolderFileShareHandler =
      fileFolderContext?.setFolderFileShareHandler;

   const session = sessionContext?.session; // Use optional chaining here

   // Search show select users
   const [shareUser, setShareUser] = useState("");
   const [userList, setUserList] = useState<
      { email: string; image: string; id: string }[]
   >([]);
   const [selectedUserList, setSelectedUserList] = useState<
      { email: string; image: string; id: string }[]
   >([]);
   const onClose = () => {
      setFolderFileShareHandler &&
         folderFileShareHandler &&
         setFolderFileShareHandler((prev) => {
            return { ...prev, isOpen: false };
         });
      setSelectedUserList([]);
      setUserList([]);
      setShareUser("");
   };
   const handleShareUserChange = async (
      e: React.ChangeEvent<HTMLInputElement>
   ) => {
      setShareUser(e.target.value);
      if (e.target.value.length) {
         await searchUsers(e.target.value).then((res) => {
            if (res?.data?.length) {
               const newUsers = res?.data?.filter(
                  (user: { email: string; image: string; id: string }) => {
                     const result = selectedUserList.find(
                        (item) => item.id === user.id
                     );
                     if (!result && user.email !== session?.user?.email)
                        return user;
                  }
               );
               setUserList(newUsers);
            }
         });
      }
   };
   const selectUsersToShare = (index: number) => {
      const newSelectedUserList = selectedUserList;
      newSelectedUserList?.push(userList[index]);
      setSelectedUserList(newSelectedUserList);
      const newUserList = userList.filter((user, curr) => {
         if (index !== curr) return user;
      });
      setUserList(newUserList);
   };
   const deSelectUsersToShare = (index: number) => {
      const newUserList = userList;
      newUserList?.push(selectedUserList[index]);
      setUserList(newUserList);
      const newSelectedUserList = selectedUserList.filter((user, curr) => {
         if (index !== curr) return user;
      });
      setSelectedUserList(newSelectedUserList);
   };

   const handleShareUser = async () => {
      try {
         if (selectedUserList.length && folderFileShareHandler?.id)
            await shareWith({
               id: folderFileShareHandler?.id,
               owner: session?.user?.email,
               usersList: selectedUserList,
            })
               .then((res) => {
                  onClose();
               })
               .catch((err) => {
                  throw err;
               });
      } catch (error) {
         console.error(error);
      }
   };
   const getUserEmails = (
      email: string,
      image: string,
      id: number,
      selected?: boolean
   ) => {
      return (
         <li
            key={id}
            className={` flex rounded-xl p-[2px] ${
               selected ? "bg-prim1" : "bg-seco1"
            } items-center mr-1 mb-1`}
            onClick={() => !selected && selectUsersToShare(id)}
         >
            <Image
               className="p-[2px]  h-full rounded-full bg-prim1"
               src={image}
               alt="drive-img"
               width={"20"}
               height={"20"}
            />
            <span className="text-prim1 text-sm mx-1">
               {email}
               {/* lietester.00@gmail.com */}
            </span>
            {selected && (
               <AiOutlineCloseCircle
                  className=" text-prim1 hover:text-red-600 cursor-pointer text-[17px]"
                  onClick={() => {
                     selected && deSelectUsersToShare(id);
                  }}
               />
            )}
         </li>
      );
   };
   return (
      <div
         className={`${
            folderFileShareHandler?.isOpen
               ? "fixed inset-0 flex items-center justify-center"
               : "hidden"
         } bg-black bg-opacity-70 z-[90] font-sofiaPro`}
         onClick={() => onClose()} // Close when the faded portion is clicked
      >
         <div
            className="bg-prim2 rounded-lg py-3 px-5 w-[90%] sm:w-[450px]"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-lg mb-2 text-prim1 flex items-center ">
               <RiUserShared2Line className="bg-seco1 p-1 rounded-full text-2xl mr-2" />{" "}
               Share with
            </h2>
            <div className="mb-3">
               <input
                  type="text"
                  placeholder="Search User..."
                  className="w-full outline-none bg-prim2 text-prim1 px-2 py-1 border-[2px] text-sm border-[var(--text-prim1)] focus:border-[var(--text-prim2)] rounded-[4px]"
                  value={shareUser}
                  onChange={(e) => handleShareUserChange(e)}
               />
               {(selectedUserList.length !== 0 || userList.length !== 0) && (
                  <ul className="flex flex-wrap p-1  rounded-md mt-1 border-seco1 border-[1px]">
                     {selectedUserList &&
                        selectedUserList?.map((data, index) => {
                           return getUserEmails(
                              data.email,
                              data.image,
                              index,
                              true
                           );
                        })}
                     {userList &&
                        userList?.map((data, index) => {
                           return getUserEmails(data.email, data.image, index);
                        })}
                  </ul>
               )}
            </div>
            <div className="flex justify-end text-sm">
               <button
                  onClick={onClose}
                  className="px-4 py-1 mr-2 hover:bg-seco1 text-prim2 rounded-lg"
               >
                  Cancel
               </button>
               <button
                  onClick={handleShareUser}
                  className="px-4 py-1 text-prim2 hover:bg-seco1 rounded-lg"
               >
                  Share
               </button>
            </div>
         </div>
      </div>
   );
};

export default ShareFileFolder;
