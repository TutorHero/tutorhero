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
    provider.addScope('https://www.googleapis.com/auth/calendar');
    try {
      const user = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(user);

      if (credential) {
        // This is the Google OAuth 2.0 Access Token
        const googleAccessToken = credential.accessToken;
        console.log("Google OAuth Access Token:", googleAccessToken);

        // You can now use this googleAccessToken to make calls to the Google Calendar API
        // Example:
        fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
          headers: {
            'Authorization': `Bearer ${googleAccessToken}`
          }
        })
        .then(response => response.json())
        .then(data => console.log('Calendar List:', data))
        .catch(error => console.error('Error fetching calendar list:', error));
        const calendarData = {
          summary: "TutorHero Tuition Schedule" // This is the name/title of the new calendar
        };
        fetch('https://www.googleapis.com/calendar/v3/calendars', {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${googleAccessToken}`,
            'Content-Type': 'application/json', // <<< ADDED THIS
            'Accept': 'application/json'         // Good practice to specify what you accept in response
          },
          body: JSON.stringify(calendarData)      // <<< STRINGIFIED THE BODY
        })
        .then(response => {
          console.log("Create Calendar Response Status:", response.status, response.statusText);
          // It's good to check if the response was successful before trying to parse JSON
          if (!response.ok) {
            // If not OK, parse the error response as JSON (Google APIs usually send JSON errors)
            return response.json().then(err => {
              console.error("API Error creating calendar:", err);
              throw new Error(`Failed to create calendar: ${err.error?.message || response.statusText}`);
            });
          }
          return response.json(); // If OK, parse the successful response
        })
        .then(data => {
          console.log('Successfully created calendar:', data);
          // 'data' will contain information about the newly created calendar, including its ID
          // e.g., data.id will be the ID of the new calendar
        })
        .catch(error => {
          console.error('Error in fetch operation (creating calendar):', error);
          // This catch will handle network errors or errors thrown from the .then block
        });
      }
      
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
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "DEVELOPMENT") {
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