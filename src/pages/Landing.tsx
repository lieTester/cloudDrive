// react, next
import { FC, useEffect, useContext, useState } from "react";
import { useSearchParams } from "next/navigation";
// componets
import SideBar from "@/components/SideBar";
import Header from "@/components/Header";
import MyDrive from "@/pages/subPages/MyDrive";
import Computer from "@/pages/subPages/Computer";
import SharedWithMe from "@/pages/subPages/SharedWithMe";
import Starred from "@/pages/subPages/Starred";
import Spam from "@/pages/subPages/Spam";
import Storage from "@/pages/subPages/Storage";
import Trash from "@/pages/subPages/Trash";
import Recent from "@/pages/subPages/Recent";
import CreateEditFileFolderUI from "@/components/subcomponent/FileFolder/CreateEditFileFolderUI";
import ShareFileFolder from "@/components/subcomponent/FileFolder/ShareFileFolder";
// types
import { SessionProp } from "@/types/index";
// context
import { SessionContext } from "@/context/SessionContext";
import { FileFolderContext } from "@/context/FileFolderContext";
import Message from "@/components/Message";

const Landing: FC<SessionProp> = ({ session }) => {
   // sideBar toggle state pass to header for functional and value to sidebar component
   const [sideBarToogle, setSidebarToogle] = useState(false);
   const toogleHandler = () => setSidebarToogle(!sideBarToogle);

   // session store functionality below
   const sessionContext = useContext(SessionContext);
   const fileFolderContext = useContext(FileFolderContext);
   const folderFileHandler = fileFolderContext?.folderFileHandler;
   const setSession = sessionContext?.setSession;
   useEffect(() => {
      if (session && setSession) {
         setSession(session);
      }
   }, [session]);

   // Navigation part it's not correct way with shallow routing but for this let's go easy
   const [pathValue, setPathValue] = useState<string>("");
   const navigationPath = (path: string | null) => {
      switch (path) {
         case "computers":
            return <Computer />;
         case "shared-with-me":
            return <SharedWithMe />;
         case "recent":
            return <Recent />;
         case "starred":
            return <Starred />;
         case "spam":
            return <Spam />;
         case "trash":
            return <Trash />;
         case "storage":
            return <Storage />;
         default:
            return <MyDrive />;
      }
   };
   const searchParams = useSearchParams();
   useEffect(() => {
      if (searchParams?.get("path")) {
         const path: string | null = searchParams.get("path");
         path && setPathValue(path);
      } else {
         setPathValue("");
      }
   }, [searchParams?.get("path")]);
   return (
      <section className="w-screen h-screen flex flex-col">
         <Header setToggle={toogleHandler} toggle={sideBarToogle} />
         <div className="relative  p-2 flex-grow flex overflow-hidden">
            <SideBar setToggle={toogleHandler} toggle={sideBarToogle} />
            <section className="w-full sm:w-[60%] md:w-[75%] lg:w-[85%] h-full bg-prim2 rounded-xl px-2 py-3 flex flex-col text-prim1">
               {navigationPath(pathValue)}
            </section>
         </div>
         <CreateEditFileFolderUI
            // to controll the type error
            isOpen={folderFileHandler ? folderFileHandler?.isOpen : false}
            name={folderFileHandler ? folderFileHandler?.name : undefined}
            id={folderFileHandler ? folderFileHandler?.id : undefined}
         />
         <ShareFileFolder />
         <Message />
      </section>
   );
};

export default Landing;
