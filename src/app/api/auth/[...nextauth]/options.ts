import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { AuthCredType } from "@/types/index";
import { createUser, userExists } from "@/schema/user/userFunctions";

export const options: NextAuthOptions = {
   providers: [
      GithubProvider(<AuthCredType>{
         clientId: process.env.GITHUB_ID,
         clientSecret: process.env.GITHUB_SECRET,
      }),
      GoogleProvider(<AuthCredType>{
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
   ],
   session: {
      strategy: "jwt",
   },
   secret: process.env.NEXTAUTH_SECRET,
   callbacks: {
      async signIn({ user, account, profile }) {
         try {
            if (user?.email) {
               const response = await userExists(user?.email);
               if (response.value) {
                  return true;
               } else {
                  const userData = await createUser(user);
                  if (userData) return true;
                  return false;
               }
            }
            return false;
         } catch (error) {
            console.error(
               "error: ---------------------------------------------------\n",
               error
            );
            return false;
         }
      },
      async jwt({ token, user, account, profile }) {
         return token;
      },
      async session({ session, token, user }) {
         return session;
      },
   },
};
