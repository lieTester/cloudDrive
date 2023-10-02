// firebase-collections.ts
import { collection, getDocs, addDoc, where, query } from "firebase/firestore";
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
