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
        localStorage.setItem('token', token);
        
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
      }
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
              // Nota: ya no usamos avatar de placeholder, ahora lo manejamos con el componente
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
          
          // Actualizar estado
          this.user = user;
          this.token = accessToken;
          this.refreshToken = refreshToken;
          this.isAuthenticated = true;
          
          // Guardar en localStorage
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(user));
          
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
            // Nota: ya no usamos avatar de placeholder, ahora lo manejamos con el componente
            profile_image: null
          };
          
          // Crear tokens mock
          const accessToken = 'mock_access_token_' + Date.now();
          const refreshToken = 'mock_refresh_token_' + Date.now();
          
          // Actualizar estado
          this.user = mockUser;
          this.token = accessToken;
          this.refreshToken = refreshToken;
          this.isAuthenticated = true;
          
          // Guardar en localStorage
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
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
              // Usamos un endpoint real para el profile_image
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
          
          // Actualizar estado
          this.user = user;
          this.token = accessToken;
          this.refreshToken = refreshToken;
          this.isAuthenticated = true;
          
          // Guardar en localStorage
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(user));
          
          if (credentials.remember) {
            localStorage.setItem('rememberedEmail', credentials.email);
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
          
          // Crear usuario mock con imagen de perfil real
          const mockUser = {
            id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email: credentials.email,
            profile_image: 'https://oasiscontenedor.blob.core.windows.net/users/01.jpg'
          };
          
          // Crear tokens mock
          const accessToken = 'mock_access_token_' + Date.now();
          const refreshToken = 'mock_refresh_token_' + Date.now();
          
          // Actualizar estado
          this.user = mockUser;
          this.token = accessToken;
          this.refreshToken = refreshToken;
          this.isAuthenticated = true;
          
          // Guardar en localStorage
          localStorage.setItem('token', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('user', JSON.stringify(mockUser));
          
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
      this.user = null;
      this.token = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      
      if (process.client) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
      
      return { success: true };
    },
    
    initialize() {
      if (process.client) {
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');
        const userJson = localStorage.getItem('user');
        
        if (token) {
          this.token = token;
          this.refreshToken = refreshToken;
          this.isAuthenticated = true;
          
          // Si tenemos el usuario en localStorage, lo cargamos
          if (userJson) {
            try {
              this.user = JSON.parse(userJson);
            } catch (e) {
              console.error('Error parsing user from localStorage', e);
            }
          } else {
            // Si no tenemos el usuario, lo obtenemos del servidor
            this.fetchCurrentUser();
          }
        }
        
        this.isInitialized = true;
      }
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
          this.user = response.data.data;
          
          // Actualizar localStorage
          localStorage.setItem('user', JSON.stringify(this.user));
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
    }
  }
});