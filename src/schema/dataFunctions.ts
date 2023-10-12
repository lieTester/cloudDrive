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
import { File, Folder } from "../types/modelTypes";

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
   const dataCollection = query(
      collection(db, "data"),
      where("parentFolder", "==", folderId),
      where("owner", "==", owner)
   );
   const querySnapshot = await getDocs(dataCollection);
   // console.log(querySnapshot.docs);
   return querySnapshot.docs.map((doc) => [
      doc.data() as File | Folder,
      doc.id,
   ]);
};

export const deleteFile = async (fileId: string) => {
   try {
      await deleteDoc(doc(db, "data", fileId));
      return { status: "success", message: "File deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error deleting the file", error };
   }
};
export const renameFolder = async (folderName: string, folderId: string) => {
   try {
      const FolderRef = doc(db, "data", folderId);
      console.log(FolderRef);
      // Set the "capital" field of the city 'DC'
      await updateDoc(FolderRef, {
         name: folderName,
      });
      return { status: "success", message: "File deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error renaming folder", error };
   }
};
