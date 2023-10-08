"use client";
// we create this as server side it client function don't work
import { SessionProvider } from "next-auth/react";

type Props = {
   children?: React.ReactNode;
};

export const SessionAuthProvider = ({ children }: Props) => {
   return <SessionProvider>{children}</SessionProvider>;
};
