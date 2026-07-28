import { getYearsFormatted, useModalManager, renderMarkdown } from './usePortfolio'
import type { CommandPaletteGroup } from '@nuxt/ui'

import stageMfContent from '../content/experiences/stage-mf.md?raw'
import unoOnDiscContent from '../content/projects/uno-on-disc.md?raw'
import portfolioContent from '../content/projects/portfolio.md?raw'
import nixosSystemContent from '../content/projects/nixos-personal-system.md?raw'
import phoneBatteryReplacemenContent from '../content/projects/phone-battery-replacement.md?raw'

const startDate = Date.now();

export type ProjectId = keyof typeof PROJECTS;
export type ConceptId = keyof typeof CONCEPTS;
export type SkillId = keyof typeof COMPETENCES;
export type ExperienceId = keyof typeof EXPERIENCES;
export type EducationId = keyof typeof EDUCATIONS;
export type ToolId = keyof typeof TOOLS;
export type SoftSkillsId = keyof typeof SOFT_SKILLS;

export const MASTERY_LEVELS = [
  "Notions", // Je connais à peu prêt le fonctionnement global sans expérience
  "Découverte", // Je connais à peu prêt le fonctionnement global et je suis entrain de tester ainsi qu'apprendre en même temps
  "Maîtrise globale", // Je connais la majorité des fonctionnalités/notions de base grâce à un ou des projets ou grâce des formations
  "Maîtrise assez avancée", // Je connais la majorité des fonctionnalités/notions de base et j'ai quelques points avancés grâce à des projets ou des formations
  "Maîtrise avancée", // J'estime que ce que je connais est globalement avancé par rapport aux fonctionnalités/notions et que je suis peut-être au dessu des espérance pour mon profil grâce à des projets ou des formations
  "Maîtrise très avancée" // J'estime que mes connaissances sont sûrement au delà des espérances pour mon profil
];

export const MASTERY_LEVEL_DESC = [
  'Je connais à peu prêt le fonctionnement global sans expérience',
  "Je connais à peu prêt le fonctionnement global et je suis entrain de tester ainsi qu'apprendre en même temps",
  "Je connais la majorité des fonctionnalités/notions de base grâce à un ou des projets ou grâce des formations",
  "Je connais la majorité des fonctionnalités/notions de base et j'ai quelques points avancés grâce à des projets ou des formations",
  "J'estime que ce que je connais est globalement avancé par rapport aux fonctionnalités/notions et que je suis peut-être au dessus des espérance pour mon profil grâce à des projets ou des formations",
  "J'estime que mes connaissances sont sûrement bien au delà des espérances pour mon profil"
];


export interface Concept {
    id: ConceptId,
    name: string,
    description: string
}

export interface Skill {
  id: SkillId,
  title: string,
  description: string
}

export interface SkillIntegration {
  id: SkillId,
  description: string,
  longDescription?: string
}

export interface Education {
  id: EducationId,
  title: string,
  description: string,
  entity: string, 
  context: string,
  contentPath: string,
  longDescription?: string,
  competencies: SkillIntegration[],
  tools: ToolIntegration[],
  medias?: string[],
  projects?: ProjectIntegration[],
  segmentations?: {[segmentation: string]: {name: string, periode: string, startTimestamp: number, type: string, projects?: ProjectIntegration[]}},
  softSkills?: SoftSkillIntegration[],
  website?: string | Website,
  icon?: string
}

export interface Project {
  id: ProjectId,
  title: string,
  context: string,
  educationId: EducationId,
  startDateTimesTamp: number,
  description: string,
  longDescription?: string,
  github: string,
  website?: string | Website,
  medias?: string[],
  competencies: SkillIntegration[], 
  tools: ToolIntegration[],
  softSkills?: SoftSkillIntegration[]
  endDateTimestamp?: number,
  icon?: string
}

export interface ProjectIntegration {
  id: ProjectId,
  description: string, 
}

export interface Experience {
  id: ExperienceId,
  title: string,
  entity: string,
  date: string,
  github: string,
  startDateTimesTamp: number,
  endDateTimestamp: number,
  description: string,
  competencies: SkillIntegration[],
  tools: ToolIntegration[],
  softSkills?: SoftSkillIntegration[],
  medias?: string[],
  website?: string | Website,
  longDescription?: string,
  icon?: string
}

export interface Tool {
  id: ToolId,
  name: string,
  icon: string,
  realIcon?: string,
  masteryIndex: number,
  duration: string,
  conceptIds: ConceptId[],
  compIds: SkillId[]
}

export interface ToolIntegration {
  id: ToolId,
  description: string,
  conceptIds: ConceptId[]
  longDescription?: string, // TODO currently not visible
}

export interface SoftSkillIntegration {
  id: SoftSkillsId,
  description: string,
}

export interface Website {
  label: string,
  url: string,
}

// --- NOTIONS (Nouveau concept indépendant) ---
export const CONCEPTS: {[conceptId: string]: Concept} = {
  // Notions générales & transverses
  'poo': { id: 'poo', name: 'Programmation Orientée Objet (POO)', description: `Paradigme de programmation basé sur le concept d'objets contenant des données et des méthodes.` },
  'complexite': { id: 'complexite', name: 'Complexité Algorithmique', description: `Évaluation des performances et de l'efficacité mathématique des algorithmes.` },
  'typage': { id: 'typage', name: 'Typage Strict', description: `Vérification forte et statique des types de données pour prévenir les erreurs.` },
  'mvc': { id: 'mvc', name: 'Architecture MVC', description: `Séparation du code en Modèle, Vue et Contrôleur pour une meilleure maintenabilité.` },
  'secu': { id: 'secu', name: 'Sécurité & Failles', description: `Identification, prévention et correction de vulnérabilités web.` },
  'conteneur': { id: 'conteneur', name: 'Conteneurisation', description: `Isolation d'applications avec leurs dépendances pour un déploiement uniforme.` },
  'versioning': { id: 'versioning', name: 'Versioning', description: `Gestion de l'historique et des versions du code source en équipe.` },
  'sys': { id: 'sys', name: 'Configuration Système', description: `Administration d'OS Linux et configuration des règles réseaux.` },
  'db-model': { id: 'db-model', name: 'Modélisation BD', description: `Conception de schémas relationnels (MCD/MLD) et intégrité des données.` },
  'callbacks': { id: 'callbacks', name: 'Callbacks', description: `Utilisation de fonctions passées en arguments.` },
  
  // Systèmes / Algorithmes développés
  'perms': { id: 'perms', name: 'Système de permissions', description: `Gestion hiérarchique des droits des utilisateurs via des rôles, des conditions etc....` },
  'cmds': { id: 'cmds', name: 'Commandes', description: `Création de nouvelles commandes en jeu exécutables par des utilisateurs avec des arguments et des choix.` },
  'zone': { id: 'zone', name: 'Système de zone 3D', description: `Calculs vectoriels et délimitation géométrique dans l'espace en jeu.` },

  // Concepts complexes utilisés
  'migrations': { id: 'migrations', name: 'Migrations', description: `Versionning de la structure de base de données.` },
  'seeders': { id: 'seeders', name: 'Seeders', description: `Peuplement automatisé de données factices pour les tests ou de réelles données utiles en production pour le fonctionnement de l'application` },
  'factories': { id: 'factories', name: 'Factories', description: `Génération d'objets modèles à la volée pour les tests.` },
  'auth': { id: 'auth', name: 'Authentification', description: `Mise en place de systèmes de login sécurisé.` },
  'sessions': { id: 'sessions', name: 'Système de sessions', description: `Conservation de l'état utilisateur et d'autres données entre les requêtes HTTP.` },
  'layouts': { id: 'layouts', name: 'Bases/Layouts', description: `Création de squelettes de pages maîtres.` },
  'components': { id: 'components', name: 'Composants', description: `Morceaux d'interface réutilisables.` },
  'escape': { id: 'escape', name: 'Échappement', description: `Sécurisation automatique contre les failles XSS ou d'injections SQL.` },
  'code-to-db': { id: 'code-to-db', name: 'Interactions du code avec la BD', description: `CRUD via la logique métier.` },
  'responsive': { id: 'responsive', name: 'Responsive', description: `Adaptation du design via un système de grille fluide.` },

  // Notions de programmation
  'events': { id: 'events', name: 'Évènements', description: `Écoute et manipulation du cycle de vie événementiel d'une application.` },
  'scopes': { id: 'scopes', name: 'Portées (Scopes)', description: `Gestion fine de la visibilité des variables et des contextes d'exécution.` },
  'exceptions': { id: 'exceptions', name: 'Exceptions', description: `Capture et gestion des erreurs d'exécution via try/catch.` },
  'collections': { id: 'collections', name: 'Collections', description: `Manipulation de structures de données complexes (Map, Set, Arrays).` },
  'switch': { id: 'switch', name: 'Switch', description: `Structures conditionnelles multiples et optimisées.` },
  'loops': { id: 'loops', name: 'Boucles (for/while)', description: `Itération optimisée sur des ensembles de données.` },
  'interfaces': { id: 'interfaces', name: 'Interfaces', description: `Définition de contrats de données stricts.` },
  'classes': { id: 'classes', name: 'Classes', description: `Instanciation d'objets et encapsulation.` },
  'enums': { id: 'enums', name: 'Énumérations', description: `Définition de types contraints et listes de constantes.` },
  'modules': { id: 'modules', name: 'Modules', description: `Exportation et importation de logique isolée.` },
  'modules-dev': { id: 'modules-dev', name: 'Modules de développement', description: `Création d'environnements de tests automatisés.` },
  'paquets-scripts': { id: 'paquets-scripts', name: 'Scripts de gestionnaire de paquet', description: `Automatisation des tâches d'exécution et de build dans le package.json.` },
  'poly': { id: 'poly', name: 'Héritage et polymorphisme', description: `Concepts avancés de POO pour un code normalisé et réutilisable.` },
  // ça va avec MVC en soit, puis peut-être que model dans ce contexte c'est la même chose que classe
  //'models': { id: 'models', name: 'Models', description: `Logique métier et règles de l'application.` },

  // Notions de tests
  'tests-unitaires': { id: 'tests-unitaires', name: 'Tests unitaires', description: "Réalisation de tests unitaires visant à vérifier des fonctions précises du programme notamment avec des outils comme Junit"},
  'tests-fonctionnels': { id: 'tests-fonctionnels', name: "Tests d'intégration", description: "Réalisation de tests fonctionnels pour les services et modules de l'application notamment grâce à des outils comme MockMVC en SpringBoot"},
  'couverture-tests': { id: 'couverture-tests', name: 'Couverture de tests', description: "Couverture de tous les branchement du programme pour les tests notamment grâce à des outils adaptés comme JaCoCo"},

  // Notions JavaScript / TypeScript
  'async': { id: 'async', name: 'Développement asynchrone', description: `Gestion des promesses, async/await et requêtes non bloquantes.` },
  'dom': { id: 'dom', name: 'Manipulation DOM', description: `Interaction directe avec l'arbre HTML du navigateur.` },
  'ajax': { id: 'ajax', name: 'AJAX', description: `Requêtes HTTP asynchrones côté client.` },

  // Notions Node.js & Écosystème JS
  'sharding': { id: 'sharding', name: 'Sharding', description: `Fragmentation de processus pour les applications à très grande échelle (bots Discord massivement utilisés).` },
  'fs': { id: 'fs', name: 'Interactions fichiers (fs)', description: `Lecture et écriture sur le système de fichiers du serveur en utilisant le module node-fs.` },
  'nodemon-restart': { id: 'nodemon-restart', name: 'Redémarrages après sauvegardes', description: `Environnement de développement avec hot-reloading.` },
  'canvas-2d': { id: 'canvas-2d', name: 'Contexte 2D', description: `Dessin et manipulation de pixels virtuels.` },
  'canvas-overlay': { id: 'canvas-overlay', name: 'Superposition d\'images', description: `Composition dynamique d'images multiples.` },
  'canvas-rotation': { id: 'canvas-rotation', name: 'Rotation d\'images', description: `Transformations géométriques sur des canvas.` },

  // Notions Discord.js
  'djs-slash': { id: 'djs-slash', name: 'Commandes Slash', description: `Intégration native des commandes dans l'interface Discord.` },
  'djs-components': { id: 'djs-components', name: 'Composants (Boutons, Sélecteurs)', description: `Création d'interfaces riches et interactives dans le chat.` },
  'djs-modals': { id: 'djs-modals', name: 'Modals', description: `Formulaires pop-up interactifs pour la saisie utilisateur.` },
  'djs-ephemeral': { id: 'djs-ephemeral', name: 'Messages éphémères', description: `Réponses privées visibles uniquement par l'utilisateur ciblé.` },
  'djs-cache': { id: 'djs-cache', name: 'Cache et sweepers', description: `Optimisation de la mémoire RAM en purgeant les données obsolètes.` },
  'djs-collectors': { id: 'djs-collectors', name: 'Component collectors', description: `Écoute et gestion de flux d'interactions en temps réel.` },

  // Notions Git / GitHub / CI
  'git-commits': { id: 'git-commits', name: 'Commits', description: `Sauvegardes atomiques de l'état du code source.` },
  'git-remote': { id: 'git-remote', name: 'Dépôt distant', description: `Synchronisation avec des serveurs comme GitHub.` },
  'git-branches': { id: 'git-branches', name: 'Branches', description: `Développement parallèle de fonctionnalités.` },
  'git-cherry': { id: 'git-cherry', name: 'Cherry picks', description: `Sélection et application de commits spécifiques d'une branche à une autre.` },
  'git-merges': { id: 'git-merges', name: 'Merges', description: `Fusion de différentes branches de développement.` },
  'git-conflicts': { id: 'git-conflicts', name: 'Résolution de conflits', description: `Gestion manuelle des collisions de code lors de fusions.` },
  'git-issues': { id: 'git-issues', name: 'Issues', description: `Suivi de bugs et suggestions de fonctionnalités.` },
  'git-pr': { id: 'git-pr', name: 'Pull Requests', description: `Proposition, revue et validation de code avant intégration.` },
  'gh-sub': { id: 'gh-sub', name: 'Sub-issues', description: `Découpage de tâches complexes en sous-tâches gérables.` },

  // Notions Java / Spigot / Eclipse
  'eclipse-libs': { id: 'eclipse-libs', name: 'Gestion des bibliothèques', description: `Ajout et configuration de dépendances externes (Build Path).` },
  'java-uml': { id: 'java-uml', name: 'UML (Modélisation)', description: `Conception architecturale via diagrammes de classes.` },
  'java-arraylist': { id: 'java-arraylist', name: 'ArrayList', description: `Utilisation de structures de données dynamiques.` },
  'java-scanner': { id: 'java-scanner', name: 'Scanner', description: `Lecture des entrées utilisateur en console.` },
  'spigot-yaml': { id: 'spigot-yaml', name: 'Configurations YAML', description: `Sauvegarde et lecture de données structurées.` },
  'spigot-events': { id: 'spigot-events', name: 'Manipulation d\'évènements', description: `Interception des actions en jeu (casser un bloc, se déplacer...).` },
  'spigot-gui': { id: 'spigot-gui', name: 'Chest GUI', description: `Création d'interfaces visuelles interactives avec des inventaires virtuels.` },
  'spigot-tools': { id: 'spigot-tools', name: 'Outils de gestion de joueurs', description: `Commandes utilitaires pour gérer les joueurs, leurs permissions, leurs rôles etc...` },
  'spigot-mod': { id: 'spigot-mod', name: 'Commandes de modération', description: `Outils administratifs pour gérer le serveur (sanctions etc...).` },
  'spigot-tab': { id: 'spigot-tab', name: 'Auto-complétion MC', description: `Suggestion dynamique d'arguments lors de la frappe pour des commandes (TabComplete).` },
  'spigot-groups': { id: 'spigot-groups', name: 'Système de groupes & personnalisation', description: `Création de rôles en jeu avec des caractéristiques uniques, des couleurs, un prefixe et des permissions assocées.` },

  // Notions Laravel / PHP / Bootstrap
  'laravel-pagination': { id: 'laravel-pagination', name: 'Pagination Laravel', description: `Découpage optimisé de vastes ensembles de résultats.` },
  'laravel-query': { id: 'laravel-query', name: 'Query builder', description: `Construction programmatique et sécurisée de requêtes SQL.` },
  'laravel-files': { id: 'laravel-files', name: 'Téléverssement et téléchargement de fichiers', description: `Gestion des uploads et des downloads de fichiers.` },
  'blade-directives': { id: 'blade-directives', name: 'Directives communes', description: `Instructions logiques directes (@if, @foreach) dans le HTML.` },
  'eloquent-models': { id: 'eloquent-models', name: 'Models Eloquent', description: `Représentation objet des tables de la base de données et CRUD via l'ORM.` },
  'eloquent-relations': { id: 'eloquent-relations', name: 'Relations', description: `Liaisons entre modèles (One-to-Many, Many-to-Many).` },
  'filament-pages': { id: 'filament-pages', name: 'Création de pages', description: `Génération de panels d'administration riches.` },
  'filament-sync': { id: 'filament-sync', name: 'Synchronisation avec la base de données', description: `Liaison directe des formulaires avec les Models.` },
  'php-typing': { id: 'php-typing', name: 'Typage', description: `Utilisation de types stricts et déclarations de retour en PHP moderne.` },
  'boot-modals': { id: 'boot-modals', name: 'Modals', description: `Boîtes de dialogue interactives.` },
  'boot-buttons': { id: 'boot-buttons', name: 'Boutons', description: `Composants d'action stylisés.` },
  'boot-forms': { id: 'boot-forms', name: 'Formulaires', description: `Saisies utilisateur structurées avec Bootstrap.` },
  'boot-dropdowns': { id: 'boot-dropdowns', name: 'Dropdowns / Menus déroulants', description: `Menus d'actions contextuels.` },
  'boot-icons': { id: 'boot-icons', name: 'Icônes', description: `Intégration de bibliothèques SVG.` },
  'boot-collapse': { id: 'boot-collapse', name: 'Collapse', description: `Éléments repliables.` },
  'boot-navbar': { id: 'boot-navbar', name: 'Navbar', description: `Barres de navigation adaptatives.` },
  'boot-text': { id: 'boot-text', name: 'Textes', description: `Utilitaires typographiques.` },

  // Notions Vue & Nuxt
  'vue-components': { id: 'vue-components', name: 'Composants Vuejs', description: 'Création de composants VueJs'},
  'vue-props': { id: 'vue-props', name: 'Props Vue.js', description: "Passage de valeurs dans un composant Vuejs."},
  '@nuxt/ui': { id: '@nuxt/ui', name: '@nuxt/ui', description: "Utilisation de la bibliothèque Nuxt de composants Vue UI."},
  'reactive-values': { id: 'reactive-values', name: 'Valeurs réactives', description: "Utilisation & compréhension du comportement des valeurs VueJs se mettant à jour en temps réel."},


  // Autres Notions
  'bug-monitoring': { id: 'bug-monitoring', name: 'Bug monitoring', description: `Détection et alertes automatiques en cas de crash.` },
  'sentry-debug': { id: 'sentry-debug', name: 'Debug', description: `Analyse de stacktraces détaillées en production.` },
  'android-bases': { id: 'android-bases', name: 'Développement d\'applications android (bases)', description: `Compréhension du cycle de vie d'une activité.` },
  'android-intents': { id: 'android-intents', name: "Intentions d'activité", description: `Compréhension des interactions entre les activités et les applications.` },
  'android-layouts': { id: 'android-layouts', name: "Layouts / composants graphiques", description: `Compréhension composants graphiques.` },
  'android-strings': { id: 'android-layouts', name: "Textes et traductions", description: `Compréhension des ressources de type texte et des traductions.` },
  'android-screens': { id: 'android-screens', name: "Écrans d'appareils", description: `Compréhension du fonctionnement de l'affichage sur différents écrans (densité de pixel, résolutions).` },
  'markdown': { id: 'markdown', name: "Maîtrise des markdowns", description: "Compréhension des markdowns et création d'un système de markdown" },
  'backlog': { id: 'backlog', name: 'Backlog', description: `Gestion de la liste des tâches à réaliser.` },
  'priority': { id: 'priority', name: 'Priority board', description: `Tableaux Kanban pour l'organisation de l'équipe.` },
  'figma-logos': { id: 'figma-logos', name: 'Logos', description: `Conception vectorielle d'identités visuelles.` },
  'visuels': { id: 'visuels', name: 'Conception de visuels graphiques simples', description: `Création de maquettes basiques.` },
  'decorators': { id: 'decorators', name: 'Décorateurs', description: "Ajout dynamique de comportements en préservant l'intégrité du code pour une classe ou une fonction." },
  'middlewares': { id: 'middlewares', name: 'Middlewares', description: "Code s'exécutant avant celui lié à chaque route"},
  
  // Linux / NixOs
  'zsh-config': { id: 'zsh-config', name: 'Config zsh', description: 'Configuration du shell zsh en déclaratif avec Nix.' },
  'packages-install': { id: 'packages-install', name: 'Gestion des paquets', description: 'Installation des paquets pour un utilisateur ou le système.'},
  'nvidia-drivers': { id:'nvidia-drivers', name: 'Config drivers GPU Nvidia', description: 'Configuration des drivers GPU nvidia déclarativement sur Nix (offload, prime, powerManagement, open drivers).'},
  'home-manager': {id: 'home-manager', name: 'Config home-manager', description: "Utilisation et configuration déclarative d'un home-manager Nix."},
  'desktop-manager': {id: 'desktop-manager', name: 'Config environnement de bureau', description: "Configuration d'environnement de bureaux comme Gnome et maintenant KDE déclarativement avec Nix."},
  'wayland': { id: 'wayland', name: 'Wayland', description: 'Utilisation de configuration déclarative de Wayland'},
  'dual-boot-config': {id: 'dual-boot-config', name: 'Config dual boot', description: "Configuration d'un dual boot Windows / Linux déclarativement avec Nix et gnome."},
  'firewall': { id: 'firewall', name: 'Configuration pare-feu', description: 'Apprentissage des configurations de pare-feu sur linux & configuration déclarative avec Nix.'},
  'firefox-config-declarative': { id: 'firefox-config-declarative', name: 'Config firefox déclarative', description: 'Configuration du navigateur Firefox en déclaratif avec Nix.'},
  'git-config-declarative': { id: 'git-config-declarative', name: 'Config Git déclarative', description: 'Configuration de Git en déclaratif avec Nix (nom, email, credentials).'},
  'vscode-config-declarative': { id: 'vscode-config-declarative', name: 'Config vscode déclarative', description: "Configuration de l'IDE Vscode en déclaratif (settings, extensions etc..)"},
  'nix-options-vars': { id: 'nix-options-vars', name: "Variables d'options Nix", description: 'Gestion de variables en Nix.'},
  'mounts': { id: 'mounts', name: 'Montage de partitions', description: "Montage de paritions sur Linux/Debian et NixOs."}

} 

// --- COMPÉTENCES (Renommées) ---
export const COMPETENCES: {[skillId: string]: Skill} = {
  'realiser-app': { id: 'realiser-app', title: "Réaliser un développement d'application", description: 'Développer des applications informatiques complexes.' },
  'optimiser': { id: 'optimiser', title: 'Optimiser des applications', description: 'Améliorer les performances et l\'algorithmique.' },
  'administrer': { id: 'administrer', title: "Administrer des systèmes", description: 'Configurer systèmes et réseaux.' },
  'gerer-donnees': { id: 'gerer-donnees', title: 'Gérer des données', description: 'Concevoir et exploiter des bases de données.' },
  'conduire-projet': { id: 'conduire-projet', title: 'Conduire un projet', description: 'Piloter un projet informatique.' },
  'collaborer': { id: 'collaborer', title: 'Travailler en équipe', description: 'Travailler en équipe de manière agile.' }
}

// --- FORMATIONS (Ajout de "formation-perso") ---
export const EDUCATIONS: {[educationId: string]: Education} = {
  'formation-perso': { 
    id: 'formation-perso', title: 'Formation Personnelle (Autodidacte)', entity: 'Projets Personnels', context: 'Autodidacte', 
    description: 'Apprentissage en autonomie guidé par la curiosité et la réalisation de projets concrets.', 
    contentPath: '/formations/formation-perso.md',
    competencies: [], tools: [], 
    projects: [],
  },
  'but-info': { 
    id: 'but-info', title: 'BUT Informatique', entity: 'Univ. Sorbonne Paris-Nord', context: 'Formation', 
    description: `Moyenne stabilisée à ~15/20. Chef d'équipe sur divers projets (Jeu d'échecs, algo graphes, BDD, config Linux, Site de colis).`, 
    contentPath: '/formations/but-info.md',
    longDescription: renderMarkdown(`Formation très technique et professionnalisante. Les nombreux travaux de groupe m'ont permis de développer mes soft-skills et mon leadership.`), 
    segmentations: {
      'S1': {
        name: 'S1',
        periode: '09/2024 - 12/2024',
        startTimestamp: 1725170400,
        type: 'Formation initiale',
      },
      'S2': {
        name: 'S2',
        periode: '01/2025 - 06/2025',
        startTimestamp: 1735714800, 
        type: 'Formation initiale',
        projects: [ { id: 'sae-echecs', description: "La consigne était de réaliser un jeu d'échec dans le terminal en Java tout en utilisant les notions vues en cours (Héritage, Polymorphisme etc...). Cliquez sur le projet pour en savoir plus." } ]
      },
      'S3': {
        name: 'S3',
        periode: '09/2025 - 12/2025',
        startTimestamp: 1756706400,
        type: 'Formation initiale',
        projects: [ { id: 'sae-suivi', description: "La consigne était de réaliser un site de suivi des colis pour l'IUT de Villetaneuse qui répond à un besoin réel, à partir de contraintes et d'exigences comme il peut y en avoir dans le monde professionnel. Cliquez sur le projet pour en savoir plus." } ]
      },
      'S4': {
        name: 'S4',
        periode: '01/2026 - 06/2026',
        startTimestamp: 1767250800,
        type: 'Formaition initiale',
        projects: [ { id: 'sae-suivi', description: "Puisque par manque de temps, la majorité des projets n'étaient pas terminés, la consigne était de reprendre un des projets du semestre 3, de l'analyser puis de le terminer ou de l'améliorer afin de nous habituer à la reprise de projets et aux changements d'environnement. Pour ma part, j'ai changé d'équipe mais j'ai repris le même projet que j'avais construit. Cliquez sur le projet pour en savoir plus." } ]
      },
      'S5': {
        name: 'S5',
        periode: '09/2026 - 12/2026',
        startTimestamp: 1788242400,
        type: 'Formation alternance (prévu)',
        projects: [],
      },
      'S6': {
        name: 'S6',
        periode: '01/2026 - 06/2026',
        startTimestamp: 1767250800,
        type: 'Formation alternance (prévu)',
        projects: [],
      }
    },
    
    tools: [
      { id: 'python', description: "Algorithmique avancée avec études de complexité, méthodes de tri et plus", conceptIds: ['complexite', 'code-to-db', 'escape', 'poo', 'classes', 'interfaces', 'poly', 'decorators'] },
      { id: 'flask', description: "Développement web en python", conceptIds: ['mvc', 'secu', 'code-to-db', 'escape', 'sessions', 'layouts', 'components', 'auth']},
      { id: 'matplotlib', description: "Visualisation de données en python", conceptIds: []},
      { id: 'pandas', description: 'Analyse et manipulation de données notamment statistiques', conceptIds: []},
      { id: 'java', description: "POO approfondie avec de l'héritage, du polymorphisme, du SOLID et des structures de qualité logicielle comme les observateurs et les observateurs", conceptIds: ['poo', 'poly', 'java-scanner', 'decorators'] },
      { id: 'javascript', description: "Javascript dans le DOM et avec Node.js, comprenant les subtilités du langage, l'asynchrone etc...", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'exceptions', 'loops']},
      { id: 'git', description: "Gestion du code source.", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-merges', 'git-conflicts'] },
      { id: 'nodejs', description: "Travail sur plusieurs technologies Node.js.", conceptIds: ['modules', 'fs'] },
      { id: 'regex', description: 'Regex en PostgreSQL et en Javascript.', conceptIds: [],  },
      { id: 'sql', description: 'SGBDR avec modélisaition, requêtes SQL, PostgreSQL et mariadb', conceptIds: ['db-model']},
      { id: 'androidstudio', description: "Création d'applications Android", conceptIds: ['poo']},
      { id: 'eclipse', description: 'Utilisation de Eclipse pour Java et utilisations des intégrations JUnit & JaCoCO', conceptIds: ['eclipse-libs']},
      { id: 'spring', description: 'Applications web en Java exploitant le fonctionnement global de SpringBoot', conceptIds: ['mvc']},
      { id: 'junit', description: 'Tests en Java', conceptIds: ['tests-unitaires', 'tests-fonctionnels']},
      { id: 'jacoco', description: 'Couverture de code pour les tests en Java', conceptIds: ['couverture-tests']},
      { id: 'mockmvc', description: "Tests d'intéractions HTTP en Java notamment pour les applications SpringBoot", conceptIds: ['tests-fonctionnels']},
      { id: 'linux', description: "Installation et configuration d'un poste Ubuntu ; travail sur Xubuntu durant le cursus ; travaux réseaux & systèmes sur debian", conceptIds: ['firewall', 'mounts', 'packages-install']},
      { id: 'node-fs', description: 'Exercices sur le module fs/promise', conceptIds: ['fs']},
      { id: 'express', description: "Exercices sur le fonctionnement de base", conceptIds: []},
      { id: 'vuejs', description: 'Exercices en profondeur sur le fonctionnement de base', conceptIds: ['reactive-values']},
    ],
    competencies: [
      { id: 'realiser-app', description: "Réalisation d'applications et formation orientée développement.",  },
      { id: 'optimiser', description: "Cours sur les optimisations, la sécurité et l'architecture logicielle.",  },
      { id: 'administrer', description: "Installation d'un poste Xubuntu et travaux en systèmes linux ainsi qu'en réseaux (ARP, DHCP, Ethernet, TCP/UDP, IPv4 & IPv6, CIDR, Pare-feu, DNS, VPN, NFS, NIS etc...",  },
      { id: 'gerer-donnees', description: "Travail sur la science de données avec de l'analyse de données, des bases de données SQL (SGBDR) et du traitement algorithmique des données.",  },
      { id: 'conduire-projet', description: "Cours de gestion de projets, de management SI & réalisaion de toutes les étapes de projets.",  },
      { id: 'collaborer', description: "Multitude de travaux en groupe pour des projets ou pour des ressources transversales.",  },
    ], 
    
  },
  'bac': { 
    id: 'bac', title: 'BAC Général (Maths, PC, SVT)', entity: 'Lycée', context: 'Diplôme', 
    contentPath: '/formations/bac.md',
    description: 'Apprentissage de la méthode scientifique en sciences et vie de la terre, bons résultats en mathématiques, certification PIX', 
    competencies: [], tools: [], projects: []
  }
}
// --- PROJETS ---
export const PROJECTS: {[projectId: string]: Project} = {
  'uno-disc': { 
    id: 'uno-disc', title: 'Jeu de UNO sur Discord (Non officiel)', context: 'Projet Perso', educationId: 'formation-perso', startDateTimesTamp: 1648219351000,
    description: 'Agent logiciel très complet sur la messagerie Discord pour jouer au UNO. Présent sur +1800 serveurs, +128 000 membres.', 
    longDescription: renderMarkdown(unoOnDiscContent), 
    github: 'privé', website: 'https://top.gg/bot/985152555791290408',
    competencies: [
      { id: 'realiser-app', description: "Développement d'un bot interactif.",  },
      { id: 'collaborer', description: "Utilisation des standards de développement à plusieurs.",  },
      { id: 'conduire-projet', description: "Maintenir un projet sur la durée.",  },
      { id: 'optimiser', description: "Optimisation de code pour gérer des milliers de serveurs simultanément.",  }
    ],
    tools: [
      { id: 'javascript', description: "Logique principale du bot.", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections'] },
      { id: 'nodejs', description: "Environnement d'exécution.", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs'] },
      { id: 'nodemon', description: "Outil de dev.", conceptIds: ['nodemon-restart'] },
      { id: 'node-canvas', description: "Génération dynamique des cartes visuelles.", conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'] },
      { id: 'figma', description: "Design des assets du jeu.", conceptIds: ['figma-logos', 'visuels'] },
      { id: 'typescript', description: "Migration vers du typage strict.", conceptIds: ['interfaces', 'classes', 'enums', 'typage'] },
      { id: 'vscode', description: "Environnement de développement.", conceptIds: [] },
      { id: 'discordjs', description: "Interaction avec l'API Discord.", conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'] },
      { id: 'sentry', description: "Suivi des erreurs en production.", conceptIds: ['bug-monitoring', 'sentry-debug'] },
      { id: 'git', description: "Gestion du code source.", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts'] },
      { id: 'regex', description: 'Système de recherche dans les logs via Regex', conceptIds: [], longDescription: "D'abord utilisé pour contracter des conditions avec plusieurs `startsWith` en une seul regex, jusqu'à ce que je découvre en réalisant de tests que l'ensemble de startsWith était bien souvent plus rapide qu'un RegEx qui est un outil plutôt lourd à l'échelle de quelques milisecondes" },
      { id: 'node-fs', description: "Écriture et sauvegarde de fichiers de logs", conceptIds: ['fs']}
    //   { id: 'githubactions', description: "Déploiement et tests continus.", conceptIds: [] }
    ], 

    medias: ['https://imgur.com/P0QFVBe.png', 'https://imgur.com/RiZV3YV.png', 'https://imgur.com/2ysW17Y.png', 'https://imgur.com/WrZsRzV.png'],
  },
  'mc-plugin': { 
    id: 'mc-plugin', title: 'Plugin Minecraft', context: 'Projet Perso', educationId: 'formation-perso',
    description: 'Gestion des permissions et zones sur serveur multijoueur. Configuration Yaml.', 
    startDateTimesTamp: 1577833200,
    longDescription: renderMarkdown(`Un projet développé lors de mes premières années de programmation, me permettant d'appréhender le fonctionnement d'un serveur de jeu, de son API publique et de la gestion de configurations personnalisées pour les administrateurs. Rendez-vous sur le github pour en savoir plus.`), 
    github: 'https://github.com/Nostres25/MinerstiaPlugin',  
    competencies: [
      { id: 'realiser-app', description: "Création d'un plugin utilitaire.",  }
    ],
    tools: [
      { id: 'eclipse', description: "Environnement de développement.", conceptIds: ['eclipse-libs'] },
      { id: 'java', description: "Apprentissage sur le tas du langage.", conceptIds: ['exceptions', 'poo', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums'] },
      { id: 'spigot', description: "API serveur Minecraft.", conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'] },
      { id: 'git', description: "Sauvegardes du projet.", conceptIds: ['git-commits', 'git-remote'] },
      { id: 'trello', description: "Organisation des fonctionnalités à développer en backlog et par version", conceptIds: [] }
    ],

    
  },
  'sae-echecs': { 
    id: 'sae-echecs', title: 'Jeu d\'échecs', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Développement d\'un jeu d\'échecs complet dans le terminal.', 
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations['S2'].startTimestamp,
    longDescription: renderMarkdown(`Création d'un jeu d'échecs dans complet en respectant les règles officielles (roque, prise en passant) et en implémentant une architecture stricte. Voir le github pour plus d'informations.`), 
    github: 'https://github.com/Nostres25/JavaChess', 
    competencies: [
      { id: 'realiser-app', description: "Logique métier des échecs.",  },
      { id: 'optimiser', description: "Optmisation de mémoire, des opérations et de l'aspect visuel du code.",  },
      { id: 'conduire-projet', description: "Création d'un nouveau projet de développement.", longDescription: "Respect des échéances, mise en place du Git, définition des tâches" },
      { id: 'collaborer', description: "Collaboration en duo.",  }

    ],
    tools: [
      { id: 'vscode', description: "IDE utilisé par l'équipe.", conceptIds: [] },
      { id: 'java', description: "Développement en Java 8.", conceptIds: ['exceptions', 'java-scanner', 'poo', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums'] },
      { id: 'git', description: "Collaboration de code.", conceptIds: ['git-commits', 'git-branches', 'git-merges', 'git-conflicts'] }
    ],

    
  },

  'sae-suivi': {
    id: 'sae-suivi', title: 'Suivi de colis', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Site web de suivi de colis pour l\'IUT.', 
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations['S3'].startTimestamp,
    longDescription: renderMarkdown(`Application web interne permettant la gestion logistique des colis reçus par le secrétariat de l'IUT et envoyant des notifications aux destinataires.`), 
    github: 'https://github.com/Nostres25/suivi-colis-iutv-v2', 
    competencies: [
      { id: 'realiser-app', description: "Création de la plateforme web complète.",  },
      { id: 'optimiser', description: "Optimisation de l'applciation pour la réactivité.",  },
      { id: 'administrer', description: "Mise en place d'une image docker pour l'application.",  },
      { id: 'gerer-donnees', description: "Modélisation des données, utilisations d'une base de données.",  },
      { id: 'conduire-projet', description: "Définition des tâches & objectifs, rappels de tâches, organisation du code...",  },
      { id: 'collaborer', description: "En équipe de 5, répartition des tâches & communication.",  },
    ],
    tools: [
      { id: 'laravel', description: "Framework Back-end.", conceptIds: ['mvc', 'migrations', 'laravel-pagination', 'seeders', 'laravel-query', 'laravel-files', 'auth', 'sessions', 'middlewares'] },
      { id: 'javascript', description: "Interactivité de l'interface.", conceptIds: ['dom', 'ajax', 'events', 'callbacks', 'loops', 'scopes'] },
      { id: 'bootstrap', description: "Design rapide et responsive.", conceptIds: ['boot-modals', 'boot-buttons', 'boot-forms', 'boot-dropdowns', 'boot-icons', 'responsive', 'boot-collapse', 'boot-navbar', 'boot-text'] },
      { id: 'blade', description: "Moteur de template.", conceptIds: ['layouts', 'components', 'escape', 'blade-directives'] },
      { id: 'php', description: "Logique métier.", conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo', 'typage'] },
      { id: 'eloquent', description: "ORM pour la base de données.", conceptIds: ['eloquent-models', 'code-to-db', 'laravel-query', 'collections', 'eloquent-relations', 'factories'] },
      { id: 'filamentphp', description: "Panneau d'administration.", conceptIds: ['filament-pages', 'filament-sync'] },
      { id: 'git', description: "Versioning en équipe.", conceptIds: ['git-commits', 'git-branches', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'] },
      { id: 'github-project', description: "Organisation des tâches.", conceptIds: ['backlog', 'priority', 'gh-sub'] },
      { id: 'composer', description: "Gestionnaire de packages PHP.", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'] },
      { id: 'phpstorm', description: "Meilleur IDE trouvé pour le PHP bien qu'un peu lourd", conceptIds: [] }
    ],
    softSkills: [
        { id: 'analyse', description: 'Analyse minutieuse du processus actuel de suivi de colis, des besoins de chaque acteur et des meilleurs outils à utiliser.' },
        { id: 'apprentissage-rapide', description: "Découverte sur le tas du développement Laravel, des migrations, des seeders, de Bootstrap et plus encore." },
        { id: 'bon-communicant', description: "Communication dans l'équipe en temps réel des horaires de travail, des changements architecturaux, de l'avancement de certains livrables etc..."},
        { id: 'curiosité', description: 'Curiosité qui a amené à choisir de nouveaux outils pour le projet.'},
        { id: 'esprit-initiative', description: "Prises d'initiatives pour l'organisation du projet (Github Project), pour la rédaction d'une documentation et pour poser plus de questions au demandeur afin de mieux répondre aux besoins."},
        { id: 'redaction-fr', description: "Rédaction d'une documentation pour l'organisation du projet, du github, pour l'installation de l'environnement de développement, le déploiement du projet et plus."},
        { id: 'esprit-critique', description: "Recul sur les choix du projet et analyse critique de la situation."}
    ],
    
  },
  'sae-python': { 
    id: 'sae-python', title: 'Étude de graphes', context: 'SAÉ BUT', educationId: 'but-info',
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations.S1.startTimestamp,
    description: 'Étude de réseaux et de complexité algorithmique.', github: '', 
    competencies: [{ id: 'optimiser', description: "Analyse des temps d'exécution.",  }],
    tools: [{ id: 'python', description: "Scripting d'analyse.", conceptIds: ['complexite'] }],
    
    
  },
  'sae-bd': { 
    id: 'sae-bd', title: 'Modélisation BD', context: 'SAÉ BUT', educationId: 'but-info', startDateTimesTamp: EDUCATIONS['but-info'].segmentations.S1.startTimestamp,
    description: 'Recueil des besoins, modélisation et construction de bases de données.', github: '', 
    competencies: [{ id: 'gerer-donnees', description: "Architecture de la BD.",  }],
    tools: [{ id: 'sql', description: "Requêtes de test.", conceptIds: ['db-model'] }],
    
    
  },
  'sae-sys': { 
    id: 'sae-sys', title: 'Configuration Ubuntu', context: 'SAÉ BUT', educationId: 'but-info',
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations.S2.startTimestamp,
    description: 'Configurations d\'un système Ubuntu (Linux) et réseaux (IPv4, DHCP, Pare-feux).', github: '', 
    competencies: [{ id: 'administrer', description: "Installation et configuration OS.",  }],
    tools: [{ id: 'linux', description: "Commandes terminal.", conceptIds: ['sys'] }],
    
    
  },

  'portfolio-web': {
    id: 'portfolio-web',
    title: 'Site portfolio',
    context: 'BUT',
    educationId: 'but-info', 
    github: 'https://github.com/Nostres25/soanmoreau.github.io',
    website: 'https://soanmoreau.vercel.app/',
    startDateTimesTamp: 1781647200,
    description: "Le site sur lequel vous êtes. Cela a été pour moi une nouvelle occasion de découvrir de nouveaux outils notamment en Javascript, d'où mon choix du framework Nuxt.js",
    longDescription: renderMarkdown(portfolioContent),

    competencies: [
      { id: 'realiser-app', description: "Réalisation de l'application du portfolio.",  },
      { id: 'optimiser', description: "Optimisation de l'applciation pour la réactivité.",  },
      { id: 'gerer-donnees', description: "Représentation des informations me concernant sous la forme de données dans le code.",  },
      { id: 'conduire-projet', description: "Définition des tâches et des priorités",  },    ],
    tools: [
      { id: 'javascript', description: "Logique principale du bot.", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'loops'] },
      { id: 'nodejs', description: "Environnement d'exécution.", conceptIds: ['modules', 'modules-dev'] },
      { id: 'nuxtjs', description: "Découverte du fonctionnement du framework Nuxt v4", conceptIds: ['@nuxt/ui', 'layouts', 'middlewares'] },
      { id: 'typescript', description: "Migration vers du typage strict.", conceptIds: ['interfaces', 'classes', 'enums', 'typage'] },
      { id: 'vscode', description: "Environnement de développement.", conceptIds: [] },
      { id: 'vuejs', description: "Vues en javascript avec layout, composants etc...", conceptIds: ['reactive-values', 'vue-props', 'vue-components'] },
      { id: 'git', description: "Gestion du code source.", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts'] },
      { id: 'tailwindcss', description: "Majorité du style de l'application", conceptIds: ['responsive']}
    ],
    
    medias:  []
  },

  'nixos-personal-system': {
    id: 'nixos-personal-system',
    title: 'Système personnel sous NixOs',
    context: 'Projet Perso',
    educationId: 'formation-perso', 
    github: 'https://github.com/Nostres25/nixos-config-system',
    startDateTimesTamp: 1752012000,
    description: "Mon propre système linux que j'utilise au quotidien utilisant la distribution NixOs et donc les paquets Nix avec une configuration déclarative.",
    longDescription: renderMarkdown(nixosSystemContent),

    competencies: [
      {id: 'administrer', description: 'Configuration système plus ou moins avancées en déclaratif (drivers, firewall, partitions etc...)'}
    ],
    tools: [
      { id: 'nixos', description: "Distribution linux utilisée pour une configuration déclarative & reproductible facilement avec la sécurité de pouvoir revenir en arrière facilement en cas d'échec de mise à jour",   conceptIds: ['zsh-config', 'packages-install', 'nvidia-drivers', 'home-manager', 'desktop-manager', 'wayland', 'dual-boot-config', 'firewall', 'firefox-config-declarative', 'vscode-config-declarative', 'git-config-declarative', 'nix-options-vars', 'mounts'] },
      { id: 'vscode', description: "IDE que j'utilise pour ma configuration Nix avec des extensions pour le style, les formateurs etc...", conceptIds: [] },

    ],
    
    medias:  []
  },

  'phone-replace-battery': {
    id: 'phone-replace-battery',
    title: "Remplacement de la batterie d'un smartphone (S22)",
    context: 'Projet Perso',
    educationId: 'formation-perso', 
    startDateTimesTamp: 1750197600,
    endDateTimestamp: 1750765860,
    github: '',
    description: "Suite au gonflement de la batterie d'un Samsung Galaxy S22 d'un membre de ma famille qui ne tenait plus la charge, j'ai proposé, sans experience, de la remplacer par moi-même.",
    longDescription: renderMarkdown(phoneBatteryReplacemenContent),
    competencies: [],
    tools: [],
    medias: ['images/projects/IMG-20250624-WA0000.jpg'],
    softSkills: [
      { id: 'curiosité', description: "Curiosité derrière la réalisabilité d'un tel projet."},
      { id: 'esprit-initiative', description: "Initiative de proposer une réparation manuelle, peu cher et sans expérience."},
    ],

  }
}

// --- EXPÉRIENCES ---
export const EXPERIENCES: {[experiencId: string]: Experience} = {
  'stage-mf': { 
    id: 'stage-mf', title: 'Stage développeur PHP front/back', entity: 'Market Factory', date: 'Janv 2026 - Mars 2026', github: 'privé',
    website: { label: "Voir le site vitrine de l'entreprise", url: 'https://market-factory.fr/'},
    startDateTimesTamp: 1769414400,
    endDateTimestamp: 1774022400,
    description: "Amélioration, correction et refonte du site back-office", 
    longDescription: renderMarkdown(stageMfContent), 
    
    competencies: [
      { id: 'realiser-app', description: "Refonte d'une application web PHP, améliorations, correction de failles de sécurité...",  },
      { id: 'optimiser', description: "Optimisation de requêtes HTTP/API, logique PHP, requêtes SQL...",  },
      { id: 'administrer', description: "Configuration Apache2, documentation du projet, définition de fichier .htaccess",  },
      { id: 'gerer-donnees', description: "Stockage des stocks toptex, enquête sur les schémas SQL, debug par requêtes SQL...",  },
      { id: 'conduire-projet', description: "Redéfinition de la structure du projet, documentation.",  },
      { id: 'collaborer', description: "retours réguliers au supérieur, communication des changements importants en temps réel...",  },
    ],
    tools: [
      // TODO à compléter (dom, javascript, jquery, ajax, composer "sources annexes")
      { id: 'php', description: "Refonte sans framework en PHP 8.3 traditionel", conceptIds: ['mvc', 'secu'] },
      { id: 'git', description: "Travail en équipe.", conceptIds: ['git-commits', 'versioning', 'git-branches'] },
      { id: 'css', description: "HTML/CSS des plus traditionnels, sans moteur de template", conceptIds: [] },
      { id: 'bootstrap', description: "Utilisation de classes bootstrap", conceptIds: [] },
      { id: 'javascript', description: "Affichages dynamiques via javascript", conceptIds: ['dom', 'ajax'] },
      { id: 'composer', description: "Mise en place de composer pour des outils de développement & installer les ressources ainsi que css", conceptIds: ['paquets-scripts', 'modules', 'modules-dev'] },

    ],
    softSkills: [
      { id: 'analyse', description: 'Analyse minutieuse du code existant, de son fonctionnement, du fonctionnement des API utilisées etc...' },
      { id: 'apprentissage-rapide', description: "Apprentissage sur le terrain en autonomie de la programmation PHP, les pratiques du langage et du projet." },
      { id: 'bon-communicant', description: "Comptes rendus régulier de mes avancées sur mes missions, aides et explications auprès de mes camarades stagiaires, multiples propositions d'améliorations orales"},
      { id: 'curiosité', description: "Curiosité qui m'a amené à explorer le code en profondeur afin d'y trouver des points d'amélioration."},
      { id: 'esprit-initiative', description: "Prise d'initiative concernant la recherche de failles de sécurités après être tombé sur une faille de sécurité majeur ce qui m'a permi de trouver 5 autres failles majeurs et pour proposer ainsi que réaliser une refonte du projet à partir notamment de principes de qualité de développement."},
      { id: 'redaction-fr', description: "Rédaction d'une documentation pour l'organisation du projet suite à la refonte."},
      { id: 'esprit-critique', description: "Recul sur les choix du projet et analyse critique du code."}
    ],
    medias: ['images/experiences/stage/stage-mf-overview-presentation.png', 'images/experiences/stage/stage-mf-missions.png', 'images/experiences/stage/stage-mf-rework.png']

    
  },
  'draftbot': { // TODO remplacer year par startDateTimesTamp ou un truc du genre comme le reste
    id: 'draftbot', title: 'Support utilisateur bénévole', entity: 'DraftBot', year: 2019, date: 'Depuis 2019', 
    website: 'https://draftbot.fr', 
    description: "Sous le pseudonyme Nostres, j'ai pu réaliser Tests, identification et résolution de problèmes, rédactions, modération et résolution de conflits. Agent présent sur +1M de serveurs.", 
    contentPath: '/experiences/draftbot.md',
    longDescription: renderMarkdown(`Mes missions au sein de [l'équipe DraftBot](https://draftbot.fr/equipe) incluaient la réalisation de tests, l'identification et la résolution de problèmes en direct avec la communauté. J'ai également identifié les besoins des utilisateurs en apportant des solutions cohérentes. En reconnaissance à ma contribution, les fondateurs m'ont rédigé une lettre de recommandation que je peux vous partager sur demande par mail.`), 
    competencies: [
      { id: 'collaborer', description: "Support aux développeurs.",  }
    ],
    tools: [
      { id: 'discordjs', description: "Compréhension de Discord et de l'API Discord et du module Discord.js pour mieux comprendre le fonctionnement du bot et mieux répondre aux utilisateurs.", conceptIds: []},
      { id: 'trello', description: "Tri des suggestions intéressantes pour l'amélioration du service par fonctionnalités", conceptIds: ['markdown']},
    ],
    softSkills: [
      { id: 'analyse', description: 'Analyse des fonctionnalités du projet, des problèmes utilisateurs, des bugs, des solutions possibles, et des besoins utilisateurs.' },
      { id: 'apprentissage-rapide', description: "Apprentissage sur le terrain du fonctionnement de l'équipe, de l'assistance, des règles et plus." },
      { id: 'bon-communicant', description: "Retours constructifs sur les problèmes récurrents, les suggestions récurrentes d'utilisateurs, signalement des problèmes à l'équipe de développementn entraide entre aidants."},
      { id: 'curiosité', description: "Curiosité qui motive à chercher la source d'un problème étrange ainsi qu'une solution, curiosité également derrière les différentes approches de médiation pour trouver les plus efficaces."},
      { id: 'esprit-initiative', description: "Prise en charge de demandes d'aide en attente depuis trop longtemps, prise d'initiative concernant le tri des suggestions et le fait de remonter des informations utiles etc..."},
      { id: 'redaction-fr', description: "Rédaction d'explications sur les problèmes, de messages explicatifs sur la situation et les règles en modération, participation à la rédaction de tutos pour les utilisateurs et de l'ancienne documentation."},
      { id: 'esprit-critique', description: "Recul derrière les choix en modération, sur les choses à dire ou non, sur les réactions à avoir, les sanctions adéquates etc..."},
      { id: 'mediation', description: "Dans la modération depuis août 2021, visant à régler les conflits et à faire respecter un règlement ainsi que le respect dans les canaux de discussions."}
    ],

    
  }
}

const currentDate = Date.now();

// --- OUTILS ---
// Index de maîtrise (0 = Notions, 1 = Découverte, 2 = Maîtrise globale, 3 = Assez avancée, 4 = Avancée, 5 = Très avancée)
export const TOOLS: {[toolId: string]: Tool} = {
  // Langages & Frameworks JS/TS
  javascript: { id: 'javascript', name: 'JavaScript', icon: 'JS', realIcon: 'material-icon-theme:javascript', masteryIndex: 4, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections', 'dom', 'ajax'], compIds: ['realiser-app'] },
  typescript: { id: 'typescript', name: 'TypeScript', icon: 'TS', realIcon: 'material-icon-theme:typescript', masteryIndex: 3, duration: getYearsFormatted(1660341600, currentDate), conceptIds: ['typage', 'poo', 'interfaces', 'classes', 'enums'], compIds: ['realiser-app'] }, // preuve pour la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno/?since=2021-10-13&until=2023-02-28
  nodejs: { id: 'nodejs', name: 'Node.js', icon: 'N', realIcon: 'material-icon-theme:nodejs', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs'], compIds: ['realiser-app', 'optimiser'] },
  express: { id: 'express', name: 'Express.js', icon: 'Ex', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
  discordjs: { id: 'discordjs', name: 'Discord.js', icon: 'Djs', realIcon: 'skill-icons:discordjs-dark', masteryIndex: 4, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'], compIds: ['realiser-app', 'optimiser'] },
  nuxtjs: { id: 'nuxtjs', name: 'Nuxt.js', icon: 'Nx', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: ['@nuxt/ui', 'layouts', 'middlewares'], compIds: ['realiser-app'] },
  vuejs: { id: 'vuejs', name: 'Vue.js', icon: 'V', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: ['reactive-values', 'vue-props', 'vue-components'], compIds: ['realiser-app', 'optimiser'] },
  
  // Outils & Libs Node
  'node-fs': { id: 'node-fs', name: 'node fs', icon: 'fs', realIcon: 'material-icon-theme:folder-node-open', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['fs'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] },
  nodemon: { id: 'nodemon', name: 'nodemon', icon: 'nd', masteryIndex: 2, duration: getYearsFormatted(1753308000, currentDate), conceptIds: ['nodemon-restart'], compIds: ['realiser-app'] }, // Preuve de la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno?after=56b7655c3d7eb1b82d9fd7dbbea86c5212645ccf+34
  'node-canvas': { id: 'node-canvas', name: 'node canvas', icon: 'cv', realIcon: 'devicon:npm-wordmark', masteryIndex: 1, duration: getYearsFormatted(1692828000, currentDate), conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'], compIds: ['realiser-app'] }, // Preuve pour la date : https://github.com/DraftBot/DraftBot-uno/commit/adc9a552a6af32b83b1a530c78c5cb95b455c5a3

  // Écosystème PHP
  php: { id: 'php', name: 'PHP', icon: 'PHP', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo'], compIds: ['realiser-app'] },
  laravel: { id: 'laravel', name: 'Laravel', icon: 'Lv', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['mvc', 'migrations', 'laravel-pagination', 'seeders', 'laravel-query', 'laravel-files', 'auth', 'sessions', 'middlewares'], compIds: ['realiser-app', 'optimiser'] },
  blade: { id: 'blade', name: 'Blade', icon: 'Bl', realIcon: 'devicon:laravel', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['layouts', 'components', 'escape', 'blade-directives'], compIds: ['realiser-app', 'optimiser'] },
  eloquent: { id: 'eloquent', name: 'Eloquent ORM', realIcon: 'devicon:laravel', icon: 'El', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['eloquent-models', 'code-to-db', 'eloquent-relations', 'collections', 'factories'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] },
  filamentphp: { id: 'filamentphp', name: 'Filament', icon: 'Fm', masteryIndex: 1, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['filament-pages', 'filament-sync'], compIds: ['realiser-app', 'gerer-donnees'] },
  composer: { id: 'composer', name: 'Composer', icon: 'Cp', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'], compIds: ['administrer'] }, // Concepts partagés avec Node (packages)

  // Écosystème Java 
  java: { id: 'java', name: 'Java', icon: 'J', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['poo', 'exceptions', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums', 'java-scanner', 'decorators'], compIds: ['realiser-app'] },
  spigot: { id: 'spigot', name: 'Spigot MC', icon: 'Spi', realIcon: 'simple-icons:spigotmc', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'], compIds: ['realiser-app', 'optimiser', 'administrer'] },
  junit: { id: 'junit', name: 'JUnit 4 & 5', icon: 'Ju', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['tests-unitaires', 'tests-fonctionnels'], compIds: ['realiser-app', 'optimiser']},
  jacoco: { id: 'jacoco', name: 'JaCoCo', icon: 'JaCo', realIcon: 'devicon:java', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['couverture-tests'], compIds: ['realiser-app', 'optimiser']},
  mockmvc: { id: 'mockmvc', name: 'MockMVC', icon: 'Mock', realIcon: 'devicon:spring', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['tests-fonctionnels'], compIds: ['realiser-app', 'optimiser']},
  spring: { id: 'spring', name: 'SpringBoot', icon: 'SpBo', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['mvc'], compIds: ['realiser-app']},

  // Front-End (HTML/CSS)
  css: { id: 'css', name: 'CSS', icon: 'CSS', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
  bootstrap: { id: 'bootstrap', name: 'Bootstrap', icon: 'Bs', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['boot-modals', 'boot-buttons', 'boot-forms', 'boot-dropdowns', 'boot-icons', 'responsive', 'boot-collapse', 'boot-navbar', 'boot-text'], compIds: ['realiser-app'] },
  tailwindcss: { id: 'tailwindcss', name: 'Tailwind CSS', icon: 'Tw', masteryIndex: 1, duration: getYearsFormatted(PROJECTS['portfolio-web'].startDateTimesTamp, currentDate), conceptIds: ['responsive'], compIds: ['realiser-app'] },
  figma: { id: 'figma', name: 'Figma', icon: 'Fg', masteryIndex: 2, duration: getYearsFormatted(1672527600, currentDate), conceptIds: ['figma-logos', 'visuels'], compIds: ['realiser-app'] },

  // Python
  python: { id: 'python', name: 'Python', icon: 'Py', masteryIndex: 3, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: ['complexite', 'typage', 'poo', 'interfaces', 'code-to-db', 'decorators'], compIds: ['optimiser', 'realiser-app'] },
  flask: { id: 'flask', name: 'Flask', icon: 'Fl', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S3.startTimestamp, currentDate), conceptIds: ['mvc'], compIds: ['realiser-app'] },
  matplotlib: {id: 'matplotlib', name: 'Matplotlib', icon: 'MPL', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: [], compIds: ['gerer-donnees']},
  pandas: { id: 'pandas', name: 'Pandas lib', icon: 'Pan', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2?.startTimestamp, currentDate), conceptIds: [], compIds: ['gerer-donnees']},

  // Base de données & Infrastructure
  sql: { id: 'sql', name: 'SQL / SGBDR', icon: 'DB', realIcon: 'devicon:sqldeveloper', masteryIndex: 3, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: ['db-model'], compIds: ['gerer-donnees'] },
  linux: { id: 'linux', name: 'Linux / Bash', icon: 'L', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['sys', 'firewall', 'mounts', 'packages-install'], compIds: ['administrer'] },
  nixos: { id: 'nixos', name: 'NixOS', icon: 'Nix', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['nixos-personal-system'].startDateTimesTamp, currentDate), conceptIds: ['zsh-config', 'packages-install', 'nvidia-drivers', 'home-manager', 'desktop-manager', 'wayland', 'dual-boot-config', 'firewall', 'firefox-config-declarative', 'vscode-config-declarative', 'git-config-declarative', 'nix-options-vars', 'mounts'], compIds: ['administrer'] },
  docker: { id: 'docker', name: 'Docker', icon: 'D', masteryIndex: 2, duration: getYearsFormatted(1660341600, currentDate), conceptIds: ['conteneur'], compIds: ['administrer'] },

  // Outils de gestion & IDE
  vscode: { id: 'vscode', name: 'Visual Studio Code', icon: 'VS', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'collaborer'] },
  eclipse: { id: 'eclipse', name: 'Eclipse IDE', icon: 'Ec', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['eclipse-libs'], compIds: ['realiser-app'] },
  'androidstudio': { id: 'androidstudio', name: 'Android Studio', icon: 'AS', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['android-bases'], compIds: ['realiser-app'] },
  'phpstorm': { id: 'phpstorm', name: 'PHP Storm IDE', icon: 'PS', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'collaborer']},

  // Collaboration & DevOps
  git: { id: 'git', name: 'Git', icon: 'G', masteryIndex: 3, duration: getYearsFormatted(1610578800, currentDate), conceptIds: ['versioning', 'git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'], compIds: ['collaborer', 'conduire-projet'] }, // Preuve de la date : premier repo github (ScandiumPlugin)
  'githubactions': { id: 'githubactions', name: 'GitHub Actions (CI/CD)', icon: 'GA', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: [], compIds: ['administrer', 'realiser-app'] },
  'github-project': { id: 'github-project', name: 'GitHub Project', icon: 'GP', realIcon: 'codicon:github-project', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['backlog', 'priority', 'gh-sub'], compIds: ['conduire-projet', 'collaborer'] },
  trello: { id: 'trello', name: 'Trello', icon: 'Tr', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['markdown', 'backlog', 'priority'], compIds: ['conduire-projet', 'collaborer'] },
  sentry: { id: 'sentry', name: 'Sentry', icon: 'Se', masteryIndex: 1, duration: getYearsFormatted(1688335200, currentDate), conceptIds: ['bug-monitoring', 'sentry-debug'], compIds: ['optimiser', 'conduire-projet', 'administrer'] }, // Preuve de la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno/?before=56b7655c3d7eb1b82d9fd7dbbea86c5212645ccf+350
  'open-project': { id: 'open-project', name: 'Open Project', icon: 'OP', realIcon: 'selfhst:openproject', duration: 'Non pratiqué', masteryIndex: 0, conceptIds: ['priority', 'backlog'], compIds: ['conduire-projet']},

  // Divers
  regex: { id: 'regex', name: 'RegEx', icon: 'RE', realIcon: 'skill-icons:regex-light', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'optimiser']},
  'ia-gen': { id: 'ia-gen', name: 'IA Génératives', realIcon: 'hugeicons:artificial-intelligence-04', icon: 'IA', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
}

export const SOFT_SKILLS = {
  'analyse': { id: "analyse", name: "Esprit d'analyse", description: "Analyse de problèmes, de besoins, debug et retours constructifs." },
  'curiosité': { id: 'curiosité', name: 'Curiosité', description: "En quête de découvertes et d'apprentissage." },
  "esprit-initiative": {id: 'esprit-initiative', name: "Esprit d'intiative", description: "Prises d'initatives pour proposer des solutions à des problèmes."},
  'apprentissage-rapide': {id: 'apprentissage-rapide', name: "Apprentissage rapide", description: "Tendance à apprendre rapidement et en autonomie" },
  'bon-communicant': { id: 'bon-communicant', name: 'Bon communicant', description: "Tendance à communiquer un maximum d'informations, à conseiller, à proposer et à informer" },
  'esprit-critique': { id: 'esprit-critique', name: 'Esprit critique', description: "Recul et remise en questions de mon travail, mes connaissances et mes pensées." },
  'redaction-fr': { id: 'redaction-fr', name: 'Rédaction en français', description: "Beaucoup de rédaction dans l'asistance, le report de bugs, la modération médiatrice, rédaction de documentations et de rapports.", masteryIndex: 4}, // pour DraftBot expliquer comme quoi dans la modération il faut souvent expliquer des situations en prenant en compte tous les détails et dans l'assistance et le report de bugs il faut expliquer les problèmes de manière détaillé + documentation
  'mediation': { id: 'mediation', name: 'Médiation & résolution de conflits', description: 'Modération médiatrice.'},
}

// Timeline data...
export const TIMELINE_DATA = [
  { id: 'mc-plugin', modalType: 'project', type: 'pro', title: 'Plugin Minecraft', entity: 'Projet Perso', startDate: 'Jan 2020', endDate: 'Dec 2022', durationMonths: 36, isEvent: false, stemHeight: 90, textOffset: '-translate-x-[80%]' },
  { id: 'bac', modalType: 'education', type: 'edu', title: 'BAC Général', entity: 'Lycée', startDate: 'Sept 2021', endDate: 'Juin 2024', durationMonths: 33, isEvent: false, stemHeight: 40, textOffset: '-translate-x-1/2' },
  { id: 'uno-disc', modalType: 'project', type: 'pro', title: 'UnoOnDisc', entity: 'Projet Perso', startDate: 'Sept 2022', endDate: 'Présent', durationMonths: 46, isEvent: false, stemHeight: 40, textOffset: '-translate-x-[30%]' },
  { id: 'but-info', modalType: 'education', type: 'edu', title: 'BUT Informatique', entity: 'IUT Sorbonne P-N', startDate: 'Sept 2024', endDate: 'Juin 2027', durationMonths: 33, isEvent: false, stemHeight: 80, textOffset: '-translate-x-[60%]' },
  { id: 'stage-mf', modalType: 'experience', type: 'pro', title: 'Stage Dev PHP', entity: 'Market Factory', startDate: 'Jan 2026', endDate: 'Mars 2026', durationMonths: 3, isEvent: false, stemHeight: 110, textOffset: '-translate-x-[50%]' }
] 

export const PROJECT_IDS = Object.keys(PROJECTS) as ProjectId[];
export const EXPERIENCE_IDS = Object.keys(EXPERIENCES) as ExperienceId[];
export const EDUCATION_IDS = Object.keys(EDUCATIONS) as EducationId[];

export const TOOL_VALUES = Object.values(TOOLS).sort((tool1, tool2) => tool2.masteryIndex - tool1.masteryIndex);
export const PROJECT_VALUES = Object.values(PROJECTS);
export const EXPERIENCE_VALUES = Object.values(EXPERIENCES);
export const EDUCATION_VALUES = Object.values(EDUCATIONS);

const { openModal }= useModalManager()

export const SEARCH_GROUPS = ref<CommandPaletteGroup[]>([
  {
    id: 'tools',
    label: 'Outils techniques',
    items: TOOL_VALUES.map((tool) => ({ 
      label: tool.name,
      suffix: tool.compIds.map((skill) => COMPETENCES[skill]?.title).join(', '),
      icon: tool.realIcon || `devicon:${tool.id}`,
      id: tool.id,
      type: 'Compétences techniques / Hard skills',
      description: tool.conceptIds.map((concept) => CONCEPTS[concept].name).join(', '),
      onSelect() {
          openModal({ type: 'tool', id: tool.id })
        }
     }))
  },
  { // TODO ajouter les formations dans "experiences" qui devient donc "experiences et formations"
    id: 'experiences',
    label: 'Expériences',
    items: EXPERIENCE_VALUES.map((experience) => ({ 
      label: experience.entity,
      suffix: experience.title,
      icon: experience.icon,
      id: experience.id,
      tools: experience.tools.map((tool) => TOOLS[tool.id]?.name).join(', '),
      'academic-skills': experience.competencies.map((skill) => COMPETENCES[skill.id]?.title).join(', '),
      type: 'Expériences professionnelle',
      description: experience.description,
      onSelect() {
          openModal({ type: 'experience', id: experience.id })
        }
     }))
  },
  {
    id: 'projects',
    label: 'Projets & SAÉ',
    items: PROJECT_VALUES.map((project) => ({ 
      label: project.title,
      suffix: project.context,
      icon: project.icon,
      id: project.id,
      tools: project.tools.map((tool) => TOOLS[tool.id]?.name).join(', '),
      'academic-skills': project.competencies.map((skill) => COMPETENCES[skill.id]?.title).join(', '),
      type: 'Projets',
      description: project.description,
      onSelect() {
          openModal({ type: 'project', id: project.id })
        }
     }))
  },    
  {
    id: 'education',
    label: 'Formations et diplômes',
    items: EDUCATION_VALUES.map((education) => ({ 
      label: education.title,
      prefix: education.context,
      suffix: education.entity,
      icon: education.icon,
      id: education.id,
      tools: education.tools.map((tool) => TOOLS[tool.id]?.name).join(', '),
      'academic-skills': education.competencies.map((skill) => { console.log('blabla skill'); return COMPETENCES[skill.id]?.title }).join(', '),
      type: 'Formations et diplômes',
      description: education.description,
      onSelect() {
          openModal({ type: 'education', id: education.id })
        }
    }))
  },
  // {
  //   id: 'concepts',
  //   label: 'Notions - Compétences techniques / Hardskills',
  //   items: Object.values(CONCEPTS).map((concept) => ({
  //     label: concept.name,
  //     onSelect() {
  //         openModal({ type: 'concept', id: tool.id })
  //       }
  //    }))
  // }
])

console.log(`blabla js chargé en ${Date.now() - startDate}ms`)
