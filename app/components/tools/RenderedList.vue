<script lang="ts">
import { TOOLS, CONCEPTS  } from '@/composables/objects'
import type {ConceptId} from '@/composables/objects';
export default {
  props: {
    tools: {
      type: Object,
      default: () => {}
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
    <div v-for="t in tools" :key="t.id" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col">
      <div class="flex items-center justify-between mb-2">
        <button
          class="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer" 
          @click="openModal({ type: 'tool', id: t.id as any })"
        >
            <NuxtIcon :name="TOOLS[t.id]?.realIcon || `devicon:${TOOLS[t.id]?.id}`" class="w-6 h-6 flex items-center justify-center rounded"/>
          {{ TOOLS[t.id]?.name }}
        </button>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 text-justify mb-3 flex-1">{{ t.description }}</p>
      <div v-if="t.conceptIds?.length" class="flex flex-wrap gap-1.5 mt-auto">
        <span v-for="cid in t.conceptIds" :key="cid" :title="CONCEPTS[cid as ConceptId]?.description" class="text-[10px] px-1.5 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded font-semibold uppercase tracking-wide">
          {{ CONCEPTS[cid as ConceptId].name }}
        </span>
      </div>
    </div>
</template>