import { defineStore } from 'pinia'
import { createTutor, getCurrentTutor, getAllTutors } from '@firebasegen/default-connector';


// Call the `listAllTutors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.


export const useTutorStore = defineStore('tutorStore', {
    state: () => {
        return {
            tutor: {},
        }
    },
    actions: {
        async getCurrentTutor() {
            try {
                const { data } = await getCurrentTutor();
                this.tutor = data;
                return this.tutor;
            } catch (error) {
                console.log(error)
            }
        },
        async getAllTutors() {
            try {
                const { data } = await getAllTutors();
                return data;
            } catch (error) {
                console.log(error)
            }
        },
        async createTutor(tutor) {
            try {
                const { data } = await createTutor(tutor);
                this.tutor= data;
                return this.tutor;
            } catch (error) {
                console.log(error);
            }
        }
    }
})