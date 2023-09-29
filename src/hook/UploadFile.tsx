import { useState } from "react";
import { storage, app, database } from "../../firebaseConfig";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UploadHook = (file: any) => {
   if (file) {
      const storageRef = ref(storage, `files/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
         "state_changed",
         (snapshot) => {
            // Track the upload progress
            const uploadProgress =
               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(uploadProgress);
         },
         (error) => {
            console.error("Error uploading file: ", error);
         },
         async () => {
            // Upload complete
            console.log("File uploaded successfully!");

            // Get the download URL of the uploaded file
            const url = await getDownloadURL(uploadTask.snapshot.ref);
            console.log(url);
         }
      );
   }
};

export default UploadHook;
