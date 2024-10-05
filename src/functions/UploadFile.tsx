import { storage } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createFileInFolder } from "@/schema/dataFunctions";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuidv4 } from "uuid"; // Import the UUID library for unique storage names

const UploadFile = ({
   file,
   userEmail,
   parentId,
   setProgress,
   setAddedFileFolder,
}: {
   file: any;
   userEmail: string;
   parentId: string;
   setProgress: Dispatch<SetStateAction<number>>;
   setAddedFileFolder: Dispatch<SetStateAction<boolean>>;
}) => {
   if (file) {
      // Create a custom name for storage (UUID ensures uniqueness)
      const customStorageFileName = `${uuidv4()}`;

      // Reference with the new custom name for storage
      const storageRef = ref(storage, `/${userEmail}/${customStorageFileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            // Track the upload progress
            const uploadProgress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(uploadProgress);
         },
         (error) => {
            console.error("Error uploading file: ", error);
         },
         async () => {
            // Upload complete
            // Get the download URL of the uploaded file
            const url = await getDownloadURL(uploadTask.snapshot.ref);

            // Keep the original file name for the database
            const fileDetails = {
               name: file.name, // Keep the original file name here
               size: file.size,
               owner: userEmail,
               isFolder: false,
               fileLink: url, // Link to the file with a modified storage name
               parentFolder: parentId,
               storageFileName: customStorageFileName, // Optionally store the custom storage name if needed
            };

            // Save the file details in the database
            await createFileInFolder({
               file: fileDetails,
            }).then((res) => {
               setAddedFileFolder(true); // Indicate that the file is loaded in the database
            });
         }
      );
   }
};

export default UploadFile;
