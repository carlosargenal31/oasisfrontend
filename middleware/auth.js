import { useAuthStore } from '@/store/auth';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  
  // Initialize auth state if not already done
  if (!authStore.isAuthenticated) {
    authStore.init();
  }

  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // If not authenticated, redirect to login
    if (!authStore.isAuthenticated) {
      return navigateTo({
        path: '/auth/login',
        query: { redirect: to.fullPath }
      });
    }
    
    // Check if a specific role is required
    if (to.meta.requiredRole && !authStore.checkAuthAndRole(to.meta.requiredRole)) {
      // If user doesn't have the required role, redirect to home or unauthorized page
      return navigateTo('/unauthorized');
    }
  }

  // If the route is an auth route (login, register, etc.) and user is authenticated,
  // redirect to home or dashboard
  if (to.meta.isAuthRoute && authStore.isAuthenticated) {
    return navigateTo('/');
  }
});