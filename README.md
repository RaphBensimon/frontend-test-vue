# Test Technique Recrutement

Ce dépot fournit un squelette vide d'une application Vue.js.

## Prérequis:
- Node >=12.22.1
- NPM >=6.14.12

### Lancer le projet
```bash
$ quasar dev
```

## But de l'exercice

L'idée est de créer un cookbook simple de nos recettes (listing de nos recettes), à l'image du site [marmiton](https://www.marmiton.org/cuisine-facile/un-ete-gourmand-tp124731.html)

### Développement à effectuer
1. La page devra afficher des miniatures des recettes
2. Une pagination devra être mise en place
3. Au clic sur une miniature, une pop up devra s'ouvrir permettant d'afficher plus d'informations
4. Un menu (ou tout autre proposition) devra permettre de filtrer les recettes par leur type


### Données API
Les données sont à récupérer via cette url : https://abonne.lescommis.com/api/cookbook_recipes/1/ (1 étant le numéro de la page demandée).

L'api retourne **20 recettes** par page.

Les données sont structurées comme ceci :
- page_count = nombre de pages disponibles pour la requête
- current_page = page actuellement retournée
- total_recipes = nombre de recettes disponibles au total pour la requête
- recipes = un tableau des recettes retournées pour la page demandée

Voici les champs de la recette intéressants à faire apparaitre sur les miniatures ou la pop up "détails recette" :
- name : nom de la recette
- image, image_thumb_url, image_wide_thumb_url : différents formats de la photo de la recette (_il faut ajouter le nom de domaine https://abonne.lescommis.com/ pour accèder aux images_)
- furnace_time, ready_time : nombre de minutes à passer aux fourneaux ou avant de passer à table
- ingredients : liste des ingrédients composants la recette
- tools : liste des ustensiles nécessaires pour réaliser la recette
- is_best_seller : booléen indiquant si la recette est un best seller
- type_display : type de recette
- calories : nombre de kcal de la recette

#### Filtres

Il est possible d'ajouter des paramètres GET à l'url de l'api afin de filtrer les recettes :
Par exemple https://abonne.lescommis.com/api/cookbook_recipes/1/?creative=true retournera toutes les recettes catégorisée "créatives".

Voici la liste des paramètres disponibles : 
- gourmand : recettes gourmandes
- veggie : recettes végétariennes
- nutrition : recettes orientées nutrition
- efficace : recettes simples
- rapide : recettes rapides (à table en moins de 20 min)
- healthy : recettes healthy
- creative : recettes créatives

À noter qu'il est possible de cumuler les filtres.


### Bonus
- Réussir à mixer les tailles de tuiles comme sur la page [marmiton](https://www.marmiton.org/cuisine-facile/un-ete-gourmand-tp124731.html)
- Pimper le tout avec un peu d'animation
