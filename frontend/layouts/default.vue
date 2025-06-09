<template>
  <div class="border-[1px] p-2 flex justify-between">
    <div class="flex">
      <h3 class="text-2xl font-bold mr-7">TutorHero</h3>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NuxtLink v-slot="{ isActive, href, navigate }" to="/overview" custom>
              <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()" @click="navigate">
                Overview
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NuxtLink v-slot="{ isActive, href, navigate }" to="/students" custom>
              <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()" @click="navigate">
                Students
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NuxtLink v-slot="{ isActive, href, navigate }" to="/invoices" custom>
              <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()" @click="navigate">
                Invoices
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NuxtLink v-slot="{ isActive, href, navigate }" to="/students" custom>
              <NavigationMenuLink :active="isActive" :href="href" :class="navigationMenuTriggerStyle()" @click="navigate">
                Students
              </NavigationMenuLink>
            </NuxtLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    <Button variant="ghost" @click="userSignOut">
      <LogOut stroke-width="3" />
      Sign out
    </Button>
  </div>
  <div class="w-full h-full p-10">
    <NuxtPage />
  </div>
</template>

<script setup>
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

import { Button } from '@/components/ui/button'

import { LogOut } from "lucide-vue-next"

import { signOut } from "firebase/auth"

const { $firebaseAuth } = useNuxtApp()
const userSignOut = async () => {
  try {
    await signOut($firebaseAuth)
  } catch (error) {
    console.log(error)
  }
}
</script>
