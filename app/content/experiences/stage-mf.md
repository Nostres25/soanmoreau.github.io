<details open><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Contexte</summary>
J'ai réalisé un stage au sein de l'entreprise Market Factory pour ma deuxième année d'études en BUT Informatiuqe à l'IUT de l'université Sorbonne Paris Nord.
Ce stage a duré 8 semaines, mais malgré cette courte durée j'ai pu réaliser un bon nombre de choses qui ont été appréciées par le directeur de l'entreprise, Stephane PACHIS. **Au point qu'on m'ait proposé de continuer dans cette entreprise en alternance l'année qui suit.** Cependant j'ai refusé cette proposition car l'environnement et les missions ne correspondaient pas vraiment au travail que je recherche.  
</details>

<details open><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Mes missions</summary>
J'ai été recruté en tant que **développeur PHP front-end et back-end** et mes missions étaient principalement liées au site back-office de l'entreprise qui sert à la gestion des de commandes et plus. Ce site est un projet « from scratch », c'est-à-dire sans framework ou autres outils faisant une partie du travail. Ce projet a été maintenu par de nombreuses personnes avant moi, y compris des stagiaires. Et j'ai pu l'améliorer, le corriger et surtout totalement le retravaillé pour le rendre plus clair, plus pratique à entretenir, plus évolutif et mieux optimisé à travers les missions suivantes : 
- Optimisation du chargement de la page de gestion des commandes
- Développement d'une pagination pour la page de commandes
- Affichage des états des colis à l'aide de l'API laposte.fr
- Mise à jour des stocks du fournisseur TopTex avec leur API
- Correction de dysfonctionnements
- Refonte du projet du site back-office avec une documentation (voir les détails plus bas)
</details>

<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Inspection de sécurité</summary>
> ℹ️ Il est important à noter que ce site back-office est utilisé non seulement par les employés de Market Factory, mais aussi par les clients gestionnaires de boutiques venant d'un service de création de boutique proposé par Market Factory. Faisant des problèmes d'optimisations et de sécurité, des problèmes beaucoup plus importants.
Lors de mon investigation du code au début de mon stage, j'ai pu y remarquer certains problèmes et certaines incohérences. Notamment des problèmes d'optimisation mais aussi des problèmes de sécurité critiques sur la gestion de l'authentification, des injections SQL, l'accessibilité de routes sensibles, et d'autres failles intéressantes que je ne détaillerais pas ici.
</details>

<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Refonte du projet</summary>
Il devenait compliqué d'entrenir le projet efficacement et sans risquer d'introduire de nouveaux problèmes. C'est alors qu'une refonte était nécessaire pour remettre de l'ordre et de la logique dans le code déjà existant. Car, en effet, il y avait :
- un bon nombre de failles de sécurité et de problèmes d'optimisation ;
- de la répétition inutile dans le code et dans les requêtes SQL ;
- du code difficilement lisible et compréhensible ;
- du code inutilement trop volumineux ;
- du code mort, non fonctionnel ou inutilisé ;
Puisque le directeur de l'entreprise tennait à ce que le projet reste "from scratch", j'ai compensé l'absence d'outil de développement venant notamment de framework par le développement d'une architecture respectant des règles strictes accompagné par des fonctions utilitaires (vérification de permissions, configurations, simplification de code normalement redondant grâce à des fonctions etc...).
J'ai aussi suggéré de passer par une architecture MVC, étant une bonne pratique de qualité logicielle mais cette proposition a été refusée par le directeur. Alors j'ai du adapter mon architecture notamment en organisant les vues par modules de fonctionnalités du site afin que l'URL reste cohérente pour l'utilisateur malgré l'absence de MVC.

Pour que l'architecture du projet ainsi que ses règles strictes soient comprises, il me devait de réaliser une documentation. J'ai donc choisi d'en rédiger une, sous la forme de fichiers markdowns (.md) présentant: 
- le projet, l'environnement techniques et les outils utilisés ;
- comment mettre en place l'environnement de développement (ainsi que des informations pour le déploiement) ;
- la gestion des dépendances PHP mais aussi javascript ainsi que CSS (notamment le remplacement de l'utilisation des CDN par des paquets installés localement pour une meilleur stabilité) ;
- le fonctionnement du système de composants mis en place par moi-même ;
- le fonctionnement du système de bases / layouts HTML mis en place par moi-même ; 
- les fonctions utilitaires que j'ai mis en place (d'accès aux assets, d'authentification, de vérification de permissions et plus) ;
- le fonctionnement de l'API interne au projet que j'ai retravaillé ; 
- le fonctionnement des clés privées se trouvant désormais dans un fichier ".env" sécurisé plutôt que directement dans le code comme auparavant ;
- la gestion des chemins relatifs avec les spécificités entre PHP, le DOM et les fichiers importés ;
- l'architecture des fichiers avec des explications sur chaque dossier ;
- des règles de sécurité pour éviter l'introduction de nouvelles failles de sécurité ;
- des règles de travail en collaboration avec git et github pour garantir un travail efficace.
</details> 

<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Reprise du projet</summary>
Dû au peut de temps dont je disposais, je me suis assuré que mon travail puisse être repris dans les meilleures conditions. Notamment grâce à ma documentation mais aussi en ayant échangé avec le développeur qui reprenait le projet après moi. J'ai pu lui présenter l'état du projet ; la documentation ; les outils ; l'architecture ; les fonctions utilitaires ; l'organisation du code ; et ce qu'il restait à faire, c'est-à-dire principalement l'intégration des autres pages de l'ancien projet vers la nouvelle base. Car j'ai préféré finir intégralement la base du nouveau projet avec certaines pages plutôt que d'intégrer toutes les pages mais ne pas finir la base du projet comme elle devrait l'être. Ce choix m'a permis de terminer le travail plus compliqué qui relève de ma réflexion et mes connaissances sur la réorgainsation du projet et de laisser au prochain développeur le travail plus simple qui est l'intégrations des pages restantes en suivant ma documentation. 
</details> 

<details open><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Qu'ai-je appris ?</summary>
Durant ce stage j'ai été confronté à une base de code existante en PHP sans framework, sans MVC. Cela m'a permis d'en apprendre beaucoup sur le PHP et son fonctionnement, sur les problématiques liées au langage, sur le CMS Prestashop utilisé sur le projet, sur les API de gestion des stocks etc... 
J'ai aussi appris à travailler et à m'organiser en entreprise. 
</details>


<details open><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Que me reste-t-il à améliorer ?</summary> 
Cette expérience m'a fait réaliser à quel point j'apprécie le développement de qualité, la sécurité et l'optimisation. J'ai encore beaucoup de choses à apprendre du côté de la sécurté. Je peux aussi gagner en efficacité et en connaissance sur de nouvelles technologies. Je pense notamment au langage Rust qui est de mon point de vu l'avenir des langages de programmation car il est très optimisé, avec moins de risque d'erreurs dues à la gestion de la mémoire comparé au c et au c++ etc...
</details>

<details><summary class="text-xl font-bold text-gray-900 dark:text-white mb-0">Conclusion de mon rapport de stage</summary>
Ce stage au sein de l’entreprise Market Factory m’a permis de me mettre à l’épreuve sur mes capacités d’organisation du code et m’a permis d’en apprendre beaucoup sur le développement web ainsi que PHP. j'y ai réalisé beaucoup de missions back-end, sur de l’optimisation, des corrections, de l’organisation et de la documentation. Une une grande partie de mon travail était individuelle, car mes collègues étaient sur d’autres tâches presque totalement isolées. Toutefois, j’ai quand même pu développer mes compétences en communication, et en organisation du travail personnel. **J’ai eu l’occasion de collaborer** avec d’autres stagiaires ainsi que **M.PACHIS avec qui j’ai pu discuter pour trouver des solutions techniques**. J’ai pu explorer grandement le projet du site back-office pour **comprendre toutes les subtilités du langage php** mais aussi de la programmation web, pour y développer des **interactions API** ainsi que d’autres outils, et j’ai également pu **renforcer mes compétences rédactionnelles avec la documentation**. Ma difficulté principale a été de faire un tri dans les éléments à améliorer mais je pense avoir réussi à surmonter cette difficulté. **J’ai également pu me démarquer par ma communication fréquente auprès de mes collègues et de M.PACHIS.**

Durant ces 8 semaines j’ai su réutiliser les connaissances aquises lors de ma formation, notamment en bases de données pour débuguer des requêtes SQL, tout en gardant une certaine souplesse de réflexion pour adapter au mieux mes choix en fonction du contexte. Malgré le manque de cours portant sur le langage PHP dans ma formation. **J’ai donc dû apprendre par moi-même tout un langage sur le tas**. Même si j'ai pu réaliser un site PHP avec Laravel comme projet d'études juste avant le stage, j'avais également appris le PHP sur le tas et il y a de grandes différences entre le développement PHP classique sans framework et Laravel. Cette expérience a renforcé mon avis de poursuire une carrière dans le développement back-end, la sécurité informatique, l’organisation de projets informatiques ou même dans les services informatiques d'un entreprise. Où je peux combiner mes compétences en investigation et en informatique dans **un domaine qui requiert une certaine fiabilité et une certaine qualité**.
</details>

Retrouvez ci-dessous des diapositives extraites de la ma soutenance de stage
-# Diapositives extraites d'un PDF via l'outil open source, gratuit et respectueux de la vie privée [BentoPDF](https://www.bentopdf.com)