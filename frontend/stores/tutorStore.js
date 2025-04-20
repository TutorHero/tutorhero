import { defineStore } from 'pinia'
import { createTutor, getTutor } from '@firebasegen/default-connector';


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
                const { data } = await getTutor();
                this.tutors = data;
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        async createTutor(tutor) {
            try {
                const { data } = await createTutor(tutor);
            } catch (error) {
                console.log(error);
            }
        },
    }
})