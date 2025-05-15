<template>
  <Select v-model="selectedTime">
    <SelectTrigger class="w-[180px]">
      <SelectValue placeholder="Select a time" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Available Times</SelectLabel>
        <SelectItem
          v-for="time in timeOptions"
          :key="time"
          :value="time"
        >
          {{ time }}
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>

<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { ref, computed } from 'vue'

const selectedTime = ref('')

const timeOptions = computed(() => {
  const times = []
  for (let h = 0; h <= 23; h++) {
    times.push(`${String(h).padStart(2, '0')}:00`)
    times.push(`${String(h).padStart(2, '0')}:15`)
    times.push(`${String(h).padStart(2, '0')}:30`)
    times.push(`${String(h).padStart(2, '0')}:45`)
  }
  return times
})
</script>
