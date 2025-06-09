<template>
  <div>
    <form @submit="onSubmit" class=" ">
      <FormField
        v-slot="{ componentField }"
        name="subject"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem class="mb-3">
          <FormLabel>Subject</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormDescription> </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="rate"
        :validate-on-blur="!isFieldDirty"
      >
        <FormItem class="mb-3">
          <FormLabel>Rate (Per Hour)</FormLabel>
          <FormControl>
            <Input type="number" v-bind="componentField" />
          </FormControl>
          <FormDescription> </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="StartDateTime" :validate-on-blur="!isFieldDirty">
        <FormItem class="mb-3">
          <FormLabel>Start Date and Time</FormLabel>
          <FormControl>
            <div class="flex gap-2">
              <Popover>
                <PopoverTrigger as-child>
                  <Button variant="outline">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    {{
                      dateSelected
                        ? df.format(dateSelected.toDate(getLocalTimeZone()))
                        : "Pick a date"
                    }}
                  </Button>
                </PopoverTrigger>
                <PopoverContent class="w-auto p-0">
                  <Calendar v-model="dateSelected" />
                </PopoverContent>
              </Popover>
              <div class="flex-1">
                <Select v-model="selectedHour">
                  <SelectTrigger>
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="hour in hours"
                      :key="hour.value"
                      :value="hour.value"
                    >
                      {{ hour.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="flex-1">
                <Select v-model="selectedMinute">
                  <SelectTrigger>
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="minute in minutes"
                      :key="minute.value"
                      :value="minute.value"
                    >
                      {{ minute.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FormControl>
          <FormDescription> </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField name="Duration" :validate-on-blur="!isFieldDirty">
        <FormItem class="mb-3">
          <FormLabel>Duration (Hour & Minute)</FormLabel>
          <FormControl>
            <div class="flex gap-2">
              <div class="flex-1 min-w-[5rem]">
                <Select v-model="selectedDurationHour">
                  <SelectTrigger>
                    <SelectValue placeholder="Hour" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="hour in hours"
                      :key="hour.value"
                      :value="hour.value"
                    >
                      {{ hour.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="flex-1 min-w-[5rem]">
                <Select v-model="selectedDurationMinute">
                  <SelectTrigger>
                    <SelectValue placeholder="Min" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      v-for="minute in durationMinutes"
                      :key="minute.value"
                      :value="minute.value"
                    >
                      {{ minute.label }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </FormControl>
          <FormDescription>{{ newDate ? "Lesson ends at " + newDate.toString().slice(0,-38) : "" }}</FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{}" name="recurrence">
        <FormItem class="flex items-center justify-between mb-3">
          <div>
            <FormLabel> Create a lesson recurrence? </FormLabel>
            <FormDescription> </FormDescription>
          </div>
          <FormControl>
            <Switch v-model="recurrence" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{}"
        name="Interval"
        :validate-on-blur="!isFieldDirty"
        class="mt-4"
        v-if="recurrence"
      >
        <FormItem class="mb-3">
          <FormLabel>Interval of lessons</FormLabel>
          <FormControl>
            <div class="mt-4 flex items-center gap-2 text-sm leading-none">
              Every
              <NumberField
                id="repeatQuantity"
                :default-value="1"
                :min="1"
                :max="4"
                v-model="weekInterval"
              >
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
              Week
            </div>
          </FormControl>
          <FormDescription> </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="mt-4 flex items-center gap-2 text-sm" v-if="recurrence">
        Repeat On
        <ToggleGroup v-model="selectedDays" type="multiple">
          <ToggleGroupItem value="MO" aria-label="Toggle Monday">
            M
          </ToggleGroupItem>
          <ToggleGroupItem value="TU" aria-label="Toggle Tuesday">
            T
          </ToggleGroupItem>
          <ToggleGroupItem value="WE" aria-label="Toggle Wednesday">
            W
          </ToggleGroupItem>
          <ToggleGroupItem value="TH" aria-label="Toggle Thursday">
            T
          </ToggleGroupItem>
          <ToggleGroupItem value="FR" aria-label="Toggle Friday">
            F
          </ToggleGroupItem>
          <ToggleGroupItem value="SA" aria-label="Toggle Saturday">
            S
          </ToggleGroupItem>
          <ToggleGroupItem value="SU" aria-label="Toggle Sunday">
            S
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div class="flex justify-end gap-3 mt-4">
        <Button type="submit"> Submit </Button>
      </div>
    </form>
  </div>
</template>

<script setup >
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { h } from "vue";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast/use-toast";
import { CalendarIcon } from "lucide-vue-next";
import { DateFormatter, getLocalTimeZone } from "@internationalized/date";
const route = useRoute();
const selectedDays = ref([]);
const weekInterval = ref(1);
const tutorStore = useTutorStore();
const TutorStudentsSubjects = ref([]);
const dateSelected = ref();
const newDate = ref();
const df = new DateFormatter("en-GB", { dateStyle: "long" });
const tf = new DateFormatter("en-GB", {
  dateStyle: "long",
  timeStyle: "short",
});
const selectedHour = ref();
const selectedMinute = ref();
const selectedDurationHour = ref();
const selectedDurationMinute = ref();
const hours = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: i.toString().padStart(2, "0"),
}));
const minutes = Array.from({ length: 60 / 5 }, (_, i) => ({
  value: i * 5,
  label: (i * 5).toString().padStart(2, "0"),
}));
const durationMinutes = Array.from({ length: 4 }, (_, i) => ({
  value: i * 15,
  label: (i * 15).toString().padStart(2, "0"),
}));
const recurrence = ref(false);

const props = defineProps(['studentId'])

onMounted(async () => {
  TutorStudentsSubjects.value = await tutorStore.getTutorStudents();
  console.log(TutorStudentsSubjects);
});

const formSchema = toTypedSchema(
  z.object({
    subject: z.string(),
    rate: z.number().min(0, { message: "Rate must be a positive number" }),
  })
);

const { isFieldDirty, handleSubmit } = useForm({
  validationSchema: formSchema,
});

watch(selectedDurationMinute, (value) => {
  const startDate = dateSelected.value.toDate(getLocalTimeZone());
  startDate.setHours(selectedHour.value);
  startDate.setMinutes(selectedMinute.value);
  console.log(startDate);
  const endDate = new Date(startDate);
  endDate.setMinutes(
    endDate.getMinutes() +
      selectedDurationHour.value * 60 +
      selectedDurationMinute.value
  );
  console.log(endDate);
  newDate.value = endDate;
  console.log(newDate);
  console.log(tf.format(newDate.value));
});

const onSubmit = handleSubmit((values) => {
  const startDate = dateSelected.value.toDate(getLocalTimeZone());
  startDate.setHours(selectedHour.value);
  startDate.setMinutes(selectedMinute.value);
  const endDate = new Date(startDate);
  endDate.setMinutes(
    endDate.getMinutes() +
      selectedDurationHour.value * 60 +
      selectedDurationMinute.value
  );
  const interval = weekInterval.value * 7 * 24 * 60 * 60 * 1000;
  values.startTime = startDate;
  values.endTime = newDate;
  values.interval = interval ?? 20;
  console.log(values.interval);
  values.studentId = props.studentId;
  // tutorStore.createTutorSubject(values)
  console.log(endDate.getMonth())
  const rrule = `WEEKLY, interval=${
    weekInterval.value
  }, byweekday=(${selectedDays.value.toString()}), until=parse(${endDate.getFullYear() + 1}${1<= endDate.getMonth() && endDate.getMonth()<6 ? "01": "06"}31T000000)`;
  console.log(rrule);
});
</script>
