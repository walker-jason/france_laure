# France Laure Coiffure — site vitrine

Site statique en HTML, CSS et JavaScript natif.

## 1. Installer les photos
Depuis PowerShell, à la racine du dossier du projet :

```powershell
Expand-Archive -LiteralPath "C:\Users\mark computer\Documents\vscode\business_finder\france_laure\coiffurefrancelaure_images.zip" -DestinationPath ".\assets\images" -Force
```

Si l'archive contient un sous-dossier, déplace les photos directement dans `assets/images/`.
Le site recherche les fichiers `salon-01.jpg` à `salon-08.jpg`. Renomme les images extraites selon ces noms, ou adapte le tableau `fallbackImages` dans `js/main.js`.
Pour le visuel principal, copie aussi une photo représentative sous le nom `hero.jpg` dans `assets/images/`.

## 2. Lancer localement
Ouvre `index.html` dans ton navigateur, ou utilise l'extension Live Server de VS Code.

## 3. Personnalisation
- Coordonnées et adresse : `index.html`
- Horaires : `index.html` (section Contact)
- Prestations : `js/main.js` (objet `serviceData`)
- Photos : `js/main.js` (tableau `fallbackImages`)
- Couleurs, typographies et mise en page : `css/style.css`

## Informations utilisées
Adresse : Chaussée de Gand 390, 1080 Molenbeek-Saint-Jean, Belgique
Téléphone : +32 2 410 60 04
Note fournie : 4,0/5 sur 48 avis.

Les prix n'étant pas fournis, aucun tarif fictif n'est affiché. Les avis sont des extraits raccourcis des avis fournis et doivent être validés avant publication.
