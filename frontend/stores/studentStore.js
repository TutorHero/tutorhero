import { defineStore } from 'pinia'
import { createStudent, getTutorStudents, createTutorStudentSubject } from '@firebasegen/default-connector';


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
        const { data: {students} } = await getTutorStudents();
        console.log(students)
        this.students = students;
      } catch (error) {
        console.log(error)
      }
    },
    async createStudent(student) {
      try {
        const { data } = await createStudent(student);
      } catch (error) {
        console.log(error);
      }
    },
    async createSubject(subject) {
      try {
        const { data } = await createStudentStudentSubject(subject)
      } catch (error) {
        console.log(error);
      }
    }
  }
})