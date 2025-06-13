<template>
  <div>
    <StudentDataTable :columns="columns" :data="students" filterPlaceholder="Filter student..." @deleteStudent="deleteStudentEvent" filterColumn="name" />
  </div>
</template>

<script lang="ts" setup>
import type { Student } from '@/components/Student/columns'
import { columns } from '@/components/Student/columns'
import StudentDataTable from '@/components/Student/StudentDataTable.vue'
import { getTutorStudents, deleteStudent } from '@firebasegen/default-connector';

interface Contact {
  studentContact: string
  parentContact: string
}

const students = ref<Student[]>([])



const refetch = async () => {
  const { data } = await getTutorStudents()
  students.value = data.students
  console.log(students.value)
} // are we handling the source of truth from store or page?

await refetch()

const deleteStudentEvent = async(students) =>{
  for (const student of students){
    await deleteStudent({id:student.id})
  }
}

</script>