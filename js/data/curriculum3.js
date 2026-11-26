// Modules complémentaires : présence, prédictions, impromptu, transmission de pensée, psychokinèse, métier
export const part3 = [
  {
    id: 'm15',
    level: 2,
    title: 'Voix, présence et charisme',
    icon: '🎙️',
    summary: 'La moitié du miracle est dans la manière : voix, silences, regard et occupation de l’espace.',
    lessons: [
      {
        id: 'm15l1',
        title: 'La voix et le silence',
        duration: 15,
        content: `
<p>Un mentaliste ne « montre » presque rien : il <strong>parle</strong>. Sa voix est son principal accessoire.</p>
<h3>Les 5 paramètres de la voix</h3>
<table>
<tr><th>Paramètre</th><th>Erreur fréquente</th><th>Ce qu'on vise</th></tr>
<tr><td><strong>Volume</strong></td><td>Parler trop bas par timidité</td><td>Être entendu au dernier rang sans crier (respiration abdominale)</td></tr>
<tr><td><strong>Débit</strong></td><td>Accélérer sous le stress</td><td>Ralentir de 20 % par rapport à une conversation</td></tr>
<tr><td><strong>Hauteur</strong></td><td>Voix qui monte en fin de phrase (questionnement)</td><td>Phrases affirmatives qui <em>descendent</em> : autorité</td></tr>
<tr><td><strong>Articulation</strong></td><td>Avaler les fins de mots</td><td>Consonnes nettes, surtout sur les noms et chiffres révélés</td></tr>
<tr><td><strong>Couleur</strong></td><td>Ton monocorde</td><td>Varier selon l'émotion : complicité, mystère, humour</td></tr>
</table>
<h3>La puissance du silence</h3>
<ul>
<li><strong>Avant une révélation</strong> : 2 à 4 secondes de silence multiplient la tension.</li>
<li><strong>Après une question</strong> : laissez le spectateur répondre, ne comblez pas le vide.</li>
<li><strong>Après l'effet</strong> : laissez la réaction exister avant de parler (le public a besoin de « réaliser »).</li>
</ul>
<div class="callout">🎧 Enregistrez-vous en train de dire votre script. La plupart des débutants découvrent qu'ils parlent deux fois trop vite et ne marquent aucune pause.</div>`,
        keyPoints: ['Volume, débit, hauteur, articulation, couleur.', 'Phrases affirmatives descendantes = autorité.', 'Le silence avant la révélation crée la tension.'],
        exercise: "Enregistrez votre script du forçage par équivoque. Réécoutez et marquez au crayon : 3 silences à ajouter, 2 phrases à ralentir, 1 mot à accentuer. Réenregistrez et comparez.",
        quiz: [
          { q: 'Une phrase dont la voix monte en fin donne une impression de…', options: ['Autorité', 'Question et doute', 'Mystère', 'Colère'], answer: 1, explain: "Les phrases affirmatives descendantes inspirent la confiance." },
          { q: 'Quand marquer un silence ?', options: ['Jamais', 'Avant une révélation et après l’effet', 'Seulement en début de spectacle', 'Quand on a oublié son texte'], answer: 1, explain: "Le silence est un outil dramatique majeur." },
          { q: 'Par rapport à une conversation, sur scène on parle…', options: ['Plus vite', 'Plus lentement', 'Au même rythme', 'En chuchotant'], answer: 1, explain: "Le stress accélère : il faut compenser en ralentissant volontairement." },
        ],
      },
      {
        id: 'm15l2',
        title: 'Regard, posture et espace scénique',
        duration: 15,
        content: `
<h3>La posture de base</h3>
<p>Pieds écartés de la largeur des hanches, poids réparti, épaules relâchées, mains visibles. C'est la posture « neutre » d'où partent tous vos mouvements. Évitez de vous balancer : chaque déplacement doit avoir un <strong>sens</strong>.</p>
<h3>Le regard</h3>
<ul>
<li><strong>Le regard balayage</strong> : en parlant au public, posez votre regard sur une personne par phrase, dans des zones différentes de la salle.</li>
<li><strong>Le regard intense</strong> : avec un volontaire, regardez-le dans les yeux pendant les moments clés (« Concentrez-vous sur ce nom... »). Cela crée l'intimité et la sensation de « lecture ».</li>
<li><strong>Le regard dirigé</strong> : là où vous regardez, le public regarde. C'est votre premier outil de détournement d'attention.</li>
</ul>
<h3>L'espace scénique</h3>
<ul>
<li>Le <strong>centre</strong> de la scène est réservé aux moments forts (révélations).</li>
<li>Le volontaire se place <strong>à côté de vous</strong>, légèrement tourné vers le public, jamais dos au public.</li>
<li>Avancer vers le public = intimité, confidence ; reculer = solennité, distance.</li>
</ul>
<h3>Le trac</h3>
<p>Le trac est normal, même chez les professionnels. Techniques éprouvées : respiration lente (4 s inspiration, 6 s expiration), connaître sa première minute <em>par cœur</em>, arriver tôt pour s'approprier le lieu, et considérer l'adrénaline comme de l'énergie.</p>`,
        keyPoints: ['Posture neutre, mouvements qui ont un sens.', 'Regard balayage, intense et dirigé.', 'Centre de la scène pour les révélations ; gérer le trac par la respiration et la préparation.'],
        exercise: "Filmez-vous en présentant un effet en entier, en plan large. Regardez la vidéo sans le son : votre corps raconte-t-il l'histoire ? Notez chaque geste parasite.",
        quiz: [
          { q: 'Où placer le volontaire ?', options: ['Dos au public', 'À côté de vous, tourné vers le public', 'Au fond de la scène', 'Dans le public uniquement'], answer: 1, explain: "Le public doit voir ses réactions." },
          { q: 'Le « regard dirigé » sert à…', options: ['Hypnotiser', 'Orienter l’attention du public', 'Lire les pensées', 'Mémoriser'], answer: 1, explain: "Le public regarde là où vous regardez." },
          { q: 'Quelle respiration aide à gérer le trac ?', options: ['Rapide et courte', 'Expiration plus longue que l’inspiration', 'Bloquer sa respiration', 'Respirer par la bouche très vite'], answer: 1, explain: "Une expiration longue active le système parasympathique et calme." },
        ],
      },
    ],
  },
  {
    id: 'm16',
    level: 3,
    title: 'Prédictions et tests du livre',
    icon: '📜',
    summary: 'Prouver qu’on savait avant : l’architecture des prédictions et des tests du livre.',
    lessons: [
      {
        id: 'm16l1',
        title: "L'architecture d'une prédiction",
        duration: 18,
        content: `
<p>Une prédiction est l'effet mental le plus <strong>démonstratif</strong> : la preuve existe avant l'événement. Toutes les prédictions reposent sur une ou plusieurs de ces familles de méthodes :</p>
<ol>
<li><strong>Le résultat est contrôlé</strong> : forçage (vous savez à l'avance ce qui sera choisi).</li>
<li><strong>La prédiction est écrite après</strong> : écriture secrète, substitution d'enveloppe, coup d'avance.</li>
<li><strong>La prédiction couvre plusieurs résultats</strong> : sorties multiples (différentes cachettes, différentes lectures d'un même texte).</li>
<li><strong>La prédiction est ambiguë</strong> : un dessin ou un texte qui « colle » à plusieurs résultats, interprété avec assurance.</li>
</ol>
<h3>Les règles de la prédiction forte</h3>
<ul>
<li><strong>Visible tôt</strong> : l'enveloppe est posée en évidence, ou confiée à un spectateur, dès le début.</li>
<li><strong>Jamais touchée ensuite</strong> en apparence : la condition qui fait l'impossible.</li>
<li><strong>Révélation théâtrale</strong> : lue par un spectateur, à voix haute, lentement.</li>
<li><strong>Plusieurs couches</strong> : prédire non seulement la carte, mais aussi le nombre de cartes du paquet, la couleur du stylo utilisé, etc. Chaque couche peut utiliser une méthode différente.</li>
</ul>
<h3>Les grands formats</h3>
<p>La prédiction de la une d'un journal (classique de la promotion, présentée par Annemann puis par beaucoup d'autres), la prédiction confiée à une personnalité locale des jours avant le spectacle, la prédiction du final qui « résume » tout le spectacle.</p>
<div class="callout">🧩 La meilleure prédiction est celle dont le public peut raconter les conditions en une phrase : « Elle était dans une enveloppe scellée sur la table depuis le début. »</div>`,
        keyPoints: ['4 familles : résultat contrôlé, écrite après, sorties multiples, ambiguïté.', 'Visible tôt, jamais touchée en apparence.', 'Multiplier les couches de prédiction.'],
        exercise: "Concevez une prédiction en 3 couches avec les méthodes déjà apprises (par exemple : forçage du 37, coup d'avance, carte forcée). Écrivez la procédure et la révélation.",
        quiz: [
          { q: 'Une prédiction « à sorties multiples »…', options: ['Est écrite après', 'Prévoit plusieurs révélations possibles cachées', 'Nécessite un complice', 'Est toujours ambiguë'], answer: 1, explain: "Seule la bonne sortie est montrée." },
          { q: "Quelle condition rend une prédiction impressionnante ?", options: ['Elle est révélée tout de suite', 'Elle est visible tôt et semble jamais touchée', 'Elle est très longue', 'Elle est écrite au tableau'], answer: 1, explain: "C'est la condition que le public retiendra." },
          { q: 'Pourquoi ajouter plusieurs couches à une prédiction ?', options: ['Pour remplir le temps', 'Chaque couche renforce l’impossible et brouille les méthodes', 'C’est obligatoire', 'Pour la rendre plus facile'], answer: 1, explain: "Une seule méthode ne peut pas tout expliquer." },
        ],
      },
      {
        id: 'm16l2',
        title: 'Les tests du livre',
        duration: 16,
        content: `
<p>Le <strong>test du livre</strong> (<em>book test</em>, <em>Buchtest</em>, <em>prueba del libro</em>) est un pilier du mentalisme : un spectateur choisit un mot dans un livre, vous le révélez.</p>
<h3>Les familles de méthodes</h3>
<table>
<tr><th>Famille</th><th>Principe</th><th>Forces / faiblesses</th></tr>
<tr><td>Forçage du nombre</td><td>Le numéro de page vient d'un principe mathématique (1089) ou d'un forçage</td><td>Livre ordinaire, mais procédure parfois longue</td></tr>
<tr><td>Livres préparés</td><td>Livres imprimés spécialement (vendus dans le commerce magique)</td><td>Libre choix apparent très fort ; le livre ne peut pas être examiné en détail</td></tr>
<tr><td>Coup d'œil</td><td>Vous apercevez le mot ou la page</td><td>Très libre, demande du culot et un timing parfait</td></tr>
<tr><td>Mémoire</td><td>Vous avez mémorisé des passages (par exemple le premier mot de chaque page)</td><td>Livre totalement normal ; énorme travail de mémoire</td></tr>
<tr><td>Lecture à froid</td><td>Révéler des impressions (« un lieu… avec de l'eau ») et affiner</td><td>Très crédible si bien joué, à combiner</td></tr>
</table>
<h3>La révélation</h3>
<p>Ne dites jamais le mot d'un coup. Révélez d'abord des <strong>impressions</strong> (« Je vois quelque chose de froid... »), puis des lettres, puis le mot entier. Cela donne l'impression d'une vraie lecture, et permet d'utiliser la lecture à froid pour confirmer.</p>
<div class="callout">📚 Exercice d'expert : mémorisez le premier mot de chaque page paire d'un petit livre de poche de 60 pages, avec le Système Majeur. Vous aurez un test du livre sans aucun accessoire truqué.</div>`,
        keyPoints: ['5 familles : forçage, livres préparés, coup d’œil, mémoire, lecture à froid.', 'Révélation progressive : impressions → lettres → mot.', 'La mémoire permet un test du livre avec un livre ordinaire.'],
        exercise: "Préparez un test du livre avec le 1089 (page 108, ligne 9) dans un livre de votre bibliothèque. Écrivez une révélation progressive en 4 étapes.",
        quiz: [
          { q: 'Quelle méthode permet d’utiliser un livre totalement ordinaire sans calcul ?', options: ['Livre préparé', 'Mémoire', 'Aucun', 'Écriture secrète'], answer: 1, explain: "La mémoire des mots clés du livre." },
          { q: 'Comment révéler le mot ?', options: ['D’un coup, vite', 'Progressivement : impressions, lettres, mot', 'En le lisant dans le livre', 'Par écrit uniquement'], answer: 1, explain: "La progression crée le drame et permet d'ajuster." },
        ],
      },
    ],
  },
  {
    id: 'm17',
    level: 3,
    title: 'Mentalisme impromptu et close-up',
    icon: '☕',
    summary: 'Être prêt partout : objets empruntés, téléphone, papier et stylo.',
    lessons: [
      {
        id: 'm17l1',
        title: 'Le kit invisible du mentaliste',
        duration: 15,
        content: `
<p>Le mentalisme <strong>impromptu</strong> (au café, en soirée, en rendez-vous professionnel) est souvent plus marquant que sur scène : pas de matériel, pas de scène, donc « pas de truc » aux yeux des gens.</p>
<h3>Ce que vous avez toujours sur vous</h3>
<ul>
<li><strong>Votre mémoire</strong> : Système Majeur, palais, calendrier, carré magique, racines cubiques. Vous êtes votre propre accessoire.</li>
<li><strong>Des principes</strong> : équivoque, forçages psychologiques, 1089, racine numérique, coup d'avance.</li>
<li><strong>Un stylo et quelques cartes de visite</strong> : billets, prédictions, dessins.</li>
<li><strong>Le téléphone du spectateur</strong> : calculatrice (principes mathématiques), répertoire (forçages psychologiques de prénom), photos (lecture à froid).</li>
</ul>
<h3>Une routine impromptue type (5 minutes)</h3>
<ol>
<li><strong>Accroche</strong> : « Vous voulez voir une expérience bizarre ? Ça prend deux minutes. »</li>
<li><strong>Effet 1 – influence</strong> : forçage psychologique du 37, avec sortie sur le 35.</li>
<li><strong>Effet 2 – prouesse</strong> : calendrier mental sur sa date de naissance.</li>
<li><strong>Effet 3 – lecture</strong> : courte lecture de personnalité positive (Barnum + observation).</li>
<li><strong>Sortie</strong> : s'arrêter quand l'attention est maximale. Toujours laisser les gens en vouloir plus.</li>
</ol>
<div class="callout warn">⚠️ Demandez toujours l'accord, respectez le refus, et n'interrompez pas un moment privé. L'impromptu réussi est celui qui fait plaisir à tout le monde.</div>`,
        keyPoints: ['Le mentaliste est son propre accessoire.', 'Téléphone, stylo, cartes de visite suffisent.', 'Routine courte, s’arrêter au sommet.'],
        exercise: "Construisez votre routine impromptue de 5 minutes avec 3 effets de familles différentes. Présentez-la à 3 personnes différentes cette semaine et notez les réactions dans le journal.",
        quiz: [
          { q: 'Pourquoi l’impromptu impressionne-t-il autant ?', options: ['Il est plus long', 'Sans matériel visible, les gens excluent l’idée de truc', 'Il est plus facile', 'Il se fait toujours dans le noir'], answer: 1, explain: "« Il n'avait rien préparé... »" },
          { q: 'Quand arrêter une routine impromptue ?', options: ['Quand les gens s’ennuient', 'Au sommet de l’attention', 'Après 30 minutes', 'Jamais'], answer: 1, explain: "Laissez-les en vouloir plus." },
        ],
      },
      {
        id: 'm17l2',
        title: 'Lire et adapter en temps réel',
        duration: 14,
        content: `
<p>En close-up, vous êtes à 50 cm des spectateurs. Tout se voit, mais <strong>vous voyez tout aussi</strong>.</p>
<h3>Les ajustements en direct</h3>
<ul>
<li><strong>Choisir son spectateur</strong> : la personne la plus enthousiaste pour l'ouverture, la plus sceptique pour la fin (quand vous êtes sûr de votre effet).</li>
<li><strong>Repérer le « sceptique bruyant »</strong> : impliquez-le comme témoin des conditions plutôt que comme volontaire principal. Il devient votre meilleur allié.</li>
<li><strong>Lire le groupe</strong> : si les gens se regardent ou regardent leur téléphone, raccourcissez. Si l'un d'eux se penche en avant, choisissez-le.</li>
<li><strong>Gérer l'échec</strong> : présentez l'expérience comme un <em>test</em> (« Ça marche environ 8 fois sur 10 »). Un échec devient crédible, et la réussite suivante plus forte.</li>
</ul>
<h3>Les angles</h3>
<p>Assis à une table, le danger vient des côtés et de derrière. Placez-vous dos à un mur ou face au groupe. Pour les coups d'œil, gardez les spectateurs en arc de cercle devant vous.</p>`,
        keyPoints: ['Enthousiaste au début, sceptique à la fin.', 'Faire du sceptique un témoin.', 'Annoncer un taux de réussite rend l’échec crédible.'],
        exercise: "Lors de votre prochaine présentation, notez avant de commencer qui vous choisirez pour chaque effet et pourquoi. Après coup, évaluez vos choix.",
        quiz: [
          { q: 'Que faire du sceptique bruyant ?', options: ['L’ignorer', 'En faire le témoin des conditions', 'Le choisir en premier', 'Arrêter le spectacle'], answer: 1, explain: "Il garantit l'honnêteté aux yeux des autres." },
          { q: 'Annoncer « ça marche 8 fois sur 10 » permet…', options: ['De mentir', 'De rendre un échec crédible et la réussite plus forte', 'D’impressionner', 'De gagner du temps'], answer: 1, explain: "Le cadre expérimental protège le mentaliste." },
        ],
      },
    ],
  },
  {
    id: 'm18',
    level: 4,
    title: 'Transmission de pensée à deux',
    icon: '👥',
    summary: 'Les numéros de « seconde vue » : codes, systèmes et entraînement en duo.',
    lessons: [
      {
        id: 'm18l1',
        title: 'Histoire et principes des codes',
        duration: 16,
        content: `
<p>Le numéro à deux (<em>two-person telepathy</em>, <em>Gedankenübertragung</em>, <em>transmisión de pensamiento</em>) : un partenaire, les yeux bandés, « reçoit » ce que le public montre à l'autre.</p>
<h3>Une histoire riche</h3>
<ul>
<li><strong>Robert-Houdin</strong> et son fils (France, années 1840) : la seconde vue codée par la parole.</li>
<li><strong>Les Zancig</strong> (Danemark/États-Unis, début XXe) : des codes si fins que des enquêteurs ne les ont jamais percés en public.</li>
<li><strong>Les Piddington</strong> (Australie) : en 1949, Sydney et Lesley Piddington captivent la Grande-Bretagne avec une série d'émissions de radio sur la BBC, même lorsque Lesley est dans un autre studio. Le secret n'a jamais été révélé officiellement.</li>
</ul>
<h3>Les familles de codes</h3>
<ol>
<li><strong>Codes verbaux</strong> : le premier mot (ou la première lettre) de la question code l'information. « <em>Regardez</em>, qu'est-ce que c'est ? » = objet n°1 ; « <em>Dites</em>-moi... » = objet n°2.</li>
<li><strong>Codes silencieux</strong> : comptage du temps entre deux signaux, position, rythme.</li>
<li><strong>Codes combinés</strong> : une première question donne la catégorie (bijou, papier, vêtement), la suivante précise l'objet ou le nombre.</li>
<li><strong>Méthodes techniques modernes</strong> : dispositifs électroniques. Puissants, mais ils remplacent le travail d'équipe qui fait la beauté du numéro.</li>
</ol>
<div class="callout">👥 Un bon code ne s'entend pas, car il ressemble à une conversation normale. Variez les formulations et ne répétez jamais deux fois la même phrase à l'identique.</div>`,
        keyPoints: ['Robert-Houdin, Zancig, Piddington : une tradition internationale.', 'Codes verbaux, silencieux, combinés.', 'Le code doit sonner comme une conversation naturelle.'],
        exercise: "Avec un partenaire, créez un code verbal de 10 mots-clés pour les 10 objets les plus courants dans un public (montre, téléphone, clé, bague, stylo, lunettes, billet, carte bancaire, briquet, mouchoir). Entraînez-vous avec l'outil Codes de seconde vue.",
        quiz: [
          { q: 'Quel duo a stupéfié la BBC en 1949 ?', options: ['Les Zancig', 'Les Piddington', 'Penn et Teller', 'Les Bogdanoff'], answer: 1, explain: "Sydney et Lesley Piddington." },
          { q: 'Dans un code verbal, qu’est-ce qui transmet souvent l’information ?', options: ['Le ton', 'Le premier mot de la question', 'Le prénom du spectateur', 'La couleur des vêtements'], answer: 1, explain: "Le mot d'appel est associé à un numéro ou un objet." },
        ],
      },
      {
        id: 'm18l2',
        title: 'Construire et entraîner un système',
        duration: 18,
        content: `
<h3>Construire le système</h3>
<ol>
<li><strong>Les chiffres de 0 à 9</strong> : associez 10 mots d'ouverture (« Alors », « Bien », « Concentrez-vous », « Dites », etc.). Pour un nombre à deux chiffres, deux phrases consécutives.</li>
<li><strong>Les catégories</strong> : 10 catégories d'objets, codées par le même système.</li>
<li><strong>Les objets</strong> : dans chaque catégorie, 10 objets numérotés. Un objet = deux chiffres = deux phrases.</li>
<li><strong>Les compléments</strong> : couleur, matière, nombre, lettre... chacun avec sa liste.</li>
</ol>
<h3>L'entraînement en duo</h3>
<ul>
<li>Semaines 1-2 : apprendre les listes, chacun de son côté, avec des fiches.</li>
<li>Semaines 3-4 : sessions de 15 minutes, l'un « envoie », l'autre « reçoit », sans public.</li>
<li>Semaines 5-6 : avec des amis comme public, en variant les formulations.</li>
<li>Ensuite : répéter jusqu'à ce que la réponse sorte en moins de 3 secondes, sans réfléchir.</li>
</ul>
<h3>La présentation</h3>
<p>Le receveur ne doit pas répondre trop vite : ralentissez volontairement, hésitez, donnez d'abord une impression (« c'est métallique... »). Comme pour le test du livre, la révélation progressive vend l'illusion.</p>`,
        keyPoints: ['Système numérique : chiffres → catégories → objets → compléments.', 'Entraînement progressif sur plusieurs semaines.', 'Le receveur doit hésiter volontairement.'],
        exercise: "Atteignez 90 % de réussite dans l'outil Codes de seconde vue, puis entraînez-vous 15 minutes avec un partenaire réel.",
        quiz: [
          { q: 'Comment coder un objet avec un système à deux chiffres ?', options: ['Avec un geste', 'Avec deux phrases consécutives', 'Avec un mot de passe', 'En l’épelant'], answer: 1, explain: "Chaque phrase d'ouverture code un chiffre." },
          { q: 'Pourquoi le receveur doit-il hésiter ?', options: ['Parce qu’il ne sait pas', 'Pour que la réception paraisse mentale et non mécanique', 'Pour gagner du temps', 'Par politesse'], answer: 1, explain: "Une réponse trop rapide sonne comme un code." },
        ],
      },
    ],
  },
  {
    id: 'm19',
    level: 4,
    title: 'Psychokinèse et effets physiques',
    icon: '🥄',
    summary: 'Cuillères, pendules, objets qui bougent : l’illusion de l’esprit sur la matière.',
    lessons: [
      {
        id: 'm19l1',
        title: 'Le pliage de métal',
        duration: 16,
        content: `
<p>Le pliage de cuillère a été rendu célèbre dans les années 1970 par <strong>Uri Geller</strong>, qui prétendait à de vrais pouvoirs. En 1973, dans le <em>Tonight Show</em> de Johnny Carson, conseillé par James Randi, l'équipe prépare elle-même les objets : Geller ne parvient à rien. Depuis, de nombreux magiciens reproduisent ces effets en expliquant qu'il s'agit d'illusions.</p>
<h3>Les principes (sans secret de fabrication)</h3>
<ul>
<li><strong>La force cachée</strong> : une pression appliquée à un moment où personne ne regarde, souvent pendant un temps faible, avec la main qui masque le métal.</li>
<li><strong>Le pli progressif</strong> : la cuillère déjà légèrement pliée est tenue de manière à cacher le pli, puis « révélée » lentement par rotation : l'œil croit voir le métal se plier.</li>
<li><strong>Le pré-pliage</strong> : un objet préparé avant l'effet.</li>
<li><strong>La suggestion</strong> : « Elle continue de se plier… regardez » : de nombreux témoins finissent par croire voir le mouvement.</li>
</ul>
<p>Une étude de <strong>Richard Wiseman et Emma Greening</strong> (2005) l'a montré : après avoir vu une vidéo de pliage de clé, les participants qui entendaient le « médium » suggérer que la clé continuait de se plier étaient bien plus nombreux à rapporter qu'elle continuait de bouger.</p>
<div class="callout">🥄 Le pliage le plus fort est celui qui finit <strong>dans la main du spectateur</strong> : c'est lui qui « sent » le métal se ramollir.</div>`,
        keyPoints: ['Geller échoue en 1973 avec des objets contrôlés.', 'Force cachée, pli progressif, pré-pliage, suggestion.', 'La suggestion verbale fait « voir » le métal bouger (Wiseman & Greening, 2005).'],
        exercise: "Étudiez une vidéo de pliage de cuillère au ralenti. Identifiez les moments où la main cache le métal et les phrases de suggestion utilisées.",
        quiz: [
          { q: 'Que s’est-il passé dans le Tonight Show en 1973 ?', options: ['Geller a plié 10 cuillères', 'Avec des objets contrôlés, Geller n’a rien réussi', 'Carson a plié une cuillère', 'Randi a été hypnotisé'], answer: 1, explain: "Randi avait conseillé l'équipe pour contrôler les objets." },
          { q: 'Que montre l’étude de Wiseman et Greening ?', options: ['La psychokinèse existe', 'La suggestion verbale fait percevoir un mouvement qui n’existe pas', 'Les clés sont fragiles', 'Rien'], answer: 1, explain: "Les témoins rapportent ce qu'on leur suggère." },
        ],
      },
      {
        id: 'm19l2',
        title: 'Pendules, boussoles et objets animés',
        duration: 12,
        content: `
<p>Les effets de « psychokinèse » légère sont parfaits pour le close-up, car ils impliquent physiquement le spectateur.</p>
<ul>
<li><strong>Le pendule entre les mains du spectateur</strong> : grâce à l'effet idéomoteur, le pendule répond « oui » ou « non » à ses propres pensées. Présenté honnêtement, c'est une démonstration fascinante du pouvoir de l'inconscient.</li>
<li><strong>Les objets qui roulent ou tournent</strong> : souffle discret, électricité statique (une paille frottée sur un vêtement attire une canette vide), aimants cachés.</li>
<li><strong>La boussole déviée</strong> : un petit aimant dissimulé fait tourner l'aiguille.</li>
</ul>
<h3>La présentation</h3>
<p>Ces effets sont visuellement petits. Leur force vient de la <strong>tension</strong> : le silence, la concentration, la lenteur. Un objet qui bouge d'un centimètre dans un silence total vaut plus qu'une lévitation mal présentée.</p>
<div class="callout warn">⚖️ Rappel éthique : la psychokinèse est le domaine où les escrocs ont le plus prétendu à de vrais pouvoirs. Restez dans le cadre du spectacle.</div>`,
        keyPoints: ['Pendule : l’inconscient du spectateur répond.', 'Électricité statique, souffle, aimants.', 'Petits effets, grande tension dramatique.'],
        exercise: "Faites l'expérience de la paille électrisée avec une canette vide. Créez une présentation de 1 minute autour de cet effet, avec un silence d'au moins 5 secondes.",
        quiz: [
          { q: 'Pourquoi le pendule bouge-t-il dans la main du spectateur ?', options: ['Par télépathie', 'Par effet idéomoteur', 'Par magnétisme', 'À cause du vent'], answer: 1, explain: "Ses micro-mouvements inconscients suivent sa pensée." },
          { q: 'D’où vient la force d’un petit effet physique ?', options: ['De sa taille', 'De la tension, du silence et de la lenteur', 'De la musique', 'Du prix de l’accessoire'], answer: 1, explain: "La dramaturgie fait l'effet." },
        ],
      },
    ],
  },
  {
    id: 'm20',
    level: 5,
    title: 'Devenir professionnel',
    icon: '💼',
    summary: 'Du hobby au métier : marchés, tarifs, communication et gestion des imprévus.',
    lessons: [
      {
        id: 'm20l1',
        title: 'Les marchés du mentalisme',
        duration: 15,
        content: `
<h3>Où travaillent les mentalistes ?</h3>
<table>
<tr><th>Marché</th><th>Format</th><th>Ce qui compte</th></tr>
<tr><td>Événements d'entreprise</td><td>Close-up en cocktail, numéro de 20-30 min en soirée</td><td>Élégance, humour fédérateur, aucun malaise</td></tr>
<tr><td>Mariages et réceptions privées</td><td>Close-up, ambiance</td><td>Effets courts, émotionnels, adaptés à tous les âges</td></tr>
<tr><td>Théâtres et festivals</td><td>Spectacle de 60-90 min</td><td>Univers fort, dramaturgie, mise en scène</td></tr>
<tr><td>Conférences et formations</td><td>« Le pouvoir de l'attention », « les biais cognitifs »</td><td>Contenu solide, effets comme illustrations</td></tr>
<tr><td>Médias et réseaux sociaux</td><td>Vidéos, émissions</td><td>Effets visuels, courts, régularité</td></tr>
</table>
<h3>Construire son offre</h3>
<ul>
<li>Un <strong>numéro signature</strong> de 20 minutes, rodé à la perfection, vaut mieux que 3 heures de matériel moyen.</li>
<li>Une <strong>vidéo de démonstration</strong> de 2 minutes avec de vraies réactions.</li>
<li>Des <strong>témoignages</strong> et des photos d'événements.</li>
<li>Un <strong>tarif</strong> cohérent avec le marché local : renseignez-vous auprès des clubs et des agences.</li>
</ul>
<h3>Aspects pratiques</h3>
<p>Selon votre pays : statut juridique pour facturer, assurance responsabilité civile professionnelle, contrats écrits (durée, horaires, conditions techniques, annulation), droits d'auteur pour la musique utilisée.</p>`,
        keyPoints: ['Entreprise, privé, théâtre, conférence, médias.', 'Un numéro signature rodé, une démo vidéo, des témoignages.', 'Statut, assurance, contrats.'],
        exercise: "Rédigez la description de votre numéro signature en 5 lignes (comme pour un site web) et la liste des effets qu'il contient.",
        quiz: [
          { q: 'Que vaut-il mieux avoir pour débuter professionnellement ?', options: ['3 heures de matériel moyen', 'Un numéro de 20 minutes parfaitement rodé', 'Le plus d’accessoires possible', 'Un costume cher'], answer: 1, explain: "La qualité prime sur la quantité." },
          { q: 'Que doit contenir un contrat de prestation ?', options: ['Rien, un accord oral suffit', 'Durée, horaires, conditions techniques, annulation', 'Les secrets des effets', 'Le nom des spectateurs'], answer: 1, explain: "Un contrat clair protège les deux parties." },
        ],
      },
      {
        id: 'm20l2',
        title: 'Les imprévus et les perturbateurs',
        duration: 14,
        content: `
<h3>Les situations classiques</h3>
<ul>
<li><strong>Le volontaire qui ment</strong> (« Ce n'est pas ma carte ») : restez souriant, demandez-lui de montrer à ses voisins ce qu'il a écrit ou choisi. Les méthodes avec <em>trace écrite</em> vous protègent.</li>
<li><strong>Le perturbateur</strong> (<em>heckler</em>) : ne l'affrontez jamais avec agressivité. L'humour bienveillant, puis l'ignorer, puis s'appuyer sur le reste du public. Le public est de votre côté tant que vous restez élégant.</li>
<li><strong>« C'est un complice ! »</strong> : choisissez des volontaires connus du groupe, lancez une balle ou un frisbee pour un choix aléatoire, faites confirmer par l'entourage.</li>
<li><strong>L'échec</strong> : passez à la sortie prévue, ou transformez-le en réussite partielle. En dernier recours, assumez avec humour (« Les expériences ne réussissent pas à tous les coups, sinon ce ne serait pas une expérience ») et enchaînez sur un effet sûr.</li>
<li><strong>La question « Vous avez vraiment des pouvoirs ? »</strong> : préparez votre réponse à l'avance, cohérente avec votre éthique et votre personnage.</li>
</ul>
<h3>La règle des trois effets sûrs</h3>
<p>Ayez toujours sur vous trois effets fiables à 100 % (mémoire, calcul, principe mathématique) pour rebondir après un incident.</p>`,
        keyPoints: ['Traces écrites contre les menteurs.', 'Humour bienveillant face aux perturbateurs.', 'Toujours trois effets sûrs en réserve.'],
        exercise: "Écrivez votre réponse (2 phrases) à « Vous avez vraiment des pouvoirs ? », et la phrase que vous direz en cas d'échec.",
        quiz: [
          { q: 'Comment se protéger d’un volontaire qui ment ?', options: ['En le grondant', 'Avec des méthodes qui laissent une trace écrite', 'En arrêtant le spectacle', 'En devinant autre chose'], answer: 1, explain: "La trace écrite fait foi." },
          { q: 'Face à un perturbateur, il faut…', options: ['L’humilier', 'Rester élégant, utiliser l’humour, s’appuyer sur le public', 'Quitter la scène', 'Crier plus fort'], answer: 1, explain: "Le public soutient l'artiste élégant." },
        ],
      },
    ],
  },
];
