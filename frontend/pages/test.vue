<template>
  test
  <img :src="imagelink"/>
</template>

<script setup>
const qrString = ref('')
const imagelink = ref('')
const generateQR = async () => {
  const { data, error } = await useFetch('/api/generatePaynow', {
    method: 'POST',
    body: {
      proxyType: 'mobile',
      proxyValue: '87782016',
      editable: 'yes',
      amount: 30.5,
      merchant: 'Tuition Co',
      remarks: 'Math tuition 2 June'
    }
  })

  if (error.value) {
    console.error('Error generating QR:', error.value)
  } else {
    qrString.value = data.value.qr
    console.log('QR Payload:', qrString.value)
  }
}
import qrcode from 'qrcode'
import { useLinkStore } from '../stores/linkStore';
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
import { getTutorStudents, createTutorStudentSubject, getStudentbyName } from '@firebasegen/default-connector'
const linkStore = useLinkStore();
import axios from 'axios'
onMounted(async () => {
  await generateQR()
  console.log(qrString.value)
  qrcode.toDataURL(qrString.value, function (err, url) {
    console.log(url)
    imagelink.value = url
  })
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
