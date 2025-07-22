<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <Button variant="outline" @click="generateLink()">
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent class="max-w-[380px] sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Student Form</DialogTitle>
          <DialogDescription>Link generated for student form</DialogDescription>
        </DialogHeader>
        <div class="w-full flex justify-between items-center">
          <div class="h-10 max-w-[220px] md:max-w-[340px] overflow-x-scroll">
            <a class="text-blue-500 text-nowrap" :href="url">{{ url }}</a>
          </div>
          
          <div v-if="!copied">
            <Button variant="outline" @click="copyLink()">
              <div class="flex items-center gap-2">
                <div>Copy</div>
                <div><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#1C274C" stroke-width="1.5"></path> </g></svg></div>
              </div>
            </Button>
          </div>
          <div v-else>
            <Button class="w-24">
              <div class="flex gap-2 items-center">
                <div>Copied</div>
                <div><svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "></polygon> </g></svg></div>
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import DialogTrigger from '~/components/ui/dialog/DialogTrigger.vue'
import { createStudentFormUrl } from '@firebasegen/default-connector';
const url = ref('')
const copied = ref(false)

const generateLink = async () => {
  copied.value = false
  const { data: { studentFormURL_insert: { id } } } = await createStudentFormUrl()
  url.value = `${window.location.protocol}//${window.location.host}/student-form?id=${id}`
}

const copyLink = () => {
  navigator.clipboard.writeText(url.value);
  copied.value = !copied.value
}
</script>