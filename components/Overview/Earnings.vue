<template>
  <div>
    <Card class="w-full max-w-[500px] sm:w-[500px]">
      <CardHeader>
        <CardTitle>Recent Earnings</CardTitle>
        <CardDescription>You made {{ earnings.length }} earnings this week so far</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="flex flex-col gap-2">
          <div v-for="earning in earnings" :key="earning.id">
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <img
                  class="w-12 h-12 mr-3"
                  :src="`https://api.dicebear.com/9.x/adventurer/svg?seed=${earning.student.avatar}`"
                  alt="avatar" />
                <div>
                  <p>{{ earning.student.student_name }}</p>
                  <p class="text-sm text-muted-foreground">{{ earning.student.contact }}</p>
                </div>
              </div>
              <p>${{ earning.amount }}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const earnings = ref([
  { id: 1, student: { student_name: "Jerryl", contact: "+65 9450 8599", avatar: "George" }, amount: 55 },
  { id: 2, student: { student_name: "Janson", contact: "+65 8778 2016", avatar: "Eliza" }, amount: 55 },
  { id: 3, student: { student_name: "Yangchuan", contact: "+65 8363 2399", avatar: "Brian" }, amount: 55 },
])
</script>