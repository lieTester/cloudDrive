// firebase-collections.ts
import {
   collection,
   getDocs,
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
   const dataCollection = collection(db, "data");
   const docRef = await addDoc(dataCollection, file);
   return docRef.id;
};

export const createFolderInFolder = async (folder: Folder) => {
   const dataCollection = collection(db, "data");
   const docRef = await addDoc(dataCollection, folder);
   return docRef.id;
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
      // Set the "capital" field of the city 'DC'
      await updateDoc(FolderRef, {
         name: folderName,
      });
      return { status: "success", message: "File deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error renaming folder : ", error };
   }
};

export const moveToTrash = async (folderId: string) => {
   // this is not exact solution it should be BFS or DFS but for show business logic
   try {
      const FolderRef = doc(db, "data", folderId);
      // console.log(FolderRef);
      await updateDoc(FolderRef, {
         trash: true,
      });
      return { status: "success", message: "folder deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error deleting the file : ", error };
   }
};
export const deleteFolder = async (folderId: string) => {
   // this is not exact solution it should be BFS or DFS but for show business logic
   try {
      await deleteDoc(doc(db, "data", folderId));
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
