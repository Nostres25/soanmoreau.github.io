<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeAll"></div>

      <div 
        class="relative w-full max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out"
        :class="isExpanded ? 'max-w-4xl' : 'max-w-2xl animate-slide-up'"
      >
        
        <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 shrink-0">
          <button v-if="hasHistory" @click="goBack" class="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors">
            <span>&larr;</span> Retour
          </button>
          <div v-else></div> 
          <button @click="closeAll" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto">
          
          <div v-if="currentModal?.type === 'tool' && toolData">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 shrink-0 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center text-2xl font-bold text-emerald-500">
                {{ toolData.icon }}
              </div>
              <div>
                <h2 class="text-2xl font-bold">{{ toolData.name }}</h2>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                    {{ MASTERY_LEVELS[toolData.masteryIndex] }} ({{ toolData.masteryIndex + 1 }}/{{ MASTERY_LEVELS.length }})
                  </span>
                  <span class="text-sm text-gray-500">&bull; Pratiqué depuis {{ toolData.duration }}</span>
                </div>
              </div>
            </div>

            <h3 class="font-bold text-gray-900 dark:text-white mb-3">Notions maîtrisées :</h3>
            
            <div v-if="toolData.concepts.length" class="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table class="w-full text-left text-sm">
                <thead class="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th class="p-3 font-semibold text-gray-700 dark:text-gray-300 w-1/3">Notion</th>
                    <th class="p-3 font-semibold text-gray-700 dark:text-gray-300">Projets associés</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-gray-700/50">
                  <tr v-for="(concept, i) in toolData.concepts" :key="i" class="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors">
                    <td class="p-3 font-medium text-gray-800 dark:text-gray-200 align-middle">
                      {{ concept.name }}
                    </td>
                    <td class="p-3 align-middle">
                      <div class="flex flex-wrap gap-2">
                        <button 
                          v-for="pid in concept.projectIds" :key="pid"
                          @click="openModal({ type: PROJECTS[pid] ? 'project' : 'experience', id: pid as any })"
                          class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800/50 transition-colors"
                        >
                          {{ PROJECTS[pid]?.title || EXPERIENCES[pid]?.title }} &rarr;
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p v-else class="text-sm text-gray-500 italic">Aucune notion détaillée pour le moment.</p>
          </div>

          <div v-else-if="currentModal?.type === 'project' && projectData">
            <div class="mb-6">
              <span class="text-xs font-semibold px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md mb-2 inline-block">
                {{ projectData.context }}
              </span>
              <h2 class="text-3xl font-extrabold mb-4">{{ projectData.title }}</h2>
              <p class="text-gray-600 dark:text-gray-300">{{ projectData.description }}</p>
              
              <div v-if="projectData.longDescription" class="mt-3">
                <button @click="toggleExpand" class="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1">
                  <span v-if="!isExpanded">En savoir plus sur ce projet &darr;</span>
                  <span v-else>Réduire &uarr;</span>
                </button>
                
                <div class="grid transition-all duration-500 ease-in-out" :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }">
                  <div class="overflow-hidden">
                    <div class="mt-3 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {{ projectData.longDescription }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex gap-4 mb-8">
              <a v-if="projectData.github" :href="projectData.github" target="_blank" class="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">GitHub</a>
              <a v-if="projectData.website" :href="projectData.website" target="_blank" class="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-500 transition-colors">Voir le site</a>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-if="projectData.toolIds?.length">
                <h3 class="font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Outils sollicités</h3>
                <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="tid in projectData.toolIds" :key="tid" 
                    @click="openModal({ type: 'tool', id: tid })"
                    class="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium"
                  >
                    <span>{{ TOOLS[tid].icon }}</span> {{ TOOLS[tid].name }}
                  </button>
                </div>
              </div>
              
              <div v-if="projectData.compIds?.length">
                <h3 class="font-bold text-gray-900 dark:text-white mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Compétences</h3>
                <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li v-for="cid in projectData.compIds" :key="cid">{{ COMPETENCES[cid].title }}</li>
                </ul>
              </div>
            </div>
          </div>

          <div v-else-if="currentModal?.type === 'experience' && EXPERIENCES[currentModal.id]">
            <div class="mb-6">
              <span class="text-xs font-semibold px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-md mb-2 inline-block">
                {{ EXPERIENCES[currentModal.id].date }}
              </span>
              <h2 class="text-3xl font-extrabold mb-1">{{ EXPERIENCES[currentModal.id].title }}</h2>
              <h3 class="text-xl text-gray-500 mb-4">{{ EXPERIENCES[currentModal.id].entity }}</h3>
              <p class="text-gray-600 dark:text-gray-300">{{ EXPERIENCES[currentModal.id].description }}</p>

              <div v-if="EXPERIENCES[currentModal.id].longDescription" class="mt-3">
                <button @click="toggleExpand" class="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1">
                  <span v-if="!isExpanded">Détails de la mission &darr;</span>
                  <span v-else>Réduire &uarr;</span>
                </button>
                
                <div class="grid transition-all duration-500 ease-in-out" :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }">
                  <div class="overflow-hidden">
                    <div class="mt-3 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {{ EXPERIENCES[currentModal.id].longDescription }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="EXPERIENCES[currentModal.id].toolIds?.length" class="mt-6">
              <h3 class="font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Outils sollicités</h3>
              <div class="flex flex-wrap gap-2">
                <button v-for="tid in EXPERIENCES[currentModal.id].toolIds" :key="tid" @click="openModal({ type: 'tool', id: tid })" class="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                  {{ TOOLS[tid].name }}
                </button>
              </div>
            </div>
          </div>

          <div v-else-if="currentModal?.type === 'education' && EDUCATIONS[currentModal.id]">
            <div class="mb-6">
              <span class="text-xs font-semibold px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md mb-2 inline-block">
                {{ EDUCATIONS[currentModal.id].context }}
              </span>
              <h2 class="text-3xl font-extrabold mb-1">{{ EDUCATIONS[currentModal.id].title }}</h2>
              <h3 class="text-xl text-gray-500 mb-4">{{ EDUCATIONS[currentModal.id].entity }}</h3>
              <p class="text-gray-600 dark:text-gray-300 whitespace-pre-line">{{ EDUCATIONS[currentModal.id].description }}</p>

              <div v-if="EDUCATIONS[currentModal.id].longDescription" class="mt-3">
                <button @click="toggleExpand" class="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1">
                  <span v-if="!isExpanded">En savoir plus sur la formation &darr;</span>
                  <span v-else>Réduire &uarr;</span>
                </button>
                
                <div class="grid transition-all duration-500 ease-in-out" :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }">
                  <div class="overflow-hidden">
                    <div class="mt-3 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                      {{ EDUCATIONS[currentModal.id].longDescription }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div v-if="EDUCATIONS[currentModal.id].toolIds?.length">
                <h3 class="font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Outils appris</h3>
                <div class="flex flex-wrap gap-2">
                  <button v-for="tid in EDUCATIONS[currentModal.id].toolIds" :key="tid" @click="openModal({ type: 'tool', id: tid })" class="px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition-colors text-sm font-medium">
                    {{ TOOLS[tid].name }}
                  </button>
                </div>
              </div>
              <div v-if="EDUCATIONS[currentModal.id].projectIds?.length">
                <h3 class="font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">SAÉ & Projets</h3>
                <ul class="space-y-2">
                  <li v-for="pid in EDUCATIONS[currentModal.id].projectIds" :key="pid" @click="openModal({ type: 'project', id: pid })" class="cursor-pointer text-emerald-600 hover:underline text-sm font-medium">
                    &rarr; {{ PROJECTS[pid].title }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useModalManager, TOOLS, PROJECTS, COMPETENCES, EXPERIENCES, EDUCATIONS } from '~/composables/usePortfolio'

const { isOpen, currentModal, hasHistory, closeAll, goBack, openModal } = useModalManager()

const toolData = computed(() => currentModal.value?.type === 'tool' ? TOOLS[currentModal.value.id as keyof typeof TOOLS] : null)
const projectData = computed(() => currentModal.value?.type === 'project' ? PROJECTS[currentModal.value.id as keyof typeof PROJECTS] : null)

// GESTION DE L'EXPANSION
const isExpanded = ref(false)
const toggleExpand = () => { isExpanded.value = !isExpanded.value }

watch(currentModal, () => {
  isExpanded.value = false
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
</style>