import { getYearsBetween } from './usePortfolio'
import { stripIndents } from 'common-tags'

import stageMfContent from '../content/experiences/stage-mf.md?raw'
import unoOnDiscContent from '../content/projects/uno-on-disc.md?raw'

export type Project = keyof typeof PROJECTS;
export type Concept = keyof typeof CONCEPTS;
export type Skill = keyof typeof COMPETENCES;
export type Experience = keyof typeof EXPERIENCES;
export type Education = keyof typeof EDUCATIONS;
export type Tool = keyof typeof TOOLS;

export const MASTERY_LEVELS = [
  "Notions", // Je connais à peu prêt le fonctionnement global sans expérience
  "Découverte", // Je connais à peu prêt le fonctionnement global et je suis entrain de tester ainsi qu'apprendre en même temps
  "Maîtrise globale", // Je connais la majorité des fonctionnalités/notions de base grâce à un ou des projets ou grâce des formations
  "Maîtrise assez avancée", // Je connais la majorité des fonctionnalités/notions de base et j'ai quelques points avancés grâce à des projets ou des formations
  "Maîtrise avancée", // J'estime que ce que je connais est globalement avancé par rapport aux fonctionnalités/notions et que je suis peut-être au dessu des espérance pour mon profil grâce à des projets ou des formations
  "Maîtrise très avancée" // J'estime que mes connaissances sont sûrement au delà des espérances pour mon profil
];
// --- NOTIONS (Nouveau concept indépendant) ---
export const CONCEPTS = {
  // Notions générales & transverses
  'poo': { id: 'poo', name: 'Programmation Orientée Objet (POO)', description: stripIndents`Paradigme de programmation basé sur le concept d'objets contenant des données et des méthodes.` },
  'complexite': { id: 'complexite', name: 'Complexité Algorithmique', description: stripIndents`Évaluation des performances et de l'efficacité mathématique des algorithmes.` },
  'typage': { id: 'typage', name: 'Typage Strict', description: stripIndents`Vérification forte et statique des types de données pour prévenir les erreurs.` },
  'mvc': { id: 'mvc', name: 'Architecture MVC', description: stripIndents`Séparation du code en Modèle, Vue et Contrôleur pour une meilleure maintenabilité.` },
  'secu': { id: 'secu', name: 'Sécurité & Failles', description: stripIndents`Identification, prévention et correction de vulnérabilités web.` },
  'conteneur': { id: 'conteneur', name: 'Conteneurisation', description: stripIndents`Isolation d'applications avec leurs dépendances pour un déploiement uniforme.` },
  'versioning': { id: 'versioning', name: 'Versioning', description: stripIndents`Gestion de l'historique et des versions du code source en équipe.` },
  'sys': { id: 'sys', name: 'Configuration Système', description: stripIndents`Administration d'OS Linux et configuration des règles réseaux.` },
  'db-model': { id: 'db-model', name: 'Modélisation BD', description: stripIndents`Conception de schémas relationnels (MCD/MLD) et intégrité des données.` },
  'callbacks': { id: 'callbacks', name: 'Callbacks', description: stripIndents`Utilisation de fonctions passées en arguments.` },
  
  // Systèmes / Algorithmes développés
  'perms': { id: 'perms', name: 'Système de permissions', description: stripIndents`Gestion hiérarchique des droits des utilisateurs via des rôles, des conditions etc....` },
  'cmds': { id: 'cmds', name: 'Commandes', description: stripIndents`Création de nouvelles commandes en jeu exécutables par des utilisateurs avec des arguments et des choix.` },
  'zone': { id: 'zone', name: 'Système de zone 3D', description: stripIndents`Calculs vectoriels et délimitation géométrique dans l'espace en jeu.` },

  // Concepts complexes utilisés
  'migrations': { id: 'migrations', name: 'Migrations', description: stripIndents`Versionning de la structure de base de données.` },
  'seeders': { id: 'seeders', name: 'Seeders', description: stripIndents`Peuplement automatisé de données factices pour les tests ou de réelles données utiles en production pour le fonctionnement de l'application` },
  'factories': { id: 'factories', name: 'Factories', description: stripIndents`Génération d'objets modèles à la volée pour les tests.` },
  'auth': { id: 'auth', name: 'Authentification', description: stripIndents`Mise en place de systèmes de login sécurisé.` },
  'sessions': { id: 'sessions', name: 'Système de sessions', description: stripIndents`Conservation de l'état utilisateur et d'autres données entre les requêtes HTTP.` },
  'layouts': { id: 'layouts', name: 'Bases/Layouts', description: stripIndents`Création de squelettes de pages maîtres.` },
  'components': { id: 'components', name: 'Composants', description: stripIndents`Morceaux d'interface réutilisables.` },
  'escape': { id: 'escape', name: 'Échappement', description: stripIndents`Sécurisation automatique contre les failles XSS.` },
  'code-to-db': { id: 'code-to-db', name: 'Interactions du code avec la BD', description: stripIndents`CRUD via la logique métier.` },
  'responsive': { id: 'responsive', name: 'Responsive', description: stripIndents`Adaptation du design via un système de grille fluide.` },

  // Notions de programmation
  'events': { id: 'events', name: 'Évènements', description: stripIndents`Écoute et manipulation du cycle de vie événementiel d'une application.` },
  'scopes': { id: 'scopes', name: 'Portées (Scopes)', description: stripIndents`Gestion fine de la visibilité des variables et des contextes d'exécution.` },
  'exceptions': { id: 'exceptions', name: 'Exceptions', description: stripIndents`Capture et gestion des erreurs d'exécution via try/catch.` },
  'collections': { id: 'collections', name: 'Collections', description: stripIndents`Manipulation de structures de données complexes (Map, Set, Arrays).` },
  'switch': { id: 'switch', name: 'Switch', description: stripIndents`Structures conditionnelles multiples et optimisées.` },
  'loops': { id: 'loops', name: 'Boucles (for/while)', description: stripIndents`Itération optimisée sur des ensembles de données.` },
  'interfaces': { id: 'interfaces', name: 'Interfaces', description: stripIndents`Définition de contrats de données stricts.` },
  'classes': { id: 'classes', name: 'Classes', description: stripIndents`Instanciation d'objets et encapsulation.` },
  'enums': { id: 'enums', name: 'Énumérations', description: stripIndents`Définition de types contraints et listes de constantes.` },
  'modules': { id: 'modules', name: 'Modules', description: stripIndents`Exportation et importation de logique isolée.` },
  'modules-dev': { id: 'modules-dev', name: 'Modules de développement', description: stripIndents`Création d'environnements de tests automatisés.` },
  'paquets-scripts': { id: 'paquets-scripts', name: 'Scripts de gestionnaire de paquet', description: stripIndents`Automatisation des tâches d'exécution et de build dans le package.json.` },
  'poly': { id: 'poly', name: 'Héritage et polymorphisme', description: stripIndents`Concepts avancés de POO pour un code normalisé et réutilisable.` },
  // ça va avec MVC en soit, puis peut-être que model dans ce contexte c'est la même chose que classe
  //'models': { id: 'models', name: 'Models', description: stripIndents`Logique métier et règles de l'application.` },

  // Notions de tests
  'tests-unitaires': { id: 'tests-unitaires', name: 'Tests unitaires', description: "Réalisation de tests unitaires visant à vérifier des fonctions précises du programme notamment avec des outils comme Junit"},
  'tests-fonctionnels': { id: 'tests-fonctionnels', name: "Tests d'intégration", description: "Réalisation de tests fonctionnels pour les services et modules de l'application notamment grâce à des outils comme MockMVC en SpringBoot"},
  'couverture-tests': { id: 'couverture-tests', name: 'Couverture de tests', description: "Couverture de tous les branchement du programme pour les tests notamment grâce à des outils adaptés comme JaCoCo"},

  // Notions JavaScript / TypeScript
  'async': { id: 'async', name: 'Développement asynchrone', description: stripIndents`Gestion des promesses, async/await et requêtes non bloquantes.` },
  'dom': { id: 'dom', name: 'Manipulation DOM', description: stripIndents`Interaction directe avec l'arbre HTML du navigateur.` },
  'ajax': { id: 'ajax', name: 'AJAX', description: stripIndents`Requêtes HTTP asynchrones côté client.` },

  // Notions Node.js & Écosystème JS
  'sharding': { id: 'sharding', name: 'Sharding', description: stripIndents`Fragmentation de processus pour les applications à très grande échelle (bots Discord massivement utilisés).` },
  'fs': { id: 'fs', name: 'Interactions fichiers (fs)', description: stripIndents`Lecture et écriture sur le système de fichiers du serveur en utilisant le module node-fs.` },
  'nodemon-restart': { id: 'nodemon-restart', name: 'Redémarrages après sauvegardes', description: stripIndents`Environnement de développement avec hot-reloading.` },
  'canvas-2d': { id: 'canvas-2d', name: 'Contexte 2D', description: stripIndents`Dessin et manipulation de pixels virtuels.` },
  'canvas-overlay': { id: 'canvas-overlay', name: 'Superposition d\'images', description: stripIndents`Composition dynamique d'images multiples.` },
  'canvas-rotation': { id: 'canvas-rotation', name: 'Rotation d\'images', description: stripIndents`Transformations géométriques sur des canvas.` },

  // Notions Discord.js
  'djs-slash': { id: 'djs-slash', name: 'Commandes Slash', description: stripIndents`Intégration native des commandes dans l'interface Discord.` },
  'djs-components': { id: 'djs-components', name: 'Composants (Boutons, Sélecteurs)', description: stripIndents`Création d'interfaces riches et interactives dans le chat.` },
  'djs-modals': { id: 'djs-modals', name: 'Modals', description: stripIndents`Formulaires pop-up interactifs pour la saisie utilisateur.` },
  'djs-ephemeral': { id: 'djs-ephemeral', name: 'Messages éphémères', description: stripIndents`Réponses privées visibles uniquement par l'utilisateur ciblé.` },
  'djs-cache': { id: 'djs-cache', name: 'Cache et sweepers', description: stripIndents`Optimisation de la mémoire RAM en purgeant les données obsolètes.` },
  'djs-collectors': { id: 'djs-collectors', name: 'Component Collectors', description: stripIndents`Écoute et gestion de flux d'interactions en temps réel.` },

  // Notions Git / GitHub / CI
  'git-commits': { id: 'git-commits', name: 'Commits', description: stripIndents`Sauvegardes atomiques de l'état du code source.` },
  'git-remote': { id: 'git-remote', name: 'Dépôt distant', description: stripIndents`Synchronisation avec des serveurs comme GitHub.` },
  'git-branches': { id: 'git-branches', name: 'Branches', description: stripIndents`Développement parallèle de fonctionnalités.` },
  'git-cherry': { id: 'git-cherry', name: 'Cherry picks', description: stripIndents`Sélection et application de commits spécifiques d'une branche à une autre.` },
  'git-merges': { id: 'git-merges', name: 'Merges', description: stripIndents`Fusion de différentes branches de développement.` },
  'git-conflicts': { id: 'git-conflicts', name: 'Résolution de conflits', description: stripIndents`Gestion manuelle des collisions de code lors de fusions.` },
  'git-issues': { id: 'git-issues', name: 'Issues', description: stripIndents`Suivi de bugs et suggestions de fonctionnalités.` },
  'git-pr': { id: 'git-pr', name: 'Pull Requests', description: stripIndents`Proposition, revue et validation de code avant intégration.` },
  'gh-backlog': { id: 'gh-backlog', name: 'Backlog', description: stripIndents`Gestion de la liste des tâches à réaliser.` },
  'gh-priority': { id: 'gh-priority', name: 'Priority board', description: stripIndents`Tableaux Kanban pour l'organisation de l'équipe.` },
  'gh-sub': { id: 'gh-sub', name: 'Sub-issues', description: stripIndents`Découpage de tâches complexes en sous-tâches gérables.` },

  // Notions Java / Spigot / Eclipse
  'eclipse-libs': { id: 'eclipse-libs', name: 'Gestion des bibliothèques', description: stripIndents`Ajout et configuration de dépendances externes (Build Path).` },
  'java-uml': { id: 'java-uml', name: 'UML (Modélisation)', description: stripIndents`Conception architecturale via diagrammes de classes.` },
  'java-arraylist': { id: 'java-arraylist', name: 'ArrayList', description: stripIndents`Utilisation de structures de données dynamiques.` },
  'java-scanner': { id: 'java-scanner', name: 'Scanner', description: stripIndents`Lecture des entrées utilisateur en console.` },
  'spigot-yaml': { id: 'spigot-yaml', name: 'Configurations YAML', description: stripIndents`Sauvegarde et lecture de données structurées.` },
  'spigot-events': { id: 'spigot-events', name: 'Manipulation d\'évènements', description: stripIndents`Interception des actions en jeu (casser un bloc, se déplacer...).` },
  'spigot-gui': { id: 'spigot-gui', name: 'Chest GUI', description: stripIndents`Création d'interfaces visuelles interactives avec des inventaires virtuels.` },
  'spigot-tools': { id: 'spigot-tools', name: 'Outils de gestion de joueurs', description: stripIndents`Commandes utilitaires pour gérer les joueurs, leurs permissions, leurs rôles etc...` },
  'spigot-mod': { id: 'spigot-mod', name: 'Commandes de modération', description: stripIndents`Outils administratifs pour gérer le serveur (sanctions etc...).` },
  'spigot-tab': { id: 'spigot-tab', name: 'Auto-complétion MC', description: stripIndents`Suggestion dynamique d'arguments lors de la frappe pour des commandes (TabComplete).` },
  'spigot-groups': { id: 'spigot-groups', name: 'Système de groupes & personnalisation', description: stripIndents`Création de rôles en jeu avec des caractéristiques uniques, des couleurs, un prefixe et des permissions assocées.` },

  // Notions Laravel / PHP / Bootstrap
  'laravel-pagination': { id: 'laravel-pagination', name: 'Pagination Laravel', description: stripIndents`Découpage optimisé de vastes ensembles de résultats.` },
  'laravel-query': { id: 'laravel-query', name: 'Query builder', description: stripIndents`Construction programmatique et sécurisée de requêtes SQL.` },
  'laravel-files': { id: 'laravel-files', name: 'Téléverssement et téléchargement de fichiers', description: stripIndents`Gestion des uploads et des downloads de fichiers.` },
  'blade-directives': { id: 'blade-directives', name: 'Directives communes', description: stripIndents`Instructions logiques directes (@if, @foreach) dans le HTML.` },
  'eloquent-models': { id: 'eloquent-models', name: 'Models Eloquent', description: stripIndents`Représentation objet des tables de la base de données et CRUD via l'ORM.` },
  'eloquent-relations': { id: 'eloquent-relations', name: 'Relations', description: stripIndents`Liaisons entre modèles (One-to-Many, Many-to-Many).` },
  'filament-pages': { id: 'filament-pages', name: 'Création de pages', description: stripIndents`Génération de panels d'administration riches.` },
  'filament-sync': { id: 'filament-sync', name: 'Synchronisation avec la base de données', description: stripIndents`Liaison directe des formulaires avec les Models.` },
  'php-typing': { id: 'php-typing', name: 'Typage', description: stripIndents`Utilisation de types stricts et déclarations de retour en PHP moderne.` },
  'boot-modals': { id: 'boot-modals', name: 'Modals', description: stripIndents`Boîtes de dialogue interactives.` },
  'boot-buttons': { id: 'boot-buttons', name: 'Boutons', description: stripIndents`Composants d'action stylisés.` },
  'boot-forms': { id: 'boot-forms', name: 'Formulaires', description: stripIndents`Saisies utilisateur structurées avec Bootstrap.` },
  'boot-dropdowns': { id: 'boot-dropdowns', name: 'Dropdowns / Menus déroulants', description: stripIndents`Menus d'actions contextuels.` },
  'boot-icons': { id: 'boot-icons', name: 'Icônes', description: stripIndents`Intégration de bibliothèques SVG.` },
  'boot-collapse': { id: 'boot-collapse', name: 'Collapse', description: stripIndents`Éléments repliables.` },
  'boot-navbar': { id: 'boot-navbar', name: 'Navbar', description: stripIndents`Barres de navigation adaptatives.` },
  'boot-text': { id: 'boot-text', name: 'Textes', description: stripIndents`Utilitaires typographiques.` },

  // Autres Notions
  'bug-monitoring': { id: 'bug-monitoring', name: 'Bug monitoring', description: stripIndents`Détection et alertes automatiques en cas de crash.` },
  'sentry-debug': { id: 'sentry-debug', name: 'Debug', description: stripIndents`Analyse de stacktraces détaillées en production.` },
  'android-bases': { id: 'android-bases', name: 'Développement d\'applications android (bases)', description: stripIndents`Compréhension du cycle de vie d'une activité.` },
  'android-intents': { id: 'android-intents', name: "Intentions d'activité", description: stripIndents`Compréhension des interactions entre les activités et les applications.` },
  'android-layouts': { id: 'android-layouts', name: "Layouts / composants graphiques", description: stripIndents`Compréhension composants graphiques.` },
  'android-strings': { id: 'android-layouts', name: "Textes et traductions", description: stripIndents`Compréhension des ressources de type texte et des traductions.` },
  'android-screens': { id: 'android-screens', name: "Écrans d'appareils", description: stripIndents`Compréhension du fonctionnement de l'affichage sur différents écrans (densité de pixel, résolutions).` },

  'figma-logos': { id: 'figma-logos', name: 'Logos', description: stripIndents`Conception vectorielle d'identités visuelles.` },
  'visuels': { id: 'visuels', name: 'Conception de visuels graphiques simples', description: stripIndents`Création de maquettes basiques.` },
}

// --- COMPÉTENCES (Renommées) ---
export const COMPETENCES = {
  'realiser-app': { id: 'realiser-app', title: 'Réaliser', description: 'Développer des applications informatiques complexes.' },
  'optimiser': { id: 'optimiser', title: 'Optimiser', description: 'Améliorer les performances et l\'algorithmique.' },
  'administrer': { id: 'administrer', title: 'Administrer', description: 'Configurer systèmes et réseaux.' },
  'gerer-donnees': { id: 'gerer-donnees', title: 'Gérer', description: 'Concevoir et exploiter des bases de données.' },
  'conduire-projet': { id: 'conduire-projet', title: 'Conduire', description: 'Piloter un projet informatique.' },
  'collaborer': { id: 'collaborer', title: 'Collaborer', description: 'Travailler en équipe de manière agile.' }
}

// --- FORMATIONS (Ajout de "formation-perso") ---
export const EDUCATIONS = {
  'formation-perso': { 
    id: 'formation-perso', title: 'Formation Personnelle (Autodidacte)', entity: 'Projets Personnels', context: 'Autodidacte', 
    description: 'Apprentissage en autonomie guidé par la curiosité et la réalisation de projets concrets.', 
    contentPath: '/formations/formation-perso.md',
    longDescription: '', competencies: [], tools: [], medias: [],
    projects: [],
  },
  'but-info': { 
    id: 'but-info', title: 'BUT Informatique', entity: 'Univ. Sorbonne Paris-Nord', context: 'Formation', 
    description: stripIndents`Moyenne stabilisée à ~15/20. Chef d'équipe sur divers projets (Jeu d'échecs, algo graphes, BDD, config Linux, Site de colis).`, 
    contentPath: '/formations/but-info.md',
    longDescription: stripIndents`Formation très technique et professionnalisante. Les nombreux travaux de groupe m'ont permis de développer mes soft-skills et mon leadership.`, 
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
      { id: 'python', description: "Algorithmique avancée avec études de complexité, méthodes de tri et plus", longDescription: "", conceptIds: ['complexite', 'code-to-db', 'escape', 'poo', 'classes', 'interfaces'] },
      { id: 'flask', description: "Développement web en python", longDescription: "", conceptIds: ['mvc', 'secu', 'code-to-db', 'escape', 'sessions', 'layouts', 'components', 'auth']},
      { id: 'java', description: "POO approfondie avec de l'héritage, du polymorphisme, du SOLID et des structures de qualité logicielle comme les observateurs et les observateurs", longDescription: "", conceptIds: ['poo'] },
      { id: 'javascript', description: "Javascript dans le DOM et avec Node.js, comprenant les subtilités du langage, l'asynchrone etc...", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'exceptions', 'loops']},
      { id: 'git', description: "Gestion du code source.", longDescription: "", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-merges', 'git-conflicts'] },
      { id: 'nodejs', description: "Travail sur plusieurs technologies Node.js.", longDescription: "", conceptIds: ['modules', 'fs'] },
      { id: 'regex', description: 'Regex en PostgreSQL et en Javascript.', conceptIds: [], longDescription: "" },
      { id: 'sql', description: 'SGBDR avec modélisaition, requêtes SQL, PostgreSQL et mariadb', longDescription: "", conceptIds: ['db-model']},
      { id: 'android-studio', description: "Création d'applications Android", longDescription: "", conceptIds: ['poo']},
      { id: 'eclipse', description: 'Utilisation de Eclipse pour Java et utilisations des intégrations JUnit & JaCoCO', longDescription: "", conceptIds: ['eclipse-libs']},
      { id: 'springboot', description: 'Applications web en Java exploitant le fonctionnement global de SpringBoot', longDescription: "", conceptIds: ['mvc']},
      { id: 'junit', description: 'Tests en Java', longDescription: "", conceptIds: ['tests-unitaires', 'tests-fonctionnels']},
      { id: 'jacoco', description: 'Couverture de code pour les tests en Java', longDescription: "", conceptIds: ['couverture-tests']},
      { id: 'mockmvc', description: "Tests d'intéractions HTTP en Java notamment pour les applications SpringBoot", longDescription: "", conceptIds: ['tests-fonctionnels']},
      { id: 'linux', description: "Installation et configuration d'un poste Ubuntu ; travail sur Xubuntu durant le cursus ; travaux réseaux & systèmes sur debian", longDescription: "", conceptIds: []},
      { id: 'node-fs', description: 'Exercices sur le module fs/promise', longDescription: "", conceptIds: ['fs']},
      { id: 'expressjs', description: "Exercices sur le fonctionnement de base", longDescription: "", conceptIds: []},
      { id: 'vuejs', description: 'Exercices en profondeur sur le fonctionnement de base', longDescription: "", conceptIds: []},
    ],
    competencies: [
      { id: 'realiser-app', description: "Réalisation d'applications et formation orientée développement.", longDescription: "" },
      { id: 'optimiser', description: "Cours sur les optimisations, la sécurité et l'architecture logicielle.", longDescription: "" },
      { id: 'administrer', description: "Installation d'un poste Xubuntu et travaux en réseau ainsi qu'en systèmes linux.", longDescription: "" },
      { id: 'gerer-donnees', description: "Travail sur la science de données avec de l'analyse de données, des bases de données SQL (SGBDR) et du traitement algorithmique des données.", longDescription: "" },
      { id: 'conduire-projet', description: "Cours de gestion de projets, de management SI & réalisaion de toutes les étapes de projets.", longDescription: "" },
      { id: 'collaborer', description: "Multitude de travaux en groupe pour des projets ou pour des ressources transversales.", longDescription: "" },
    ], 
    medias: []
  },
  'bac': { 
    id: 'bac', title: 'BAC Général (Maths, PC, SVT)', entity: 'Lycée', context: 'Diplôme', 
    contentPath: '/formations/bac.md',
    description: 'Apprentissage de la méthode scientifique. Bons résultats en mathématiques.', 
    longDescription: '', competencies: [], tools: [], medias: [], projects: []
  }
}

// --- PROJETS ---
export const PROJECTS = {
  'uno-disc': { 
    id: 'uno-disc', title: 'Jeu de UNO sur Discord (Non officiel)', context: 'Projet Perso', educationId: 'formation-perso', startDateTimesTamp: 1648219351000,
    description: 'Agent logiciel très complet sur la messagerie Discord pour jouer au UNO. Présent sur +1800 serveurs, +128 000 membres.', 
    contentPath: 'test',
    longDescription: unoOnDiscContent, 
    github: 'privé', website: 'https://top.gg/bot/985152555791290408', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Développement d'un bot interactif.", longDescription: "" },
      { id: 'collaborer', description: "Utilisation des standards de développement à plusieurs.", longDescription: "" },
      { id: 'conduire-projet', description: "Maintenir un projet sur la durée.", longDescription: "" },
      { id: 'optimiser', description: "Optimisation de code pour gérer des milliers de serveurs simultanément.", longDescription: "" }
    ],
    tools: [
      { id: 'javascript', description: "Logique principale du bot.", longDescription: "", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections'] },
      { id: 'nodejs', description: "Environnement d'exécution.", longDescription: "", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs'] },
      { id: 'nodemon', description: "Outil de dev.", longDescription: "", conceptIds: ['nodemon-restart'] },
      { id: 'node-canvas', description: "Génération dynamique des cartes visuelles.", longDescription: "", conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'] },
      { id: 'figma', description: "Design des assets du jeu.", longDescription: "", conceptIds: ['figma-logos', 'visuels'] },
      { id: 'typescript', description: "Migration vers du typage strict.", longDescription: "", conceptIds: ['interfaces', 'classes', 'enums'] },
      { id: 'vscode', description: "Environnement de développement.", longDescription: "", conceptIds: [] },
      { id: 'discordjs', description: "Interaction avec l'API Discord.", longDescription: "", conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'] },
      { id: 'sentry', description: "Suivi des erreurs en production.", longDescription: "", conceptIds: ['bug-monitoring', 'sentry-debug'] },
      { id: 'git', description: "Gestion du code source.", longDescription: "", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts'] },
      { id: 'regex', description: 'Système de recherche dans les logs via Regex', conceptIds: [], longDescription: "D'abord utilisé pour contracter des conditions avec plusieurs `startsWith` en une seul regex, jusqu'à ce que je découvre en réalisant de tests que l'ensemble de startsWith était bien souvent plus rapide qu'un RegEx qui est un outil plutôt lourd à l'échelle de quelques milisecondes" }
    //   { id: 'github-actions', description: "Déploiement et tests continus.", longDescription: "", conceptIds: [] }
    ], 

    medias: ['https://imgur.com/P0QFVBe.png', 'https://imgur.com/RiZV3YV.png', 'https://imgur.com/2ysW17Y.png', 'https://imgur.com/WrZsRzV.png'],
    // medias: [
    //   {
    //     title: 'Invitation à jouer au UNO sur Discord avec le bot UnoOnDisc',  
    //     url: 'https://imgur.com/RiZV3YV.png',      
    //   },
    //   {
    //     title: 'Partie de uno sur Discord avec le bot UnoOnDisc',
    //     url: 'https://imgur.com/RlpI9qc.png'
    //   },
    //   {
    //     title: "Paramétrage des règles et fonctionnalités d'une partie de UNO avec le bot UnoOnDisc",
    //     url: 'https://imgur.com/2ysW17Y.png'
    //   },
    //   {
    //     title: 'Jeu du 2048 sur Discord avec le bot UnoOnDisc',
    //     url: 'https://imgur.com/WrZsRzV.png'
    //   }
    // ],
  },
  'mc-plugin': { 
    id: 'mc-plugin', title: 'Plugin Minecraft', context: 'Projet Perso', educationId: 'formation-perso',
    description: 'Gestion des permissions et zones sur serveur multijoueur. Configuration Yaml.', 
    startDateTimesTamp: 1577833200,
    longDescription: stripIndents`Un projet développé lors de mes premières années de programmation, me permettant d'appréhender le fonctionnement d'un serveur de jeu, de son API publique et de la gestion de configurations personnalisées pour les administrateurs.`, 
    contentPath: '/projects/mc-plugin.md',
    github: 'https://github.com/Nostres25/MinerstiaPlugin', website: '', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Création d'un plugin utilitaire.", longDescription: "" }
    ],
    tools: [
      { id: 'eclipse', description: "Environnement de développement.", longDescription: "", conceptIds: ['eclipse-libs'] },
      { id: 'java', description: "Apprentissage sur le tas du langage.", longDescription: "", conceptIds: ['exceptions', 'poo', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums'] },
      { id: 'spigot', description: "API serveur Minecraft.", longDescription: "", conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'] },
      { id: 'git', description: "Sauvegardes du projet.", longDescription: "", conceptIds: ['git-commits', 'git-remote'] },
      { id: 'trello', description: "Organisation des fonctionnalités à développer en backlog et par version", longDescription: "", conceptIds: [] }
    ],

    medias: []
  },
  'sae-echecs': { 
    id: 'sae-echecs', title: 'Jeu d\'échecs', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Développement d\'un jeu d\'échecs complet dans le terminal.', 
    contentPath: '/projects/sae-echecs.md',
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations['S2'].startTimestamp,
    longDescription: stripIndents`Création intégrale d'un jeu d'échecs respectant la totalité des règles officielles (roque, prise en passant) en implémentant une architecture orientée objet stricte.`, 
    github: 'https://github.com/Nostres25/JavaChess', website: '', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Logique métier des échecs.", longDescription: "" },
      { id: 'optimiser', description: "Optmisation de mémoire, des opérations et de l'aspect visuel du code.", longDescription: "" },
      { id: 'conduire-projet', description: "Création d'un nouveau projet de développement.", longDescription: "Respect des échéances, mise en place du Git, définition des tâches" },
      { id: 'collaborer', description: "Collaboration en duo.", longDescription: "" }

    ],
    tools: [
      { id: 'vscode', description: "IDE utilisé par l'équipe.", longDescription: "", conceptIds: [] },
      { id: 'java', description: "Développement en Java 8.", longDescription: "", conceptIds: ['exceptions', 'java-scanner', 'poo', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums'] },
      { id: 'git', description: "Collaboration de code.", longDescription: "", conceptIds: ['git-commits', 'git-branches', 'git-merges', 'git-conflicts'] }
    ],

    medias: [],
  },

  'sae-suivi': { 
    id: 'sae-suivi', title: 'Suivi de colis', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Site web de suivi de colis pour l\'IUT.', 
    contentPath: '/projects/sae-suivi.md',
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations['S3'].startTimestamp,
    longDescription: stripIndents`Application web interne permettant la gestion logistique des colis reçus par le secrétariat de l'IUT et envoyant des notifications aux destinataires.`, 
    github: 'https://github.com/Nostres25/suivi-colis-iutv-v2', website: '', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Création de la plateforme web complète.", longDescription: "" },
      { id: 'optimiser', description: "Optimisation de l'applciation pour la réactivité.", longDescription: "" },
      { id: 'administrer', description: "Mise en place d'une image docker pour l'application.", longDescription: "" },
      { id: 'gerer-donnees', description: "Modélisation des données, utilisations d'une base de données.", longDescription: "" },
      { id: 'conduire-projet', description: "Définition des tâches & objectifs, rappels de tâches, organisation du code...", longDescription: "" },
      { id: 'collaborer', description: "En équipe de 5.", longDescription: "" },
    ],
    tools: [
      { id: 'laravel', description: "Framework Back-end.", longDescription: "", conceptIds: ['mvc', 'migrations', 'laravel-pagination', 'seeders', 'laravel-query', 'laravel-files', 'auth', 'sessions'] },
      { id: 'javascript', description: "Interactivité de l'interface.", longDescription: "", conceptIds: ['dom', 'ajax', 'events', 'callbacks', 'loops', 'scopes'] },
      { id: 'bootstrap', description: "Design rapide et responsive.", longDescription: "", conceptIds: ['boot-modals', 'boot-buttons', 'boot-forms', 'boot-dropdowns', 'boot-icons', 'responsive', 'boot-collapse', 'boot-navbar', 'boot-text'] },
      { id: 'blade', description: "Moteur de template.", longDescription: "", conceptIds: ['layouts', 'components', 'escape', 'blade-directives'] },
      { id: 'php', description: "Logique métier.", longDescription: "", conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo'] },
      { id: 'eloquent', description: "ORM pour la base de données.", longDescription: "", conceptIds: ['eloquent-models', 'code-to-db', 'laravel-query', 'collections', 'eloquent-relations', 'factories'] },
      { id: 'filament', description: "Panneau d'administration.", longDescription: "", conceptIds: ['filament-pages', 'filament-sync'] },
      { id: 'git', description: "Versioning en équipe.", longDescription: "", conceptIds: ['git-commits', 'git-branches', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'] },
      { id: 'github-project', description: "Organisation des tâches.", longDescription: "", conceptIds: ['gh-backlog', 'gh-priority', 'gh-sub'] },
      { id: 'composer', description: "Gestionnaire de packages PHP.", longDescription: "", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'] },
      { id: 'php-storm', description: "Meilleur IDE trouvé pour le PHP bien qu'un peu lourd", longDescription: "", conceptIds: [] }
    ],

    medias: []
  },
  'sae-python': { 
    id: 'sae-python', title: 'Étude de graphes', context: 'SAÉ BUT', educationId: 'but-info',
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations.S1.startTimestamp,
    description: 'Étude de réseaux et de complexité algorithmique.', longDescription: "", github: '', website: '', images: [], 
    contentPath: '/projects/sae-python.md',
    competencies: [{ id: 'optimiser', description: "Analyse des temps d'exécution.", longDescription: "" }],
    tools: [{ id: 'python', description: "Scripting d'analyse.", longDescription: "", conceptIds: ['complexite'] }],

    medias: []
  },
  'sae-bd': { 
    id: 'sae-bd', title: 'Modélisation BD', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Recueil des besoins, modélisation et construction de bases de données.', longDescription: "", github: '', website: '', images: [], 
    contentPath: '/projects/sae-bd.md',
    competencies: [{ id: 'gerer-donnees', description: "Architecture de la BD.", longDescription: "" }],
    tools: [{ id: 'sql', description: "Requêtes de test.", longDescription: "", conceptIds: ['db-model'] }],

    medias: []
  },
  'sae-sys': { 
    id: 'sae-sys', title: 'Configuration Ubuntu', context: 'SAÉ BUT', educationId: 'but-info',
    startDateTimesTamp: EDUCATIONS['but-info'].segmentations.S2.startTimestamp,
    description: 'Configurations d\'un système Ubuntu (Linux) et réseaux (IPv4, DHCP, Pare-feux).', longDescription: "", github: '', website: '', images: [], 
    contentPath: '/projects/sae-sys.md',
    competencies: [{ id: 'administrer', description: "Installation et configuration OS.", longDescription: "" }],
    tools: [{ id: 'linux', description: "Commandes terminal.", longDescription: "", conceptIds: ['sys'] }],

    medias: []
  },

  'portfolio-web': {
    id: 'portfolio-web',
    title: 'Site portfolio',
    context: 'BUT',
    educationId: 'but-info',
    startDateTimesTamp: 1781647200,
    description: "Le site sur lequel vous êtes. Au départ il s'agit d'un projet noté en BUT Informatique qui sert également à nous vendre dans le monde professionnel",

    competencies: [
      { id: 'realiser-app', description: "Réalisation de l'application du portfolio.", longDescription: "" },
      { id: 'optimiser', description: "Optimisation de l'applciation pour la réactivité.", longDescription: "" },
      { id: 'gerer-donnees', description: "Représentation des informations me concernant sous la forme de données dans le code.", longDescription: "" },
      { id: 'conduire-projet', description: "Définition des tâches et des priorités", longDescription: "" },    ],
    tools: [
      { id: 'javascript', description: "Logique principale du bot.", longDescription: "", conceptIds: ['async', 'callbacks', 'events', 'scopes', 'loops'] },
      { id: 'nodejs', description: "Environnement d'exécution.", longDescription: "", conceptIds: ['modules', 'modules-dev'] },
      { id: 'nuxtjs', description: "Découverte du fonctionnement du framework", longDescription: "", conceptIds: [] },
      { id: 'typescript', description: "Migration vers du typage strict.", longDescription: "", conceptIds: ['interfaces', 'classes', 'enums'] },
      { id: 'vscode', description: "Environnement de développement.", longDescription: "", conceptIds: [] },
      { id: 'vuejs', description: "Vues en javascript avec layout, composants etc...", longDescription: "", conceptIds: [] },
      { id: 'git', description: "Gestion du code source.", longDescription: "", conceptIds: ['git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts'] },
      { id: 'tailwindcss', description: "Majorité du style de l'application"}
    ],

    medias:  []
  }
}

// --- EXPÉRIENCES ---
export const EXPERIENCES = {
  'stage-mf': { 
    id: 'stage-mf', title: 'Développeur PHP front/back', entity: 'Market Factory', date: 'Janv 2026 - Mars 2026', 
    startDateTimesTamp: 1769414400,
    endDateTimestamp: 1774022400,
    description: 'Développement API, correction de failles, refonte et rédaction de documentation.', 
    contentPath: stageMfContent,
    longDescription: stageMfContent, 
    
    competencies: [
      { id: 'realiser-app', description: "Refonte d'une application web PHP, correction de failles de sécurité...", longDescription: "" },
      { id: 'optimiser', description: "Optimisation de requêtes HTTP/API, logique PHP, requêtes SQL...", longDescription: "" },
      { id: 'administrer', description: "Configuration Apache2, documentation du projet, définition de fichier .htaccess", longDescription: "" },
      { id: 'gerer-donnees', description: "Stockage des stocks toptex, enquête sur les schémas SQL, debug par requêtes SQL...", longDescription: "" },
      { id: 'conduire-projet', description: "Redéfinition de la structure du projet, documentation.", longDescription: "" },
      { id: 'collaborer', description: "retours réguliers au supérieur, communication des changements importants en temps réel...", longDescription: "" },
    ],
    tools: [
      // TODO à compléter (dom, javascript, jquery, ajax, composer "sources annexes")
      { id: 'php', description: "Refonte sans framework en PHP 8.3 traditionel", longDescription: "", conceptIds: ['mvc', 'secu'] },
      { id: 'git', description: "Travail en équipe.", longDescription: "", conceptIds: ['git-commits', 'versioning', 'git-branches'] },
      { id: 'css', description: "HTML/CSS des plus traditionnels, sans moteur de template", conceptIds: [] },
      { id: 'bootstrap', description: "Utilisation de classes bootstrap", conceptIds: [] },
      { id: 'javascript', description: "Affichages dynamiques via javascript", conceptIds: ['dom', 'ajax'] },
      { id: 'composer', description: "Mise en place de composer pour des outils de développement & installer les ressources ainsi que css", conceptIds: ['paquets-scripts', 'modules', 'modules-dev'] },
    ],

    medias: []
  },
  'draftbot': { 
    id: 'draftbot', title: 'Support Utilisateur', entity: 'DraftBot', year: 2019, date: 'Depuis 2019', 
    description: 'Tests, identification et résolution de problèmes. Agent présent sur +1M de serveurs.', 
    contentPath: '/experiences/draftbot.md',
    longDescription: stripIndents`Mes missions incluaient la réalisation de tests, l'identification et la résolution de problèmes en direct avec la communauté. J'ai également identifié les besoins des utilisateurs en apportant des solutions cohérentes.`, 
    competencies: [
      { id: 'collaborer', description: "Support aux développeurs.", longDescription: "" }
    ],
    tools: [],

    medias: []
  }
}

const currentDate = Date.now();

// --- OUTILS ---
// Index de maîtrise (0 = Notions, 1 = Découverte, 2 = Maîtrise globale, 3 = Assez avancée, 4 = Avancée, 5 = Très avancée)
export const TOOLS = {
  // Langages & Frameworks JS/TS
  javascript: { id: 'javascript', name: 'JavaScript', icon: 'JS', masteryIndex: 4, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections', 'dom', 'ajax'], compIds: ['realiser-app'] },
  typescript: { id: 'typescript', name: 'TypeScript', icon: 'TS', masteryIndex: 3, duration: getYearsFormatted(1660341600, currentDate), conceptIds: ['typage', 'poo', 'interfaces', 'classes', 'enums'], compIds: ['realiser-app'] }, // preuve pour la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno/?since=2021-10-13&until=2023-02-28
  nodejs: { id: 'nodejs', name: 'Node.js', icon: 'N', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs'], compIds: ['realiser-app', 'optimiser'] },
  expressjs: { id: 'expressjs', name: 'Express.js', icon: 'Ex', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
  discordjs: { id: 'discordjs', name: 'Discord.js', icon: 'Djs', masteryIndex: 4, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'], compIds: ['realiser-app', 'optimiser'] },
  nuxtjs: { id: 'nuxtjs', name: 'Nuxt.js', icon: 'Nx', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-ap couduresbot ip'] },
  vuejs: { id: 'vuejs', name: 'Vue.js', icon: 'V', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations['S4'].startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'optimiser'] },
  
  // Outils & Libs Node
  'node-fs': { id: 'node-fs', name: 'node fs', icon: 'fs', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['fs'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] },
  nodemon: { id: 'nodemon', name: 'nodemon', icon: 'nd', masteryIndex: 2, duration: getYearsFormatted(1753308000, currentDate), conceptIds: ['nodemon-restart'], compIds: ['realiser-app'] }, // Preuve de la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno?after=56b7655c3d7eb1b82d9fd7dbbea86c5212645ccf+34
  'node-canvas': { id: 'node-canvas', name: 'node canvas', icon: 'cv', masteryIndex: 1, duration: getYearsFormatted(1692828000, currentDate), conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'], compIds: ['realiser-app'] }, // Preuve pour la date : https://github.com/DraftBot/DraftBot-uno/commit/adc9a552a6af32b83b1a530c78c5cb95b455c5a3

  // Écosystème PHP
  php: { id: 'php', name: 'PHP', icon: 'PHP', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo'], compIds: ['realiser-app'] },
  laravel: { id: 'laravel', name: 'Laravel', icon: 'Lv', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['mvc', 'migrations', 'laravel-pagination', 'seeders', 'laravel-query', 'laravel-files', 'auth', 'sessions'], compIds: ['realiser-app', 'optimiser'] },
  blade: { id: 'blade', name: 'Blade', icon: 'Bl', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['layouts', 'components', 'escape', 'blade-directives'], compIds: ['realiser-app', 'optimiser'] },
  eloquent: { id: 'eloquent', name: 'Eloquent ORM', icon: 'El', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['eloquent-models', 'code-to-db', 'eloquent-relations', 'collections', 'factories'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] },
  filament: { id: 'filament', name: 'Filament', icon: 'Fm', masteryIndex: 1, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['filament-pages', 'filament-sync'], compIds: ['realiser-app', 'gerer-donnees'] },
  composer: { id: 'composer', name: 'Composer', icon: 'Cp', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'], compIds: ['administrer'] }, // Concepts partagés avec Node (packages)

  // Écosystème Java
  java: { id: 'java', name: 'Java', icon: 'J', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['poo', 'exceptions', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums', 'java-scanner'], compIds: ['realiser-app'] },
  spigot: { id: 'spigot', name: 'Spigot MC', icon: 'Spi', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'], compIds: ['realiser-app', 'optimiser', 'administrer'] },
  junit: { id: 'junit', name: 'JUnit 4 & 5', icon: 'Ju', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['tests-unitaires', 'tests-fonctionnels'], compIds: ['realiser-app', 'optimiser']},
  jacoco: { id: 'jacoco', name: 'JaCoCo', icon: 'JaCo', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['couverture-tests'], compIds: ['realiser-app', 'optimiser']},
  mockmvc: { id: 'mockmvc', name: 'MockMVC', icon: 'Mock', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['tests-fonctionnels'], compIds: ['realiser-app', 'optimiser']},
  springboot: { id: 'springboot', name: 'SpringBoot', icon: 'SpBo', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: ['mvc'], compIds: ['realiser-app']},

  // Front-End (HTML/CSS)
  css: { id: 'css', name: 'CSS', icon: 'CSS', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S2.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
  bootstrap: { id: 'bootstrap', name: 'Bootstrap', icon: 'Bs', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: ['boot-modals', 'boot-buttons', 'boot-forms', 'boot-dropdowns', 'boot-icons', 'responsive', 'boot-collapse', 'boot-navbar', 'boot-text'], compIds: ['realiser-app'] },
  tailwindcss: { id: 'tailwindcss', name: 'Tailwind CSS', icon: 'Tw', masteryIndex: 1, duration: getYearsFormatted(PROJECTS['portfolio-web'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
  figma: { id: 'figma', name: 'Figma', icon: 'Fg', masteryIndex: 2, duration: getYearsFormatted(1672527600, currentDate), conceptIds: ['figma-logos', 'visuels'], compIds: ['realiser-app'] },

  // Python
  python: { id: 'python', name: 'Python', icon: 'Py', masteryIndex: 3, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: ['complexite'], compIds: ['optimiser', 'realiser-app'] },
  flask: { id: 'flask', name: 'Flask', icon: 'Fl', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S3.startTimestamp, currentDate), conceptIds: ['mvc'], compIds: ['realiser-app'] },

  // Base de données & Infrastructure
  sql: { id: 'sql', name: 'SQL / SGBDR', icon: 'DB', masteryIndex: 3, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: ['db-model'], compIds: ['gerer-donnees'] },
  linux: { id: 'linux', name: 'Linux / Bash', icon: 'L', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: ['sys'], compIds: ['administrer'] },
  nixos: { id: 'nixos', name: 'NixOS', icon: 'Nix', masteryIndex: 2, duration: getYearsFormatted(1752012000, currentDate), conceptIds: [], compIds: ['administrer'] },
  docker: { id: 'docker', name: 'Docker', icon: 'D', masteryIndex: 2, duration: getYearsFormatted(1660341600, currentDate), conceptIds: ['conteneur'], compIds: ['administrer'] },

  // Outils de gestion & IDE
  vscode: { id: 'vscode', name: 'Visual Studio Code', icon: 'VS', masteryIndex: 3, duration: getYearsFormatted(PROJECTS['uno-disc'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'collaborer'] },
  eclipse: { id: 'eclipse', name: 'Eclipse IDE', icon: 'Ec', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: ['eclipse-libs'], compIds: ['realiser-app'] },
  'android-studio': { id: 'android-studio', name: 'Android Studio', icon: 'AS', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['android-bases'], compIds: ['realiser-app'] },
  'php-storm': { id: 'php-storm', name: 'PHP Storm IDE', icon: 'PS', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['sae-suivi'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'collaborer']},

  // Collaboration & DevOps
  git: { id: 'git', name: 'Git', icon: 'G', masteryIndex: 3, duration: getYearsFormatted(1610578800, currentDate), conceptIds: ['versioning', 'git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'], compIds: ['collaborer', 'conduire-projet'] }, // Preuve de la date : premier repo github (ScandiumPlugin)
  'github-actions': { id: 'github-actions', name: 'GitHub Actions (CI/CD)', icon: 'GA', masteryIndex: 1, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: [], compIds: ['administrer', 'realiser-app'] },
  'github-project': { id: 'github-project', name: 'GitHub Project', icon: 'GP', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: ['gh-backlog', 'gh-priority', 'gh-sub'], compIds: ['conduire-projet', 'collaborer'] },
  trello: { id: 'trello', name: 'Trello', icon: 'Tr', masteryIndex: 2, duration: getYearsFormatted(PROJECTS['mc-plugin'].startDateTimesTamp, currentDate), conceptIds: [], compIds: ['conduire-projet', 'collaborer'] },
  sentry: { id: 'sentry', name: 'Sentry', icon: 'Se', masteryIndex: 1, duration: getYearsFormatted(1688335200, currentDate), conceptIds: ['bug-monitoring', 'sentry-debug'], compIds: ['optimiser', 'conduire-projet', 'administrer'] }, // Preuve de la date : https://github.com/DraftBot/DraftBot-uno/commits/feat/uno/?before=56b7655c3d7eb1b82d9fd7dbbea86c5212645ccf+350

  // Divers
  regex: { id: 'regex', name: 'RegEx', icon: 'RE', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S1.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app', 'optimiser']},
  'ia-gen': { id: 'ia-gen', name: 'IA Génératives', icon: 'IA', masteryIndex: 2, duration: getYearsFormatted(EDUCATIONS['but-info'].segmentations.S4.startTimestamp, currentDate), conceptIds: [], compIds: ['realiser-app'] },
}

// Timeline data...
export const TIMELINE_DATA = [
  { id: 'mc-plugin', modalType: 'project', type: 'pro', title: 'Plugin Minecraft', entity: 'Projet Perso', startDate: 'Jan 2020', endDate: 'Dec 2022', durationMonths: 36, isEvent: false, stemHeight: 90, textOffset: '-translate-x-[80%]' },
  { id: 'bac', modalType: 'education', type: 'edu', title: 'BAC Général', entity: 'Lycée', startDate: 'Sept 2021', endDate: 'Juin 2024', durationMonths: 33, isEvent: false, stemHeight: 40, textOffset: '-translate-x-1/2' },
  { id: 'uno-disc', modalType: 'project', type: 'pro', title: 'UnoOnDisc', entity: 'Projet Perso', startDate: 'Sept 2022', endDate: 'Présent', durationMonths: 46, isEvent: false, stemHeight: 40, textOffset: '-translate-x-[30%]' },
  { id: 'but-info', modalType: 'education', type: 'edu', title: 'BUT Informatique', entity: 'IUT Sorbonne P-N', startDate: 'Sept 2024', endDate: 'Juin 2027', durationMonths: 33, isEvent: false, stemHeight: 80, textOffset: '-translate-x-[60%]' },
  { id: 'stage-mf', modalType: 'experience', type: 'pro', title: 'Stage Dev PHP', entity: 'Market Factory', startDate: 'Jan 2026', endDate: 'Mars 2026', durationMonths: 3, isEvent: false, stemHeight: 110, textOffset: '-translate-x-[50%]' }
] 

export const PROJECT_IDS = Object.keys(PROJECTS) as Project[];
export const EXPERIENCE_IDS = Object.keys(EXPERIENCES) as Experience[];
export const EDUCATION_IDS = Object.keys(EDUCATIONS) as Education[];

export const TOOL_VALUES = Object.values(TOOLS);
export const PROJECT_VALUES = Object.values(PROJECTS);
export const EXPERIENCE_VALUES = Object.values(EXPERIENCES);
export const EDUCATION_VALUES = Object.values(EDUCATIONS);