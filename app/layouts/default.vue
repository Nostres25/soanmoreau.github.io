<script setup lang="ts">
import { SEARCH_GROUPS } from '@/composables/objects'

const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Parcours', path: '/#parcours' },
  { name: 'Compétences', path: '/#competences' },
  { name: 'Projets', path: '/#projets' },
  // { name: 'Stage', path: '/parcours#stage' }
]

function onSelect() {
  nextTick(() => {
    // To unfocus the search bar when an item is selected
    (document.activeElement as HTMLElement)?.blur()
  })
}

// make to click on an item when the input is focused 
function preventInputBlur(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('[role="option"]')) {
    e.preventDefault()
  }
}

// TODO Peut-être pas utile en async car directement visible pour la command platette. Et le footer doit faire partie de la structure de base
const LazyGlobalFooter = defineAsyncComponent(() => import('@/components/GlobalFooter.vue'))
const NuxtCommandPalette = defineAsyncComponent(() => import('@nuxt/ui/components/CommandPalette.vue'))

const LazyGlobalModal = defineAsyncComponent(() => import('@/components/GlobalModal.vue'))
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col xl:flex-row">
    <header class="xl:hidden fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-120 px-6 py-4 flex items-center justify-between shadow-sm">
      <NuxtLink to="/">
        <h1 class="text-xl font-extrabold tracking-tight">
          Soan <span class="text-emerald-500">MOREAU</span>
        </h1>
      </NuxtLink>

      <ClientOnly>
        <button class="text-gray-500 hover:text-emerald-500 transition-colors p-1" @click="toggleColorMode">
          <svg v-if="$colorMode.value === 'dark'" key="dark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg v-else key="light" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <template #fallback>
          <div class="w-7 h-7"/>
        </template>
      </ClientOnly>
    </header>

    <nav class="fixed bottom-0 w-full xl:sticky xl:top-0 xl:w-64 xl:h-screen bg-white dark:bg-gray-800 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] xl:shadow-none border-t xl:border-t-0 xl:border-r border-gray-200 dark:border-gray-700 z-130 flex xl:flex-col justify-between overflow-y-auto hide-scrollbar">
      
      <div class="hidden xl:block p-6">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Soan <span class="text-emerald-500 dark:text-emerald-400">MOREAU</span>
          </h1>
        </NuxtLink>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Portfolio informatique</p>
      </div>

      <ul class="flex xl:flex-col w-full xl:w-auto justify-around xl:justify-start xl:px-4 xl:gap-2 p-2 xl:p-0 flex-1">
        <li v-for="link in links" :key="link.path" class="flex-1 xl:flex-none">
          <NuxtLink 
            :to="link.path" 
            class="flex flex-col xl:flex-row items-center justify-center xl:justify-start gap-1 xl:gap-3 px-2 xl:px-4 py-3 xl:py-3 rounded-xl transition-all duration-200 group h-full"
            active-class="text-emerald-600 dark:text-emerald-400 xl:bg-emerald-50 xl:dark:bg-emerald-900/30 font-medium"
            :class="[ $route.path === link.path ? '' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50' ]"
          >
            <span class="w-6 h-4 rounded-lg flex items-center justify-center font-bold text-[10px] xl:text-xs group-hover:scale-110 transition-transform bg-gray-100 xl:bg-transparent dark:bg-gray-700 xl:dark:bg-transparent opacity-80" :class="$route.path === link.path ? 'bg-emerald-100 dark:bg-emerald-900/50' : ''">
              {{ link.name.charAt(0) }}
            </span> 
            <span class="text-[10px] xl:text-base">{{ link.name }}</span>
          </NuxtLink>
        </li>
        <div
          class="rounded-md opacity-95 dark:opacity-100 backdrop-blur-2xl transition-all z-140 bg bg-gray-200/80 dark:bg-gray-600/40 overflow-scroll fixed top-1.5 right-15 left-45 has-[input:focus]:top-20 has-[input:focus]:left-2 has-[input:focus]:right-2 lg:left-50 lg:right-50 lg:has-[input:focus]:left-60 lg:has-[input:focus]:right-60 lg:has-[input:focus]:top-20 2xl:mb-10 2xl:left-0 2xl:right-0 2xl:relative 2xl:top-10 2xl:w-auto 2xl:has-[input:focus]:fixed"
          @mousedown="preventInputBlur"
         >
          <NuxtCommandPalette
          class="rounded-lg h-12 has-[input:focus]:h-auto has-[input:focus]:max-h-80 2xl:max-h-80 2xl:h-auto"
          shortcut="meta_k"
          :groups="SEARCH_GROUPS"
          :fuse="{ 
            resultLimit: 1000,
            matchAllWhenSearchEmpty: true, 
            fuseOptions: { 
              includeMatches: true,
              ignoreLocation: true,
              keys: ['label', 'description', 'suffix', 'concepts', 'type', 'academic-skills', 'tools']
            }
          }"
          placeholder="Chercher compétences, outils, notions, expériences, projets etc..." 
          :highlight-on-hover="true"
          selection-behavior="replace"
          :autofocus="false"
          @update:model-value="onSelect"
          />
        </div>
      </ul>

      <div class="hidden xl:flex p-6 mt-auto">
        <ClientOnly>
          <button 
            class="flex items-center justify-center xl:justify-start gap-2 text-sm text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
            @click="toggleColorMode" 
          >
            <span v-if="$colorMode.value === 'dark'" key="dark">Passer au mode clair</span>
            <span v-else key="light">Passer au mode sombre</span>
          </button>
          <template #fallback>
            <div class="h-9 w-full"/>
          </template>
        </ClientOnly>
      </div>
    </nav>

    <div>
      <main class="flex-1 p-6 xl:p-12 pt-24 xl:pt-12 mb-20 xl:mb-0 overflow-y-auto">
        <NuxtPage />
      </main>
      <LazyGlobalFooter hydrate-on-idle :links="links" />
      <LazyGlobalModal hydrate-on-idle />
    </div>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active { transition: all 0.3s ease; }
.page-enter-from,
.page-leave-to { opacity: 0; transform: translateY(10px); }
</style>