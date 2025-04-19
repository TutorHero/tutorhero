import { defineStore } from 'pinia'
import { addStudent, listAllStudents } from '@firebasegen/default-connector';


// Call the `listAllTutors()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.


export const useStudentStore = defineStore('studentStore', {
    state: () => {
        return {
            students: [],
        }
    },
    actions: {
        async fetchAllStudents() {
            try {
                const { data } = await listAllStudents();
                console.log(data);
                this.students = data;
            } catch (error) {
                console.log(error)
            }
        },
        async createStudent(tutor) {
            try {
                const { data } = await addStudent(tutor);
                console.log("here ran", data);
                await this.fetchAllStudents();
            } catch (error) {
                console.log(error);
            }
        },
    }
})