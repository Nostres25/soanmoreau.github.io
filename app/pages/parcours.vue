<template>
  <div class="relative max-w-4xl mx-auto min-h-screen pt-8 pb-12 animate-fade-in space-y-16">
    
    <header>
      <h1 class="text-4xl font-extrabold tracking-tight mb-2">Mon <span class="text-emerald-500">Parcours</span></h1>
      <p class="text-gray-500 dark:text-gray-400">Découvrez la logique de mon orientation et le détail de ma formation.</p>
    </header>

    <hr class="border-gray-200 dark:border-gray-800/60">

    <section>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Logique du parcours
      </h2>
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <p class="text-justify">
          Mon parcours s'inscrit dans une continuité logique axée sur la résolution de problèmes. Issu d'un Baccalauréat Général avec des spécialités en Mathématiques, Physique et SVT, j'ai développé une grande rigueur analytique et assimilé la méthode scientifique. L'orientation vers le B.U.T Informatique m'est apparue comme l'évolution naturelle pour appliquer cet esprit logique à des cas concrets et tangibles.
        </p>
        <p class="text-justify">
          L'évolution entre ma première et ma deuxième année de B.U.T illustre mon passage de l'apprentissage théorique à la maîtrise d'environnements complexes. Tandis que la première année m'a apporté les fondations techniques, la seconde m'a permis d'assumer des rôles de chef d'équipe au sein des SAÉ et de concevoir des architectures plus abouties. Aujourd'hui, mon ambition professionnelle est de consolider ces compétences techniques et mes soft-skills d'organisation en intégrant une entreprise dans le cadre d'une alternance pour ma troisième année.
        </p>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Secteur professionnel
      </h2>
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        <h3 class="font-bold text-lg text-gray-900 dark:text-white">Pourquoi l'informatique ?</h3>
        <p class="text-justify">
          Mon intérêt pour l'informatique ne relève pas du hasard, mais d'une volonté de concevoir des outils qui ont un véritable impact. Le développement logiciel m'attire car il exige un équilibre constant entre la créativité lors de la conception et une extrême rigueur lors de l'implémentation algorithmique. C'est un secteur où le retour critique sur son propre travail est indispensable pour optimiser les performances et la sécurité d'une application.
        </p>
        <p class="text-justify">
          Cette appétence pour la création de solutions utilisées à grande échelle s'est confirmée très tôt au travers de mes projets personnels. Le développement et le maintien de mon agent logiciel UnoOnDisc, aujourd'hui déployé sur plus de 1800 serveurs et utilisé par plus de 128 000 membres, m'ont confronté aux réalités du travail en production : gestion de l'infrastructure via Docker, maîtrise du TypeScript et écoute des besoins des utilisateurs. Ces expériences m'ont prouvé que je souhaitais évoluer professionnellement dans la conception et l'optimisation d'infrastructures logicielles.
        </p>
      </div>
    </section>

    <section id="formation" class="scroll-mt-28">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Formation : B.U.T Informatique
      </h2>
      <div class="bg-emerald-50/50 dark:bg-emerald-900/10 p-6 sm:p-8 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 leading-relaxed">
        <p class="text-gray-700 dark:text-gray-300 font-medium mb-4 text-justify">{{ butInfoData?.description }}</p>
        <p class="text-gray-600 dark:text-gray-400 mb-10 text-justify">{{ butInfoData?.longDescription }}</p>

        <div class="space-y-10">
          <div>
            <h3 class="font-bold text-xl text-emerald-800 dark:text-emerald-300 mb-6 border-b border-emerald-200 dark:border-emerald-800/50 pb-2">
              Progression et évolution des compétences
            </h3>
            <div class="grid gap-4">
              <div v-for="(prog, index) in competencesProgression" :key="index" class="bg-white/70 dark:bg-gray-800/70 p-5 rounded-xl border border-emerald-100/80 dark:border-emerald-800/40 shadow-sm transition-all hover:shadow-md">
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <h4 class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> {{ prog.titre }}
                  </h4>
                  
                  <div class="w-full md:w-1/2 flex items-center gap-3">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-10 text-right">B.U.T 1</span>
                    <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex relative shadow-inner">
                      <div class="h-full bg-emerald-300 dark:bg-emerald-800/60" :style="{ width: prog.levelBut1 + '%' }"></div>
                      <div class="h-full bg-emerald-500 dark:bg-emerald-400" :style="{ width: (prog.levelBut2 - prog.levelBut1) + '%' }"></div>
                    </div>
                    <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider w-10">B.U.T 2</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <span class="font-semibold text-gray-800 dark:text-gray-200 inline-block mb-1.5 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">B.U.T 1</span>
                    <p class="text-gray-600 dark:text-gray-400 text-justify">{{ prog.but1 }}</p>
                  </div>
                  <div>
                    <span class="font-semibold text-emerald-800 dark:text-emerald-200 inline-block mb-1.5 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 rounded">B.U.T 2</span>
                    <p class="text-gray-600 dark:text-gray-400 text-justify">{{ prog.but2 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-xl text-emerald-800 dark:text-emerald-300 mb-6 border-b border-emerald-200 dark:border-emerald-800/50 pb-2">
              Évolution technique (Outils & Langages)
            </h3>
            <div class="grid gap-4">
              <div v-for="(prog, index) in outilsProgression" :key="index" class="bg-white/70 dark:bg-gray-800/70 p-5 rounded-xl border border-emerald-100/80 dark:border-emerald-800/40 shadow-sm transition-all hover:shadow-md">
                
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <h4 class="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> {{ prog.categorie }}
                  </h4>
                  
                  <div class="w-full md:w-1/2 flex items-center gap-3">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider w-10 text-right">B.U.T 1</span>
                    <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex relative shadow-inner">
                      <div class="h-full bg-emerald-300 dark:bg-emerald-800/60" :style="{ width: prog.levelBut1 + '%' }"></div>
                      <div class="h-full bg-emerald-500 dark:bg-emerald-400" :style="{ width: (prog.levelBut2 - prog.levelBut1) + '%' }"></div>
                    </div>
                    <span class="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider w-10">B.U.T 2</span>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <span class="font-semibold text-gray-800 dark:text-gray-200 inline-block mb-1.5 px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">B.U.T 1</span>
                    <p class="text-gray-600 dark:text-gray-400 text-justify">{{ prog.but1 }}</p>
                  </div>
                  <div>
                    <span class="font-semibold text-emerald-800 dark:text-emerald-200 inline-block mb-1.5 px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 rounded">B.U.T 2</span>
                    <p class="text-gray-600 dark:text-gray-400 text-justify">{{ prog.but2 }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <section id="sae" class="scroll-mt-28">
      <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Projet d'études (SAÉ)
      </h2>
      <p class="text-gray-600 dark:text-gray-400 text-sm mb-8 text-justify">
        Les projets d'études sont aussi appelés SAÉ (Situations d'apprentissage évaluées).
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <article 
          v-for="projet in saeProjects" 
          :key="projet.id" 
          class="flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-500 transition-colors shadow-sm hover:shadow-md"
        >
          <div class="flex justify-between items-start mb-4">
            <h3 class="font-bold text-xl text-gray-900 dark:text-white pr-4">{{ projet.title }}</h3>
            <span class="shrink-0 text-xs font-semibold px-2 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md">
              {{ projet.context }}
            </span>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1 line-clamp-4 text-justify">
            {{ projet.description }}
          </p>
          
          <div class="flex flex-wrap gap-2 mb-6">
            <!-- Boucle sur projet.tools au lieu de toolIds -->
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
            Analyser cette SAÉ
            <span class="text-emerald-500 group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </article>
      </div>
    </section>

    <section id="stage" class="scroll-mt-28">
      <h2 class="text-2xl font-bold mb-6 flex items-center gap-2">
        <span class="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> 
        Expérience professionnelle : Stage de deuxième année
      </h2>
      <div class="bg-blue-50/50 dark:bg-blue-900/10 p-6 sm:p-8 rounded-2xl border border-blue-100 dark:border-blue-800/30 text-justify leading-relaxed">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-xl text-blue-900 dark:text-blue-100">{{ stageData?.entity }}</h3>
          <span class="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">{{ stageData?.date }}</span>
        </div>
        <p class="text-blue-800 dark:text-blue-200 font-medium mb-4">{{ stageData?.description }}</p>
        <p class="text-gray-600 dark:text-gray-400">{{ stageData?.longDescription }}</p>
        
        <div class="mt-6">
          <button 
            @click="openModal({ type: 'experience', id: 'stage-mf' })" 
            class="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-all"
          >
            Ouvrir la fiche de ce stage &rarr;
          </button>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TOOLS, PROJECTS, EDUCATIONS, EXPERIENCES, useModalManager } from '~/composables/usePortfolio'

const { openModal } = useModalManager()

// Récupération des données du BUT
const butInfoData = computed(() => EDUCATIONS['but-info'])

// Récupération des données du Stage
const stageData = computed(() => EXPERIENCES['stage-mf'])

// Filtre pour ne récupérer que les SAÉ
const saeProjects = computed(() => {
  return Object.values(PROJECTS).filter(projet => projet.context === 'SAÉ BUT')
});

// Données de progression des compétences
const competencesProgression = [
  { titre: 'Réaliser', levelBut1: 35, levelBut2: 85, but1: "Développement de scripts simples et de petits programmes procéduraux (Python, Java) afin d'assimiler la logique algorithmique de base.", but2: "Conception d'applications complètes et robustes orientées objet (ex: Jeu d'échecs en Java) et implémentation d'architectures web avec des frameworks (PHP/Laravel)." },
  { titre: 'Optimiser', levelBut1: 30, levelBut2: 80, but1: "Découverte des concepts initiaux de l'algorithmique, des tris et des structures de données simples en Python.", but2: "Étude approfondie de la complexité algorithmique mathématique, optimisation des parcours de graphes et amélioration mesurable des performances." },
  { titre: 'Administrer', levelBut1: 35, levelBut2: 80, but1: "Familiarisation avec l'environnement de ligne de commande Linux, navigation dans les systèmes de fichiers et commandes de base.", but2: "Configuration complète de systèmes Ubuntu, déploiement de services réseaux locaux (DHCP, DNS), gestion stricte de l'adressage (IPv4/IPv6) et des pare-feux." },
  { titre: 'Gérer', levelBut1: 40, levelBut2: 85, but1: "Écriture de requêtes SQL basiques et découverte intuitive de l'interrogation de bases de données pré-construites.", but2: "Recueil formel des besoins, modélisation conceptuelle et logique (MCD/MLD), et construction de bases de données robustes sous PostgreSQL et MariaDB." },
  { titre: 'Conduire', levelBut1: 20, levelBut2: 75, but1: "Participation au travail en groupe avec un suivi classique des tâches de développement assignées par les professeurs.", but2: "Prise de responsabilité systématique en tant que chef d'équipe, pilotage du cycle de vie du projet informatique et gestion de l'organisation collective." },
  { titre: 'Collaborer', levelBut1: 45, levelBut2: 90, but1: "Découverte des outils de travail collaboratif basiques et manipulations initiales des dépôts Git.", but2: "Collaboration technique fluide sur Git/GitHub (fusions, branches temporelles) et communication efficace au sein d'une organisation professionnelle." }
]

// Données de progression des outils
const outilsProgression = [
  { categorie: 'Langages (Python, Java, PHP, JS, HTML/CSS)', levelBut1: 40, levelBut2: 85, but1: "Apprentissage de la syntaxe, des types de variables et de l'algorithmique fondamentale (boucles, conditions, fonctions).", but2: "Maîtrise de la Programmation Orientée Objet (POO), intégration structurée d'APIs et application du pattern MVC via des frameworks." },
  { categorie: 'Systèmes & Réseaux (Linux, Bash, Protocoles)', levelBut1: 30, levelBut2: 75, but1: "Exécution de commandes simples, gestion des droits utilisateurs et découverte théorique d'internet.", but2: "Création de scripts d'automatisation en Bash, conception d'architectures réseaux physiques et compréhension des couches Ethernet et ARP." },
  { categorie: 'Bases de Données (SQL, PostgreSQL, MariaDB)', levelBut1: 40, levelBut2: 85, but1: "Création de tables simples et requêtes de sélection isolées (SELECT, JOIN simples).", but2: "Optimisation de la structure, gestion des contraintes d'intégrité, manipulation des vues et intégration des bases aux applications logicielles." }
]
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
</style>