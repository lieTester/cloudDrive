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
   serverTimestamp,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { File, Folder, FileWithID, FolderWithID } from "../types/modelTypes";
import DeleteFile from "@/functions/DeleteFile";

const db = database;

////////////////////////////////////////////////////////////////////////
// Utility for structured responses
////////////////////////////////////////////////////////////////////////

const createResponse = ({
   status,
   statusCode,
   message,
   data,
   error,
}: {
   status: string;
   statusCode: number;
   message: string;
   data?: any;
   error?: any;
}) => {
   return {
      status,
      statusCode,
      message,
      ...(data && { data }),
      ...(error && { error }),
   };
};

// Function to create a file in a folder
export const createFileInFolder = async ({ file }: { file: File }) => {
   // Validate input
   if (!file || !file.parentFolder || !file.name) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Invalid file data: parentFolder and name are required.",
      });
   }

   try {
      const parentId = file.parentFolder;
      const dataCollection = collection(db, "data");

      const existingFilesQuery = query(
         dataCollection,
         where("parentFolder", "==", parentId),
         where("name", "==", file.name)
      );
      const existingFiles = await getDocs(existingFilesQuery);

      if (!existingFiles.empty) {
         // File with the same name in the parent folder exists
         return createResponse({
            status: "error",
            statusCode: 409,
            message: "File with the same name already exists in the folder.",
            data: existingFiles.docs[0].id,
         });
      }
      const fileData = {
         ...file,
         createdAt: serverTimestamp(),
         updatedAt: serverTimestamp(),
      };
      const docRef = await addDoc(dataCollection, fileData).catch((err) => {
         throw err;
      });
      if (docRef) {
         const userQuery = query(
            collection(db, "users"),
            where("email", "==", file.owner)
         );
         const users = await getDocs(userQuery);
         const userRef = doc(db, "users", users?.docs[0]?.id);

         await updateDoc(userRef, {
            TOTAL_STORAGE_USED:
               (users?.docs[0]?.data()?.TOTAL_STORAGE_USED || 0) + file.size,
         });
      }
      return createResponse({
         status: "success",
         statusCode: 201,
         message: "File added successfully",
         data: docRef.id,
      });
   } catch (error) {
      console.error(error);
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error creating file.",
         error: error, // or just error if you want to log the whole error
      });
   }
};

export const createFolderInFolder = async (folder: Folder) => {
   // Validate input
   if (!folder || !folder.parentFolder || !folder.name) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Invalid folder data: parentFolder and name are required.",
      });
   }

   try {
      const parentId = folder.parentFolder;
      const dataCollection = collection(db, "data");

      const existingFoldersQuery = query(
         dataCollection,
         where("parentFolder", "==", parentId),
         where("name", "==", folder.name)
      );
      const existingFolders = await getDocs(existingFoldersQuery);

      if (!existingFolders.empty) {
         // Folder with the same name in the parent folder exists
         return createResponse({
            status: "error",
            statusCode: 409,
            message: "Folder with the same name already exists in the folder.",
            data: existingFolders.docs[0].id,
         });
      }

      const docRef = await addDoc(dataCollection, {
         ...folder,
         createdAt: serverTimestamp(),
         updatedAt: serverTimestamp(),
      });
      return createResponse({
         status: "success",
         statusCode: 201,
         message: "Folder created successfully",
         data: docRef.id,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error creating folder.",
         error: error, // or just error if you want to log the whole error
      });
   }
};

export const getFolderContents = async ({
   folderId,
   owner,
}: {
   folderId: string;
   owner: string;
}) => {
   try {
      const dataCollection = query(
         collection(db, "data"),
         where("parentFolder", "==", folderId),
         where("owner", "==", owner)
      );
      const querySnapshot = await getDocs(dataCollection);

      const contents = querySnapshot.docs.map((doc) => {
         const data = doc.data();

         // Check if the item is marked as trash
         if (data.trash === true) {
            return undefined; // Skip this item
         }

         // Determine if the document is a folder or a file
         if (data.isFolder) {
            return {
               data: data as Folder,
               id: doc.id,
            } as FolderWithID;
         }

         return { data: data as File, id: doc.id } as FileWithID;
      });

      // Filter out undefined items (trashed items)
      const filteredContents = contents.filter((item) => item !== undefined);

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder contents retrieved successfully.",
         data: filteredContents,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Not able to get data.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const renameFolder = async ({
   folderName,
   folderId,
}: {
   folderName: string;
   folderId: string;
}) => {
   // Validate input
   if (!folderName || !folderId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Invalid input: folderName and folderId are required.",
      });
   }

   try {
      const folderRef = doc(db, "data", folderId);
      await updateDoc(folderRef, {
         name: folderName,
         updatedAt: serverTimestamp(),
      });

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder renamed successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error renaming folder.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const deleteFolder = async ({
   folderId,
   user,
}: {
   folderId: string;
   user: string;
}) => {
   // Check if folderId is valid
   if (!folderId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Invalid folder ID.",
      });
   }

   try {
      const folderRef = doc(db, "data", folderId);
      const folderDoc = await getDoc(folderRef);
      // Check if the folder exists
      if (!folderDoc.exists()) {
         return createResponse({
            status: "error",
            statusCode: 404,
            message: "Folder not found.",
         });
      }
      if (folderDoc.data().owner !== user) {
         return createResponse({
            status: "error",
            statusCode: 403,
            message: "You are not authorized to delete folder",
         });
      }

      // BFS/DFS logic for deletion
      const queue: [string, boolean][] = [[folderId, true]];
      while (queue.length) {
         const currFolder = queue.shift();
         if (!currFolder) continue; // Avoid undefined access

         if (currFolder[1] === true) {
            const allChildrenCollection = query(
               collection(db, "data"),
               where("parentFolder", "==", currFolder[0])
            );
            const allChildrenSnapshot = await getDocs(allChildrenCollection);
            allChildrenSnapshot.docs.forEach((doc) => {
               queue.push([doc.id, doc.data().isFolder]);
            });
            await deleteDoc(folderRef);
         } else {
            const fileRef = doc(db, "data", currFolder[0]);
            const fileDoc = await getDoc(fileRef);
            await DeleteFile({
               fileName: fileDoc.data()?.storageFileName,
               fileId: fileDoc.id,
               owner: fileDoc?.data()?.owner,
            });
         }
      }

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder deleted successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error deleting the folder.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const deleteFileFromDoc = async (fileId: string) => {
   // Validate fileId
   if (!fileId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Invalid file ID.",
      });
   }

   try {
      const fileRef = doc(db, "data", fileId);
      const fileDoc = await getDoc(fileRef);

      // Check if the file exists
      if (!fileDoc.exists()) {
         return createResponse({
            status: "error",
            statusCode: 404,
            message: "File not found.",
         });
      }
      const userQuery = query(
         collection(db, "users"),
         where("email", "==", fileDoc?.data()?.owner)
      );
      const users = await getDocs(userQuery);
      const userRef = doc(db, "users", users?.docs[0]?.id);
      await updateDoc(userRef, {
         TOTAL_STORAGE_USED:
            users?.docs[0]?.data()?.TOTAL_STORAGE_USED - fileDoc?.data()?.size,
      });
      await deleteDoc(fileRef);
      return createResponse({
         status: "success",
         statusCode: 200,
         message: "File deleted successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error deleting the file.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// trash  functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const moveToTrash = async (fileFolderId: string) => {
   // Validate input
   if (!fileFolderId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Invalid folder or file ID.",
      });
   }

   try {
      const queue: string[] = [fileFolderId];

      while (queue.length) {
         const currFileFolderId = queue.shift(); // Get the first element from the queue

         if (!currFileFolderId) continue; // Safeguard in case of unexpected undefined

         // Retrieve all children
         const allChildrenCollection = query(
            collection(db, "data"),
            where("parentFolder", "==", currFileFolderId)
         );
         const allChildrenSnapshot = await getDocs(allChildrenCollection);

         // Add children to the queue
         allChildrenSnapshot.docs.forEach((doc) => {
            queue.push(doc.id);
         });

         const folderRef = doc(db, "data", currFileFolderId); // This should now be valid

         // Update the folder's trash status
         await updateDoc(folderRef, {
            trash: currFileFolderId === fileFolderId,
            ancestorTrash: currFileFolderId !== fileFolderId,
         });
      }

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder moved to trash successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error moving folder to trash.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const getTrash = async (owner: string) => {
   // Validate input
   if (!owner) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Owner ID is required.",
      });
   }

   try {
      const dataCollection = query(
         collection(db, "data"),
         where("trash", "==", true),
         where("owner", "==", owner)
      );

      const querySnapshot = await getDocs(dataCollection);

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Trash retrieved successfully.",
         data: querySnapshot.docs.map((doc) => {
            if (doc.data().isFolder) {
               return {
                  data: doc.data() as Folder,
                  id: doc.id,
               } as FolderWithID;
            }
            return { data: doc.data() as File, id: doc.id } as FileWithID;
         }),
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error retrieving trash.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const restoreToDrive = async (fileFolderId: string) => {
   // Validate input
   if (!fileFolderId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "File or folder ID is required.",
      });
   }

   try {
      const queue = [fileFolderId];
      while (queue.length) {
         const currFileFolderId = queue.shift()!; // Get and remove the first element from the queue
         const allChildrenCollection = query(
            collection(db, "data"),
            where("parentFolder", "==", currFileFolderId)
         );
         const allChildrenSnapshot = await getDocs(allChildrenCollection);

         // Add all children to the queue
         allChildrenSnapshot.docs.forEach((doc) => {
            queue.push(doc.id);
         });

         const folderRef = doc(db, "data", currFileFolderId);

         // Update the trash status
         if (currFileFolderId === fileFolderId) {
            await updateDoc(folderRef, {
               trash: false,
               updatedAt: serverTimestamp(),
            });
         } else {
            await updateDoc(folderRef, {
               ancestorTrash: false,
               updatedAt: serverTimestamp(),
            });
         }
      }

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder restored successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error restoring the file or folder.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

////////////////////////////////////////////////////////////////////////
// Search function
////////////////////////////////////////////////////////////////////////

export const searchByTerm = async ({
   owner,
   searchTerm,
}: {
   owner: string;
   searchTerm: string;
}) => {
   // Validate input
   if (!owner || !searchTerm) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Owner and searchTerm are required.",
      });
   }

   try {
      // Perform the search query using Firestore
      const querySnapshot = await getDocs(
         query(
            collection(db, "data"),
            where("owner", "==", owner),
            where("name", ">=", searchTerm),
            where("name", "<=", searchTerm + "\uf8ff")
         )
      );

      const data = querySnapshot.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Found the results.",
         data,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error finding the file.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

////////////////////////////////////////////////////////////////////////
// collect share Data function
////////////////////////////////////////////////////////////////////////

export const collectShareData = async (owner: string) => {
   // Validate input
   if (!owner) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Owner email is required.",
      });
   }

   try {
      const userQuerySnapshot = await getDocs(
         query(collection(db, "users"), where("email", "==", owner))
      );

      if (userQuerySnapshot.empty) {
         return createResponse({
            status: "error",
            statusCode: 404,
            message: "User not found.",
         });
      }

      const User = userQuerySnapshot.docs[0];
      const sharedWithMe = User.data()?.sharedWithMe || [];
      // Use Promise.all to fetch all shared documents concurrently
      const allDataPromises = sharedWithMe.map(async (id: string) => {
         const res = await getDoc(doc(collection(db, "data"), id));
         if (res.exists() && !res.data()?.trash) {
            return {
               data: res.data(),
               id: res.id,
            };
         }
         return null; // Skip if the document is in trash
      });

      const allData = await Promise.all(allDataPromises);

      // Filter out null values (trashed documents)
      const filteredData = allData.filter((item) => item !== null);

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Shared data collected successfully.",
         data: filteredData,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Error collecting shared data.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const getNestedShareFolderContents = async ({
   folderId,
   userEmail,
}: {
   folderId: string;
   userEmail: string;
}) => {
   // Validate input
   if (!folderId || !userEmail) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Folder ID and User is required.",
      });
   }

   try {
      const dataCollection = query(
         collection(db, "data"),
         where("parentFolder", "==", folderId),
         where("sharedTo", "array-contains", userEmail) // Will return nothing if sharedTo doesn't exist
      );

      const querySnapshot = await getDocs(dataCollection);

      // Map through documents and build the response
      const contents = querySnapshot.docs.map((doc) => {
         const docData = doc.data();
         // Skip documents that are in trash
         if (docData?.trash) {
            return null;
         }

         const sharedData = { ...docData, shared: true };

         // Return either a folder or a file object
         if (docData.isFolder) {
            return {
               data: sharedData as Folder,
               id: doc.id,
            } as FolderWithID;
         }

         return {
            data: sharedData as File,
            id: doc.id,
         } as FileWithID;
      });

      // Filter out null values (trashed items)
      const filteredContents = contents.filter((item) => item !== null);

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder contents retrieved successfully.",
         data: filteredContents,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Not able to get data.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

////////////////////////////////////////////////////////////////////////
// Starred functions
////////////////////////////////////////////////////////////////////////
export const addStarred = async (folderId: string) => {
   // Validate input
   if (!folderId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Folder ID is required.",
      });
   }

   try {
      const FolderRef = doc(db, "data", folderId);
      await updateDoc(FolderRef, {
         isStarred: true,
         updatedAt: serverTimestamp(),
      });
      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder starred successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Not able to add star.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const removeStarred = async (folderId: string) => {
   // Validate input
   if (!folderId) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Folder ID is required.",
      });
   }

   try {
      const FolderRef = doc(db, "data", folderId);
      await updateDoc(FolderRef, {
         isStarred: false,
         updatedAt: serverTimestamp(),
      });
      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Folder un-starred successfully.",
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Not able to remove star.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};

export const getAllStarredData = async (owner: string) => {
   // Validate input
   if (!owner) {
      return createResponse({
         status: "error",
         statusCode: 400,
         message: "Owner is required.",
      });
   }

   try {
      const dataCollection = query(
         collection(db, "data"),
         where("owner", "==", owner),
         where("isStarred", "==", true)
      );
      const querySnapshot = await getDocs(dataCollection);

      const starredData = querySnapshot.docs
         .map((doc) => {
            if (doc.data()?.trash === true) {
               return undefined; // Skip trashed items
            } else if (doc.data().isFolder) {
               return {
                  data: doc.data() as Folder,
                  id: doc.id,
               } as FolderWithID;
            }
            return { data: doc.data() as File, id: doc.id } as FileWithID;
         })
         .filter(Boolean); // Filter out undefined values

      return createResponse({
         status: "success",
         statusCode: 200,
         message: "Starred data retrieved successfully.",
         data: starredData,
      });
   } catch (error) {
      return createResponse({
         status: "error",
         statusCode: 500,
         message: "Not able to get data.",
         error: error instanceof Error ? error.message : String(error),
      });
   }
};
