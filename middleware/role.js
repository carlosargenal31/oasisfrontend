import { useAuthStore } from '@/store/auth';

// Define middleware to check specific roles
// This middleware should be used in conjunction with the auth middleware
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  
  // Initialize auth store if not already done
  if (!authStore.isAuthenticated) {
    authStore.init();
  }
  
  // Extract required role from route meta or middleware parameter
  const requiredRole = to.meta.requiredRole;
  
  // If no role is specified or user has no role, deny access
  if (!requiredRole || !authStore.userRole) {
    return navigateTo('/unauthorized');
  }
  
  // Check if user has required role
  const hasRequiredRole = Array.isArray(requiredRole)
    ? requiredRole.includes(authStore.userRole)
    : authStore.userRole === requiredRole;
  
  // If user doesn't have required role, redirect to unauthorized page
  if (!hasRequiredRole) {
    return navigateTo('/unauthorized');
  }
});