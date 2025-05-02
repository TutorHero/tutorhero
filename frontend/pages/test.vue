<template>
  test
</template>

<script setup>
import { useLinkStore } from '../stores/linkStore';
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { getTutorStudents, createSubject, getSubjectByName, createTutorSubject } from '@firebasegen/default-connector'
const linkStore = useLinkStore();
onMounted(async () => {
  const date = new Date();
  const { data } = await getSubjectByName({ name: "english" });
  let id = data.subjects[0]?.id;

  if (!id) {
    const { data: createData } = await createSubject({ name: "english" });
    id = createData?.id; // or whatever shape your response has
  }

  const { data: data1 } = await createTutorSubject({ subjectId: id });
  console.log(data1);
  await linkStore.createLink(date);
  const link = linkStore.link;
  console.log(link);
  await linkStore.trycheckURL(link);
  console.log('The link is valid:', linkStore.returnedlink);
});

</script>
