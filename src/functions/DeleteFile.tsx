import { storage } from "../../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { deleteFileFromDoc } from "@/schema/dataFunctions";
import { Dispatch, SetStateAction } from "react";

const DeleteFile = async ({
   fileName,
   fileId,
   owner,
   setAddedFileFolder,
}: {
   fileName: string;
   fileId: string;
   owner: string;
   setAddedFileFolder?: Dispatch<SetStateAction<boolean>>;
}) => {
   // Create a reference to the file to delete
   const desertRef = ref(storage, `${owner}/${fileName}`);
   // Delete the file
   await deleteObject(desertRef)
      .then(async () => {
         // File deleted successfully
         try {
            await deleteFileFromDoc(fileId).then((res) => {
               setAddedFileFolder && setAddedFileFolder(true);
               setTimeout(() => {
                  setAddedFileFolder && setAddedFileFolder(false);
               }, 800);
            });
         } catch (error) {
            throw new Error("message: " + error);
         }
      })
      .catch((error) => {
         // Uh-oh, an error occurred!
         throw new Error("message: " + error.message);
      });
};

export default DeleteFile;
