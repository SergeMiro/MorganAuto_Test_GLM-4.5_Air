# AutoRex - Site de vente de voitures d'occasion

Un site web complet pour la vente de voitures d'occasion avec 3D effects, administration et blog.

## Fonctionnalités du projet

### 3D Effects
- **Effet de pluie 3D** - éléments triangulaires tombant avec rotation au défilement
- **Logo 3D** - triangle noir tournant sur son axe au défilement
- **Cartes de voitures 3D** - effet de наклон au survol
- **Icônes de fonctionnalités 3D** - transformations au survol

### Fonctionnalités principales
- Page d'accueil en français avec design responsive
- Page de catalogue avec filtres sur la gauche
- Page d'administration complète pour gérer les voitures et les articles de blog
- Page de blog avec catégories et pagination
- Navigation fluide entre les pages
- Design entièrement responsive pour tous les appareils

### Technologies utilisées
- HTML5 - sémantique
- Tailwind CSS - utilitaires CSS modernes
- JavaScript vanilla - interactivité et animations
- Google Fonts - police Montserrat

## Structure du projet

```
.
├── index.html              # Page d'accueil
├── catalogue.html          # Page de catalogue avec filtres
├── admin.html              # Page d'administration
├── blog.html               # Page de blog
├── script.js               # JavaScript pour l'interactivité
├── tailwind.config.js      # Configuration Tailwind CSS
├── styles.css              # Styles CSS personnalisés
├── images/                 # Dossier d'images
│   ├── placeholder-car1.jpg
│   ├── placeholder-car2.jpg
│   └── placeholder-car3.jpg
└── README.md               # Ce fichier
```

## Comment utiliser

1. Clonez ou téléchargez le projet
2. Ouvrez le fichier `index.html` dans votre navigateur
3. Explorez les différentes pages:
   - Page d'accueil: `index.html`
   - Catalogue: `catalogue.html`
   - Administration: `admin.html`
   - Blog: `blog.html`

### Page d'accueil
- Design responsive avec effets 3D
- Navigation fluide entre les sections
- Section "Pourquoi nous choisir"
- Aperçu du blog

### Page de catalogue
- Filtres sur la gauche (marque, prix, année, kilométrage, carburant)
- Grille de voitures responsive
- Tri par différents critères
- Bouton "Charger plus de véhicules"

### Page d'administration
- Tableau de bord avec statistiques
- Gestion des véhicules (ajouter, modifier, supprimer)
- Gestion des articles de blog (ajouter, modifier, supprimer)
- Gestion des utilisateurs
- Navigation latérale

### Page de blog
- Articles classés par catégories
- Pagination
- Newsletter
- Design responsive

## Personnalisation

### Contenu
- Modifiez le texte dans les fichiers HTML
- Ajoutez ou supprimez des voitures dans le catalogue
- Gérez les articles du blog via l'administration

### Design
- Personnalisez les couleurs dans `tailwind.config.js`
- Modifiez les polices et les styles dans les fichiers HTML
- Ajustez les animations dans `script.js`

### Images
- Remplacez les images dans le dossier `images/`
- Utilisez des images réelles pour les voitures dans le catalogue

## Compatibilité

- Chrome
- Firefox
- Safari
- Edge

## Pour l'administration

La page d'administration (`admin.html`) permet de:
- Ajouter, modifier et supprimer des véhicules
- Gérer les articles de blog
- Voir les statistiques du site
- Gérer les utilisateurs

Remarque: Dans une version réelle, cette page serait connectée à une base de données.

## Prochaines étapes possibles

- Connexion à une base de données
- Système d'authentification
- Upload d'images pour les voitures
- Système de commentaires sur le blog
- Fonction de recherche avancée
- Notifications par email

## Licence

Ce projet est créé à des fins de démonstration et peut être utilisé dans des projets commerciaux.