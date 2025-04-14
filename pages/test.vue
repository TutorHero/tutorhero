<template>
  test
</template>

<script setup> 
import { useLinkStore } from '../stores/linkStore';
const { $firebaseAuth, $firebaseDataConnect } = useNuxtApp();
const linkStore = useLinkStore()
const date = new Date().toISOString();
linkStore.createLink(date)
const link = linkStore.link
console.log(link)
</script>
