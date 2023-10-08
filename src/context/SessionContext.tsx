// SessionContext.tsx
import React, { createContext, useState } from "react";
import { SessionContextType } from "@/types/contextTypes";
import { ChildrenProp } from "@/types/index";
import { Session } from "next-auth";

export const SessionContext = createContext<SessionContextType | undefined>(
   undefined
);

export const SessionProvider = ({ children }: ChildrenProp) => {
   const [session, setSession] = useState<any>();

   return (
      <SessionContext.Provider value={{ session, setSession }}>
         {children}
      </SessionContext.Provider>
   );
};
