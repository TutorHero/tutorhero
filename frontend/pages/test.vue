<template>
  test
</template>

<script setup>
import { useLinkStore } from '../stores/linkStore';
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { getTutorStudents, createTutorStudentSubject, getStudentbyName } from '@firebasegen/default-connector'
const linkStore = useLinkStore();
onMounted(async () => {
  const {data:{students}} = await getStudentbyName({name:"jerryl"})
  console.log(students[0].id)
  const date = new Date(Date.now()).toISOString()
  const { data } = await createTutorStudentSubject({ subject: "english", rate: 45.5, studentId: students[0].id, startTime: date, endTime: date, interval: 1500});
  console.log(data)
  const {data:data2} = await getStudentbyName({name:"jerryl"})
  console.log(data2)


  await linkStore.createLink(date);
  const link = linkStore.link;
  console.log(link);
  await linkStore.trycheckURL(link);
  console.log('The link is valid:', linkStore.returnedlink);
});

</script>
