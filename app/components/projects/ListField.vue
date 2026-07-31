<script lang="ts">
import { PROJECTS } from '@/composables/objects'
import type { Project, ProjectId, ProjectIntegration } from '@/composables/objects';

export default {
  props: {
    projects: {
      type: Array<Project | ProjectIntegration>,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  methods: { }
}
</script>
<script setup lang="ts">
const { openModal } = useModalManager();
</script>
<template>
    <div v-if="projects.length > 0">
        <h3 class="font-bold text-gray-900 dark:text-white mb-3">Projets concernés :</h3>
        <div class="mb-4 pb-2">
            <div 
            v-for="projet in projects" 
            :key="projet.id" 
            class="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-colors shadow-sm hover:shadow-md mb-4"
            >
            <div class="flex justify-between items-start mb-4">
                <h4 class="font-bold text-gray-900 dark:text-white mb-1">{{ PROJECTS[projet.id as ProjectId].title }}</h4>
                <span class="shrink-0 text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md">
                {{ PROJECTS[projet.id as ProjectId].context }}
                </span>
            </div>
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-2 flex-1 line-clamp-4 text-justify">
                {{ PROJECTS[projet.id as ProjectId].description }}
            </p>
            <button 
                class="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mt-auto group text-left w-max cursor-pointer"
                @click="openModal({ type: 'project', id: projet.id as ProjectId })" 
            >Analyser ce projet<span class="text-emerald-500 group-hover:translate-x-1 transition-transform">&rarr;</span></button>
            </div>
        </div>
    </div>
</template>