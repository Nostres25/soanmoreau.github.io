// composables/usePortfolio.ts
import { ref, computed } from 'vue'

// --- 1. DONNÉES NORMALISÉES ---

export const MASTERY_LEVELS = [
  "Notions", 
  "Découverte", 
  "Maîtrise globale", 
  "Maîtrise avancée", 
  "Maîtrise presque totale"
]


export const TOOLS = {
  python: { id: 'python', name: 'Python', icon: 'Py', masteryIndex: 3, duration: '3 ans', concepts: [{ name: 'Complexité', projectIds: ['sae-python'] }] },
  typescript: { id: 'typescript', name: 'TypeScript', icon: 'TS', masteryIndex: 3, duration: '2 ans', concepts: [{ name: 'Typage strict', projectIds: ['uno-disc'] }] },
  java: { id: 'java', name: 'Java', icon: 'J', masteryIndex: 3, duration: '4 ans', concepts: [{ name: 'POO', projectIds: ['mc-plugin'] }, { name: 'Jeu d\'échecs', projectIds: ['sae-echecs'] }] },
  php: { id: 'php', name: 'PHP', icon: 'PHP', masteryIndex: 2, duration: '1 an', concepts: [{ name: 'Framework Laravel', projectIds: ['sae-suivi'] }, { name: 'Refonte & Sécurité', projectIds: ['stage-mf'] }] },
  docker: { id: 'docker', name: 'Docker', icon: 'D', masteryIndex: 2, duration: '2 ans', concepts: [{ name: 'Conteneurisation', projectIds: ['uno-disc'] }] },
  git: { id: 'git', name: 'Git / GitHub', icon: 'G', masteryIndex: 3, duration: '4 ans', concepts: [{ name: 'Versionning', projectIds: ['mc-plugin', 'stage-mf'] }] },
  linux: { id: 'linux', name: 'Linux / Bash', icon: 'L', masteryIndex: 3, duration: '2 ans', concepts: [{ name: 'Configuration système', projectIds: ['sae-sys'] }] },
  sql: { id: 'sql', name: 'SQL / SGBDR', icon: 'DB', masteryIndex: 3, duration: '2 ans', concepts: [{ name: 'Modélisation', projectIds: ['sae-bd'] }] },
  nodejs: { id: 'nodejs', name: 'Node.js', icon: 'N', masteryIndex: 3, duration: '2 ans', concepts: [] },
  vuejs: { id: 'vuejs', name: 'Vue.js / Nuxt', icon: 'V', masteryIndex: 3, duration: '1 an', concepts: [] }
}

export const PROJECTS = {
  'uno-disc': { id: 'uno-disc', title: 'UnoOnDisc', context: 'Projet Perso', description: 'Agent logiciel Discord pour jouer au UNO. Présent sur +1800 serveurs, +128 000 membres.', longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.", github: '', website: '', images: ['https://imgur.com/RiZV3YV.png','https://imgur.com/RlpI9qc.png'], toolIds: ['typescript', 'docker', 'git'], compIds: ['realiser', 'collaborer'] },
  'mc-plugin': { id: 'mc-plugin', title: 'Plugin Minecraft', context: 'Projet Perso', description: 'Gestion des permissions et zones sur serveur multijoueur. Configuration Yaml.', longDescription: "Lorem ipsum dolor sit amet... (Description complète à rédiger)", github: '', website: '', images: [], toolIds: ['java', 'git'], compIds: ['realiser'] },
  'sae-echecs': { id: 'sae-echecs', title: 'Jeu d\'échecs', context: 'SAÉ BUT', description: 'Développement d\'un jeu d\'échecs complet.', longDescription: "", github: '', website: '', images: [], toolIds: ['java'], compIds: ['realiser', 'conduire'] },
  'sae-suivi': { id: 'sae-suivi', title: 'Suivi de colis', context: 'SAÉ BUT', description: 'Site web de suivi de colis pour l\'IUT.', longDescription: "", github: '', website: '', images: [], toolIds: ['php'], compIds: ['realiser'] },
  'sae-python': { id: 'sae-python', title: 'Étude de graphes', context: 'SAÉ BUT', description: 'Étude de réseaux et de complexité algorithmique.', longDescription: "", github: '', website: '', images: [], toolIds: ['python'], compIds: ['optimiser'] },
  'sae-bd': { id: 'sae-bd', title: 'Modélisation BD', context: 'SAÉ BUT', description: 'Recueil des besoins, modélisation et construction de bases de données.', longDescription: "", github: '', website: '', images: [], toolIds: ['sql'], compIds: ['gerer'] },
  'sae-sys': { id: 'sae-sys', title: 'Configuration Ubuntu', context: 'SAÉ BUT', description: 'Configurations d\'un système Ubuntu (Linux) et réseaux (IPv4, DHCP, Pare-feux).', longDescription: "", github: '', website: '', images: [], toolIds: ['linux'], compIds: ['administrer'] },
  'sae-colis': { 
    id: 'sae-colis', 
    title: "Site de suivi de colis pour l'IUT", 
    context: 'SAÉ BUT', 
    description: 'Projet de deuxième année : Site qui répertorie les devis, bons de commandes, bons de livraisons avec possibilité de les traiter.',
    longDescription: "",
    github: 'https://github.com/Nostres25/suivi-colis-iutv-v2', 
    website: '', 
    images: [], 
    toolIds: ['git', "php", 'docker', 'sql'], 
    compIds: ['realiser', 'administrer', 'optimiser', 'gerer', 'conduire', 'collaborer'] },

}

export const EXPERIENCES = {
  'stage-mf': { id: 'stage-mf', title: 'Développeur PHP front/back', entity: 'Market Factory', date: 'Janv 2026 - Mars 2026', description: 'Développement API, correction de failles, refonte et rédaction de documentation.', longDescription: "Pendant ce stage, j'ai eu l'opportunité de travailler sur l'architecture globale. J'y ai développé de nouvelles fonctionnalités utilisant des API, trouvé et corrigé des failles de sécurité, et proposé une refonte du projet pour une structure plus évolutive.", toolIds: ['php', 'git'] },
  'draftbot': { id: 'draftbot', title: 'Support Utilisateur', entity: 'DraftBot', date: 'Depuis 2019', description: 'Tests, identification et résolution de problèmes. Agent présent sur +1M de serveurs.', longDescription: "Mes missions incluaient la réalisation de tests, l'identification et la résolution de problèmes en direct avec la communauté. J'ai également identifié les besoins des utilisateurs en apportant des solutions cohérentes.", toolIds: [] }
}

export const EDUCATIONS = {
  'but-info': { id: 'but-info', title: 'BUT Informatique', entity: 'Univ. Sorbonne Paris-Nord', context: 'Formation', description: 'Moyenne stabilisée à ~15/20. Chef d\'équipe sur divers projets (Jeu d\'échecs, algo graphes, BDD, config Linux, Site de colis).', longDescription: "Formation très technique et professionnalisante. Les nombreux travaux de groupe m'ont permis de développer mes soft-skills et mon leadership (Chef d'équipe dans la plupart des projets). L'approche par compétences m'a appris à analyser de manière critique mon propre travail.", toolIds: ['python', 'java', 'sql', 'linux', 'php'], compIds: ['realiser', 'optimiser', 'administrer', 'gerer', 'conduire', 'collaborer'], projectIds: ['sae-echecs', 'sae-suivi', 'sae-python', 'sae-bd', 'sae-sys'] },
  'bac': { id: 'bac', title: 'BAC Général (Maths, PC, SVT)', entity: 'Lycée', context: 'Diplôme', description: 'Apprentissage de la méthode scientifique. Bons résultats en mathématiques. Certification PIX.', longDescription: "", toolIds: [], compIds: [], projectIds: [] }
}

export const COMPETENCES = {
  realiser: { id: 'realiser', title: 'Réaliser', description: 'Développer des applications.', toolIds: ['java', 'php', 'typescript'], projectIds: ['uno-disc', 'mc-plugin', 'sae-echecs', 'sae-suivi'] },
  optimiser: { id: 'optimiser', title: 'Optimiser', description: 'Améliorer les performances.', toolIds: ['python'], projectIds: ['sae-python'] },
  administrer: { id: 'administrer', title: 'Administrer', description: 'Configurer systèmes et réseaux.', toolIds: ['linux', 'docker'], projectIds: ['sae-sys', 'uno-disc'] },
  gerer: { id: 'gerer', title: 'Gérer', description: 'Bases de données.', toolIds: ['sql'], projectIds: ['sae-bd'] },
  conduire: { id: 'conduire', title: 'Conduire', description: 'Piloter un projet.', toolIds: [], projectIds: ['sae-echecs'] },
  collaborer: { id: 'collaborer', title: 'Collaborer', description: 'Travailler en équipe.', toolIds: ['git'], projectIds: ['uno-disc'] }
}

// L'extension du type permet d'ouvrir les nouvelles sections dans le modal
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

// --- 2. GESTIONNAIRE DE MODALS (Système de pile/stack) ---

// export type ModalPayload = { type: 'tool', id: keyof typeof TOOLS } | { type: 'project', id: keyof typeof PROJECTS } | { type: 'competence', id: keyof typeof COMPETENCES }

// const modalStack = ref<ModalPayload[]>([])

// export const useModalManager = () => {
//   const currentModal = computed(() => modalStack.value[modalStack.value.length - 1] || null)
//   const hasHistory = computed(() => modalStack.value.length > 1)
//   const isOpen = computed(() => modalStack.value.length > 0)

//   const openModal = (payload: ModalPayload) => {
//     modalStack.value.push(payload)
//     document.body.style.overflow = 'hidden' // Empêche le scroll en arrière-plan
//   }

//   const goBack = () => {
//     modalStack.value.pop()
//     if (modalStack.value.length === 0) document.body.style.overflow = ''
//   }

//   const closeAll = () => {
//     modalStack.value = []
//     document.body.style.overflow = ''
//   }

//   return { currentModal, hasHistory, isOpen, openModal, goBack, closeAll }

// À ajouter à la fin de composables/usePortfolio.ts

// Ajout de "textOffset" pour décaler le texte visuellement (ex: '-translate-x-[20%]') et éviter les chevauchements
export const TIMELINE_DATA = [
  { id: 'draftbot', modalType: 'experience', type: 'pro', title: 'DraftBot - Support', entity: 'Bénévolat', startDate: 'Jan 2019', endDate: 'Présent', durationMonths: 89, isEvent: false, stemHeight: 50, textOffset: '-translate-x-[10%]' },
  { id: 'mc-plugin', modalType: 'project', type: 'pro', title: 'Plugin Minecraft', entity: 'Projet Perso', startDate: 'Jan 2020', endDate: 'Dec 2022', durationMonths: 36, isEvent: false, stemHeight: 90, textOffset: '-translate-x-[80%]' },
  { id: 'bac', modalType: 'education', type: 'edu', title: 'BAC Général', entity: 'Lycée', startDate: 'Sept 2021', endDate: 'Juin 2024', durationMonths: 33, isEvent: false, stemHeight: 40, textOffset: '-translate-x-1/2' },
  { id: 'uno-disc', modalType: 'project', type: 'pro', title: 'UnoOnDisc', entity: 'Projet Perso', startDate: 'Sept 2022', endDate: 'Présent', durationMonths: 46, isEvent: false, stemHeight: 40, textOffset: '-translate-x-[30%]' },
  { id: 'but-info', modalType: 'education', type: 'edu', title: 'BUT Informatique', entity: 'IUT Sorbonne P-N', startDate: 'Sept 2024', endDate: 'Juin 2027', durationMonths: 33, isEvent: false, stemHeight: 80, textOffset: '-translate-x-[60%]' },
  { id: 'stage-mf', modalType: 'experience', type: 'pro', title: 'Stage Dev PHP', entity: 'Market Factory', startDate: 'Jan 2026', endDate: 'Mars 2026', durationMonths: 3, isEvent: false, stemHeight: 110, textOffset: '-translate-x-[50%]' }
]