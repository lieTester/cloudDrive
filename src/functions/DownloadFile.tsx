import { storage } from "../../firebaseConfig";
import { ref, getDownloadURL } from "firebase/storage";
import { deleteFile } from "@/schema/dataFunctions";

const DownloadFile = (fileName: string) => {
   getDownloadURL(ref(storage, "images/stars.jpg"))
      .then((url) => {
         // `url` is the download URL for 'images/stars.jpg'

         // This can be downloaded directly:
         const xhr = new XMLHttpRequest();
         xhr.responseType = "blob";
         xhr.onload = (event) => {
            const blob = xhr.response;
         };
         xhr.open("GET", url);
         xhr.send();
      })
      .catch((error) => {
         // Handle any errors
      });
};

export default DownloadFile;
