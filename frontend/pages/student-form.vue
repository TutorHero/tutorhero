<template>
  <div>
    <div v-if="loading" class="my-20 flex justify-center items-center">
      <svg aria-hidden="true" class="w-24 h-24 text-green-100 animate-spin fill-green-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
    <div v-else class="my-20 flex justify-center">
      <AutoForm v-if="formValid" :form='form' :schema="schema" :dependencies="[
        {
          sourceField: 'year',
          type: DependencyType.HIDES,
          targetField: 'otheryear',
          // Ensure this matches the exact string in your enum
          when: (yearValue) => yearValue !== 'Others: Please specify below'
        },
        {
          sourceField: 'type',
          type: DependencyType.HIDES,
          targetField: 'address',
          // Ensure this matches the exact string in your enum
          when: (type) => type === 'Online'
        }
      ]" @submit="(data) => {
        submitForm(data)
      }" title="Student Form" description="Fill in your details">

        <div class="flex justify-end">
          <Button type="submit"  variant="outline" class="mt-4">Submit</Button>
        </div>
      </AutoForm>
      
      <Card class="p-12 flex flex-col items-center" v-else>
        <ClockAlert class="w-24 h-24 mb-5 stroke-amber-500" />
        <p class="text-2xl">This form has expired.</p>
        <p class="text-neutral-500">Please contact your tutor for a new form.</p>
      </Card>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false });
import z from "zod"
import { useToast } from '@/components/ui/toast/use-toast'
import { DependencyType } from "@/components/ui/auto-form/interface"
import { ClockAlert } from 'lucide-vue-next'
import { Card } from '@/components/ui/card'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { isUrlValid, deleteStudentFormUrl } from '@firebasegen/default-connector'

const studentStore = useStudentStore()
const students = ref([])
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp()
const { toast } = useToast()

const route = useRoute()
const formId = route.query.id
const tutorId = ref("")
const formValid = ref(true)
const loading = ref(true)

onMounted(async () => {
  const { data } = await isUrlValid({ id: formId })
  if (data.studentFormURLS.length) {
    tutorId.value = data.studentFormURLS[0].tutor.id
  } else {
    formValid.value = false
  }
  loading.value = false
})

const submitForm = async (data) => {
  data.dob = data.dob.toISOString().split('T')[0]
  data.status = "current"
  if (data.year === "Others: Please specify below") {
    data.year = data.otheryear;
  }
  data.tutorId = tutorId.value

  await studentStore.createStudent(data)

  toast({
    description: 'Data Submitted Successfully',
  });

  await deleteStudentFormUrl({ id: formId }) // TODO: UI to change page. either refresh or show success 
}

const schema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z.string().email(),
  type: z.enum(["Online", "Face to face", "Hybrid"]).describe("Type of tuition"),
  school: z.string().describe('School'),
  year: z.enum([
    "Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6",
    "Secondary 1", "Secondary 2", "Secondary 3", "Secondary 4", "Secondary 5",
    "Junior College 1", "Junior College 2", "Junior College 3",
    "Others: Please specify below"
  ]).describe("Year of study"),
  otheryear: z.string().describe("Specify here").optional(), 
  dob: z.coerce.date().describe("Date of Birth"),
  gender: z.enum(["Male", "Female"]),
  phoneNumber: z.string().describe("Student Phone number").optional(),
  parentPhoneNumber: z.string().describe("Parent Phone number").optional(),
  address: z.string().describe("Address").optional(),
}).superRefine((data, ctx) => {
  if (data.year === "Others: Please specify below") {
    if (!data.otheryear || data.otheryear.trim() === "") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify the year when 'Others' is selected.",
        path: ["otheryear"], 
      });
    }
  }
});

const form = useForm({
  validationSchema: toTypedSchema(schema),
});
</script>
