// Niveaux 3, 4 et 5 : Praticien, Avancé, Expert
export const part2 = [
  {
    id: 'm7',
    level: 3,
    title: 'La lecture à froid',
    icon: '🃏',
    summary: "L'art de donner l'impression de tout savoir d'un inconnu : techniques, structure et responsabilité.",
    lessons: [
      {
        id: 'm7l1',
        title: 'Les techniques de la lecture à froid',
        duration: 18,
        content: `
<p>La <strong>lecture à froid</strong> (<em>cold reading</em>, <em>lectura en frío</em>, <em>kaltes Lesen</em>) donne l'impression de connaître une personne sans aucune information préalable. L'ouvrage de référence est <em>The Full Facts Book of Cold Reading</em> d'<strong>Ian Rowland</strong>, qui a nommé de nombreuses techniques :</p>
<ul>
<li><strong>Énoncé Barnum</strong> : vrai pour presque tout le monde. « Vous êtes parfois trop exigeant avec vous-même. »</li>
<li><strong>Ruse de l'arc-en-ciel</strong> (<em>rainbow ruse</em>) : attribuer un trait <strong>et son contraire</strong>. « Vous pouvez être très sociable, mais il y a des moments où vous avez besoin de solitude. »</li>
<li><strong>Énoncé de Jacques</strong> (<em>Jacques statement</em>, d'après la tirade des « sept âges de la vie » de Shakespeare) : énoncé adapté à l'âge. À 30 ans : « Vous vous demandez si vous avez choisi la bonne voie. »</li>
<li><strong>Flatterie fine</strong> : un compliment présenté comme une comparaison. « Vous êtes plus intuitif que la moyenne des gens. »</li>
<li><strong>Fait flou</strong> (<em>fuzzy fact</em>) : vague, que la personne précise elle-même. « Je vois un lien avec l'Europe... » « Oui, ma grand-mère était italienne ! »</li>
<li><strong>Négation qui disparaît</strong> (<em>vanishing negative</em>) : « Vous ne travaillez pas avec des enfants, n'est-ce pas ? » Si non : « Je m'en doutais. » Si oui : « Je sentais qu'il y avait ce lien. »</li>
<li><strong>Pêche</strong> (<em>fishing</em>) : questions déguisées en affirmations. « Il y a une question d'argent autour de vous... »</li>
<li><strong>Morceaux de sucre</strong> (<em>sugar lumps</em>) : récompenser verbalement la personne quand elle donne des informations, pour l'encourager à en donner plus.</li>
</ul>
<h3>Statistiques et probabilités</h3>
<p>Certains énoncés sont vrais pour une majorité : avoir une cicatrice au genou, une boîte de vieilles photos jamais triées, un bijou d'un proche décédé, un nom commençant par une lettre courante dans l'entourage, etc.</p>
<p>👉 Entraînez-vous avec l'outil <strong>Lecture à froid</strong> du Labo.</p>`,
        keyPoints: ['Barnum, arc-en-ciel, Jacques, flatterie fine, fait flou, négation qui disparaît, pêche, morceaux de sucre.', 'Le sujet fournit lui-même les détails.', 'Les énoncés statistiques augmentent le taux de réussite.'],
        exercise: "Écrivez 10 énoncés : 2 Barnum, 2 arc-en-ciel, 2 Jacques (pour deux âges différents), 2 faits flous et 2 négations qui disparaissent. Puis classez des énoncés dans l'outil Lecture à froid.",
        quiz: [
          { q: "« Vous êtes sûr de vous, mais parfois vous doutez profondément » est…", options: ['Une ruse de l’arc-en-ciel', 'Un fait flou', 'Une pêche', 'Une négation qui disparaît'], answer: 0, explain: "Le trait et son contraire couvrent tous les cas." },
          { q: "Qui a écrit The Full Facts Book of Cold Reading ?", options: ['Ian Rowland', 'Tony Corinda', 'Max Maven', 'Kreskin'], answer: 0, explain: "Ian Rowland, référence absolue sur le sujet." },
          { q: "« Vous ne fumez pas, n’est-ce pas ? » est un exemple de…", options: ['Flatterie fine', 'Négation qui disparaît', 'Barnum', 'Énoncé de Jacques'], answer: 1, explain: "Quelle que soit la réponse, le lecteur a « raison »." },
          { q: "Qui fournit l'essentiel des informations précises dans une lecture à froid ?", options: ['Le lecteur', 'Le sujet lui-même', 'Un complice', 'Les astres'], answer: 1, explain: "Le sujet comble les blancs et s'en souvient comme d'une révélation." },
        ],
      },
      {
        id: 'm7l2',
        title: 'Structure d’une lecture, lecture tiède et chaude',
        duration: 15,
        content: `
<h3>Structure d'une lecture de 5 minutes</h3>
<ol>
<li><strong>Cadre</strong> : expliquer ce qui va se passer, demander la coopération (« Dites-moi simplement si cela vous parle »).</li>
<li><strong>Énoncés généraux</strong> : Barnum, arc-en-ciel, pour créer la confiance.</li>
<li><strong>Thèmes</strong> : naviguer entre les grands thèmes de vie (amour, carrière, argent, santé, voyages, famille, projets) en observant les réactions.</li>
<li><strong>Approfondissement</strong> : creuser les thèmes qui suscitent une réaction, avec des faits flous.</li>
<li><strong>Conclusion positive</strong> : un message encourageant et un résumé qui met en valeur les « touches ».</li>
</ol>
<h3>Lecture tiède et lecture chaude</h3>
<ul>
<li><strong>Lecture tiède</strong> (<em>warm reading</em>) : déductions à partir d'indices visibles (alliance, bronzage, mains, vêtements, accent) et de connaissances générales (une personne en deuil s'interroge souvent sur un objet du défunt).</li>
<li><strong>Lecture chaude</strong> (<em>hot reading</em>) : informations récoltées à l'avance (réseaux sociaux, conversations surprises). Le cas célèbre est le télévangéliste <strong>Peter Popoff</strong>, démasqué en 1986 par <strong>James Randi</strong> : sa femme lui transmettait par oreillette les informations des fiches remplies par les fidèles.</li>
</ul>
<div class="callout warn">⚠️ Sur scène, faites des lectures légères, positives, et clairement présentées comme une démonstration. Ne faites jamais de lecture sur un deuil, une maladie ou une décision importante.</div>`,
        keyPoints: ['Cadre → généraux → thèmes → approfondissement → conclusion.', 'Tiède = indices visibles ; chaude = infos récoltées.', 'Popoff démasqué par Randi en 1986.'],
        exercise: "Faites une lecture de 3 minutes à un ami consentant, en lui expliquant ensuite les techniques utilisées. Demandez-lui ce qui l'a le plus convaincu.",
        quiz: [
          { q: "Qui a démasqué Peter Popoff ?", options: ['James Randi', 'Derren Brown', 'Harry Houdini', 'Uri Geller'], answer: 0, explain: "Randi a intercepté les transmissions radio en 1986." },
          { q: "Déduire quelque chose d'une alliance relève de…", options: ['La lecture chaude', 'La lecture tiède', 'La télépathie', 'Le coup d’avance'], answer: 1, explain: "Indice visible et déduction = lecture tiède." },
        ],
      },
    ],
  },
  {
    id: 'm8',
    level: 3,
    title: 'Billets et informations secrètes',
    icon: '✉️',
    summary: 'Les principes classiques pour obtenir une information écrite : billets, déchirure, écriture secrète, double réalité.',
    lessons: [
      {
        id: 'm8l1',
        title: 'Le travail des billets',
        duration: 16,
        content: `
<p>Un <strong>billet</strong> est un petit papier sur lequel le spectateur écrit une pensée. Tout l'art consiste à connaître son contenu alors qu'il semble impossible de l'avoir lu.</p>
<h3>Les grandes familles de principes</h3>
<ul>
<li><strong>Le coup d'œil</strong> (<em>peek</em>) : lire l'information un bref instant, à un moment où personne ne s'y attend (par exemple en rendant le billet, ou en le déchirant).</li>
<li><strong>La déchirure centrale</strong> (<em>center tear</em>) : le spectateur écrit au centre d'un papier, entouré par exemple d'un cercle. En déchirant le billet « pour le détruire », le mentaliste conserve secrètement la partie centrale et la lit plus tard, pendant un temps faible. Toute la difficulté est dans le naturel et le timing.</li>
<li><strong>La substitution</strong> : échanger le vrai billet contre un faux.</li>
<li><strong>L'empreinte</strong> : récupérer l'écriture par transfert (carbone, surfaces préparées).</li>
<li><strong>L'écriture secrète</strong> : écrire en cachette une « prédiction » après avoir obtenu l'information, avec un petit dispositif dissimulé (en anglais <em>swami gimmick</em> ou <em>nail writer</em>).</li>
</ul>
<h3>Les points communs</h3>
<p>Ces méthodes reposent sur trois piliers : un geste <strong>justifié</strong> (on ne fait rien sans raison apparente), un <strong>timing</strong> décalé (on lit bien après l'écriture), et une <strong>présentation</strong> qui fait croire que l'information vient de l'esprit du spectateur.</p>
<div class="callout">📚 Pour approfondir : les grands classiques du travail des billets sont présentés dans <em>13 Steps to Mentalism</em> (Corinda) et dans de nombreux ouvrages spécialisés. Apprenez-les dans les livres et auprès des clubs : ils demandent une pratique réelle.</div>`,
        keyPoints: ['Coup d’œil, déchirure centrale, substitution, empreinte, écriture secrète.', 'Chaque geste doit être justifié.', 'Lire bien après l’écriture.'],
        exercise: "Entraînez-vous à lire un mot écrit sur un papier plié en le dépliant d'un geste naturel pendant que vous regardez ailleurs, jusqu'à pouvoir le faire en moins d'une seconde.",
        quiz: [
          { q: "Dans la déchirure centrale, que conserve secrètement le mentaliste ?", options: ['Les bords du papier', 'La partie centrale où le spectateur a écrit', 'Le stylo', 'Rien'], answer: 1, explain: "Le centre contient l'écriture." },
          { q: "Pourquoi lire l'information bien après l'écriture ?", options: ['Pour que le public ne relie pas le moment de lecture à l’effet', 'Pour mieux voir', 'Par tradition', 'Parce que l’encre sèche'], answer: 0, explain: "C'est le détournement temporel." },
        ],
      },
      {
        id: 'm8l2',
        title: 'Double réalité et numéros de questions-réponses',
        duration: 14,
        content: `
<h3>La double réalité</h3>
<p>La <strong>double réalité</strong> (<em>dual reality</em>) consiste à faire vivre deux expériences différentes au volontaire et au public. Le public entend une version (« Pensez à n'importe quelle carte »), tandis que le volontaire reçoit une instruction légèrement différente (une carte écrite qu'on lui montre discrètement, par exemple). Le volontaire, qui ne veut pas « gâcher » l'expérience, reste souvent silencieux.</p>
<p>Points de vigilance : choisir un volontaire coopératif, ne jamais le mettre mal à l'aise, et le remercier chaleureusement.</p>
<h3>Le numéro de questions-réponses</h3>
<p>Le <em>Q&amp;A act</em> est le grand classique des années 1900–1950 : le public écrit des questions, le mentaliste y répond les yeux bandés. <strong>Claude Alexander Conlin</strong> (« Alexander, The Man Who Knows ») et <strong>Joseph Dunninger</strong> en ont fait des triomphes. Les méthodes combinent coup d'avance, billets, substitutions et lecture à froid.</p>
<h3>Le test du livre</h3>
<p>Le spectateur choisit un mot dans un livre ; le mentaliste le révèle. Méthodes : forçage d'une page, livres truqués, principes mathématiques, ou… mémoire réelle (voir le module mémoire).</p>`,
        keyPoints: ['Double réalité : deux versions de l’expérience.', 'Le Q&A act : Alexander, Dunninger.', 'Le test du livre peut combiner forçage et mémoire.'],
        exercise: "Imaginez une routine qui combine le 1089 et un test du livre. Écrivez le script et identifiez le moment le plus risqué.",
        quiz: [
          { q: "Dans la double réalité…", options: ['Le public et le volontaire vivent deux expériences différentes', 'Il y a deux mentalistes', 'On utilise deux jeux de cartes', 'On répète deux fois'], answer: 0, explain: "Chacun croit à une version différente." },
          { q: "Qui était « The Man Who Knows » ?", options: ['Claude Alexander Conlin', 'Kreskin', 'Banachek', 'Houdini'], answer: 0, explain: "Alexander, star du Q&A act." },
        ],
      },
    ],
  },
  {
    id: 'm9',
    level: 3,
    title: 'Lecture musculaire et idéomotricité',
    icon: '✋',
    summary: 'Trouver un objet caché en tenant le poignet de quelqu’un : la vraie compétence derrière la légende.',
    lessons: [
      {
        id: 'm9l1',
        title: "L'effet idéomoteur",
        duration: 12,
        content: `
<p>L'<strong>effet idéomoteur</strong> désigne des micro-mouvements musculaires involontaires provoqués par une pensée. Il a été décrit par le physiologiste britannique <strong>William Carpenter</strong> en 1852. Le chimiste français <strong>Michel-Eugène Chevreul</strong> l'avait déjà étudié avec le <strong>pendule</strong>, et <strong>Michael Faraday</strong> l'a démontré en 1853 pour expliquer les « tables tournantes ».</p>
<p>C'est ce qui fait bouger le pendule, la planchette du Ouija et les baguettes de sourcier, sans que la personne en ait conscience.</p>
<h3>Le pendule de Chevreul (à essayer)</h3>
<ol>
<li>Tenez une bague au bout d'un fil, coude posé sur la table.</li>
<li>Pensez intensément « avant-arrière » sans bouger volontairement.</li>
<li>Après quelques secondes, le pendule oscille dans cette direction. Pensez « cercle »... il tourne.</li>
</ol>
<p>Sur scène, ce petit test sert aussi à repérer les volontaires les plus réceptifs aux suggestions.</p>`,
        keyPoints: ['Pensée → micro-mouvement involontaire.', 'Carpenter (1852), Chevreul, Faraday (1853).', 'Explique pendule, Ouija, sourciers.'],
        exercise: "Faites l'expérience du pendule de Chevreul sur vous-même puis sur 3 personnes. Notez qui réagit le plus vite.",
        quiz: [
          { q: "Qui a démontré que les tables tournantes venaient des participants ?", options: ['Michael Faraday', 'Isaac Newton', 'Allan Kardec', 'Nikola Tesla'], answer: 0, explain: "Faraday, 1853, avec un dispositif mesurant les poussées." },
          { q: "L'effet idéomoteur explique…", options: ['La télépathie', 'Les mouvements du pendule et de la planchette Ouija', "L'hypnose", 'La lecture à froid'], answer: 1, explain: "Ce sont des micro-mouvements inconscients." },
        ],
      },
      {
        id: 'm9l2',
        title: 'La lecture musculaire (hellstromisme)',
        duration: 16,
        content: `
<p>La <strong>lecture musculaire</strong> consiste à retrouver un objet caché ou une personne choisie en tenant légèrement le poignet d'un spectateur qui « pense » à la cible. Elle porte aussi le nom d'<strong>hellstromisme</strong>, d'après le Suédois Axel Hellstrom, et a été rendue célèbre par <strong>Washington Irving Bishop</strong> et <strong>Stuart Cumberland</strong> au XIXe siècle.</p>
<h3>Le principe</h3>
<ul>
<li>Le guide pense à la direction. Inconsciemment, il <strong>résiste</strong> quand vous allez dans la mauvaise direction et <strong>se relâche</strong> ou vous suit quand vous allez dans la bonne.</li>
<li>Vous marchez d'un pas <strong>décidé</strong> en légers zigzags pour « tester » les directions.</li>
<li>Arrivé près de la cible, vous faites de petits mouvements de main : la tension change quand vous êtes au bon endroit.</li>
</ul>
<h3>Progression d'entraînement</h3>
<ol>
<li>Avec un ami : il pense « gauche » ou « droite », vous tenez son poignet. Répétez 50 fois.</li>
<li>Trouver un objet parmi 3 sur une table.</li>
<li>Trouver un objet caché dans une pièce.</li>
<li>Sans contact (« contact zéro ») : observation de la posture et du regard du guide qui vous suit.</li>
</ol>
<div class="callout">🧭 Demandez au guide de <strong>penser fort à la direction</strong> (« à gauche, à gauche... ») et non seulement à l'objet : le signal devient beaucoup plus clair.</div>`,
        keyPoints: ['Le guide résiste ou suit sans le savoir.', 'Pas décidé, zigzags, tests de direction.', 'Progresser du contact fort au contact zéro.'],
        exercise: "Faites 50 essais « gauche/droite » avec un partenaire et notez votre taux de réussite. Objectif : plus de 80 %.",
        quiz: [
          { q: "Sur quoi repose la lecture musculaire ?", options: ['La télépathie', 'Les micro-résistances involontaires du guide', 'Un complice', 'Un aimant'], answer: 1, explain: "C'est l'effet idéomoteur appliqué au déplacement." },
          { q: "Quelle consigne améliore le signal du guide ?", options: ['Penser à la direction à prendre', 'Fermer les yeux', 'Ne penser à rien', 'Parler fort'], answer: 0, explain: "Penser « gauche, droite, stop » amplifie les micro-mouvements." },
        ],
      },
    ],
  },
  {
    id: 'm10',
    level: 4,
    title: 'Prouesses de calcul mental',
    icon: '🧮',
    summary: 'Calendrier perpétuel, carré magique et racines cubiques : de vraies compétences spectaculaires.',
    lessons: [
      {
        id: 'm10l1',
        title: 'Le jour de la semaine de n’importe quelle date',
        duration: 20,
        content: `
<p>La méthode du <strong>Doomsday</strong> (« jour pivot ») du mathématicien <strong>John Conway</strong> permet de trouver le jour de la semaine de n'importe quelle date en quelques secondes.</p>
<h3>1. Les dates pivots (même jour de la semaine chaque année)</h3>
<p>4/4, 6/6, 8/8, 10/10, 12/12 · 9/5 et 5/9, 11/7 et 7/11 (« Je travaille de 9 à 5 au 7-Eleven ») · 14 mars (« 0 mars » = dernier jour de février) · 3 janvier (4 janvier en année bissextile) · 28 février (29 en bissextile).</p>
<h3>2. Le jour pivot du siècle</h3>
<p>1800 : vendredi · 1900 : mercredi · 2000 : mardi · 2100 : dimanche.</p>
<h3>3. Le jour pivot de l'année</h3>
<p>Avec <strong>y</strong> = les deux derniers chiffres de l'année :</p>
<ul>
<li>a = y ÷ 12 (partie entière), b = reste de cette division, c = b ÷ 4 (partie entière).</li>
<li>Jour pivot = jour du siècle + a + b + c (modulo 7).</li>
</ul>
<p><strong>Exemple : 14 juillet 1989.</strong> y = 89 : a = 7, b = 5, c = 1 → 13 ≡ 6. Mercredi + 6 = <strong>mardi</strong> (pivot 1989). Le 11 juillet est un pivot (mardi) → le 14 juillet 1989 est un <strong>vendredi</strong>. ✔️</p>
<p>Numérotation : dimanche = 0, lundi = 1, mardi = 2, mercredi = 3, jeudi = 4, vendredi = 5, samedi = 6.</p>
<p>👉 Entraînez-vous avec l'outil <strong>Calendrier</strong> du Labo : objectif moins de 10 secondes par date.</p>`,
        keyPoints: ['Dates pivots : 4/4, 6/6, 8/8, 10/10, 12/12, 9/5, 5/9, 11/7, 7/11, 14/3.', 'Siècles : 1900 mercredi, 2000 mardi.', 'a + b + c + jour du siècle (mod 7).'],
        exercise: "Calculez le jour de la semaine de votre naissance et de celle de 5 proches. Vérifiez avec l'outil Calendrier.",
        quiz: [
          { q: "Quel est le jour pivot du siècle 2000 ?", options: ['Lundi', 'Mardi', 'Mercredi', 'Dimanche'], answer: 1, explain: "2000 → mardi." },
          { q: "Laquelle de ces dates n’est PAS un pivot ?", options: ['8 août', '10 octobre', '3 mars', '12 décembre'], answer: 2, explain: "En mars, le pivot est le 14 (et le « 0 mars »)." },
          { q: "En 2026, a, b et c valent…", options: ['2, 2, 0', '2, 6, 1', '1, 14, 3', '3, 2, 0'], answer: 0, explain: "26 = 2×12 + 2 ; 2÷4 = 0. Mardi + 4 = samedi." },
        ],
      },
      {
        id: 'm10l2',
        title: 'Le carré magique 4×4',
        duration: 18,
        content: `
<p>Un spectateur donne un nombre (par exemple 57). En quelques secondes, vous remplissez une grille de 4×4 où <strong>chaque ligne, chaque colonne et chaque diagonale</strong> donne ce total, ainsi que de nombreux autres groupes de 4 cases. C'est un grand classique du mentalisme et du calcul mental.</p>
<h3>La méthode du modèle</h3>
<p>Mémorisez ce carré de base dont le total est 34 :</p>
<table class="square">
<tr><td>8</td><td>11</td><td><strong>14</strong></td><td>1</td></tr>
<tr><td><strong>13</strong></td><td>2</td><td>7</td><td>12</td></tr>
<tr><td>3</td><td><strong>16</strong></td><td>9</td><td>6</td></tr>
<tr><td>10</td><td>5</td><td>4</td><td><strong>15</strong></td></tr>
</table>
<p>Pour un total N (≥ 34), calculez <strong>d = N − 34</strong> et ajoutez d aux quatre cases en gras (13, 14, 15, 16). Toutes les autres cases restent identiques. Chaque ligne, colonne et diagonale contient exactement une case en gras : le total devient N.</p>
<p><strong>Exemple</strong> pour 57 : d = 23 → 13 devient 36, 14 devient 37, 15 devient 38, 16 devient 39.</p>
<h3>Présentation</h3>
<ul>
<li>Remplissez les cases dans un ordre <strong>désordonné</strong> pour cacher le modèle.</li>
<li>Montrez ensuite toutes les combinaisons : lignes, colonnes, diagonales, les 4 coins, le carré central.</li>
<li>Variante forte : utilisez la date de naissance du spectateur dans la première ligne (méthode plus avancée, voir les ouvrages spécialisés).</li>
</ul>
<p>👉 Entraînez-vous avec l'outil <strong>Carré magique</strong> du Labo.</p>`,
        keyPoints: ['Modèle de base total 34.', 'd = N − 34, à ajouter à 13, 14, 15, 16.', 'Remplir dans le désordre.'],
        exercise: "Remplissez un carré pour 3 nombres choisis au hasard entre 34 et 99 en moins de 60 secondes chacun, dans le désordre.",
        quiz: [
          { q: "Pour un total de 50, que devient la case 16 ?", options: ['32', '16', '66', '30'], answer: 0, explain: "d = 50 − 34 = 16 → 16 + 16 = 32." },
          { q: "Pourquoi chaque ligne donne-t-elle le nouveau total ?", options: ['Par hasard', 'Chaque ligne, colonne et diagonale contient exactement une des cases modifiées', 'Parce que le carré est symétrique', 'Ce n’est pas le cas'], answer: 1, explain: "Ajouter d à une seule case par ligne augmente le total de d." },
        ],
      },
      {
        id: 'm10l3',
        title: 'Les racines cubiques express',
        duration: 15,
        content: `
<p>Un spectateur choisit un nombre de 2 chiffres, l'élève au cube avec une calculatrice et vous annonce le résultat. Vous donnez la racine instantanément.</p>
<h3>1. Le dernier chiffre</h3>
<p>Le dernier chiffre du cube détermine le dernier chiffre de la racine :</p>
<table>
<tr><th>Fin du cube</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr>
<tr><th>Fin de la racine</th><td>0</td><td>1</td><td>8</td><td>7</td><td>4</td><td>5</td><td>6</td><td>3</td><td>2</td><td>9</td></tr>
</table>
<p>Astuce : seuls 2↔8 et 3↔7 s'échangent, les autres restent identiques.</p>
<h3>2. Le premier chiffre</h3>
<p>Ignorez les 3 derniers chiffres. Comparez le reste aux cubes : 1, 8, 27, 64, 125, 216, 343, 512, 729. Le premier chiffre de la racine est celui dont le cube est juste inférieur ou égal.</p>
<p><strong>Exemple : 314 432.</strong> Fin 2 → 8. Reste 314 : entre 216 (6³) et 343 (7³) → 6. Réponse : <strong>68</strong>.</p>`,
        keyPoints: ['Dernier chiffre : 2↔8, 3↔7, les autres identiques.', 'Premier chiffre : comparer aux cubes de 1 à 9.', 'Fonctionne pour les cubes parfaits de 1 à 99.'],
        exercise: "Apprenez par cœur les cubes de 1 à 9, puis faites 20 racines dans l'outil Racines cubiques.",
        quiz: [
          { q: "Racine cubique de 857 375 ?", options: ['95', '85', '75', '93'], answer: 0, explain: "Fin 5 → 5 ; 857 entre 729 (9³) et 1000 → 9. Donc 95." },
          { q: "Un cube se termine par 7. La racine se termine par…", options: ['7', '3', '9', '1'], answer: 1, explain: "3 et 7 s'échangent." },
        ],
      },
    ],
  },
  {
    id: 'm11',
    level: 4,
    title: 'Cartes et mentalisme',
    icon: '♠️',
    summary: 'Jeux arrangés et jeux mémorisés : savoir quelle carte est où.',
    lessons: [
      {
        id: 'm11l1',
        title: 'Le chapelet Si Stebbins',
        duration: 16,
        content: `
<p>Un <strong>chapelet</strong> (<em>stack</em>) est un ordre secret du jeu. Le système <strong>Si Stebbins</strong> (publié en 1898, aujourd'hui du domaine public) est cyclique : chaque carte vaut <strong>+3</strong> par rapport à la précédente, et les couleurs suivent toujours le même ordre.</p>
<ul>
<li>Valeurs : A, 4, 7, 10, R, 3, 6, 9, D, 2, 5, 8, V, puis on recommence (As = 1, Valet = 11, Dame = 12, Roi = 13).</li>
<li>Couleurs, dans l'ordre <strong>Trèfle, Cœur, Pique, Carreau</strong> (en anglais <em>CHaSeD</em> : Clubs, Hearts, Spades, Diamonds).</li>
</ul>
<p>Exemple : A♣, 4♥, 7♠, 10♦, R♣, 3♥, 6♠...</p>
<h3>Pourquoi c'est puissant</h3>
<ul>
<li>Le jeu peut être <strong>coupé</strong> autant de fois que l'on veut : l'ordre cyclique reste intact.</li>
<li>Si vous voyez la carte du dessous, la carte du dessus est <strong>+3 et la couleur suivante</strong>.</li>
<li>Un spectateur prend une carte : jetez un coup d'œil à la carte juste au-dessus du « trou », vous connaissez la sienne.</li>
</ul>
<div class="callout">🃏 Le Si Stebbins a l'air mélangé à un regard rapide, surtout si vous étalez peu les cartes. Pour un ordre qui paraît totalement aléatoire, les experts utilisent des jeux mémorisés (voir leçon suivante).</div>
<p>👉 Entraînez-vous avec l'outil <strong>Si Stebbins</strong> du Labo.</p>`,
        keyPoints: ['+3 à chaque carte, couleurs Trèfle-Cœur-Pique-Carreau.', 'Les coupes ne détruisent pas l’ordre.', 'Carte du dessous connue → carte du dessus connue.'],
        exercise: "Montez un jeu en Si Stebbins. Coupez-le, regardez la carte du dessous et annoncez celle du dessus 30 fois de suite.",
        quiz: [
          { q: "Quelle carte suit le 9♦ en Si Stebbins ?", options: ['D♣', '9♣', 'D♥', '2♣'], answer: 0, explain: "9 + 3 = 12 (Dame), et après Carreau vient Trèfle." },
          { q: "Quelle carte suit le V♥ ?", options: ['A♠', 'A♥', '2♠', 'R♠'], answer: 0, explain: "11 + 3 = 14 → 1 (As), et après Cœur vient Pique." },
          { q: "Que se passe-t-il si on coupe le jeu ?", options: ["L'ordre cyclique est préservé", 'Tout est perdu', 'Il faut recommencer', 'Les couleurs changent'], answer: 0, explain: "Couper revient à faire tourner un cycle." },
        ],
      },
      {
        id: 'm11l2',
        title: 'Le jeu mémorisé',
        duration: 15,
        content: `
<p>Un <strong>jeu mémorisé</strong> est un ordre de 52 cartes que vous connaissez par cœur dans les deux sens : position → carte et carte → position. Il permet des effets d'une puissance extrême : annoncer la carte à n'importe quelle position, savoir quelle carte a été prise, retrouver une carte pensée « au hasard ».</p>
<h3>Les ordres célèbres</h3>
<ul>
<li>Le jeu mémorisé de l'Espagnol <strong>Juan Tamariz</strong> (<em>Mnemonica</em>) et celui de l'Américain <strong>Simon Aronson</strong> sont les plus connus. Ils sont décrits dans leurs livres respectifs, qu'il est recommandé d'acheter pour respecter leurs auteurs.</li>
<li>Vous pouvez aussi créer votre propre ordre.</li>
</ul>
<h3>Comment le mémoriser</h3>
<ol>
<li>Donnez à chaque carte une <strong>image</strong> (par exemple avec le Système Majeur : couleur = premier son, valeur = second : Pique = p, 7 = k → « pic » pour 7♠).</li>
<li>Donnez à chaque position 1-52 son image du Système Majeur.</li>
<li>Associez image de position + image de carte dans une scène absurde.</li>
<li>Révisez 10 minutes par jour : en 2 à 4 semaines, le jeu est automatique.</li>
</ol>
<div class="callout">🧠 C'est exactement la même compétence que celle des champions de mémoire : votre entraînement mémoire du niveau 2 prend ici toute sa valeur.</div>`,
        keyPoints: ['Connaître position → carte et carte → position.', 'Mnemonica (Tamariz) et Aronson : ordres célèbres.', 'Images de cartes + images de positions.'],
        exercise: "Créez vos images pour les 13 cartes de Pique. Mémorisez-les puis testez-vous dans les deux sens.",
        quiz: [
          { q: "Qui a créé l'ordre Mnemonica ?", options: ['Juan Tamariz', 'Dai Vernon', 'Si Stebbins', 'Derren Brown'], answer: 0, explain: "Le grand magicien espagnol Juan Tamariz." },
          { q: "Un jeu mémorisé doit être connu…", options: ['Dans un seul sens', 'Dans les deux sens (position ↔ carte)', 'Seulement pour les As', 'Avec des marques au dos'], answer: 1, explain: "Les deux sens sont nécessaires pour les effets." },
        ],
      },
    ],
  },
  {
    id: 'm12',
    level: 4,
    title: 'Suggestion et hypnose de spectacle',
    icon: '🌀',
    summary: 'Ce que la science dit de l’hypnose, les tests de suggestibilité et les règles de sécurité.',
    lessons: [
      {
        id: 'm12l1',
        title: "Comprendre l'hypnose",
        duration: 16,
        content: `
<p>L'hypnose est un phénomène réel mais souvent mal compris. Deux grandes familles de théories :</p>
<ul>
<li><strong>Théories de l'état</strong> : l'hypnose serait un état de conscience particulier (concentration intense, dissociation).</li>
<li><strong>Théories socio-cognitives</strong> (Theodore Sarbin, Theodore Barber, Nicholas Spanos) : les effets s'expliquent par les attentes, l'imagination, la motivation et le rôle social du « sujet hypnotisé ».</li>
</ul>
<p>Le consensus actuel : les suggestions produisent des expériences <strong>réellement vécues</strong> par les sujets, la <strong>suggestibilité</strong> varie beaucoup d'une personne à l'autre, et personne ne peut être forcé à agir contre ses valeurs profondes.</p>
<h3>Hypnose de spectacle</h3>
<p>Sur scène, l'hypnotiseur combine : sélection des sujets les plus suggestibles, pression sociale de la scène, attentes du public, et techniques de suggestion progressive. Les tests de suggestibilité classiques :</p>
<ul>
<li><strong>Les mains collées</strong> : doigts croisés, on suggère qu'ils ne peuvent plus se séparer.</li>
<li><strong>Le bras qui s'élève</strong> : un ballon imaginaire attaché au poignet.</li>
<li><strong>Le pendule de Chevreul</strong> (vu au niveau 3).</li>
</ul>
<div class="callout warn">⚠️ Sécurité : ne pratiquez pas l'hypnose avec des personnes souffrant de troubles psychiatriques, d'épilepsie ou de problèmes cardiaques, ni avec des mineurs sans autorisation. Retirez <strong>toujours</strong> toutes les suggestions à la fin. Certains pays encadrent légalement l'hypnose de spectacle (par exemple le <em>Hypnotism Act</em> de 1952 au Royaume-Uni). Formez-vous auprès de professionnels avant de pratiquer.</div>`,
        keyPoints: ['Théories de l’état vs socio-cognitives.', 'La suggestibilité varie selon les personnes.', 'Sécurité, consentement et retrait des suggestions.'],
        exercise: "Testez sur vous-même l'exercice des mains collées en enregistrant votre propre voix. Notez vos sensations.",
        quiz: [
          { q: "Que disent les théories socio-cognitives ?", options: ["L'hypnose est magique", "Les effets viennent des attentes, de l'imagination et du rôle social", "L'hypnose n'existe pas du tout", "L'hypnose contrôle totalement l'esprit"], answer: 1, explain: "Sarbin, Barber, Spanos." },
          { q: "Que faut-il toujours faire à la fin d'une séance ?", options: ['Faire payer', 'Retirer toutes les suggestions', 'Recommencer', 'Prendre une photo'], answer: 1, explain: "Ne jamais laisser une suggestion active." },
        ],
      },
    ],
  },
  {
    id: 'm13',
    level: 5,
    title: 'Construire un spectacle',
    icon: '🎪',
    summary: 'Superposer les méthodes, gérer les sorties, structurer un numéro professionnel.',
    lessons: [
      {
        id: 'm13l1',
        title: 'Superposition des méthodes et sorties',
        duration: 18,
        content: `
<p>Ce qui sépare l'amateur de l'expert, c'est la <strong>conception</strong> des effets.</p>
<h3>Superposer</h3>
<p>Un effet expert combine plusieurs méthodes qui se recouvrent : un forçage psychologique <em>et</em> un forçage mécanique de secours, une lecture corporelle <em>et</em> un coup d'œil. Le public ne peut pas reconstituer la méthode, car chaque explication est contredite par une condition. <strong>Banachek</strong> a beaucoup écrit sur ces « subtilités psychologiques » (<em>Psychological Subtleties</em>).</p>
<h3>Les sorties (<em>outs</em>)</h3>
<ul>
<li>Prévoir <strong>plusieurs fins</strong> possibles : prédictions dans des poches différentes, révélations multiples.</li>
<li>Transformer un échec en réussite partielle (« Vous avez hésité entre deux, n'est-ce pas ? »).</li>
<li>Avoir un effet de secours infaillible prêt à enchaîner.</li>
</ul>
<h3>Les « principes de conviction »</h3>
<ul>
<li>Plus le spectateur fait de choses <strong>lui-même</strong>, plus l'effet est fort.</li>
<li>Moins il y a d'accessoires, plus l'effet paraît mental.</li>
<li>Un effet doit pouvoir se résumer en <strong>une phrase</strong> (« Il a deviné le prénom de mon premier amour »).</li>
<li>La <strong>répétition</strong> du même effet expose la méthode : variez.</li>
</ul>`,
        keyPoints: ['Superposer plusieurs méthodes indépendantes.', 'Toujours prévoir des sorties.', 'Effet résumable en une phrase, peu d’accessoires.'],
        exercise: "Prenez un effet que vous maîtrisez et ajoutez-lui une deuxième méthode indépendante et deux sorties. Notez la nouvelle version.",
        quiz: [
          { q: "Qu'est-ce qu'une sortie (out) ?", options: ['La porte de la salle', 'Une fin alternative prévue en cas d’échec partiel', 'La fin du spectacle', 'Un forçage'], answer: 1, explain: "Le public ne voit que la réussite." },
          { q: "Pourquoi éviter de répéter un effet ?", options: ['Le public s’ennuie et peut découvrir la méthode', 'C’est interdit', 'Ça fatigue', 'Aucune raison'], answer: 0, explain: "La répétition donne des points de comparaison." },
        ],
      },
      {
        id: 'm13l2',
        title: 'La structure d’un numéro',
        duration: 15,
        content: `
<h3>La règle des trois actes</h3>
<ol>
<li><strong>Ouverture</strong> : court, visuel, impliquant le public entier. Il établit votre personnage et vos règles. (Ex. : une expérience d'influence de groupe.)</li>
<li><strong>Corps</strong> : montée en puissance, variété des familles d'effets (prédiction, télépathie, mémoire), alternance de rythmes (rires, tension, émotion).</li>
<li><strong>Final</strong> : l'effet le plus émotionnel et personnel. Souvent une prédiction qui révèle tout ce qui s'est passé pendant le spectacle.</li>
</ol>
<h3>Le pré-show</h3>
<p>Le <strong>pré-show</strong> consiste à obtenir une information avant le début officiel du spectacle (une conversation, une carte remplie à l'accueil). C'est très puissant, mais délicat sur le plan éthique : on ne récupère pas d'informations intimes et on reste dans le jeu.</p>
<h3>Durées types</h3>
<table>
<tr><th>Format</th><th>Durée</th><th>Nombre d'effets</th></tr>
<tr><td>Close-up (table)</td><td>10-15 min</td><td>3-4</td></tr>
<tr><td>Salon (parlour)</td><td>30-45 min</td><td>6-8</td></tr>
<tr><td>Scène</td><td>60-90 min</td><td>8-12</td></tr>
</table>
<div class="callout">🎬 Filmez chacune de vos représentations. Regardez-les en notant : les temps morts, les moments où le public décroche, les phrases inutiles.</div>`,
        keyPoints: ['Ouverture courte, corps varié, final émotionnel.', 'Le pré-show est puissant mais doit rester éthique.', 'Filmer et analyser chaque représentation.'],
        exercise: "Construisez un numéro de salon de 30 minutes avec les effets appris dans cette application. Écrivez l'ordre, la durée et la transition entre chaque effet.",
        quiz: [
          { q: "Quel effet placer en final ?", options: ['Le plus court', 'Le plus émotionnel et personnel', 'Le plus technique', 'Le plus ancien'], answer: 1, explain: "Le final laisse le souvenir principal." },
          { q: "Qu'est-ce que le pré-show ?", options: ['La répétition générale', 'Une information obtenue avant le début officiel', 'La publicité', 'Le décor'], answer: 1, explain: "Une technique puissante qui demande de l'éthique." },
        ],
      },
    ],
  },
  {
    id: 'm14',
    level: 5,
    title: 'Le métier et l’esprit critique',
    icon: '🏆',
    summary: 'Créer ses effets, rejoindre la communauté, et démystifier les fraudes : le rôle du maître.',
    lessons: [
      {
        id: 'm14l1',
        title: 'Créer ses propres effets',
        duration: 15,
        content: `
<p>L'expert ne se contente pas de reproduire : il <strong>crée</strong>. Une démarche en 5 étapes :</p>
<ol>
<li><strong>Partir de l'effet rêvé</strong>, du point de vue du spectateur, sans penser à la méthode.</li>
<li><strong>Lister les méthodes</strong> possibles (forçages, coup d'avance, mémoire, billets, observation...).</li>
<li><strong>Combiner</strong> les méthodes et chercher la plus simple qui donne les conditions les plus fortes.</li>
<li><strong>Écrire la présentation</strong> : pourquoi cet effet compte-t-il ? Quelle histoire raconte-t-il ?</li>
<li><strong>Tester</strong> devant de vrais publics, au moins 20 fois, et ajuster.</li>
</ol>
<h3>La communauté</h3>
<ul>
<li>Clubs et associations : <strong>FFAP</strong> (France), <strong>The Magic Circle</strong> (Royaume-Uni), <strong>IBM</strong> et <strong>SAM</strong> (international, États-Unis), et pour le mentalisme spécifiquement la <strong>Psychic Entertainers Association</strong>.</li>
<li>Congrès et festivals : l'occasion de voir les meilleurs et d'échanger.</li>
<li>Respect des créateurs : on ne copie pas le numéro d'un autre, on crédite les inventeurs, on achète leurs livres.</li>
</ul>`,
        keyPoints: ['Effet rêvé → méthodes → combinaison → présentation → tests.', 'Rejoindre clubs et congrès.', 'Créditer et respecter les créateurs.'],
        exercise: "Créez un effet original en suivant les 5 étapes. Écrivez-le dans votre Journal (Labo).",
        quiz: [
          { q: "Par quoi commence la création d'un effet ?", options: ['La méthode', "L'effet rêvé du point de vue du spectateur", 'Le prix', "L'accessoire"], answer: 1, explain: "La méthode vient après." },
          { q: "Quelle association est dédiée au mentalisme ?", options: ['Psychic Entertainers Association', 'FIFA', 'UNESCO', 'Mensa'], answer: 0, explain: "La PEA réunit les mentalistes professionnels." },
        ],
      },
      {
        id: 'm14l2',
        title: 'Le mentaliste sceptique',
        duration: 15,
        content: `
<p>Le mentaliste connaît mieux que quiconque les méthodes de la fraude. Beaucoup ont mis ce savoir au service de la vérité.</p>
<ul>
<li><strong>Harry Houdini</strong> (années 1920) a démasqué de nombreux médiums spirites.</li>
<li><strong>James Randi</strong> a démasqué Peter Popoff et proposé pendant des décennies un prix d'un million de dollars à quiconque prouverait un pouvoir paranormal sous conditions contrôlées. Personne ne l'a jamais remporté.</li>
<li>Le <strong>Projet Alpha</strong> (1979-1983) : Randi envoie deux jeunes magiciens, <strong>Steve Shaw (Banachek)</strong> et Michael Edwards, dans un laboratoire de parapsychologie de l'université Washington à Saint-Louis. Les chercheurs les déclarent dotés de pouvoirs réels... Les jeunes utilisaient de simples techniques de magie. Une leçon sur l'importance des protocoles.</li>
<li>En France, <strong>Gérard Majax</strong> a reproduit à la télévision les « miracles » de prétendus médiums et plieurs de cuillères.</li>
<li>Au Royaume-Uni, <strong>Derren Brown</strong> a réalisé plusieurs émissions démontrant comment fonctionnent les faux guérisseurs et faux médiums.</li>
</ul>
<h3>Les outils de l'esprit critique</h3>
<ul>
<li>Une affirmation extraordinaire demande des <strong>preuves extraordinaires</strong>.</li>
<li>Rechercher les explications simples avant les explications surnaturelles (<strong>rasoir d'Ockham</strong>).</li>
<li>Demander des <strong>protocoles en double aveugle</strong> et des résultats reproductibles.</li>
<li>Se rappeler que <strong>les scientifiques ne sont pas formés à détecter la tricherie</strong> : les magiciens le sont.</li>
</ul>
<div class="callout">🏅 Vous avez atteint le niveau Maître. Votre rôle : émerveiller, et en même temps protéger le public contre ceux qui utilisent ces techniques pour tromper.</div>`,
        keyPoints: ['Houdini, Randi, Majax, Derren Brown : la tradition sceptique.', 'Projet Alpha : des magiciens ont trompé des chercheurs.', 'Preuves extraordinaires, rasoir d’Ockham, double aveugle.'],
        exercise: "Trouvez une affirmation paranormale récente (vidéo, article). Proposez 3 explications non surnaturelles et un protocole pour la tester.",
        quiz: [
          { q: "Qu'a montré le Projet Alpha ?", options: ['Que la télépathie existe', 'Que des chercheurs peuvent être trompés par des magiciens', 'Que Randi trichait', 'Que les cuillères plient seules'], answer: 1, explain: "Banachek et Michael Edwards ont trompé un laboratoire pendant des années." },
          { q: "Le prix de James Randi a-t-il été remporté ?", options: ['Oui, une fois', 'Non, jamais', 'Oui, par Uri Geller', 'Oui, par un médium français'], answer: 1, explain: "Personne n'a jamais réussi le test préliminaire." },
          { q: "Pourquoi les magiciens sont-ils utiles aux scientifiques qui testent le paranormal ?", options: ['Ils ont des pouvoirs', 'Ils sont formés à repérer la tricherie', 'Ils financent les études', 'Ils sont plus intelligents'], answer: 1, explain: "Les scientifiques ne s'attendent pas à ce que leurs sujets trichent." },
        ],
      },
    ],
  },
];
