<template>
    <div class="mt-20 flex justify-center">
        <AutoForm :form="form" :schema="schema" :field-config="fieldConfig" :dependencies="[
            {
                sourceField: 'interval',
                type: DependencyType.HIDES,
                targetField: 'customTime',
                // Ensure this matches the exact string in your enum
                when: (interval) => interval !== 'Custom'
            }]" @submit="(data) => { submitForm(data) }" title="Subject Form" description="Fill in your details">
            <div class="mt-4 flex items-center gap-2 text-sm leading-none">
                Repeat every
                <NumberField id="repeatQuantity" :default-value="1" :min="1">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                Week
            </div>
            <div class="mt-4 flex items-center gap-2 text-sm">
                Repeat On
                <ToggleGroup v-model='selectedDays' type="multiple">
                    <ToggleGroupItem value="Monday" aria-label="Toggle Monday">
                        M
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Tuesday" aria-label="Toggle Tuesday">
                        T
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Wednesday" aria-label="Toggle Wednesday">
                        W
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Thursday" aria-label="Toggle Thursday">
                        T
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Friday" aria-label="Toggle Friday">
                        F
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Saturday" aria-label="Toggle Saturday">
                        S
                    </ToggleGroupItem>
                    <ToggleGroupItem value="Sunday" aria-label="Toggle Sunday">
                        S
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>

            <div class="flex justify-end gap-3">

                <Button variant="outline" @click="navigateTo('overview')" class="mt-4">Go back to overview</Button>
                <Button type="submit" class="mt-4" @click="() => {
                    toast({
                        description: 'Welcome to TutorHero!',
                    });
                    navigateTo('overview')
                }">
                    Submit
                </Button>
            </div>
        </AutoForm>
    </div>
</template>

<script setup>
import z from "zod"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useToast } from '@/components/ui/toast/use-toast'
import { DependencyType } from "@/components/ui/auto-form/interface"
import { Label } from '@/components/ui/label'
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from '@/components/ui/number-field'
const { toast } = useToast()
const tutorStore = useTutorStore()
const studentStore = useStudentStore()
const students = ref([])
const selectedDays = ref([])
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import TimePicker from '../components/timepicker.vue'
const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

onMounted(async () => {
    await studentStore.fetchAllStudents()
    const students = studentStore.students
    console.log(students)
})

const repeatOptions = ['Every Week on', 'Custom']

const submitForm = async (data) => {
    console.log(selectedDays.value)
    await studentStore.createSubject(data)
    tutors.value = tutorStore.tutor
    await authStore.addEvent("Science Tuition With John","2025-05-29T17:00:00","2025-05-29T17:18:30",id) //Adding events, pass in student id
}

const schema = z.object({
    subject: z.string().describe("Subject"),
    startTime: z.coerce.date().describe("First Lesson Date and Time From"),
    endTime: z.coerce.date().describe("To"),
    interval: z.enum(repeatOptions).describe('Schedule'),
    customTime: z.string()
})
const fieldConfig = {
    startTime: {
        component: 'datetime',
        label: "First Lesson Date and Time From"
    },
    endTime: {
        component: "datetime",
        label: "To"
    }
};

const form = useForm({
    validationSchema: toTypedSchema(schema),
})



definePageMeta({ layout: false });
</script>