// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5PLT9Y7SKTR-hf29vAamtbLOgmJzAV5U",
  authDomain: "fitnessapp-ba7ba.firebaseapp.com",
  projectId: "fitnessapp-ba7ba",
  storageBucket: "fitnessapp-ba7ba.firebasestorage.app",
  appId: "1:391765619680:android:56b8dcfb53beefe3983185",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("🔥 Firebase connected successfully!");

export { auth, db, app };
