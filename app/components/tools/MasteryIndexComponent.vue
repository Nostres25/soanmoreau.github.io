<script setup lang="ts">
const isSmallScreen = ref(false)
let mediaQuery: MediaQueryList | null = null

function updateMatch(e: MediaQueryListEvent | MediaQueryList) {
  isSmallScreen.value = e.matches
}

onMounted(() => {
  mediaQuery = window.matchMedia('(max-width: 1050px)')
  updateMatch(mediaQuery)
  mediaQuery.addEventListener('change', updateMatch)
})

onUnmounted(() => {
  mediaQuery?.removeEventListener('change', updateMatch)
})

const popoverSide = computed(() => isSmallScreen.value ? 'bottom' : 'right')
</script>


<script lang="ts">
export default {
  props: {
    toolData: {
      type: Array,
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

<template>
    <div class="mt-2">
        <span class="text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded inline-block mb-1.5">
            {{ MASTERY_LEVELS[toolData.masteryIndex] }} 
        </span>   
        <NuxtPopover mode="hover" :content="{ side: popoverSide}" class="cursor-pointer">
            <NuxtIcon name="i-lucide-circle-help" class="size-4"/>

            <template #content>
                <div class="p-2 w-screen sm:w-xl md:p-4">
                    <h3 class="text-md font-bold mb-2">Auto évaluation du niveau de maîtrise :</h3>
                    <ul>
                        <li v-for="i in MASTERY_LEVELS.length" :key="i" class="list-decimal ml-5 mb-2">
                            <span class="text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded inline-block mb-1.5">
                                {{ MASTERY_LEVELS[i - 1] }}
                            </span> : <div 
                v-for="index in MASTERY_LEVELS.length" :key="index"
                class="w-4 h-4 rounded-[3px] inline-grid mr-1"
                :class="index <= i ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)] dark:bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'"
            ></div> <p class="text-sm md:text-md">{{ i }}/{{ MASTERY_LEVELS.length }} - {{MASTERY_LEVEL_DESC[i - 1]}}</p>
                        </li>
                    </ul>
                </div>
            </template>
        </NuxtPopover>

        <div class="flex items-center gap-1.5">
            <div class="flex gap-1">
            <div 
                v-for="i in MASTERY_LEVELS.length" :key="i"
                class="w-4 h-4 rounded-[3px] hover:border-2 border-emerald-700"
                :title="`${i}/${MASTERY_LEVELS.length} - ${MASTERY_LEVELS[i - 1]} : ${MASTERY_LEVEL_DESC[i - 1]}`"
                :class="i <= toolData.masteryIndex + 1   ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.4)] dark:bg-emerald-400' : 'bg-gray-200 dark:bg-gray-700'"
            ></div>
            </div>
            <span class="text-xs font-bold text-gray-500 ml-2">{{ toolData.masteryIndex + 1 }}/{{ MASTERY_LEVELS.length }}</span>
        </div>
        <span class="text-sm text-gray-500 mt-1 block">&bull; {{ (toolData.duration !== 'Non pratiqué' ? `Pratiqué depuis ` : '') + toolData.duration }}</span>
    </div>
</template>