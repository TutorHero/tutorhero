export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!process.client) return;
  try {
    const { $firebaseAuth } = useNuxtApp();
    const user = $firebaseAuth.currentUser;
    console.log(user)
    if (!user) {
      return navigateTo('/sign-in');
    }
  } catch (error) {
    return navigateTo('/sign-in');
  }
})