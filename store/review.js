// store/review.js
import { defineStore } from 'pinia';

// Mock data para pruebas sin API
const mockReviews = [
  {
    id: 1,
    propertyId: 1,
    name: "Annette Black",
    email: "annette@example.com",
    rating: 5,
    text: "Beautiful apartment in a prime location. The place was spotless when we arrived and everything was exactly as advertised. The host was very responsive and accommodating with our check-in and check-out times. Would definitely recommend!",
    date: "Jan 17, 2023",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    likes: 12,
    dislikes: 0
  },
  {
    id: 2,
    propertyId: 1,
    name: "Darrell Steward",
    email: "darrell@example.com",
    rating: 4,
    text: "Overall a great stay. Location was perfect and the apartment had all the amenities we needed. Only giving 4 stars because the air conditioning wasn't working properly during our stay, but the host was quick to respond and offered alternatives.",
    date: "Dec 5, 2022",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    likes: 8,
    dislikes: 1
  },
  {
    id: 3,
    propertyId: 2,
    name: "Floyd Miles",
    email: "floyd@example.com",
    rating: 5,
    text: "Absolutely stunning condo! The views are even better than in the photos. Everything was clean and modern. The host provided detailed instructions for check-in which made the process seamless. Highly recommend for anyone looking for a luxury stay.",
    date: "Feb 28, 2023",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    likes: 15,
    dislikes: 0
  },
  {
    id: 4,
    propertyId: 3,
    name: "Brooklyn Simmons",
    email: "brooklyn@example.com",
    rating: 4,
    text: "Loved the townhouse! It was spacious, clean, and had a beautiful backyard. Perfect for our family vacation. Only minor issue was that some of the kitchen utensils were missing, but it didn't impact our stay much.",
    date: "Mar 12, 2023",
    avatar: "https://randomuser.me/api/portraits/women/79.jpg",
    likes: 7,
    dislikes: 0
  },
  {
    id: 5,
    propertyId: 3,
    name: "Jerome Bell",
    email: "jerome@example.com",
    rating: 3,
    text: "Nice home but could use some improvements. The location is great and the garden is beautiful, but some of the furniture is showing signs of wear and tear. The host was responsive when we had questions.",
    date: "Apr 5, 2023",
    avatar: "https://randomuser.me/api/portraits/men/26.jpg",
    likes: 3,
    dislikes: 2
  },
  {
    id: 6,
    propertyId: 4,
    name: "Esther Howard",
    email: "esther@example.com",
    rating: 5,
    text: "Perfect studio for my business trip! Clean, modern, and in a great location. The building amenities were an added bonus. Will definitely stay here again on my next trip to San Francisco.",
    date: "May 20, 2023",
    avatar: "https://randomuser.me/api/portraits/women/86.jpg",
    likes: 10,
    dislikes: 0
  },
  {
    id: 7,
    propertyId: 1,
    name: "Ralph Edwards",
    email: "ralph@example.com",
    rating: 4,
    text: "Great apartment with a central location. Everything was as described and the check-in process was smooth. The only reason for 4 stars instead of 5 is that it was a bit noisy at night due to the central location, but ear plugs solved that problem!",
    date: "Jun 15, 2023",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    likes: 5,
    dislikes: 1
  },
  {
    id: 8,
    propertyId: 5,
    name: "Cody Fisher",
    email: "cody@example.com",
    rating: 5,
    text: "Absolutely breathtaking villa! The ocean views were spectacular and the property was immaculate. The host went above and beyond to make our stay special. We're already planning our next visit!",
    date: "Jul 3, 2023",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg",
    likes: 18,
    dislikes: 0
  },
  {
    id: 9,
    propertyId: 5,
    name: "Jenny Wilson",
    email: "jenny@example.com",
    rating: 5,
    text: "A luxurious slice of paradise! This beachfront villa exceeded all our expectations. From the private pool to the gourmet kitchen, everything was perfect. The property manager was also extremely helpful with local recommendations.",
    date: "Jul 10, 2023",
    avatar: "https://randomuser.me/api/portraits/women/39.jpg",
    likes: 14,
    dislikes: 0
  },
  {
    id: 10,
    propertyId: 6,
    name: "Cameron Williamson",
    email: "cameron@example.com",
    rating: 4,
    text: "Beautiful historic loft with a great blend of original features and modern amenities. The Arts District location is perfect for exploring Chicago. Only thing keeping it from 5 stars is that the heating system was a bit tricky to figure out.",
    date: "Aug 22, 2023",
    avatar: "https://randomuser.me/api/portraits/men/62.jpg",
    likes: 9,
    dislikes: 1
  },
  // Agregar reseñas para propiedades en venta
  {
    id: 11,
    propertyId: 15,
    name: "Courtney Henry",
    email: "courtney@example.com",
    rating: 5,
    text: "This condominium is even more beautiful in person! The high-end finishes, open layout, and private terrace make it feel like a luxury hotel. The building amenities are fantastic as well. The agent was very knowledgeable and helped us understand all the features of the property.",
    date: "Sep 5, 2023",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    likes: 11,
    dislikes: 0
  },
  {
    id: 12,
    propertyId: 15,
    name: "Leslie Alexander",
    email: "leslie@example.com",
    rating: 4,
    text: "Charming modern condo with lots of style! The location is perfect and the kitchen is a dream. The agent was very responsive and provided all the information we needed.",
    date: "Sep 12, 2023",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    likes: 7,
    dislikes: 1
  },
  {
    id: 13,
    propertyId: 17,
    name: "Guy Hawkins",
    email: "guy@example.com",
    rating: 5,
    text: "Absolutely stunning penthouse with breathtaking views! Every detail has been thoughtfully designed. The private terraces and direct elevator access make this truly special. The real estate agent was professional and made the viewing experience exceptional.",
    date: "Sep 28, 2023",
    avatar: "https://randomuser.me/api/portraits/men/43.jpg",
    likes: 16,
    dislikes: 0
  },
  {
    id: 14,
    propertyId: 3,
    name: "Eleanor Pena",
    email: "eleanor@example.com",
    rating: 5,
    text: "This townhouse is a true masterpiece! The renovation was done with incredible attention to detail, preserving original elements while adding modern conveniences. The listing agent was knowledgeable about the home's history and architectural details. A truly special property!",
    date: "Oct 10, 2023",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    likes: 13,
    dislikes: 0
  },
  {
    id: 15,
    propertyId: 5,
    name: "Devon Lane",
    email: "devon@example.com",
    rating: 5,
    text: "What an incredible beach villa! The blend of contemporary design with the natural surroundings is perfect. The floor-to-ceiling windows create a seamless indoor/outdoor experience. The agent was very helpful in explaining the unique features of this property.",
    date: "Oct 17, 2023",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
    likes: 10,
    dislikes: 0
  }
];

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviews: [...mockReviews],
    loading: false,
    error: null
  }),
  
  getters: {
    // Obtener todas las reseñas
    getAllReviews: (state) => state.reviews,
    
    // Obtener reseñas para una propiedad específica
    getReviewsForProperty: (state) => (propertyId) => {
      return state.reviews.filter(review => review.propertyId === propertyId);
    },
    
    // Obtener rating promedio para una propiedad
    getAverageRatingForProperty: (state) => (propertyId) => {
      const propertyReviews = state.reviews.filter(review => review.propertyId === propertyId);
      
      if (propertyReviews.length === 0) return 0;
      
      const sum = propertyReviews.reduce((acc, review) => acc + review.rating, 0);
      return sum / propertyReviews.length;
    }
  },
  
  actions: {
    // Agregar una nueva reseña
    addReview(review) {
      // Generar un nuevo ID para la reseña
      const newId = this.reviews.length > 0 
        ? Math.max(...this.reviews.map(r => r.id)) + 1 
        : 1;
      
      // Crear objeto de reseña con ID
      const newReview = {
        ...review,
        id: newId
      };
      
      // Agregar a las reseñas
      this.reviews.push(newReview);
      
      return newReview;
    },
    
    // Actualizar una reseña existente
    updateReview(reviewId, updatedData) {
      const index = this.reviews.findIndex(review => review.id === reviewId);
      
      if (index !== -1) {
        this.reviews[index] = { ...this.reviews[index], ...updatedData };
        return true;
      }
      
      return false;
    },
    
    // Eliminar una reseña
    deleteReview(reviewId) {
      const index = this.reviews.findIndex(review => review.id === reviewId);
      
      if (index !== -1) {
        this.reviews.splice(index, 1);
        return true;
      }
      
      return false;
    },
    
    // Añadir un like a una reseña
    addLike(reviewId) {
      const index = this.reviews.findIndex(review => review.id === reviewId);
      
      if (index !== -1) {
        this.reviews[index].likes += 1;
        return true;
      }
      
      return false;
    },
    
    // Añadir un dislike a una reseña
    addDislike(reviewId) {
      const index = this.reviews.findIndex(review => review.id === reviewId);
      
      if (index !== -1) {
        this.reviews[index].dislikes += 1;
        return true;
      }
      
      return false;
    }
  }
});