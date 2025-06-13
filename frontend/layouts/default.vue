<template>
  <div class="border-[1px] p-2 flex justify-between">
    <div class="flex items-center">
      <img src="../public/static/TutorHero.svg" width="55px" height="55px" class="mr-2 stroke-2 stroke-black">
      <h3 class="text-2xl font-bold mr-7">TutorHero</h3>
      <NavigationMenu class="hidden md:block">
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
        </NavigationMenuList>
      </NavigationMenu>
    </div>

    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="outline" class="p-2">
            <Menu class="w-6 h-6 stroke-[3px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <NavigationMenu orientation="vertical">
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
            </NavigationMenuList>
          </NavigationMenu>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant="ghost" @click="userSignOut">
        <LogOut stroke-width="3" />
        Sign out
      </Button>
    </div>
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'

import { LogOut } from "lucide-vue-next"

import { Menu } from 'lucide-vue-next';

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
