// middleware/setup-routes.global.js
export default defineNuxtRouteMiddleware((to) => {
  // This middleware runs on every route change
  
  // Define which routes require authentication
  const authRoutes = [
    '/dashboard',
    '/profile',
    '/bookings',
    '/favorites',
    '/messages',
    '/properties/create',
    '/properties/edit'
  ];
  
  // Admin only routes
  const adminRoutes = [
    '/admin'
  ];
  
  // Guest only routes (like login/register)
  const guestRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password'
  ];
  
  // Set meta based on route path
  if (authRoutes.some(route => to.path === route || to.path.startsWith(route + '/'))) {
    to.meta.requiresAuth = true;
  }
  
  if (adminRoutes.some(route => to.path === route || to.path.startsWith(route + '/'))) {
    to.meta.requiresAuth = true;
    to.meta.requiredRole = 'admin';
  }
  
  if (guestRoutes.some(route => to.path === route)) {
    to.meta.guestOnly = true;
  }
});