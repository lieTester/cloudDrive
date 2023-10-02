import Main from "./Main";
import SideBar from "./SideBar";
import { FileFolderProvider } from "../context/FileDataContext";

const Body = () => {
   return (
      <div className="h-[92%] p-2 flex ">
         <FileFolderProvider>
            <>
               <SideBar />
               <Main />
            </>
         </FileFolderProvider>
      </div>
   );
};

export default Body;
