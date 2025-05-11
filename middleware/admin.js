// middleware/admin.js
export default function ({ store, redirect }) {
  // Verificar si el usuario está autenticado
  if (!store.state.auth.token) {
    return redirect('/auth/login')
  }
  
  // Verificar si el usuario es admin
  if (!store.state.auth.user || store.state.auth.user.role !== 'admin') {
    return redirect('/')
  }
}