<template>
  <div class="w-full h-full">
    <TopMenu />
    <NuxtPage class="p-5"/>
  </div>
  <Toaster />

<!-- Nuxt  -->
  <ClientOnly>
    <Toaster />
  </ClientOnly>
</template>

