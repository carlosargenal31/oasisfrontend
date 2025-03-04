// API plugin to provide API services throughout the app
import api from '@/services/api';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      api
    }
  };
});