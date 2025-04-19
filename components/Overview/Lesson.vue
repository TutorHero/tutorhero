<template>
  <Card >
    <CardContent class="p-2 flex items-center">
      <Collapsible v-model:open="isOpen" class="w-full">
        <div class="flex items-center justify-between">
          <div class="flex">
            <div class="w-12 h-12 mr-3 bg-primary/[0.2] text-primary rounded-lg flex flex-col justify-center items-center">
              <p class="text-lg font-semibold -mb-2">{{ props.lesson.date.getDate() }}</p>
              <p class="text-sm">{{ props.lesson.date.toLocaleString('default', { month: 'short' }) }}</p>
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
          <CollapsibleTrigger>
            <Button variant="outline" size="icon" class="mr-2">
              <ChevronRightIcon />
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent class="space-y-2">
          <div>
            asdf
          </div>
        </CollapsibleContent>
      </Collapsible>
    </CardContent>
  </Card>
</template>

<script setup>
import { ChevronRightIcon } from "lucide-vue-next"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

const isOpen = ref(false)
const props = defineProps(['lesson'])
</script>
