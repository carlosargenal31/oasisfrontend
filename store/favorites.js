// src/store/favorites.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: [],
    isLoading: false,
    error: null,
    API_URL: process.env.API_URL || 'http://localhost:3000/api',
  }),
  
  getters: {
    isFavorite: (state) => (propertyId) => {
      return state.favorites.some(fav => 
        (typeof fav === 'object' ? fav.id === propertyId : fav === propertyId)
      );
    },
    
    getFavoriteProperties: (state) => {
      // Si los elementos son objetos completos de propiedades, los devolvemos directamente
      if (state.favorites.length > 0 && typeof state.favorites[0] === 'object') {
        return state.favorites;
      }
      // De lo contrario, solo tenemos IDs y debemos devolver un array vacío
      // (estos se cargarán luego con la función fetchFavoriteDetails)
      return [];
    },
    
    getFavoriteCount: (state) => {
      return state.favorites.length;
    }
  },
  
  actions: {
    async fetchFavorites() {
      this.isLoading = true;
      this.error = null;
      
      try {
        // Intentar obtener el token de autenticación
        const token = localStorage.getItem('access_token');
        
        if (token) {
          // Si hay token, obtener favoritos desde la API
          const response = await axios.get(`${this.API_URL}/users/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          
          if (response.data && response.data.success) {
            // Establecer favoritos desde la respuesta API
            // La estructura puede variar dependiendo de tu API
            if (Array.isArray(response.data.data)) {
              this.favorites = response.data.data;
            } else if (response.data.data && Array.isArray(response.data.data.favorites)) {
              this.favorites = response.data.data.favorites.map(fav => {
                // Si cada favorito tiene una propiedad 'property', usamos esa
                if (fav.property) {
                  return fav.property;
                }
                // Si tiene propertyId, convertirlo a un objeto con id
                if (fav.propertyId) {
                  return { id: fav.propertyId };
                }
                // Si es solo un ID, convertirlo a objeto
                if (typeof fav === 'number' || typeof fav === 'string') {
                  return { id: fav };
                }
                return fav;
              });
            }
          }
        } else {
          // Si no hay token, obtener de localStorage
          const localFavorites = localStorage.getItem('propertyFavorites');
          if (localFavorites) {
            // Convertir de string a array
            const favoriteIds = JSON.parse(localFavorites);
            
            // Convertir a objetos con ID si son solo valores primitivos
            this.favorites = favoriteIds.map(id => {
              if (typeof id === 'object') return id;
              return { id };
            });
          }
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
        this.error = 'No se pudieron cargar los favoritos';
      } finally {
        this.isLoading = false;
      }
    },
    
    async fetchFavoriteDetails() {
      // Solo proceder si tenemos favoritos que son solo IDs (sin detalles completos)
      const needsDetails = this.favorites.some(fav => 
        typeof fav === 'object' && Object.keys(fav).length === 1 && fav.id
      );
      
      if (!needsDetails) return;
      
      this.isLoading = true;
      
      try {
        // Obtener los IDs de las propiedades que necesitamos detalles
        const propertyIds = this.favorites
          .filter(fav => typeof fav === 'object' && Object.keys(fav).length === 1)
          .map(fav => fav.id);
        
        if (propertyIds.length === 0) return;
        
        // Obtener detalles para cada propiedad
        const detailedProperties = await Promise.all(
          propertyIds.map(async (id) => {
            try {
              const response = await axios.get(`${this.API_URL}/properties/${id}`);
              if (response.data && response.data.success) {
                return response.data.data;
              }
              return { id };
            } catch (error) {
              console.error(`Error fetching property ${id}:`, error);
              return { id };
            }
          })
        );
        
        // Reemplazar las propiedades que solo tenían ID con los detalles completos
        this.favorites = this.favorites.map(fav => {
          if (typeof fav === 'object' && Object.keys(fav).length === 1 && fav.id) {
            const detailed = detailedProperties.find(p => p.id === fav.id);
            return detailed || fav;
          }
          return fav;
        });
      } catch (error) {
        console.error('Error fetching property details:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    async addFavorite(property) {
      try {
        const token = localStorage.getItem('access_token');
        const propertyId = typeof property === 'object' ? property.id : property;
        
        // Evitar duplicados
        if (this.isFavorite(propertyId)) return;
        
        if (token) {
          // Si está autenticado, guardar en API
          await axios.post(`${this.API_URL}/users/favorites/${propertyId}`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        
        // Añadir a la lista local de favoritos
        if (typeof property === 'object' && Object.keys(property).length > 1) {
          // Si tenemos el objeto completo de la propiedad, lo añadimos
          this.favorites.push(property);
        } else {
          // Si solo tenemos el ID, añadimos un objeto con el ID
          this.favorites.push({ id: propertyId });
        }
        
        // Guardar también en localStorage para usuarios no autenticados
        this.saveToLocalStorage();
        
      } catch (error) {
        console.error('Error adding favorite:', error);
        // Añadir de todos modos a localStorage para tener persistencia
        if (!this.isFavorite(typeof property === 'object' ? property.id : property)) {
          if (typeof property === 'object') {
            this.favorites.push(property);
          } else {
            this.favorites.push({ id: property });
          }
          this.saveToLocalStorage();
        }
      }
    },
    
    async removeFavorite(propertyId) {
      try {
        const token = localStorage.getItem('access_token');
        
        if (token) {
          // Si está autenticado, eliminar de API
          await axios.delete(`${this.API_URL}/users/favorites/${propertyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        
        // Eliminar de la lista local
        this.favorites = this.favorites.filter(fav => 
          (typeof fav === 'object' ? fav.id !== propertyId : fav !== propertyId)
        );
        
        // Actualizar localStorage
        this.saveToLocalStorage();
        
      } catch (error) {
        console.error('Error removing favorite:', error);
        // Eliminar de todos modos del localStorage
        this.favorites = this.favorites.filter(fav => 
          (typeof fav === 'object' ? fav.id !== propertyId : fav !== propertyId)
        );
        this.saveToLocalStorage();
      }
    },
    
    async clearAllFavorites() {
      try {
        const token = localStorage.getItem('access_token');
        
        if (token) {
          // Si está autenticado, eliminar todos desde API
          await axios.delete(`${this.API_URL}/users/favorites/all`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
        
        // Limpiar lista local
        this.favorites = [];
        
        // Actualizar localStorage
        localStorage.removeItem('propertyFavorites');
        
      } catch (error) {
        console.error('Error clearing favorites:', error);
        // Limpiar de todos modos del localStorage
        this.favorites = [];
        localStorage.removeItem('propertyFavorites');
      }
    },
    
    saveToLocalStorage() {
      // Guardar los IDs de favoritos en localStorage
      try {
        const favoriteIds = this.favorites.map(fav => 
          typeof fav === 'object' ? fav.id : fav
        );
        localStorage.setItem('propertyFavorites', JSON.stringify(favoriteIds));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    },
    
    toggleFavorite(property) {
      const propertyId = typeof property === 'object' ? property.id : property;
      
      if (this.isFavorite(propertyId)) {
        this.removeFavorite(propertyId);
      } else {
        this.addFavorite(property);
      }
    }
  }
});