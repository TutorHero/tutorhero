<template>
  <Card>
    <CardContent class="p-2 flex items-center justify-between">
        <div class="flex">
          <div
            class="w-12 h-12 mr-3 bg-primary/[0.2] text-primary rounded-lg flex flex-col justify-center items-center">
            <p class="text-lg font-semibold -mb-2">{{ props.lesson.startTime.getDate() }}</p>
            <p class="text-sm">{{ props.lesson.startTime.toLocaleString('default', { month: 'short' }) }}</p>
          </div>
          <div>
            <h3 class="text-md font-semibold">{{ props.lesson.title }}</h3>
            <p class="text-sm text-muted-foreground">
              {{ props.lesson.startTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }}
              to
              {{ props.lesson.endTime.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }}
            </p>
          </div>
        </div>
        <Button>
          <Video href="google.com" />
        </Button>
    </CardContent>
  </Card>
</template>

<script setup>
import { Video } from "lucide-vue-next"
const props = defineProps(['lesson'])
</script>
