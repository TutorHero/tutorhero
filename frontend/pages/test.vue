<template>
  test
  <div id="qr"></div>
</template>

<script setup>
const qrString = ref('')
import QRCodeStyling from "qr-code-styling";
import { useLinkStore } from '../stores/linkStore';
const tutorStore = useTutorStore()
const studentStore = useStudentStore()
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { getTutorStudents, createTutorStudentSubject, getStudentbyName } from '@firebasegen/default-connector'
const linkStore = useLinkStore();
import axios from 'axios'
onMounted(async () => {
  qrString.value = await studentStore.generateQR('87782016',30,'Tuition fee')
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
