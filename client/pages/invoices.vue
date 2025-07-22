<template>
  <div>
    <DataTable :columns="columns" :data="data" filterPlaceholder="Filter student..." filterColumn="student" class="w-[900px]"/>
  </div>
</template>

<script setup lang="ts">
import type { Invoice } from '@/components/Invoice/columns'
import { columns } from '@/components/Invoice/columns'
import DataTable from '@/components/Student/StudentDataTable.vue'

const data = ref<Invoice[]>([
  {
    id: '728ed52f',
    date: "18-04-2025",
    student: "Jerryl",
    amount: 100,
    status: 'pending',
  },
  {
    id: '489e1d42',
    date: "18-04-2025",
    student: "Janson",
    amount: 125,
    status: 'success',
  },
  // ...
])
</script>