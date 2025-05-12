<template>
  <div class="my-20 flex justify-center">
    <AutoForm :form='form' :schema="schema" :dependencies="[
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
  </div>
</template>

<script setup>
definePageMeta({ layout: false });
import z from "zod"
import { useToast } from '@/components/ui/toast/use-toast'
import { DependencyType } from "@/components/ui/auto-form/interface"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
const studentStore = useStudentStore()
const students = ref([])
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
const { toast } = useToast()

const route = useRoute()
const link = route.query.id

const submitForm = async (data) => {
  data["dob"] = data["dob"].toISOString().split('T')[0]
  data["status"] = "current"
  if (data["year"] === "Others: Please specify below") {
    data["year"] = data["otheryear"];
  }

  await studentStore.createStudent(data)

  toast({
    description: 'Data Submitted Successfully',
  });

  console.log(students.value)
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
  phoneNo: z.string().describe("Phone number"),
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
