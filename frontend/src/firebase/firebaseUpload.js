import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

export const uploadImage = async (file) => {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("Image uploaded: ", url);
    return url;
  } catch (error) {
    console.error("Error uploading image: ", error);
    throw error;
  }
};

export const uploadFile = async (file) => {
  try {
    const storageRef = ref(storage, `files/${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    console.log("File uploaded: ", url);
    return url;
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};
