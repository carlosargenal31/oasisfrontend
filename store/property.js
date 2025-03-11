// store/property.js
import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

// Mock data para pruebas sin API
const mockProperties = [
  // Propiedades en alquiler (for-rent)
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    description: "Beautiful modern apartment in the heart of the city. This spacious unit features high ceilings, large windows, and premium finishes throughout. The open floor plan is perfect for entertaining, with a gourmet kitchen that includes stainless steel appliances and a large island.",
    price: 1500,
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1000,
    property_type: "apartment",
    status: "for-rent",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zip_code: "10001",
    image: "https://plus.unsplash.com/premium_photo-1661883964999-c1bcb57a7357?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-09-01T12:00:00Z",
    amenities: ["Air Conditioning", "Washer/Dryer", "Dishwasher", "Balcony", "Elevator", "WiFi"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Añadido soporte para mascotas
    lat: 40.712776,
    lng: -74.005974
  },
  {
    id: 2,
    title: "Luxury Condo with City Views",
    description: "Stunning luxury condo with panoramic city views. This exceptional residence features floor-to-ceiling windows, hardwood floors, and high-end finishes throughout.",
    price: 2800,
    bedrooms: 3,
    bathrooms: 3.5,
    square_feet: 2500,
    property_type: "daily-rental",
    status: "for-rent",
    address: "789 Ocean Drive",
    city: "Miami",
    state: "FL",
    zip_code: "33139",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 2,
    createdAt: "2023-07-25T12:00:00Z",
    amenities: ["Air Conditioning", "Pool", "WiFi", "Washer/Dryer", "Dishwasher", "Security Cameras"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 25.782551,
    lng: -80.132790
  },
  
  // Propiedades en venta (for-sale)
  {
    id: 3,
    title: "Charming Townhouse with Backyard",
    description: "Charming townhouse with a private backyard located in a quiet residential neighborhood. This lovely home features a traditional layout with stylish updates throughout.",
    price: 550000,
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1800,
    property_type: "house",
    status: "for-sale",
    address: "789 Elm St",
    city: "Brooklyn",
    state: "NY",
    zip_code: "11201",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-07-20T12:00:00Z",
    amenities: ["Fireplace", "Garden", "Basement", "Hardwood Floors"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 40.697835,
    lng: -73.979746
  },
  {
    id: 5,
    title: "Luxury Beachfront Villa",
    description: "Exquisite beachfront villa offering the ultimate luxury lifestyle. This exceptional residence features expansive living spaces with high ceilings, premium finishes, and floor-to-ceiling windows that showcase stunning ocean views.",
    price: 2500000,
    bedrooms: 5,
    bathrooms: 5.5,
    square_feet: 4200,
    property_type: "house",
    status: "for-sale",
    address: "1 Ocean Drive",
    city: "Miami",
    state: "FL",
    zip_code: "33139",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 3,
    createdAt: "2023-08-01T12:00:00Z",
    amenities: ["Air Conditioning", "Pool", "Balcony", "Waterfront", "Security System", "Dishwasher"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 25.781364,
    lng: -80.130545
  },
  {
    id: 15,
    title: "Modern Condominium with Terrace",
    description: "Elegant condominium with high-end finishes, open floor plan, and private terrace. The gourmet kitchen, large walk-in closet, and luxury bathroom make this property truly special. The building offers gym, pool, and 24-hour concierge.",
    price: 750000,
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1200,
    property_type: "apartment",
    status: "for-sale",
    address: "350 West End Ave",
    city: "New York",
    state: "NY",
    zip_code: "10023",
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-08-15T12:00:00Z",
    amenities: ["Terrace", "Gym", "Pool", "24-hour Concierge", "Underground Parking", "Dishwasher"],
    pets_allowed: ["cats-allowed"], // Solo gatos permitidos
    lat: 40.785091,
    lng: -73.981979
  },
  {
    id: 17,
    title: "Luxury Penthouse with Panoramic Views",
    description: "Spectacular penthouse with panoramic city views. Open and bright spaces, gourmet kitchen, and luxury finishes throughout. Includes two private terraces and direct elevator access.",
    price: 3200000,
    bedrooms: 3,
    bathrooms: 3.5,
    square_feet: 2800,
    property_type: "apartment",
    status: "for-sale",
    address: "1000 Skyline Drive",
    city: "Miami",
    state: "FL",
    zip_code: "33131",
    image: "https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 2,
    createdAt: "2023-09-20T12:00:00Z",
    amenities: ["Ocean Views", "Private Elevator", "Concierge Service", "Infinity Pool", "24-hour Security", "Air Conditioning"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 25.778655,
    lng: -80.185933
  },
  // Nuevas propiedades de venta
  {
    id: 9,
    title: "New Construction Townhouse",
    description: "Brand new townhouse in up-and-coming neighborhood. Modern design with premium finishes, energy-efficient appliances, and smart home features.",
    price: 680000,
    bedrooms: 3,
    bathrooms: 2.5,
    square_feet: 1750,
    property_type: "new-building",
    status: "for-sale",
    address: "789 New Development Rd",
    city: "Chicago",
    state: "IL",
    zip_code: "60607",
    image: "https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-09-18T12:00:00Z",
    amenities: ["Air Conditioning", "Washer/Dryer", "Dishwasher", "Smart Home Technology"],
    pets_allowed: ["cats-allowed"], // Solo gatos permitidos
    lat: 41.876438,
    lng: -87.648935
  },
  {
    id: 11,
    title: "Commercial Building Downtown",
    description: "Multi-story commercial building in prime downtown location. Ideal for office space, retail, or mixed-use development.",
    price: 1950000,
    bedrooms: 0,
    bathrooms: 4,
    square_feet: 5000,
    property_type: "commercial",
    status: "for-sale",
    address: "456 Commercial Ave",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90017",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 10,
    createdAt: "2023-07-05T12:00:00Z",
    amenities: ["Elevator", "Security Cameras", "Central Location"],
    pets_allowed: [], // No mascotas permitidas
    lat: 34.041873,
    lng: -118.259168
  },
  {
    id: 13,
    title: "Vacant Land for Development",
    description: "Prime vacant land parcel in developing area, zoned for residential or mixed-use. All utilities available at property line.",
    price: 350000,
    bedrooms: 0,
    bathrooms: 0,
    square_feet: 15000,
    property_type: "land",
    status: "for-sale",
    address: "123 Development Ave",
    city: "Miami",
    state: "FL",
    zip_code: "33130",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 0,
    createdAt: "2023-08-10T12:00:00Z",
    amenities: [],
    pets_allowed: [], // No aplica para terrenos
    lat: 25.775457,
    lng: -80.195530
  },
  {
    id: 19,
    title: "Historic Home with Character",
    description: "Beautifully maintained historic home with original architectural details and modern updates. Features wood floors, crown molding, and landscaped garden.",
    price: 875000,
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2800,
    property_type: "house",
    status: "for-sale",
    address: "789 Heritage Lane",
    city: "San Francisco",
    state: "CA",
    zip_code: "94117",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-08-05T12:00:00Z",
    amenities: ["Fireplace", "Hardwood Floors", "Garden", "Washer/Dryer"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 37.770459,
    lng: -122.443542
  },
    
  {
    id: 4,
    title: "Modern Studio in Tech Hub",
    description: "Stylish modern studio apartment located in the city's tech hub. This sleek unit features an efficient layout with high-quality finishes.",
    price: 1100,
    bedrooms: 0,
    bathrooms: 1,
    square_feet: 500,
    property_type: "apartment",
    status: "for-rent",
    address: "321 Tech Blvd",
    city: "San Francisco",
    state: "CA",
    zip_code: "94107",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: false,
    isVerified: false,
    parkingSpaces: 0,
    createdAt: "2023-09-10T12:00:00Z",
    amenities: ["Air Conditioning", "Dishwasher", "Gym", "Rooftop", "WiFi"],
    pets_allowed: [], // No mascotas permitidas
    lat: 37.789960,
    lng: -122.401169
  },
  {
    id: 6,
    title: "Renovated Historic Loft",
    description: "Beautifully renovated loft in a historic building. This unique space combines original architectural details with modern updates.",
    price: 3200,
    bedrooms: 2,
    bathrooms: 2,
    square_feet: 1600,
    property_type: "apartment",
    status: "for-rent",
    address: "567 Arts District",
    city: "Chicago",
    state: "IL",
    zip_code: "60607",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-07-15T12:00:00Z",
    amenities: ["Air Conditioning", "Washer/Dryer", "Dishwasher", "Hardwood Floors", "Elevator", "Security Cameras"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 41.878113,
    lng: -87.629799
  },
  // Nuevas propiedades de alquiler
  {
    id: 8,
    title: "Cozy Studio near Downtown",
    description: "Cozy studio apartment within walking distance to downtown shops and restaurants. Features updated appliances and modern finishes.",
    price: 950,
    bedrooms: 0,
    bathrooms: 1,
    square_feet: 450,
    property_type: "apartment",
    status: "for-rent",
    address: "789 Center St",
    city: "Chicago",
    state: "IL",
    zip_code: "60601",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 0,
    createdAt: "2023-09-15T12:00:00Z",
    amenities: ["Air Conditioning", "Dishwasher", "Laundry"],
    pets_allowed: ["cats-allowed"], // Solo gatos permitidos
    lat: 41.882514,
    lng: -87.627760
  },
  {
    id: 10,
    title: "Furnished Room in Shared House",
    description: "Private furnished room in a shared house with access to kitchen, living room, and backyard. Utilities and WiFi included.",
    price: 800,
    bedrooms: 1,
    bathrooms: 1.5,
    square_feet: 200,
    property_type: "room",
    status: "for-rent",
    address: "123 Community Lane",
    city: "San Francisco",
    state: "CA",
    zip_code: "94110",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 0,
    createdAt: "2023-08-05T12:00:00Z",
    amenities: ["WiFi", "Washer/Dryer", "Dishwasher", "Backyard"],
    pets_allowed: ["cats-allowed"], // Solo gatos permitidos
    lat: 37.758850,
    lng: -122.414311
  },
  {
    id: 12,
    title: "Modern House with Garden",
    description: "Beautiful modern house with a well-maintained garden and patio. Features open floor plan, updated kitchen, and spacious bedrooms.",
    price: 3800,
    bedrooms: 4,
    bathrooms: 3,
    square_feet: 2200,
    property_type: "house",
    status: "for-rent",
    address: "456 Elm Street",
    city: "Los Angeles",
    state: "CA",
    zip_code: "90210",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: true,
    isVerified: true,
    parkingSpaces: 2,
    createdAt: "2023-07-10T12:00:00Z",
    amenities: ["Air Conditioning", "Washer/Dryer", "Dishwasher", "Garage", "Garden", "Pool"],
    pets_allowed: ["cats-allowed", "dogs-allowed"], // Gatos y perros permitidos
    lat: 34.052235,
    lng: -118.243683
  },
  {
    id: 14,
    title: "Downtown Office Space",
    description: "Professional office space in downtown business district. Includes conference room access, high-speed internet, and reception area.",
    price: 2500,
    bedrooms: 0,
    bathrooms: 1,
    square_feet: 800,
    property_type: "office",
    status: "for-rent",
    address: "789 Business Ave",
    city: "New York",
    state: "NY",
    zip_code: "10007",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 2,
    createdAt: "2023-09-05T12:00:00Z",
    amenities: ["Air Conditioning", "WiFi", "Security Cameras", "Elevator"],
    pets_allowed: [], // No mascotas permitidas
    lat: 40.713051,
    lng: -74.007233
  },
  {
    id: 16,
    title: "Retail Space in Mall",
    description: "Prime retail space in high-traffic shopping mall. Great visibility and foot traffic. Ready for immediate occupancy.",
    price: 4500,
    bedrooms: 0,
    bathrooms: 1,
    square_feet: 1200,
    property_type: "commercial",
    status: "for-rent",
    address: "123 Mall Drive",
    city: "Miami",
    state: "FL",
    zip_code: "33139",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: false,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 0,
    createdAt: "2023-08-20T12:00:00Z",
    amenities: ["Air Conditioning", "Security Cameras"],
    pets_allowed: [], // No mascotas permitidas
    lat: 25.790176,
    lng: -80.130264
  },
  {
    id: 18,
    title: "Parking Space Downtown",
    description: "Secure parking space in downtown garage. 24/7 access with security monitoring.",
    price: 300,
    bedrooms: 0,
    bathrooms: 0,
    square_feet: 200,
    property_type: "parking-lot",
    status: "for-rent",
    address: "456 Downtown Garage",
    city: "Chicago",
    state: "IL",
    zip_code: "60601",
    image: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isNew: true,
    isFeatured: false,
    isVerified: true,
    parkingSpaces: 1,
    createdAt: "2023-09-12T12:00:00Z",
    amenities: ["Security Cameras"],
    pets_allowed: [], // No mascotas permitidas
    lat: 41.883603,
    lng: -87.631748
  },
];

export const usePropertyStore = defineStore('property', {
  state: () => ({
    properties: [...mockProperties], // Inicializar con datos mock
    currentProperty: null,
    loading: false,
    error: null,
    totalProperties: mockProperties.length,
    filters: {
      property_type: null,
      minPrice: null,
      maxPrice: null,
      minBedrooms: null,
      minBathrooms: null,
      city: null,
      status: null, // 'for-rent' o 'for-sale'
      minArea: null,
      maxArea: null,
      amenities: null,
      pets: null
    },
    favorites: [], // Array de IDs de propiedades favoritas
    useMockData: true // Toggle entre datos mock y llamadas a API
  }),
  
  getters: {
    getFeaturedProperties: (state) => {
      return state.properties.filter(property => property.isFeatured);
    },
    getRecentProperties: (state) => {
      return [...state.properties]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
    },
    getPropertyById: (state) => (id) => {
      // Convertir id a número si viene como string
      const numericId = parseInt(id);
      return state.properties.find(property => property.id === numericId);
    },
    getFavoriteProperties: (state) => {
      return state.properties.filter(property => state.favorites.includes(property.id));
    },
    getRentalProperties: (state) => {
      return state.properties.filter(property => property.status === 'for-rent');
    },
    getSaleProperties: (state) => {
      return state.properties.filter(property => property.status === 'for-sale');
    }
  },
  
  actions: {
    async fetchProperties(params = {}) {
      this.loading = true;
      this.error = null;
      
      try {
        if (this.useMockData) {
          // Simular delay de API
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Filtrar datos mock basados en filtros
          let filteredProperties = [...mockProperties];
          
          // Aplicar filtros
          if (this.filters.status) {
            filteredProperties = filteredProperties.filter(p => 
              p.status === this.filters.status
            );
          }
          
          if (this.filters.property_type) {
            // Si es un array, filtrar por cualquiera de los tipos
            if (Array.isArray(this.filters.property_type)) {
              filteredProperties = filteredProperties.filter(p => 
                this.filters.property_type.includes(p.property_type)
              );
            } else {
              filteredProperties = filteredProperties.filter(p => 
                p.property_type === this.filters.property_type
              );
            }
          }
          
          if (this.filters.minPrice) {
            filteredProperties = filteredProperties.filter(p => 
              p.price >= this.filters.minPrice
            );
          }
          
          if (this.filters.maxPrice) {
            filteredProperties = filteredProperties.filter(p => 
              p.price <= this.filters.maxPrice
            );
          }
          
          if (this.filters.minBedrooms) {
            filteredProperties = filteredProperties.filter(p => 
              p.bedrooms >= this.filters.minBedrooms
            );
          }
          
          if (this.filters.minBathrooms) {
            filteredProperties = filteredProperties.filter(p => 
              p.bathrooms >= this.filters.minBathrooms
            );
          }
          
          if (this.filters.city) {
            filteredProperties = filteredProperties.filter(p => 
              p.city.toLowerCase().includes(this.filters.city.toLowerCase())
            );
          }
          
          if (this.filters.minArea) {
            filteredProperties = filteredProperties.filter(p => 
              p.square_feet >= this.filters.minArea
            );
          }
          
          if (this.filters.maxArea) {
            filteredProperties = filteredProperties.filter(p => 
              p.square_feet <= this.filters.maxArea
            );
          }
          
          // Filtros de amenidades
          if (this.filters.amenities && this.filters.amenities.length > 0) {
            filteredProperties = filteredProperties.filter(p => {
              if (!p.amenities) return false;
              
              // Comprobar si la propiedad tiene todas las amenidades solicitadas
              return this.filters.amenities.every(amenity => {
                // Transformar los valores para hacer una comparación insensible a mayúsculas/minúsculas
                const amenityLower = amenity.toLowerCase();
                return p.amenities.some(a => a.toLowerCase().includes(amenityLower));
              });
            });
          }
          
          // Filtros de mascotas permitidas
          if (this.filters.pets && this.filters.pets.length > 0) {
            filteredProperties = filteredProperties.filter(p => {
              // Para este ejemplo, suponemos que las propiedades pet-friendly se marcan 
              // con una propiedad "pets_allowed" que es un array o con amenities específicas
              if (!p.pets_allowed && !p.amenities) return false;
              
              if (p.pets_allowed) {
                return this.filters.pets.every(pet => p.pets_allowed.includes(pet));
              }
              
              // Si no hay pets_allowed explícito, verificamos amenities para palabras clave
              if (p.amenities) {
                return this.filters.pets.every(pet => {
                  if (pet === 'cats-allowed') {
                    return p.amenities.some(a => a.toLowerCase().includes('cat') || a.toLowerCase().includes('pet'));
                  }
                  if (pet === 'dogs-allowed') {
                    return p.amenities.some(a => a.toLowerCase().includes('dog') || a.toLowerCase().includes('pet'));
                  }
                  return false;
                });
              }
              
              return false;
            });
          }
          
          // Filtros adicionales como Verified/Featured
          if (this.filters.verified) {
            filteredProperties = filteredProperties.filter(p => p.isVerified);
          }
          
          if (this.filters.featured) {
            filteredProperties = filteredProperties.filter(p => p.isFeatured);
          }
          
          this.properties = filteredProperties;
          this.totalProperties = filteredProperties.length;
        } else {
          // Usar API real
          const { $axios } = useNuxtApp();
          const response = await $axios.get('/properties', { 
            params: {
              ...this.filters,
              ...params
            }
          });
          
          // Logging para debugging
          console.log('API Response:', response.data);
          
          if (response.data) {
            this.properties = response.data.properties || response.data || [];
            this.totalProperties = response.data.total || this.properties.length || 0;
          } else {
            this.properties = [];
            this.totalProperties = 0;
          }
        }
      } catch (error) {
        console.error('Error in fetchProperties:', error);
        this.error = 'Failed to load properties. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    async fetchProperty(id) {
      this.loading = true;
      this.error = null;
      
      try {
        if (this.useMockData) {
          // Simular delay de API
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Convertir id a número si viene como string
          const numericId = parseInt(id);
          
          // Buscar propiedad en datos mock
          const property = mockProperties.find(p => p.id === numericId);
          
          if (property) {
            this.currentProperty = property;
            console.log("Propiedad encontrada en datos mock:", property);
          } else {
            this.error = 'Property not found';
            console.error("No se encontró propiedad con ID:", numericId);
          }
        } else {
          // Usar API real
          const { $axios } = useNuxtApp();
          const response = await $axios.get(`/properties/${id}`);
          
          if (response.data) {
            this.currentProperty = response.data;
          } else {
            this.error = 'Property not found';
          }
        }
      } catch (error) {
        console.error(`Error in fetchProperty(${id}):`, error);
        this.error = 'Failed to load property details. Please try again.';
      } finally {
        this.loading = false;
      }
    },
    
    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    },
    
    clearFilters() {
      this.filters = {
        property_type: null,
        minPrice: null,
        maxPrice: null,
        minBedrooms: null,
        minBathrooms: null,
        city: null,
        status: null,
        minArea: null,
        maxArea: null,
        amenities: null,
        pets: null,
        verified: null,
        featured: null
      };
    },
    
    toggleFavorite(propertyId) {
      // Convertir a número si es necesario
      const numericId = parseInt(propertyId);
      
      const index = this.favorites.indexOf(numericId);
      if (index === -1) {
        // Agregar a favoritos
        this.favorites.push(numericId);
      } else {
        // Quitar de favoritos
        this.favorites.splice(index, 1);
      }
      
      // Si estás usando la API, aquí irían las llamadas a la API
      if (!this.useMockData) {
        try {
          const { $axios } = useNuxtApp();
          if (index === -1) {
            // Llamada API para agregar a favoritos
            // $axios.post('/favorites', { propertyId: numericId });
          } else {
            // Llamada API para quitar de favoritos
            // $axios.delete(`/favorites/${numericId}`);
          }
        } catch (error) {
          console.error('Error toggling favorite:',error);
        }
      }
    },
    
    // Método para cambiar entre datos mock y API
    setUseMockData(value) {
      this.useMockData = value;
    },
    
    // Método para crear una nueva propiedad
    async createProperty(propertyData) {
      this.loading = true;
      this.error = null;
      
      try {
        if (this.useMockData) {
          // Simular delay de API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Generar un nuevo ID
          const newId = mockProperties.length > 0 
            ? Math.max(...mockProperties.map(p => p.id)) + 1 
            : 1;
          
          // Crear un nuevo objeto de propiedad
          const newProperty = {
            ...propertyData,
            id: newId,
            createdAt: new Date().toISOString(),
            isNew: true
          };
          
          // Añadir a array de propiedades mock
          mockProperties.push(newProperty);
          
          return newProperty;
        } else {
          // Usar API real
          const { $axios } = useNuxtApp();
          const response = await $axios.post('/properties', propertyData);
          return response.data;
        }
      } catch (error) {
        console.error('Error creating property:', error);
        this.error = 'Failed to create property. Please try again.';
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});