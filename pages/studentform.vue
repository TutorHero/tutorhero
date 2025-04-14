<template>
  <div class="flex justify-center">
    <AutoForm
      :schema = schema
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
import z from "zod"
import { useToast } from '@/components/ui/toast/use-toast'
const studentStore = useStudentStore()
const students = ref([])

const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
const { toast } = useToast()

const props = defineProps({
  id: {
    type: String,
    default: 'null'
  }
});

function FormSubmit(data) {
  data["dob"] = data["dob"].toISOString().split('T')[0]
  data["status"] = "current"
  studentStore.createStudent(data)
  studentStore.fetchAllStudents()
  students.value = studentStore.students
  console.log(students.value)
}

const schema = z.object({
  name: z.string({required_error: 'Name is required.',}),
  email: z.string().email(),
  studenttype: z.enum(["Online", "Face to face", "Hybrid"]).describe("Type of student"),
  school: z.string().describe('School'),
  dob: z.coerce.date().describe("Date of Birth"),
  gender: z.enum(["Male", "Female"]),
  phoneNo: z.string().describe("Phone number"),
  address: z.string().describe("Address"),
  tuitionLoc: z.string().describe("Tuition Location")
})


  


  
</script>

