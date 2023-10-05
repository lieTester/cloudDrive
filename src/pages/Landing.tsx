import { FC, useEffect, useContext } from "react";
import Body from "@/components/Body";
import Header from "@/components/Header";
import { SessionProp } from "@/types/index";
import FileFolderContext from "../context/FileDataContext";

const Landing: FC<SessionProp> = ({ session }) => {
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
         <Body />
      </>
   );
};

export default Landing;
