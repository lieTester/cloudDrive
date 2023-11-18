// firebase-collections.ts
import {
   collection,
   getDocs,
   getDoc,
   addDoc,
   where,
   query,
   doc,
   deleteDoc,
   updateDoc,
} from "firebase/firestore";
import { database } from "../../../firebaseConfig";
import { File, Folder, FileWithID, FolderWithID } from "@/types/modelTypes";

const db = database;

export const userExists = async (email: string) => {
   try {
      const userQuery = query(
         collection(db, "data"),
         where("email", "==", email)
      );
      const users = await getDocs(userQuery);
      const res = users.docs[0];

      if (res.exists()) {
         return {
            status: "success",
            message: "User found",
            value: true,
            data: res.data(),
         };
      } else {
         return {
            status: "success",
            message: "User not found",
            value: true,
            data: null,
         };
      }
   } catch (error) {
      return {
         status: "error",
         message: "Error checking user existence",
         error,
         value: false,
      };
   }
};
export const createUser = async (user: any) => {
   try {
      const userCollection = collection(db, "user");
      const res = await addDoc(userCollection, user);
      if (res.id) {
         return {
            status: "success",
            message: "User Created",
            value: true,
         };
      } else {
         return {
            status: "fail",
            message: "Unknown error occurred",
            value: false,
         };
      }
   } catch (error) {
      return {
         status: "error",
         message: "Error checking user existence",
         error,
         value: false,
      };
   }
};
