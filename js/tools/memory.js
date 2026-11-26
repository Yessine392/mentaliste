import { esc, shuffle, pick, norm, timer } from '../util.js';

// ---------- Système Majeur ----------
export const MAJOR = {
  '00': 'sauce', '01': 'sud', '02': 'zone', '03': 'sumo', '04': 'soir', '05': 'sel', '06': 'sage', '07': 'sac', '08': 'sofa', '09': 'soupe',
  10: 'tasse', 11: 'tête', 12: 'dune', 13: 'tome', 14: 'tour', 15: 'tôle', 16: 'tige', 17: 'duc', 18: 'touffe', 19: 'tube',
  20: 'noce', 21: 'note', 22: 'nonne', 23: 'Nîmes', 24: 'noir', 25: 'Nil', 26: 'neige', 27: 'nuque', 28: 'nef', 29: 'nappe',
  30: 'mousse', 31: 'mite', 32: 'mine', 33: 'momie', 34: 'mer', 35: 'mule', 36: 'mouche', 37: 'moka', 38: 'mauve', 39: 'myope',
  40: 'rose', 41: 'rite', 42: 'reine', 43: 'rame', 44: 'rire', 45: 'rôle', 46: 'ruche', 47: 'roc', 48: 'rêve', 49: 'robe',
  50: 'lasso', 51: 'lutte', 52: 'laine', 53: 'lame', 54: 'lyre', 55: 'lilas', 56: 'luge', 57: 'lac', 58: 'lave', 59: 'loupe',
  60: 'chaise', 61: 'chute', 62: 'chaîne', 63: 'chameau', 64: 'char', 65: 'châle', 66: 'juge', 67: 'choc', 68: 'chef', 69: 'jupe',
  70: 'case', 71: 'gâteau', 72: 'canne', 73: 'gomme', 74: 'car', 75: 'colle', 76: 'cage', 77: 'coq', 78: 'cave', 79: 'coupe',
  80: 'vase', 81: 'photo', 82: 'veine', 83: 'femme', 84: 'phare', 85: 'ville', 86: 'vache', 87: 'phoque', 88: 'fève', 89: 'Fabio',
  90: 'puce', 91: 'bateau', 92: 'panne', 93: 'pomme', 94: 'poire', 95: 'balle', 96: 'page', 97: 'bac', 98: 'bœuf', 99: 'pape',
};
const MAJOR_TABLE = [['0', 's, z'], ['1', 't, d'], ['2', 'n'], ['3', 'm'], ['4', 'r'], ['5', 'l'], ['6', 'j, ch, g doux'], ['7', 'k, g dur, q'], ['8', 'f, v'], ['9', 'p, b']];
const keyOf = (n) => String(n).padStart(2, '0');

export const majorTool = {
  id: 'major', name: 'Système Majeur', icon: '🔢', level: 2,
  desc: 'Convertir chiffres ↔ mots à toute vitesse',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `
        <section class="card"><h3>Rappel du code</h3>
          <div class="major-grid">${MAJOR_TABLE.map(([d, s]) => `<div><strong>${d}</strong><span>${s}</span></div>`).join('')}</div>
          <p class="muted small">Seuls les <strong>sons</strong> de consonnes comptent. Les voyelles, h, w, y et lettres muettes sont ignorés.</p>
        </section>
        <section class="card"><h3>Entraînement (20 questions)</h3>
          <button class="btn primary block" data-mode="n2w">Nombre → mot (choix multiple)</button>
          <button class="btn primary block" data-mode="w2n">Mot → nombre (saisie)</button>
          <button class="btn ghost block" data-mode="list">Voir ma liste de référence 00–99</button>
          ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}
        </section>`;
      el.querySelectorAll('[data-mode]').forEach((b) => (b.onclick = () => (b.dataset.mode === 'list' ? list() : play(b.dataset.mode))));
    };
    const list = () => {
      el.innerHTML = `<button class="btn ghost" id="bk">← Retour</button>
        <div class="card"><div class="major-list">${Object.entries(MAJOR).sort().map(([k, w]) => `<div><strong>${k}</strong> ${esc(w)}</div>`).join('')}</div>
        <p class="muted small">Cette liste est un exemple. Le plus efficace est de créer <em>votre</em> liste, avec des images qui vous parlent.</p></div>`;
      el.querySelector('#bk').onclick = home;
    };
    const play = (mode) => {
      const keys = shuffle(Object.keys(MAJOR)).slice(0, 20);
      let i = 0, good = 0;
      const t = timer();
      const next = () => {
        if (i >= keys.length) {
          const score = Math.round((good / keys.length) * 100);
          ctx.finish(score, Math.round(good / 2));
          el.innerHTML = `<section class="card result"><div class="big">${score >= 80 ? '🧠' : '💪'}</div><h2>${good}/${keys.length} · ${score} %</h2><p class="muted">Temps total : ${t().toFixed(0)} s</p>
            <button class="btn primary block" id="again">Recommencer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = () => play(mode);
          el.querySelector('#bk').onclick = home;
          return;
        }
        const k = keys[i];
        const progress = `<div class="muted small">${i + 1}/${keys.length} · ✅ ${good}</div>`;
        if (mode === 'n2w') {
          const opts = shuffle([k, ...shuffle(Object.keys(MAJOR).filter((x) => x !== k)).slice(0, 3)]);
          el.innerHTML = `${progress}<section class="card quiz center"><div class="huge">${keyOf(k)}</div><p class="muted">Quel mot correspond ?</p>
            <div class="options">${opts.map((o) => `<button class="opt" data-k="${o}">${esc(MAJOR[o])}</button>`).join('')}</div><div class="explain"></div></section>`;
          el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
            const ok = b.dataset.k === k;
            if (ok) good++;
            el.querySelectorAll('.opt').forEach((o) => { o.disabled = true; if (o.dataset.k === k) o.classList.add('right'); });
            if (!ok) b.classList.add('wrong');
            setTimeout(() => { i++; next(); }, ok ? 450 : 1300);
          }));
        } else {
          el.innerHTML = `${progress}<section class="card quiz center"><div class="huge word">${esc(MAJOR[k])}</div><p class="muted">Quel nombre (2 chiffres) ?</p>
            <form id="f"><input class="input big-input" inputmode="numeric" maxlength="2" autocomplete="off" id="ans" autofocus><button class="btn primary block">Valider</button></form><div class="explain"></div></section>`;
          const inp = el.querySelector('#ans');
          inp.focus();
          el.querySelector('#f').onsubmit = (e) => {
            e.preventDefault();
            const ok = inp.value.trim().padStart(2, '0') === keyOf(k);
            if (ok) good++;
            el.querySelector('.explain').innerHTML = ok ? '<p class="ok">✅ Exact</p>' : `<p class="ko">❌ C'était <strong>${keyOf(k)}</strong></p>`;
            inp.disabled = true;
            setTimeout(() => { i++; next(); }, ok ? 450 : 1400);
          };
        }
      };
      next();
    };
    home();
  },
};

// ---------- Palais de mémoire ----------
export const WORDS = ['éléphant', 'parapluie', 'guitare', 'fromage', 'fusée', 'pingouin', 'couronne', 'tambour', 'cactus', 'dragon', 'violon', 'ananas', 'horloge', 'pirate', 'volcan', 'trompette', 'baleine', 'bougie', 'clé', 'chapeau', 'miroir', 'tortue', 'piano', 'citron', 'boussole', 'sirène', 'locomotive', 'girafe', 'lampe', 'ballon', 'serpent', 'château', 'diamant', 'hibou', 'marteau', 'crocodile', 'bicyclette', 'nuage', 'robot', 'escargot', 'perroquet', 'cerf-volant', 'chocolat', 'licorne', 'aspirateur', 'banane', 'momie', 'fantôme', 'tigre', 'parachute', 'squelette', 'hamburger', 'sous-marin', 'grenouille', 'trésor', 'bonhomme de neige', 'kangourou', 'télescope', 'abeille', 'pizza', 'chevalier', 'arc-en-ciel', 'cloche', 'éventail', 'masque', 'ours', 'tornade', 'carotte', 'samouraï', 'gorille', 'statue', 'boomerang', 'trampoline', 'saxophone', 'cerise', 'requin', 'lunettes', 'fourchette', 'moustache', 'astronaute', 'igloo', 'flamant rose', 'cathédrale', 'pharaon', 'coquillage', 'loup', 'tracteur', 'brosse à dents', 'œuf', 'chameau'];

export const palaceTool = {
  id: 'palace', name: 'Palais de mémoire', icon: '🏛️', level: 2,
  desc: 'Mémoriser une liste de mots dans l’ordre',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card">
        <p>Placez chaque mot sur un lieu de votre trajet (porte d'entrée, paillasson, couloir…) avec une image <strong>exagérée</strong> et <strong>en mouvement</strong>. Puis restituez la liste dans l'ordre.</p>
        <label class="field">Nombre de mots <select id="n" class="input">${[5, 10, 15, 20, 30].map((n) => `<option ${n === 10 ? 'selected' : ''}>${n}</option>`).join('')}</select></label>
        <label class="field">Rythme <select id="pace" class="input"><option value="0">Liste complète (à mon rythme)</option><option value="5">1 mot / 5 s</option><option value="3">1 mot / 3 s</option><option value="2">1 mot / 2 s (compétition)</option></select></label>
        <button class="btn primary block" id="go">Commencer</button>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}
      </section>`;
      el.querySelector('#go').onclick = () => study(shuffle(WORDS).slice(0, Number(el.querySelector('#n').value)), Number(el.querySelector('#pace').value));
    };
    const study = (words, pace) => {
      const t = timer();
      if (!pace) {
        el.innerHTML = `<section class="card"><h3>Mémorisez (${words.length} mots)</h3><ol class="wordlist">${words.map((w) => `<li>${esc(w)}</li>`).join('')}</ol>
          <button class="btn primary block" id="done">J'ai mémorisé → restituer</button></section>`;
        el.querySelector('#done').onclick = () => recall(words, t());
        return;
      }
      let i = 0;
      const show = () => {
        if (i >= words.length) return recall(words, t());
        el.innerHTML = `<section class="card center"><div class="muted small">Lieu ${i + 1}/${words.length}</div><div class="huge word">${esc(words[i])}</div></section>`;
        i++;
        setTimeout(show, pace * 1000);
      };
      show();
    };
    const recall = (words, studyTime) => {
      el.innerHTML = `<section class="card"><h3>Restituez dans l'ordre</h3><p class="muted small">Temps d'étude : ${studyTime.toFixed(0)} s. Les accents ne comptent pas.</p>
        <form id="f">${words.map((_, i) => `<label class="recall"><span>${i + 1}</span><input class="input" autocomplete="off" autocapitalize="off" data-i="${i}"></label>`).join('')}
        <button class="btn primary block">Vérifier</button></form></section>`;
      el.querySelector('input').focus();
      el.querySelector('#f').onsubmit = (e) => {
        e.preventDefault();
        let good = 0;
        el.querySelectorAll('[data-i]').forEach((inp) => {
          const w = words[inp.dataset.i];
          const ok = norm(inp.value) === norm(w);
          if (ok) good++;
          inp.classList.add(ok ? 'right' : 'wrong');
          inp.disabled = true;
          if (!ok) inp.insertAdjacentHTML('afterend', `<span class="correction">${esc(w)}</span>`);
        });
        const score = Math.round((good / words.length) * 100);
        ctx.finish(score, Math.round(good * (words.length >= 15 ? 1.5 : 1)));
        el.querySelector('#f button').outerHTML = `<div class="result center"><h2>${good}/${words.length} · ${score} %</h2>
          <p class="muted">${score === 100 ? 'Parfait ! Augmentez le nombre de mots ou accélérez le rythme.' : 'Repérez les lieux où l’image était trop faible : rendez-la plus absurde.'}</p>
          <button type="button" class="btn primary block" id="again">Nouvelle liste</button></div>`;
        el.querySelector('#again').onclick = home;
      };
    };
    home();
  },
};
