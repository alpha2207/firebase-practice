import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAD-l01SHkE-JWytfyK2SoWjaIQzWqEzhE",
  authDomain: "just-stock-354510.firebaseapp.com",
  projectId: "just-stock-354510",
  storageBucket: "just-stock-354510.appspot.com",
  messagingSenderId: "616515586848",
  appId: "1:616515586848:web:f5715404613f94bd582545"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);