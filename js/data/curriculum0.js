// Unité 1 : du concret tout de suite. Chaque leçon = un vrai effet à présenter le soir même.
export const part0 = [
  {
    id: 'm0',
    level: 1,
    title: 'Vos premiers miracles',
    icon: '✨',
    summary: 'Trois vrais effets à présenter dès ce soir, avec le texte mot à mot, quoi faire quand ça rate, puis votre premier mini-numéro.',
    lessons: [
      {
        id: 'm0l1',
        title: 'Effet n°1 : le nombre 37',
        duration: 6,
        content: `
<p><strong>Ce que voit le public :</strong> vous écrivez une prédiction et la posez sur la table. Un ami pense librement à un nombre. Il le dit à voix haute, déplie le papier : c'est le même nombre.</p>
<h3>La méthode</h3>
<p>Vous allez <strong>guider</strong> son choix avec quelques contraintes qui paraissent anodines. Avec ces consignes, il ne reste que 7 nombres possibles : 13, 17, 19, 31, 35, 37 et 39. D'après l'expérience des mentalistes, <strong>37</strong> sort souvent, puis <strong>35</strong>. <span class="ev ev-p">Praticien</span> Ce chiffre vient du métier, pas d'une étude publiée : vérifiez-le vous-même avec le Carnet de forçages. Ce qui est bien établi, c'est que les gens choisissent des nombres « qui ont l'air aléatoires », impairs et avec un 7 (Kubovy et Psotka, 1976). <span class="ev ev-s">Prouvé</span></p>
<p>Conclusion : ça marche souvent, <strong>pas toujours</strong>. C'est pour ça que les sorties ci-dessous font partie de l'effet.</p>
<h3>La préparation (30 secondes)</h3>
<ul>
<li>Écrivez <strong>37</strong> sur un petit papier, pliez-le.</li>
<li>Écrivez <strong>35</strong> dans les notes de votre téléphone : c'est votre <strong>sortie</strong> (votre plan B).</li>
</ul>
<h3>Le texte, mot à mot</h3>
<p><em>« Je vais tenter une petite expérience de psychologie. »</em> (Écrivez sur le papier sans le montrer, pliez-le, posez-le sur la table.)</p>
<p><em>« Pensez à un nombre entre 1 et 50. Pour corser un peu : deux chiffres, tous les deux impairs. Par exemple 15… mais pas 15, je viens de le dire. Et deux chiffres différents : pas 11, pas 33. Vous l'avez ? Dites-le à voix haute. »</em></p>
<h3>La fin</h3>
<ul>
<li><strong>37</strong> : <em>« Dépliez le papier. »</em> Taisez-vous et laissez la réaction monter.</li>
<li><strong>35</strong> : <em>« Intéressant… j'avais un doute. »</em> Montrez votre téléphone.</li>
<li><strong>Autre nombre</strong> : souriez, <em>« Vous êtes plus imprévisible que la moyenne ! Essayons autre chose. »</em> Enchaînez sur un autre effet. Un raté assumé avec le sourire ne coûte rien.</li>
</ul>
<h3>La version groupe (plus sûre)</h3>
<p>Devant 4 personnes ou plus, demandez à <strong>tout le monde</strong> de penser à un nombre. Puis : <em>« Levez la main si vous avez pensé à 37. »</em> Avec plusieurs personnes, il est très probable qu'au moins une main se lève. Dépliez alors le papier. Les autres mains se lèvent pour 35 : <em>« Et 35 ? Vous étiez tout près. »</em></p>
<div class="callout">💡 Le secret de la réussite, c'est le <strong>ton</strong> : dites les contraintes vite et naturellement, comme si elles servaient juste à rendre l'expérience plus difficile.</div>
<div class="callout">⚖️ « Expérience de psychologie » est un <strong>cadre de spectacle</strong>, pas une explication. Les études montrent que ce genre de cadrage fait croire au public à des capacités réelles (Lesaffre et al., 2018). Si quelqu'un vous demande sérieusement comment vous faites, ne prétendez pas avoir un don.</div>`,
        script: [
          "« Je vais tenter une petite expérience de psychologie. »",
          "(J'écris, je plie, je pose le papier.)",
          "« Pensez à un nombre entre 1 et 50. Deux chiffres, tous les deux impairs. Par exemple 15… mais pas 15. »",
          "« Deux chiffres différents : pas 11, pas 33. Vous l'avez ? Dites-le à voix haute. »",
          "« Dépliez le papier. » (Silence.)",
        ],
        keyPoints: ['Les contraintes réduisent le choix à 7 nombres ; 37 sort souvent, pas toujours.', 'Toujours une sortie : 35 dans le téléphone.', 'Un raté assumé avec le sourire ne coûte rien.'],
        exercise: "Ce soir, présentez le 37 à 3 personnes. Notez leurs réponses dans le Carnet de forçages (Labo).",
        quiz: [
          { q: 'Que mettez-vous dans votre téléphone avant de commencer ?', options: ['37', '35, votre sortie', 'Rien', 'Le prénom du spectateur'], answer: 1, explain: "Selon l'expérience des mentalistes, 35 est la deuxième réponse la plus fréquente." },
          { q: 'Le spectateur dit 19. Que faites-vous ?', options: ['Vous insistez pour qu’il change', 'Vous souriez et enchaînez sur un autre effet', 'Vous montrez le papier quand même', 'Vous arrêtez tout'], answer: 1, explain: "Un raté léger, assumé, renforce même votre crédibilité." },
          { q: 'Combien de nombres restent possibles avec ces consignes ?', options: ['2', '7', '25', '50'], answer: 1, explain: "13, 17, 19, 31, 35, 37 et 39. Au hasard, chacun aurait environ 14 % de chances : vos résultats réels se comparent à ce chiffre." },
          { q: 'Pourquoi dire « par exemple 15… mais pas 15 » ?', options: ['Pour l’éliminer en douceur et orienter le choix', 'Par politesse', 'C’est la bonne réponse', 'Pour gagner du temps'], answer: 0, explain: "Chaque contrainte réduit les choix possibles sans en avoir l'air." },
        ],
      },
      {
        id: 'm0l2',
        title: 'Effet n°2 : la prédiction du livre',
        duration: 7,
        content: `
<p><strong>Ce que voit le public :</strong> un ami fait un calcul au hasard sur <em>son propre téléphone</em>. Le résultat donne une page et un mot dans un livre. Vous aviez prédit ce mot à l'avance.</p>
<h3>La méthode</h3>
<p>Le calcul donne <strong>toujours 1089</strong>. Vous savez donc à l'avance : page <strong>108</strong>, <strong>9e mot</strong>.</p>
<h3>La préparation (2 minutes)</h3>
<ul>
<li>Prenez n'importe quel livre chez vous. Ouvrez-le page 108 et comptez le 9e mot de la page. Choisissez un livre où ce mot est <strong>visuel</strong> (un nom : « château », « mer »…). Sinon, prenez un autre livre.</li>
<li>Écrivez ce mot sur un papier, glissez-le dans une enveloppe ou sous un verre.</li>
</ul>
<h3>Le texte, mot à mot</h3>
<p><em>« Prenez votre téléphone, ouvrez la calculatrice. Tapez un nombre à trois chiffres, tous différents, du plus grand au plus petit, par exemple 8-5-2. Prenez-en un autre que le mien. »</em></p>
<p><em>« Maintenant, retournez-le (852 devient 258) et soustrayez le petit du grand. »</em></p>
<p><em>« Prenez le résultat, retournez-le, et additionnez les deux. Ne me dites rien. »</em></p>
<p><em>« Les trois premiers chiffres, c'est une page. Le dernier, c'est un mot sur cette page. Allez-y, comptez. »</em> Tendez le livre.</p>
<p><em>« Lisez-le à voix haute. »</em> Puis désignez l'enveloppe : <em>« Ouvrez. »</em></p>
<h3>Pourquoi « du plus grand au plus petit » ?</h3>
<p>Le calcul marche à condition que le premier et le dernier chiffre soient assez éloignés. Avec trois chiffres décroissants et tous différents, c'est garanti.</p>
<div class="callout">🎭 Pendant qu'il calcule, <strong>tournez-vous</strong> et ne regardez pas l'écran. Plus vous êtes loin du téléphone, plus l'effet paraît impossible.</div>`,
        script: [
          "« Prenez votre téléphone, ouvrez la calculatrice. »",
          "« Un nombre à trois chiffres, tous différents, du plus grand au plus petit. Pas le mien. »",
          "« Retournez-le et soustrayez le petit du grand. »",
          "« Retournez le résultat et additionnez les deux. Ne me dites rien. »",
          "« Les trois premiers chiffres : une page. Le dernier : un mot. Comptez. » (Je tends le livre.)",
          "« Lisez-le à voix haute… Ouvrez l'enveloppe. »",
        ],
        keyPoints: ['Le calcul donne toujours 1089 : page 108, 9e mot.', 'Trois chiffres différents et décroissants : le calcul marche à coup sûr.', 'Se tourner pendant le calcul renforce l’impossible.'],
        exercise: "Préparez votre livre et votre enveloppe aujourd'hui. Présentez l'effet à 2 personnes cette semaine.",
        quiz: [
          { q: 'Quel est toujours le résultat du calcul ?', options: ['1098', '1089', '999', 'Il change à chaque fois'], answer: 1, explain: "Page 108, 9e mot." },
          { q: 'Pourquoi demander des chiffres « du plus grand au plus petit » ?', options: ['C’est plus joli', 'Pour garantir que le calcul tombe sur 1089', 'Pour que ce soit plus difficile', 'Ça ne sert à rien'], answer: 1, explain: "Avec des chiffres décroissants et différents, le premier et le dernier sont assez éloignés." },
          { q: 'Où êtes-vous pendant le calcul ?', options: ['Penché sur l’écran', 'Tourné, loin du téléphone', 'Vous faites le calcul vous-même', 'Dans une autre pièce avec le livre'], answer: 1, explain: "Votre distance est la condition qui rend l'effet impossible." },
        ],
      },
      {
        id: 'm0l3',
        title: 'Effet n°3 : l’objet choisi d’avance',
        duration: 7,
        content: `
<p><strong>Ce que voit le public :</strong> trois objets sur la table (une clé, une pièce, un stylo). Le spectateur élimine librement des objets. Il en reste un : la clé. Sous votre verre depuis le début, un papier : « LA CLÉ ».</p>
<h3>La méthode : l'équivoque</h3>
<p>Le spectateur fait des choix, mais c'est <strong>vous</strong> qui décidez de ce qu'ils signifient. Vous ne dites jamais à l'avance si on garde ou si on élimine.</p>
<h3>Le déroulé (l'objet à forcer est la clé)</h3>
<p><em>« Posez un doigt sur deux objets. »</em></p>
<ul>
<li><strong>La clé n'est pas touchée</strong> : <em>« Parfait, on écarte ces deux-là. »</em> Il reste la clé. Terminé.</li>
<li><strong>La clé est touchée</strong> : écartez l'objet non touché. <em>« Il en reste deux. Donnez-m'en un. »</em>
  <ul>
  <li>Il vous donne <strong>l'autre objet</strong> : <em>« Merci, je le prends. Il vous reste la clé. »</em></li>
  <li>Il vous donne <strong>la clé</strong> : <em>« Vous avez choisi celui-ci. »</em> Posez-la au centre et écartez le dernier.</li>
  </ul>
</li>
</ul>
<p><em>« Vous auriez pu changer d'avis à tout moment, d'accord ? Soulevez mon verre. »</em></p>
<div class="callout">🎯 La règle d'or : <strong>une phrase sûre, sans hésitation</strong>. Si vous hésitez une demi-seconde, le spectateur sent que le choix « aurait pu » mal tourner. Entraînez chaque branche jusqu'à ce qu'elle soit naturelle.</div>`,
        script: [
          "(Le papier « LA CLÉ » est sous mon verre depuis le début.)",
          "« Posez un doigt sur deux objets. »",
          "Si la clé n'est pas touchée : « Parfait, on écarte ces deux-là. »",
          "Sinon : « Il en reste deux. Donnez-m'en un. » … « Il vous reste la clé. » / « Vous avez choisi celui-ci. »",
          "« Vous auriez pu changer d'avis à tout moment, d'accord ? Soulevez mon verre. »",
        ],
        keyPoints: ['On ne dit jamais à l’avance si on garde ou si on élimine.', 'Chaque branche se termine sur la clé.', 'Le ton assuré fait tout.'],
        exercise: "Seul devant un miroir, jouez les 3 branches 5 fois chacune. Puis présentez l'effet à un proche.",
        quiz: [
          { q: 'Le spectateur touche le stylo et la pièce. Que dites-vous ?', options: ['« Gardons ces deux-là »', '« Parfait, on écarte ces deux-là »', '« Recommencez »', '« Prenez la clé »'], answer: 1, explain: "Il reste la clé." },
          { q: 'Il touche la clé et le stylo, puis vous donne le stylo. Que dites-vous ?', options: ['« Merci. Il vous reste la clé. »', '« Raté »', '« Donnez-moi la clé »', '« Choisissez encore »'], answer: 0, explain: "Donner = éliminer. La clé reste." },
          { q: 'Il vous donne la clé. Que dites-vous ?', options: ['« Non, l’autre »', '« Vous avez choisi celui-ci. »', '« Recommençons »', '« Mauvais choix »'], answer: 1, explain: "Cette fois, donner = choisir. C'est ça, l'équivoque." },
        ],
      },
      {
        id: 'm0l5',
        title: 'Quand ça rate : vos sorties',
        content: `
<p>Un forçage psychologique marche <strong>souvent, pas toujours</strong>. Les professionnels ratent aussi. La différence, c'est qu'ils ont prévu une réponse pour chaque cas, et que le public ne voit presque jamais l'échec.</p>
<h3>Règle n°1 : ne montrez rien avant de savoir</h3>
<p>Faites toujours dire la réponse <strong>avant</strong> de révéler quoi que ce soit. Tant que le papier est plié, rien n'a raté. Si la réponse ne colle pas, le papier retourne dans votre poche et vous enchaînez : personne ne réclame une prédiction qu'il n'a pas vue échouer.</p>
<h3>Le 37 : toutes les réponses possibles</h3>
<table>
<tr><th>Réponse</th><th>Ce que vous faites</th></tr>
<tr><td>37</td><td><em>« Dépliez le papier. »</em> Silence.</td></tr>
<tr><td>35</td><td><em>« J'avais un doute entre deux… »</em> Montrez le téléphone.</td></tr>
<tr><td>13, 17, 19, 31, 39</td><td><em>« Gardez bien ce nombre en tête, il va nous servir. »</em> Rangez le papier et enchaînez sur l'objet ou le livre.</td></tr>
<tr><td>Hors consignes (15, 11, 42…)</td><td><em>« Vous ne suivez pas les règles, vous ! J'adore. »</em> Riez avec lui, passez à la suite.</td></tr>
</table>
<h3>La prédiction du livre : le calcul est faux</h3>
<p>Si le résultat n'est pas 1089, c'est une erreur de calcul. Ne le dites jamais comme un reproche : <em>« Vérifions ensemble, c'est moi qui vous ai stressé. »</em> Faites refaire le calcul à la calculatrice du téléphone, à deux avec un voisin. Prévention : demandez trois chiffres <strong>différents</strong> et <strong>décroissants</strong>, et faites utiliser la calculatrice dès le départ.</p>
<h3>L'objet choisi d'avance : il prend la clé tout de suite</h3>
<p>C'est la meilleure nouvelle possible : <em>« Vous l'avez choisie sans hésiter. »</em> Révélez immédiatement.</p>
<h3>Les trois sorties universelles</h3>
<ol>
<li><strong>Une autre révélation</strong> : la sortie prévue (le 35 dans le téléphone).</li>
<li><strong>Transformer l'effet</strong> : la réponse devient le point de départ d'autre chose (« gardez ce nombre en tête »).</li>
<li><strong>La sortie élégante</strong> : un sourire, une phrase, et l'effet suivant. Jamais d'excuse, jamais de faute rejetée sur le spectateur.</li>
</ol>
<h3>« C'est un complice ! » ou « Vous l'aviez déjà écrit ! »</h3>
<p>Choisissez des spectateurs que le groupe connaît, faites constater que le papier n'a pas bougé, et répondez avec humour : <em>« Si j'avais des complices partout, je serais beaucoup plus riche. »</em></p>
<div class="callout">💡 Un raté géré avec le sourire rend souvent l'effet suivant plus fort : le public comprend que ce n'était pas « truqué d'avance ».</div>`,
        script: [
          "(Il dit 19.) « 19… Gardez bien ce nombre en tête, il va nous servir. »",
          "(Je range le papier sans le déplier.)",
          "« Maintenant, j'ai besoin de trois objets. »",
          "(Le calcul donne 1098.) « Vérifions ensemble, c'est moi qui vous ai stressé. »",
          "« Si j'avais des complices partout, je serais beaucoup plus riche. »",
        ],
        keyPoints: ['Faire dire la réponse avant de révéler quoi que ce soit.', 'Une réplique prête pour chaque réponse possible.', 'Jamais d’excuse, jamais de faute rejetée sur le spectateur.'],
        exercise: "Demandez à un ami de jouer le spectateur « difficile » : il donne exprès de mauvaises réponses. Rattrapez chaque cas sans hésiter. Puis entraînez-vous avec l'outil « Réflexe sorties » du Labo.",
        quiz: [
          { q: 'Quand faut-il déplier la prédiction ?', options: ['Dès le début', 'Après avoir entendu la réponse', 'Jamais', 'Avant de poser la question'], answer: 1, explain: "Tant que le papier est plié, rien n'a raté." },
          { q: 'Le spectateur dit 17. Que faites-vous ?', options: ['Vous dépliez le papier quand même', '« Gardez ce nombre en tête, il va nous servir »', '« Vous avez triché »', 'Vous recommencez'], answer: 1, explain: "Vous transformez l'effet et rangez la prédiction." },
          { q: 'Le calcul du livre donne 1098. Que dites-vous ?', options: ['« Vous vous êtes trompé »', '« Vérifions ensemble, c’est moi qui vous ai stressé »', '« Ça arrive, tant pis »', '« Prenez la page 109 »'], answer: 1, explain: "On ne rejette jamais la faute sur le spectateur." },
        ],
      },
      {
        id: 'm0l4',
        title: 'Votre premier mini-numéro',
        duration: 6,
        content: `
<p>Vous avez trois effets. Assemblés, ils deviennent un <strong>numéro de 5 minutes</strong> que vous pouvez présenter partout : en soirée, en famille, au travail.</p>
<h3>L'ordre qui marche</h3>
<ol>
<li><strong>Le 37</strong> : court et direct, parfait pour ouvrir. S'il rate, ce n'est pas grave, vous enchaînez.</li>
<li><strong>L'objet choisi d'avance</strong> : le spectateur touche et choisit, il est impliqué.</li>
<li><strong>La prédiction du livre</strong> : la plus forte, gardez-la pour la fin. L'enveloppe est posée dès le début, bien visible.</li>
</ol>
<h3>Les transitions, mot à mot</h3>
<ul>
<li>Pour commencer : <em>« Vous voulez voir une expérience bizarre ? Ça prend deux minutes. »</em></li>
<li>Après le 37 : <em>« Bon, ça c'était l'échauffement. Essayons avec des objets. »</em></li>
<li>Avant le livre : <em>« Dernière expérience, et cette fois je ne toucherai à rien. »</em></li>
<li>Pour finir : <em>« Merci ! »</em> Arrêtez-vous là, même si on vous en demande encore. Gardez-les sur leur faim.</li>
</ul>
<h3>La règle d'honnêteté</h3>
<p>Si on vous demande si vous avez des pouvoirs : <em>« Non, c'est de la psychologie et de l'illusion. Tout l'art est de vous faire douter. »</em> C'est vrai, et c'est encore plus intrigant.</p>
<h3>Votre check-list</h3>
<ul>
<li>✅ « 37 » sur un papier plié, « 35 » dans le téléphone.</li>
<li>✅ « LA CLÉ » sous un verre, une clé, une pièce, un stylo.</li>
<li>✅ Le livre et l'enveloppe avec le 9e mot de la page 108.</li>
</ul>
<div class="callout">🎬 Votre mission : présentez ce mini-numéro à <strong>3 personnes</strong> cette semaine. Notez ensuite dans le Journal ce qui a le mieux marché. C'est comme ça que tous les mentalistes ont commencé.</div>`,
        script: [
          "« Vous voulez voir une expérience bizarre ? Ça prend deux minutes. »",
          "(Le 37.) « Bon, ça c'était l'échauffement. Essayons avec des objets. »",
          "(L'objet choisi.) « Dernière expérience, et cette fois je ne toucherai à rien. »",
          "(Le livre.) « Merci ! »",
        ],
        keyPoints: ['Ouverture courte, final le plus fort.', 'Des transitions écrites à l’avance.', 'Être honnête : psychologie et illusion, rien de surnaturel.'],
        exercise: "Présentez votre mini-numéro à 3 personnes cette semaine, puis notez dans le Journal ce qui a le mieux marché.",
        quiz: [
          { q: 'Quel effet placer à la fin ?', options: ['Le 37', 'La prédiction du livre', 'L’objet choisi', 'Peu importe'], answer: 1, explain: "Le plus fort à la fin : c'est lui qu'on retiendra." },
          { q: 'On vous demande « Tu as des pouvoirs ? ». Que répondez-vous ?', options: ['« Oui, depuis l’enfance »', '« Non, c’est de la psychologie et de l’illusion »', '« Je ne peux pas le dire »', 'Vous changez de sujet'], answer: 1, explain: "Honnête, et encore plus intrigant." },
          { q: 'On vous en redemande à la fin. Que faites-vous ?', options: ['Vous refaites le 37', 'Vous vous arrêtez là', 'Vous expliquez les trucs', 'Vous improvisez un nouvel effet'], answer: 1, explain: "Toujours les laisser sur leur faim." },
        ],
      },
    ],
  },
];
