import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  // State
  state: () => ({
    user: null,
    token: null,
    isLoading: false,
    error: null
  }),

  // Getters
  getters: {
    isAuthenticated: (state) => !!state.token,
    userRole: (state) => state.user?.role || null,
    isAdmin: (state) => state.user?.role === 'admin',
    isHost: (state) => state.user?.role === 'host',
    isGuest: (state) => state.user?.role === 'guest',
  },

  // Actions
  actions: {
    // Initialize auth state from localStorage
    init() {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        
        if (token && user) {
          this.token = token;
          this.user = user;
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        this.clearAuth();
      }
    },
    
    // Set auth data after successful login/registration
    setAuth(token, user) {
      this.token = token;
      this.user = user;
      
      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    // Clear all auth data
    clearAuth() {
      this.token = null;
      this.user = null;
      
      // Remove from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    // Login action
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.login(credentials);
        const { token, user } = response.data;
        
        this.setAuth(token, user);
        
        return user;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to login';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Register action
    async register(userData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.register(userData);
        const { token, user } = response.data;
        
        this.setAuth(token, user);
        
        return user;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to register';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Logout action
    async logout() {
      this.isLoading = true;
      
      try {
        // Call backend logout endpoint if needed
        // await api.logout();
        
        // Clear auth data
        this.clearAuth();
      } catch (error) {
        console.error('Logout error:', error);
        // Still clear auth data even if API call fails
        this.clearAuth();
      } finally {
        this.isLoading = false;
      }
    },
    
    // Request password reset
    async requestPasswordReset(email) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.requestPasswordReset(email);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to request password reset';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Reset password
    async resetPassword(data) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.resetPassword(data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to reset password';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Change password
    async changePassword(data) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.changePassword(data);
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to change password';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Get current user profile
    async getCurrentUser() {
      this.isLoading = true;
      
      try {
        const response = await api.getCurrentUser();
        this.user = response.data;
        
        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(this.user));
        
        return this.user;
      } catch (error) {
        console.error('Get user error:', error);
        
        // If 401 unauthorized, logout
        if (error.response?.status === 401) {
          this.clearAuth();
        }
        
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Update user profile
    async updateUser(userData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.updateUser(this.user.id, userData);
        this.user = response.data;
        
        // Update user in localStorage
        localStorage.setItem('user', JSON.stringify(this.user));
        
        return this.user;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Check if user is authenticated and has required role
    checkAuthAndRole(requiredRole = null) {
      // First check if user is authenticated
      if (!this.isAuthenticated) {
        return false;
      }
      
      // If no specific role is required, just being authenticated is enough
      if (!requiredRole) {
        return true;
      }
      
      // If specific role is required, check user role
      return this.user.role === requiredRole || (Array.isArray(requiredRole) && requiredRole.includes(this.user.role));
    },
    
    // Verify email
    async verifyEmail(token) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await api.verifyEmail(token);
        
        // If verification changes user state, update it
        if (response.data.user) {
          this.user = response.data.user;
          localStorage.setItem('user', JSON.stringify(this.user));
        }
        
        return response.data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to verify email';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    
    // Check auth status automatically on app load or route change
    async checkAuth() {
      // If we already have a token but no user data
      if (this.token && !this.user) {
        try {
          await this.getCurrentUser();
        } catch (error) {
          console.error('Check auth error:', error);
          // If error, clear auth data
          this.clearAuth();
        }
      }
      
      return this.isAuthenticated;
    }
  }
});