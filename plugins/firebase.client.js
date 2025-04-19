import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, connectAuthEmulator, onAuthStateChanged } from 'firebase/auth'
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/default-connector';


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

  const auth =  getAuth(app)

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      return await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      return navigateTo('/overview');
    } else {
      return navigateTo('/sign-in');
    }
  });

  const dataConnect = getDataConnect(app, connectorConfig);
  connectDataConnectEmulator(dataConnect, "127.0.0.1",9399);
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  
  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firebaseSignIn: signInWithGoogle,
      firebaseDataConnect: dataConnect
    }
  }
})