import { FC, useEffect, useContext } from "react";
import SideBar from "@/components/SideBar";
import MyDrive from "@/pages/subPages/MyDrive";
import Header from "@/components/Header";
import { SessionProp } from "@/types/index";
import { SessionContext } from "@/context/SessionContext";

const Landing: FC<SessionProp> = ({ session }) => {
   // console.log(session);
   const sessionContext = useContext(SessionContext);

   const setSession = sessionContext?.setSession;
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
