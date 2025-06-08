import { defineStore } from 'pinia'
import { createTutor, getCurrentTutor, getAllTutors, updateTutor } from '@firebasegen/default-connector';




export const useTutorStore = defineStore('tutorStore', {
    state: () => {
        return {
            tutor: null,
        }
    },
    actions: {
        async getCurrentTutor() {
            try {
                const { data: { tutors } } = await getCurrentTutor();
                const currentTutor = tutors
                if (currentTutor.length > 0) {
                    this.tutor = currentTutor[0]
                }
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
                await createTutor(tutor);
                await this.getCurrentTutor()
                return this.tutor;
            } catch (error) {
                console.log(error);
            }
        },
        async updateTutor(tutor) {
            try {
                await updateTutor(tutor)
                await this.getCurrentTutor()
                return this.tutor;

            } catch (error) {
                console.log(error)
            }
        }
    }
})