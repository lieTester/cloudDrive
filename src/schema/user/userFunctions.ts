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

      const userQuerySnapshot = await getDocs(
         query(
            collection(db, "users"),
            where("email", ">=", searchTerm),
            where("email", "<=", searchTerm + "\uf8ff")
         )
      );

      const data = userQuerySnapshot.docs.map((doc) => ({
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
   owner: string,
   usersList: { email: string; image: string; id: string }[]
) => {
   try {
      const FolderOrFile = await getDoc(doc(collection(db, "data"), id));
      if (FolderOrFile.exists()) {
         const shareWith = FolderOrFile.data()?.shareWith || [];
         usersList.filter((user) => {
            // for duplicasy check
            const res = shareWith.find(
               (item: any) => user.email === item.email
            );
            if (!res) shareWith.push(user.email);
         });
         await updateDoc(doc(collection(db, "data"), id), {
            shareWith: shareWith,
         })
            .then(async (res) => {
               usersList.map(async (user) => {
                  const User = await getDoc(
                     doc(collection(db, "users"), user.id)
                  );
                  if (User.exists()) {
                     const sharedWithMe = User.data()?.sharedWithMe || [];
                     const res = sharedWithMe.find(
                        (item: any) => id === item.id
                     );
                     // for duplicasy check
                     if (!res) sharedWithMe.push(id);

                     await updateDoc(doc(collection(db, "users"), user.id), {
                        sharedWithMe: sharedWithMe,
                     });
                     return {
                        status: "success",
                        message: "shared with listed user",
                        shareWith,
                     };
                  }
               });
            })
            .catch((err) => {
               console.log(err);
            });
      }
      return {
         status: "Error",
         message:
            "Not able to share with listed user unexpected error accoured",
         shareWith,
      };
   } catch (error) {
      return {
         error,
         status: "error",
         message: "Error checking user existence",
      };
   }
};
