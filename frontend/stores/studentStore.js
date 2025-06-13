import { defineStore } from 'pinia'
import { createStudent, getTutorStudents, createTutorStudentSubject, getStudentbyId, deleteStudent } from '@firebasegen/default-connector';

import { generatePayNow } from '../composables/generatePayNowQr';


export const useStudentStore = defineStore('studentStore', {
  state: () => {
    return {
      students: [],
    }
  },
  actions: {
    async getAllStudents() {
      try {
        const { data: { students } } = await getTutorStudents();
        this.students = students;
      } catch (error) {
        console.log(error)
      }
    },
    async createStudent(student) {
      try {
        const { data } = await createStudent(student);
        return data.student_insert.id
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
    }, // TODO: Subject Store
    async getStudentbyId(id) {
      try {
        const { data: { students } } = await getStudentbyId({ id })
        if (students.length > 0) {
          return students[0];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteStudent(id) {
      try {
        const { data } = await deleteStudent({ id })
      } catch (error) {
        console.log(error)
      }
    },
    async generateQR(phoneNo, amount, remarks) {
      try {
        const { generatePayNowPayload } = generatePayNow();
        const qr = await generatePayNowPayload({
          mobile: phoneNo,
          amount: amount,
          editable: true,
          entity: 'Tutor',
          refNumber: remarks
        });
        return qr
      } catch (error) {
        console.log(error)
      }
    }
  }
})
