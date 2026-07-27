<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { TOOLS, CONCEPTS, PROJECTS, COMPETENCES, EXPERIENCES, EDUCATIONS } from '~/composables/objects'
import type { ProjectId, ExperienceId, EducationId, ToolId, Project, Education, Experience } from '~/composables/objects';
import { useModalManager, getEntitiesForConcept, getProjectForTool, renderMarkdown } from '~/composables/usePortfolio'

const { isOpen, currentModal, hasHistory, closeAll, goBack, openModal } = useModalManager()

const toolData = computed(() => currentModal.value?.type === 'tool' ? TOOLS[currentModal.value.id as ToolId] : null);

const modalContent = ref<HTMLElement | null>(null)

const currentEntity = computed(() => {
  if (!currentModal.value) return null
  if (currentModal.value.type === 'project') return PROJECTS[currentModal.value.id as ProjectId] as Project
  if (currentModal.value.type === 'experience') return EXPERIENCES[currentModal.value.id as ExperienceId] as Experience
  if (currentModal.value.type === 'education') return EDUCATIONS[currentModal.value.id as EducationId] as Education

  return null
})

const isExpanded = ref(false)
const toggleExpand = () => { isExpanded.value = !isExpanded.value }

watch(currentModal, () => {
  modalContent.value?.scrollTo({ top: 0 })
  isExpanded.value = false;
})

const imageIsOpen = ref(false)
const selectedImage = ref<string | null>(null)
function openImage(url: string) {
  selectedImage.value = url
  imageIsOpen.value = true
}

</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="closeAll"></div>

      <div 
        class="relative w-full max-h-[85vh] md:max-h-[90vh] flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out"
        :class="currentModal?.type === 'education' || currentModal?.type === 'project' || currentModal?.type === 'experience' || isExpanded ? 'max-w-4xl' : 'max-w-2xl animate-slide-up'"
      >
        <div class="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 shrink-0">
          <button v-if="hasHistory" @click="goBack" class="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-emerald-600 transition-colors cursor-pointer">
            <span>&larr;</span> Retour
          </button>
          <div v-else></div> 
          <button @click="closeAll" class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 cursor-pointer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        <div ref="modalContent" class="p-6 overflow-y-auto">
          
          <div v-if="currentModal?.type === 'tool' && toolData">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-16 h-16 shrink-0 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 flex items-center justify-center text-2xl font-bold text-emerald-500">
                {{ toolData.icon }}
              </div>
              <div>
                <h1 class="text-2xl font-bold">{{ toolData.name }}</h1>
                
                <ToolsMasteryIndexComponent :toolData="toolData"/>
              </div>
            </div>

            <ProjectsListField :projects="getProjectForTool(toolData.id as ToolId)"/>

            <h2 class="font-bold text-gray-900 dark:text-white mb-3">Notions maîtrisées <NuxtIcon name="i-lucide-circle-help" class="size-4" title="Par souci de temps, les notions sont actuellement définies à la volée en fonction de ce que je considère utile à préciser. Mais à l'avenir elles pourraient être déifnies en fonction des catégories des documentations respectives à chaque outil"/></h2> 
            <div v-if="toolData.conceptIds?.length" class="space-y-4">
              <div v-for="cid in toolData.conceptIds" :key="cid" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                <h3 class="font-bold text-emerald-700 dark:text-emerald-400 mb-1">{{ CONCEPTS[cid].name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 text-justify mb-3">{{ CONCEPTS[cid].description }}</p>
                
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 py-1">Appliqué dans :</span>
                  <button 
                    v-for="entity in getEntitiesForConcept(cid)" :key="entity.id"
                    @click="openModal({ type: entity.type, id: entity.id as any })"
                    class="inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 border border-gray-200 dark:border-gray-600 transition-colors cursor-pointer"
                  >
                    {{ entity.title }} &rarr;
                  </button>
                </div>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500 italic">Aucune notion détaillée pour le moment.</p>
          </div>
          <div v-else-if="currentEntity">
            <div class="mb-6">
              <span v-if="currentEntity.context || currentEntity.date" class="text-xs font-semibold px-2 py-1 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-md mb-2 inline-block">
                {{ currentEntity.context || currentEntity.date }}
              </span>
              <h1 class="text-3xl font-extrabold mb-2">{{ currentEntity.title }}</h1>
              <h3 v-if="currentEntity.entity" class="text-xl text-gray-500 mb-4">{{ currentEntity.entity }}</h3>
              <p class="text-gray-600 dark:text-gray-300 text-justify">{{ currentEntity.description }}</p>
              
              <div v-if="currentEntity.longDescription" class="mt-3">
                <button @click="toggleExpand" class="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors inline-flex items-center gap-1 cursor-pointer">
                  <strong>
                    <span v-if="!isExpanded">En savoir plus &darr;</span>
                    <span v-else>Réduire &uarr;</span>
                  </strong>
                </button>
                
                <div class="grid transition-all duration-500 ease-in-out" :style="{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }">
                  <div class="overflow-hidden">
                    <div 
                      class="mt-0 p-5 pt-2 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-md whitespace-pre-line text-justify markdown-container"
                      v-html="currentEntity.longDescription"
                    ></div>
                  </div>  
                </div>
              </div>
              <div v-if="currentEntity.medias && currentEntity.medias.length > 0">
                <NuxtCarousel
                  v-slot="{ item }"
                  class-names
                  dots
                  arrows
                  :items="currentEntity.medias as string[]"
                  :ui="{
                    item: 'basis-full flex items-center justify-center h-80 transition-opacity [&:not(.is-snapped)]:opacity-10'
                  }"
                  class="mx-auto max-w-sm"
                >
                  <img
                    :src="item"
                    class="max-w-full max-h-full object-contain rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    @click="openImage(item)"
                  >
                </NuxtCarousel>
                <NuxtModal v-model:open="imageIsOpen">
                  <template #content>
                    <img v-if="selectedImage" :src="selectedImage" class="w-full h-auto max-h-[90vh] object-contain rounded-lg">
                  </template>
                </NuxtModal>
              </div>
            </div>

            <div v-if="currentEntity.github || currentEntity.website" class="flex gap-4 mb-8">
              <a v-if="currentEntity.website" :href="currentEntity.website" target="_blank" class="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-500 transition-colors">Voir le site</a>
              <a v-if="currentEntity.github" 
              :href="currentEntity.github" 
              target="_blank" 
              class="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors" 
              :style="currentEntity.github === 'privé' ? 'pointer-events: none;' : ''"
              >GitHub {{currentEntity.github === 'privé' ? 'privé' : ''}}</a>
            </div>

            <div class="mt-8 space-y-6">
              <div v-if="currentEntity.tools?.length">
                <h2 class="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Outils sollicités & notions <NuxtIcon name="i-lucide-circle-help" class="size-4" title="- Cliquez sur l'outil de votre choix pour en savoir plus sur ma maîtrise actuelle.&#010;- Les notions visibles ci-dessous sont celles solicitées par moi-même dans le cadre du projet, de la formation ou de l'expérience." /></h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div v-for="t in currentEntity.tools" :key="t.id" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col">
                    <div class="flex items-center justify-between mb-2">
                      <button @click="openModal({ type: 'tool', id: t.id as any })" class="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer">
                        <span class="w-6 h-6 flex items-center justify-center bg-white dark:bg-gray-700 rounded shadow-sm text-xs">{{ TOOLS[t.id].icon }}</span>
                        {{ TOOLS[t.id].name }}
                      </button>
                    </div>
                    <p class="text-sm text-gray-600 dark:text-gray-400 text-justify mb-3 flex-1">{{ t.description }}</p>
                    <div v-if="t.conceptIds?.length" class="flex flex-wrap gap-1.5 mt-auto">
                      <span v-for="cid in t.conceptIds" :key="cid" :title="CONCEPTS[cid]?.description" class="text-[10px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded font-semibold uppercase tracking-wide">
                        {{ CONCEPTS[cid].name }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="currentEntity.competencies?.length">
                <h2 class="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Compétences académiques appliquées</h2>
                <div class="space-y-3">
                  <div v-for="c in currentEntity.competencies" :key="c.id" class="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-100 dark:border-gray-700/50">
                    <p class="text-gray-600 dark:text-gray-400 text-justify"><span class="font-bold text-lg text-emerald-700 dark:text-emerald-400 min-w-[120px]">{{ COMPETENCES[c.id].title }} : </span> {{ c.description }}</p>
                  </div>
                </div>
              </div>
              <div v-if="currentEntity?.softSkills && currentEntity.softSkills.length > 0" class="mb-6 mt-4">
                <h2 class="font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                  Compétences transversales
                </h2>
                <ul>
                  <li v-for="softSkill in currentEntity?.softSkills" :key="softSkill.id" class="ml-5 list-disc mb-2">
                    <span class="font-bold text-lg text-emerald-700 dark:text-emerald-400 min-w-[120px]">{{SOFT_SKILLS[softSkill.id].name}}</span> <br>
                    {{ softSkill.description }}
                    
                  </li>
                </ul>
              </div>
              <ProjectsListField v-if="currentEntity.id === 'but-info'" :projects="PROJECT_VALUES.filter((project) => project.context.includes('BUT'))"/> 
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
</style> 