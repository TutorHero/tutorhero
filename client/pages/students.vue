<template>
  <div>
    <StudentDataTable :columns="columns" :data="students" filterPlaceholder="Filter student..." filterColumn="name" 
      @deleteStudent="getStudents"/>
  </div>
</template>

<script lang="ts" setup>
import type { Student } from '@/components/Student/columns'
import { columns } from '@/components/Student/columns'
import StudentDataTable from '@/components/Student/StudentDataTable.vue'
import { getTutorStudents } from '@firebasegen/default-connector';

const students = ref<Student[]>([])
const getStudents = async () => {
  const { data } = await getTutorStudents()
  students.value = data.students
}

await getStudents()
</script>