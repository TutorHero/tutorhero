import { initializeApp } from "firebase/app";

export default defineNuxtPlugin(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyAUwtAu6H6TmgIQimkcIIDzLoz7q5cJI-w",
    authDomain: "tutorhero-fc1bf.firebaseapp.com",
    projectId: "tutorhero-fc1bf",
    storageBucket: "tutorhero-fc1bf.firebasestorage.app",
    messagingSenderId: "616430032594",
    appId: "1:616430032594:web:820d5cdb1c2cc91bc1ff0b"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  return {
    provide: {
      firebaseApp: app
    }
  }
})