// middleware/app.global.js
import { useAuthStore } from '~/store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  try {
    // Solo ejecutar esta lógica en el cliente
    if (process.client) {
      const authStore = useAuthStore();
      
      // Rutas protegidas que requieren autenticación
      const requiresAuth = [
        '/dashboard',
        '/profile',
        '/bookings',
        '/properties/add'
        // Añade aquí otras rutas protegidas
      ];
      
      // Verifica si la ruta actual requiere autenticación
      const currentPathRequiresAuth = requiresAuth.some(path => 
        to.path === path || to.path.startsWith(path + '/')
      );
      
      // Si la ruta requiere autenticación y el usuario no está autenticado
      if (currentPathRequiresAuth && !authStore.isLoggedIn) {
        // Redirigir a login
        return navigateTo('/login');
      }
    }
  } catch (error) {
    console.error('Error en middleware global:', error);
    // No bloquear la navegación en caso de error
  }
});