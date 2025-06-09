<template>
  <div>
    <DataTable :columns="columns" :data="students" filterPlaceholder="Filter student..." filterColumn="name" />
  </div>
</template>

<script lang="ts" setup>
import type { Student } from '@/components/Student/columns'
import { columns } from '@/components/Student/columns'
import DataTable from '@/components/ui/DataTable.vue'
import { getTutorStudents } from '@firebasegen/default-connector';

interface Contact {
  studentContact: string
  parentContact: string
}

const students = ref<Student[]>([])

const { data } = await getTutorStudents()
students.value = data.students
console.log(students.value)

</script>