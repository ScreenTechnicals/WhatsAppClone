import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdKbWiNBvnNz7--je7z_OfA6JgTnJf6Fs",
  authDomain: "whatsapp-clone-3ba5c.firebaseapp.com",
  projectId: "whatsapp-clone-3ba5c",
  storageBucket: "whatsapp-clone-3ba5c.appspot.com",
  messagingSenderId: "90380810155",
  appId: "1:90380810155:web:f5460aad98d2b2420a44ee",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(app);
export const storage = getStorage(app);
