import { defineStore } from 'pinia'
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

export const useAuthStore = defineStore('authStore', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    async signInWithGoogle (auth) {
      const provider = new GoogleAuthProvider()
      try {
        const result = await signInWithRedirect(auth, provider)
        this.user = result.user
        console.log(this.user)
      } catch (error) {
        console.log(error)
      }
    }
  }
})