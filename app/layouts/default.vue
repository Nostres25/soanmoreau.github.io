<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">

    <header class="md:hidden fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-[120] px-6 py-4 flex items-center justify-between shadow-sm">
      <NuxtLink to="/">
        <h1 class="text-xl font-extrabold tracking-tight">
          Soan <span class="text-emerald-500">MOREAU</span>
        </h1>
      </NuxtLink>

      <ClientOnly>
        <button @click="toggleColorMode" class="text-gray-500 hover:text-emerald-500 transition-colors p-1">
          <svg v-if="$colorMode.value === 'dark'" key="dark" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg v-else key="light" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
        <template #fallback>
          <div class="w-7 h-7"></div>
        </template>
      </ClientOnly>
    </header>

    <nav class="fixed bottom-0 w-full md:sticky md:top-0 md:w-64 md:h-screen bg-white dark:bg-gray-800 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:shadow-none border-t md:border-t-0 md:border-r border-gray-200 dark:border-gray-700 z-[110] flex md:flex-col justify-between overflow-y-auto hide-scrollbar">
      
      <div class="hidden md:block p-6">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Soan <span class="text-emerald-500 dark:text-emerald-400">MOREAU</span>
          </h1>
        </NuxtLink>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Portfolio BUT</p>
      </div>

      <ul class="flex md:flex-col w-full md:w-auto justify-around md:justify-start md:px-4 md:gap-2 p-2 md:p-0 flex-1">
        <li v-for="link in links" :key="link.path" class="flex-1 md:flex-none">
          <NuxtLink 
            :to="link.path" 
            class="flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-3 md:py-3 rounded-xl transition-all duration-200 group h-full"
            active-class="text-emerald-600 dark:text-emerald-400 md:bg-emerald-50 md:dark:bg-emerald-900/30 font-medium"
            :class="[ $route.path === link.path ? '' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700/50' ]"
          >
            <span class="w-6 h-6 rounded-md flex items-center justify-center font-bold text-[10px] md:text-xs group-hover:scale-110 transition-transform bg-gray-100 md:bg-transparent dark:bg-gray-700 md:dark:bg-transparent opacity-80" :class="$route.path === link.path ? 'bg-emerald-100 dark:bg-emerald-900/50' : ''">
              {{ link.name.charAt(0) }}
            </span>
            <span class="text-[10px] md:text-base">{{ link.name }}</span>
          </NuxtLink>
        </li>
      </ul>

      <div class="hidden md:flex p-6 mt-auto">
        <ClientOnly>
          <button 
            @click="toggleColorMode" 
            class="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/50"
          >
            <span v-if="$colorMode.value === 'dark'" key="dark">Passer au mode clair</span>
            <span v-else key="light">Passer au mode sombre</span>
          </button>
          <template #fallback>
            <div class="h-9 w-full"></div>
          </template>
        </ClientOnly>
      </div>
    </nav>

    <main class="flex-1 p-6 md:p-12 pt-24 md:pt-12 mb-20 md:mb-0 overflow-y-auto">
      <NuxtPage />
    </main>
    
    <GlobalModal />
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Compétences', path: '/#competences' },
  { name: 'Projets', path: '/#projets' },
  { name: 'Parcours', path: '/parcours' },
  { name: 'Stage', path: '/parcours#stage' }
]
</script>

<style>
.page-enter-active,
.page-leave-active { transition: all 0.3s ease; }
.page-enter-from,
.page-leave-to { opacity: 0; transform: translateY(10px); }
</style>