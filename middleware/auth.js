// middleware/auth.js
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware during server-side rendering
  if (process.server) return;
  
  // Acceder al store
  const authStore = useAuthStore();
  
  // Initialize auth state if not already done
  if (!authStore.isInitialized) {
    authStore.initialize();
  }
  
  // Si la ruta requiere auth y el usuario no está autenticado
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Guardar la ruta prevista para redirección después del login
    if (process.client) {
      localStorage.setItem('authRedirect', to.fullPath);
    }
    
    return navigateTo('/auth/login');
  }
  
  // Si la ruta es solo para invitados (como página de login) y el usuario está autenticado
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return navigateTo('/dashboard');
  }
  
  // Para rutas específicas de rol
  if (to.meta.requiredRole && (!authStore.isAuthenticated || authStore.user?.role !== to.meta.requiredRole)) {
    return navigateTo('/unauthorized');
  }
});