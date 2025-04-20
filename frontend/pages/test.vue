<template>
  test
</template>

<script setup>
import { useLinkStore } from '../stores/linkStore';
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { listMyStudents } from  '@firebasegen/default-connector'
const linkStore = useLinkStore();
onMounted(async () => {
  const date = new Date();
  await linkStore.createLink(date);
  const link = linkStore.link;
  console.log(link);
  // const { data } = await listMyStudents();
  // console.log(data);
  // await linkStore.trycheckURL(link);
  // console.log('The link is valid:', linkStore.returnedlink);
});

</script>
