import { defineStore } from 'pinia'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useTutorStore } from './tutorStore.js';


export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: {},
    }
  },
  actions: {
    async signInWithGoogle (auth) {
      const provider = new GoogleAuthProvider()
      try {
        const tutorStore = useTutorStore()
        const result = await signInWithPopup(auth, provider)
        this.user = result.user
        console.log(this.user)
        const tutorExists = await tutorStore.ensureTutorExists(this.user)
        return tutorExists

        
      } catch (error) {
        console.log(error)
      }
    }
  },
  persist: true
})