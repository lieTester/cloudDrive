import Main from "./Main";
import SideBar from "./SideBar";

const Body = () => {
   return (
      <div className="h-[92%] p-2 flex ">
         <SideBar />
         <Main />
      </div>
   );
};

export default Body;
