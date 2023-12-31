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
import { database } from "../../firebaseConfig";
import { File, Folder, FileWithID, FolderWithID } from "../types/modelTypes";

const db = database;
export const createFileInFolder = async (file: File) => {
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
         return {
            status: "success",
            message: "File with the same name already exists in the folder.",
            data: existingFiles.docs[0].data().id,
         };
      }

      const docRef = await addDoc(dataCollection, file);
      return {
         status: "success",
         message: "File added successfully",
         data: docRef.id,
      };
   } catch (error) {
      return { status: "error", message: "Error creating file: ", error };
   }
};

export const createFolderInFolder = async (folder: Folder) => {
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
         return {
            status: "success",
            message: "Folder with the same name already exists in the folder.",
            data: existingFolders.docs[0].data().id,
         };
      }

      const docRef = await addDoc(dataCollection, folder);
      return {
         status: "success",
         message: "Folder Created successfully",
         data: docRef.id,
      };
   } catch (error) {
      return { status: "error", message: "Error creating folder: ", error };
   }
};

export const getFolderContents = async (folderId: string, owner: string) => {
   try {
      const dataCollection = query(
         collection(db, "data"),
         where("parentFolder", "==", folderId),
         where("owner", "==", owner)
      );
      const querySnapshot = await getDocs(dataCollection);
      // console.log(querySnapshot.docs);
      return querySnapshot.docs.map((doc) => {
         if (doc.data()?.trash && doc.data().trash === true) {
            // console.log(doc.data().trash);
            return undefined;
         } else if (doc.data().isFolder) {
            return {
               data: doc.data() as Folder,
               id: doc.id,
            } as FolderWithID;
         }
         return { data: doc.data() as File, id: doc.id } as FileWithID;
      });
   } catch (error) {
      return { status: "error", message: "Not able to get data : ", error };
   }
};

export const renameFolder = async (folderName: string, folderId: string) => {
   try {
      const FolderRef = doc(db, "data", folderId);
      // console.log(FolderRef);
      await updateDoc(FolderRef, {
         name: folderName,
      });
      return { status: "success", message: "File deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error renaming folder : ", error };
   }
};

export const deleteFolder = async (folderId: string) => {
   // this is not exact solution it should be BFS or DFS but for show business logic
   try {
      const queue: [string, boolean][] = [[folderId, true]];
      while (queue.length) {
         let currfolder = queue[0];
         queue.shift();
         if (currfolder[1] == true) {
            const allChildreCollection = query(
               collection(db, "data"),
               where("parentFolder", "==", currfolder[0])
            );
            const allChildernSnapshot = await getDocs(allChildreCollection);
            allChildernSnapshot.docs.forEach((doc) => {
               queue.push([doc.id, doc.data().isFolder]);
            });
            await deleteDoc(doc(db, "data", currfolder[0]));
         } else await deleteFile(currfolder[0]);
      }

      return { status: "success", message: "folder deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error deleting the file : ", error };
   }
};

export const deleteFile = async (fileId: string) => {
   try {
      await deleteDoc(doc(db, "data", fileId));
      return { status: "success", message: "File deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error deleting the file : ", error };
   }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// trash  functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const moveToTrash = async (fileFolderId: string) => {
   // this is not exact solution it should be BFS or DFS but for show business logic
   try {
      const queue = [fileFolderId];
      while (queue.length) {
         let currFileFolderId = queue[0];
         queue.shift();
         const allChildreCollection = query(
            collection(db, "data"),
            where("parentFolder", "==", currFileFolderId)
         );
         const allChildernSnapshot = await getDocs(allChildreCollection);
         allChildernSnapshot.docs.forEach((doc) => {
            queue.push(doc.id);
         });
         const FolderRef = doc(db, "data", currFileFolderId);
         // if the fileFolder id is === currFileFolderId then we want it to be trash other wise we want it to be ancestor trash
         // so we can get on trash === true in navigation of Trash path and not its children
         if (currFileFolderId === fileFolderId) {
            await updateDoc(FolderRef, {
               trash: true,
            });
         } else {
            await updateDoc(FolderRef, {
               ancestorTrash: true,
            });
         }
      }

      return {
         status: "success",
         message: "Folder moved to trash successfully",
      };
   } catch (error) {
      return { status: "error", message: "Error deleting the file : ", error };
   }
};
export const getTrash = async (owner: string) => {
   // this is not exact solution it should be BFS or DFS but for show business logic
   try {
      const dataCollection = query(
         collection(db, "data"),
         where("trash", "==", true),
         where("owner", "==", owner)
      );
      const querySnapshot = await getDocs(dataCollection);
      // console.log(querySnapshot);

      return querySnapshot.docs.map((doc) => {
         if (doc.data().isFolder) {
            return {
               data: doc.data() as Folder,
               id: doc.id,
            } as FolderWithID;
         }
         return { data: doc.data() as File, id: doc.id } as FileWithID;
      });
   } catch (error) {
      return { status: "error", message: "Error deleting the file : ", error };
   }
};

export const restoreToDrive = async (fileFolderId: string) => {
   // this is not exact solution it should be BFS or DFS but for show business logic
   try {
      const queue = [fileFolderId];
      while (queue.length) {
         let currFileFolderId = queue[0];
         queue.shift();
         const allChildreCollection = query(
            collection(db, "data"),
            where("parentFolder", "==", currFileFolderId)
         );
         const allChildernSnapshot = await getDocs(allChildreCollection);
         allChildernSnapshot.docs.forEach((doc) => {
            queue.push(doc.id);
         });
         const FolderRef = doc(db, "data", currFileFolderId);
         // if the fileFolder id is === currFileFolderId then we want it to be trash other wise we want it to be ancestor trash
         // so we can get on trash === true in navigation of Trash path and not its children
         if (currFileFolderId === fileFolderId) {
            await updateDoc(FolderRef, {
               trash: false,
            });
         } else {
            await updateDoc(FolderRef, {
               ancestorTrash: false,
            });
         }
      }
      return { status: "success", message: "folder deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error deleting the file : ", error };
   }
};

////////////////////////////////////////////////////////////////////////
// Search function
////////////////////////////////////////////////////////////////////////

export const searchByTerm = async (owner: string, searchTerm: string) => {
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

      return { status: "success", message: "find the results", data };
   } catch (error) {
      return { status: "error", message: "Error finding the file", error };
   }
};

////////////////////////////////////////////////////////////////////////
// collect share Data function
////////////////////////////////////////////////////////////////////////

export const collectShareData = async (owner: string) => {
   try {
      const userQuerySnapshot = await getDocs(
         query(collection(db, "users"), where("email", "==", owner))
      );
      if (userQuerySnapshot.docs[0].exists()) {
         const User = userQuerySnapshot.docs[0];
         const sharedWithMe = User.data()?.sharedWithMe || [];
         const querySnapshot = [];

         for (const id of sharedWithMe) {
            const res = await getDoc(doc(collection(db, "data"), id));
            querySnapshot.push(res);
         }

         // Use Promise.all to await all the asynchronous operations
         const allData = await Promise.all(querySnapshot);

         // Log and return the data
         // console.log(allData, sharedWithMe, "collectShareData");

         return allData.map((doc: any) => {
            if (doc.data()?.trash && doc.data().trash === true) return;
            else if (doc.data().isFolder) {
               return {
                  data: doc.data() as Folder,
                  id: doc.id,
               } as FolderWithID;
            }
            return { data: doc.data() as File, id: doc.id } as FileWithID;
         });
      }
   } catch (error) {
      return { status: "error", message: "Error finding the file", error };
   }
};

export const getNestedShareFolderContents = async (folderId: string) => {
   try {
      const dataCollection = query(
         collection(db, "data"),
         where("parentFolder", "==", folderId)
      );
      const querySnapshot = await getDocs(dataCollection);
      // console.log(querySnapshot.docs);
      return querySnapshot.docs.map((doc) => {
         if (doc.data()?.trash && doc.data().trash === true) {
            return;
         } else if (doc.data().isFolder) {
            return {
               data: { ...doc.data(), shared: true } as Folder,
               id: doc.id,
            } as FolderWithID;
         }
         return {
            data: { ...doc.data(), shared: true } as File,
            id: doc.id,
         } as FileWithID;
      });
   } catch (error) {
      return { status: "error", message: "Not able to get data : ", error };
   }
};

////////////////////////////////////////////////////////////////////////
// Starred functions
////////////////////////////////////////////////////////////////////////
export const addStarred = async (folderId: string) => {
   try {
      const FolderRef = doc(db, "data", folderId);
      await updateDoc(FolderRef, {
         isStarred: true,
      });
      return { status: "success", message: "starred successfully" };
   } catch (error) {
      return { status: "error", message: "Not able to add star : ", error };
   }
};
export const removeStarred = async (folderId: string) => {
   try {
      const FolderRef = doc(db, "data", folderId);
      await updateDoc(FolderRef, {
         isStarred: false,
      });
      return { status: "success", message: "Un-starred successfully" };
   } catch (error) {
      return { status: "error", message: "Not able to add star : ", error };
   }
};
export const getAllStarredData = async (owner: string) => {
   try {
      const dataCollection = query(
         collection(db, "data"),
         where("owner", "==", owner),
         where("isStarred", "==", true)
      );
      const querySnapshot = await getDocs(dataCollection);
      // console.log(querySnapshot.docs);
      return querySnapshot.docs.map((doc) => {
         if (doc.data()?.trash && doc.data().trash === true) {
            // console.log(doc.data().trash);
            return undefined;
         } else if (doc.data().isFolder) {
            return {
               data: doc.data() as Folder,
               id: doc.id,
            } as FolderWithID;
         }
         return { data: doc.data() as File, id: doc.id } as FileWithID;
      });
   } catch (error) {
      return { status: "error", message: "Not able to get data : ", error };
   }
};
