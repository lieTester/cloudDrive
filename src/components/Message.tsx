import React, { useContext, useEffect, useState } from "react";
import MessageContext from "@/context/MessageContext";

const Message: React.FC = () => {
   const messageContext = useContext(MessageContext);

   const open = messageContext?.open;
   const message = messageContext?.message;
   const severity = messageContext?.severity;

   return (
      <div
         className={`${
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6"
         } transition-all duration-700 ease-in-out fixed w-full top-2 flex justify-center items-center z-[50]`}
      >
         <div
            className={`${
               severity === "urgent"
                  ? "bg-red-100 text-red-800 border-red-300"
                  : severity === "success"
                  ? "bg-green-100 text-green-800 border-green-300"
                  : "bg-yellow-100 text-yellow-800 border-yellow-300"
            } px-4 py-2 border rounded-lg shadow-lg max-w-md w-[90%] text-center font-semibold`}
         >
            {message}
         </div>
      </div>
   );
};

export default Message;
