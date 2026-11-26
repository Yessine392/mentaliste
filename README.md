# 🔮 Mentaliste — de débutant à expert

Application web (PWA, installable et utilisable hors ligne) pour apprendre le **mentalisme de A à Z**, en français, en s'appuyant sur les traditions et références françaises, anglaises, américaines, allemandes et espagnoles.

> Le mentalisme est un **art du spectacle**. Aucune technique enseignée ici ne relève du surnaturel, et l'application intègre une charte éthique.

## Contenu

**Parcours en 5 niveaux, 14 modules, 33 leçons, 81 questions de quiz**

| Niveau | Thèmes |
|---|---|
| 1 · Débutant | Histoire (Robert-Houdin, Annemann, Corinda, Derren Brown…), familles d'effets, éthique, forçages, coup d'avance, principes mathématiques, présentation |
| 2 · Apprenti | Influence (Cialdini), biais cognitifs (Forer, Loftus, cécité au choix), langage persuasif et limites de la PNL, langage corporel, micro-expressions (Ekman), mythes de la détection du mensonge, Système Majeur, palais de mémoire, PAO |
| 3 · Praticien | Lecture à froid (techniques d'Ian Rowland), lecture tiède/chaude, billets, double réalité, Q&A act, effet idéomoteur, lecture musculaire |
| 4 · Avancé | Calendrier mental (Doomsday), carré magique 4×4, racines cubiques, Si Stebbins, jeu mémorisé, hypnose de spectacle et sécurité |
| 5 · Expert | Superposition des méthodes et sorties, structure d'un numéro, création d'effets, communauté, esprit critique (Randi, Projet Alpha, Majax) |

Chaque leçon contient : cours, points clés, exercice pratique et quiz (70 % pour valider). Les niveaux se débloquent progressivement (option « tout débloquer » dans Réglages).

**Labo : 10 outils d'entraînement interactifs**
Système Majeur · Palais de mémoire · Micro-expressions (mode flash) · Lecture à froid (identifier les techniques + générateur de lecture) · Calendrier mental · Carré magique · Racines cubiques · Si Stebbins · Carnet de forçages psychologiques (vos statistiques réelles) · Journal du mentaliste.

**Aussi** : XP, rangs, série de jours, révision express, glossaire multilingue (FR/EN/DE/ES), bibliothèque internationale par niveau, sauvegarde/import de la progression.

## Lancer en local

Aucune dépendance, aucun build :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Mettre en ligne (GitHub Pages)

Dans le dépôt GitHub : **Settings → Pages → Deploy from a branch → `main` / `(root)`**. L'application sera disponible à l'adresse `https://<utilisateur>.github.io/mentaliste/` et pourra être installée sur téléphone (« Ajouter à l'écran d'accueil »).

## Structure

```
index.html, css/style.css, sw.js, manifest.webmanifest, icons/
js/app.js          routeur et vues
js/store.js        progression (localStorage)
js/data/           programme, glossaire, bibliothèque
js/tools/          outils du Labo
```

Pour ajouter une leçon : ajoutez un objet dans `js/data/curriculum1.js` ou `curriculum2.js` (champs `content`, `keyPoints`, `exercise`, `quiz`).
