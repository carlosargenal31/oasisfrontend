// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isInitialized: false
  }),
  
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    isLoggedIn: (state) => state.isAuthenticated,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  
  actions: {
    setUser(user) {
      if (!user) {
        this.user = null;
        return;
      }
      
      // Crear una copia del usuario para evitar modificar el original
      const userCopy = { ...user };
      
      // Si el usuario tiene una imagen de perfil, asegurarse de que se mantenga
      if (this.user && this.user.profile_image && !userCopy.profile_image) {
        userCopy.profile_image = this.user.profile_image;
      }
      
      // Actualizar el usuario en el estado
      this.user = userCopy;
      
      // Si estamos en el cliente, actualizar también localStorage
      if (process.client) {
        try {
          localStorage.setItem('user', JSON.stringify(userCopy));
        } catch (e) {
          console.error('Error al guardar usuario en localStorage', e);
        }
      }
    },
    
    setToken(token, refreshToken = null) {
      this.token = token;
      
      if (refreshToken) {
        this.refreshToken = refreshToken;
      }
      
      if (process.client && token) {
        try {
          localStorage.setItem('token', token);
          
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
          }
          
          // Verificar que el token se guardó correctamente
          const savedToken = localStorage.getItem('token');
          if (!savedToken) {
            console.error('Error: Token no guardado correctamente en localStorage');
          }
        } catch (e) {
          console.error('Error al guardar token en localStorage', e);
        }
      }
    },
    
    // Método mejorado para validar la sesión actual
    validateSession() {
  if (!process.client) return false;
  
  // Si ya estamos autenticados, simplemente devolver true sin más verificaciones
  // Esto evitará reinicializaciones innecesarias durante la navegación
  if (this.isAuthenticated && this.user && this.token) {
    return true;
  }
  
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  
  // Si no hay token en localStorage pero estamos autenticados en el store,
  // preservar el estado actual en lugar de reinicializar
  if (!token && this.isAuthenticated) {
    console.warn('Token no encontrado en localStorage pero estamos autenticados');
    
    // Guardar el token actual en localStorage para mantener consistencia
    if (this.token) {
      localStorage.setItem('token', this.token);
      console.log('Token restaurado en localStorage');
    }
    
    // Si tenemos usuario pero no está en localStorage, guardarlo también
    if (this.user && (!userJson || userJson === 'null' || userJson === 'undefined')) {
      localStorage.setItem('user', JSON.stringify(this.user));
      console.log('Usuario restaurado en localStorage');
    }
    
    return true; // Mantener el estado autenticado
  }
  
  // Si hay token en localStorage pero no estamos autenticados en el store,
  // restaurar la autenticación desde localStorage
  if (token && !this.isAuthenticated) {
    console.warn('Token encontrado en localStorage pero no estamos autenticados');
    
    this.token = token;
    
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        if (parsedUser && parsedUser.id) {
          this.user = parsedUser;
          this.isAuthenticated = true;
          console.log('Sesión restaurada desde localStorage');
        }
      } catch (e) {
        console.error('Error al parsear usuario desde localStorage:', e);
      }
    }
  }
  
  return this.isAuthenticated;
},
    
    async register(userData) {
      try {
        // Solo ejecutar en el cliente
        if (!process.client) {
          return { 
            success: false, 
            error: 'El registro solo puede realizarse en el cliente.' 
          };
        }
        
        console.log('Attempting register with:', userData.email);
        
        // En un entorno real, esto sería una petición a tu API
        const response = await axios.post('http://localhost:3000/api/auth/register', userData);
        
        // Para pruebas: simulamos una respuesta exitosa si la API no está disponible
        const mockResponse = {
          success: true,
          data: {
            user: {
              id: 1,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              role: 'user', // Por defecto, nuevos usuarios son 'user'
              profile_image: null
            },
            accessToken: 'mock_access_token_' + Date.now(),
            refreshToken: 'mock_refresh_token_' + Date.now()
          }
        };
        
        // Usar respuesta real o simulada
        const data = (response && response.data) || mockResponse;
        
        console.log('Register response:', data);
        
        // Verificar si la respuesta tiene el formato correcto
        if (data && data.success && data.data) {
          // Extraer datos de la respuesta
          const { user, accessToken, refreshToken } = data.data;
          
          // Asegurarnos de que el token y el usuario se guardan correctamente
          this.setToken(accessToken, refreshToken);
          this.setUser(user);
          this.isAuthenticated = true;
          
          // Verificar que todo se guardó correctamente
          const tokenInStorage = localStorage.getItem('token');
          if (!tokenInStorage) {
            console.error('Error: Token no guardado correctamente después del registro');
          }
          
          return { success: true };
        } else {
          return { 
            success: false, 
            error: 'Formato de respuesta inesperado' 
          };
        }
      } catch (error) {
        console.error('Error en registro:', error);
        
        // Para pruebas: simulamos éxito si la API no está disponible
        if (error.message && error.message.includes('Network Error')) {
          console.log('Network error detected, using mock data for development');
          
          // Crear usuario mock
          const mockUser = {
            id: 1,
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            role: 'user', // Por defecto, nuevos usuarios son 'user'
            profile_image: null
          };
          
          // Crear tokens mock
          const accessToken = 'mock_access_token_' + Date.now();
          const refreshToken = 'mock_refresh_token_' + Date.now();
          
          // Asegurarnos de que el token y el usuario se guardan correctamente
          this.setToken(accessToken, refreshToken);
          this.setUser(mockUser);
          this.isAuthenticated = true;
          
          return { success: true };
        }
        
        let errorMessage = 'Error al registrarse. Por favor intenta de nuevo.';
        
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        
        return { 
          success: false, 
          error: errorMessage
        };
      }
    },
    
    async login(credentials) {
      try {
        // Solo ejecutar en el cliente
        if (!process.client) {
          return { 
            success: false, 
            error: 'El inicio de sesión solo puede realizarse en el cliente.' 
          };
        }
        
        console.log('Attempting login with:', credentials.email);
        
        // Intentar petición real
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: credentials.email,
          password: credentials.password
        });
        
        // Para pruebas: simulamos una respuesta exitosa si la API no está disponible
        const mockResponse = {
          success: true,
          data: {
            user: {
              id: 1,
              first_name: 'John',
              last_name: 'Doe',
              email: credentials.email,
              role: credentials.email === 'admin@example.com' ? 'admin' : 'user', // Si es admin por email
              profile_image: 'https://oasiscontenedor.blob.core.windows.net/users/01.jpg'
            },
            accessToken: 'mock_access_token_' + Date.now(),
            refreshToken: 'mock_refresh_token_' + Date.now()
          }
        };
        
        // Usar respuesta real o simulada
        const data = (response && response.data) || mockResponse;
        
        console.log('Login response:', data);
        
        // Verificar si la respuesta tiene el formato correcto
        if (data && data.success && data.data) {
          // Extraer datos de la respuesta
          const { user, accessToken, refreshToken } = data.data;
          
          // Limpiar primero cualquier estado anterior para evitar conflictos
          this.logout();
          
          // Actualizar estado usando los métodos que verifican guardado correcto
          this.setToken(accessToken, refreshToken);
          this.setUser(user);
          this.isAuthenticated = true;
          
          if (credentials.remember) {
            localStorage.setItem('rememberedEmail', credentials.email);
          }
          
          // Verificar que el token se guardó correctamente
          const tokenInStorage = localStorage.getItem('token');
          console.log('Token guardado correctamente:', !!tokenInStorage);
          
          if (!tokenInStorage) {
            console.error('Error: Token no guardado correctamente después del login');
            return { 
              success: false, 
              error: 'Error al guardar datos de sesión. Intente de nuevo.' 
            };
          }
          
          return { success: true };
        } else {
          return { 
            success: false, 
            error: 'Formato de respuesta inesperado' 
          };
        }
      } catch (error) {
        console.error('Error en login:', error);
        
        // Para pruebas: simulamos éxito si la API no está disponible
        if (error.message && error.message.includes('Network Error')) {
          console.log('Network error detected, using mock data for development');
          
          // Limpiar primero cualquier estado anterior para evitar conflictos
          this.logout();
          
          // Crear usuario mock con imagen de perfil real
          const mockUser = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: credentials.email,
            role: credentials.email === 'admin@example.com' ? 'admin' : 'user', // Si es admin por email
            profile_image: 'https://oasiscontenedor.blob.core.windows.net/users/01.jpg'
          };
          
          // Crear tokens mock
          const accessToken = 'mock_access_token_' + Date.now();
          const refreshToken = 'mock_refresh_token_' + Date.now();
          
          // Actualizar estado usando los métodos seguros
          this.setToken(accessToken, refreshToken);
          this.setUser(mockUser);
          this.isAuthenticated = true;
          
          if (credentials.remember) {
            localStorage.setItem('rememberedEmail', credentials.email);
          }
          
          return { success: true };
        }
        
        let errorMessage = 'Error al iniciar sesión. Por favor intenta de nuevo.';
        
        if (error.response && error.response.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        
        return { 
          success: false, 
          error: errorMessage
        };
      }
    },
    
    logout() {
      // Guardar una copia del estado actual para logging en caso de error
      const hadToken = !!this.token;
      const hadUser = !!this.user;
      
      // Resetear el estado
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      
      if (process.client) {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');
          
          // Verificar que se eliminó correctamente
          const tokenAfter = localStorage.getItem('token');
          if (tokenAfter && hadToken) {
            console.error('Error: Token no eliminado correctamente de localStorage');
          }
        } catch (e) {
          console.error('Error al eliminar datos de localStorage:', e);
        }
      }
      
      return { success: true };
    },
    
    // Versión mejorada del método initialize
    // En auth.js - modifica la función initialize
initialize() {
  if (!process.client) return false;
  
  console.log('Inicializando store de autenticación');
  
  // Si ya estamos inicializados y autenticados, no hacer nada
  if (this.isInitialized && this.isAuthenticated && this.user && this.token) {
    console.log('Store ya inicializado y autenticado, manteniendo sesión');
    return true;
  }
  
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userJson = localStorage.getItem('user');
  
  let isValid = false;
  
  if (token) {
    console.log('Token encontrado en localStorage');
    this.token = token;
    this.refreshToken = refreshToken || null;
    
    // Si tenemos el usuario en localStorage, lo cargamos
    if (userJson) {
      try {
        const parsedUser = JSON.parse(userJson);
        if (parsedUser && parsedUser.id) {
          this.user = parsedUser;
          isValid = true;
          this.isAuthenticated = true;
          console.log('Usuario cargado desde localStorage:', this.user.first_name);
        } else {
          console.warn('Datos de usuario inválidos en localStorage');
        }
      } catch (e) {
        console.error('Error al parsear usuario desde localStorage:', e);
      }
    } else {
      console.warn('No hay datos de usuario en localStorage');
      // Intentar obtener el usuario del servidor si estamos en producción
      // En desarrollo, no hacer esta llamada para no añadir complejidad
      if (process.env.NODE_ENV === 'production') {
        this.fetchCurrentUser();
      }
    }
    
    // Si ya tenemos usuario en memoria pero no se pudo cargar desde localStorage,
    // confiar en el estado actual
    if (!isValid && this.user && this.user.id) {
      console.log('Usando datos de usuario ya existentes en memoria');
      isValid = true;
      this.isAuthenticated = true;
    }
  } else {
    console.warn('No se encontró token en localStorage');
    
    // Si no hay token pero tenemos usuario y estamos autenticados,
    // intentar preservar la sesión
    if (this.user && this.token && this.isAuthenticated) {
      console.log('Preservando sesión existente aunque no haya token en localStorage');
      localStorage.setItem('token', this.token);
      localStorage.setItem('user', JSON.stringify(this.user));
      isValid = true;
    } else {
      // Realmente no hay sesión, limpiar todo
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
    }
  }
  
  this.isInitialized = true;
  return isValid;
},

    
    async fetchCurrentUser() {
      if (!process.client || !this.token) return { success: false };
      
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        });
        
        if (response.data && response.data.success && response.data.data) {
          this.setUser(response.data.data);
          this.isAuthenticated = true;
          return { success: true };
        }
        
        return { success: false };
      } catch (error) {
        console.error('Error al obtener usuario actual:', error);
        
        // Si hay un error 401, el token podría estar caducado
        if (error.response && error.response.status === 401) {
          this.logout();
        }
        
        return { success: false, error: 'No se pudo obtener información del usuario.' };
      }
    },

    // En auth.js - agregar este nuevo método
syncAuthState() {
  if (!process.client) return;
  
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  
  // Si hay alguna inconsistencia, intentar resolverla
  if (this.isAuthenticated && !token) {
    // Store dice autenticado pero localStorage no tiene token
    localStorage.setItem('token', this.token || 'sync_' + Date.now());
    localStorage.setItem('user', JSON.stringify(this.user || {}));
    console.log('Estado sincronizado: token restaurado en localStorage');
  } else if (!this.isAuthenticated && token) {
    // Store dice no autenticado pero localStorage tiene token
    try {
      if (userJson) {
        const user = JSON.parse(userJson);
        this.user = user;
        this.token = token;
        this.isAuthenticated = true;
        console.log('Estado sincronizado: sesión restaurada desde localStorage');
      }
    } catch (e) {
      console.error('Error al sincronizar estado:', e);
    }
  }
}
  }
});