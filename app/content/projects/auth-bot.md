
## Contexte
Je me suis porté volontaire pour aider les enseignants du département informatique à l'université Sorbonne Paris Nord pour gérer l'espace de communication sur la plateforme Discord. Une problèmatique était qu'il fallait modifier les accès de centaines d'étudiants manuellement chaque année (première année à deuxième année, les nouveaux etc...). C'est pour cela que j'ai proposé de réaliser ce projet.

### Idée initiale du projet
L'idée était de développer une application Discord spécifique pour l'IUT qui permettraient aux étudiants de se connecter avec leurs identifiants rattachés à l'université via le CAS officiel afin d'obtenir les bons accès en fonction de leur niveau dans la formation. Avec un hébergement de l'application sur les serveurs de l'IUT. L'idée a été accepté.
-# À noter que pour des raisons de contrôle des données et de sécurité, j'ai choisi de placer le dépôt distant du projet sur le gitlab auto-hébergé de l'université. Cela diminue la probabilité de cyber-attaques dans la situation où les attaquants auraient utilisés une fuite de données probable de github pour prendre connaissance des outils utilisés dans mon projet et potentiellement rechercher des failles de sécurité dans les modules NPM utilisés afin de peut-être obtenir le contrôle du serveur. Nous sommes jamais trop prudent en terme de sécurité.

### Collaboration
J'étais seul à travailler sur le code de l'application Discord j'ai pu collaborer avec les responsables de la formation pour définir les contraintes, les exigences du projet. Des accès à un serveur de l'IUT m'ont été conférés par l'enseignant responsable du réseau et des systèmes, qui a également mis en place les points de terminaison API afin de d'obtenir la formation et le nom des étudiants à partir d'un token récupéré à l'issue de l'authentification pour le bon fonctionnement de l'application.

## Fonctionnalités développées
- Authentification via le collage d'un token temporaire collé par l'étudiant dans un modal Discord ;
- Configuration assez complète à partir d'un fichier JSON pensée pour l'évolutivité possible du sysème. Par exemple, si la valeur de retour change, il suffit de modifier des options de la configuration ;
- Regex configurables appliqués sur la valeur de retour de l'API afin d'attribuer des rôles différents en fonction de la formation de l'étudiant ;
- Récupération et sauvegarde de données par étudiant à partir de la valeur de retour, en définissant, dans la configuration, un séparateur et des variables en précisant leur position (comme pour lire les données d'un fichier CSV)
- Renommage automatique des étudiants authentifiés configurable à partir des variables définies dans la configuration (qui contiennent le nom et le prénom dans le cas présent) ;
- Système de logs sur la plateforme de communication afin de permettre de moniter, c'est-à-dire de surveiller que tout fonctionne correctement et d'identifier les étudiants qui se connectent et quand. ;
- En plus de la renconnaissance d'erreur API via les codes d'erreur HTTP, il y a la possibilité d'ajouter dans la configuration un regex qui permettra d'identifier les valeurs de retour correspondant à une erreur pour une meilleur prise en charge de toutes les situations ;
- Les messages affichés aux utilisateurs, c'est-à-dire les étudiants qui se connectent, sont tous configurable via le fichier JSON.
- Sécurité pour ne valider un token qu'une fois OU que pour un utilisateur selon la configuration
*Et d'autres choses sont prévues*