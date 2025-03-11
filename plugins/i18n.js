// i18n.js (in plugins directory)
import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: {
        // Common
        welcome: 'Welcome',
        signIn: 'Sign in',
        signOut: 'Sign out',
        addProperty: 'Add property',
        personalInfo: 'Personal Info',
        passwordAndSecurity: 'Password & Security',
        myProperties: 'My Properties',
        wishlist: 'Wishlist',
        reviews: 'Reviews',
        notifications: 'Notifications',
        help: 'Help',
        currency: 'Currency',
        language: 'Language',
        
        // Navigation
        home: 'Home',
        properties: 'Properties',
        aboutUs: 'About Us',
        contact: 'Contact',
        blog: 'Blog',
        
        // Property related
        buy: 'Buy',
        sell: 'Sell',
        rent: 'Rent',
        price: 'Price',
        search: 'Search',
        location: 'Location',
        
        // Footer
        allRightsReserved: 'All rights reserved',
        privacyPolicy: 'Privacy Policy',
        termsOfService: 'Terms of Service',
        cookiePolicy: 'Cookie Policy'
      },
      es: {
        // Common
        welcome: 'Bienvenido',
        signIn: 'Iniciar sesión',
        signOut: 'Cerrar sesión',
        addProperty: 'Añadir propiedad',
        personalInfo: 'Información personal',
        passwordAndSecurity: 'Contraseña y seguridad',
        myProperties: 'Mis propiedades',
        wishlist: 'Lista de favoritos',
        reviews: 'Reseñas',
        notifications: 'Notificaciones',
        help: 'Ayuda',
        currency: 'Moneda',
        language: 'Idioma',
        
        // Navigation
        home: 'Inicio',
        properties: 'Propiedades',
        aboutUs: 'Sobre nosotros',
        contact: 'Contacto',
        blog: 'Blog',
        
        // Property related
        buy: 'Comprar',
        sell: 'Vender',
        rent: 'Alquilar',
        price: 'Precio',
        search: 'Buscar',
        location: 'Ubicación',
        
        // Footer
        allRightsReserved: 'Todos los derechos reservados',
        privacyPolicy: 'Política de privacidad',
        termsOfService: 'Términos de servicio',
        cookiePolicy: 'Política de cookies'
      },
      fr: {
        // Common
        welcome: 'Bienvenue',
        signIn: 'Se connecter',
        signOut: 'Se déconnecter',
        addProperty: 'Ajouter une propriété',
        personalInfo: 'Informations personnelles',
        passwordAndSecurity: 'Mot de passe et sécurité',
        myProperties: 'Mes propriétés',
        wishlist: 'Liste de souhaits',
        reviews: 'Avis',
        notifications: 'Notifications',
        help: 'Aide',
        currency: 'Devise',
        language: 'Langue',
        
        // Navigation
        home: 'Accueil',
        properties: 'Propriétés',
        aboutUs: 'À propos',
        contact: 'Contact',
        blog: 'Blog',
        
        // Property related
        buy: 'Acheter',
        sell: 'Vendre',
        rent: 'Louer',
        price: 'Prix',
        search: 'Rechercher',
        location: 'Emplacement',
        
        // Footer
        allRightsReserved: 'Tous droits réservés',
        privacyPolicy: 'Politique de confidentialité',
        termsOfService: 'Conditions d\'utilisation',
        cookiePolicy: 'Politique des cookies'
      },
      de: {
        // Common
        welcome: 'Willkommen',
        signIn: 'Anmelden',
        signOut: 'Abmelden',
        addProperty: 'Immobilie hinzufügen',
        personalInfo: 'Persönliche Informationen',
        passwordAndSecurity: 'Passwort und Sicherheit',
        myProperties: 'Meine Immobilien',
        wishlist: 'Merkzettel',
        reviews: 'Bewertungen',
        notifications: 'Benachrichtigungen',
        help: 'Hilfe',
        currency: 'Währung',
        language: 'Sprache',
        
        // Navigation
        home: 'Startseite',
        properties: 'Immobilien',
        aboutUs: 'Über uns',
        contact: 'Kontakt',
        blog: 'Blog',
        
        // Property related
        buy: 'Kaufen',
        sell: 'Verkaufen',
        rent: 'Mieten',
        price: 'Preis',
        search: 'Suchen',
        location: 'Standort',
        
        // Footer
        allRightsReserved: 'Alle Rechte vorbehalten',
        privacyPolicy: 'Datenschutzrichtlinie',
        termsOfService: 'Nutzungsbedingungen',
        cookiePolicy: 'Cookie-Richtlinie'
      }
    }
  });

  vueApp.use(i18n);
});