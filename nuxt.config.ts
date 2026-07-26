import tailwindcss from "@tailwindcss/vite"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-06-21',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      title: 'Soan MOREAU - Portfolio - Informatique',
      charset: 'UTF-8',     
    },
  },

  debug: true,
  imports : {
      dirs: [
        'composables',
        'composables/**',
      ],
  },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  vite: {
    plugins: [tailwindcss()],
    assetsInclude: [
      "~/content/**/*.md"
    ],
  },

  colorMode: {
    classSuffix: '', // Important pour la compatibilité avec Tailwind 'dark:'
    preference: 'system',
    fallback: 'light'
  },
  css: ['~/assets/css/main.css'], //This is important 
  ui: {
    prefix: 'Nuxt',
  }
})