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

  routeRules: { 
    '/': { prerender: true },
    '/portfolio': {
      redirect: "/"
    }
  },

  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/']
    }
  },
  ssr: true,

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      title: 'Soan MOREAU - Portfolio - Informatique',
      charset: 'UTF-8',     
      meta : [
        { name: 'robots', content: "noindex" }

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

  // icon: {
  //   customCollections: [
  //       {
  //         prefix: 'custom-icons',
  //         dir: 'images/icons',
  //         recursive: true,
  //       },
  //     ],
  // },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@vercel/analytics',
    '@vercel/speed-insights'
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