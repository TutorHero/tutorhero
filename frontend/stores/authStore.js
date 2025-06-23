import { defineStore } from 'pinia'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createLessonEvent, updateTutorStudentSubject, getTutorStudentSubjectbyId, deleteTutorStudentSubject } from '@firebasegen/default-connector';
import { useTutorStore } from './tutorStore.js';
import { useStudentStore } from './studentStore.js';
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'

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
    async addSchedule(summary, startTime, endTime, studentId, reccurence = "RRULE:FREQ=WEEKLY;UNTIL=20251231T183000Z;WKST=SU;BYDAY=TH", tutorStudentSubjectId) {
      // Time in this format: 2025-05-29T17:00:00 no timezone
      try {
        if (!summary || !startTime || !endTime || !studentId) {
          throw new Error("Missing Parameter")
        }
        const studentStore = useStudentStore()
        const student = await studentStore.getStudentbyId(studentId)
        const requestPayload = {
          summary: summary,
          location: "3 Flora Dr 08-15",
          description: "Secondary 3 English 1.5 hrs, Focus on essay", // handle description
          start: {
            dateTime: startTime,
            timeZone: "Asia/Singapore"
          },
          end: {
            dateTime: endTime,
            timeZone: "Asia/Singapore"
          },
          recurrence: [
            reccurence
          ],
          attendees: [
            {
              email: student.email || null
            }
          ],
          conferenceData: {
            createRequest: {
              requestId: uuidv4(),
              conferenceSolutionKey: {
                type: 'hangoutsMeet'
              }
            }
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              { 'method': 'popup', 'minutes': 10 }
            ] //TODO : handle reminders
          }
        }
        const tutorStore = useTutorStore()
        await tutorStore.getCurrentTutor()
        console.log(tutorStore.tutor)
        const calendarId = tutorStore.tutor.calendarId
        const response = await axios.post(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?conferenceDataVersion=1`, requestPayload,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        )
        const eventId = response.data.id
        const { data } = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}/instances`,
          {
            headers: {
              'Authorization': `Bearer ${this.accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })

        const response1 = await updateTutorStudentSubject({ id: tutorStudentSubjectId, eventId }) // move logic to tutorstore
        console.log(response1)
        for (const event of data.items) {
          await createLessonEvent({ tutorStudentSubjectId, startTime: event.start.dateTime, endTime: event.end.dateTime, status: "Scheduled" });
        }

      } catch (error) {
        console.log(error)
      }
    },
    async deleteSchedule(tutorStudentSubjectId) {
      try {
        const tutorStore = useTutorStore()
        await tutorStore.getCurrentTutor()
        console.log(tutorStore.tutor)
        const calendarId = tutorStore.tutor.calendarId
        const { data: { tutorStudentSubjects } } = await getTutorStudentSubjectbyId({ id: tutorStudentSubjectId })
        console.log(tutorStudentSubjects)
        const eventId = tutorStudentSubjects[0].eventId
        console.log(this.accessToken)
        await axios.delete(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        })
        await deleteTutorStudentSubject({ id: tutorStudentSubjectId })
      } catch (error) {
        console.log(error)
      }


    },
    persist: true
  }
})


