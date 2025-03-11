
// @ts-nocheck


export const localeCodes =  [
  "en",
  "es",
  "fr",
  "de"
]

export const localeLoaders = {
  "en": [{ key: "../i18n/locales/en.js", load: () => import("../i18n/locales/en.js" /* webpackChunkName: "locale_C_58_C_58_Users_carlo_OneDrive_Escritorio_OASIS_client_i18n_locales_en_js" */), cache: true }],
  "es": [{ key: "../i18n/locales/es.js", load: () => import("../i18n/locales/es.js" /* webpackChunkName: "locale_C_58_C_58_Users_carlo_OneDrive_Escritorio_OASIS_client_i18n_locales_es_js" */), cache: true }],
  "fr": [{ key: "../i18n/locales/fr.js", load: () => import("../i18n/locales/fr.js" /* webpackChunkName: "locale_C_58_C_58_Users_carlo_OneDrive_Escritorio_OASIS_client_i18n_locales_fr_js" */), cache: true }],
  "de": [{ key: "../i18n/locales/de.js", load: () => import("../i18n/locales/de.js" /* webpackChunkName: "locale_C_58_C_58_Users_carlo_OneDrive_Escritorio_OASIS_client_i18n_locales_de_js" */), cache: true }]
}

export const vueI18nConfigs = [
  
]

export const nuxtI18nOptions = {
  "restructureDir": "i18n",
  "experimental": {
    "localeDetector": "",
    "switchLocalePathLinkSSR": false,
    "autoImportTranslationFunctions": false,
    "typedPages": true,
    "typedOptionsAndMessages": false
  },
  "bundle": {
    "compositionOnly": true,
    "runtimeOnly": false,
    "fullInstall": true,
    "dropMessageCompiler": false
  },
  "compilation": {
    "jit": true,
    "strictMessage": true,
    "escapeHtml": false
  },
  "customBlocks": {
    "defaultSFCLang": "json",
    "globalSFCScope": false
  },
  "vueI18n": "",
  "locales": [
    {
      "code": "en",
      "iso": "en-US",
      "name": "English",
      "files": [
        "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/en.js"
      ]
    },
    {
      "code": "es",
      "iso": "es-ES",
      "name": "Español",
      "files": [
        "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/es.js"
      ]
    },
    {
      "code": "fr",
      "iso": "fr-FR",
      "name": "Français",
      "files": [
        "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/fr.js"
      ]
    },
    {
      "code": "de",
      "iso": "de-DE",
      "name": "Deutsch",
      "files": [
        "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/de.js"
      ]
    }
  ],
  "defaultLocale": "en",
  "defaultDirection": "ltr",
  "routesNameSeparator": "___",
  "trailingSlash": false,
  "defaultLocaleRouteNameSuffix": "default",
  "strategy": "no_prefix",
  "lazy": true,
  "langDir": "locales/",
  "detectBrowserLanguage": {
    "alwaysRedirect": false,
    "cookieCrossOrigin": false,
    "cookieDomain": null,
    "cookieKey": "i18n_redirected",
    "cookieSecure": false,
    "fallbackLocale": "",
    "redirectOn": "root",
    "useCookie": true
  },
  "differentDomains": false,
  "baseUrl": "",
  "customRoutes": "page",
  "pages": {},
  "skipSettingLocaleOnNavigate": false,
  "types": "composition",
  "debug": false,
  "parallelPlugin": false,
  "multiDomainLocales": false,
  "i18nModules": []
}

export const normalizedLocales = [
  {
    "code": "en",
    "iso": "en-US",
    "name": "English",
    "files": [
      {
        "path": "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/en.js"
      }
    ]
  },
  {
    "code": "es",
    "iso": "es-ES",
    "name": "Español",
    "files": [
      {
        "path": "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/es.js"
      }
    ]
  },
  {
    "code": "fr",
    "iso": "fr-FR",
    "name": "Français",
    "files": [
      {
        "path": "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/fr.js"
      }
    ]
  },
  {
    "code": "de",
    "iso": "de-DE",
    "name": "Deutsch",
    "files": [
      {
        "path": "C:/Users/carlo/OneDrive/Escritorio/OASIS/client/i18n/locales/de.js"
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false

export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
