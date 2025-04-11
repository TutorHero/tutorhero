<template>
  <div class="flex justify-center">
    <AutoForm
      :schema = schema
      @submit = "(data) => {
        FormSubmit(data)
      }"
      :title=title
      :description=description
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
const { toast } = useToast()
const tutorStore = useTutorStore()
const tutors = ref([])
const authStore = useAuthStore()

const props = defineProps({
  title: String,
  description: String
});

const tutortypes = {
  hybrid: "Hybrid",
  online: "Online",
  onsite: "Onsite"
}

const genders = {
  male: "Male",
  female: "Female"
}

function FormSubmit(data) {
  tutorStore.createTutor(data)
  tutorStore.fetchAllTutors()
  tutors.value = tutorStore.tutors
  console.log(tutors)
  data['']
}

const schema = z.object({
  name: z.string({required_error: 'Name is required.',}),
  tutortype: z.nativeEnum(tutortypes).describe('Type of tutor eg. Online, Face to face'),
  gender: z.nativeEnum(genders).describe("Gender"),
  email: z.string().email().describe("Email"),
  phoneNo: z.string().describe("Phone Number"),
  address: z.string().describe("Address")
})


  


  
</script>

<!-- tutorStore.addTutor(data) -->