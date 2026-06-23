// composables/usePortfolio.ts
import { ref, computed } from 'vue'
import { stripIndents } from 'common-tags'

export const MASTERY_LEVELS = ["Notions", "Découverte", "Maîtrise globale", "Maîtrise avancée", "Maîtrise presque totale"]

// --- 1. NOTIONS (Nouveau concept indépendant) ---
export const CONCEPTS = {
  'poo': { id: 'poo', name: 'Programmation Orientée Objet', description: stripIndents`Paradigme de programmation basé sur le concept d'objets contenant des données et des méthodes.` },
  'complexite': { id: 'complexite', name: 'Complexité Algorithmique', description: stripIndents`Évaluation des performances et de l'efficacité mathématique des algorithmes.` },
  'typage': { id: 'typage', name: 'Typage Strict', description: stripIndents`Vérification forte et statique des types de données pour prévenir les erreurs.` },
  'mvc': { id: 'mvc', name: 'Architecture MVC', description: stripIndents`Séparation du code en Modèle, Vue et Contrôleur pour une meilleure maintenabilité.` },
  'secu': { id: 'secu', name: 'Sécurité & Failles', description: stripIndents`Identification, prévention et correction de vulnérabilités web.` },
  'conteneur': { id: 'conteneur', name: 'Conteneurisation', description: stripIndents`Isolation d'applications avec leurs dépendances pour un déploiement uniforme.` },
  'versioning': { id: 'versioning', name: 'Versioning', description: stripIndents`Gestion de l'historique et des versions du code source en équipe.` },
  'sys': { id: 'sys', name: 'Configuration Système', description: stripIndents`Administration d'OS Linux et configuration des règles réseaux.` },
  'db-model': { id: 'db-model', name: 'Modélisation BD', description: stripIndents`Conception de schémas relationnels (MCD/MLD) et intégrité des données.` },
}

// --- 2. OUTILS (Liés aux Notions et aux Compétences) ---
export const TOOLS = {
  python: { id: 'python', name: 'Python', icon: 'Py', masteryIndex: 3, duration: '3 ans', conceptIds: ['complexite'], compIds: ['optimiser', 'realiser-app'] },
  typescript: { id: 'typescript', name: 'TypeScript', icon: 'TS', masteryIndex: 3, duration: '2 ans', conceptIds: ['typage', 'poo'], compIds: ['realiser-app'] },
  java: { id: 'java', name: 'Java', icon: 'J', masteryIndex: 3, duration: '4 ans', conceptIds: ['poo'], compIds: ['realiser-app'] },
  php: { id: 'php', name: 'PHP', icon: 'PHP', masteryIndex: 2, duration: '1 an', conceptIds: ['mvc', 'secu', 'poo'], compIds: ['realiser-app'] },
  docker: { id: 'docker', name: 'Docker', icon: 'D', masteryIndex: 2, duration: '2 ans', conceptIds: ['conteneur'], compIds: ['administrer'] },
  git: { id: 'git', name: 'Git / GitHub', icon: 'G', masteryIndex: 3, duration: '4 ans', conceptIds: ['versioning'], compIds: ['collaborer', 'conduire-projet'] },
  linux: { id: 'linux', name: 'Linux / Bash', icon: 'L', masteryIndex: 3, duration: '2 ans', conceptIds: ['sys'], compIds: ['administrer'] },
  sql: { id: 'sql', name: 'SQL / SGBDR', icon: 'DB', masteryIndex: 3, duration: '2 ans', conceptIds: ['db-model'], compIds: ['gerer-donnees'] },
}

// --- 3. COMPÉTENCES (Renommées) ---
export const COMPETENCES = {
  'realiser-app': { id: 'realiser-app', title: 'Réaliser', description: 'Développer des applications informatiques complexes.' },
  'optimiser': { id: 'optimiser', title: 'Optimiser', description: 'Améliorer les performances et l\'algorithmique.' },
  'administrer': { id: 'administrer', title: 'Administrer', description: 'Configurer systèmes et réseaux.' },
  'gerer-donnees': { id: 'gerer-donnees', title: 'Gérer', description: 'Concevoir et exploiter des bases de données.' },
  'conduire-projet': { id: 'conduire-projet', title: 'Conduire', description: 'Piloter un projet informatique.' },
  'collaborer': { id: 'collaborer', title: 'Collaborer', description: 'Travailler en équipe de manière agile.' }
}

// --- 4. FORMATIONS (Ajout de "formation-perso") ---
export const EDUCATIONS = {
  'formation-perso': { 
    id: 'formation-perso', title: 'Formation Personnelle (Autodidacte)', entity: 'Projets Personnels', context: 'Autodidacte', 
    description: 'Apprentissage en autonomie guidé par la curiosité et la réalisation de projets concrets.', 
    longDescription: '', competencies: [], tools: []
  },
  'but-info': { 
    id: 'but-info', title: 'BUT Informatique', entity: 'Univ. Sorbonne Paris-Nord', context: 'Formation', 
    description: stripIndents`Moyenne stabilisée à ~15/20. Chef d'équipe sur divers projets (Jeu d'échecs, algo graphes, BDD, config Linux, Site de colis).`, 
    longDescription: stripIndents`Formation très technique et professionnalisante. Les nombreux travaux de groupe m'ont permis de développer mes soft-skills et mon leadership.`, 
    competencies: [{ id: 'conduire-projet', description: "Pilotage d'équipe", longDescription: "" }], 
    tools: [
      { id: 'python', description: "Algorithmique avancée", longDescription: "", conceptIds: ['complexite'] },
      { id: 'java', description: "POO approfondie", longDescription: "", conceptIds: ['poo'] }
    ] 
  },
  'bac': { 
    id: 'bac', title: 'BAC Général (Maths, PC, SVT)', entity: 'Lycée', context: 'Diplôme', 
    description: 'Apprentissage de la méthode scientifique. Bons résultats en mathématiques.', 
    longDescription: '', competencies: [], tools: [] 
  }
}

// --- 5. PROJETS ---
export const PROJECTS = {
  'uno-disc': { 
    id: 'uno-disc', title: 'UnoOnDisc', context: 'Projet Perso', educationId: 'formation-perso',
    description: 'Agent logiciel Discord pour jouer au UNO. Présent sur +1800 serveurs, +128 000 membres.', 
    longDescription: stripIndents`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`, 
    github: '', website: '', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Développement d'un bot interactif.", longDescription: "" },
      { id: 'administrer', description: "Hébergement via Docker.", longDescription: "" }
    ],
    tools: [
      { id: 'typescript', description: "Typage strict du projet.", longDescription: "", conceptIds: ['typage', 'poo'] },
      { id: 'docker', description: "Mise en production.", longDescription: "", conceptIds: ['conteneur'] }
    ]
  },
  'sae-echecs': { 
    id: 'sae-echecs', title: 'Jeu d\'échecs', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Développement d\'un jeu d\'échecs complet.', longDescription: "", github: '', website: '', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Logique métier des échecs.", longDescription: "" },
      { id: 'conduire-projet', description: "Gestion d'équipe à 4.", longDescription: "" }
    ],
    tools: [
      { id: 'java', description: "Implémentation POO et JavaFX.", longDescription: "", conceptIds: ['poo'] }
    ]
  },
}

// --- 6. EXPÉRIENCES ---
export const EXPERIENCES = {
  'stage-mf': { 
    id: 'stage-mf', title: 'Développeur PHP front/back', entity: 'Market Factory', date: 'Janv 2026 - Mars 2026', 
    description: 'Développement API, correction de failles, refonte et rédaction de documentation.', 
    longDescription: stripIndents`Ce stage de deuxième année a marqué ma véritable transition entre le code académique et les exigences de production.`, 
    competencies: [
      { id: 'realiser-app', description: "Création d'endpoints API.", longDescription: "" }
    ],
    tools: [
      { id: 'php', description: "Refonte sous framework.", longDescription: "", conceptIds: ['mvc', 'secu'] },
      { id: 'git', description: "Travail en équipe.", longDescription: "", conceptIds: ['versioning'] }
    ]
  }
}

// --- 7. MÉTHODES DYNAMIQUES DE RECHERCHE ---

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

// Timeline data...
export const TIMELINE_DATA = [
  { id: 'mc-plugin', modalType: 'project', type: 'pro', title: 'Plugin Minecraft', entity: 'Projet Perso', startDate: 'Jan 2020', endDate: 'Dec 2022', durationMonths: 36, isEvent: false, stemHeight: 90, textOffset: '-translate-x-[80%]' },
  { id: 'bac', modalType: 'education', type: 'edu', title: 'BAC Général', entity: 'Lycée', startDate: 'Sept 2021', endDate: 'Juin 2024', durationMonths: 33, isEvent: false, stemHeight: 40, textOffset: '-translate-x-1/2' },
  { id: 'uno-disc', modalType: 'project', type: 'pro', title: 'UnoOnDisc', entity: 'Projet Perso', startDate: 'Sept 2022', endDate: 'Présent', durationMonths: 46, isEvent: false, stemHeight: 40, textOffset: '-translate-x-[30%]' },
  { id: 'but-info', modalType: 'education', type: 'edu', title: 'BUT Informatique', entity: 'IUT Sorbonne P-N', startDate: 'Sept 2024', endDate: 'Juin 2027', durationMonths: 33, isEvent: false, stemHeight: 80, textOffset: '-translate-x-[60%]' },
  { id: 'stage-mf', modalType: 'experience', type: 'pro', title: 'Stage Dev PHP', entity: 'Market Factory', startDate: 'Jan 2026', endDate: 'Mars 2026', durationMonths: 3, isEvent: false, stemHeight: 110, textOffset: '-translate-x-[50%]' }
]