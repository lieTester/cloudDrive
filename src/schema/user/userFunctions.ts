import {
   collection,
   getDocs,
   getDoc,
   addDoc,
   where,
   query,
   doc,
   updateDoc,
} from "firebase/firestore";
import { database } from "../../../firebaseConfig";

const db = database;

const createResponse = ({
   status,
   statusCode,
   message,
   data,
   error,
   value,
}: {
   status: string;
   statusCode: number;
   message: string;
   value?: boolean;
   data?: any;
   error?: any;
}) => {
   return {
      status,
      statusCode,
      message,
      ...(data && { data }),
      ...(error && { error }),
      ...(value && { value }),
   };
};

// Check if a user exists by email
export const userExists = async (email: string) => {
   try {
      // Validate email
      if (!email) {
         return createResponse({
            status: "error",
            statusCode: 400,
            message: "Email is required.",
         });
      }

      const userQuery = query(
         collection(db, "users"),
         where("email", "==", email)
      );
      const users = await getDocs(userQuery);
      const user = users.docs[0];

      if (user && user.exists()) {
         return createResponse({
            status: "success",
            statusCode: 200,
            message: "User found",
            data: user.data(),
            value: true,
         });
      } else {
         return createResponse({
            status: "success",
            statusCode: 200,
            message: "User not found",
            value: false,
         });
      }
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error checking user existence",
         error: error,
      });
   }
};

// Create a new user in Firestore
export const createUser = async (user: any) => {
   try {
      // Validate user object
      if (!user || !user.email || !user.password) {
         return createResponse({
            status: "error",
            statusCode: 400,
            message: "Email and password are required.",
         });
      }

      const userCollection = collection(db, "users");
      const res = await addDoc(userCollection, {
         ...user,
         TOTAL_STORAGE_USED: 0,
      });
      return createResponse({
         status: res.id ? "success" : "fail",
         statusCode: res.id ? 201 : 500,
         message: res.id ? "User created" : "Unknown error occurred",
         data: null,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error creating user",
         error: error,
      });
   }
};

// Search users by email
export const searchUsers = async (searchTerm: string) => {
   try {
      // Validate search term
      if (!searchTerm) {
         return createResponse({
            status: "error",
            statusCode: 400,
            message: "Search term is required.",
         });
      }

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

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Found results",
         data: data,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error searching users",
         error: error,
      });
   }
};

// Share a file/folder with a list of users
export const shareWith = async ({
   id,
   owner,
   usersList,
}: {
   id: string;
   owner: string;
   usersList: { email: string; image: string; id: string }[];
}) => {
   try {
      // Validate input parameters
      if (!id || !owner || !usersList || usersList.length === 0) {
         return createResponse({
            status: "error",
            statusCode: 400,
            message: "Invalid input parameters.",
         });
      }

      const fileOrFolder = await getDoc(doc(db, "data", id));
      if (!fileOrFolder.exists()) {
         return createResponse({
            status: "error",
            statusCode: 404,
            message: "File or folder not found",
            data: null,
         });
      }

      // Use Promise.all to update all users concurrently
      await Promise.all(
         usersList.map(async (user) => {
            const userDoc = await getDoc(doc(db, "users", user.id));
            if (userDoc.exists()) {
               const sharedWithMe = userDoc.data()?.sharedWithMe || [];
               if (!sharedWithMe.includes(id)) {
                  sharedWithMe.push(id);
                  await updateDoc(doc(db, "users", user.id), {
                     sharedWithMe,
                  });
               }
            }
         })
      );

      if (fileOrFolder.data()?.isFolder) {
         const queue = [id];
         while (queue.length) {
            const currFileFolderId = queue.shift()!; // Get and remove the first element from the queue
            const fileOrFolder = await getDoc(
               doc(db, "data", currFileFolderId)
            );
            const sharedToList = fileOrFolder?.data()?.sharedTo || [];
            const newSharedToList = Array.from(
               new Set([
                  ...sharedToList,
                  ...usersList.map((user) => user.email),
               ])
            );
            const folderRef = doc(db, "data", currFileFolderId);
            await updateDoc(folderRef, {
               trash: false,
               sharedTo: newSharedToList,
            });
            // collect inside data of this folder
            if (fileOrFolder.data()?.isFolder) {
               const allChildrenCollection = query(
                  collection(db, "data"),
                  where("parentFolder", "==", fileOrFolder.id)
               );
               const allChildrenSnapshot = await getDocs(allChildrenCollection);
               allChildrenSnapshot.docs.forEach((doc) => {
                  queue.push(doc.id);
               });
            }
         }
      }

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Shared successfully",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error sharing file/folder",
         error: error,
      });
   }
};

export const getUserStorageUsed = async (userId: string) => {
   try {
      const dataCollection = query(
         collection(db, "users"),
         where("id", "==", userId)
      );
      const users = await getDocs(dataCollection);

      // Sum up the sizes of all files
      const totalUsed = users?.docs[0]?.data()?.TOTAL_STORAGE_USED || 0;
      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Found results",
         data: { memory: totalUsed },
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error searching users",
         error: error,
      });
   }
};
