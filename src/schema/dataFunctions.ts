// firebase-collections.ts
import {
   collection,
   getDocs,
   addDoc,
   where,
   query,
   doc,
   deleteDoc,
} from "firebase/firestore";
import { database } from "../../firebaseConfig";
import { File, Folder } from "../types/modelTypes";

const db = database;

export const createFileInFolder = async (file: File) => {
   const filesCollection = collection(db, "files");
   const docRef = await addDoc(filesCollection, file);
   return docRef.id;
};

export const createFolderInFolder = async (folder: Folder) => {
   const filesCollection = collection(db, "files");
   const docRef = await addDoc(filesCollection, folder);
   return docRef.id;
};

export const getFolderContents = async (folderId: string, owner: string) => {
   const filesCollection = query(
      collection(db, "files"),
      where("parentFolder", "==", folderId),
      where("owner", "==", owner)
   );
   const querySnapshot = await getDocs(filesCollection);
   // console.log(querySnapshot.docs);
   return querySnapshot.docs.map((doc) => [
      doc.data() as File | Folder,
      doc.id,
   ]);
};

export const deleteFile = async (fileId: string) => {
   try {
      await deleteDoc(doc(db, "files", fileId));
      return { status: "success", message: "File deleted successfully" };
   } catch (error) {
      return { status: "error", message: "Error deleting the file", error };
   }
};
