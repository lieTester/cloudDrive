import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";

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
      CredentialsProvider({
         name: "Credentials",

         credentials: {
            username: {
               label: "Username",
               type: "text",
               placeholder: "Enter the username",
            },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            const user = {
               id: "1",
               name: "J Smith",
               password: "jsmith@example.com",
            };

            if (
               credentials?.username === user.name &&
               credentials?.password === user.password
            ) {
               return user;
            } else {
               return null;
            }
         },
      }),
   ],
};
