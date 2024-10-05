import { ChildrenProp } from "@/types";
import { MessageContextType } from "@/types/contextTypes";
import React, { createContext, useEffect, useState } from "react";

export const MessageContext = createContext<MessageContextType | undefined>(
   undefined
);
export const MessageContextProvider: React.FC<ChildrenProp> = ({
   children,
}) => {
   const [message, setMessage] = useState<string>("");
   const [severity, setSeverity] = useState<string>("");
   const [open, setOpen] = useState<boolean>(false);
   useEffect(() => {
      if (open) {
         const timer = setTimeout(() => {
            setOpen(false);
         }, 2500);
         return () => clearTimeout(timer);
      }
   }, [open]);

   return (
      <MessageContext.Provider
         value={{ message, setMessage, severity, setSeverity, open, setOpen }}
      >
         {children}
      </MessageContext.Provider>
   );
};

export default MessageContext;
