import { FC, useEffect, useContext } from "react";
import SideBar from "@/components/SideBar";
import MyDrive from "@/pages/subPages/MyDrive";
import Header from "@/components/Header";
import { SessionContextType } from "@/types/contextTypes";
import FileFolderContext from "../context/FileDataContext";

const Landing: FC<SessionContextType> = ({ session }) => {
   // console.log(session);
   const contextValue = useContext(FileFolderContext);
   const setSession = contextValue?.setSession;
   useEffect(() => {
      if (session && setSession) {
         setSession(session);
      }
   }, [session]);
   return (
      <>
         <Header />
         <div className="h-[92%] p-2 flex ">
            <SideBar />
            <MyDrive />
         </div>
      </>
   );
};

export default Landing;
