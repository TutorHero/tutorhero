<template>
  test
</template>

<script setup>
import { useLinkStore } from '../stores/linkStore';
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { getTutorStudents, createTutorStudentSubject, getStudentbyName } from '@firebasegen/default-connector'
const linkStore = useLinkStore();
onMounted(async () => {
  const {data:data1} = await getStudentbyName({name:"jerryl"})
  console.log(data1)
  const { data } = await createTutorStudentSubject({ subject: "english", rate: 45.5 });
  console.log(data)


  await linkStore.createLink(date);
  const link = linkStore.link;
  console.log(link);
  await linkStore.trycheckURL(link);
  console.log('The link is valid:', linkStore.returnedlink);
});

</script>
