## Plus précisément
Bot ou agent logiciel codé seul en TypeScript avec Node.js, permettant de jouer au uno sur la messagerie Discord via un plateau de jeu sous la forme de message composé de boutons. Ce projet a été un excellent terrain de jeu pour appréhender Node.js, l'asynchrone, Typescript, l'optimisation logicielle, l'utilisation de modules NPM et d'API.


<details open><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Première verison / Premier résultat</summary>
Le premier résultat satisfaisant de ce projet est que j'ai mis une semaine seulement en période de cours (lycée) pour réaliser un jeu de uno fonctionnel et stable sur Discord. Par la suite je n'ai fait que l'améliorer, ajouter des règles, réaliser des refontes et des fonctionnalités additionnelles.
Cette première version en plus du jeu totalement fonctionnel possédait déjà :
- un système d'invitations permettant aux autres joueurs de rejoindre la partie qui va commencer ;
- un plateau de uno sous la forme de message qui affiche les informations de la partie ;
- un message de cartes visible uniquement pour le joueur permettant de jouer les cartes en appuyant dessus grâce à des boutons ;</details>


<details open> <summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Améliorations</summary>
### Typescript & qualité 
Peu de temps après la finalisation d'un jeu de UNO stable avec des règles personnalisables, DraftMan, le créateur d'un des bot (Agent Logiciel) Discord francophone les plus populaires, intéréssé par mon travail m'a fait découvrir l'existence du langage Typescript, ce qui m'a par la suite amené à adapter le projet avec un environnement Typescript utilisant notamment Docker.

### Autres améliorations 
Le uno a été développé de sorte à être **ergonomique**, convenir au mieux aux joueurs qui peuvent préférer des règles différentes et **préserver l'aspect stratégique** du jeu en affichant les informations disponibles dans le vrai jeu de cartes.
- un **système de règles** permettant au créateur de la partie d'activer ou de désactiver plusieurs règles connues, et notammenent des non officielles, en attendant des joueurs notamment ;
- un **système de pioche** de cartes qui se remplit automatiquement une fois vide afin de simuler au mieux une vraie pioche ;
- un **système "AFK"** qui fait jouer automatiquement les joueurs absents trop longtemps afin de ne pas bloquer la partie. C'est le même système qui permet de jouer contre le robot ;
- l'utilisation d'un module canvas utilisant une **librairie graphique 2D** afin de superposer les images des cartes sur le plateau de sorte à entrevoir les anciennes cartes comme en situation réelle à des fins stratégiques ;
- de **multiples règles** changeant plus ou moins le comportement du jeu ;
- un **mode triche** permettant aux joueurs de tricher et de se signaler afin de pimenter les parties ;
- un **système de multiplicateur de points évolutif** afin de récompenser les parties longues et les succès notamment quand on réussit à tricher avec le mode triche ;
- des **commandes de gestion des parties** pour mettre en pause une partie, expulser des joueurs problématiques de la partie ou 
- un **système de suggestions** permettant à n'importe quel utilisateur d'envoyer des suggestions pour améliorer le service et plus ;
- un **système de logs** pour voir les logs/journaux contenant des informations sur les erreurs qui se sont produites, les informations sur les parties qui se sont terminées etc.. avec une commande Discord avec une pagination ;
- une commande de statistiques sur les parties et les fonctionnalités utilisées ;
- un **jeu de 2048** intégré notamment proposé lors de l'attente de joueurs ;
- un nouveau **système de compteur d'utilisateurs par mois** [(en savoir plus)](https://top.gg/bot/985152555791290408#userCounter)</details>


<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Idée & commencement</summary>
Lorsque j'étais en seconde au lycée, ayant déjà passé du temps en développement java pour un plugin Minecraft, j'ai cherché à en apprendre plus sur d'autres langages de programmation. Connaissant le réseau social Discord et sachant qu'était possible de créer des bots (agents logiciels) sur la plateforme, j'ai d'abord cherché à en développer un. J'ai donc réussi à faire fonctionner un bot Discord avec Node.js et j'ai réalisé plusieurs systèmes plus ou moins utiles, sans objectif, mais je cherchais à commencer un réel projet, avec un ou des objectifs et c'est comme ça que j'ai eu l'idée de coder un jeu sur Discord. 
-# Le choix du UNO venant d'un ami

### Recherches
Avant de commencer le projet j'ai cherché s'il existait d'autres bots UNO et à l'époque il n'y en avait pas vraiment. Ceux qui existaient ne fonctionnaient pas ou n'exploitaient pas encore les nouvelles fonctionnalité de Discord pouvant rendre le jeu plus ergonomique comme les Boutons, les sélecteurs, les messages individuels ou éphémères. À partir de là j'ai donc su que je pouvais réaliser le jeu de uno le plus ergonomique qui existe sur Discord.</details>

<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Application publique & référencement</summary>
Le bot n'était encore qu'un prototype de développement hébergé en local avec le profil/l'application d'un bot qui me servait pour mes experiences. C'est pour cela qu'une nouvelle application Discord dédiée au jeu du UNO sous le nom UnoOnDisc a été créée seulement le 11 juin 2022. Et le 9 mars 2023, une [page top.gg](https://top.gg/bot/985152555791290408) a été créée pour l'application afin de la référencer et de permettre à n'importe qui cherchant à jouer au UNO sur Discord de trouver l'application.
-# Fait amusant : pendant plusieurs semaines, le bot tournait sur un téléphone android sur lequel j'avais réussi à faire tourner le système Linux/UNIX Debian grâce à l'application UserLand afin de ne pas payer de serveur de production. Cette méthode était on peut le dire plus fiable qu'on ne le pense mais l'application était un peu lente à cause du wifi en plus du fait que ce soit inévitablement moins fiable qu'un réel serveur de production :)</details>

<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Certification par Discord</summary>
Deux mois après son référencement, l'application a atteint la limite d'ajout sur des serveurs de la plateforme Discord pour les applications non certifiées fixée à 100 serveurs, alors le 08 mai 2023, mon bot Discord, UnoOnDisc, a été [certifié par le support de la plateforme](https://support-dev.discord.com/hc/fr/articles/23926564536471-How-Do-I-Get-My-App-Verified) ce qui a permi de dépasser la limite des 100 ajouts sur des serveurs qui avait été atteinte.</details>