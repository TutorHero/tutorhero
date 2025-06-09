import { defineStore } from 'pinia'
import { createTutor, getCurrentTutor, getAllTutors, getTutorStudents, createTutorStudentSubject, updateTutor } from '@firebasegen/default-connector';




export const useTutorStore = defineStore('tutorStore', {
    state: () => {
        return {
            tutor: null,
            tutorStudents: []
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
        async getTutorStudents(tutor) {
          try {
            const { data } = await getTutorStudents(tutor);
            this.tutorStudents = data;
            return this.tutorStudents;
          }catch (error) {
            console.log(error)
          }
        },

        async createTutorSubject(data) {
          try {
            await createTutorStudentSubject(data);
          } catch(error) {
            console.log(error)
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