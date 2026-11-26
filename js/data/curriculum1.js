// Niveaux 1 et 2 : Fondations et Psychologie/Observation
export const part1 = [
  {
    id: 'm1',
    level: 1,
    title: 'Culture et éthique du mentaliste',
    icon: '🎩',
    summary: "D'où vient votre art, ses grandes familles d'effets et les règles à ne jamais transgresser.",
    lessons: [
      {
        id: 'm1l1',
        title: 'Définition et histoire',
        duration: 12,
        content: `
<p>Le <strong>mentalisme</strong> est un art du spectacle qui donne l'illusion de capacités mentales extraordinaires : lire les pensées, prédire l'avenir, influencer des choix, mémoriser l'impossible. Contrairement à la magie classique (faire apparaître une colombe), le mentaliste agit sur l'<em>esprit</em> : informations, décisions, souvenirs.</p>
<p>Il n'y a <strong>aucun pouvoir surnaturel</strong>. Le mentaliste combine des méthodes de prestidigitation, des principes mathématiques, de la psychologie, de l'observation, des techniques de mémoire et, surtout, une présentation théâtrale.</p>
<h3>Une histoire internationale</h3>
<ul>
  <li><strong>XVIIIe – XIXe siècle (Europe)</strong> : les numéros de « seconde vue ». En France, <strong>Jean-Eugène Robert-Houdin</strong> présente vers 1846 un numéro de seconde vue avec son fils, qui « devine » les objets du public grâce à un code verbal.</li>
  <li><strong>Fin XIXe (États-Unis/Royaume-Uni)</strong> : <strong>Washington Irving Bishop</strong> et <strong>Stuart Cumberland</strong> popularisent la « lecture de pensée » par contact (lecture musculaire).</li>
  <li><strong>Début XXe</strong> : le couple danois <strong>Julius et Agnes Zancig</strong> (« Two Minds with but a Single Thought ») perfectionne les codes de transmission.</li>
  <li><strong>Années 1930–1950</strong> : <strong>Theodore Annemann</strong> (États-Unis) publie le magazine <em>The Jinx</em> et <em>Practical Mental Effects</em> ; <strong>Joseph Dunninger</strong> devient une star de la radio et de la télévision.</li>
  <li><strong>1968</strong> : <strong>Tony Corinda</strong> (Royaume-Uni) publie <em>13 Steps to Mentalism</em>, encore considéré comme la « bible » du débutant.</li>
  <li><strong>Années 1970–1990</strong> : <strong>Kreskin</strong> à la télévision ; <strong>Max Maven</strong> renouvelle la théorie et la création d'effets ; <strong>Banachek</strong> participe au célèbre <em>Projet Alpha</em> (voir le module Expert).</li>
  <li><strong>Années 2000 à aujourd'hui</strong> : <strong>Derren Brown</strong> (Royaume-Uni) mêle psychologie, scepticisme et théâtre ; en Allemagne <strong>Thorsten Havener</strong>, en Espagne <strong>Anthony Blake</strong>, en France <strong>Viktor Vincent</strong> et <strong>Fabien Olicard</strong> rendent le mentalisme populaire.</li>
</ul>
<div class="callout">💡 Retenez la formule souvent attribuée aux grands du métier : <em>le public ne se souvient pas de la méthode, il se souvient de ce qu'il a ressenti.</em></div>`,
        keyPoints: [
          'Le mentalisme est un art du spectacle, pas un pouvoir.',
          'Ses racines sont européennes (seconde vue) puis anglo-saxonnes (Annemann, Corinda, Dunninger).',
          'Les grands noms actuels viennent de nombreux pays : Royaume-Uni, France, Allemagne, Espagne, États-Unis.',
        ],
        exercise: "Regardez un extrait d'un spectacle de mentalisme (Derren Brown, Viktor Vincent, Banachek...). Notez : 1) l'effet tel que le public le perçoit, 2) trois hypothèses de méthode, 3) ce qui rend la présentation forte.",
        quiz: [
          { q: "Quel Français présente un célèbre numéro de « seconde vue » au XIXe siècle ?", options: ['Robert-Houdin', 'Georges Méliès', 'Gérard Majax', 'Alexandre Dumas'], answer: 0, explain: "Jean-Eugène Robert-Houdin présentait la seconde vue avec son fils, grâce à un code secret." },
          { q: "Quel livre de 1968 est surnommé la « bible » du mentalisme débutant ?", options: ['Practical Mental Effects', '13 Steps to Mentalism', 'Tricks of the Mind', 'Psychological Subtleties'], answer: 1, explain: "13 Steps to Mentalism de Tony Corinda." },
          { q: "Le mentalisme repose sur…", options: ['des pouvoirs psychiques rares', 'un mélange de méthodes secrètes, de psychologie et de mise en scène', 'uniquement la lecture du langage corporel', "uniquement l'hypnose"], answer: 1, explain: "Aucune méthode unique : c'est la combinaison et la présentation qui créent le miracle." },
        ],
      },
      {
        id: 'm1l2',
        title: 'Les grandes familles d’effets et les piliers',
        duration: 10,
        content: `
<p>Avant d'apprendre des méthodes, il faut connaître les <strong>effets</strong> : ce que le public croit voir. Une classification utile :</p>
<table>
<tr><th>Famille</th><th>Exemple d'effet</th></tr>
<tr><td>Télépathie</td><td>Deviner un mot pensé par un spectateur</td></tr>
<tr><td>Prédiction / précognition</td><td>Une enveloppe scellée contient la une du journal de demain</td></tr>
<tr><td>Influence</td><td>Faire choisir un objet précis « librement »</td></tr>
<tr><td>Clairvoyance</td><td>Décrire le contenu d'une boîte fermée</td></tr>
<tr><td>Lecture de personnalité</td><td>Décrire la vie d'un inconnu</td></tr>
<tr><td>Psychokinèse</td><td>Faire bouger un pendule, plier une cuillère</td></tr>
<tr><td>Prouesses mentales</td><td>Mémoriser un jeu de cartes, calcul de calendrier</td></tr>
</table>
<h3>Les cinq piliers de la méthode</h3>
<ol>
<li><strong>Principes secrets</strong> : forçages, coup d'avance, accessoires truqués, mathématiques.</li>
<li><strong>Psychologie</strong> : suggestion, biais cognitifs, attentes, influence.</li>
<li><strong>Observation</strong> : langage corporel, indices, déductions.</li>
<li><strong>Mémoire et calcul</strong> : vraies compétences entraînées.</li>
<li><strong>Présentation</strong> : script, personnage, rythme, émotion. C'est le pilier qui transforme un « truc » en miracle.</li>
</ol>
<div class="callout">🔑 Règle d'or : les meilleurs mentalistes <strong>superposent</strong> plusieurs piliers. Le public pense « psychologie » alors que la méthode est un principe secret, et inversement.</div>`,
        keyPoints: ["Distinguer l'effet (perçu) de la méthode (cachée).", '5 piliers : principes, psychologie, observation, mémoire/calcul, présentation.', 'Superposer les méthodes rend un effet impénétrable.'],
        exercise: "Pour chaque famille d'effets du tableau, imaginez un effet que VOUS aimeriez présenter un jour. Écrivez-le en une phrase, du point de vue du spectateur.",
        quiz: [
          { q: "Plier une cuillère « par la pensée » appartient à quelle famille ?", options: ['Télépathie', 'Psychokinèse', 'Prédiction', 'Lecture de personnalité'], answer: 1, explain: "La psychokinèse regroupe les effets d'action sur la matière." },
          { q: "Quel pilier transforme un simple truc en miracle ?", options: ['Les mathématiques', 'La présentation', 'Les accessoires', 'La mémoire'], answer: 1, explain: "Sans présentation, un effet reste une devinette." },
          { q: "Pourquoi superposer plusieurs méthodes ?", options: ['Pour que ce soit plus long', "Pour que le public ne puisse pas reconstituer la vraie méthode", 'Parce que c’est obligatoire', 'Pour éviter de répéter'], answer: 1, explain: "Chaque hypothèse du spectateur est contredite par une autre couche." },
        ],
      },
      {
        id: 'm1l3',
        title: 'Éthique du mentaliste',
        duration: 10,
        content: `
<p>Le mentalisme touche aux croyances des gens. Il a donc une responsabilité particulière. Historiquement, les mêmes techniques (lecture à froid, informations récoltées en amont) ont été utilisées par de <strong>faux médiums</strong> pour escroquer des personnes en deuil.</p>
<h3>Les positions possibles</h3>
<ul>
<li><strong>Le divertisseur clair</strong> : « Je n'ai aucun pouvoir, je combine psychologie et illusion. » (Position de Derren Brown, Banachek et beaucoup d'autres.)</li>
<li><strong>Le personnage ambigu</strong> : le mentaliste joue un rôle sans jamais affirmer de vrai pouvoir, comme un acteur.</li>
<li><strong>Le prétendu « vrai voyant »</strong> : affirmer de vrais pouvoirs, surtout contre rémunération en séance privée. C'est la ligne rouge : manipulation, voire escroquerie.</li>
</ul>
<h3>La charte de cette application</h3>
<ol>
<li>Je ne prétends jamais posséder de pouvoirs surnaturels en dehors d'un cadre de spectacle clair.</li>
<li>Je n'exploite jamais le deuil, la maladie, la peur ou la détresse d'une personne.</li>
<li>Je ne donne jamais de conseils médicaux, financiers ou juridiques sous couvert de « lecture ».</li>
<li>Je respecte la dignité des volontaires : jamais d'humiliation, toujours un retour valorisant.</li>
<li>Je n'utilise pas les techniques d'influence pour manipuler dans la vie privée ou professionnelle.</li>
<li>Je protège les secrets du métier, mais je n'hésite pas à démystifier les escrocs.</li>
</ol>
<div class="callout warn">⚠️ Le psychologue <strong>Ray Hyman</strong> raconte qu'en lisant les lignes de la main pour gagner de l'argent, il a fini par croire lui-même à ses lectures, tant les gens les confirmaient. C'est la preuve que la lecture à froid fonctionne… même sur celui qui la pratique.</div>`,
        keyPoints: ['Les techniques du mentaliste sont aussi celles des escrocs.', 'Affirmer de vrais pouvoirs pour de l’argent est une ligne rouge.', 'Respect, consentement et bienveillance envers les volontaires.'],
        exercise: "Rédigez votre propre « disclaimer » de spectacle en 2 ou 3 phrases, que vous pourriez dire au début d'une prestation, avec votre style personnel.",
        quiz: [
          { q: "Que raconte l'expérience de Ray Hyman ?", options: ['Il a prouvé la télépathie', 'Il a fini par croire à ses propres lectures de lignes de la main', 'Il a inventé le pendule', 'Il a hypnotisé un stade'], answer: 1, explain: "Les confirmations du public l'avaient convaincu, jusqu'à ce qu'il teste en disant l'inverse des lignes… avec le même succès." },
          { q: "Quelle pratique viole la charte ?", options: ['Faire deviner une carte sur scène', 'Proposer des séances payantes pour « parler aux défunts »', 'Expliquer que ce sont des illusions', 'Présenter une prédiction'], answer: 1, explain: "Exploiter le deuil est la ligne rouge absolue." },
        ],
      },
    ],
  },
  {
    id: 'm2',
    level: 1,
    title: 'Premiers principes secrets',
    icon: '🔮',
    summary: 'Forçages, coup d’avance et principes mathématiques : vos premiers « miracles ».',
    lessons: [
      {
        id: 'm2l1',
        title: 'Le forçage',
        duration: 15,
        content: `
<p><strong>Forcer</strong>, c'est faire choisir au spectateur un élément que vous connaissez à l'avance, tout en lui donnant l'impression d'un choix totalement libre. C'est le principe le plus utilisé du mentalisme.</p>
<h3>1. L'équivoque (le « choix du magicien »)</h3>
<p>En anglais <em>equivoque</em> ou <em>magician's choice</em>. Vous interprétez le choix du spectateur pour qu'il mène toujours au même résultat. Exemple avec 2 objets (A = forcé, B) :</p>
<ul>
<li>« Touchez un objet. » S'il touche A : « Parfait, on garde celui-ci. » S'il touche B : « Très bien, vous éliminez celui-ci, il reste donc A. »</li>
</ul>
<p>La clé : ne jamais annoncer à l'avance ce que signifie le choix, et parler avec assurance.</p>
<h3>2. Le forçage par coupe croisée (<em>cross-cut force</em>)</h3>
<p>La carte à forcer est sur le dessus du paquet. Le spectateur coupe et pose la moitié inférieure en croix sur l'autre. Vous parlez quelques secondes (délai = détournement temporel), puis vous soulevez le paquet du dessus : la carte « à laquelle il a coupé » est… votre carte de départ.</p>
<h3>3. Les forçages psychologiques</h3>
<p>Certains choix sont statistiquement prévisibles (ils <strong>ne marchent pas à 100 %</strong>) :</p>
<ul>
<li>« Un nombre entre 1 et 10 » : le 7 et le 3 sont très fréquents.</li>
<li>« Un nombre à deux chiffres entre 1 et 50, les deux chiffres impairs et différents » : le 37 sort très souvent (puis le 35).</li>
<li>« Une forme géométrique simple, et une autre à l'intérieur » : cercle dans un triangle est fréquent.</li>
</ul>
<div class="callout">🎯 Principe des <strong>sorties</strong> (<em>outs</em>) : un forçage psychologique doit toujours avoir un plan B. Exemple : vous avez écrit « 37 » d'un côté d'une carte et « 35 » ailleurs. Le public ne voit que la réussite.</div>`,
        keyPoints: ["Forcer = contrôler un choix qui paraît libre.", "L'équivoque repose sur l'interprétation et l'assurance.", 'Les forçages psychologiques demandent toujours des sorties.'],
        exercise: "Entraînez l'équivoque avec 3 objets sur une table, 10 fois avec un ami ou un miroir, jusqu'à ce que chaque branche paraisse naturelle. Puis testez « entre 1 et 50, deux chiffres impairs différents » sur 10 personnes et notez les résultats.",
        quiz: [
          { q: "Quel est l'autre nom de l'équivoque ?", options: ['Le coup d’avance', 'Le choix du magicien', 'Le Swami', 'La lecture musculaire'], answer: 1, explain: "Equivoque = magician's choice = choix du magicien." },
          { q: "Dans le forçage par coupe croisée, pourquoi parler avant de révéler ?", options: ['Pour gagner du temps', 'Pour que le spectateur oublie la position réelle des paquets (détournement temporel)', 'Pour hypnotiser', 'Ce n’est pas utile'], answer: 1, explain: "Le délai brouille le souvenir de la procédure." },
          { q: "Un forçage psychologique fonctionne…", options: ['À 100 %', 'Souvent, mais il faut prévoir des sorties', 'Jamais', 'Seulement sous hypnose'], answer: 1, explain: "Ce sont des probabilités, pas des certitudes." },
          { q: "« Entre 1 et 50, deux chiffres impairs et différents » : quelle réponse est la plus fréquente ?", options: ['13', '37', '19', '45'], answer: 1, explain: "Le 37 est la réponse la plus courante, suivi du 35." },
        ],
      },
      {
        id: 'm2l2',
        title: 'Le principe du coup d’avance',
        duration: 12,
        content: `
<p>Le <strong>principe du coup d'avance</strong> (<em>one-ahead principle</em>) est un classique. Vous obtenez une information, mais vous faites croire que vous devinez la suivante. Vous avez toujours une information « d'avance ».</p>
<h3>Exemple avec des billets</h3>
<ol>
<li>Trois spectateurs écrivent chacun une pensée sur un papier, plié et mélangé dans un bol. L'un des billets est en réalité écrit par un complice ou est un billet que vous connaissez (par exemple vous avez forcé son contenu).</li>
<li>Vous prenez un billet sans l'ouvrir, le portez à votre front et « devinez » le billet <strong>connu</strong>.</li>
<li>Vous ouvrez le billet pour « vérifier » : vous lisez en réalité un nouveau contenu, que vous mémorisez en disant « Oui ! »</li>
<li>Vous prenez le billet suivant et annoncez ce que vous venez de lire. Et ainsi de suite.</li>
</ol>
<p>Ce principe est le cœur des numéros historiques de type « questions-réponses » (<em>Q&amp;A act</em>), et sa version comique est le sketch « Carnac le Magnifique » de Johnny Carson.</p>
<div class="callout">🧠 Le dernier billet doit être celui que vous connaissiez dès le début. Préparez l'ordre de vos révélations pour que le plus fort arrive à la fin.</div>`,
        keyPoints: ['Chaque « vérification » vous donne la prochaine information.', 'Il faut un premier élément connu (forcé, complice ou indice).', 'Le principe est discret car le spectateur ne pense pas à la chronologie.'],
        exercise: "Avec 5 papiers que vous écrivez vous-même, pratiquez la routine du coup d'avance devant un miroir jusqu'à pouvoir lire d'un coup d'œil sans hésiter.",
        quiz: [
          { q: "De quoi avez-vous besoin pour démarrer un coup d'avance ?", options: ['De rien', "D'une première information déjà connue", "D'un pendule", "D'un public nombreux"], answer: 1, explain: "Le premier billet « deviné » doit être connu par un autre moyen." },
          { q: "Quel sketch comique repose sur ce principe ?", options: ['Carnac le Magnifique', 'Mr Bean', 'Les Inconnus', 'Kaamelott'], answer: 0, explain: "Johnny Carson parodiait le Q&A act avec Carnac." },
        ],
      },
      {
        id: 'm2l3',
        title: 'Principes mathématiques automatiques',
        duration: 12,
        content: `
<p>Certains effets fonctionnent tout seuls grâce aux mathématiques (<em>self-working</em>). Leur force : zéro manipulation. Leur faiblesse : ils peuvent sembler « scolaires » si la présentation est faible.</p>
<h3>Le 1089</h3>
<ol>
<li>Le spectateur pense à un nombre de 3 chiffres dont le premier et le dernier diffèrent d'au moins 2 (ex. 732).</li>
<li>Il l'inverse (237) et soustrait le plus petit du plus grand : 732 − 237 = 495.</li>
<li>Il inverse le résultat (594) et additionne : 495 + 594 = <strong>1089</strong>. Toujours.</li>
</ol>
<p>Présentation : le résultat sert de numéro de page et de ligne dans un livre (page 108, 9e mot), et votre prédiction est ce mot.</p>
<h3>La racine numérique (principe du 9)</h3>
<p>Prenez un nombre, soustrayez la somme de ses chiffres : le résultat est toujours un multiple de 9. Exemple : 52 − (5+2) = 45. Si le spectateur entoure un chiffre non nul et vous donne les autres, vous retrouvez le chiffre manquant : c'est ce qu'il faut ajouter pour atteindre un multiple de 9.</p>
<div class="callout">🎭 Cachez les maths : demandez une calculatrice au public, parlez d'autre chose, et faites en sorte que le nombre final <em>serve</em> à autre chose (une page, une date, une carte).</div>`,
        keyPoints: ['Le 1089 est un résultat constant.', 'Nombre − somme de ses chiffres = multiple de 9.', 'Masquer les calculs derrière une histoire.'],
        exercise: "Vérifiez le 1089 avec 5 nombres différents. Puis inventez une présentation où 1089 désigne un mot dans votre livre préféré.",
        quiz: [
          { q: "Avec 851, que donne la procédure du 1089 ?", options: ['693', '1089', '1098', '999'], answer: 1, explain: "851 − 158 = 693 ; 693 + 396 = 1089." },
          { q: "Quel est le risque des effets mathématiques ?", options: ['Ils ratent souvent', 'Ils peuvent paraître scolaires', 'Ils sont dangereux', 'Ils nécessitent un complice'], answer: 1, explain: "Le public peut sentir un « tour de calcul » si on ne le masque pas." },
          { q: "Le résultat (multiple de 9) a un chiffre entouré ; les autres chiffres ont pour somme 12. Quel chiffre a été entouré ?", options: ['3', '6', '9', '0'], answer: 1, explain: "Il faut atteindre le multiple de 9 suivant : 18 − 12 = 6." },
        ],
      },
    ],
  },
  {
    id: 'm3',
    level: 1,
    title: 'Bases de la présentation',
    icon: '🎭',
    summary: 'Personnage, script, gestion des volontaires et détournement d’attention.',
    lessons: [
      {
        id: 'm3l1',
        title: 'Personnage et script',
        duration: 12,
        content: `
<p>Votre <strong>personnage</strong> (<em>persona</em>) est la réponse à la question : « Qui êtes-vous et pourquoi pouvez-vous faire cela ? » Il donne une logique à vos effets.</p>
<ul>
<li><strong>Le psychologue</strong> : « Je lis les micro-signaux. » (style Derren Brown, Thorsten Havener)</li>
<li><strong>Le conteur / mystérieux</strong> : histoires anciennes, ambiance gothique, objets chargés d'histoire (style « bizarre magick »).</li>
<li><strong>Le scientifique joueur</strong> : expériences, statistiques, humour.</li>
<li><strong>L'humoriste</strong> : l'impossible au service du rire.</li>
</ul>
<h3>Structure d'un effet</h3>
<ol>
<li><strong>Accroche</strong> : une question, une histoire, un enjeu (« Pouvez-vous garder un secret ? »).</li>
<li><strong>Procédure</strong> : la partie interactive, claire, la plus courte possible.</li>
<li><strong>Conditions</strong> : montrer que la tricherie semble impossible (« Je ne vous ai jamais vu. »).</li>
<li><strong>Révélation</strong> : progressive, pas en une seule fois (lettre par lettre, en hésitant).</li>
<li><strong>Applaudissement</strong> : marquer la fin avec une posture claire.</li>
</ol>
<div class="callout">✍️ Écrivez <strong>tout</strong> votre texte. Les mentalistes professionnels répètent leur script mot pour mot, puis le rendent naturel.</div>`,
        keyPoints: ['Le personnage justifie les effets.', 'Accroche → procédure → conditions → révélation → fin.', 'Écrire et répéter son script.'],
        exercise: "Choisissez votre personnage et écrivez le script complet (accroche → fin) de l'effet 1089 ou du forçage par équivoque.",
        quiz: [
          { q: "À quoi sert le personnage du mentaliste ?", options: ['À cacher son visage', 'À donner une logique crédible à ses effets', 'À rien', 'À hypnotiser'], answer: 1, explain: "Il répond à « pourquoi pouvez-vous faire cela ? »." },
          { q: "Pourquoi révéler progressivement ?", options: ['Pour créer du suspense et un effet plus fort', 'Parce que c’est plus facile', 'Pour cacher une erreur', 'Pour gagner du temps'], answer: 0, explain: "Une révélation progressive crée la tension dramatique (et permet de rattraper certaines erreurs)." },
        ],
      },
      {
        id: 'm3l2',
        title: 'Volontaires et détournement d’attention',
        duration: 12,
        content: `
<h3>Choisir un volontaire</h3>
<ul>
<li>Cherchez quelqu'un d'<strong>attentif et souriant</strong>, qui semble à l'aise, ni trop timide, ni trop « sabotant ».</li>
<li>Évitez les personnes ivres, les très jeunes enfants pour les effets subtils, et ceux qui veulent manifestement vous piéger.</li>
<li>Donnez des instructions <strong>simples</strong>, une à la fois, et vérifiez qu'elles sont comprises.</li>
</ul>
<h3>Le détournement d'attention (<em>misdirection</em>)</h3>
<p>En mentalisme, le détournement est surtout <strong>temporel</strong> et <strong>logique</strong> plus que visuel :</p>
<ul>
<li><strong>Temporel</strong> : la méthode a lieu avant que le public pense que l'effet a commencé, ou bien longtemps après.</li>
<li><strong>Le temps faible</strong> (<em>off-beat</em>) : après un moment fort (rire, révélation), l'attention retombe. C'est là qu'on agit.</li>
<li><strong>Logique</strong> : on oriente le public vers une fausse explication (« c'est psychologique »), ce qui l'éloigne de la vraie.</li>
</ul>
<div class="callout">🧩 Les spectateurs se souviennent de l'effet de manière <strong>simplifiée</strong>. Votre objectif : que leur version du souvenir rende l'effet encore plus impossible.</div>`,
        keyPoints: ['Choisir des volontaires coopératifs.', 'Détournement temporel, temps faible, fausses pistes.', "Le souvenir du public simplifie et renforce l'effet."],
        exercise: "Racontez un effet à un ami, puis demandez-lui de le raconter à quelqu'un d'autre une semaine plus tard. Notez ce qui a « disparu » de son récit.",
        quiz: [
          { q: "Qu'est-ce que le « temps faible » ?", options: ["Le moment où l'attention du public retombe", 'La fin du spectacle', 'Un tour raté', 'La pause publicitaire'], answer: 0, explain: "Juste après un moment fort, on peut agir discrètement." },
          { q: "En mentalisme, le détournement est surtout…", options: ['Visuel', 'Temporel et logique', 'Sonore', 'Inutile'], answer: 1, explain: "On joue sur le moment et sur les fausses explications." },
        ],
      },
    ],
  },
  {
    id: 'm4',
    level: 2,
    title: "Psychologie de l'influence",
    icon: '🧠',
    summary: 'Biais cognitifs, principes de Cialdini, suggestion et langage persuasif.',
    lessons: [
      {
        id: 'm4l1',
        title: "Les principes d'influence",
        duration: 14,
        content: `
<p>Le psychologue <strong>Robert Cialdini</strong> (<em>Influence</em>, 1984) a identifié des principes universels qui poussent les gens à dire « oui ». Le mentaliste les utilise pour que les volontaires coopèrent et pour renforcer la crédibilité.</p>
<table>
<tr><th>Principe</th><th>Sur scène</th></tr>
<tr><td><strong>Réciprocité</strong></td><td>Offrir un petit cadeau ou un compliment avant de demander un effort.</td></tr>
<tr><td><strong>Engagement et cohérence</strong></td><td>Faire dire « oui, c'est un choix libre » à voix haute : le spectateur le défendra ensuite.</td></tr>
<tr><td><strong>Preuve sociale</strong></td><td>« La plupart des gens pensent à… » oriente les choix.</td></tr>
<tr><td><strong>Autorité</strong></td><td>Assurance, vocabulaire précis, tenue soignée.</td></tr>
<tr><td><strong>Sympathie</strong></td><td>Le public aide ceux qu'il apprécie.</td></tr>
<tr><td><strong>Rareté</strong></td><td>« Je ne fais cette expérience qu'une fois par soir. »</td></tr>
<tr><td><strong>Unité</strong> (ajout 2016)</td><td>Le sentiment d'appartenance : « nous » contre l'impossible.</td></tr>
</table>
<h3>Suggestion et attentes</h3>
<p>Les gens ressentent souvent ce qu'on leur annonce : chaleur, lourdeur d'une main, picotement. C'est la base de la <strong>suggestion</strong>, de la pseudo-hypnose et de nombreux effets « d'influence ». Plus l'attente est forte et le cadre crédible, plus l'effet est puissant.</p>`,
        keyPoints: ['7 principes de Cialdini : réciprocité, engagement, preuve sociale, autorité, sympathie, rareté, unité.', 'Les attentes créent des sensations réelles.', 'Utiliser ces principes pour le spectacle, jamais pour manipuler.'],
        exercise: "Dans votre script de la leçon précédente, ajoutez au moins 3 principes de Cialdini. Indiquez lesquels dans la marge.",
        quiz: [
          { q: "Faire dire au spectateur « c'est mon choix libre » utilise…", options: ['La rareté', "L'engagement et la cohérence", 'La réciprocité', "L'unité"], answer: 1, explain: "Un engagement public pousse à rester cohérent ensuite." },
          { q: "« La plupart des gens pensent au rouge » est un exemple de…", options: ['Preuve sociale', 'Autorité', 'Rareté', 'Sympathie'], answer: 0, explain: "On s'appuie sur ce que font les autres." },
          { q: "Qui a écrit Influence ?", options: ['Paul Ekman', 'Robert Cialdini', 'Daniel Kahneman', 'Derren Brown'], answer: 1, explain: "Robert Cialdini, 1984." },
        ],
      },
      {
        id: 'm4l2',
        title: 'Biais cognitifs au service du spectacle',
        duration: 15,
        content: `
<p>Notre cerveau prend des raccourcis. Le mentaliste les connaît intimement.</p>
<ul>
<li><strong>Effet Barnum (ou effet Forer)</strong> : en 1948, le psychologue Bertram Forer donne à ses étudiants une « analyse personnalisée »… identique pour tous. Note moyenne de justesse : environ 4,3 sur 5. Nous acceptons comme personnelles des descriptions vagues et flatteuses.</li>
<li><strong>Biais de confirmation</strong> : on retient les réussites, on oublie les échecs. Le public se souvient des « touches », pas des « ratés ».</li>
<li><strong>Mémoire reconstructive</strong> : les travaux d'<strong>Elizabeth Loftus</strong> montrent que nos souvenirs se modifient selon les questions posées. Un résumé du mentaliste (« Vous avez choisi librement n'importe quelle carte… ») réécrit le souvenir.</li>
<li><strong>Cécité au choix</strong> (<em>choice blindness</em>) : en 2005, Petter Johansson et Lars Hall (Suède) échangent discrètement une photo choisie par des participants. La plupart ne remarquent rien et justifient un choix qu'ils n'ont jamais fait.</li>
<li><strong>Cécité attentionnelle</strong> : l'expérience du « gorille invisible » (Simons et Chabris, 1999) montre qu'on ne voit pas ce qu'on ne regarde pas.</li>
<li><strong>Illusion de contrôle</strong> : plus le spectateur manipule lui-même, plus il croit que le résultat est libre.</li>
</ul>
<div class="callout">🎯 Utilisation directe : <strong>faites résumer les conditions</strong> à la fin (« Vous avez mélangé vous-même, n'est-ce pas ? »). Vous réécrivez le souvenir dans la direction de l'impossible.</div>`,
        keyPoints: ['Effet Barnum/Forer : on se reconnaît dans des descriptions vagues.', 'La mémoire se reconstruit : le résumé final compte.', "Cécité au choix et cécité attentionnelle : on voit moins qu'on ne le croit."],
        exercise: "Rédigez un résumé final pour l'effet du forçage par coupe croisée qui « exagère honnêtement » les conditions (sans mentir sur un fait vérifiable).",
        quiz: [
          { q: "Dans l'expérience de Forer, quelle est la particularité des analyses ?", options: ['Elles étaient très précises', 'Elles étaient identiques pour tout le monde', 'Elles étaient écrites par un voyant', 'Elles étaient négatives'], answer: 1, explain: "Tous les étudiants ont reçu le même texte et l'ont jugé très juste." },
          { q: "Quelle chercheuse est associée à la mémoire reconstructive ?", options: ['Elizabeth Loftus', 'Marie Curie', 'Amy Cuddy', 'Anna Freud'], answer: 0, explain: "Elizabeth Loftus a étudié les faux souvenirs." },
          { q: "La cécité au choix montre que…", options: ['Les gens voient tout', "Les gens peuvent justifier un choix qu'ils n'ont pas fait", 'Les choix sont toujours aléatoires', 'Les yeux révèlent les mensonges'], answer: 1, explain: "Johansson et Hall, Suède, 2005." },
        ],
      },
      {
        id: 'm4l3',
        title: 'Langage persuasif et forçages verbaux',
        duration: 14,
        content: `
<p>Le choix des mots oriente les pensées. Quelques outils :</p>
<ul>
<li><strong>Présupposition</strong> : « Quand vous aurez choisi votre carte, gardez-la en tête » présuppose que le choix va se faire facilement.</li>
<li><strong>Images guidées</strong> : décrire « un objet qu'on trouve dans une pièce chaude, avec des flammes » oriente vers une cheminée ou une bougie.</li>
<li><strong>Rythme et emphase</strong> : appuyer sur un mot (« pensez à une <em>couleur</em>... <em>vive</em>, profonde ») augmente sa probabilité.</li>
<li><strong>Restreindre sans en avoir l'air</strong> : « Pas le 1, trop évident. Pas le 10. Un nombre qui vous parle... »</li>
</ul>
<h3>Et la PNL ?</h3>
<p>La <strong>programmation neuro-linguistique</strong> (PNL), créée dans les années 1970 par Bandler et Grinder, est souvent citée dans le mentalisme. Attention : les études scientifiques n'ont <strong>pas validé</strong> ses affirmations principales (par exemple les mouvements des yeux révélant le mensonge ou le « système de représentation préféré »). Derren Brown lui-même la présente avec beaucoup de recul.</p>
<div class="callout warn">⚠️ Les forçages verbaux sont <strong>probabilistes</strong>. Dans un vrai spectacle, ils servent de couche supplémentaire au-dessus d'une méthode fiable, et le public croit que c'est la seule méthode.</div>`,
        keyPoints: ['Présuppositions, images guidées, emphase et restrictions.', "La PNL n'est pas validée scientifiquement.", 'Le langage est une couche, pas une méthode fiable seule.'],
        exercise: "Écrivez un texte de 30 secondes qui oriente un spectateur vers le dessin d'une maison, sans jamais prononcer le mot. Testez-le sur 5 personnes.",
        quiz: [
          { q: "« Quand vous aurez choisi… » est un exemple de…", options: ['Présupposition', 'Rareté', 'Coup d’avance', 'Équivoque'], answer: 0, explain: "La phrase tient pour acquis que le choix aura lieu." },
          { q: "Que dit la recherche sur la PNL ?", options: ['Elle est prouvée', 'Ses affirmations principales ne sont pas validées', 'Elle permet de lire les pensées', 'Elle est interdite'], answer: 1, explain: "Les études n'ont pas confirmé ses modèles clés." },
        ],
      },
    ],
  },
  {
    id: 'm5',
    level: 2,
    title: 'Observation et langage corporel',
    icon: '👁️',
    summary: 'Ce que le corps et le visage révèlent vraiment, et ce qui relève du mythe.',
    lessons: [
      {
        id: 'm5l1',
        title: 'Lire le corps : la ligne de base',
        duration: 14,
        content: `
<p>Le langage corporel ne se lit pas comme un dictionnaire (« bras croisés = fermé »). La méthode sérieuse repose sur trois règles :</p>
<ol>
<li><strong>La ligne de base</strong> (<em>baseline</em>) : observez la personne quand elle est détendue. Ce qui compte, c'est le <strong>changement</strong> par rapport à son comportement normal.</li>
<li><strong>Les grappes</strong> (<em>clusters</em>) : un signe isolé ne veut rien dire. Plusieurs signes simultanés commencent à être significatifs.</li>
<li><strong>Le contexte</strong> : bras croisés… parce qu'il fait froid ?</li>
</ol>
<h3>Signes utiles au mentaliste</h3>
<ul>
<li><strong>Gestes d'apaisement</strong> : se toucher le cou, le visage, se frotter les mains : indiquent souvent un stress (décrits par l'ancien agent du FBI <strong>Joe Navarro</strong>).</li>
<li><strong>Figement</strong> : une personne stressée devient parfois immobile.</li>
<li><strong>Orientation des pieds et du buste</strong> : on s'oriente vers ce qui nous intéresse, on se détourne de ce qu'on veut quitter.</li>
<li><strong>Réactions à un mot</strong> : une micro-pause, un regard, un changement de respiration lorsque vous citez le bon élément (base de nombreux effets de « détection »).</li>
</ul>
<div class="callout">🔍 En spectacle, on utilise ces signes surtout pour <strong>choisir</strong> les volontaires et <strong>ajuster</strong> son discours, rarement comme unique méthode.</div>`,
        keyPoints: ['Ligne de base, grappes, contexte.', 'Gestes d’apaisement, figement, orientation.', "Les signes sont des indices, jamais des preuves."],
        exercise: "Dans un café ou une vidéo, observez une personne 2 minutes pour établir sa ligne de base, puis notez chaque changement et votre hypothèse de cause.",
        quiz: [
          { q: "Qu'est-ce que la ligne de base ?", options: ['Le comportement normal de la personne au repos', 'Une ligne de la main', 'Un forçage', "Le début d'un spectacle"], answer: 0, explain: "On cherche les écarts à ce comportement de référence." },
          { q: "Un seul signe (bras croisés) permet-il de conclure ?", options: ['Oui, toujours', 'Non, il faut des grappes et du contexte', 'Oui, si la personne ment', 'Seulement en hiver'], answer: 1, explain: "Un signe isolé est ambigu." },
        ],
      },
      {
        id: 'm5l2',
        title: 'Visage, émotions et micro-expressions',
        duration: 15,
        content: `
<p>Le psychologue <strong>Paul Ekman</strong> a décrit des expressions faciales largement reconnues à travers les cultures. On cite souvent <strong>7 émotions de base</strong> :</p>
<table>
<tr><th>Émotion</th><th>Indices clés</th></tr>
<tr><td>Joie</td><td>Coins des lèvres relevés <strong>et</strong> pattes d'oie (sourire « de Duchenne »).</td></tr>
<tr><td>Tristesse</td><td>Coins internes des sourcils relevés, coins des lèvres abaissés.</td></tr>
<tr><td>Colère</td><td>Sourcils abaissés et rapprochés, lèvres serrées, regard fixe.</td></tr>
<tr><td>Peur</td><td>Sourcils relevés et rapprochés, yeux très ouverts, lèvres étirées horizontalement.</td></tr>
<tr><td>Surprise</td><td>Sourcils relevés en arc, yeux ronds, bouche ouverte et détendue.</td></tr>
<tr><td>Dégoût</td><td>Nez plissé, lèvre supérieure relevée.</td></tr>
<tr><td>Mépris</td><td>Un seul coin de la bouche relevé (asymétrique).</td></tr>
</table>
<p>Les <strong>micro-expressions</strong> sont des expressions très brèves (souvent moins d'une demi-seconde) qui peuvent trahir une émotion qu'on tente de masquer. Ekman a développé le système <strong>FACS</strong> qui code chaque mouvement musculaire du visage.</p>
<div class="callout warn">⚠️ Limites scientifiques : l'universalité des émotions est débattue (travaux de Lisa Feldman Barrett), et repérer une micro-expression ne dit pas <em>pourquoi</em> la personne ressent cette émotion. Ce n'est pas un détecteur de mensonge.</div>
<p>👉 Entraînez-vous avec l'outil <strong>Micro-expressions</strong> du Labo.</p>`,
        keyPoints: ['7 émotions de base (Ekman), dont le mépris, asymétrique.', 'Micro-expressions : moins d’une demi-seconde.', "Une émotion n'est pas une preuve de mensonge."],
        exercise: "Faites 20 essais dans l'outil Micro-expressions en mode « flash ». Visez 80 % de réussite.",
        quiz: [
          { q: "Quelle expression est typiquement asymétrique ?", options: ['La joie', 'Le mépris', 'La peur', 'La surprise'], answer: 1, explain: "Un seul coin de la bouche relevé." },
          { q: "Comment distinguer un vrai sourire ?", options: ['Bouche grande ouverte', 'Pattes d’oie autour des yeux', 'Sourcils froncés', 'Il n’y a aucune différence'], answer: 1, explain: "Le sourire de Duchenne implique les muscles autour des yeux." },
          { q: "Peur ou surprise : quel indice distingue la peur ?", options: ['Sourcils relevés et rapprochés, lèvres étirées', 'Bouche ouverte détendue', 'Nez plissé', 'Un coin de lèvre relevé'], answer: 0, explain: "La surprise a des sourcils en arc et une bouche détendue." },
        ],
      },
      {
        id: 'm5l3',
        title: 'Mythes et réalité de la détection du mensonge',
        duration: 12,
        content: `
<p>Beaucoup de « règles » circulent. Voici ce que dit la recherche :</p>
<ul>
<li><strong>« Regarder en haut à droite = mentir »</strong> : faux. Une étude de <strong>Richard Wiseman</strong> et ses collègues (2012) n'a trouvé aucun lien entre direction du regard et mensonge.</li>
<li><strong>« Un menteur évite le regard »</strong> : faux en général ; certains menteurs fixent davantage pour paraître sincères.</li>
<li><strong>Taux de réussite humain</strong> : une méta-analyse de <strong>Bond et DePaulo</strong> (2006) montre que les gens détectent le mensonge à environ <strong>54 %</strong>, à peine mieux que le hasard. Les policiers ne font pas beaucoup mieux.</li>
<li><strong>Il n'existe pas de « nez de Pinocchio »</strong> : aucun signe unique et fiable du mensonge.</li>
</ul>
<h3>Alors comment font les mentalistes ?</h3>
<p>Dans les numéros de « détecteur de mensonge » (trouver qui cache une pièce, deviner la main qui tient l'objet), la méthode réelle est souvent un <strong>principe secret</strong>, une marque, un complice ou un dispositif, la lecture corporelle servant d'<strong>habillage</strong> crédible. Parfois, avec des personnes très expressives, l'observation suffit, et il faut des sorties en cas d'échec.</p>
<div class="callout">🎭 Paradoxe du métier : on présente l'observation comme la méthode… justement parce qu'elle ne suffit pas.</div>`,
        keyPoints: ['Pas de lien regard/mensonge (Wiseman, 2012).', 'Humains : ~54 % de détection (Bond & DePaulo, 2006).', "L'observation est souvent une présentation qui masque une autre méthode."],
        exercise: "Jouez au jeu « deux vérités, un mensonge » avec 3 personnes. Notez votre taux réel de réussite. Comparez-le aux 54 %.",
        quiz: [
          { q: "Quel est le taux moyen de détection du mensonge par les humains ?", options: ['90 %', '75 %', 'Environ 54 %', '20 %'], answer: 2, explain: "Bond & DePaulo (2006) : à peine mieux que le hasard." },
          { q: "Le regard vers le haut à droite indique-t-il un mensonge ?", options: ['Oui', 'Non, aucun lien démontré', 'Seulement chez les droitiers', 'Seulement en PNL avancée'], answer: 1, explain: "Wiseman et al. (2012) n'ont trouvé aucun lien." },
        ],
      },
    ],
  },
  {
    id: 'm6',
    level: 2,
    title: 'Mémoire de mentaliste',
    icon: '🏛️',
    summary: 'Méthode des lieux, Système Majeur et techniques des champions de mémoire.',
    lessons: [
      {
        id: 'm6l1',
        title: 'Les principes de la mémoire',
        duration: 12,
        content: `
<p>La mémoire « prodigieuse » est une compétence qui s'apprend. Les champions de mémoire (comme Dominic O'Brien, ou le journaliste Joshua Foer, auteur de <em>Moonwalking with Einstein</em>) ont une mémoire naturelle normale : ils utilisent des <strong>techniques</strong>.</p>
<h3>Les trois ingrédients</h3>
<ol>
<li><strong>Visualisation</strong> : transformer l'abstrait en image concrète (le mot « liberté » devient la statue de la Liberté).</li>
<li><strong>Association</strong> : relier chaque image à quelque chose de déjà connu.</li>
<li><strong>Exagération</strong> : images absurdes, géantes, en mouvement, drôles, avec sons et odeurs. Le cerveau retient l'inhabituel.</li>
</ol>
<h3>La méthode des lieux</h3>
<p>Selon la légende, le poète grec <strong>Simonide de Céos</strong> aurait pu identifier les victimes d'un banquet effondré en se souvenant de leur place à table. La méthode des lieux (ou <strong>palais de mémoire</strong>) consiste à placer des images sur un trajet que vous connaissez par cœur (votre appartement, votre rue).</p>
<p>👉 Pratiquez avec l'outil <strong>Palais de mémoire</strong> du Labo.</p>`,
        keyPoints: ['Visualiser, associer, exagérer.', 'La méthode des lieux remonte à l’Antiquité.', 'Les champions de mémoire utilisent des techniques, pas un don.'],
        exercise: "Définissez un trajet de 10 lieux dans votre logement (porte, paillasson, porte-manteau...). Écrivez-les dans l'ordre. C'est votre premier palais.",
        quiz: [
          { q: "Qui est associé à la légende de la méthode des lieux ?", options: ['Simonide de Céos', 'Platon', 'Houdini', 'Einstein'], answer: 0, explain: "Le poète grec qui retrouvait les convives d'un banquet." },
          { q: "Quel type d'image se retient le mieux ?", options: ['Neutre et réaliste', 'Absurde, exagérée et en mouvement', 'Petite et immobile', 'En noir et blanc'], answer: 1, explain: "L'inhabituel marque la mémoire." },
        ],
      },
      {
        id: 'm6l2',
        title: 'Le Système Majeur',
        duration: 18,
        content: `
<p>Le <strong>Système Majeur</strong> transforme les chiffres en <strong>sons de consonnes</strong>, puis en mots. Les voyelles sont libres. Il remonte au XVIIe siècle (Pierre Hérigone) et a été popularisé notamment par Harry Lorayne. Version française usuelle :</p>
<table class="major">
<tr><th>Chiffre</th><th>Sons</th><th>Astuce</th></tr>
<tr><td>0</td><td>s, z</td><td>« z » de zéro</td></tr>
<tr><td>1</td><td>t, d</td><td>le t a une barre</td></tr>
<tr><td>2</td><td>n</td><td>le n a 2 jambages</td></tr>
<tr><td>3</td><td>m</td><td>le m a 3 jambages</td></tr>
<tr><td>4</td><td>r</td><td>« quatre » finit par r</td></tr>
<tr><td>5</td><td>l</td><td>L = 50 en chiffres romains</td></tr>
<tr><td>6</td><td>j, ch, g doux</td><td>le j ressemble à un 6 inversé</td></tr>
<tr><td>7</td><td>k, g dur, q</td><td>deux 7 forment un K</td></tr>
<tr><td>8</td><td>f, v</td><td>un f manuscrit a deux boucles</td></tr>
<tr><td>9</td><td>p, b</td><td>le p est un 9 retourné</td></tr>
</table>
<p>Exemples : 14 = <strong>t-r</strong> → « tour » ; 21 = <strong>n-t</strong> → « note » ; 32 = <strong>m-n</strong> → « mine » ; 91 = <strong>b-t</strong> → « bateau » ; 75 = <strong>k-l</strong> → « colle ».</p>
<p>On crée une liste fixe de 100 images (00 à 99). Ensuite, un numéro de téléphone devient une petite histoire, et un numéro de carte une scène.</p>
<div class="callout">📝 C'est le <strong>son</strong> qui compte, pas l'orthographe : « photo » = f-t = 81, « chat » = 6 (le t est muet). Évitez les voyelles nasales (« main », « bon ») : le n ne s'y entend pas.</div>
<p>👉 Entraînez-vous avec l'outil <strong>Système Majeur</strong> du Labo.</p>`,
        keyPoints: ['0 s/z, 1 t/d, 2 n, 3 m, 4 r, 5 l, 6 j/ch, 7 k/g, 8 f/v, 9 p/b.', 'Le son compte, pas l’orthographe.', 'Créer une liste fixe de 100 images.'],
        exercise: "Créez vos 20 premières images (00 à 19) et écrivez-les. Puis mémorisez un numéro de téléphone de 10 chiffres avec ces images.",
        quiz: [
          { q: "Quel nombre code le mot « mine » ?", options: ['23', '32', '42', '35'], answer: 1, explain: "m = 3, n = 2." },
          { q: "Quel son correspond au chiffre 4 ?", options: ['l', 'r', 'k', 'f'], answer: 1, explain: "« quatre » se termine par r." },
          { q: "« photo » code quel nombre ?", options: ['91', '81', '18', '61'], answer: 1, explain: "ph se prononce f = 8, t = 1." },
          { q: "Que code 75 ?", options: ['colle', 'tasse', 'roue', 'lune'], answer: 0, explain: "k = 7, l = 5." },
        ],
      },
      {
        id: 'm6l3',
        title: 'Palais avancés et système PAO',
        duration: 15,
        content: `
<p>Pour mémoriser des quantités énormes (jeux de cartes, longues suites de chiffres), les compétiteurs combinent les techniques.</p>
<h3>Le système PAO (Personne – Action – Objet)</h3>
<p>Chaque nombre de 00 à 99 (ou chaque carte) reçoit une <strong>personne</strong>, une <strong>action</strong> et un <strong>objet</strong>. Pour 3 éléments consécutifs, on prend la personne du 1er, l'action du 2e et l'objet du 3e. Exemple : 32 (Einstein, écrit au tableau, craie) — 14 (Zidane, frappe, ballon) — 91 (capitaine, navigue, bateau) → « Einstein frappe un bateau ». Une seule image pour 6 chiffres !</p>
<h3>Construire de grands palais</h3>
<ul>
<li>Utilisez des lieux <strong>variés</strong> et bien éclairés dans votre esprit.</li>
<li>Gardez une <strong>distance</strong> régulière entre les lieux.</li>
<li>Pour mémoriser un jeu de 52 cartes en PAO, il suffit de 18 lieux (17 scènes de 3 cartes + 1 carte).</li>
<li>Révisez avec la <strong>répétition espacée</strong> : 1 jour, 3 jours, 1 semaine, 1 mois.</li>
</ul>
<h3>Applications en mentalisme</h3>
<p>Mémoriser l'ordre d'un jeu mélangé (« jeu mémorisé »), retenir 20 objets cités par le public, des numéros de série de billets, ou le contenu de pages d'un magazine (« test du livre » sans truc !).</p>`,
        keyPoints: ['PAO = Personne, Action, Objet.', 'Un jeu de 52 cartes en PAO tient dans 18 lieux.', 'La répétition espacée consolide les palais.'],
        exercise: "Dans l'outil Palais de mémoire, réussissez une liste de 15 mots sans erreur. Puis essayez 20.",
        quiz: [
          { q: "Que signifie PAO ?", options: ['Personne Action Objet', 'Principe d’Avance Optimale', 'Pensée Active Organisée', 'Palais À Ouvrir'], answer: 0, explain: "Une image combine les trois éléments de trois nombres." },
          { q: "Avec le PAO à 3 cartes par lieu, combien de lieux pour 52 cartes ?", options: ['52', '26', '18', '13'], answer: 2, explain: "17 scènes de 3 cartes = 51, plus 1 carte, soit 18 lieux." },
        ],
      },
    ],
  },
];
