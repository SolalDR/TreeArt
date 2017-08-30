# <img src="assets/img/bg.png" height="100"> TreeArt</h1>

Projet artistique permettant de générer des arbres de manière aléatoire. Le script utilise Canvas et inclue un panel de controle pour maitriser les paramètre de génération.

<a href="https://solaldr.github.io/TreeArt/">Voir la démonstration</a>

## Panneau de contrôle
Il est séparer en trois sections de controle
- Tronc
- Branches
- Générales
 
### Le tronc
|            Nom           | Unité | Description                                                                                                                                                                                                                                                                                                                   |
|:------------------------:|-------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Largeur                  | %     | Définis la largeur minimum et maximum du tronc. Les valeurs sont exprimé en pourcentage par rapport à la largeur du canvas.                                                                                                                                                                                                   |
| Longueur                 | %     | Définis la longueur minimum et maximum du tronc. Les valeurs sont exprimé en pourcentage par rapport à la longueur du canvas.                                                                                                                                                                                                 |
| Rotation                 | deg   | Définis la rotation minimum et maximum du tronc par rapport à sa base. Une rotation de 0 correspond à un tronc parfaitement vertical. Les valeurs conseillé sont compris entre 0 et 90. Le sens dans lequel penche le tronc est aléatoire.                                                                                    |
| Rayon polygone de bézier | %     | Paramètre utilisé uniquement pour les formes de type Arc. La courbe étant généré par une courbe de bézier cubique, deux points de contrôle sont définis. La valeur correspond donc aux distances minimum et maximum entre l'une des extrémité et son point de contrôle. La valeur est exprimé en pourcentage par rapport à :  |
| Ramification             |       | Correspond à l'ensemble des probabilité d'obtenir une branche de "n" ramification. Plus une jauge est importante plus les chances d'obtenir le nombre de branches indiqué est grand.   


### Générer un arbre
Générer un arbre permet de créer un tronc et toute les ramifications en découlant. Il est possible de créer plusieurs arbres superposé qui visuellement en donneront que un. Ce fait permet de créer des arbres plus complexes en exécutant le script plusieurs fois avec des matrices de paramètres différentes.

### Vider le canvas
En cliquant sur le bouton, le context du canvas se vide. Néanmoins, il est possible qu'un code soit toujours en execution, ce qui n'empechera donc pas des branches de continuer à se créer nétoyage. Si de mauvais paramètre ont été saisis entrainant un script interminable, il sera nécéssaire de recharger la page pour stopper l'éxécution du script. 

## Description Technique
TreeArt est développé en objet dans le but de facilité l'évolution des fonctionnalités et permettre un fonctionnement stable. 

Il existe différents type d'objets : 
- TreeManager : Il gère l'ensemble du déroulement du script et inclue toute l'intéractivité avec l'utilisateur. Il gère notamment la configuration des paramètres (panneau de contrôle).
- Branch : Cet objet est la base du script étant donné que chaque élément visible est une branche. La plupart des attributs de l'objet sont généré aléatoirement selon les paramètre définis dans le paneau de contrôle, parmi ceux qui ne sont pas généré il existe : 
  - l'origine (d'où part la branche)
  - le parent (un autre objet Branch)
  - le constructeur géométrique (Triangle, Rectangle, Arc) qui donnera le rendu visuel dans le canvas
  - le status (ramification ou tronc
  Une fois configuré, le rôle de cet objet est d'appelé son constructeur géométrique pour créer un rendu visuel puis de créer des ramifications
- Les objets manipulant Canvas : Il hérite tous de l'objet GeoShape qui permet certaines fonctionnalités facilitant le positionnement, la rotation, l'origine et d'autre paramètre au sein du contexte du canvas. Parmi les objet héritant de GeoShape il existe actuellement : 
  - Triangle : Il crée des triangle isocèle uniquement 
  - Rectangle
  - Arc : Créer une courbe à l'aide d'une fonction de Bézier
