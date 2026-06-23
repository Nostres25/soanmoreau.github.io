<template>
  <div class="relative max-w-5xl mx-auto min-h-screen">
    
    <div class="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-400/20 dark:bg-emerald-900/30 blur-[80px] animate-blob"></div>
      <div class="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-300/20 dark:bg-teal-900/20 blur-[100px] animate-blob animation-delay-2000"></div>
    </div>

    <div class="relative z-10 animate-fade-in space-y-16 pb-12 pt-8">
      
      <header class="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div class="w-40 h-40 shrink-0 rounded-full bg-emerald-100 dark:bg-emerald-900 border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden relative">
          <div class="absolute inset-0 flex items-center justify-center text-emerald-500 dark:text-emerald-400 font-bold text-4xl">
            PN
          </div>
        </div>
        
        <div class="text-center md:text-left flex-1">
          <h1 class="text-4xl font-extrabold tracking-tight mb-2">
            Soan <span class="text-emerald-500">MOREAU</span>
          </h1>
          <h2 class="text-xl text-gray-600 dark:text-gray-300 mb-4 font-medium">
            Étudiant en 2e année de BUT Informatique
          </h2>
          
          <div class="inline-block bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-2 rounded-lg font-semibold mb-6 shadow-sm">
            À la recherche d'une alternance — Septembre 2026
          </div>
          
          <p class="text-lg leading-relaxed text-gray-700 dark:text-gray-300" style="text-align: justify;">
            Je suis autodidacte en développement back-end depuis mes 13 ans en développement back-end. J’ai développé en Java pendant 2 ans en toute autonomie puis je me suis ensuite concentré sur un projet NodeJs et Typescript durant 3 ans avant de me focaliser sur mes études. Ma rapidité d’apprentissage me permet de lancer et d’entretenir un projet de programmation quelle que soit la complexité <strong>notamment sans IA</strong>.<br>
            Aujourd’hui, je recherche une alternance pour ma troisième année d’études (2026-2027), dans le développement logiciel.</p>
        </div>
      </header>

      <!-- FRISE CHRONOLOGIQUE À ÉCHELLE -->
      <section class="mt-12 mb-16">
        <div class="flex items-center justify-between mb-8">
          <h2 id="parcours" class="text-2xl font-bold flex items-center gap-2">
            <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Mon Parcours
          </h2>
        </div>

        <div 
          ref="timelineContainer"
          class="relative w-full overflow-x-auto hide-scrollbar select-none"
          :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
          @mousedown="startDrag"
          @mouseleave="stopDrag"
          @mouseup="stopDrag"
          @mousemove="doDrag"
          @dragstart.prevent
        >
          <div class="relative h-[320px]" :style="{ width: (timelineYears * 12 * timelineScale) + 100 + 'px' }">
            
            <div class="absolute top-1/2 left-8 right-8 h-[2px] bg-gray-300 dark:bg-gray-700 flex items-center pointer-events-none">
              <div v-for="year in timelineYears" :key="year" class="relative h-full" :style="{ width: (12 * timelineScale) + 'px' }">
                <div class="absolute left-0 -top-2 w-[2px] h-5 bg-gray-400 dark:bg-gray-500"></div>
                <div class="absolute -left-3 -top-8 text-xs font-bold text-gray-400">{{ timelineStartYear + year - 1 }}</div>
                <div v-for="m in 11" :key="m" class="absolute -top-1.5 w-[2px] h-3 bg-gray-200 dark:bg-gray-700" :style="{ left: (m * timelineScale) + 'px' }"></div>
              </div>
            </div>
            <!-- ÉVÉNEMENTS -->
            <!-- Ajout de pointer-events-none pour que la couche ne bloque pas la souris -->
            <div class="absolute top-0 left-8 w-full h-full pointer-events-none">
              <div v-for="item in timelineItems" :key="item.id" class="absolute top-0 left-0 w-full h-full group">
                
                <!-- CROCHET DE PÉRIODE -->
                <div 
                  class="absolute border-current opacity-60 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  :class="item.type === 'pro' ? 'bottom-1/2 border-t-2 border-l-2 border-r-2 text-blue-500' : 'top-1/2 border-b-2 border-l-2 border-r-2 text-emerald-500'"
                  :style="{ left: item.left + 'px', width: item.width + 'px', height: '6px' }"
                ></div>

                <!-- TIGE PARFAITEMENT DROITE ET CENTRÉE -->
                <div 
                  class="absolute border-l-2 border-current opacity-60 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                  :class="item.type === 'pro' ? 'bottom-1/2 text-blue-500' : 'top-1/2 text-emerald-500'"
                  :style="{
                    left: item.center + 'px',
                    height: item.stemHeight + 'px',
                  }"
                ></div>

                <!-- BLOC TEXTE -->
                <!-- Ajout du @click ici + pointer-events-auto pour rendre SEULEMENT ce bloc cliquable -->
                <div
                  @click="!isDragging && openModal({ type: item.modalType as any, id: item.id as any })"
                  class="absolute pointer-events-auto -translate-x-1/2 w-48 text-center cursor-pointer p-2 rounded-xl bg-transparent hover:bg-white/90 dark:hover:bg-gray-800/90 transition-all shadow-none hover:shadow-md border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                  :class="item.type === 'pro' ? 'bottom-1/2' : 'top-1/2'"
                  :style="{
                     left: item.center + 'px',
                     marginBottom: item.type === 'pro' ? `${item.stemHeight + 4}px` : '0',
                     marginTop: item.type !== 'pro' ? `${item.stemHeight + 4}px` : '0'
                  }"
                >
                  <div class="text-[10px] font-bold tracking-wider uppercase mb-1" :class="item.type === 'pro' ? 'text-blue-500' : 'text-emerald-500'">
                    {{ `${item.startDate} — ${item.endDate}` }}
                  </div>
                  <h3 class="font-bold text-sm text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white leading-tight mb-1">
                    {{ item.title }}
                  </h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1">{{ item.entity }}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
        <div class="mt-6 text-right md:pr-4">
          <NuxtLink to="/parcours" class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 hover:underline transition-all">
            En savoir plus sur le parcours &rarr;
          </NuxtLink>
        </div>
      </section>

      <hr class="border-gray-200 dark:border-gray-800/60">
      <!-- 2. COMPÉTENCES CLÉS -->
      <section id="competences" class="scroll-mt-24">
        <div class="mb-6">
          <h2 class="text-2xl font-bold flex items-center gap-2 mb-3">
            <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Compétences Clés
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400 text-justify">
            Les compétences correspondent à celles définies par le programme national du B.U.T Informatique.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="comp in COMPETENCES" 
            :key="comp.id" 
            class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
          >
            <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-2">{{ comp.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 text-justify min-h-[40px]">{{ comp.description }}</p>
            
            <!-- Utilisation de la fonction dynamique pour les outils -->
            <div class="flex flex-wrap gap-2 mb-4">
              <button 
                v-for="tool in getToolsForCompetence(comp.id)" 
                :key="tool.id" 
                @click="openModal({ type: 'tool', id: tool.id as any })"
                class="px-2 py-1 text-xs font-medium bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors"
              >
                {{ tool.name }}
              </button>
            </div>
            
            <!-- Utilisation de la fonction dynamique pour les projets -->
            <ul class="space-y-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
              <li 
                v-for="projet in getProjectsForCompetence(comp.id)" 
                :key="projet.id" 
                @click="openModal({ type: 'project', id: projet.id as any })" 
                class="text-sm text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer transition-colors flex items-center gap-2"
              >
                <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                {{ projet.title }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-6 text-right">
          <NuxtLink to="/parcours#formation" class="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 hover:underline transition-all">
            Voir l'évolution des compétences au fil de la formation &rarr;
          </NuxtLink>
        </div>
      </section>

      <!-- 3. PROJETS & SAÉ -->
      <!-- ... -->

      <section>
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold flex items-center gap-2">
            <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            Projets & SAÉ
          </h2>
          
          <div class="hidden md:flex gap-2">
            <button @click="scrollProjects('left')" class="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-emerald-500 hover:border-emerald-500 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button @click="scrollProjects('right')" class="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:text-emerald-500 hover:border-emerald-500 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>
        </div>

        <div class="relative -mx-6 px-6 md:mx-0 md:px-0">
          <div ref="carouselRef" class="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-2 hide-scrollbar">
            <article 
              v-for="projet in Object.values(PROJECTS)" 
              :key="projet.id" 
              class="snap-start shrink-0 w-[85vw] md:w-[400px] flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-colors shadow-sm hover:shadow-md"
            >
              <div class="flex justify-between items-start mb-4">
                <h3 class="font-bold text-xl text-gray-900 dark:text-white pr-4">{{ projet.title }}</h3>
                <span class="shrink-0 text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md">
                  {{ projet.context }}
                </span>
              </div>
              
              <p class="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-4">
                {{ projet.description }}
              </p>
              
              <div class="flex flex-wrap gap-2 mb-6">
                <!-- Remplacement de projet.toolIds par projet.tools.map -->
                <span 
                  v-for="t in projet.tools" 
                  :key="t.id" 
                  class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded"
                >
                  {{ TOOLS[t.id].name }}
                </span>
              </div>
              
              <button 
                @click="openModal({ type: 'project', id: projet.id as any })" 
                class="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors mt-auto group text-left w-max"
              >
                Analyser ce projet 
                <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </button>
            </article>
          </div>
        </div>
      </section>
      
    </div>
    <footer class="mt-24 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800/60 text-sm">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          <div>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-4">Soan MOREAU</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
              Étudiant en BUT Informatique autonome, soucieux du détail et rigoureux.
            </p>
            <div class="flex gap-4">
              <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">in</a>
              <a href="#" class="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors">gh</a>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">Navigation</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li><NuxtLink to="/" class="hover:text-emerald-500 transition-colors">Accueil</NuxtLink></li>
              <li><NuxtLink to="#parcours" class="hover:text-emerald-500 transition-colors">Parcours détaillé</NuxtLink></li>
              <li><NuxtLink to="/competences" class="hover:text-emerald-500 transition-colors">Compétences</NuxtLink></li>
              <li><NuxtLink to="/sae" class="hover:text-emerald-500 transition-colors">Projets & SAÉ</NuxtLink></li>
              <li><NuxtLink to="/stage" class="hover:text-emerald-500 transition-colors">Bilan de Stage</NuxtLink></li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-600 dark:text-gray-400">
              <li class="flex items-center gap-2">
                <span class="text-emerald-500">@</span> soanmoreau5@gmail.com
              </li>
              <li class="flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full"></span> À la recherche d'une alternance
              </li>
              <li class="flex items-center gap-2 mt-2">
                <a href="/cv.pdf" download class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">
                  Télécharger mon CV &rarr;
                </a>
              </li>
            </ul>
          </div>

        </div>
        
        <div class="text-center text-gray-500 dark:text-gray-500 pt-8 border-t border-gray-100 dark:border-gray-800/60">
          &copy; 2026 Soan MOREAU. Portfolio réalisé avec Nuxt 4, Tailwind CSS et Gemini PRO.
        </div>
      </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { COMPETENCES, TOOLS, PROJECTS, TIMELINE_DATA, useModalManager } from '~/composables/usePortfolio'


const { openModal } = useModalManager()

// NOUVEAU : Gestion de l'état "déroulé" pour chaque compétence
const expandedSkills = ref<Record<string, boolean>>({})

const toggleSkill = (id: string) => {
  expandedSkills.value[id] = !expandedSkills.value[id]
}

// Contrôle du carrousel
const carouselRef = ref<HTMLElement | null>(null)
const scrollProjects = (direction: 'left' | 'right') => {
  if (carouselRef.value) {
    const scrollAmount = direction === 'left' ? -424 : 424 
    carouselRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

// --- GESTION DE LA FRISE ---
const timelineContainer = ref<HTMLElement | null>(null)
const timelineScale = 25 
const timelineStartYear = 2018
const timelineYears = 9 // Jusqu'à 2026

const getMonthIndex = (str: string) => {
  const s = str.toLowerCase();
  if(s.startsWith('j')) return s.startsWith('ja') || s.startsWith('jan') ? 0 : (s.startsWith('juil') ? 6 : 5);
  if(s.startsWith('f')) return 1; if(s.startsWith('m')) return s.startsWith('mar') ? 2 : 4;
  if(s.startsWith('a')) return s.startsWith('av') ? 3 : 7; if(s.startsWith('s')) return 8;
  if(s.startsWith('o')) return 9; if(s.startsWith('n')) return 10; if(s.startsWith('d')) return 11;
  return 0;
}

const timelineItems = computed(() => {
  return TIMELINE_DATA.map((item, index) => {
    const parts = item.startDate.split(' ')
    const m = parts.length > 1 ? getMonthIndex(parts[0]) : 0
    const y = parseInt(parts.length > 1 ? parts[1] : parts[0]) || new Date().getFullYear()
    const start = (y - timelineStartYear) * 12 + m
    
    const left = start * timelineScale
    const width = Math.max((item.durationMonths || 1) * timelineScale, 2)
    const center = left + width / 2
    
    // Hauteur fixée pour tous les éléments du haut (pro), et alternée pour le bas
    const stemHeight = item.type === 'pro' ? 60 : 30 + (index % 2) * 35 

    return { ...item, left, width, center, stemHeight }
  })
})

// --- GLISSER-DÉPOSER (Drag to Scroll) ---
const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const startDrag = (e: MouseEvent) => {
  if (!timelineContainer.value) return
  isDragging.value = true
  startX.value = e.pageX - timelineContainer.value.offsetLeft
  scrollLeft.value = timelineContainer.value.scrollLeft
}
const stopDrag = () => { isDragging.value = false }
const doDrag = (e: MouseEvent) => {
  if (!isDragging.value || !timelineContainer.value) return
  e.preventDefault()
  const x = e.pageX - timelineContainer.value.offsetLeft
  const walk = (x - startX.value) * 1.5 // Vitesse de défilement
  timelineContainer.value.scrollLeft = scrollLeft.value - walk
}

// --- SCROLL INITIAL SUR LA DATE D'AUJOURD'HUI ---
onMounted(() => {
  if (timelineContainer.value) {
    const today = new Date()
    const todayMonths = (today.getFullYear() - timelineStartYear) * 12 + today.getMonth()
    const todayPx = todayMonths * timelineScale
    
    // On place "aujourd'hui" environ aux 2/3 de la largeur de l'écran visible (un peu à droite)
    const containerWidth = timelineContainer.value.clientWidth
    timelineContainer.value.scrollLeft = Math.max(0, todayPx - (containerWidth * 0.7))
  }
})
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.hide-scrollbar::-webkit-scrollbar { display: none; }

.animate-blob { animation: blob 15s infinite alternate ease-in-out; transform-origin: center; }
.animation-delay-2000 { animation-delay: 2s; }
@keyframes blob { 0% { transform: translate(0, 0) scale(1); } 33% { transform: translate(5vw, -5vh) scale(1.1); } 66% { transform: translate(-5vw, 5vh) scale(0.9); } 100% { transform: translate(0, 0) scale(1); } }

.expandable-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.expandable-wrapper.is-expanded {
  grid-template-rows: 1fr;
}
.expandable-content { 
  overflow: hidden; 
}
</style>