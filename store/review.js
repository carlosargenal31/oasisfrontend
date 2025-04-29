// src/store/review.js
import { defineStore } from 'pinia';
import axios from 'axios';

// Definir la URL base de la API
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviews: [],
    loading: false,
    error: null
  }),

  getters: {
    getReviewsForProperty: (state) => (propertyId) => {
      return state.reviews.filter(review => review.property_id === parseInt(propertyId));
    },
    
    getAverageRating: (state) => (propertyId) => {
      const propertyReviews = state.reviews.filter(review => review.property_id === parseInt(propertyId));
      if (propertyReviews.length === 0) return 0;
      
      const sum = propertyReviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / propertyReviews.length;
    }
  },

  actions: {
    async fetchReviews(propertyId) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`${API_URL}/reviews`, {
          params: { property_id: propertyId }
        });
        
        if (response.data && response.data.status === 'success') {
          const reviews = response.data.data.reviews || [];
          
          // Guardar las reseñas en el store (reemplazando las existentes para esa propiedad)
          this.reviews = [
            ...this.reviews.filter(r => r.property_id !== parseInt(propertyId)),
            ...reviews
          ];
          
          return reviews;
        }
        
        return [];
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar reseñas';
        console.error('Error al cargar reseñas:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async addReview(reviewData) {
      this.loading = true;
      this.error = null;
      
      try {
        // Asegurarse de que property_id sea un número
        if (reviewData.property_id) {
          reviewData.property_id = parseInt(reviewData.property_id);
        }
        
        const response = await axios.post(`${API_URL}/reviews`, reviewData);
        
        if (response.data && response.data.status === 'success') {
          // Recargar las reseñas para obtener la nueva reseña del servidor
          await this.fetchReviews(reviewData.property_id);
          return response.data.data;
        } else {
          throw new Error(response.data?.message || 'Error al crear la reseña');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al agregar reseña';
        console.error('Error al agregar reseña:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateReview(reviewId, reviewData, token = null) {
      this.loading = true;
      this.error = null;
      
      try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        const response = await axios.put(
          `${API_URL}/reviews/${reviewId}`,
          reviewData,
          config
        );
        
        if (response.data && response.data.status === 'success') {
          // Actualizar la reseña en la tienda si existe
          const index = this.reviews.findIndex(r => r.id === reviewId);
          
          if (index !== -1) {
            // Determinar la property_id para recargar todas las reseñas
            const propertyId = this.reviews[index].property_id;
            
            // Recargar todas las reseñas para esta propiedad
            if (propertyId) {
              await this.fetchReviews(propertyId);
            }
          }
          
          return true;
        } else {
          throw new Error(response.data?.message || 'Error al actualizar la reseña');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al actualizar reseña';
        console.error('Error al actualizar reseña:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteReview(reviewId, token = null) {
      this.loading = true;
      this.error = null;
      
      try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
        // Primero, buscar la reseña en la tienda para obtener su property_id
        const review = this.reviews.find(r => r.id === reviewId);
        const propertyId = review?.property_id;
        
        const response = await axios.delete(
          `${API_URL}/reviews/${reviewId}`,
          config
        );
        
        if (response.data && response.data.status === 'success') {
          // Si tenemos la property_id, recargar todas las reseñas para esa propiedad
          if (propertyId) {
            await this.fetchReviews(propertyId);
          } else {
            // Si no tenemos property_id, simplemente eliminar la reseña del store
            this.reviews = this.reviews.filter(r => r.id !== reviewId);
          }
          
          return true;
        } else {
          throw new Error(response.data?.message || 'Error al eliminar la reseña');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al eliminar reseña';
        console.error('Error al eliminar reseña:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    // Añadir funciones para likes y dislikes
    async likeReview(reviewId) {
      try {
        // Buscar la reseña en el store para actualizar localmente primero
        const index = this.reviews.findIndex(r => r.id === reviewId);
        
        if (index !== -1) {
          // Actualizar localmente
          this.reviews[index].likes = (this.reviews[index].likes || 0) + 1;
          
          // En un sistema real, aquí harías una llamada a la API para guardar el like
          // Por ejemplo:
          // await axios.post(`${API_URL}/reviews/${reviewId}/like`);
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error al dar like a la reseña:', error);
        return false;
      }
    },
    
    async dislikeReview(reviewId) {
      try {
        // Buscar la reseña en el store para actualizar localmente primero
        const index = this.reviews.findIndex(r => r.id === reviewId);
        
        if (index !== -1) {
          // Actualizar localmente
          this.reviews[index].dislikes = (this.reviews[index].dislikes || 0) + 1;
          
          // En un sistema real, aquí harías una llamada a la API para guardar el dislike
          // Por ejemplo:
          // await axios.post(`${API_URL}/reviews/${reviewId}/dislike`);
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error al dar dislike a la reseña:', error);
        return false;
      }
    }
  }
});