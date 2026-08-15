import { getYearsFormatted, useModalManager, renderMarkdown } from './usePortfolio'
import type { CommandPaletteGroup } from '@nuxt/ui'

import stageMfContent from '@/content/experiences/stage-mf.md?raw'
import unoOnDiscContent from '@/content/projects/uno-on-disc.md?raw'
import portfolioContent from '@/content/projects/portfolio.md?raw'
import nixosSystemContent from '@/content/projects/nixos-personal-system.md?raw'
import phoneBatteryReplacemenContent from '@/content/projects/phone-battery-replacement.md?raw'
import butInfoContent from '@/content/educations/but-info.md?raw'
import draftbotContent from '@/content/experiences/draftbot.md?raw'


const startDate = Date.now();

export type ProjectId = keyof typeof PROJECTS;
export type ConceptId = keyof typeof CONCEPTS;
export type SkillId = keyof typeof COMPETENCES;
export type ExperienceId = keyof typeof EXPERIENCES;
export type EducationId = keyof typeof EDUCATIONS;
export type ToolId = keyof typeof TOOLS;
export type SoftSkillsId = keyof typeof SOFT_SKILLS;
export type EntityId = ProjectId | EducationId | ExperienceId;

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
    id: string,
    name: string,
    description: string,
    entities: EntityIntegration[]
}

export interface Skill {
  id: string,
  title: string,
  description: string
}

export interface SkillIntegration {
  id: SkillId,
  description: string,
  longDescription?: string
}

export interface Education {
  id: string,
  title: string,
  description: string,
  entity: string, 
  context: string,
  longDescription?: string,
  competencies: SkillIntegration[],
  tools: ToolIntegration[],
  medias?: string[],
  projects?: ProjectIntegration[],
  segmentations?: {[segmentation: string]: {name: string, periode: string, startTimestamp: number, type: string, projects?: ProjectIntegration[], tools?: ToolIntegration[]}},
  softSkills?: SoftSkillIntegration[],
  website?: string | Website,
  icon?: string,
  ignoreForToolsUsages?: boolean,
}

export interface Project {
  id: string,
  title: string,
  context: string,
  educationId: string,
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
  id: string,
  description?: string, 
}

export interface Experience {
  id: string,
  title: string,
  entity: string,
  educationId: EducationId,
  date: string,
  github: string,
  startDateTimesTamp: number,
  endDateTimestamp?: number,
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
  id: string,
  name: string,
  icon: string,
  realIcon?: string,
  masteryIndex: number,
  duration: string,
  conceptIds: ConceptId[],
  compIds: SkillId[],
  entities: EntityIntegration[],
}

export interface ToolIntegration {
  id: ToolId,
  description: string,
  conceptIds: ConceptId[]
  longDescription?: string, // TODO currently not visible
  startDateTimestamp?: number
}

export interface SoftSkillIntegration {
  id: SoftSkillsId,
  description: string,
}

export type Entity = Project | Education | Experience

export interface EntityIntegration {
  type: 'project' | 'experience' | 'education', 
  id: string, 
  title: string, 
  startDateTimestamp: number
}
export interface Website {
  label: string,
  url: string,
}

// --- NOTIONS (Nouveau concept indépendant) ---
export const CONCEPTS = {
  // Notions générales & transverses
  'poo': { id: 'poo', name: 'Programmation Orientée Objet (POO)', description: `Paradigme de programmation basé sur le concept d'objets contenant des données et des méthodes.`, entities: [] as EntityIntegration[] },
  'complexite': { id: 'complexite', name: 'Complexité Algorithmique', description: `Évaluation des performances et de l'efficacité mathématique des algorithmes.`, entities: [] as EntityIntegration[] },
  'typage': { id: 'typage', name: 'Typage Strict', description: `Vérification forte et statique des types de données pour prévenir les erreurs.`, entities: [] as EntityIntegration[] },
  'mvc': { id: 'mvc', name: 'Architecture MVC', description: `Séparation du code en Modèle, Vue et Contrôleur pour une meilleure maintenabilité.`, entities: [] as EntityIntegration[] },
  'secu': { id: 'secu', name: 'Sécurité & Failles', description: `Identification, prévention et correction de vulnérabilités web.`, entities: [] as EntityIntegration[] },
  'conteneur': { id: 'conteneur', name: 'Conteneurisation', description: `Isolation d'applications avec leurs dépendances pour un déploiement uniforme.` , entities: [] as EntityIntegration[] },
  'versioning': { id: 'versioning', name: 'Versioning', description: `Gestion de l'historique et des versions du code source en équipe.` , entities: [] as EntityIntegration[] },
  'sys': { id: 'sys', name: 'Configuration Système', description: `Administration d'OS Linux et configuration des règles réseaux.` , entities: [] as EntityIntegration[] },
  'callbacks': { id: 'callbacks', name: 'Callbacks', description: `Utilisation de fonctions passées en arguments.` , entities: [] as EntityIntegration[] },
  'file-interacts' : { id: 'file-interacts', name: 'Lecture & Écriture de fichiers', description: 'Lecture et écriture de fichier en programmation', entities: [] as EntityIntegration[] },
  'conditions': { id: 'conditions', name: 'Conditions', description: 'Conditions en code ou en SQL (WHERE, HAVING, ON)', entities: [] as EntityIntegration[] },
  'custom-types': {id: 'db-custom-types', name: 'Types personnalisés', description: 'Définir des types personnalisés (SQL "CREATE TYPE"...)', entities: [] as EntityIntegration[] },

  // Notions gestion de données
  'db-combining-queries': { id: 'db-combining-queries', name: 'Opérations ensemblistes', description: "Utilisation d'opérations d'enssembles sur les requêtes SQL (UNION, INTERSECT, EXCEPT)", entities: [] as EntityIntegration[] },
  'db-group-agg-order': { id: 'db-group-agg-order', name: 'Groupement, aggrégations, tri', description: 'Utilisation des groupement (GROUP BY), des tri (ORDER BY) et des aggrégations (MAX, MIN, SUM, MOY, STRING_AGG...)', entities: [] as EntityIntegration[] },
  'db-views-cte': { id: 'db-views-cte', name: 'Vues et CTE', description: 'Utilisation de vues et de CTE pour préparer des raccourcis de requêtes.', entities: [] as EntityIntegration[] },
  'db-join': { id: 'db-join', name: 'Jointures SQL', description: 'Utilisation de jointures internes ou externes dans les requêtes SQL', entities: [] as EntityIntegration[] },
  'db-model': { id: 'db-model', name: 'Modélisation BD', description: `Conception de schémas relationnels (MCD/MLD) et intégrité des données.` , entities: [] as EntityIntegration[] },
  'json': {id: 'json', name: 'Utilisation de Json', description: 'Utilisation de la notation des objets javascript dans les langages de programmation et en SQL avec des SGBDR comme PostgreSQL', entities: [] as EntityIntegration[] },
  'normalisation': { id: 'normalisation', name: 'Normalisation (SQL)', description: 'Normes et conformité aux standards des bases de données SQL', entities: [] as EntityIntegration[] },
  'indexes': { id: 'indexes', name: 'Indexes & B-Tree', description: "Fonctionnement et utilisation des indexes ainsi que de l'algorithme des arbres B plus précisément.", entities: [] as EntityIntegration[] },
  'db-analyse': { id: 'db-analyse', name: 'Analyse de requêtes SQL', description: "Analyse de l'exécution requêtes SQL avec la clause EXPLAIN [ANALYSE]", entities: [] as EntityIntegration[] },

  // Systèmes / Algorithmes développés
  'perms': { id: 'perms', name: 'Système de permissions', description: `Gestion hiérarchique des droits des utilisateurs via des rôles, des conditions etc....` , entities: [] as EntityIntegration[] },
  'cmds': { id: 'cmds', name: 'Commandes', description: `Création de nouvelles commandes en jeu exécutables par des utilisateurs avec des arguments et des choix.` , entities: [] as EntityIntegration[] },
  'zone': { id: 'zone', name: 'Système de zone 3D', description: `Calculs vectoriels et délimitation géométrique dans l'espace en jeu.` , entities: [] as EntityIntegration[] },

  // Concepts complexes utilisés
  'migrations': { id: 'migrations', name: 'Migrations', description: `Versionning de la structure de base de données.` , entities: [] as EntityIntegration[] },
  'seeders': { id: 'seeders', name: 'Seeders', description: `Peuplement automatisé de données factices pour les tests ou de réelles données utiles en production pour le fonctionnement de l'application` , entities: [] as EntityIntegration[] },
  'factories': { id: 'factories', name: 'Factories', description: `Génération d'objets modèles à la volée pour les tests.` , entities: [] as EntityIntegration[] },
  'auth': { id: 'auth', name: 'Authentification', description: `Mise en place de systèmes de login sécurisé.` , entities: [] as EntityIntegration[] },
  'sessions': { id: 'sessions', name: 'Système de sessions', description: `Conservation de l'état utilisateur et d'autres données entre les requêtes HTTP.` , entities: [] as EntityIntegration[] },
  'layouts': { id: 'layouts', name: 'Bases/Layouts', description: `Création de squelettes de pages maîtres.` , entities: [] as EntityIntegration[] },
  'components': { id: 'components', name: 'Composants', description: `Morceaux d'interface réutilisables.` , entities: [] as EntityIntegration[] },
  'escape': { id: 'escape', name: 'Échappement', description: `Sécurisation automatique contre les failles XSS ou d'injections SQL.` , entities: [] as EntityIntegration[] },
  'code-to-db': { id: 'code-to-db', name: 'Interactions du code avec la BD', description: `CRUD via la logique métier.` , entities: [] as EntityIntegration[] },
  'responsive': { id: 'responsive', name: 'Responsive', description: `Adaptation du design via un système de grille fluide.` , entities: [] as EntityIntegration[] },

  // Notions de programmation
  'events': { id: 'events', name: 'Évènements', description: `Écoute et manipulation du cycle de vie événementiel d'une application.` , entities: [] as EntityIntegration[] },
  'scopes': { id: 'scopes', name: 'Portées (Scopes)', description: `Gestion fine de la visibilité des variables et des contextes d'exécution.` , entities: [] as EntityIntegration[] },
  'exceptions': { id: 'exceptions', name: 'Exceptions', description: `Capture et gestion des erreurs d'exécution via try/catch.` , entities: [] as EntityIntegration[] },
  'collections': { id: 'collections', name: 'Collections', description: `Manipulation de structures de données complexes (Map, Set, Arrays).` , entities: [] as EntityIntegration[] },
  'switch': { id: 'switch', name: 'Switch', description: `Structures conditionnelles multiples et optimisées.` , entities: [] as EntityIntegration[] },
  'loops': { id: 'loops', name: 'Boucles (for/while)', description: `Itération optimisée sur des ensembles de données.` , entities: [] as EntityIntegration[] },
  'interfaces': { id: 'interfaces', name: 'Interfaces', description: `Définition de contrats de données stricts.` , entities: [] as EntityIntegration[] },
  'classes': { id: 'classes', name: 'Classes', description: `Instanciation d'objets et encapsulation.` , entities: [] as EntityIntegration[] },
  'enums': { id: 'enums', name: 'Énumérations', description: `Définition de types contraints et listes de constantes.` , entities: [] as EntityIntegration[] },
  'modules': { id: 'modules', name: 'Modules', description: `Exportation et importation de logique isolée.` , entities: [] as EntityIntegration[] },
  'modules-dev': { id: 'modules-dev', name: 'Modules de développement', description: `Création d'environnements de tests automatisés.` , entities: [] as EntityIntegration[] },
  'paquets-scripts': { id: 'paquets-scripts', name: 'Scripts de gestionnaire de paquet', description: `Automatisation des tâches d'exécution et de build dans le package.json.` , entities: [] as EntityIntegration[] },
  'poly': { id: 'poly', name: 'Héritage et polymorphisme', description: `Concepts avancés de POO pour un code normalisé et réutilisable.` , entities: [] as EntityIntegration[] },
  'api-usage': { id: 'api-usage', name: "Interactions API", description: "Utilisation d'API en programmation et maîtriser les interactions.", entities: [] as EntityIntegration[] },
  'api-integrations': { id: 'api-integrations', name: "Développement d'API", description: "Création de points de terminaisons API pour transmettre des informations à un ou des services tiers.", entities: [] as EntityIntegration[] },
  // ça va avec MVC en soit, puis peut-être que model dans ce contexte c'est la même chose que classe
  //'models': { id: 'models', name: 'Models', description: `Logique métier et règles de l'application.` , entities: [] as EntityIntegration[] },

  // Notions de tests
  'tests-unitaires': { id: 'tests-unitaires', name: 'Tests unitaires', description: "Réalisation de tests unitaires visant à vérifier des fonctions précises du programme notamment avec des outils comme Junit", entities: [] as EntityIntegration[] },
  'tests-fonctionnels': { id: 'tests-fonctionnels', name: "Tests d'intégration", description: "Réalisation de tests fonctionnels pour les services et modules de l'application notamment grâce à des outils comme MockMVC en SpringBoot", entities: [] as EntityIntegration[] },
  'couverture-tests': { id: 'couverture-tests', name: 'Couverture de tests', description: "Couverture de tous les branchement du programme pour les tests notamment grâce à des outils adaptés comme JaCoCo", entities: [] as EntityIntegration[] },

  // Notions JavaScript / TypeScript
  'async': { id: 'async', name: 'Développement asynchrone', description: `Gestion des promesses, async/await et requêtes non bloquantes.` , entities: [] as EntityIntegration[] },
  'dom': { id: 'dom', name: 'Manipulation DOM', description: `Interaction directe avec l'arbre HTML du navigateur.` , entities: [] as EntityIntegration[] },
  'ajax': { id: 'ajax', name: 'AJAX', description: `Requêtes HTTP asynchrones côté client.` , entities: [] as EntityIntegration[] },

  // Notions Node.js & Écosystème JS
  'sharding': { id: 'sharding', name: 'Sharding', description: `Fragmentation de processus pour les applications à très grande échelle (bots Discord massivement utilisés).` , entities: [] as EntityIntegration[] },
  'fs': { id: 'fs', name: 'Interactions fichiers (fs)', description: `Lecture et écriture sur le système de fichiers du serveur en utilisant le module node-fs.` , entities: [] as EntityIntegration[] },
  'nodemon-restart': { id: 'nodemon-restart', name: 'Redémarrages après sauvegardes', description: `Environnement de développement avec hot-reloading.` , entities: [] as EntityIntegration[] },
  'canvas-2d': { id: 'canvas-2d', name: 'Contexte 2D', description: `Dessin et manipulation de pixels virtuels.` , entities: [] as EntityIntegration[] },
  'canvas-overlay': { id: 'canvas-overlay', name: 'Superposition d\'images', description: `Composition dynamique d'images multiples.` , entities: [] as EntityIntegration[] },
  'canvas-rotation': { id: 'canvas-rotation', name: 'Rotation d\'images', description: `Transformations géométriques sur des canvas.` , entities: [] as EntityIntegration[] },

  // Notions Discord.js
  'djs-slash': { id: 'djs-slash', name: 'Commandes Slash', description: `Intégration native des commandes dans l'interface Discord.` , entities: [] as EntityIntegration[] },
  'djs-components': { id: 'djs-components', name: 'Composants (Boutons, Sélecteurs)', description: `Création d'interfaces riches et interactives dans le chat.` , entities: [] as EntityIntegration[] },
  'djs-modals': { id: 'djs-modals', name: 'Modals', description: `Formulaires pop-up interactifs pour la saisie utilisateur.` , entities: [] as EntityIntegration[] },
  'djs-ephemeral': { id: 'djs-ephemeral', name: 'Messages éphémères', description: `Réponses privées visibles uniquement par l'utilisateur ciblé.` , entities: [] as EntityIntegration[] },
  'djs-cache': { id: 'djs-cache', name: 'Cache et sweepers', description: `Optimisation de la mémoire RAM en purgeant les données obsolètes.` , entities: [] as EntityIntegration[] },
  'djs-collectors': { id: 'djs-collectors', name: 'Component collectors', description: `Écoute et gestion de flux d'interactions en temps réel.` , entities: [] as EntityIntegration[] },

  // Notions Git / GitHub / CI
  'git-commits': { id: 'git-commits', name: 'Commits', description: `Sauvegardes atomiques de l'état du code source.` , entities: [] as EntityIntegration[] },
  'git-remote': { id: 'git-remote', name: 'Dépôt distant', description: `Synchronisation avec des serveurs comme GitHub.` , entities: [] as EntityIntegration[] },
  'git-branches': { id: 'git-branches', name: 'Branches', description: `Développement parallèle de fonctionnalités.` , entities: [] as EntityIntegration[] },
  'git-cherry': { id: 'git-cherry', name: 'Cherry picks', description: `Sélection et application de commits spécifiques d'une branche à une autre.` , entities: [] as EntityIntegration[] },
  'git-merges': { id: 'git-merges', name: 'Merges', description: `Fusion de différentes branches de développement.` , entities: [] as EntityIntegration[] },
  'git-conflicts': { id: 'git-conflicts', name: 'Résolution de conflits', description: `Gestion manuelle des collisions de code lors de fusions.` , entities: [] as EntityIntegration[] },
  'git-issues': { id: 'git-issues', name: 'Issues', description: `Suivi de bugs et suggestions de fonctionnalités.` , entities: [] as EntityIntegration[] },
  'git-pr': { id: 'git-pr', name: 'Pull Requests', description: `Proposition, revue et validation de code avant intégration.` , entities: [] as EntityIntegration[] },
  'gh-sub': { id: 'gh-sub', name: 'Sub-issues', description: `Découpage de tâches complexes en sous-tâches gérables.` , entities: [] as EntityIntegration[] },

  // Notions Java / Spigot / Eclipse
  'eclipse-libs': { id: 'eclipse-libs', name: 'Gestion des bibliothèques', description: `Ajout et configuration de dépendances externes (Build Path).` , entities: [] as EntityIntegration[] },
  'java-uml': { id: 'java-uml', name: 'UML (Modélisation)', description: `Conception architecturale via diagrammes de classes.` , entities: [] as EntityIntegration[] },
  'java-arraylist': { id: 'java-arraylist', name: 'ArrayList', description: `Utilisation de structures de données dynamiques.` , entities: [] as EntityIntegration[] },
  'java-scanner': { id: 'java-scanner', name: 'Scanner', description: `Lecture des entrées utilisateur en console.` , entities: [] as EntityIntegration[] },
  'spigot-yaml': { id: 'spigot-yaml', name: 'Configurations YAML', description: `Sauvegarde et lecture de données structurées.` , entities: [] as EntityIntegration[] },
  'spigot-events': { id: 'spigot-events', name: 'Manipulation d\'évènements', description: `Interception des actions en jeu (casser un bloc, se déplacer...).` , entities: [] as EntityIntegration[] },
  'spigot-gui': { id: 'spigot-gui', name: 'Chest GUI', description: `Création d'interfaces visuelles interactives avec des inventaires virtuels.` , entities: [] as EntityIntegration[] },
  'spigot-tools': { id: 'spigot-tools', name: 'Outils de gestion de joueurs', description: `Commandes utilitaires pour gérer les joueurs, leurs permissions, leurs rôles etc...` , entities: [] as EntityIntegration[] },
  'spigot-mod': { id: 'spigot-mod', name: 'Commandes de modération', description: `Outils administratifs pour gérer le serveur (sanctions etc...).` , entities: [] as EntityIntegration[] },
  'spigot-tab': { id: 'spigot-tab', name: 'Auto-complétion MC', description: `Suggestion dynamique d'arguments lors de la frappe pour des commandes (TabComplete).` , entities: [] as EntityIntegration[] },
  'spigot-groups': { id: 'spigot-groups', name: 'Système de groupes & personnalisation', description: `Création de rôles en jeu avec des caractéristiques uniques, des couleurs, un prefixe et des permissions assocées.` , entities: [] as EntityIntegration[] },

  // Notions Laravel / PHP / Bootstrap
  'laravel-pagination': { id: 'laravel-pagination', name: 'Pagination Laravel', description: `Découpage optimisé de vastes ensembles de résultats.` , entities: [] as EntityIntegration[] },
  'laravel-query': { id: 'laravel-query', name: 'Query builder', description: `Construction programmatique et sécurisée de requêtes SQL.` , entities: [] as EntityIntegration[] },
  'laravel-files': { id: 'laravel-files', name: 'Téléverssement et téléchargement de fichiers', description: `Gestion des uploads et des downloads de fichiers.` , entities: [] as EntityIntegration[] },
  'blade-directives': { id: 'blade-directives', name: 'Directives communes', description: `Instructions logiques directes (@if, @foreach) dans le HTML.` , entities: [] as EntityIntegration[] },
  'eloquent-models': { id: 'eloquent-models', name: 'Models Eloquent', description: `Représentation objet des tables de la base de données et CRUD via l'ORM.` , entities: [] as EntityIntegration[] },
  'eloquent-relations': { id: 'eloquent-relations', name: 'Relations', description: `Liaisons entre modèles (One-to-Many, Many-to-Many).` , entities: [] as EntityIntegration[] },
  'filament-pages': { id: 'filament-pages', name: 'Création de pages', description: `Génération de panels d'administration riches.` , entities: [] as EntityIntegration[] },
  'filament-sync': { id: 'filament-sync', name: 'Synchronisation avec la base de données', description: `Liaison directe des formulaires avec les Models.` , entities: [] as EntityIntegration[] },
  'php-typing': { id: 'php-typing', name: 'Typage', description: `Utilisation de types stricts et déclarations de retour en PHP moderne.` , entities: [] as EntityIntegration[] },
  'boot-modals': { id: 'boot-modals', name: 'Modals', description: `Boîtes de dialogue interactives.` , entities: [] as EntityIntegration[] },
  'boot-buttons': { id: 'boot-buttons', name: 'Boutons', description: `Composants d'action stylisés.` , entities: [] as EntityIntegration[] },
  'boot-forms': { id: 'boot-forms', name: 'Formulaires', description: `Saisies utilisateur structurées avec Bootstrap.` , entities: [] as EntityIntegration[] },
  'boot-dropdowns': { id: 'boot-dropdowns', name: 'Dropdowns / Menus déroulants', description: `Menus d'actions contextuels.` , entities: [] as EntityIntegration[] },
  'boot-icons': { id: 'boot-icons', name: 'Icônes', description: `Intégration de bibliothèques SVG.` , entities: [] as EntityIntegration[] },
  'boot-collapse': { id: 'boot-collapse', name: 'Collapse', description: `Éléments repliables.` , entities: [] as EntityIntegration[] },
  'boot-navbar': { id: 'boot-navbar', name: 'Navbar', description: `Barres de navigation adaptatives.` , entities: [] as EntityIntegration[] },
  'boot-text': { id: 'boot-text', name: 'Textes', description: `Utilitaires typographiques.` , entities: [] as EntityIntegration[] },

  // Notions Vue & Nuxt
  'vue-components': { id: 'vue-components', name: 'Composants Vuejs', description: 'Création de composants VueJs', entities: [] as EntityIntegration[] },
  'vue-props': { id: 'vue-props', name: 'Props Vue.js', description: "Passage de valeurs dans un composant Vuejs.", entities: [] as EntityIntegration[] },
  '@nuxt/ui': { id: '@nuxt/ui', name: '@nuxt/ui', description: "Utilisation de la bibliothèque Nuxt de composants Vue UI.", entities: [] as EntityIntegration[] },
  'reactive-values': { id: 'reactive-values', name: 'Valeurs réactives', description: "Utilisation & compréhension du comportement des valeurs VueJs se mettant à jour en temps réel.", entities: [] as EntityIntegration[] },


  // Autres Notions
  'bug-monitoring': { id: 'bug-monitoring', name: 'Bug monitoring', description: `Détection et alertes automatiques en cas de crash.` , entities: [] as EntityIntegration[] },
  'sentry-debug': { id: 'sentry-debug', name: 'Debug', description: `Analyse de stacktraces détaillées en production.` , entities: [] as EntityIntegration[] },
  'android-bases': { id: 'android-bases', name: 'Développement d\'applications android (bases)', description: `Compréhension du cycle de vie d'une activité.` , entities: [] as EntityIntegration[] },
  'android-intents': { id: 'android-intents', name: "Intentions d'activité", description: `Compréhension des interactions entre les activités et les applications.` , entities: [] as EntityIntegration[] },
  'android-layouts': { id: 'android-layouts', name: "Layouts / composants graphiques", description: `Compréhension composants graphiques.` , entities: [] as EntityIntegration[] },
  'android-strings': { id: 'android-layouts', name: "Textes et traductions", description: `Compréhension des ressources de type texte et des traductions.` , entities: [] as EntityIntegration[] },
  'android-screens': { id: 'android-screens', name: "Écrans d'appareils", description: `Compréhension du fonctionnement de l'affichage sur différents écrans (densité de pixel, résolutions).` , entities: [] as EntityIntegration[] },
  'markdown': { id: 'markdown', name: "Maîtrise des markdowns", description: "Compréhension des markdowns et création d'un système de markdown" , entities: [] as EntityIntegration[] },
  'backlog': { id: 'backlog', name: 'Backlog', description: `Gestion de la liste des tâches à réaliser.` , entities: [] as EntityIntegration[] },
  'priority': { id: 'priority', name: 'Priority board', description: `Tableaux Kanban pour l'organisation de l'équipe.` , entities: [] as EntityIntegration[] },
  'figma-logos': { id: 'figma-logos', name: 'Logos', description: `Conception vectorielle d'identités visuelles.` , entities: [] as EntityIntegration[] },
  'visuels': { id: 'visuels', name: 'Conception de visuels graphiques simples', description: `Création de maquettes basiques.` , entities: [] as EntityIntegration[] },
  'decorators': { id: 'decorators', name: 'Décorateurs', description: "Ajout dynamique de comportements en préservant l'intégrité du code pour une classe ou une fonction." , entities: [] as EntityIntegration[] },
  'middlewares': { id: 'middlewares', name: 'Middlewares', description: "Code s'exécutant avant celui lié à chaque route", entities: [] as EntityIntegration[] },
  
  // Linux / NixOs
  'zsh-config': { id: 'zsh-config', name: 'Config zsh', description: 'Configuration du shell zsh en déclaratif avec Nix.' , entities: [] as EntityIntegration[] },
  'packages-install': { id: 'packages-install', name: 'Gestion des paquets', description: 'Installation des paquets pour un utilisateur ou le système.', entities: [] as EntityIntegration[] },
  'nvidia-drivers': { id:'nvidia-drivers', name: 'Config drivers GPU Nvidia', description: 'Configuration des drivers GPU nvidia déclarativement sur Nix (offload, prime, powerManagement, open drivers).', entities: [] as EntityIntegration[] },
  'home-manager': {id: 'home-manager', name: 'Config home-manager', description: "Utilisation et configuration déclarative d'un home-manager Nix.", entities: [] as EntityIntegration[] },
  'desktop-manager': {id: 'desktop-manager', name: 'Config environnement de bureau', description: "Configuration d'environnement de bureaux comme Gnome et maintenant KDE déclarativement avec Nix.", entities: [] as EntityIntegration[] },
  'wayland': { id: 'wayland', name: 'Wayland', description: 'Utilisation de configuration déclarative de Wayland', entities: [] as EntityIntegration[] },
  'dual-boot-config': {id: 'dual-boot-config', name: 'Config dual boot', description: "Configuration d'un dual boot Windows / Linux déclarativement avec Nix et gnome.", entities: [] as EntityIntegration[] },
  'firewall': { id: 'firewall', name: 'Configuration pare-feu', description: 'Apprentissage des configurations de pare-feu sur linux & configuration déclarative avec Nix.', entities: [] as EntityIntegration[] },
  'firefox-config-declarative': { id: 'firefox-config-declarative', name: 'Config firefox déclarative', description: 'Configuration du navigateur Firefox en déclaratif avec Nix.', entities: [] as EntityIntegration[] },
  'git-config-declarative': { id: 'git-config-declarative', name: 'Config Git déclarative', description: 'Configuration de Git en déclaratif avec Nix (nom, email, credentials).', entities: [] as EntityIntegration[] },
  'vscode-config-declarative': { id: 'vscode-config-declarative', name: 'Config vscode déclarative', description: "Configuration de l'IDE Vscode en déclaratif (settings, extensions etc..)", entities: [] as EntityIntegration[] },
  'nix-options-vars': { id: 'nix-options-vars', name: "Variables d'options Nix", description: 'Gestion de variables en Nix.', entities: [] as EntityIntegration[] },
  'mounts': { id: 'mounts', name: 'Montage de partitions', description: "Montage de paritions sur Linux/Debian et NixOs.", entities: []}

} satisfies Record<string, Concept>

// --- COMPÉTENCES (Renommées) ---
export const COMPETENCES = {
  'realiser-app': { id: 'realiser-app', title: "Réaliser un développement d'application", description: 'Développer des applications informatiques complexes.' },
  'optimiser': { id: 'optimiser', title: 'Optimiser des applications', description: 'Améliorer les performances et l\'algorithmique.' },
  'administrer': { id: 'administrer', title: "Administrer des systèmes", description: 'Configurer systèmes et réseaux.' },
  'gerer-donnees': { id: 'gerer-donnees', title: 'Gérer des données', description: 'Concevoir et exploiter des bases de données.' },
  'conduire-projet': { id: 'conduire-projet', title: 'Conduire un projet', description: 'Piloter un projet informatique.' },
  'collaborer': { id: 'collaborer', title: 'Travailler en équipe', description: 'Travailler en équipe de manière agile.' }
} satisfies Record<string, Skill>

// --- FORMATIONS (Ajout de "formation-perso") ---
export const EDUCATIONS = {
  'formation-perso': { 
    id: 'formation-perso', title: 'Formation Personnelle (Autodidacte)', entity: 'Projets Personnels', context: 'Autodidacte', 
    ignoreForToolsUsages: true,
    description: "Apprentissage en autonomie guidé par mes projets personnels et ma curiosité. Toutes les compétences que vous trouverez ici sont celles que j'ai totalement ou en partie développées en autonomie et principalement avec des projets personnels.", 
    competencies: [] as SkillIntegration[],  tools: [] as ToolIntegration[], 
    projects: [] as ProjectIntegration[],
  },
  'but-info': { 
    id: 'but-info', title: 'BUT Informatique', entity: 'Univ. Sorbonne Paris-Nord', context: 'Formation', 
    description: `Moyenne stabilisée à ~15/20. Chef d'équipe sur divers projets (Jeu d'échecs, algo graphes, BDD, config Linux, Site de colis).`, 
    longDescription: renderMarkdown(butInfoContent), 
    segmentations: {
      'S1': {
        name: 'S1',
        periode: '09/2024 - 12/2024',
        startTimestamp: 1725170400000,
        type: 'Formation initiale',
        tools: [
          { id: 'python', description: "Algorithmique avancée avec études de complexité, méthodes de tri et plus", conceptIds: ['complexite', 'loops', 'exceptions', 'scopes', 'file-interacts'] },
          { id: 'regex', description: 'Expressions régulières en PostgreSQL.', conceptIds: [],  },
          { id: 'sql', description: 'SGBDR avec modélisaition, bases requêtes SQL, PostgreSQL', conceptIds: ['db-model', 'db-join', 'db-combining-queries', 'db-group-agg-order', 'conditions']}, // + "AS", CROSS JOIN,  
          { id: 'css', description: "Prise en main du HTML5 avec du HTML, CSS, du Js et des notions d'accessibilité", conceptIds: ['dom']},
          { id: 'vscode', description: "Utilisation de Visual Studio Code pour du HTML5 et Python", conceptIds: []},


        ],
        projects: [],
      },
      'S2': {
        name: 'S2',
        periode: '01/2025 - 06/2025',
        startTimestamp: 1735714800000, 
        type: 'Formation initiale',
        tools: [
          { id: 'python', description: "Utilisation de python pour des outils de manipulation de données et de statistiques", conceptIds: ['loops', 'exceptions', 'scopes', 'file-interacts'] },
          { id: 'matplotlib', description: "Visualisation de données en python", conceptIds: []},
          { id: 'pandas', description: 'Analyse et manipulation de données notamment statistiques', conceptIds: []},
          { id: 'java', description: "POO approfondie avec de l'héritage et du polymorphisme", conceptIds: ['poo', 'poly', 'java-scanner', 'decorators', 'classes', 'interfaces', 'exceptions', 'scopes'] },
          { id: 'javascript', description: "Javascript dans le DOM avec une ressource spécalisée sur le langage et le DOM", conceptIds: ['callbacks', 'events', 'scopes', 'exceptions', 'loops']},
          { id: 'git', description: "Utilisation de git par initiative dans les projets de groupe notés & introduction à git en fin de semestre.", conceptIds: ['git-commits'] },
          { id: 'regex', description: 'Expressions régulières en PostgreSQL.', conceptIds: [],  },
          { id: 'sql', description: 'SGBDR avec modélisaition, requêtes SQL, PostgreSQL et mariadb', conceptIds: ['db-model', 'db-join', 'db-views-cte', 'db-group-agg-order', 'db-combining-queries', 'conditions']},
          { id: 'eclipse', description: 'Utilisation de Eclipse pour Java et utilisations des intégrations JUnit & JaCoCO', conceptIds: ['eclipse-libs']},
          { id: 'junit', description: 'Tests en Java', conceptIds: ['tests-unitaires']},
          { id: 'jacoco', description: 'Couverture de code pour les tests en Java', conceptIds: ['couverture-tests']},
          { id: 'linux', description: "Installation et configuration d'un poste Ubuntu ; travail sur Xubuntu durant le cursus ; travaux réseaux & systèmes sur debian (configurations réseaux)", conceptIds: ['packages-install']}, // TODO à compléter avec les cours
        ],
        projects: [ { id: 'sae-echecs', description: "La consigne était de réaliser un jeu d'échec dans le terminal en Java tout en utilisant les notions vues en cours (Héritage, Polymorphisme etc...). Cliquez sur le projet pour en savoir plus." } ]
      },
      'S3': {
        name: 'S3',
        periode: '09/2025 - 12/2025',
        startTimestamp: 1756706400000,
        type: 'Formation initiale',
        tools: [
          { id: 'python', description: "Algorithmique avancée avec études de complexité, méthodes de tri et plus", conceptIds: ['code-to-db', 'escape', 'poo', 'classes', 'interfaces', 'poly', 'decorators', 'exceptions', 'loops', 'scopes', 'json' ] },
          { id: 'flask', description: "Développement web en python", conceptIds: ['mvc', 'secu', 'code-to-db', 'escape', 'sessions', 'layouts', 'components', 'auth']},
          { id: 'java', description: "POO approfondie avec de l'héritage, du polymorphisme, du SOLID et des structures de qualité logicielle comme les observateurs et les observateurs", conceptIds: ['poo', 'poly', 'classes', 'interfaces', 'decorators', 'exceptions', 'scopes'] },
          { id: 'javascript', description: "Utilisation dans le cadre du développement web : Javascript dans le DOM ", conceptIds: ['callbacks', 'events', 'scopes', 'loops']},
          { id: 'regex', description: 'Expressions régulières en PostgreSQL.', conceptIds: [],  },
          { id: 'sql', description: 'SGBDR avec modélisaition, requêtes SQL, PostgreSQL et mariadb', conceptIds: ['db-model', 'db-join', 'db-views-cte', 'db-group-agg-order', 'db-combining-queries', 'conditions', 'db-analyse', 'indexes']},
          { id: 'linux', description: "Travaux réseaux & systèmes sur debian (configurations réseaux)", conceptIds: ['firewall', 'packages-install']}, // TODO à compléter avec les cours


        ],
        projects: [ { id: 'sae-suivi', description: "La consigne était de réaliser un site de suivi des colis pour l'IUT de Villetaneuse qui répond à un besoin réel, à partir de contraintes et d'exigences comme il peut y en avoir dans le monde professionnel. Cliquez sur le projet pour en savoir plus." } ]
      },
      'S4': {
        name: 'S4',
        periode: '01/2026 - 06/2026',
        startTimestamp: 1767250800000,
        type: 'Formaition initiale',
        tools: [
          { id: 'java', description: "Principalement pour apprendre des outils de tests ou de développement web en Java", conceptIds: ['poo', 'poly', 'classes', 'interfaces', 'exceptions', 'scopes', 'file-interacts'] },
          { id: 'javascript', description: "Javascript dans le DOM et avec Node.js, comprenant les subtilités du langage, l'asynchrone etc... dans une ressource dédiée", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'exceptions', 'loops', 'api-usage']},
          { id: 'git', description: "Rappels sur git & introduction aux branches, aux pull requests & aux github actions", conceptIds: ['git-commits', 'git-branches', 'git-merges', 'git-conflicts', 'git-pr'] },
          { id: 'nodejs', description: "Travail sur plusieurs technologies Node.js.", conceptIds: ['modules', 'fs', 'file-interacts'] },
          { id: 'regex', description: 'Regex en PostgreSQL et en Javascript.', conceptIds: [],  },
          { id: 'sql', description: 'SGBDR avec modélisaition, requêtes SQL, PostgreSQL et mariadb', conceptIds: ['db-model', 'db-join', 'db-views-cte', 'db-group-agg-order', 'db-combining-queries', 'conditions', 'db-analyse', 'json', 'normalisation', 'custom-types']},
          { id: 'androidstudio', description: "Création d'applications Android", conceptIds: ['poo', 'android-bases', 'android-intents', 'android-layouts', 'android-screens', 'android-strings']},
          { id: 'spring', description: 'Applications web en Java exploitant le fonctionnement global de SpringBoot', conceptIds: ['mvc', 'api-usage']}, // TODO à compléter
          { id: 'junit', description: 'Tests en Java', conceptIds: ['tests-unitaires', 'tests-fonctionnels']},
          { id: 'jacoco', description: 'Couverture de code pour les tests en Java', conceptIds: ['couverture-tests']},
          { id: 'mockmvc', description: "Tests d'intéractions HTTP en Java notamment pour les applications SpringBoot (avec aussi mockito qui n'a rien à voir)", conceptIds: ['tests-fonctionnels']},
          { id: 'linux', description: "Travaux réseaux & systèmes sur debian (VPN, partitions, systèmes de fichiers, NFS & autres configurations réseaux)", conceptIds: ['mounts', 'packages-install']},
          { id: 'node-fs', description: 'Exercices sur le module fs/promise', conceptIds: ['fs']},
          { id: 'express', description: "Exercices sur le fonctionnement de base et création de points de terminaisons d'API", conceptIds: ['api-integrations', 'api-usage', 'json']},
          { id: 'vuejs', description: 'Exercices en profondeur sur le fonctionnement de base', conceptIds: ['reactive-values']},
        ],
        projects: [ { id: 'sae-suivi', description: "Puisque par manque de temps, la majorité des projets n'étaient pas terminés, la consigne était de reprendre un des projets du semestre 3, de l'analyser puis de le terminer ou de l'améliorer afin de nous habituer à la reprise de projets et aux changements d'environnement. Pour ma part, j'ai changé d'équipe mais j'ai repris le même projet que j'avais construit. Cliquez sur le projet pour en savoir plus." } ]
      },
      'S5': {
        name: 'S5',
        periode: '09/2026 - 12/2026',
        startTimestamp: 1788242400000,
        type: 'Formation alternance (prévu)',
        tools: [],
        projects: [],
      },
      'S6': {
        name: 'S6',
        periode: '01/2026 - 06/2026',
        startTimestamp: 1767250800000,
        type: 'Formation alternance (prévu)',
        tools: [],
        projects: [],
      }
    },
    
    tools: [
      { id: 'python', description: "Algorithmique avancée avec études de complexité, méthodes de tri et plus", conceptIds: ['complexite', 'code-to-db', 'escape', 'poo', 'classes', 'interfaces', 'poly', 'decorators', 'file-interacts', 'json'] },
      { id: 'flask', description: "Développement web en python", conceptIds: ['mvc', 'secu', 'code-to-db', 'escape', 'sessions', 'layouts', 'components', 'auth']},
      { id: 'matplotlib', description: "Visualisation de données en python", conceptIds: []},
      { id: 'pandas', description: 'Analyse et manipulation de données notamment statistiques', conceptIds: []},
      { id: 'java', description: "POO approfondie avec de l'héritage, du polymorphisme, du SOLID et des structures de qualité logicielle comme les observateurs et les observateurs", conceptIds: ['poo', 'poly', 'java-scanner', 'decorators', 'file-interacts'] },
      { id: 'javascript', description: "Javascript dans le DOM et avec Node.js, comprenant les subtilités du langage, l'asynchrone etc...", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'exceptions', 'loops', 'api-usage', 'json']},
      { id: 'git', description: "Gestion du code source.", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-merges', 'git-conflicts', 'git-pr'] },
      { id: 'nodejs', description: "Travail sur plusieurs technologies Node.js.", conceptIds: ['modules', 'fs', 'file-interacts'] },
      { id: 'regex', description: 'Regex en PostgreSQL et en Javascript.', conceptIds: [],  },
      { id: 'sql', description: 'SGBDR avec modélisaition, requêtes SQL, PostgreSQL et mariadb', conceptIds: ['db-model', 'conditions', 'db-combining-queries', 'db-join', 'db-views-cte', 'db-group-agg-order', 'db-analyse', 'indexes', 'indexes', 'json', 'normalisation', 'custom-types']},
      { id: 'androidstudio', description: "Création d'applications Android", conceptIds: ['poo', 'android-bases', 'android-intents', 'android-layouts', 'android-screens', 'android-strings']},
      { id: 'eclipse', description: 'Utilisation de Eclipse pour Java et utilisations des intégrations JUnit & JaCoCO', conceptIds: ['eclipse-libs']},
      { id: 'spring', description: 'Applications web en Java exploitant le fonctionnement global de SpringBoot', conceptIds: ['mvc', 'api-usage']},
      { id: 'junit', description: 'Tests en Java', conceptIds: ['tests-unitaires', 'tests-fonctionnels']},
      { id: 'jacoco', description: 'Couverture de code pour les tests en Java', conceptIds: ['couverture-tests']},
      { id: 'mockmvc', description: "Tests d'intéractions HTTP en Java notamment pour les applications SpringBoot", conceptIds: ['tests-fonctionnels']},
      { id: 'linux', description: "Installation et configuration d'un poste Ubuntu ; travail sur Xubuntu durant le cursus ; travaux réseaux & systèmes sur debian", conceptIds: ['firewall', 'mounts', 'packages-install']},
      { id: 'node-fs', description: 'Exercices sur le module fs/promise', conceptIds: ['fs']},
      { id: 'express', description: "Exercices sur le fonctionnement de base et création de points de terminaisons d'API", conceptIds: ['api-integrations', 'api-usage', 'json']},
      { id: 'vuejs', description: 'Exercices en profondeur sur le fonctionnement de base', conceptIds: ['reactive-values']},
      { id: 'css', description: "Prise en main du HTML5 avec du HTML, CSS, du Js et des notions d'accessibilité", conceptIds: ['dom']},
      { id: 'vscode', description: "Utilisation de Visual Studio Code pour du HTML5 et Python, Java, Flask", conceptIds: []},
    ] as ToolIntegration[],
    competencies: [
      { id: 'realiser-app', description: "Réalisation d'applications et formation orientée développement.",  },
      { id: 'optimiser', description: "Cours sur les optimisations, la sécurité et l'architecture logicielle.",  },
      { id: 'administrer', description: "Installation d'un poste Xubuntu et travaux en systèmes linux ainsi qu'en réseaux (ARP, DHCP, Ethernet, TCP/UDP, IPv4 & IPv6, CIDR, Pare-feu, DNS, VPN, NFS, NIS etc...",  },
      { id: 'gerer-donnees', description: "Travail sur la science de données avec de l'analyse de données, des bases de données SQL (SGBDR) et du traitement algorithmique des données.",  },
      { id: 'conduire-projet', description: "Cours de gestion de projets, de management SI & réalisaion de toutes les étapes de projets.",  },
      { id: 'collaborer', description: "Multitude de travaux en groupe pour des projets ou pour des ressources transversales.",  },
    ] as SkillIntegration[], 
    projects: [] as ProjectIntegration[],
    
  },
  'bac': { 
    id: 'bac', title: 'BAC Général (Maths, PC, SVT)', entity: 'Lycée', context: 'Diplôme', 
    description: 'Apprentissage de la méthode scientifique en sciences et vie de la terre, bons résultats en mathématiques, certification PIX', 
    competencies: [], tools: [], projects: []
  }
} satisfies Record<string, Education>
// --- PROJETS ---
export const PROJECTS = {

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
      { id: 'php', description: "Logique métier.", conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo', 'typage', 'json'] },
      { id: 'eloquent', description: "ORM pour la base de données.", conceptIds: ['eloquent-models', 'code-to-db', 'laravel-query', 'collections', 'eloquent-relations', 'factories'] },
      { id: 'filamentphp', description: "Panneau d'administration.", conceptIds: ['filament-pages', 'filament-sync'] },
      { id: 'git', description: "Versioning en équipe.", conceptIds: ['git-commits', 'git-branches', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'] },
      { id: 'github-project', description: "Organisation des tâches.", conceptIds: ['backlog', 'priority', 'gh-sub'] },
      { id: 'composer', description: "Gestionnaire de packages PHP.", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'] },
      { id: 'phpstorm', description: "Meilleur IDE trouvé pour le PHP bien qu'un peu lourd", conceptIds: [] },
      { id: 'sql', description: 'Modélisation SQL et debug avec des requêtes SQL', conceptIds: ['db-model', 'db-join', 'db-group-agg-order', 'db-combining-queries']}
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
      { id: 'javascript', description: "Logique principale du bot.", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections', 'json'] },
      { id: 'nodejs', description: "Environnement d'exécution.", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs', 'api-usage', 'file-interacts'] },
      { id: 'nodemon', description: "Outil de dev.", conceptIds: ['nodemon-restart'] },
      { id: 'node-canvas', description: "Génération dynamique des cartes visuelles.", conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'] },
      { id: 'figma', description: "Design des assets du jeu.", conceptIds: ['figma-logos', 'visuels'] },
      { id: 'typescript', description: "Migration vers du typage strict.", conceptIds: ['interfaces', 'classes', 'enums', 'typage'] },
      { id: 'vscode', description: "Environnement de développement.", conceptIds: [] },
      { id: 'discordjs', description: "Interaction avec l'API Discord.", conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'] },
      { id: 'sentry', description: "Suivi des erreurs en production.", conceptIds: ['bug-monitoring', 'sentry-debug'] },
      { id: 'git', description: "Gestion du code source.", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts'] },
      { id: 'regex', description: 'Système de recherche dans les logs via Regex', conceptIds: [], longDescription: "D'abord utilisé pour contracter des conditions avec plusieurs `startsWith` en une seul regex, jusqu'à ce que je découvre en réalisant de tests que l'ensemble de startsWith était bien souvent plus rapide qu'un RegEx qui est un outil plutôt lourd à l'échelle de quelques milisecondes" },
      { id: 'node-fs', description: "Écriture et sauvegarde de fichiers de logs", conceptIds: ['fs']},
      { id: 'docker', description: "Environnement de développement et de production avec application conteneurisée", conceptIds: ['conteneur']}

    //   { id: 'githubactions', description: "Déploiement et tests continus.", conceptIds: [] }
    ], 

    medias: ['https://imgur.com/P0QFVBe.png', 'https://imgur.com/RiZV3YV.png', 'https://imgur.com/2ysW17Y.png', 'https://imgur.com/WrZsRzV.png'],
  },
  'mc-plugin': { 
    id: 'mc-plugin', title: 'Plugin Minecraft', context: 'Projet Perso', educationId: 'formation-perso',
    description: 'Gestion des permissions et zones sur serveur multijoueur. Configuration Yaml.', 
    startDateTimesTamp: 1577833200000,
    longDescription: renderMarkdown(`Un projet développé lors de mes premières années de programmation, me permettant d'appréhender le fonctionnement d'un serveur de jeu, de son API publique et de la gestion de configurations personnalisées pour les administrateurs du serveur. Rendez-vous sur le github pour en savoir plus.`), 
    github: 'https://github.com/Nostres25/MinerstiaPlugin',  
    competencies: [
      { id: 'realiser-app', description: "Création d'un plugin utilitaire.",  }
    ],
    tools: [
      { id: 'eclipse', description: "Environnement de développement.", conceptIds: ['eclipse-libs'] },
      { id: 'java', description: "Apprentissage sur le tas du langage.", conceptIds: ['exceptions', 'poo', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums', 'file-interacts', 'classes' ] },
      { id: 'spigot', description: "API serveur Minecraft.", conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'] },
      { id: 'git', description: "Sauvegardes du projet.", conceptIds: ['git-commits', 'git-remote'] },
      { id: 'trello', description: "Organisation des fonctionnalités à développer en backlog et par version", conceptIds: ['backlog'] }
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

  'nixos-personal-system': {
    id: 'nixos-personal-system',
    title: 'Système personnel sous NixOs',
    context: 'Projet Perso',
    educationId: 'formation-perso', 
    github: 'https://github.com/Nostres25/nixos-config-system',
    startDateTimesTamp: 1752012000000,
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
    startDateTimesTamp: 1750197600000,
    endDateTimestamp: 1750765860000,
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

  },

  'portfolio-web': {
    id: 'portfolio-web',
    title: 'Site portfolio',
    context: 'BUT',
    educationId: 'formation-perso', 
    github: 'https://github.com/Nostres25/soanmoreau.github.io',
    website: 'https://soanmoreau.vercel.app/',
    startDateTimesTamp: 1781647200000,
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
} satisfies Record<string, Project>

// --- EXPÉRIENCES ---
export const EXPERIENCES: {[experiencId: string]: Experience} = {
  'stage-mf': { 
    id: 'stage-mf', title: 'Stage développeur PHP front/back', entity: 'Market Factory', date: 'Janv 2026 - Mars 2026', github: 'privé',
    website: { label: "Voir le site vitrine de l'entreprise", url: 'https://market-factory.fr/'},
    startDateTimesTamp: 1769414400000,
    educationId: 'formation-perso',
    endDateTimestamp: 1774022400000,
    description: "Amélioration, correction et refonte du site back-office de l'entreprise.", 
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
      { id: 'php', description: "Refonte sans framework en PHP 8.3 traditionel", conceptIds: ['mvc', 'secu', 'code-to-db', 'api-integrations', 'api-usage', 'json'] },
      { id: 'git', description: "Travail en équipe.", conceptIds: ['git-commits', 'versioning', 'git-branches'] },
      { id: 'sql', description: 'Interactions avec la base de données en PHP grâce à PDO Mysql et requêtes SQL de debug', conceptIds: ['db-join', 'db-group-agg-order', 'db-combining-queries', 'conditions']},  
      { id: 'css', description: "HTML/CSS des plus traditionnels, sans moteur de template", conceptIds: [] },
      { id: 'bootstrap', description: "Utilisation de classes bootstrap", conceptIds: [] },
      { id: 'javascript', description: "Affichages dynamiques via javascript", conceptIds: ['dom', 'ajax', 'json'] },
      { id: 'composer', description: "Mise en place de composer pour des outils de développement & installer les ressources ainsi que css", conceptIds: ['paquets-scripts', 'modules', 'modules-dev'] },
    ],
    softSkills: [
      { id: 'analyse', description: 'Analyse minutieuse du code existant, de son fonctionnement, du fonctionnement des API utilisées etc...' },
      { id: 'apprentissage-rapide', description: "Apprentissage sur le terrain en autonomie de la programmation PHP, les pratiques du langage et du projet." },
      { id: 'bon-communicant', description: "Comptes rendus régulier de mes avancées sur mes missions, aides et explications auprès de mes camarades stagiaires, multiples propositions d'améliorations orales"},
      { id: 'curiosité', description: "Curiosité qui m'a amené à explorer le code en profondeur afin d'y trouver des points d'amélioration."},
      { id: 'esprit-initiative', description: "Prise d'initiative concernant la recherche de failles de sécurités après être tombé sur une faille de sécurité majeur ce qui m'a permis de trouver 5 autres failles majeurs et pour proposer ainsi que réaliser une refonte du projet à partir notamment de principes de qualité de développement."},
      { id: 'redaction-fr', description: "Rédaction d'une documentation pour l'organisation du projet suite à la refonte."},
      { id: 'esprit-critique', description: "Recul sur les choix du projet et analyse critique du code."}
    ],
    medias: ['images/experiences/stage/stage-mf-overview-presentation.png', 'images/experiences/stage/stage-mf-missions.png', 'images/experiences/stage/stage-mf-rework.png']

    
  },
  'draftbot': { // TODO remplacer year par startDateTimesTamp ou un truc du genre comme le reste
    id: 'draftbot', title: 'Support utilisateur bénévole', entity: 'DraftBot', date: 'Depuis 2019',
    website: 'https://draftbot.fr', github: '', startDateTimesTamp: 1567355460000,
    educationId: 'formation-perso',
    description: "Contribution bénévole et membre de l'équipe sur le support de l'agrent logiciel DraftBot permettant de gérer des espaces communautaires sur la plateforme Discord. Sous le pseudonyme Nostres, j'ai pu réaliser Tests, identification et résolution de problèmes, rédactions, modération et résolution de conflits. DraftBot est présent sur +1M de serveurs.", 
    longDescription: renderMarkdown(draftbotContent), 
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
} satisfies Record<string, Experience>

const currentDate = Date.now();

// --- OUTILS ---
// Index de maîtrise (0 = Notions, 1 = Découverte, 2 = Maîtrise globale, 3 = Assez avancée, 4 = Avancée, 5 = Très avancée)
export const TOOLS: {[toolId: string]: Tool} = {
  // Langages & Frameworks JS/TS
  javascript: { id: 'javascript', name: 'JavaScript', icon: 'JS', realIcon: 'material-icon-theme:javascript', masteryIndex: 4, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections', 'dom', 'ajax', 'json'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  typescript: { id: 'typescript', name: 'TypeScript', icon: 'TS', realIcon: 'material-icon-theme:typescript', masteryIndex: 3, duration: getYearsFormatted(1660341600, currentDate), conceptIds: ['typage', 'poo', 'interfaces', 'classes', 'enums'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] }, // preuve pour la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno/?since=2021-10-13&until=2023-02-28
  nodejs: { id: 'nodejs', name: 'Node.js', icon: 'N', realIcon: 'material-icon-theme:nodejs', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs'], compIds: ['realiser-app', 'optimiser'] , entities: [] as EntityIntegration[] },
  express: { id: 'express', name: 'Express.js', icon: 'Ex', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: ['api-integrations', 'json'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  discordjs: { id: 'discordjs', name: 'Discord.js', icon: 'Djs', realIcon: 'skill-icons:discordjs-dark', masteryIndex: 4, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'], compIds: ['realiser-app', 'optimiser'] , entities: [] as EntityIntegration[] },
  nuxtjs: { id: 'nuxtjs', name: 'Nuxt.js', icon: 'Nx', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: ['@nuxt/ui', 'layouts', 'middlewares'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  vuejs: { id: 'vuejs', name: 'Vue.js', icon: 'V', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: ['reactive-values', 'vue-props', 'vue-components'], compIds: ['realiser-app', 'optimiser'] , entities: [] as EntityIntegration[] },
  
  // Outils & Libs Node
  'node-fs': { id: 'node-fs', name: 'node fs', icon: 'fs', realIcon: 'material-icon-theme:folder-node-open', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['fs'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] , entities: [] as EntityIntegration[] },
  nodemon: { id: 'nodemon', name: 'nodemon', icon: 'nd', masteryIndex: 2, duration: getYearsFormatted(1753308000, currentDate), conceptIds: ['nodemon-restart'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] }, // Preuve de la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno?after=56b7655c3d7eb1b82d9fd7dbbea86c5212645ccf+34
  'node-canvas': { id: 'node-canvas', name: 'node canvas', icon: 'cv', realIcon: 'devicon:npm-wordmark', masteryIndex: 1, duration: getYearsFormatted(1692828000, currentDate), conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] }, // Preuve pour la date : https://github.com/DraftBot/DraftBot-uno/commit/adc9a552a6af32b83b1a530c78c5cb95b455c5a3

  // Écosystème PHP
  php: { id: 'php', name: 'PHP', icon: 'PHP', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo', 'api-integrations', 'api-usage', 'json'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  laravel: { id: 'laravel', name: 'Laravel', icon: 'Lv', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['mvc', 'migrations', 'laravel-pagination', 'seeders', 'laravel-query', 'laravel-files', 'auth', 'sessions', 'middlewares'], compIds: ['realiser-app', 'optimiser'] , entities: [] as EntityIntegration[] },
  blade: { id: 'blade', name: 'Blade', icon: 'Bl', realIcon: 'devicon:laravel', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['layouts', 'components', 'escape', 'blade-directives'], compIds: ['realiser-app', 'optimiser'] , entities: [] as EntityIntegration[] },
  eloquent: { id: 'eloquent', name: 'Eloquent ORM', realIcon: 'devicon:laravel', icon: 'El', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['eloquent-models', 'code-to-db', 'eloquent-relations', 'collections', 'factories'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] , entities: [] as EntityIntegration[] },
  filamentphp: { id: 'filamentphp', name: 'Filament', icon: 'Fm', masteryIndex: 1, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['filament-pages', 'filament-sync'], compIds: ['realiser-app', 'gerer-donnees'] , entities: [] as EntityIntegration[] },
  composer: { id: 'composer', name: 'Composer', icon: 'Cp', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'], compIds: ['administrer'] , entities: [] as EntityIntegration[] }, // Concepts partagés avec Node (packages)

  // Écosystème Java 
  java: { id: 'java', name: 'Java', icon: 'J', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['mc-plugin']?.startDateTimesTamp, currentDate), conceptIds: ['poo', 'exceptions', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums', 'java-scanner', 'decorators'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  spigot: { id: 'spigot', name: 'Spigot MC', icon: 'Spi', realIcon: 'simple-icons:spigotmc', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'], compIds: ['realiser-app', 'optimiser', 'administrer'] , entities: [] as EntityIntegration[] },
  junit: { id: 'junit', name: 'JUnit 4 & 5', icon: 'Ju', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['tests-unitaires', 'tests-fonctionnels'], compIds: ['realiser-app', 'optimiser'], entities: [] as EntityIntegration[] },
  jacoco: { id: 'jacoco', name: 'JaCoCo', icon: 'JaCo', realIcon: 'devicon:java', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['couverture-tests'], compIds: ['realiser-app', 'optimiser'], entities: [] as EntityIntegration[] },
  mockmvc: { id: 'mockmvc', name: 'MockMVC', icon: 'Mock', realIcon: 'devicon:spring', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['tests-fonctionnels'], compIds: ['realiser-app', 'optimiser'], entities: [] as EntityIntegration[] },
  spring: { id: 'spring', name: 'SpringBoot', icon: 'SpBo', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['mvc'], compIds: ['realiser-app'], entities: [] as EntityIntegration[] },

  // Front-End (HTML/CSS)
  css: { id: 'css', name: 'CSS', icon: 'CSS', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  bootstrap: { id: 'bootstrap', name: 'Bootstrap', icon: 'Bs', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['boot-modals', 'boot-buttons', 'boot-forms', 'boot-dropdowns', 'boot-icons', 'responsive', 'boot-collapse', 'boot-navbar', 'boot-text'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  tailwindcss: { id: 'tailwindcss', name: 'Tailwind CSS', icon: 'Tw', masteryIndex: 1, duration: getYearsFormatted(PROJECTS['portfolio-web'].startDateTimesTamp, currentDate), conceptIds: ['responsive'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  figma: { id: 'figma', name: 'Figma', icon: 'Fg', masteryIndex: 2, duration: getYearsFormatted(1672527600, currentDate), conceptIds: ['figma-logos', 'visuels'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },

  // Python
  python: { id: 'python', name: 'Python', icon: 'Py', masteryIndex: 3, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: ['complexite', 'typage', 'poo', 'interfaces', 'code-to-db', 'decorators', 'json'], compIds: ['optimiser', 'realiser-app'] , entities: [] as EntityIntegration[] },
  flask: { id: 'flask', name: 'Flask', icon: 'Fl', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S3.startTimestamp, currentDate), conceptIds: ['mvc'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  matplotlib: {id: 'matplotlib', name: 'Matplotlib', icon: 'MPL', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: [], compIds: ['gerer-donnees'], entities: [] as EntityIntegration[] },
  pandas: { id: 'pandas', name: 'Pandas lib', icon: 'Pan', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2?.startTimestamp, currentDate), conceptIds: [], compIds: ['gerer-donnees'], entities: [] as EntityIntegration[] },

  // Base de données & Infrastructure
  sql: { id: 'sql', name: 'SQL / SGBDR', icon: 'DB', realIcon: 'devicon:sqldeveloper', masteryIndex: 3, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: ['db-model', 'conditions', 'db-combining-queries', 'db-group-agg-order', 'db-views-cte', 'db-join', 'indexes', 'db-analyse', 'json', 'normalisation', 'custom-types'], compIds: ['gerer-donnees'] , entities: [] as EntityIntegration[] },
  linux: { id: 'linux', name: 'Linux / Bash', icon: 'L', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['sys', 'firewall', 'mounts', 'packages-install'], compIds: ['administrer'] , entities: [] as EntityIntegration[] },
  nixos: { id: 'nixos', name: 'NixOS', icon: 'Nix', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['nixos-personal-system'].startDateTimesTamp, currentDate), conceptIds: ['zsh-config', 'packages-install', 'nvidia-drivers', 'home-manager', 'desktop-manager', 'wayland', 'dual-boot-config', 'firewall', 'firefox-config-declarative', 'vscode-config-declarative', 'git-config-declarative', 'nix-options-vars', 'mounts'], compIds: ['administrer'] , entities: [] as EntityIntegration[] },
  docker: { id: 'docker', name: 'Docker', icon: 'D', masteryIndex: 2, duration: getYearsFormatted(1660341600, currentDate), conceptIds: ['conteneur'], compIds: ['administrer'] , entities: [] as EntityIntegration[] },

  // Outils de gestion & IDE
  vscode: { id: 'vscode', name: 'Visual Studio Code', icon: 'VS', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'collaborer'] , entities: [] as EntityIntegration[] },
  eclipse: { id: 'eclipse', name: 'Eclipse IDE', icon: 'Ec', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['eclipse-libs'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  'androidstudio': { id: 'androidstudio', name: 'Android Studio', icon: 'AS', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['android-bases'], compIds: ['realiser-app'] , entities: [] as EntityIntegration[] },
  'phpstorm': { id: 'phpstorm', name: 'PHP Storm IDE', icon: 'PS', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'collaborer'], entities: [] as EntityIntegration[] },

  // Collaboration & DevOps
  git: { id: 'git', name: 'Git', icon: 'G', masteryIndex: 3, duration: getYearsFormatted(1610578800, currentDate), conceptIds: ['versioning', 'git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'], compIds: ['collaborer', 'conduire-projet'] , entities: [] as EntityIntegration[] }, // Preuve de la date : premier repo github (ScandiumPlugin)
  'githubactions': { id: 'githubactions', name: 'GitHub Actions (CI/CD)', icon: 'GA', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: [], compIds: ['administrer', 'realiser-app'] , entities: [] as EntityIntegration[] },
  'github-project': { id: 'github-project', name: 'GitHub Project', icon: 'GP', realIcon: 'codicon:github-project', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['backlog', 'priority', 'gh-sub'], compIds: ['conduire-projet', 'collaborer'] , entities: [] as EntityIntegration[] },
  trello: { id: 'trello', name: 'Trello', icon: 'Tr', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['markdown', 'backlog', 'priority'], compIds: ['conduire-projet', 'collaborer'] , entities: [] as EntityIntegration[] },
  sentry: { id: 'sentry', name: 'Sentry', icon: 'Se', masteryIndex: 1, duration: getYearsFormatted(1688335200, currentDate), conceptIds: ['bug-monitoring', 'sentry-debug'], compIds: ['optimiser', 'conduire-projet', 'administrer'] , entities: [] as EntityIntegration[] }, // Preuve de la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno/?before=56b7655c3d7eb1b82d9fd7dbbea86c5212645ccf+350
  'open-project': { id: 'open-project', name: 'Open Project', icon: 'OP', realIcon: 'selfhst:openproject', duration: 'Non pratiqué', masteryIndex: 0, conceptIds: ['priority', 'backlog'], compIds: ['conduire-projet'], entities: [] as EntityIntegration[] },

  // Divers
  regex: { id: 'regex', name: 'RegEx', icon: 'RE', realIcon: 'skill-icons:regex-light', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'optimiser'], entities: [] as EntityIntegration[] },
  'ia-gen': { id: 'ia-gen', name: 'IA Génératives', realIcon: 'hugeicons:artificial-intelligence-04', icon: 'IA', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'], entities: [] as EntityIntegration[] },
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
  { id: 'but-info', modalType: 'education', type: 'edu', title: 'BUT Informatique', entity: 'IUT USPN', startDate: 'Sept 2024', endDate: 'Juin 2027', durationMonths: 33, isEvent: false, stemHeight: 80, textOffset: '-translate-x-[60%]' },
  { id: 'stage-mf', modalType: 'experience', type: 'pro', title: 'Stage Dev PHP', entity: 'Market Factory', startDate: 'Jan 2026', endDate: 'Mars 2026', durationMonths: 3, isEvent: false, stemHeight: 110, textOffset: '-translate-x-[50%]' }
] 

export const PROJECT_IDS = Object.keys(PROJECTS) as ProjectId[];
export const EXPERIENCE_IDS = Object.keys(EXPERIENCES) as ExperienceId[];
export const EDUCATION_IDS = Object.keys(EDUCATIONS) as EducationId[];

export const TOOL_VALUES = Object.values(TOOLS).sort((tool1, tool2) => tool2.masteryIndex - tool1.masteryIndex);
export const EXPERIENCE_VALUES = Object.values(EXPERIENCES);
export const EDUCATION_VALUES = Object.values(EDUCATIONS);
export const PROJECT_VALUES = Object.values(PROJECTS);


const projectSearchItems = [];

// Logic relations script 
for (const project of PROJECT_VALUES as Project[]) {
  if (project.educationId === EDUCATIONS['but-info']?.id) {
    EDUCATIONS['but-info'].projects.push({id: project.id})
  }

  if (project.educationId === EDUCATIONS['formation-perso']?.id) {
    EDUCATIONS['formation-perso'].projects.push({id: project.id})

    for (const tool of project.tools) {
      const toolIntegrationFound = EDUCATIONS['formation-perso'].tools.find((t) => tool.id === t.id);
      if (toolIntegrationFound) {
        toolIntegrationFound.conceptIds = [...new Set([...toolIntegrationFound.conceptIds, ...tool.conceptIds])];
      } else {
          EDUCATIONS['formation-perso'].tools.push({id: tool.id, conceptIds: TOOLS[tool.id]?.conceptIds as ConceptId[], description: tool.description });
      }
    }

    for (const academicSkill of project.competencies) {
      if (!EDUCATIONS['formation-perso'].competencies.find((t) => academicSkill.id === t.id)) {
          EDUCATIONS['formation-perso'].competencies.push({ id: academicSkill.id, description: academicSkill.description + ` - ${project.title}`});
      }
    } 
  }

  projectSearchItems.push({ 
    label: project.title,
    suffix: project.context,
    icon: project.icon,
    id: project.id,
    tools: project.tools.map((tool) => TOOLS[tool.id]?.name).join(', '),
    'academic-skills': project.competencies.map((skill) => COMPETENCES[skill.id]?.title).join(', '),
    concepts: project.tools.map((tool) => tool.conceptIds.map((concept) => CONCEPTS[concept].name).join(', ')).join(', '),
    type: 'Projets',
    description: project.description,
    onSelect() {
        openModal({ type: 'project', id: project.id as ProjectId })
      }
  });
}

const educationSearchItems = [];

for (const education of EDUCATION_VALUES as Education[]) {
  education.tools = getToolsForEducation(education);

  educationSearchItems.push({ 
    label: education.title,
    prefix: education.context,
    suffix: education.entity,
    icon: education.icon,
    id: education.id,
    tools: education.tools.map((tool) => TOOLS[tool.id]?.name).join(', '),
    concepts: education.tools.map((tool) => tool.conceptIds.map((concept) => CONCEPTS[concept].name).join(', ')).join(', '),
    'academic-skills': education.competencies.map((skill) => { console.log('blabla skill'); return COMPETENCES[skill.id]?.title }).join(', '),
    type: 'Formations et diplômes',
    description: education.description,
    onSelect() {
        openModal({ type: 'education', id: education.id as EducationId })
      }
  });
}

for (const conceptId in CONCEPTS) {
  const concept = CONCEPTS[conceptId as ConceptId];
  concept.entities = getEntitiesForConcept(concept.id as ConceptId).sort((entity1, entity2) => entity1.startDateTimestamp - entity2.startDateTimestamp);
}

const toolSearchItems = [];

for (const tool of TOOL_VALUES as Tool[]) {
  tool.entities = getEntitiesForTool(tool.id as ToolId).sort((entity1, entity2) => entity1.startDateTimestamp - entity2.startDateTimestamp);

  toolSearchItems.push({ 
    label: tool.name,
    suffix: tool.compIds.map((skill) => COMPETENCES[skill]?.title).join(', '),
    icon: tool.realIcon || `devicon:${tool.id}`,
    id: tool.id,
    type: 'Compétences techniques / Hard skills',
    description: getConceptsForTool(tool.id).map((concept) => CONCEPTS[concept].name).join(', '),
    onSelect() {
        openModal({ type: 'tool', id: tool.id })
      }
    });
}

const { openModal }= useModalManager()

export const SEARCH_GROUPS = ref<CommandPaletteGroup[]>([
  {
    id: 'tools',
    label: 'Outils techniques',
    items: toolSearchItems,
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
      concepts: experience.tools.map((tool) => tool.conceptIds.map((concept) => CONCEPTS[concept].name).join(', ')).join(', '),
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
    items: projectSearchItems,
  },    
  {
    id: 'education',
    label: 'Formations et diplômes',
    items: educationSearchItems,
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

export function getConceptsForTool(toolId: string) {
    let results: ConceptId[] = [];

  PROJECT_VALUES.forEach((p: Project) => {
    const toolFound = p?.tools?.find((tool) => tool.id === toolId);
    if (toolFound) results = [...new Set([...results, ...toolFound.conceptIds])];
  });
  EXPERIENCE_VALUES.forEach(e => {
    const toolFound = e?.tools?.find((tool) => tool.id === toolId);
    if (toolFound) results = [...new Set([...results, ...toolFound.conceptIds])]; 
  });
  EDUCATION_VALUES.forEach((e: Education) => {
    const toolFound = e?.tools?.find((tool) => tool.id === toolId);
    if (toolFound) results = [...new Set([...results, ...toolFound.conceptIds])];
  });

  return results;

}

// Trouver TOUTES les entités (Projets, Exp, Formations) qui utilisent une Notion
export function getEntitiesForConcept(conceptId: ConceptId) {
  const results: EntityIntegration[] = []
  
  EDUCATION_VALUES.forEach((e: Education) => {
    if (!e?.ignoreForToolsUsages) {
      const toolFound = e.tools?.find((t: ToolIntegration) => t.conceptIds?.includes(conceptId));
      if (toolFound) results.push({ type: 'education', id: e.id, title: e.title, startDateTimestamp: toolFound.startDateTimestamp as number})
    } 
  })

  PROJECT_VALUES.forEach(p => {
    if (p.tools?.some((t: ToolIntegration) => t.conceptIds?.includes(conceptId))) results.push({ type: 'project', id: p.id, title: p.title, startDateTimestamp: p.startDateTimesTamp })
  })
  EXPERIENCE_VALUES.forEach(e => {
    if (e.tools?.some(t => t.conceptIds?.includes(conceptId))) results.push({ type: 'experience', id: e.id, title: e.title, startDateTimestamp: e.startDateTimesTamp })
  }) 
  
  return results
}

export function getEntitiesForTool(toolId: ToolId) {
  const results: EntityIntegration[] = []
  
  EDUCATION_VALUES.forEach((e: Education) => {
    if (!e?.ignoreForToolsUsages) {
      const toolFound = e.tools?.find((t: ToolIntegration) => t.id === toolId);
      if (toolFound) results.push({ type: 'education', id: e.id, title: e.title, startDateTimestamp: toolFound.startDateTimestamp as number})
    } 
  })

  PROJECT_VALUES.forEach(p => {
    if (p.tools?.some((t: ToolIntegration) => t.id === toolId)) results.push({ type: 'project', id: p.id, title: p.title, startDateTimestamp: p.startDateTimesTamp })
  })
  EXPERIENCE_VALUES.forEach(e => {
    if (e.tools?.some(t => t.id === toolId)) results.push({ type: 'experience', id: e.id, title: e.title, startDateTimestamp: e.startDateTimesTamp })
  }) 
  
  return results
}


function getToolsForEducation(education: Education) {
  const results: ToolIntegration[] = education.tools;
  if (education.segmentations) {
    for (const segmentationId in education.segmentations) {
      const segmentation = education.segmentations[segmentationId];
      if (segmentation?.tools) {
        for (const tool of segmentation.tools) {
          const toolFound = results.find((t) => t.id === tool.id);
          if (toolFound) {
            toolFound.conceptIds = [...new Set([...toolFound.conceptIds, ...tool.conceptIds])]; 
            if (!toolFound.startDateTimestamp) toolFound.startDateTimestamp = tool.startDateTimestamp || segmentation.startTimestamp;
          } else {
            results.push({
              id: tool.id,
              conceptIds: tool.conceptIds,
              description: tool.description,
              startDateTimestamp: tool.startDateTimestamp || segmentation.startTimestamp
            });
          }
        }
      }
    }
  }

  return results
}

export function isFirstAppear(tool: ToolIntegration, entityId?: EntityId) {
  return entityId && TOOLS[tool.id as ToolId]?.entities[0]?.id === entityId
}

console.log(`blabla js chargé en ${Date.now() - startDate}ms`)
