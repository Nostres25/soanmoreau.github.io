<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-300 flex flex-col md:flex-row">
    
    <nav class="fixed bottom-0 w-full md:relative md:w-64 md:min-h-screen bg-white dark:bg-gray-800 shadow-lg md:shadow-none border-t md:border-t-0 md:border-r border-gray-200 dark:border-gray-700 z-[110] flex md:flex-col justify-between">
      
      <div class="hidden md:block p-6">
        <NuxtLink to="/">
          <h1 class="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            Prénom <span class="text-emerald-500 dark:text-emerald-400">NOM</span>
          </h1>
        </NuxtLink>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Portfolio BUT</p>
      </div>

      <ul class="flex md:flex-col w-full md:w-auto justify-around md:justify-start md:px-4 md:gap-2 p-2 md:p-0 flex-1">
        <li v-for="link in links" :key="link.path">
          <NuxtLink 
            :to="link.path" 
            class="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group"
            active-class="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium"
            :class="[ $route.path === link.path ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-700/50' ]"
          >
            <span class="w-5 h-5 rounded-full border-2 border-current group-hover:scale-110 transition-transform"></span>
            <span class="hidden md:inline">{{ link.name }}</span>
          </NuxtLink>
        </li>
      </ul>

      <div class="hidden md:flex p-6 mt-auto">
        <button 
          @click="toggleColorMode" 
          class="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
          <span v-if="$colorMode.value === 'dark'">Passer au mode clair</span>
          <span v-else>Passer au mode sombre</span>
        </button>
      </div>
    </nav>

    <main class="flex-1 p-6 md:p-12 mb-16 md:mb-0 overflow-y-auto">
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
  { name: 'Parcours', path: '/parcours' },
  { name: 'Compétences', path: '/competences' },
  { name: 'SAÉ', path: '/sae' },
  { name: 'Stage', path: '/stage' }
]

</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>