<template>
  <div>
    <Card class="w-full max-w-[500px] sm:w-[500px]">
      <CardHeader>
        <CardTitle>Upcoming Lessons</CardTitle>
        <CardDescription>
          You have 2 lessons upcoming this week
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-3">
        <ClientOnly>
          <div v-for="lesson in upcomingLessons" :key="lesson.id" >
            <OverviewLesson :lesson="lesson"/>
          </div>
        </ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
const upcomingLessons = ref([
  { id: 1, title: "Chemistry lesson", date: new Date("2025-04-13"), startTime: new Date("2025-04-13T10:00"), endTime: new Date("2025-04-13T12:00:00") },
  { id: 2, title: "Physics lesson", date: new Date("2025-04-15"), startTime: new Date("2025-04-13T10:00"), endTime: new Date("2025-04-13T12:00:00") },
])
</script>