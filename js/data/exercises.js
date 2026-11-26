// Exercices courts et variés pour chaque leçon (en plus des QCM de la leçon)
// tf = vrai/faux · pairs = associer · order = remettre dans l'ordre · fill = compléter la phrase
export const exercises = {
  m0l1: [
    { t: 'order', q: 'Remettez le texte du 37 dans l’ordre', items: ['J’écris et je pose le papier', 'Un nombre entre 1 et 50', 'Deux chiffres impairs, pas 15', 'Deux chiffres différents, pas 11', 'Dites-le à voix haute'] },
    { t: 'fill', s: 'Votre sortie, notée dans le téléphone, est le nombre ___.', o: ['35', '13', '50'], a: 0 },
    { t: 'tf', s: 'Si le spectateur dit un autre nombre, l’expérience est ratée et il faut tout arrêter.', a: false, e: "Souriez et enchaînez : un raté léger est sans conséquence." },
  ],
  m0l2: [
    { t: 'pairs', p: [['108', 'Numéro de page'], ['9', 'Numéro du mot'], ['852', 'Exemple de nombre de départ'], ['Enveloppe', 'Posée dès le début']] },
    { t: 'order', q: 'Remettez les étapes du calcul dans l’ordre', items: ['Trois chiffres décroissants', 'Retourner et soustraire', 'Retourner le résultat', 'Additionner les deux'] },
    { t: 'tf', s: 'Il vaut mieux regarder l’écran du spectateur pendant qu’il calcule.', a: false, e: "Tournez-vous : votre distance rend l'effet impossible." },
  ],
  m0l3: [
    { t: 'tf', s: 'Dans l’équivoque, on annonce dès le début si l’objet touché sera gardé ou éliminé.', a: false, e: "Jamais : c'est vous qui interprétez après coup." },
    { t: 'pairs', p: [['Clé non touchée', '« On écarte ces deux-là »'], ['Il donne l’autre objet', '« Il vous reste la clé »'], ['Il donne la clé', '« Vous avez choisi celui-ci »'], ['À la fin', '« Soulevez mon verre »']] },
  ],
  m0l5: [
    { t: 'pairs', p: [['37', '« Dépliez le papier »'], ['35', 'Montrer le téléphone'], ['19', '« Gardez ce nombre en tête »'], ['42', '« Vous ne suivez pas les règles ! »']] },
    { t: 'tf', s: 'Il vaut mieux montrer la prédiction avant que le spectateur dise son nombre.', a: false, e: "Faites toujours dire la réponse d'abord : tant que le papier est plié, rien n'a raté." },
    { t: 'fill', s: 'Après un raté, on ne rejette jamais la ___ sur le spectateur.', o: ['faute', 'balle', 'carte'], a: 0 },
  ],
  m0l4: [
    { t: 'order', q: 'Remettez votre mini-numéro dans l’ordre', items: ['Le 37', 'L’objet choisi d’avance', 'La prédiction du livre'] },
    { t: 'fill', s: 'À la fin, même si on en redemande, il faut ___.', o: ['s’arrêter', 'tout expliquer', 'recommencer'], a: 0 },
  ],
  m1l1: [
    { t: 'tf', s: 'Un mentaliste possède de vrais pouvoirs psychiques.', a: false, e: "Le mentalisme est un art du spectacle : méthodes, psychologie et mise en scène." },
    { t: 'pairs', p: [['Robert-Houdin', 'Seconde vue (France)'], ['Tony Corinda', '13 Steps to Mentalism'], ['Theodore Annemann', 'The Jinx'], ['Derren Brown', 'Tricks of the Mind']] },
    { t: 'order', q: 'Remettez ces mentalistes dans l’ordre chronologique', items: ['Robert-Houdin', 'Les Zancig', 'Annemann', 'Derren Brown'] },
  ],
  m1l2: [
    { t: 'pairs', p: [['Deviner un mot pensé', 'Télépathie'], ['Enveloppe scellée', 'Prédiction'], ['Plier une cuillère', 'Psychokinèse'], ['Mémoriser un jeu', 'Prouesse mentale']] },
    { t: 'fill', s: "Le spectateur voit l'___, le mentaliste cache la méthode.", o: ['effet', 'accessoire', 'complice'], a: 0, e: "On distingue toujours l'effet (perçu) de la méthode (cachée)." },
    { t: 'tf', s: 'Superposer plusieurs méthodes rend un effet plus difficile à expliquer.', a: true, e: "Chaque hypothèse du spectateur est contredite par une autre couche." },
  ],
  m1l3: [
    { t: 'tf', s: 'Proposer des séances payantes pour « contacter les défunts » est acceptable si le client est d’accord.', a: false, e: "Exploiter le deuil est la ligne rouge absolue." },
    { t: 'fill', s: "Ray Hyman a fini par ___ à ses propres lectures de lignes de la main.", o: ['croire', 'renoncer', 'gagner'], a: 0, e: "La lecture à froid convainc même celui qui la pratique." },
    { t: 'tf', s: 'On peut démystifier les escrocs tout en protégeant les secrets du métier.', a: true, e: "C'est la position de nombreux mentalistes sceptiques." },
  ],
  m2l1: [
    { t: 'fill', s: "« Entre 1 et 50, deux chiffres impairs différents » : la réponse la plus fréquente selon les mentalistes est ___.", o: ['37', '13', '49'], a: 0, e: "Puis 35. Ça marche souvent, pas toujours : prévoyez une sortie." },
    { t: 'tf', s: 'Dans l’équivoque, on annonce à l’avance ce que signifie le choix du spectateur.', a: false, e: "Justement non : on interprète le choix après coup." },
    { t: 'pairs', p: [['Équivoque', 'Interpréter le choix'], ['Coupe croisée', 'Délai qui brouille le souvenir'], ['Forçage psychologique', 'Choix statistiquement probable'], ['Sortie', 'Plan B prévu']] },
  ],
  m2l2: [
    { t: 'order', q: 'Remettez la routine du coup d’avance dans l’ordre', items: ['Annoncer le billet déjà connu', 'Ouvrir un billet pour « vérifier »', 'Mémoriser ce qu’on lit', 'Annoncer ce contenu au billet suivant'] },
    { t: 'tf', s: 'Le dernier billet révélé doit être celui que l’on connaissait dès le départ.', a: true, e: "C'est lui qui « ferme » la boucle." },
  ],
  m2l3: [
    { t: 'fill', s: 'Avec la procédure du 1089, le résultat final est toujours ___.', o: ['1089', '999', '1098'], a: 0, e: "Exemple : 732 − 237 = 495 ; 495 + 594 = 1089." },
    { t: 'tf', s: 'Un nombre moins la somme de ses chiffres donne toujours un multiple de 9.', a: true, e: "52 − 7 = 45, 81 − 9 = 72…" },
    { t: 'tf', s: 'Un effet mathématique n’a pas besoin de présentation.', a: false, e: "Sans histoire, il ressemble à un exercice scolaire." },
  ],
  m3l1: [
    { t: 'order', q: 'Remettez la structure d’un effet dans l’ordre', items: ['Accroche', 'Procédure', 'Conditions', 'Révélation', 'Fin claire'] },
    { t: 'tf', s: 'Les professionnels improvisent tout leur texte.', a: false, e: "Ils écrivent leur script mot pour mot, puis le rendent naturel." },
  ],
  m3l2: [
    { t: 'pairs', p: [['Temps faible', 'Après un moment fort'], ['Détournement temporel', 'La méthode avant ou après'], ['Fausse piste', '« C’est psychologique »'], ['Bon volontaire', 'Attentif et souriant']] },
    { t: 'tf', s: 'En mentalisme, le détournement est surtout visuel.', a: false, e: "Il est surtout temporel et logique." },
  ],
  m4l1: [
    { t: 'pairs', p: [['Offrir avant de demander', 'Réciprocité'], ['« La plupart des gens… »', 'Preuve sociale'], ['« Une seule fois ce soir »', 'Rareté'], ['Tenue et assurance', 'Autorité']] },
    { t: 'fill', s: "Faire dire « c'est mon libre choix » à voix haute utilise l'___.", o: ['engagement', 'unité', 'autorité'], a: 0, e: "Le spectateur défendra ensuite ce qu'il a affirmé." },
  ],
  m4l2: [
    { t: 'myth', s: 'On peut ne pas voir un gorille… en le regardant droit dans les yeux.', a: true, e: "Le suivi du regard montre que certains fixent le gorille sans le voir.", src: 'Memmert, 2006' },
    { t: 'myth', s: 'La plupart des gens remarquent tout de suite qu’on a échangé la photo qu’ils ont choisie.', a: false, e: "Seuls environ 13 % des échanges sont repérés sur le moment.", src: 'Johansson et al., 2005' },
    { t: 'pairs', p: [['Forer (1949)', 'Effet Barnum'], ['Loftus', 'Faux souvenirs'], ['Johansson et Hall', 'Cécité au choix'], ['Simons et Chabris', 'Gorille invisible']] },
    { t: 'tf', s: 'Le résumé final des conditions peut modifier le souvenir du spectateur.', a: true, e: "La mémoire est reconstructive." },
    { t: 'tf', s: "Dans l'étude de Forer, chaque étudiant avait reçu une analyse différente.", a: false, e: "Tous avaient reçu le même texte." },
  ],
  m4l3: [
    { t: 'myth', s: 'La PNL permet de savoir si quelqu’un ment selon la direction de son regard.', a: false, e: "Testé directement : aucun lien entre direction du regard et mensonge.", src: 'Wiseman et al., 2012' },
    { t: 'tf', s: 'Les études scientifiques ont validé les modèles principaux de la PNL.', a: false, e: "Les revues de la littérature ne les ont pas confirmés." },
    { t: 'fill', s: "« Quand vous aurez choisi… » est une ___.", o: ['présupposition', 'équivoque', 'flatterie'], a: 0, e: "La phrase tient pour acquis que le choix aura lieu." },
  ],
  m5l1: [
    { t: 'myth', s: 'Des bras croisés veulent toujours dire qu’une personne est fermée.', a: false, e: "Aucun geste n'a de sens fixe : froid, confort, habitude…", src: 'DePaulo et al., 2003' },
    { t: 'order', q: 'Remettez la méthode d’observation dans l’ordre', items: ['Établir la ligne de base', 'Repérer un changement', 'Chercher une grappe de signes', 'Vérifier le contexte'] },
    { t: 'tf', s: 'Des bras croisés signifient toujours que la personne est fermée.', a: false, e: "Il fait peut-être froid ! Contexte et grappes d'abord." },
  ],
  m5l2: [
    { t: 'myth', s: 'Les micro-expressions sont fréquentes et trahissent les menteurs.', a: false, e: "Elles sont rares (environ 2 % des expressions) et apparaissent aussi chez les personnes sincères.", src: 'Porter et ten Brinke, 2008' },
    { t: 'myth', s: 'Certaines expressions du visage sont reconnues dans de nombreuses cultures.', a: true, e: "C'est bien établi pour les émotions de base, même si l'universalité exacte est débattue.", src: 'Ekman et Friesen, 1971 ; Barrett et al., 2019' },
    { t: 'myth', s: 'Un sourire avec des pattes d’oie est forcément sincère.', a: false, e: "Le sourire de Duchenne peut aussi être produit volontairement.", src: 'Krumhuber et Manstead, 2009' },
    { t: 'pairs', p: [['Un coin de lèvre relevé', 'Mépris'], ['Nez plissé', 'Dégoût'], ['Sourcils en arc, bouche ouverte', 'Surprise'], ['Pattes d’oie + sourire', 'Joie']] },
    { t: 'tf', s: 'Une micro-expression de peur prouve que la personne ment.', a: false, e: "Elle indique une émotion, pas sa cause." },
  ],
  m5l3: [
    { t: 'myth', s: 'Les gens détectent le mensonge à peine mieux que le hasard.', a: true, e: "Environ 54 % de réussite en moyenne, pour 50 % au hasard.", src: 'Bond et DePaulo, 2006' },
    { t: 'myth', s: 'Un menteur évite le regard.', a: false, e: "Pratiquement aucun lien entre regard fuyant et mensonge.", src: 'DePaulo et al., 2003' },
    { t: 'fill', s: 'Les humains détectent le mensonge dans environ ___ des cas.', o: ['54 %', '80 %', '95 %'], a: 0, e: "Bond & DePaulo, 2006 : à peine mieux que le hasard." },
    { t: 'tf', s: 'Regarder en haut à droite est un signe fiable de mensonge.', a: false, e: "Wiseman et al. (2012) n'ont trouvé aucun lien." },
  ],
  m6l1: [
    { t: 'order', q: 'Les trois ingrédients d’une image mémorable', items: ['Visualiser', 'Associer', 'Exagérer'] },
    { t: 'tf', s: 'Les champions de mémoire ont un cerveau hors du commun.', a: false, e: "Leurs études d'imagerie montrent surtout l'usage de la méthode des lieux." },
  ],
  m6l2: [
    { t: 'pairs', p: [['1', 't, d'], ['3', 'm'], ['5', 'l'], ['8', 'f, v']] },
    { t: 'pairs', p: [['tour', '14'], ['note', '21'], ['colle', '75'], ['bateau', '91']] },
    { t: 'fill', s: 'Le chiffre 4 se code par le son ___.', o: ['r', 'k', 'n'], a: 0, e: "« quatre » se termine par r." },
  ],
  m6l3: [
    { t: 'fill', s: 'Dans le PAO, chaque nombre reçoit une Personne, une Action et un ___.', o: ['Objet', 'Ordre', 'Oiseau'], a: 0 },
    { t: 'tf', s: 'Réviser à intervalles croissants (1 jour, 3 jours, 1 semaine) consolide la mémoire.', a: true, e: "C'est la répétition espacée." },
  ],
  m7l1: [
    { t: 'pairs', p: [['Trait + son contraire', 'Arc-en-ciel'], ['Vrai pour presque tous', 'Barnum'], ['« Vous ne fumez pas, si ? »', 'Négation qui disparaît'], ['Adapté à l’âge', 'Énoncé de Jacques']] },
    { t: 'tf', s: 'Dans une lecture à froid, c’est souvent le sujet qui fournit les détails précis.', a: true, e: "Et il s'en souvient comme d'une révélation." },
  ],
  m7l2: [
    { t: 'order', q: 'Remettez la structure d’une lecture dans l’ordre', items: ['Cadre', 'Énoncés généraux', 'Thèmes', 'Approfondissement', 'Conclusion positive'] },
    { t: 'pairs', p: [['Indices visibles', 'Lecture tiède'], ['Infos récoltées avant', 'Lecture chaude'], ['Aucune info', 'Lecture à froid'], ['Peter Popoff', 'Oreillette (1986)']] },
  ],
  m8l1: [
    { t: 'tf', s: 'Il vaut mieux lire un billet juste au moment où le spectateur l’écrit.', a: false, e: "On lit bien après : détournement temporel." },
    { t: 'pairs', p: [['Peek', 'Coup d’œil'], ['Center tear', 'Déchirure centrale'], ['Nail writer', 'Écriture secrète'], ['Substitution', 'Échange de billet']] },
  ],
  m8l2: [
    { t: 'fill', s: 'Dans la double ___, public et volontaire vivent deux expériences différentes.', o: ['réalité', 'lecture', 'prédiction'], a: 0 },
    { t: 'tf', s: 'Dunninger et Alexander ont rendu célèbre le numéro de questions-réponses.', a: true },
  ],
  m9l1: [
    { t: 'pairs', p: [['Carpenter (1852)', 'Effet idéomoteur'], ['Chevreul', 'Pendule'], ['Faraday (1853)', 'Tables tournantes'], ['Ouija', 'Micro-mouvements']] },
    { t: 'tf', s: "L'effet idéomoteur est volontaire.", a: false, e: "Les mouvements sont inconscients." },
  ],
  m9l2: [
    { t: 'order', q: 'Progression d’entraînement en lecture musculaire', items: ['Gauche / droite', 'Un objet parmi 3', 'Objet caché dans une pièce', 'Contact zéro'] },
    { t: 'fill', s: 'Le guide doit penser à la ___ à prendre.', o: ['direction', 'couleur', 'musique'], a: 0 },
  ],
  m10l1: [
    { t: 'pairs', p: [['1900', 'Mercredi'], ['2000', 'Mardi'], ['1800', 'Vendredi'], ['2100', 'Dimanche']] },
    { t: 'fill', s: 'En mars, la date pivot est le ___.', o: ['14', '3', '7'], a: 0, e: "Le jour de π (14/3)." },
    { t: 'tf', s: '9/5 et 5/9 sont tous deux des dates pivots.', a: true, e: "« Je travaille de 9 à 5 au 7-Eleven »." },
  ],
  m10l2: [
    { t: 'fill', s: 'Pour un total N, on ajoute N − ___ aux cases 13, 14, 15, 16.', o: ['34', '16', '21'], a: 0 },
    { t: 'tf', s: 'Il vaut mieux remplir le carré dans un ordre désordonné.', a: true, e: "Pour cacher le modèle." },
  ],
  m10l3: [
    { t: 'pairs', p: [['Cube finit par 2', 'Racine finit par 8'], ['Cube finit par 3', 'Racine finit par 7'], ['Cube finit par 7', 'Racine finit par 3'], ['Cube finit par 9', 'Racine finit par 9']] },
    { t: 'fill', s: '314 432 : la racine cubique est ___.', o: ['68', '62', '78'], a: 0, e: "Fin 2 → 8 ; 314 entre 216 et 343 → 6." },
  ],
  m11l1: [
    { t: 'order', q: 'Ordre des couleurs en Si Stebbins', items: ['Trèfle', 'Cœur', 'Pique', 'Carreau'] },
    { t: 'fill', s: 'En Si Stebbins, chaque carte vaut ___ de plus que la précédente.', o: ['3', '4', '1'], a: 0 },
  ],
  m11l2: [
    { t: 'tf', s: 'Un jeu mémorisé doit être connu dans les deux sens : position ↔ carte.', a: true },
    { t: 'pairs', p: [['Juan Tamariz', 'Mnemonica'], ['Simon Aronson', 'Aronson stack'], ['Si Stebbins', 'Ordre cyclique +3'], ['Système Majeur', 'Images de positions']] },
  ],
  m12l1: [
    { t: 'myth', s: 'Un spectacle d’hypnose est sans aucun risque pour les volontaires.', a: false, e: "Des malaises après le spectacle sont rares mais documentés. Prévoyez exclusions et retrait des suggestions.", src: 'Heap, 2000' },
    { t: 'tf', s: 'Puisqu’on ne peut pas forcer quelqu’un sous hypnose, un spectacle d’hypnose est sans risque.', a: false, e: "L'hypnose ne supprime pas le contrôle, mais la pression de la scène et de rares malaises après le spectacle existent (Heap, 2000)." },
    { t: 'tf', s: 'Il faut toujours retirer toutes les suggestions à la fin.', a: true },
    { t: 'pairs', p: [['Mains collées', 'Test de suggestibilité'], ['Sarbin, Barber, Spanos', 'Théories socio-cognitives'], ['Hypnotism Act 1952', 'Royaume-Uni'], ['Pendule de Chevreul', 'Idéomoteur']] },
  ],
  m13l1: [
    { t: 'fill', s: 'Un bon effet doit pouvoir se résumer en ___ phrase.', o: ['une', 'trois', 'dix'], a: 0 },
    { t: 'tf', s: 'Répéter le même effet devant le même public le rend plus fort.', a: false, e: "La répétition donne des points de comparaison." },
  ],
  m13l2: [
    { t: 'order', q: 'Structure d’un numéro', items: ['Ouverture courte', 'Montée en puissance', 'Final émotionnel'] },
    { t: 'pairs', p: [['Close-up', '10-15 min'], ['Salon', '30-45 min'], ['Scène', '60-90 min'], ['Pré-show', 'Avant le début officiel']] },
  ],
  m14l1: [
    { t: 'order', q: 'Les 5 étapes de la création d’un effet', items: ['Effet rêvé', 'Lister les méthodes', 'Combiner', 'Écrire la présentation', 'Tester'] },
    { t: 'tf', s: 'On peut reprendre le numéro d’un autre artiste sans le créditer.', a: false },
  ],
  m14l2: [
    { t: 'myth', s: 'Annoncer qu’on est magicien suffit à empêcher le public de croire aux pouvoirs paranormaux.', a: false, e: "Beaucoup de spectateurs croient à un vrai pouvoir même après l'avertissement.", src: 'Benassi et al., 1980' },
    { t: 'pairs', p: [['Projet Alpha', 'Banachek et Edwards'], ['Peter Popoff', 'Démasqué par Randi'], ['Gérard Majax', 'Démystification en France'], ['Houdini', 'Médiums spirites']] },
    { t: 'fill', s: 'Une affirmation extraordinaire demande des preuves ___.', o: ['extraordinaires', 'rapides', 'gratuites'], a: 0 },
  ],
  m15l1: [
    { t: 'tf', s: 'Une phrase affirmative qui descend en fin de phrase inspire l’autorité.', a: true },
    { t: 'fill', s: 'Avant une révélation, un silence de ___ secondes crée la tension.', o: ['2 à 4', '0', '30'], a: 0 },
  ],
  m15l2: [
    { t: 'myth', s: 'Se dire « je suis excité » aide plus que « je dois me calmer » avant de monter sur scène.', a: true, e: "Requalifier le trac en excitation améliore la performance.", src: 'Brooks, 2014' },
    { t: 'pairs', p: [['Regard balayage', 'Tout le public'], ['Regard intense', 'Le volontaire'], ['Regard dirigé', 'Orienter l’attention'], ['Centre de scène', 'Moments forts']] },
    { t: 'tf', s: 'Même les professionnels ont le trac.', a: true, e: "On le gère par la respiration et la préparation." },
  ],
  m16l1: [
    { t: 'pairs', p: [['Forçage', 'Résultat contrôlé'], ['Écriture secrète', 'Écrite après'], ['Plusieurs cachettes', 'Sorties multiples'], ['Texte interprétable', 'Ambiguïté']] },
    { t: 'tf', s: 'Une prédiction forte doit être visible dès le début.', a: true },
  ],
  m16l2: [
    { t: 'order', q: 'Révélation progressive d’un mot', items: ['Une impression', 'Une lettre', 'D’autres lettres', 'Le mot entier'] },
    { t: 'fill', s: 'Le test du livre avec un livre ordinaire et sans calcul utilise la ___.', o: ['mémoire', 'chance', 'PNL'], a: 0 },
  ],
  m17l1: [
    { t: 'tf', s: 'Une routine impromptue doit durer le plus longtemps possible.', a: false, e: "On s'arrête au sommet de l'attention." },
    { t: 'order', q: 'Routine impromptue type', items: ['Accroche', 'Effet d’influence', 'Prouesse', 'Lecture courte', 'Sortie'] },
  ],
  m17l2: [
    { t: 'fill', s: 'Le sceptique bruyant devient le ___ des conditions.', o: ['témoin', 'complice', 'perdant'], a: 0 },
    { t: 'tf', s: 'Annoncer un taux de réussite rend un échec crédible.', a: true },
  ],
  m18l1: [
    { t: 'pairs', p: [['Robert-Houdin', 'France, 1840s'], ['Zancig', 'Danemark / États-Unis'], ['Piddington', 'BBC, 1949'], ['Code verbal', 'Premier mot de la question']] },
    { t: 'tf', s: 'Un bon code doit sonner comme une conversation normale.', a: true },
  ],
  m18l2: [
    { t: 'order', q: 'Construction d’un système de codes', items: ['Chiffres 0-9', 'Catégories', 'Objets', 'Compléments'] },
    { t: 'tf', s: 'Le receveur doit répondre instantanément.', a: false, e: "Il hésite volontairement pour que la réception paraisse mentale." },
  ],
  m19l1: [
    { t: 'fill', s: 'En 1973, avec des objets contrôlés, Uri Geller a ___ dans le Tonight Show.', o: ['échoué', 'réussi', 'disparu'], a: 0 },
    { t: 'tf', s: 'Une suggestion verbale peut faire « voir » un métal continuer à se plier.', a: true, e: "Wiseman & Greening, 2005." },
  ],
  m19l2: [
    { t: 'pairs', p: [['Pendule', 'Idéomoteur'], ['Canette qui roule', 'Électricité statique'], ['Boussole déviée', 'Aimant'], ['Petit effet fort', 'Silence et lenteur']] },
  ],
  m20l1: [
    { t: 'pairs', p: [['Entreprise', 'Élégance, aucun malaise'], ['Mariage', 'Effets courts et émotionnels'], ['Théâtre', 'Univers et dramaturgie'], ['Conférence', 'Contenu solide']] },
    { t: 'tf', s: 'Un numéro de 20 minutes parfaitement rodé vaut mieux que 3 heures de matériel moyen.', a: true },
  ],
  m20l2: [
    { t: 'fill', s: 'Contre un volontaire qui ment, privilégiez les méthodes avec une trace ___.', o: ['écrite', 'sonore', 'invisible'], a: 0 },
    { t: 'tf', s: 'Face à un perturbateur, il faut le remettre à sa place sèchement.', a: false, e: "Humour bienveillant : le public soutient l'artiste élégant." },
  ],
};
