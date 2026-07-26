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
      ]
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
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],

  vite: {
    plugins: [tailwindcss()],
    assetsInclude: [
      "**/*.md",
    ],
    optimizeDeps: {
      include: [
        'common-tags',
      ]
    }
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