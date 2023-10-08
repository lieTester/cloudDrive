import { FC, useEffect, useContext, useState } from "react";
import SideBar from "@/components/SideBar";
import MyDrive from "@/pages/subPages/MyDrive";
import Header from "@/components/Header";
import { SessionProp } from "@/types/index";
import { SessionContext } from "@/context/SessionContext";

const Landing: FC<SessionProp> = ({ session }) => {
   const [sideBarToogle, setSidebarToogle] = useState(true);

   // session store functionality below
   // console.log(session);
   const sessionContext = useContext(SessionContext);
   const setSession = sessionContext?.setSession;
   useEffect(() => {
      if (session && setSession) {
         setSession(session);
      }
   }, [session]);
   return (
      <section className="w-screen h-screen flex flex-col">
         <Header setToggle={setSidebarToogle} toggle={sideBarToogle} />
         <div className="relative h-[92%] p-2 flex">
            <SideBar toggle={sideBarToogle} />
            <section className="w-full sm:w-[60%] md:w-[75%] lg:w-[85%] h-full bg-prim2 rounded-xl px-2 py-3 flex flex-col ">
               <MyDrive />
            </section>
         </div>
      </section>
   );
};

export default Landing;
