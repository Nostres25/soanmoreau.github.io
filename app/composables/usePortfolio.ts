// composables/usePortfolio.ts
import { ref, computed } from 'vue'
import { TOOLS, PROJECTS, EXPERIENCES, EDUCATIONS  } from './objects'
import type { COMPETENCES, Education, Experience, Project } from './objects';

// --- MÉTHODES DYNAMIQUES DE RECHERCHE ---

// Trouver les outils liés à une compétence
export const getToolsForCompetence = (compId: string) => {
  return Object.values(TOOLS).filter(tool => tool.compIds.includes(compId))
}

// Trouver les projets liés à une compétence
export const getProjectsForCompetence = (compId: string) => {
  return Object.values(PROJECTS).filter(p => p.competencies.some(c => c.id === compId))
}



// Trouver TOUTES les entités (Projets, Exp, Formations) qui utilisent une Notion
export const getEntitiesForConcept = (conceptId: string) => {
  const results: { type: 'project' | 'experience' | 'education', id: string, title: string }[] = []
  
  Object.values(PROJECTS).forEach(p => {
    if (p.tools?.some(t => t.conceptIds?.includes(conceptId))) results.push({ type: 'project', id: p.id, title: p.title })
  })
  Object.values(EXPERIENCES).forEach(e => {
    if (e.tools?.some(t => t.conceptIds?.includes(conceptId))) results.push({ type: 'experience', id: e.id, title: e.title })
  })
  Object.values(EDUCATIONS).forEach(e => {
    if (e.tools?.some(t => t.conceptIds?.includes(conceptId))) results.push({ type: 'education', id: e.id, title: e.title })
  })
  
  return results
}

// L'extension du type pour le Modal (mis à jour)
export type ModalPayload = { type: 'tool', id: keyof typeof TOOLS } | { type: 'project', id: keyof typeof PROJECTS } | { type: 'competence', id: keyof typeof COMPETENCES } | { type: 'experience', id: keyof typeof EXPERIENCES } | { type: 'education', id: keyof typeof EDUCATIONS }

const modalStack = ref<ModalPayload[]>([])

export const useModalManager = () => {
  const currentModal = computed(() => modalStack.value[modalStack.value.length - 1] || null)
  const hasHistory = computed(() => modalStack.value.length > 1)
  const isOpen = computed(() => modalStack.value.length > 0)
  const openModal = (payload: ModalPayload) => { modalStack.value.push(payload); document.body.style.overflow = 'hidden' }
  const goBack = () => { modalStack.value.pop(); if (modalStack.value.length === 0) document.body.style.overflow = '' }
  const closeAll = () => { modalStack.value = []; document.body.style.overflow = '' }
  return { currentModal, hasHistory, isOpen, openModal, goBack, closeAll }
}

// À la fin de composables/usePortfolio.ts

// --- OUTIL DE RENDU MARKDOWN LÉGER ---
export const renderMarkdown = (text: string) => {
  if (!text) return ''
  return '<small class="mt-0 pt-0" style="text-align:start">Partie rédigée avec un markdown personnalisé</small></br></br>' + text
    .replace(/^### (.*$)/gim, '<h4 class="text-lg font-bold text-gray-900 dark:text-white">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 dark:text-white">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^-# (.*$)/gim, '<small>$1</small>')
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">$1</a>')


}

export function parseDate(timestamp: number|string): Date {
  // To accept timestamp in seconds
  if ((timestamp+'').length === 10) timestamp = typeof timestamp === 'string' ? parseInt(timestamp+'000') : timestamp * 1000;

  // Parse from timestamp in miliseconds
  return new Date(timestamp);
}

// La date peut être un string ou un number sous la forme de timestamp en milisecondes ou un objet Date
export function getYearsBetween(firstDate: Date|string|number, secondDate: Date|string|number): number {

  if (!(firstDate instanceof Date)) {
    firstDate = parseDate(firstDate);
  }

  if (!(secondDate instanceof Date)) {
    secondDate = parseDate(secondDate);
  }
  return Math.abs(secondDate.getFullYear() - firstDate.getFullYear());
}

export function getYearsFormatted(firstDate: Date|string|number, secondDate: Date|string|number): string {
  const years = getYearsBetween(firstDate, secondDate);
  return typeof years === 'number' && years === 0 ? "moins d'un an" : `${years} ans`;
}