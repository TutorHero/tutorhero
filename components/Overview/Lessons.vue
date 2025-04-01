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
        <Card v-for="lesson in upcomingLessons" :key="lesson.id">
          <CardContent class="p-2 flex justify-between items-center">
            <div class="flex items-center">
              <div class="w-12 h-12 mr-3 bg-primary/[0.2] text-primary rounded-lg flex flex-col justify-center items-center">
                <p class="text-lg font-semibold -mb-2">{{ lesson.date.getDate() }}</p>
                <p class="text-sm">{{ lesson.date.toLocaleString('default', { month: 'short' }) }}</p>
              </div>
              <div>
                <h3 class="text-md font-semibold">{{ lesson.title }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ lesson.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }} 
                  to 
                  {{ lesson.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }}
                </p>
              </div>
            </div>
            <Button variant="outline" size="icon" class="mr-2">
              <ChevronRightIcon />
            </Button>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from "lucide-vue-next"
const upcomingLessons = [
  { id: 1, title: "Chemistry lesson", date: new Date("2025-04-13"), startTime: new Date("2025-04-13T10:00"), endTime: new Date("2025-04-13T12:00:00") },
  { id: 2, title: "Physics lesson", date: new Date("2025-04-15"), startTime: new Date("2025-04-13T10:00"), endTime: new Date("2025-04-13T12:00:00") },
]

</script>