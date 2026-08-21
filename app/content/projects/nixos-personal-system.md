# Introduction à Nix et à NixOs

Si vous ne connaissez pas, NixOs est une [distributions linux](https://fr.wikipedia.org/wiki/Distribution_Linux) pas comme les autres.</br>
En effet, contrairement à la plupart des distributions linux, il ne respecte pas [la norme de la hiérarchie des systèmes de fichiers (FHS)](https://fr.wikipedia.org/wiki/Filesystem_Hierarchy_Standard).</br>
Il est basé sur le [gestionnaire de paquets Nix](https://fr.wikipedia.org/wiki/Nix_(gestionnaire_de_paquets)), qui promet la reproductibilité, la robustesse, la portabilité et la stabilité. On a l'habitude de le présenter comme un système qu'on peut coder. C'est-à-dire que sa configuration est déclarative.</br>
Pour en savoir plus, je vous invite à vous renseigner sur [NixOs](https://fr.wikipedia.org/wiki/NixOS) et [Nix](https://fr.wikipedia.org/wiki/Nix_(gestionnaire_de_paquets)) à travers wikipedia, des vidéos ou autre.
-# Car oui, le gestionnaire de paquets Nix est également utilisable sur les autres distributions linux

## Nix/NixOs : difficile et chronophage ?

J'ai découvert NixOs grâce à un bon ami qui m'en a parlé. J'ai par la suite souhaité l'essayer, pour finir par l'adopter !
Ma crainte initiale était qu'il faille passer par des étapes compliquées et/ou très chronophages pour installer le moindre paquet ou pour changer de petites options.</br>
Et en effet NixOs demande un certain temps de compréhension et requiert beaucoup de temps pour le personnaliser exactement comme on le souhaite, en passant par des paramètres avancés. Surtout si on tient à tout configurer en déclaratif afin d'avoir un système reproductible au maximum.

Mais en réalité ce n'est pas une nécéssité. Si on installes NixOs avec un [environnement de bureau](https://fr.wikipedia.org/wiki/Environnement_de_bureau) comme Gnome ou Plasma KDE, le système sera **en apparence** identique à un autre système linux utilisant le même environnement de bureau. Firefox y est préinstallé et beaucoup de paramètres sont modifiables via l'application "Paramètres". La différence se situe surtout dans la gestion des paquets et dans les options du système qu'on souhaite reproductibles.
-# Les paramètres modifiés via les applications, les différents paquets ou depuis l'application "Paramètres" ne seront pas dans la configuration Nix et ne seront donc pas exportés si vous transférez votre configuration Nix dans un autre appareil. (ce qui est l'un des avantages de Nix)

Par exemple, pour ajouter un paquet de manière déclarative il faut l'ajouter dans le fichier de configuration `/etc/nixos/configuration.nix`. Mais c'est très simple. Cela ne demande que de chercher l'existence du paquet et son nom exact (sur [MyNixOs](https://mynixos.com/) par exemple) et d'ajouter une ligne dans un fichier pré-remplit. 
Si on souhaite modifier une option de manière déaclarative, on va devoir chercher cette option sur [MyNixOs](https://mynixos.com/) ou plus largement sur internet concernant des paquets spécifiques. Sachant qu'il y a beaucoup de guides sur le [Wiki NixOs](https://wiki.nixos.org/wiki/NixOS_Wiki/fr) et le [manuel NixOs](https://nixos.org/manual/nixos/stable/).
Et si installer des applications via Nix pose problème pour x ou y raison. Il est possible [d'utiliser les flatpaks](https://nixos.wiki/wiki/Flatpak).

La difficulté se présente surtout lorsque certaines solutions qu'on trouve sur internet ne concernent que les configurations avec un [home manager](https://nixos.wiki/wiki/Home_Manager) ou les [flakes](https://wiki.nixos.org/wiki/Flakes) alors que ce n'est pas votre cas ou inversement.
Même s'il est recommandé d'utiliser un home-manager et les flakes pour un meilleur système, avec plus de possibilités.
-# Même si lorsque j'écris ce document les flakes sont experimentaux, ils sont fiables et beaucoup les utilisent. Ils permettent d'ailleurs une meilleur stabilité du système.


## État du système
Mon système utilise KDE comme environnement de bureau, un [home manager](https://nixos.wiki/wiki/Home_Manager), et je compte utiliser les flakes à l'aveni pour débloquer de nouvelles fonctionnalités, pour garantire une meilleure staibilité de mon système et pour maîtriser davantage Nix.