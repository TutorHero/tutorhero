<template>
  <div>
    <h1 class="text-2xl font-bold mb-5">Dashboard</h1>
    <div class="flex flex-col sm:flex-row sm:flex-wrap gap-3">
      <OverviewLessons />
      <OverviewEarnings />
    </div>
    <GenerateStudentLink />
  </div>
</template>

<script setup>
import { getTutorStudents } from '@firebasegen/default-connector'
const { data } = await getTutorStudents()
console.log(data)
</script>
