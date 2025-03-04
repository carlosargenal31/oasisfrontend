import axios from 'axios';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  
  // Debug logging
  console.log('API Base URL:', config.public.apiBaseUrl);
  
  // Create axios instance with default config
  const api = axios.create({
    baseURL: config.public.apiBaseUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  });
  
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      // Debug logging
      console.log('API Request:', config.method?.toUpperCase(), config.url);
      
      // Get token from localStorage on client side
      if (process.client) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    },
    (error) => {
      console.error('API Request Error:', error);
      return Promise.reject(error);
    }
  );
  
  // Response interceptor
  api.interceptors.response.use(
    (response) => {
      // Debug logging
      console.log('API Response:', response.config.url, response.status);
      return response;
    },
    (error) => {
      // Detailed error logging
      console.error('API Error:', 
        error.config?.method?.toUpperCase(),
        error.config?.url, 
        error.response?.status,
        error.response?.data || error.message
      );
      
      // Handle common errors
      if (error.response) {
        // Handle 401 Unauthorized
        if (error.response.status === 401) {
          // Clear auth data
          if (process.client) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
          
          // Redirect to login page if not already there
          const router = useRouter();
          if (process.client && router.currentRoute.value.path !== '/auth/login') {
            router.push('/auth/login');
          }
        }
        
        // Handle 403 Forbidden
        if (error.response.status === 403) {
          const router = useRouter();
          router.push('/unauthorized');
        }
        
        // Handle 404 Not Found
        if (error.response.status === 404) {
          const router = useRouter();
          router.push('/404');
        }
        
        // Handle 500 Server Error
        if (error.response.status >= 500) {
          console.error('Server Error:', error.response.data);
        }
      } else if (error.request) {
        // Network error (no response)
        console.error('Network Error - No response received:', error.request);
      } else {
        // Request setup error
        console.error('Request Error:', error.message);
      }
      
      return Promise.reject(error);
    }
  );
  
  return {
    provide: {
      axios: api
    }
  };
});