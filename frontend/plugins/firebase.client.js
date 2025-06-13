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

  const auth = getAuth(app)

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/calendar.app.created');
    try {
      const user = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(user);
      const googleAccessToken = credential.accessToken
      authStore.accessToken = googleAccessToken
      return user
    } catch (error) {
      console.log(error)
    }
  }


  const authStore = useAuthStore()
  const route = useRoute()
  onAuthStateChanged(auth, (user) => {
    authStore.user = user
    if (!user) {
      if (route.name !== "student-form") {
        return navigateTo('/sign-in');
      }
    }
  });

  const dataConnect = getDataConnect(app, connectorConfig);
  if (process.env.NODE_ENV === "development") {
    connectDataConnectEmulator(dataConnect, "127.0.0.1", 9399);
    connectAuthEmulator(auth, "http://127.0.0.1:9099");
  }

  return {
    provide: {
      firebaseApp: app,
      firebaseAuth: auth,
      firebaseSignIn: signInWithGoogle,
      firebaseDataConnect: dataConnect
    }
  }
})