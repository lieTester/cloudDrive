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
         collection(db, "users"),
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
      const userCollection = collection(db, "users");
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
export const serachUsers = async (searchTerm: string) => {
   try {
      // Perform the search query using Firestore
      console.log(searchTerm);
      const querySnapshot = await getDocs(
         query(
            collection(db, "users"),
            where("email", ">=", searchTerm),
            where("email", "<=", searchTerm + "\uf8ff")
         )
      );

      const data = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         email: doc.data().email,
         image: doc.data().image,
      }));

      return { status: "success", message: "find the results", data };
   } catch (error) {
      return { status: "error", message: "Error finding the file", error };
   }
};

export const shareWith = async (
   id: string,
   usersList: { email: string; image: string; id: string }[]
) => {
   try {
      console.log(usersList, id);
   } catch (error) {
      return {
         error,
         status: "error",
         message: "Error checking user existence",
      };
   }
};
