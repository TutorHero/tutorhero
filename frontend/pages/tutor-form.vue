<template>
  <div class="mt-20 flex justify-center">
    <AutoForm
      :form="form"
      :schema="schema"
      @submit="(data) => {
        submitForm(data)
      }"
      :field-config="{
        email: {
          inputProps: {
            disabled: true,
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

<script setup >
import z from "zod"
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useToast } from '@/components/ui/toast/use-toast'
const { toast } = useToast()
const tutorStore = useTutorStore()
const tutors = ref([])
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

const tutortypes = {
  hybrid: "Hybrid",
  online: "Online",
  onsite: "Onsite"
}

const genders = {
  male: "Male",
  female: "Female"
}


const submitForm = async (data) => {
  await tutorStore.createTutor(data)
  tutors.value = tutorStore.tutor
}

const schema = z.object({
  email: z.string().email().describe("Email"),
  name: z.string({required_error: 'Name is required.',}),
  type: z.nativeEnum(tutortypes).describe('Type of tutor eg. Online, Face to face'),
  gender: z.nativeEnum(genders).describe("Gender"),
  phoneNumber: z.string().describe("Phone Number"),
  address: z.string().describe("Address")
})

const form = useForm({
  validationSchema: toTypedSchema(schema),
})

watchEffect(() => {
  form.setFieldValue('email', user.value.email)
  form.setFieldValue('name', user.value.displayName)
  form.setFieldValue('number', user.value.phoneNumber)
})

definePageMeta({ layout: false });
</script>