
<details><summary class="text-2xl font-bold text-gray-900 dark:text-white mb-0">Introduction à Nix et à NixOS</summary>
Si vous ne connaissez pas, NixOS est une [distributions linux](https://fr.wikipedia.org/wiki/Distribution_Linux) pas comme les autres.
En effet, contrairement à la plupart des distributions linux, il ne respecte pas [la norme de la hiérarchie des systèmes de fichiers (FHS)](https://fr.wikipedia.org/wiki/Filesystem_Hierarchy_Standard).
Il est basé sur le [gestionnaire de paquets Nix](https://fr.wikipedia.org/wiki/Nix_(gestionnaire_de_paquets)), qui promet la reproductibilité, la robustesse, la portabilité et la stabilité. On a l'habitude de le présenter comme un système qu'on peut coder. C'est-à-dire que sa configuration est déclarative.
Pour en savoir plus, je vous invite à vous renseigner sur [NixOS](https://fr.wikipedia.org/wiki/NixOS) et [Nix](https://fr.wikipedia.org/wiki/Nix_(gestionnaire_de_paquets)) à travers wikipedia, des vidéos ou autre.
-# Car oui, le gestionnaire de paquets Nix est également utilisable sur les autres distributions linux</details>

<details open><summary class="text-2xl font-bold text-gray-900 dark:text-white mb-0">Nix/NixOS : difficile et chronophage ?</summary>
J'ai découvert NixOS grâce à un bon ami qui m'en a parlé. J'ai par la suite souhaité l'essayer, pour finir par l'adopter !
Ma crainte initiale était qu'il faille passer par des étapes compliquées et/ou très chronophages pour installer le moindre paquet ou pour changer de petites options.</br>
Et en effet NixOS demande un certain temps de compréhension et requiert beaucoup de temps pour le personnaliser exactement comme on le souhaite, en passant par des paramètres avancés. Surtout si on tient à tout configurer en déclaratif afin d'avoir un système reproductible au maximum.

Mais en réalité ce n'est pas une nécéssité. Si on installes NixOS avec un [environnement de bureau](https://fr.wikipedia.org/wiki/Environnement_de_bureau) comme Gnome ou Plasma KDE, le système sera **en apparence** identique à un autre système linux utilisant le même environnement de bureau. Firefox y est préinstallé et beaucoup de paramètres sont modifiables via l'application "Paramètres". La différence se situe surtout dans la gestion des paquets et dans les options du système qu'on souhaite reproductibles.
-# Les paramètres modifiés via les applications, les différents paquets ou depuis l'application "Paramètres" ne seront pas dans la configuration Nix et ne seront donc pas exportés si vous transférez votre configuration Nix dans un autre appareil. (ce qui est l'un des avantages de Nix)

Par exemple, pour ajouter un paquet de manière déclarative il faut l'ajouter dans le fichier de configuration `/etc/nixos/configuration.nix`. Mais c'est très simple. Cela ne demande que de chercher l'existence du paquet et son nom exact (sur [MyNixOS](https://mynixos.com/) par exemple) et d'ajouter une ligne dans un fichier pré-remplit. 
Si on souhaite modifier une option de manière déaclarative, on va devoir chercher cette option sur [MyNixOS](https://mynixos.com/) ou plus largement sur internet concernant des paquets spécifiques. Sachant qu'il y a beaucoup de guides sur le [Wiki NixOS](https://wiki.nixos.org/wiki/NixOS_Wiki/fr) et le [manuel NixOS](https://nixos.org/manual/nixos/stable/).
Et si installer des applications via Nix pose problème pour x ou y raison. Il est possible [d'utiliser les flatpaks](https://nixos.wiki/wiki/Flatpak).

La difficulté se présente surtout lorsque certaines solutions qu'on trouve sur internet ne concernent que les configurations avec un [home manager](https://nixos.wiki/wiki/Home_Manager) ou les [flakes](https://wiki.nixos.org/wiki/Flakes) alors que ce n'est pas votre cas ou inversement.
Même s'il est recommandé d'utiliser un home-manager et les flakes pour un meilleur système, avec plus de possibilités.
-# Même si lorsque j'écris ce document les flakes sont experimentaux, ils sont fiables et beaucoup les utilisent. Ils permettent d'ailleurs une meilleur stabilité du système.</details>

<details open><summary class="text-2xl font-bold text-gray-900 dark:text-white mb-0">État du système</summary>
Mon système utilise KDE comme environnement de bureau, un [home manager](https://nixos.wiki/wiki/Home_Manager), et je compte utiliser les flakes à l'aveni pour débloquer de nouvelles fonctionnalités, pour garantire une meilleure staibilité de mon système et pour maîtriser davantage Nix.</details>

<details open><summary class="text-2xl font-bold text-gray-900 dark:text-white mb-0">Sécurité</summary>
- Je prend en compte les failles de sécurité signalées par les gestionnaires de paquets pour tous mes projets (avec `npm audit`, `pnpm audit` etc..)
- J'utilise le paquet open source [Lynis](https://github.com/CISOfy/lynis) pour faire un scan de sécurité (audit) d'un système Linux/UNIX ou MacOS.
- J'utilisation l'authentification à deux facteurs (A2F) sur la plupart de mes comptes. Et non l'authentification par SMS qui est vulnérable aux arnaques de SIM mais via des applications authentificateur comme Proton Authentificator</details>

<details open><summary class="text-2xl font-bold text-gray-900 dark:text-white mb-0">Confidentialité</summary>
Pour une meilleure protection de mes données je privilégie des services et des produits numériques européens ou Français soumis à des règles plus strict notamment avec la RGPD, respectueux de la vie privée avec du chiffrement de bout en bout et/ou open source.

## Services utilisés
Grâce à ces services je garanti la confidentialité et l'intégrité des données avec lesquelles je travaille.

- **Systèmes d'exploitation**: Linux ([NixOS](https://nixos.org/)) ou [AtlasOS](https://atlasos.net/) pour utiliser windows sans la télémétrie avec une meilleure optimisation
- **Moteur de recherche** : Duckduckgo
- **Transfer de fichiers** (à la place de WeTransfer) : [Smash](https://fromsmash.com/fr), français et qui n'utilise pas les fichiers transférés pour entraîner une IA ou pour les revendre
- **Outils PDF (fusion, modification, conversions, etc...)** : [BentoPDF](https://www.bentopdf.com/) enssemble d'outils open source plutôt que d'utiliser le premier site trouvé sur internet et qui revend les données présentes dans nos fichiers
- **IA génératives** : Pour un prompt rapide, j'utilise [duck.ia](https://duck.ai/) pour utiliser Claude ou autre anonymement et sans transmettre mes données de navigation. Je fais également attention à ne donner aucune information privée dans mes prompt
- **Diagrammes et modélisations** : [draw.io](https://www.drawio.com/), open source, gratuit et respectueux de la vie privée
- **Navigateur** : [Librewolf](https://librewolf.net/) pour une version modifiée de Firefox plus respectueuse de la vie privée notamment en désactivant plus de trackers
- **Cloud/Drive, Authentificateur (Codes A2F), Mail** : [Proton](https://proton.me/) proposant une suite d'outils freemium avec du chiffrement des données, respectant la vie privée et faisant partie de l'Europe (Suisse)
- **Editeur de texte** (à la place de VSCode) : [VSCodium](https://vscodium.com/) étant une version modifiée de Vscode sans la télémétrie et plus respectueuse de la vie privée. Certaines extensions vscode très utiles mais présentant de la télémétrie ou utilisant les services microsoft n'y sont pas mais il y a des alternatives open source. 
</details>

<details open><summary class="text-2xl font-bold text-gray-900 dark:text-white mb-0">Astuces pour la confidentialité et la protection de la vie privée</summary>
**Utiliser des alias d'email** :
> Utiliser des alias d'email différents à chaque fois qu'on utilise une adresse e-mail sur internet notamment à l'aide de services qui permettent d'en générer (Proton Mail & autres) : Cela permet d'éviter le traçage car un service ne pourra jamais savoir que deux de nos adresses temporaires nous appartiennent et permet d'identifier les services concernés par des fuites de données, qui ont revendus nos données (dont l'adresse e-mail) et qui envoient des emails promotionnels sous des adresses difficilement identifiables.</details>
