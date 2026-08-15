<script lang="ts">
import { TOOLS, CONCEPTS, isFirstAppear  } from '@/composables/objects'
import type {ConceptId, ToolIntegration} from '@/composables/objects';
export default {
  props: {
    tools: {
      type: Array<ToolIntegration>,
      default: () => {}
    },
    entityId: {
      type: String,
      default: () => null,
    }
  },
  data() {
    return {
    }
  },
  methods: {
    getNewConceptIds(tool: ToolIntegration): ConceptId[] {
      return (tool.conceptIds ?? []).filter((conceptId): conceptId is ConceptId => {
        const concept = CONCEPTS[conceptId as ConceptId];
        return !!concept && concept.entities[0]?.id === this.entityId;
      });
    },

    getDevelopedConceptIds(tool: ToolIntegration): ConceptId[] {
      return (tool.conceptIds ?? []).filter((conceptId): conceptId is ConceptId => {
        const concept = CONCEPTS[conceptId as ConceptId];
        return !!concept && concept.entities[0]?.id !== this.entityId;
      });
    },

    getConceptTooltip(conceptId: ConceptId): string {
      const concept = CONCEPTS[conceptId];
      const isFirst = !!this.entityId && concept?.entities[0]?.id === this.entityId;

      return `${isFirst ? 'Première apparition : ' : ' '} ${concept?.description ?? ''}`;
    }
  }
}

</script>
<script setup lang="ts">
const { openModal } = useModalManager();
</script>
<template>
    <div 
      v-for="t in tools" 
      :key="t.id"
      class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex flex-col"
    >
      <div class="flex items-center justify-between mb-2">
        <button
          class="flex items-center gap-2 font-bold text-gray-900 dark:text-white hover:text-emerald-600 transition-colors cursor-pointer" 
          @click="openModal({ type: 'tool', id: t.id as any })"
        >
            <NuxtIcon :name="TOOLS[t.id]?.realIcon || `devicon:${TOOLS[t.id]?.id}`" class="w-6 h-6 flex items-center justify-center rounded"/>
          {{ TOOLS[t.id]?.name }}
        </button>
        <span 
          v-if="isFirstAppear(t, entityId)" 
          class="bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100 px-1.5 py-0.5 font-semibold tracking-wide text-xs"
        >Première apparition</span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400 text-justify">{{ t.description }}</p>
      <div v-if="t.conceptIds?.length">
        <p v-if="getNewConceptIds(t)?.length" class="text-sm text-gray-600 dark:text-gray-200 text-justify mt-2 mb-1">Nouvelles notions :</p>
        <div class="flex flex-wrap gap-1.5 mt-auto"> 
          <span 
              v-for="cid in getNewConceptIds(t)" :key="cid" :title="getConceptTooltip(cid)"
              class="text-[12px] px-1.5 py-0.5 rounded font-semibold upperc ase tracking-wide bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
            {{ CONCEPTS[cid].name }}
          </span>
          
        </div>
        <p v-if="getDevelopedConceptIds(t)?.length" class="text-sm text-gray-600 dark:text-gray-200 text-justify mt-2 mb-1">Notions développées :</p>
        <div class="flex flex-wrap gap-1.5 mt-auto"> 
          <span 
              v-for="cid in getDevelopedConceptIds(t)" :key="cid" :title="getConceptTooltip(cid)"
              class="text-[12px] px-1.5 py-0.5 rounded font-semibold upperc ase tracking-wide"
              :class="entityId && CONCEPTS[cid].entities[0]?.id === entityId ? 'bg-emerald-300 dark:bg-emerald-700 text-emerald-900 dark:text-emerald-100' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400'"
              >
            {{ CONCEPTS[cid].name }}
          </span>
        </div>
      </div>
    </div>
</template>