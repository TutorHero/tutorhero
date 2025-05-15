<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue' // Added onUnmounted
import type { FieldProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { DateFormatter, getLocalTimeZone, CalendarDate, type DateValue } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import AutoFormLabel from './AutoFormLabel.vue'
import { beautifyObjectName, maybeBooleanishToBoolean } from './utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const props = defineProps<FieldProps>()

// --- Logging Prefix ---
const logPrefix = `[AutoFormDateTime ${props.fieldName}]`
console.log(`${logPrefix} Component Instantiated. Initial props.config:`, props.config);

// --- Date & Time Formatters ---
const df = new DateFormatter('en-GB', { dateStyle: 'long' })
const tf = new DateFormatter('en-GB', { timeStyle: 'short' })
console.log(`${logPrefix} Test df.format:`, df.format(new Date()));

// --- Internal Reactive State ---
const internalDatePart = ref<DateValue | undefined>()
const selectedHour = ref<number | undefined>()
const selectedMinute = ref<number | undefined>()

// --- Options for Selects ---
const hours = Array.from({ length: 24 }, (_, i) => ({ value: i, label: i.toString().padStart(2, '0') }))
const minutes = Array.from({ length: 60 / 5 }, (_, i) => ({ value: i * 5, label: (i * 5).toString().padStart(2, '0') }))

// --- Computed Properties ---
const isDateTimeComplete = computed(() => {
  const complete = !!internalDatePart.value && selectedHour.value !== undefined && selectedMinute.value !== undefined;
  // console.log(`${logPrefix} isDateTimeComplete computed:`, complete); // Optional: Log if needed during intense debugging
  return complete;
})

const disabled = computed(() => maybeBooleanishToBoolean(props.config?.inputProps?.disabled) ?? props.disabled)

// --- Watcher Initialization ---
let unwatchModelValue: (() => void) | null = null;
let unwatchInternalParts: (() => void) | null = null;
let watchersInitialized = false; // Flag to ensure watchers are set up only once
const handleDateUpdate = (newValue: DateValue | undefined) => {
  console.error(`%c[CALENDAR DEBUG ${props.fieldName}] @update:value EMITTED! New raw value:`, 'color: orange; font-weight: bold;', newValue);
  if (newValue) {
    // Manually set internalDatePart to see if the rest of the logic flows
    internalDatePart.value = newValue;
    console.error(`%c[CALENDAR DEBUG ${props.fieldName}] Manually set internalDatePart.value to:`, 'color: orange;', internalDatePart.value);
  } else {
    internalDatePart.value = undefined;
     console.error(`%c[CALENDAR DEBUG ${props.fieldName}] @update:value emitted undefined/null. internalDatePart set to undefined.`, 'color: orange;');
  }
};
const setupWatchers = (componentField: any) => {
  if (watchersInitialized) {
    // console.log(`${logPrefix} Watchers already initialized. Skipping.`);
    return;
  }
  console.log(`${logPrefix} Initializing watchers. Initial componentField.modelValue:`, componentField.modelValue, typeof componentField.modelValue);

  // Watcher 1: External modelValue changes -> Update internal parts
  unwatchModelValue = watch(() => componentField.modelValue, (newVal: Date | string | undefined, oldVal: Date | string | undefined) => {
    console.log(`${logPrefix} WATCH modelValue changed:`,
                'New:', newVal, typeof newVal,
                'Old:', oldVal, typeof oldVal);

    let dateToProcess: Date | undefined = undefined;

    if (newVal instanceof Date && !Number.isNaN(newVal.getTime())) {
      console.log(`${logPrefix} modelValue is a valid Date object.`);
      dateToProcess = newVal;
    } else if (typeof newVal === 'string' && newVal.trim() !== '') {
      console.warn(`${logPrefix} modelValue is a STRING. Attempting to parse:`, newVal);
      try {
        const parsed = new Date(newVal);
        if (!Number.isNaN(parsed.getTime())) {
          console.log(`${logPrefix} Parsed string to Date:`, parsed);
          dateToProcess = parsed;
        } else {
          console.error(`${logPrefix} Failed to parse string to valid Date. Will clear parts.`);
        }
      } catch (e) {
        console.error(`${logPrefix} Error parsing string to Date:`, e, ". Will clear parts.");
      }
    }

    if (dateToProcess) {
      const newCalendarDate = new CalendarDate(dateToProcess.getFullYear(), dateToProcess.getMonth() + 1, dateToProcess.getDate());
      let datePartActuallyChanged = false;
      if (!internalDatePart.value) {
        datePartActuallyChanged = true;
      } else {
        const currentCalDate = internalDatePart.value;
        if(currentCalDate.year !== newCalendarDate.year || currentCalDate.month !== newCalendarDate.month || currentCalDate.day !== newCalendarDate.day) {
            datePartActuallyChanged = true;
        }
      }

      if (datePartActuallyChanged) {
        console.log(`${logPrefix} Setting internalDatePart to:`, newCalendarDate);
        internalDatePart.value = newCalendarDate;
      } else {
        // console.log(`${logPrefix} Date part from modelValue did not change. internalDatePart remains:`, internalDatePart.value);
      }

      if (selectedHour.value !== dateToProcess.getHours()) {
        console.log(`${logPrefix} Setting selectedHour to:`, dateToProcess.getHours());
        selectedHour.value = dateToProcess.getHours();
      }
      if (selectedMinute.value !== dateToProcess.getMinutes()) {
        console.log(`${logPrefix} Setting selectedMinute to:`, dateToProcess.getMinutes());
        selectedMinute.value = dateToProcess.getMinutes();
      }
    } else { // newVal is undefined, null, empty string, or unparseable
      console.log(`${logPrefix} modelValue is effectively empty or invalid. Clearing internal parts.`);
      if (internalDatePart.value !== undefined) {
        console.log(`${logPrefix} Clearing internalDatePart.`);
        internalDatePart.value = undefined;
      }
      if (selectedHour.value !== undefined) {
        console.log(`${logPrefix} Clearing selectedHour.`);
        selectedHour.value = undefined;
      }
      if (selectedMinute.value !== undefined) {
        console.log(`${logPrefix} Clearing selectedMinute.`);
        selectedMinute.value = undefined;
      }
    }
  }, { immediate: true });

  // Watcher 2: Internal parts change -> Update external modelValue
  unwatchInternalParts = watch([internalDatePart, selectedHour, selectedMinute], (newValues, oldValues) => {
    const [newDateP, newH, newM] = newValues;
    console.log(`${logPrefix} WATCH internal parts changed.`,
                'Date:', newDateP,
                'Hour:', newH,
                'Min:', newM);
    console.log(`${logPrefix} isDateTimeComplete:`, isDateTimeComplete.value);

    if (isDateTimeComplete.value) {
      const dateToEmit = internalDatePart.value!.toDate(getLocalTimeZone());
      dateToEmit.setHours(selectedHour.value!);
      dateToEmit.setMinutes(selectedMinute.value!);
      dateToEmit.setSeconds(0);
      dateToEmit.setMilliseconds(0);

      console.log(`${logPrefix} Constructed dateToEmit:`, dateToEmit);
      if (componentField.modelValue?.getTime() !== dateToEmit.getTime()) {
        console.log(`${logPrefix} Emitting 'onInput' with new Date:`, dateToEmit);
        componentField.onInput(dateToEmit);
      } else {
        console.log(`${logPrefix} Constructed date is same as modelValue. No emit.`);
      }
    } else {
      // Only emit undefined if a full date *was* previously set and now it's incomplete.
      // This prevents clearing the modelValue when just starting to build up the date.
      if (componentField.modelValue instanceof Date) {
         console.log(`${logPrefix} DateTime became incomplete from a complete state. Emitting 'onInput' with undefined.`);
         componentField.onInput(undefined);
      } else {
        console.log(`${logPrefix} DateTime not complete, and modelValue is not currently a full Date. No 'onInput(undefined)' emit.`);
      }
    }
  });

  watchersInitialized = true;
  console.log(`${logPrefix} Watchers initialized successfully.`);
};

// --- Lifecycle Hooks ---
onUnmounted(() => {
  console.log(`${logPrefix} Component Unmounted. Cleaning up watchers.`);
  if (unwatchModelValue) unwatchModelValue();
  if (unwatchInternalParts) unwatchInternalParts();
  watchersInitialized = false; // Reset flag if component can be re-created
});

// --- Debug Watcher for internalDatePart (for button text) ---
watch(internalDatePart, (newVal) => {
    if (newVal) {
        try {
            // console.log(`${logPrefix} Formatted button text would be:`, df.format(newVal.toDate(getLocalTimeZone())));
        } catch (e) {
            console.error(`${logPrefix} Error formatting internalDatePart for button:`, e);
        }
    }
});

</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <!--
      This expression is evaluated on every render of FormField's slot.
      The `watchersInitialized` flag inside `setupWatchers` prevents re-adding watchers.
    -->
    {{ setupWatchers(slotProps.componentField) }}

    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <div class="flex w-full flex-col gap-2 sm:flex-row">
            <!-- Date Picker -->
            <div class="flex-grow">
              <Popover>
                <PopoverTrigger as-child :disabled="disabled">
                  <Button
                    variant="outline"
                    :class="cn(
                      'w-full justify-start text-left font-normal',
                      !internalDatePart && 'text-muted-foreground',
                    )"
                  >
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{ internalDatePart ? df.format(internalDatePart.toDate(getLocalTimeZone())) : "Pick a date" }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                    <Calendar
                    v-model="internalDatePart" 
                    initial-focus
                    :disabled="disabled"
                />
                </PopoverContent>
              </Popover>
            </div>

            <!-- Time Picker -->
            <div class="flex flex-shrink-0 gap-2">
              <!-- Hour Select -->
              <div class="flex-1 min-w-[5rem]">
                <Select v-model:model-value="selectedHour" :disabled="disabled">
                  <SelectTrigger>
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="hour in hours" :key="hour.value" :value="hour.value">
                      {{ hour.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <!-- Minute Select -->
              <div class="flex-1 min-w-[5rem]">
                <Select v-model:model-value="selectedMinute" :disabled="disabled">
                  <SelectTrigger>
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem v-for="minute in minutes" :key="minute.value" :value="minute.value">
                      {{ minute.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <!-- Display selected date and time if complete -->
          <div v-if="isDateTimeComplete && slotProps.componentField.modelValue instanceof Date" class="mt-2 text-sm text-muted-foreground">
            Selected: {{ df.format(slotProps.componentField.modelValue) }} {{ tf.format(slotProps.componentField.modelValue) }}
          </div>
          <div v-else-if="isDateTimeComplete && !(slotProps.componentField.modelValue instanceof Date)" class="mt-2 text-sm text-destructive">
            Selected (Error): ModelValue is not a valid Date.
          </div>
        </slot>
      </FormControl>

      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>