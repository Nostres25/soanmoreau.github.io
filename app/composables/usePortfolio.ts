// composables/usePortfolio.ts
import { ref, computed } from 'vue'
import { TOOL_VALUES, PROJECT_VALUES, EXPERIENCE_VALUES, EDUCATION_VALUES  } from './objects'
import type { ToolId, SkillId, Education, Project, ProjectId, ExperienceId, EducationId, EntityId } from './objects';

// --- MÉTHODES DYNAMIQUES DE RECHERCHE ---

// Trouver les outils liés à une compétence
export function getToolsForCompetence(compId: SkillId, limit = NaN) {
  const associatedTools = [];
  for (let i = 0; i < TOOL_VALUES.length && (!limit || associatedTools.length < limit); i++) {
    const tool = TOOL_VALUES[i];
    if (tool?.compIds?.includes(compId)) {
      associatedTools.push(tool);
    }
  }

  return associatedTools;
}

// Trouver les projets liés à une compétence
export function getProjectsForCompetence (compId: SkillId) {
  return PROJECT_VALUES.filter(p => p.competencies.some(c => c.id === compId))
}

export function getProjectForTool(tool: ToolId) {
  return PROJECT_VALUES.filter(p => p.tools.find(t => t.id === tool));
}

export function getEntitiesForSoftSkill(softSkillId: string) {
  const results: { type: 'project' | 'experience' | 'education', id: string, title: string }[] = [];

  PROJECT_VALUES.forEach((p: Project) => {
    if (p?.softSkills?.find((softSkill) => softSkill.id === softSkillId)) results.push({ type: 'project', id: p.id, title: p.title })
  });
  EXPERIENCE_VALUES.forEach(e => {
    if (e?.softSkills?.find((softSkill) => softSkill.id === softSkillId)) results.push({ type: 'experience', id: e.id, title: e.title })
  });
  EDUCATION_VALUES.forEach((e: Education) => {
    if (!e?.ignoreForToolsUsages && e?.softSkills?.find((softSkill) => softSkill.id === softSkillId)) results.push({ type: 'education', id: e.id, title: e.title })
  });
  
  return results;


}

// L'extension du type pour le Modal (mis à jour)
export type ModalPayload = { type: 'tool', id: ToolId } | { type: 'project', id: ProjectId } | { type: 'competence', id: SkillId } | { type: 'experience', id: ExperienceId } | { type: 'education', id: EducationId }

const modalStack = ref<ModalPayload[]>([])

export function useModalManager() {
  const currentModal = computed(() => modalStack.value[modalStack.value.length - 1] || null)
  const hasHistory = computed(() => modalStack.value.length > 1)
  const isOpen = computed(() => modalStack.value.length > 0)
  const openModal = (payload: ModalPayload) => { if (currentModal.value?.id !== payload.id) { modalStack.value.push(payload); if (document) document.body.style.overflow = 'hidden' } }
  const goBack = () => { modalStack.value.pop(); if (modalStack.value.length === 0) document.body.style.overflow = '' }
  const closeAll = () => { 
    modalStack.value = []; 
    if (document) {
      document.body.style.overflow = '';
    }
  }
  return { currentModal, hasHistory, isOpen, openModal, goBack, closeAll }
}

// À la fin de composables/usePortfolio.ts

// --- OUTIL DE RENDU MARKDOWN LÉGER ---
export function renderMarkdown (text: string) {
  if (!text) return ''
  return '<small class="mt-0 pt-0" style="text-align:start">Partie rédigée avec un markdown personnalisé</small></br></br>' + text
    .replace(/^### (.*$)/gim, '<h4 class="text-lg font-bold text-gray-900 dark:text-white">$1</h4>')
    .replace(/^## (.*$)/gim, '<h3 class="text-xl font-bold text-gray-900 dark:text-white">$1</h3>')
    .replace(/^# (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-900 dark:text-white">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/`(.*?)`/gim, '<code class="bg-gray-600 text-white rounded-sm">$1</code>')
    .replace(/^- (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
    .replace(/^-# (.*$)/gim, '<small>$1</small>')
    .replace(/^> (.*$)/gim, '<p class="block-auto border-l-4 border-l-gray-400 dark:border-l-gray-600 pl-4 text-gray-500 dark:text-gray-400">$1</p>')
    .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2" target="_blank" class="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline">$1</a>')


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

export function getYearsFormatted(firstDate?: Date|string|number, secondDate?: Date|string|number): string {
  if (!firstDate || !secondDate) return '';
  const years = getYearsBetween(firstDate, secondDate);
  return typeof years === 'number' && years === 0 ? "moins d'un an" : `${years} ans`;
}