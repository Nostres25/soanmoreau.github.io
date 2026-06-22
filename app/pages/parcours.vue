<template>
  <div class="relative max-w-4xl mx-auto min-h-screen pt-8 pb-12 animate-fade-in space-y-16">
    
    <header>
      <h1 class="text-4xl font-extrabold tracking-tight mb-2">Mon <span class="text-emerald-500">Parcours</span></h1>
      <p class="text-gray-500 dark:text-gray-400">Découvrez la logique de mon orientation et le détail de ma formation.</p>
    </header>

    <hr class="border-gray-200 dark:border-gray-800/60">

    <section>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Logique du parcours
      </h2>
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 text-justify leading-relaxed">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas scelerisque vehicula felis id dictum. Curabitur vel leo id urna rutrum aliquam. Phasellus quis fermentum mauris. Fusce vehicula, ipsum at congue tempus, ligula arcu aliquam enim, ac fringilla est neque id libero. Ut ac eros eu sem bibendum varius a vel dolor. Suspendisse eleifend viverra mauris ac pharetra.
        </p>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Secteur professionnel
      </h2>
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 text-justify leading-relaxed space-y-4">
        <h3 class="font-bold text-lg text-gray-900 dark:text-white">Pourquoi l'informatique ?</h3>
        <p>
          Nullam elementum elit ac tortor feugiat, sit amet efficitur elit convallis. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
        </p>
      </div>
    </section>

    <section id="formation" class="scroll-mt-28">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Formation : BUT Informatique
      </h2>
      <div class="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 text-justify leading-relaxed">
        <p class="text-gray-700 dark:text-gray-300 font-medium mb-4">{{ butInfoData?.description }}</p>
        <p class="text-gray-600 dark:text-gray-400">{{ butInfoData?.longDescription }}</p>
      </div>
    </section>

    <section id="sae" class="scroll-mt-28">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Projet d'études (SAÉ)
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-8 text-justify">
        Les projets d'études sont aussi appelés SAÉ (Situations d'apprentissage évaluées).
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article 
          v-for="projet in saeProjects" 
          :key="projet.id" 
          class="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-colors shadow-sm hover:shadow-md"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="font-bold text-xl text-gray-900 dark:text-white pr-4">{{ projet.title }}</h3>
            <span class="shrink-0 text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md">
              {{ projet.context }}
            </span>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-4 text-justify">
            {{ projet.description }}
          </p>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <span 
              v-for="tid in projet.toolIds" 
              :key="tid" 
              class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded"
            >
              {{ TOOLS[tid as keyof typeof TOOLS].name }}
            </span>
          </div>
          
          <button 
            @click="openModal({ type: 'project', id: projet.id as any })" 
            class="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mt-auto group text-left w-max"
          >
            Analyser cette SAÉ
            <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </article>
      </div>
    </section>

    <section id="stage" class="scroll-mt-28">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Expérience professionnelle : Stage de deuxième année
      </h2>
      <div class="bg-blue-50/50 dark:bg-blue-900/10 p-6 sm:p-8 rounded-2xl border border-blue-100 dark:border-blue-800/30 text-justify leading-relaxed">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-xl text-blue-900 dark:text-blue-100">{{ stageData?.entity }}</h3>
          <span class="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">{{ stageData?.date }}</span>
        </div>
        <p class="text-blue-800 dark:text-blue-200 font-medium mb-4">{{ stageData?.description }}</p>
        <p class="text-gray-600 dark:text-gray-400">{{ stageData?.longDescription }}</p>
        
        <div class="mt-6">
          <button 
            @click="openModal({ type: 'experience', id: 'stage-mf' })" 
            class="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all"
          >
            Ouvrir la fiche de ce stage &rarr;
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TOOLS, PROJECTS, EDUCATIONS, EXPERIENCES, useModalManager } from '~/composables/usePortfolio'

const { openModal } = useModalManager()

// Récupération des données du BUT
const butInfoData = computed(() => EDUCATIONS['but-info'])

// Récupération des données du Stage
const stageData = computed(() => EXPERIENCES['stage-mf'])

// Filtre pour ne récupérer que les SAÉ
const saeProjects = computed(() => {
  return Object.values(PROJECTS).filter(projet => projet.context === 'SAÉ BUT')
})
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
</style>