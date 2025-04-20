import { defineStore } from 'pinia'
import { createStudent, getTutorStudents } from '@firebasegen/default-connector';


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
        const { data } = await getTutorStudents();
        console.log(data);
        this.students = data;
      } catch (error) {
        console.log(error)
      }
    },
    async createStudent(student) {
      try {
        const { data } = await createStudent(student);
        console.log("here ran", data);
        await this.fetchAllStudents();
      } catch (error) {
        console.log(error);
      }
    },
  }
})