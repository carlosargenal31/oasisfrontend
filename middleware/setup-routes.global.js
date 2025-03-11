// middleware/setup-routes.global.js

export default defineNuxtRouteMiddleware((to, from) => {
  // Asegurarnos de que las rutas estén correctamente configuradas
  // Este middleware se ejecuta antes de cualquier otro

  // Verificar si hay redireccionamientos específicos que queramos hacer
  const redirects = {
    '/register': '/auth/register',
    '/login': '/auth/login',
    '/signup': '/auth/register'
  };

  // Si la ruta actual está en nuestra lista de redirecciones, redirigir
  if (redirects[to.path]) {
    return navigateTo(redirects[to.path], { redirectCode: 301 });
  }
});