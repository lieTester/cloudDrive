import { storage } from "../../firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import { deleteFile } from "@/schema/dataFunctions";

const DeleteFile = (
   fileName: string,
   fileId: string,
   setAddedFileFolder: Function
) => {
   // Create a reference to the file to delete
   const desertRef = ref(storage, `files/${fileName}`);

   // Delete the file
   deleteObject(desertRef)
      .then(async () => {
         // File deleted successfully
         try {
            await deleteFile(fileId).then((res) => {
               setAddedFileFolder(true);
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
