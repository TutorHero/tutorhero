<template>
  test
  <div id="qr"></div>
</template>

<script setup>
const qrString = ref('')
import QRCodeStyling from "qr-code-styling";
const tutorStore = useTutorStore()
const studentStore = useStudentStore()
const authStore = useAuthStore()
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { getTutorStudents, createTutorStudentSubject, getStudentbyName } from '@firebasegen/default-connector'

import axios from 'axios'
onMounted(async () => {
  await studentStore.deleteStudent("491fcd3be1c749949d6f2142a2e728e7")
  qrString.value = await studentStore.generateQR('87782016',30,'Tuition fee')
  await authStore.addEvent('Math Tuition', "2025-05-29T17:00:00", "2025-05-29T18:00:00","ad4c7f607c3b48d98491f45461df3151")
  qrString.value = await studentStore.generateQR('87782016', 30, 'Tuition fee')
  console.log(qrString.value)
  const qrCode = new QRCodeStyling({
    width: 500,
    height: 500,
    data: qrString.value,
    image: "/static/qrlogo.png",
    dotsOptions: {
      color: "#0a2a52",
      type: "rounded"
    },
    cornersSquareOptions: {
      color: "#0a2a52",
      type: "extra-rounded"
    },
    cornersDotOptions: {
      color: "#0a2a52",
      type: "dot"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      imageSize: 0.3,
    },
    backgroundOptions: {
      color: "#ffffff"
    }
  });
  qrCode.append(document.getElementById("qr"));
  const { data: { students } } = await getStudentbyName({ name: "jerryl" })
  console.log(students[0].id)
  const date = new Date(Date.now()).toISOString()
  const { data } = await createTutorStudentSubject({ subject: "english", rate: 45.5, studentId: students[0].id, startTime: date, endTime: date, interval: 1500 });
  console.log(data)
  const { data: data2 } = await getStudentbyName({ name: "jerryl" })
  console.log(data2)


  await linkStore.createLink(date);
  const link = linkStore.link;
  console.log(link);
  await linkStore.trycheckURL(link);
  console.log('The link is valid:', linkStore.returnedlink);
});

</script>
