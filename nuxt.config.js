// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    devServer: {
        port: 3001
      },
    // Meta tags
    app: {
      head: {
        title: 'OASIS - Real Estate Platform',
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { 
            hid: 'description', 
            name: 'description', 
            content: 'Find your dream property with OASIS - Your Real Estate Oasis' 
          }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' }
        ]
      }
    },
  
    // Global CSS
    css: [
      '@/assets/css/main.css',
    ],
  
    // Modules
    modules: [
      '@nuxtjs/tailwindcss',
      '@pinia/nuxt',
      '@nuxtjs/color-mode',
      'nuxt-icon',
      '@nuxtjs/i18n',
    ],
  
     // i18n configuration
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.js' },
      { code: 'es', iso: 'es-ES', name: 'Español', file: 'es.js' },
      { code: 'fr', iso: 'fr-FR', name: 'Français', file: 'fr.js' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch', file: 'de.js' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    lazy: true,
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },
    // Tailwind CSS configuration
    tailwindcss: {
      cssPath: '~/assets/css/main.css',
      configPath: 'tailwind.config.js',
      exposeConfig: false,
      injectPosition: 0,
      viewer: true,
    },
  
    // PostCSS configuration (included in Tailwind module)
    postcss: {
      // Adding this to avoid warning
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  
    // Pinia state management
    pinia: {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore'],
      ],
    },
  
    // Color mode configuration
    colorMode: {
      preference: 'system',
      fallback: 'light',
      hid: 'nuxt-color-mode-script',
      globalName: '__NUXT_COLOR_MODE__',
      componentName: 'ColorScheme',
      classPrefix: '',
      classSuffix: '',
      storageKey: 'nuxt-color-mode'
    },
  
    // Auto-import components
    components: {
      dirs: [
        '~/components',
        '~/components/common',
        '~/components/layout',
        '~/components/auth',
        '~/components/property',
        '~/components/booking',
        '~/components/payment',
        '~/components/review',
        '~/components/user',
        '~/components/message',
      ]
    },
  
    // Environment variables
    runtimeConfig: {
      public: {
        apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'
      }
    },
  
    // Build configuration
    build: {
      transpile: ['axios']
    },
   // Puedes añadir esto para ignorar las advertencias relacionadas con el SSR
   vite: {
    optimizeDeps: {
      exclude: ['fsevents']
    }
  },
    // Server options
    nitro: {
      preset: 'node-server'
    },
  
    compatibilityDate: '2025-02-28'
  })