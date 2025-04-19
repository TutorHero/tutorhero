import { defineStore } from 'pinia'
import { addTutor, listAllTutors } from '@firebasegen/default-connector';


// Call the `listAllTutors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.


export const useTutorStore = defineStore('tutorStore', {
    state: () => {
        return {
            tutors: [],
        }
    },
    actions: {
        async fetchAllTutors() {
            try {
                const { data } = await listAllTutors();
                this.tutors = data;
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        async createTutor(tutor) {
            try {
                const { data } = await addTutor(tutor);
                await this.fetchAllTutors();
            } catch (error) {
                console.log(error);
            }
        },
        async ensureTutorExists(firebaseUser) {
            console.log("THIS IS THE FIREBASE USER ID" + firebaseUser.uid)
            const existing = this.tutors.find(t => t.id === firebaseUser.uid);
            return !!existing;
          }
    }
})