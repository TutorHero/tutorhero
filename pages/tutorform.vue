<template>
  <div class="flex justify-center">
    <AutoForm
      :schema = schema
      @submit = "(data) => {
        FormSubmit(data)
      }"
      :field-config="{
        email: {
          inputProps: {
            disabled: true
          }
        }
      }"
      title="Tutor Form"
      description="Fill in your details"
    >
    <div class="flex justify-end gap-3">
      <Button variant="outline" @click="navigateTo('sign-in')" class="mt-4">Go back to sign in</Button>
      <Button type="submit" class="mt-4" @click="() => {
        toast({
            description: 'Data Submitted Sucessfully',
          });
          navigateTo('overview')
        }">
        Submit
      </Button>
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
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();

const user = $firebaseAuth.currentUser
const email = user.email
const name = user.displayName
const number = user.phoneNumber

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
  tutors.value = tutorStore.tutors
  console.log(tutors.value)
}

const schema = z.object({
  email: z.string().email().describe("Email").default(email),
  name: z.string({required_error: 'Name is required.',}).default(name),
  type: z.nativeEnum(tutortypes).describe('Type of tutor eg. Online, Face to face'),
  gender: z.nativeEnum(genders).describe("Gender"),
  phoneNo: z.string().describe("Phone Number").default(number),
  address: z.string().describe("Address")
})
  
</script>