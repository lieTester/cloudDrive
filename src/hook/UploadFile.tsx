import { storage } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { createFileInFolder } from "@/schema/dataFunctions";

const UploadFile = (
   file: any,
   owner: string,
   parentId: string,
   setProgress: Function,
   setAddedFileFolder: Function
) => {
   // as over context value is undefined as primarrly so direct destructuring will give warning

   if (file) {
      const storageRef = ref(storage, `files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            // Track the upload progress
            const uploadProgress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log(uploadProgress);
            setProgress(uploadProgress);
         },
         (error) => {
            console.error("Error uploading file: ", error);
         },
         async () => {
            // Upload complete
            console.log("File uploaded successfully!");

            // Get the download URL of the uploaded file
            // console.log(uploadTask.snapshot);
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(url);
            const fileDetails = {
               name: file.name,
               size: file.size,
               owner: owner,
               isFolder: false,
               fileLink: url,
               parentFolder: parentId,
            };
            // console.log(fileDetails);
            await createFileInFolder(fileDetails).then((res) => {
               setAddedFileFolder(true); // to set that over file is loaded in database
            });
         }
      );
   }
};

export default UploadFile;
