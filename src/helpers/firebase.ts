// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getDownloadURL, getStorage, ref as refFire, uploadBytes } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import { getUser } from "./account";

const firebaseConfig = {
  apiKey: "AIzaSyDNuTSKf2HS9V-Po2f1GzAo8oUcfHna6qc",
  authDomain: "ce-notebook.firebaseapp.com",
  projectId: "ce-notebook",
  storageBucket: "ce-notebook.appspot.com",
  messagingSenderId: "355128288497",
  appId: "1:355128288497:web:782e1b11e86f022fd2f550",
  measurementId: "G-6CDD8V0C34"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);
const appMessaging = getMessaging(appFireBase)
getAnalytics(appFireBase);



const getTokenNotification = async (setTokenFound?: Function) => {
  let currentToken = '';

  try {
    currentToken = await getToken(appMessaging, { vapidKey: "BKym3fNu0GSTSdTut9yBLvKRSkryKUuYlGOr18qNmz0T0uIdIw8igh9jbujDaFAZwMykxAifednDIWOuoT4qylw" });
  
    if (!setTokenFound) return currentToken;

    
    if (currentToken) setTokenFound(true);
    else setTokenFound(false);
    
  } 
  catch (error) {}

  return currentToken;
}

if (JSON.stringify(getUser()) !== "{}") {
  Notification.requestPermission()
    .then(a => {
      if (a === "denied") alert("Para usar Notebook es necesario que nos permita notificarte tus recordatorios.")
    })
    .finally();
}




  
// get path to file 
const uploadFile = async (file?: File) => {
  if (!file) return "";
   
  const storage = getStorage(appFireBase);
  const storageRef = refFire(storage, 'images/' + file.name);

  await uploadBytes(storageRef, file)
  return await getDownloadURL(storageRef);
};





export {
  appFireBase,
  uploadFile,
  getTokenNotification,
  appMessaging
}