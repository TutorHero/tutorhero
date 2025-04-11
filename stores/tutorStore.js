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
                console.log(data);
                this.tutors = tutors;
            } catch (error) {
                console.log(error)
            }
        },
        async addTutor(tutor) {
            try {
                const { data } = await addTutor(tutor);
                console.log(data);
                await fetchAllTutors();
            } catch (error) {
                console.log(error)
            }
        }
    }
})