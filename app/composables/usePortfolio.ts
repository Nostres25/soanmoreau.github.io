// composables/usePortfolio.ts
import { ref, computed } from 'vue'
import { stripIndents } from 'common-tags'

export const MASTERY_LEVELS = [
  "Notions", // Je connais à peu prêt le fonctionnement global sans expérience
  "Découverte", // Je connais à peu prêt le fonctionnement global et je suis entrain de tester ainsi qu'apprendre en même temps
  "Maîtrise globale", // Je connais la majorité des fonctionnalités/notions de base grâce à un ou des projets ou grâce des formations
  "Maîtrise assez avancée", // Je connais la majorité des fonctionnalités/notions de base et j'ai quelques points avancés grâce à des projets ou des formations
  "Maîtrise avancée", // J'estime que ce que je connais est globalement avancé par rapport aux fonctionnalités/notions et que je suis peut-être au dessu des espérance pour mon profil grâce à des projets ou des formations
  "Maîtrise très avancée" // J'estime que mes connaissances sont sûrement au delà des espérances pour mon profil
];
// --- 1. NOTIONS (Nouveau concept indépendant) ---
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

// --- 2. OUTILS ---
// Index de maîtrise (0 = Notions, 1 = Découverte, 2 = Maîtrise globale, 3 = Assez avancée, 4 = Avancée, 5 = Très avancée)
export const TOOLS = {
  // Langages & Frameworks JS/TS
  javascript: { id: 'javascript', name: 'JavaScript', icon: 'JS', masteryIndex: 4, duration: '4 ans', conceptIds: ['async', 'callbacks', 'events', 'scopes', 'poo', 'switch', 'exceptions', 'loops', 'collections', 'dom', 'ajax'], compIds: ['realiser-app'] },
  typescript: { id: 'typescript', name: 'TypeScript', icon: 'TS', masteryIndex: 3, duration: '2 ans', conceptIds: ['typage', 'poo', 'interfaces', 'classes', 'enums'], compIds: ['realiser-app'] },
  nodejs: { id: 'nodejs', name: 'Node.js', icon: 'N', masteryIndex: 3, duration: '2 ans', conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts', 'sharding', 'fs'], compIds: ['realiser-app', 'optimiser'] },
  expressjs: { id: 'expressjs', name: 'Express.js', icon: 'Ex', masteryIndex: 1, duration: '1 an', conceptIds: [], compIds: ['realiser-app'] },
  discordjs: { id: 'discordjs', name: 'Discord.js', icon: 'Djs', masteryIndex: 4, duration: '2 ans', conceptIds: ['djs-slash', 'djs-components', 'djs-modals', 'djs-ephemeral', 'sharding', 'djs-cache', 'djs-collectors'], compIds: ['realiser-app', 'optimiser'] },
  nuxtjs: { id: 'nuxtjs', name: 'Nuxt.js', icon: 'Nx', masteryIndex: 1, duration: '1 an', conceptIds: [], compIds: ['realiser-app'] },
  vuejs: { id: 'vuejs', name: 'Vue.js', icon: 'V', masteryIndex: 1, duration: '1 an', conceptIds: [], compIds: ['realiser-app', 'optimiser'] },
  
  // Outils & Libs Node
  'node-fs': { id: 'node-fs', name: 'node fs', icon: 'fs', masteryIndex: 2, duration: '2 ans', conceptIds: ['fs'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] },
  nodemon: { id: 'nodemon', name: 'nodemon', icon: 'nd', masteryIndex: 2, duration: '2 ans', conceptIds: ['nodemon-restart'], compIds: ['realiser-app'] },
  'node-canvas': { id: 'node-canvas', name: 'node canvas', icon: 'cv', masteryIndex: 1, duration: '1 an', conceptIds: ['canvas-2d', 'canvas-overlay', 'canvas-rotation'], compIds: ['realiser-app'] },

  // Écosystème PHP
  php: { id: 'php', name: 'PHP', icon: 'PHP', masteryIndex: 2, duration: '1 an', conceptIds: ['callbacks', 'enums', 'php-typing', 'loops', 'scopes', 'poo'], compIds: ['realiser-app'] },
  laravel: { id: 'laravel', name: 'Laravel', icon: 'Lv', masteryIndex: 3, duration: '1 an', conceptIds: ['mvc', 'migrations', 'laravel-pagination', 'seeders', 'laravel-query', 'laravel-files', 'auth', 'sessions'], compIds: ['realiser-app', 'optimiser'] },
  blade: { id: 'blade', name: 'Blade', icon: 'Bl', masteryIndex: 2, duration: '1 an', conceptIds: ['layouts', 'components', 'escape', 'blade-directives'], compIds: ['realiser-app', 'optimiser'] },
  eloquent: { id: 'eloquent', name: 'Eloquent ORM', icon: 'El', masteryIndex: 2, duration: '1 an', conceptIds: ['eloquent-models', 'code-to-db', 'eloquent-relations', 'collections', 'factories'], compIds: ['realiser-app', 'optimiser', 'gerer-donnees'] },
  filament: { id: 'filament', name: 'Filament', icon: 'Fm', masteryIndex: 1, duration: '1 an', conceptIds: ['filament-pages', 'filament-sync'], compIds: ['realiser-app', 'gerer-donnees'] },
  composer: { id: 'composer', name: 'Composer', icon: 'Cp', masteryIndex: 2, duration: '1 an', conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'], compIds: ['administrer'] }, // Concepts partagés avec Node (packages)

  // Écosystème Java
  java: { id: 'java', name: 'Java', icon: 'J', masteryIndex: 3, duration: '4 ans', conceptIds: ['poo', 'exceptions', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums', 'java-scanner'], compIds: ['realiser-app'] },
  spigot: { id: 'spigot', name: 'Spigot MC', icon: 'Spi', masteryIndex: 3, duration: '2 ans', conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'], compIds: ['realiser-app', 'optimiser', 'administrer'] },
  
  // Front-End (HTML/CSS)
  css: { id: 'css', name: 'CSS', icon: 'CSS', masteryIndex: 2, duration: '3 ans', conceptIds: [], compIds: ['realiser-app'] },
  bootstrap: { id: 'bootstrap', name: 'Bootstrap', icon: 'Bs', masteryIndex: 3, duration: '1 an', conceptIds: ['boot-modals', 'boot-buttons', 'boot-forms', 'boot-dropdowns', 'boot-icons', 'responsive', 'boot-collapse', 'boot-navbar', 'boot-text'], compIds: ['realiser-app'] },
  tailwindcss: { id: 'tailwindcss', name: 'Tailwind CSS', icon: 'Tw', masteryIndex: 1, duration: '1 an', conceptIds: [], compIds: ['realiser-app'] },
  figma: { id: 'figma', name: 'Figma', icon: 'Fg', masteryIndex: 2, duration: '2 ans', conceptIds: ['figma-logos', 'visuels'], compIds: ['realiser-app'] },

  // Python
  python: { id: 'python', name: 'Python', icon: 'Py', masteryIndex: 3, duration: '3 ans', conceptIds: ['complexite'], compIds: ['optimiser', 'realiser-app'] },
  flask: { id: 'flask', name: 'Flask', icon: 'Fl', masteryIndex: 2, duration: '1 an', conceptIds: [], compIds: ['realiser-app'] },

  // Base de données & Infrastructure
  sql: { id: 'sql', name: 'SQL / SGBDR', icon: 'DB', masteryIndex: 3, duration: '2 ans', conceptIds: ['db-model'], compIds: ['gerer-donnees'] },
  linux: { id: 'linux', name: 'Linux / Bash', icon: 'L', masteryIndex: 3, duration: '2 ans', conceptIds: ['sys'], compIds: ['administrer'] },
  nixos: { id: 'nixos', name: 'NixOS', icon: 'Nix', masteryIndex: 2, duration: '1 an', conceptIds: [], compIds: ['administrer'] },
  docker: { id: 'docker', name: 'Docker', icon: 'D', masteryIndex: 2, duration: '2 ans', conceptIds: ['conteneur'], compIds: ['administrer'] },

  // Outils de gestion & IDE
  vscode: { id: 'vscode', name: 'Visual Studio Code', icon: 'VS', masteryIndex: 3, duration: '4 ans', conceptIds: [], compIds: ['realiser-app', 'collaborer'] },
  eclipse: { id: 'eclipse', name: 'Eclipse IDE', icon: 'Ec', masteryIndex: 2, duration: '2 ans', conceptIds: ['eclipse-libs'], compIds: ['realiser-app'] },
  'android-studio': { id: 'android-studio', name: 'Android Studio', icon: 'AS', masteryIndex: 2, duration: '1 an', conceptIds: ['android-bases'], compIds: ['realiser-app'] },
  
  // Collaboration & DevOps
  git: { id: 'git', name: 'Git', icon: 'G', masteryIndex: 3, duration: '4 ans', conceptIds: ['versioning', 'git-commits', 'git-remote', 'git-branches', 'git-cherry', 'git-merges', 'git-conflicts', 'git-issues', 'git-pr'], compIds: ['collaborer', 'conduire-projet'] },
  'github-actions': { id: 'github-actions', name: 'GitHub Actions (CI/CD)', icon: 'GA', masteryIndex: 1, duration: '1 an', conceptIds: [], compIds: ['administrer', 'realiser-app'] },
  'github-project': { id: 'github-project', name: 'GitHub Project', icon: 'GP', masteryIndex: 2, duration: '2 ans', conceptIds: ['gh-backlog', 'gh-priority', 'gh-sub'], compIds: ['conduire-projet', 'collaborer'] },
  trello: { id: 'trello', name: 'Trello', icon: 'Tr', masteryIndex: 2, duration: '2 ans', conceptIds: [], compIds: ['conduire-projet', 'collaborer'] },
  sentry: { id: 'sentry', name: 'Sentry', icon: 'Se', masteryIndex: 1, duration: '1 an', conceptIds: ['bug-monitoring', 'sentry-debug'], compIds: ['optimiser', 'conduire-projet', 'administrer'] },

  // Divers
  'ia-gen': { id: 'ia-gen', name: 'IA Génératives', icon: 'IA', masteryIndex: 2, duration: '1 an', conceptIds: [], compIds: ['realiser-app'] },
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
    longDescription: stripIndents`Bot interactif permettant aux membres d'un serveur Discord de jouer au célèbre jeu de cartes UNO. Ce projet a nécessité la gestion d'une base de joueurs massive et a été un excellent terrain de jeu pour appréhender l'asynchrone et l'optimisation.`, 
    github: '', website: 'https://top.gg/bot/985152555791290408', images: [], 
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
      { id: 'github-actions', description: "Déploiement et tests continus.", longDescription: "", conceptIds: [] }
    ]
  },
  'mc-plugin': { 
    id: 'mc-plugin', title: 'Plugin Minecraft', context: 'Projet Perso', educationId: 'formation-perso',
    description: 'Gestion des permissions et zones sur serveur multijoueur. Configuration Yaml.', 
    longDescription: stripIndents`Un projet développé lors de mes premières années de programmation, me permettant d'appréhender le fonctionnement d'un serveur de jeu, de son API publique et de la gestion de configurations personnalisées pour les administrateurs.`, 
    github: 'https://github.com/Nostres25/MinerstiaPlugin', website: '', images: [], 
    competencies: [
      { id: 'realiser-app', description: "Création d'un plugin utilitaire.", longDescription: "" }
    ],
    tools: [
      { id: 'eclipse', description: "Environnement de développement.", longDescription: "", conceptIds: ['eclipse-libs'] },
      { id: 'java', description: "Apprentissage sur le tas du langage.", longDescription: "", conceptIds: ['exceptions', 'poo', 'poly', 'java-uml', 'scopes', 'java-arraylist', 'loops', 'switch', 'enums'] },
      { id: 'spigot', description: "API serveur Minecraft.", longDescription: "", conceptIds: ['perms', 'spigot-yaml', 'spigot-events', 'events', 'spigot-gui', 'spigot-tools', 'cmds', 'spigot-mod', 'spigot-tab', 'zone', 'spigot-groups'] },
      { id: 'git', description: "Sauvegardes du projet.", longDescription: "", conceptIds: ['git-commits', 'git-remote'] }
    ]
  },
  'sae-echecs': { 
    id: 'sae-echecs', title: 'Jeu d\'échecs', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Développement d\'un jeu d\'échecs complet dans le terminal.', 
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
    ]
  },
  'sae-suivi': { 
    id: 'sae-suivi', title: 'Suivi de colis', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Site web de suivi de colis pour l\'IUT.', 
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
      { id: 'composer', description: "Gestionnaire de packages PHP.", longDescription: "", conceptIds: ['modules', 'modules-dev', 'versioning', 'paquets-scripts'] }
    ]
  },
  'sae-python': { 
    id: 'sae-python', title: 'Étude de graphes', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Étude de réseaux et de complexité algorithmique.', longDescription: "", github: '', website: '', images: [], 
    competencies: [{ id: 'optimiser', description: "Analyse des temps d'exécution.", longDescription: "" }],
    tools: [{ id: 'python', description: "Scripting d'analyse.", longDescription: "", conceptIds: ['complexite'] }]
  },
  'sae-bd': { 
    id: 'sae-bd', title: 'Modélisation BD', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Recueil des besoins, modélisation et construction de bases de données.', longDescription: "", github: '', website: '', images: [], 
    competencies: [{ id: 'gerer-donnees', description: "Architecture de la BD.", longDescription: "" }],
    tools: [{ id: 'sql', description: "Requêtes de test.", longDescription: "", conceptIds: ['db-model'] }]
  },
  'sae-sys': { 
    id: 'sae-sys', title: 'Configuration Ubuntu', context: 'SAÉ BUT', educationId: 'but-info',
    description: 'Configurations d\'un système Ubuntu (Linux) et réseaux (IPv4, DHCP, Pare-feux).', longDescription: "", github: '', website: '', images: [], 
    competencies: [{ id: 'administrer', description: "Installation et configuration OS.", longDescription: "" }],
    tools: [{ id: 'linux', description: "Commandes terminal.", longDescription: "", conceptIds: ['sys'] }]
  } 
}

// --- 6. EXPÉRIENCES ---
export const EXPERIENCES = {
  'stage-mf': { 
    id: 'stage-mf', title: 'Développeur PHP front/back', entity: 'Market Factory', date: 'Janv 2026 - Mars 2026', 
    description: 'Développement API, correction de failles, refonte et rédaction de documentation.', 
    longDescription: stripIndents`Ce stage de deuxième année a marqué ma véritable transition entre le code académique et les exigences de production en entreprise. J'y ai été confronté à une base de code existante, m'apprenant l'importance cruciale de la maintenabilité et de la sécurité.
    
    ## Qu'ai-je appris ? 
    J'ai acquis une solide méthodologie dans l'audit de code, en identifiant et en corrigeant des failles de sécurité. J'ai également compris que le développement ne s'arrête pas au code : j'ai pris l'initiative de rédiger une documentation complète et d'intégrer de nouveaux outils à la stack technique pour faciliter le travail futur de l'équipe.
    
    ## Comment le démontrer ? 
    Les nouvelles fonctionnalités API que j'ai développées sont aujourd'hui en production. La refonte architecturale que j'ai amorcée a permis un gain de performance et de clarté, et je peux vous montrer les codes réalisés sur demande.
    
    ## Que me reste-t-il à améliorer ? 
    Cette expérience m'a fait réaliser à quel point j'apprécie le développement de qualité, la sécurité et l'optimisation. J'ai encore beaucoup de choses à apprendre du côté de la sécurté. Je peux aussi gagner en efficacité et en connaissance sur de nouvelles technologies.`, 
    
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
      { id: 'javascript', description: "Affichages dynamiques via havascript", conceptIds: ['dom', 'ajax'] },
      { id: 'composer', description: "Mise en place de composer pour des outils de développement & installer les ressources ainsi que css", conceptIds: ['paquets-scripts', 'modules', 'modules-dev'] },
    ]
  },
  'draftbot': { 
    id: 'draftbot', title: 'Support Utilisateur', entity: 'DraftBot', date: 'Depuis 2019', 
    description: 'Tests, identification et résolution de problèmes. Agent présent sur +1M de serveurs.', 
    longDescription: stripIndents`Mes missions incluaient la réalisation de tests, l'identification et la résolution de problèmes en direct avec la communauté. J'ai également identifié les besoins des utilisateurs en apportant des solutions cohérentes.`, 
    competencies: [
      { id: 'collaborer', description: "Support aux développeurs.", longDescription: "" }
    ],
    tools: []
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

// À la fin de composables/usePortfolio.ts

// --- OUTIL DE RENDU MARKDOWN LÉGER ---
export const renderMarkdown = (text: string) => {
  if (!text) return ''
  return text
    .replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-gray-900 dark:text-white mt-5 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">$1</h2>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-emerald-700 dark:text-emerald-400">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    .replace(/^\- (.*$)/gim, '<li class="ml-5 list-disc">$1</li>')
}