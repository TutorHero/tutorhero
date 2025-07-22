<template>
  <div>
    <Card class="w-full max-w-[500px] sm:w-[500px]">
      <CardHeader>
        <CardTitle>Upcoming Lessons</CardTitle>
        <CardDescription>
          You have {{ upcomingLessons.length }} lessons upcoming this week
        </CardDescription>
      </CardHeader>
      <CardContent class="flex flex-col gap-3">
        <ClientOnly>
          <div v-for="lesson in upcomingLessons" :key="lesson.id">
            <OverviewLesson :lesson="lesson" />
          </div>
        </ClientOnly>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>

import { getLessonEvents } from '@firebasegen/default-connector';

const today = new Date();
const daysUntilSunday = 7 - today.getDay();
const endLimit = new Date(today);
endLimit.setDate(today.getDate() + daysUntilSunday);
endLimit.setHours(23, 59, 59, 999);
console.log(endLimit)
let data = (await getLessonEvents({ endLimit })).data
if (data.lessonEvents.length === 0) {
  endLimit.setDate(endLimit.getDate() + 7);
  data = (await getLessonEvents({ endLimit })).data
}
console.log(data)
const lessonEvents = data.lessonEvents.map((event) => {
  return {
    id: event.id,
    title: `${event.tutorStudentSubject.subject} lesson with ${event.tutorStudentSubject.student.name}`,
    startTime: new Date(event.startTime),
    endTime: new Date(event.endTime),
  }
})


const upcomingLessons = ref(lessonEvents)


</script>