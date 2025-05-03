<template>
  <div class="my-20 flex justify-center">
    <AutoForm
      :schema = schema
      :dependencies="[{
        sourceField: 'year',
        type: DependencyType.HIDES,
        targetField: 'otheryear',
        when: (year) => year != 'Others: Please specify below'
      }]"
      @submit = "(data) => {
        FormSubmit(data)
      }"
      title="Student Form"
      description="Fill in your details"
    >
    <div class="flex justify-end">
      <Button variant="outline" type="submit" class="mt-4" @click="() => {
      toast({
        description: 'Data Submitted Sucessfully',
      });
    }">Submit</Button>
    </div>
    </AutoForm>
  </div>
</template>

<script setup >
definePageMeta({ layout: false });
import z from "zod"
import { useToast } from '@/components/ui/toast/use-toast'
import { DependencyType } from "@/components/ui/auto-form/interface"
const studentStore = useStudentStore()
const students = ref([])
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
const { toast } = useToast()

onMounted(() => {
  const route = useRoute()
  const link = route.query.id
})

function FormSubmit(data) {
  data["dob"] = data["dob"].toISOString().split('T')[0]
  data["status"] = "current"
  if (data["year"] == "Others: Please specify below") {
    data["year"] = data["otheryear"]
  } 
  studentStore.createStudent(data)
  students.value = studentStore.students
  console.log(students.value)
}

const yearOfStudy = {
  p1: "Primary 1",
  p2: "Primary 2",
  p3: "Primary 3",
  p4: "Primary 4",
  p5: "Primary 5",
  p6: "Primary 6",
  s1: "Secondary 1",
  s2: "Secondary 2",
  s3: "Secondary 3",
  s4: "Secondary 4",
  s5: "Secondary 5",
  j1: "Junior College 1",
  j2: "Junior College 2",
  j3: "Junior College 3",
  others: "Others: Please specify below"
}

const schema = z.object({
  name: z.string({required_error: 'Name is required.',}),
  email: z.string().email(),
  type: z.nativeEnum(["Online", "Face to face", "Hybrid"]).describe("Type of student"),
  school: z.string().describe('School'),
  year: z.nativeEnum(yearOfStudy).describe("Year of study"),
  otheryear: z.string().describe("Specify here"),
  dob: z.coerce.date().describe("Date of Birth"),
  gender: z.enum(["Male", "Female"]),
  phoneNo: z.string().describe("Phone number"),
  address: z.string().describe("Address"),
  tuitionLoc: z.string().describe("Tuition Location")
})

  
</script>

