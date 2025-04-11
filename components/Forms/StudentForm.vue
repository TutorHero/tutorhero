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

  const props = defineProps({
    id: {
      type: String,
      default: 'null'
    },
    title: String,
    description: String
  });

  function FormSubmit(data) {
    if ("dob" in data) {
      data["dob"] = data["dob"].toISOString().split('T')[0]
    }
    
    data['id'] = props.id
    console.log(data)
    
  }

  const schema = z.object({
    name: z.string({required_error: 'Name is required.',}),
    // email: z.string().email(),
    // type: z.enum(["Online", "Face to face", "Hybrid"]).describe("Type of student"),
    dob: z.coerce.date().describe("Date of Birth"),
    // gender: z.enum(["Male", "Female"]),
    // phoneNo: z.string().describe("Phone number"),
    // address: z.string().describe("Address"),
    // tuitionLoc: z.string().describe("Tuition Location")
  })


  


  
</script>

