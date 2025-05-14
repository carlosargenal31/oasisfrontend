// src/store/comment.js
import { defineStore } from 'pinia';
import axios from 'axios';

// Definir la URL base de la API
const API_URL = process.env.API_URL || 'http://localhost:3000/api';

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: [],
    loading: false,
    error: null
  }),

  getters: {
    getCommentsForBlog: (state) => (blogId) => {
      return state.comments.filter(comment => comment.blog_id === parseInt(blogId));
    },
    
    getCommentCount: (state) => (blogId) => {
      return state.comments.filter(comment => comment.blog_id === parseInt(blogId)).length;
    }
  },

  actions: {
    async fetchComments(blogId) {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await axios.get(`${API_URL}/comments`, {
          params: { blog_id: blogId }
        });
        
        if (response.data && response.data.success) {
          const comments = response.data.data || [];
          
          // Guardar los comentarios en el store (reemplazando los existentes para ese blog)
          this.comments = [
            ...this.comments.filter(c => c.blog_id !== parseInt(blogId)),
            ...comments
          ];
          
          return comments;
        }
        
        return [];
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al cargar comentarios';
        console.error('Error al cargar comentarios:', error);
        return [];
      } finally {
        this.loading = false;
      }
    },

    async addComment(commentData) {
      this.loading = true;
      this.error = null;
      
      try {
        // Asegurarse de que blog_id sea un número
        if (commentData.blog_id) {
          commentData.blog_id = parseInt(commentData.blog_id);
        }
        
        const response = await axios.post(`${API_URL}/comments`, commentData);
        
        if (response.data && response.data.success) {
          // Recargar los comentarios para obtener el nuevo comentario del servidor
          await this.fetchComments(commentData.blog_id);
          return response.data.data;
        } else {
          throw new Error(response.data?.message || 'Error al crear el comentario');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al agregar comentario';
        console.error('Error al agregar comentario:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteComment(commentId, blogId) {
      this.loading = true;
      this.error = null;
      
      try {
        // Incluir token de autenticación si está disponible
        const token = localStorage.getItem('token');
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        
         const response = await axios.delete(
          `${API_URL}/comments/${commentId}`,
          config
        );
        
        if (response.data && response.data.success) {
          // Si la API responde con éxito, actualizar el estado local
          this.comments = this.comments.filter(c => c.id !== commentId);
          return true;
        } else {
          throw new Error(response.data?.message || 'Error al eliminar el comentario');
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al eliminar comentario';
        console.error('Error al eliminar comentario:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
    
    async likeComment(commentId) {
      try {
        // Buscar el comentario en el store para actualizar localmente primero
        const commentIndex = this.comments.findIndex(c => c.id === commentId);
        
        if (commentIndex !== -1) {
          // Guardar valor anterior por si falla la API
          const previousLikes = this.comments[commentIndex].likes || 0;
          
          // Actualizar localmente
          this.comments[commentIndex].likes = previousLikes + 1;
          
          // Llamar a la API para guardar el like
          const response = await axios.post(`${API_URL}/comments/${commentId}/like`);
          
          if (!response.data || !response.data.success) {
            // Revertir cambio local si la API falla
            this.comments[commentIndex].likes = previousLikes;
            throw new Error('Error al registrar el like');
          }
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error al dar like al comentario:', error);
        return false;
      }
    },
    
    async dislikeComment(commentId) {
      try {
        // Buscar el comentario en el store para actualizar localmente primero
        const commentIndex = this.comments.findIndex(c => c.id === commentId);
        
        if (commentIndex !== -1) {
          // Guardar valor anterior por si falla la API
          const previousDislikes = this.comments[commentIndex].dislikes || 0;
          
          // Actualizar localmente
          this.comments[commentIndex].dislikes = previousDislikes + 1;
          
          // Llamar a la API para guardar el dislike
          const response = await axios.post(`${API_URL}/comments/${commentId}/dislike`);
          
          if (!response.data || !response.data.success) {
            // Revertir cambio local si la API falla
            this.comments[commentIndex].dislikes = previousDislikes;
            throw new Error('Error al registrar el dislike');
          }
          
          return true;
        }
        
        return false;
      } catch (error) {
        console.error('Error al dar dislike al comentario:', error);
        return false;
      }
    },
    
    async fetchCommentCount(blogId) {
      try {
        const response = await axios.get(`${API_URL}/comments/blog/${blogId}/count`);
        
        if (response.data && response.data.success) {
          return response.data.data.commentCount || 0;
        }
        
        return 0;
      } catch (error) {
        console.error(`Error al obtener cantidad de comentarios para blog ${blogId}:`, error);
        return 0;
      }
    }
  }
});