<template>
  <div>
    <Dialog>
      <DialogTrigger>
        <Button variant="Outline">
          Generate Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Student Form
          </DialogTitle>
          <DialogDescription>
            Link generated for student form
          </DialogDescription>
        </DialogHeader>
        <div class="flex justify-between">
          <div class="flex items-center ">
            <a class="text-nowrap overflow-x-auto col-span-2 w-80 text-blue-500" :href="url">{{ url }}</a>
          </div>
          <div v-if="!copied" class="flex  justify-end">
            <Button variant="outline" @click="myFunction()" class="w-24 flex-justify-bewteen">
              <div class="flex justify-bewteen items-center gap-2">
                <div>Copy</div>
                <div><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z" stroke="#1C274C" stroke-width="1.5"></path> <path d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5" stroke="#1C274C" stroke-width="1.5"></path> </g></svg></div>
              </div>
              <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>content-copy</title><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg> -->
            </button>
          </div>
          <div v-else>
            <Button @click="myFunction()" class="w-24">
              <div class="flex justify-bewteen gap-2 items-center">
                <div>Copied</div>
                <div><svg fill="#ffffff" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "></polygon> </g></svg></div>
              </div>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import DialogTrigger from '~/components/ui/dialog/DialogTrigger.vue'
const name = 'asdf675as8d57fds6af5867das8f5'
const url = ref('')
const copied = ref(false)
onMounted(() => {
  url.value = window.location.href.slice(0,22) + 'studentform?id=' + name
  console.log(url.value)
})


function myFunction() {
  navigator.clipboard.writeText(url.value);
  copied.value = !copied.value
  console.log(copied)
  // alert("Copied the link");
}

</script>

<style>

</style>