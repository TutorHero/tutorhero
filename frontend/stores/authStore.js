import { defineStore } from 'pinia'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTutorStore } from './tutorStore.js';
import axios from 'axios'

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: {},
      accessToken: null
    }
  },
  actions: {
    // async signInWithGoogle(auth) {
    //   const provider = new GoogleAuthProvider()
    //   try {
    //     const tutorStore = useTutorStore()
    //     const result = await signInWithPopup(auth, provider)
    //     this.user = result.user
    //     console.log(this.user)
    //     const tutorExists = await tutorStore.ensureTutorExists(this.user)
    //     return tutorExists


    //   } catch (error) {
    //     console.log(error)
    //   }
    // },
    async addCalendar() {
      try {
        console.log('adding calendar')
        const data = await axios.post('https://www.googleapis.com/calendar/v3/calendars',
          {
            summary:
              "TutorHero Tuition Schedule"
          }, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        console.log(data)
        let currentTutor
        if (data.status === 200) {
          const tutorStore = useTutorStore()
          currentTutor = { ...tutorStore.tutor }
          console.log(currentTutor)
          currentTutor.calendarId = data.data.id
          console.log(currentTutor)
          delete currentTutor.id
          await tutorStore.updateTutor(currentTutor)
        } else {
          return "Insufficient Permissions"
        }


      } catch (error) {
        console.log(error)
      }


    },
    async addEvent() {

      try {
        const requestPayload = {
          summary: "English Tuition with John",
          location: "3 Flora Dr 08-15",
          description: "Secondary 3 English 1.5 hrs, Focus on essay",
          start: {
            dateTime: "2025-05-29T17:00:00",
            timeZone: "Asia/Singapore"
          },
          end: {
            dateTime: "2025-05-29T18:30:00",
            timeZone: "Asia/Singapore"
          },
          recurrence: [
            "RRULE:FREQ=WEEKLY;UNTIL=20251231T183000Z;WKST=SU;BYDAY=TH"
          ],
          attendees: [
            {
              email: 'tutorherodev@gmail.com'
            }
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              { 'method': 'popup', 'minutes': 10 }
            ]
          }
        }
        const tutorStore = useTutorStore()
        console.log(tutorStore.tutor)
        const calendarId = tutorStore.tutor.calendarId
        const data = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, requestPayload,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )
        console.log(data)
        const eventId = data.data.id
        const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/instances`,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )
        console.log(response)
      } catch(error){
        console.log(error)
      }
    },
    persist: true
  }
})




// if (credential) {
//   // This is the Google OAuth 2.0 Access Token
//   const googleAccessToken = credential.accessToken;
//   console.log("Google OAuth Access Token:", googleAccessToken);

//   // You can now use this googleAccessToken to make calls to the Google Calendar API
//   // Example:

//   const calendarData = {
//     summary: // This is the name/title of the new calendar
//   };
//   fetch('https://www.googleapis.com/calendar/v3/calendars', {
//     method: "POST",
//     headers: {
//       'Authorization': `Bearer ${googleAccessToken}`,
//       'Content-Type': 'application/json', // <<< ADDED THIS
//       'Accept': 'application/json'         // Good practice to specify what you accept in response
//     },
//     body: JSON.stringify(calendarData)      // <<< STRINGIFIED THE BODY
//   })
//     .then(response => {
//       console.log("Create Calendar Response Status:", response.status, response.statusText);
//       // It's good to check if the response was successful before trying to parse JSON
//       if (!response.ok) {
//         // If not OK, parse the error response as JSON (Google APIs usually send JSON errors)
//         return response.json().then(err => {
//           console.error("API Error creating calendar:", err);
//           throw new Error(`Failed to create calendar: ${err.error?.message || response.statusText}`);
//         });
//       }
//       return response.json(); // If OK, parse the successful response
//     })
//     .then(data => {
//       console.log('Successfully created calendar:', data);
//       // 'data' will contain information about the newly created calendar, including its ID
//       // e.g., data.id will be the ID of the new calendar
//     })
//     .catch(error => {
//       console.error('Error in fetch operation (creating calendar):', error);
//       // This catch will handle network errors or errors thrown from the .then block
//     });
// }
