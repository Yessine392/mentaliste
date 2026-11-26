import { esc, shuffle, pick } from '../util.js';
import { store } from '../store.js';

// ---------- Lecture à froid ----------
const TECH = {
  barnum: 'Énoncé Barnum',
  arc: 'Arc-en-ciel',
  jacques: 'Énoncé de Jacques',
  flou: 'Fait flou',
  negation: 'Négation qui disparaît',
  flatterie: 'Flatterie fine',
  peche: 'Pêche',
};
const STATEMENTS = [
  ['Vous avez un grand besoin d’être apprécié, mais vous avez tendance à être critique envers vous-même.', 'barnum'],
  ['Vous avez un potentiel que vous n’avez pas encore pleinement utilisé.', 'barnum'],
  ['Parfois vous vous demandez si vous avez pris les bonnes décisions.', 'barnum'],
  ['Vous préférez un certain changement et une certaine variété, et vous n’aimez pas être enfermé dans des limites.', 'barnum'],
  ['Vous pouvez être très ouvert et sociable, mais il y a des moments où vous avez besoin d’être seul.', 'arc'],
  ['Vous êtes quelqu’un de prudent, et pourtant il vous arrive de prendre des risques inattendus.', 'arc'],
  ['Vous faites confiance aux gens, même si l’expérience vous a appris à rester sur vos gardes.', 'arc'],
  ['En général vous êtes calme, mais quand une injustice vous touche, vous pouvez vous enflammer.', 'arc'],
  ['À ce moment de votre vie, vous vous interrogez sur ce que vous avez accompli et ce qu’il vous reste à faire.', 'jacques'],
  ['Vous sentez que vos parents vieillissent et cela vous fait réfléchir à votre propre avenir.', 'jacques'],
  ['Vous avez le sentiment de ne pas encore avoir trouvé votre vraie voie professionnelle.', 'jacques'],
  ['Je vois un lien avec l’étranger… peut-être un voyage, ou quelqu’un de votre famille ?', 'flou'],
  ['J’ai un nom qui commence par un M, ou peut-être un J… quelqu’un qui compte pour vous.', 'flou'],
  ['Je perçois quelque chose avec le chiffre 2… une date, une adresse, deux personnes ?', 'flou'],
  ['Il y a un objet ancien, un souvenir de famille, quelque part chez vous.', 'flou'],
  ['Vous ne travaillez pas dans la santé, n’est-ce pas ?', 'negation'],
  ['Vous n’avez pas d’enfant… si ?', 'negation'],
  ['Vous ne jouez pas d’un instrument, je me trompe ?', 'negation'],
  ['Vous êtes plus intuitif que la plupart des gens, même si vous ne l’affichez pas.', 'flatterie'],
  ['Vous avez une capacité d’écoute que les autres n’ont pas toujours.', 'flatterie'],
  ['Les gens viennent souvent vous demander conseil, parce que vous voyez ce que d’autres ne voient pas.', 'flatterie'],
  ['Il y a une question d’argent autour de vous en ce moment…', 'peche'],
  ['Je sens qu’il y a eu un changement récemment, n’est-ce pas ?', 'peche'],
  ['Quelqu’un dans votre entourage vous préoccupe… vous voyez de qui je parle ?', 'peche'],
];

const AGES = {
  '18-25': ['Vous ressentez une pression pour faire les « bons » choix d’études ou de carrière.', 'Vous cherchez encore votre place, entre ce qu’on attend de vous et ce que vous voulez vraiment.'],
  '26-40': ['Vous vous demandez si vous avez choisi la bonne voie, ou si une autre vie vous attendait.', 'Vous jonglez entre vos responsabilités et vos rêves personnels.'],
  '41-60': ['Vous faites le bilan de ce que vous avez construit, et vous avez envie de projets qui ont du sens.', 'Vous voyez vos proches changer et cela vous pousse à réévaluer vos priorités.'],
  '60+': ['Vous avez beaucoup donné aux autres, et vous vous autorisez enfin à penser à vous.', 'Vous avez des souvenirs précieux que vous aimeriez transmettre.'],
};
const THEMES = {
  Personnalité: ['Vous avez une grande force intérieure que peu de gens soupçonnent.', 'Vous êtes exigeant avec vous-même, plus qu’avec les autres.', 'Vous pouvez être très organisé, mais certains domaines de votre vie sont un joyeux désordre.'],
  Carrière: ['Il y a un projet professionnel que vous repoussez depuis un moment.', 'Vous avez l’impression que vos talents ne sont pas totalement reconnus.', 'Je perçois une décision professionnelle importante dans les mois à venir.'],
  Relations: ['Il y a une personne avec qui une conversation reste en suspens.', 'Vous êtes très loyal, et une déception passée vous a rendu plus prudent.', 'Vous donnez beaucoup dans vos relations, parfois plus que vous ne recevez.'],
  Maison: ['Il y a une boîte de photos ou de papiers que vous n’avez jamais vraiment triée.', 'Il y a une pièce ou un coin de votre logement que vous aimeriez changer.', 'Vous avez gardé un objet qui n’a aucune valeur pour les autres, mais beaucoup pour vous.'],
  Projets: ['Un voyage vous trotte dans la tête.', 'Vous avez une passion que vous avez mise de côté et qui revient frapper à la porte.', 'Vous apprenez en ce moment quelque chose de nouveau, ou vous en avez très envie.'],
};

export const coldTool = {
  id: 'cold', name: 'Lecture à froid', icon: '🗣️', level: 3,
  desc: 'Reconnaître les techniques et générer des lectures',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><h3>🎯 Identifier les techniques</h3><p class="muted small">12 énoncés : retrouvez la technique utilisée (d'après Ian Rowland).</p>
        <button class="btn primary block" id="quiz">Commencer</button>${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>
        <section class="card"><h3>📜 Générateur de lecture</h3><p class="muted small">Une trame complète à lire à voix haute pour travailler le rythme, les pauses et l'observation des réactions.</p>
        <label class="field">Âge approximatif du sujet <select id="age" class="input">${Object.keys(AGES).map((a) => `<option>${a}</option>`).join('')}</select></label>
        <button class="btn ghost block" id="gen">Générer une lecture</button></section>`;
      el.querySelector('#quiz').onclick = play;
      el.querySelector('#gen').onclick = () => generate(el.querySelector('#age').value);
    };
    const generate = (age) => {
      const themes = shuffle(Object.keys(THEMES)).slice(0, 3);
      const barnum = shuffle(STATEMENTS.filter((s) => s[1] === 'barnum'))[0][0];
      const arc = shuffle(STATEMENTS.filter((s) => s[1] === 'arc'))[0][0];
      el.innerHTML = `<button class="btn ghost" id="bk">← Retour</button><section class="card lesson">
        <h3>1. Cadre</h3><p><em>« Je vais vous dire ce que je perçois. Certaines choses vous parleront tout de suite, d'autres plus tard. Dites-moi simplement si cela résonne. »</em></p>
        <h3>2. Ouverture (confiance)</h3><p>${esc(barnum)}</p><p>${esc(arc)}</p>
        <h3>3. Énoncé adapté à l'âge (${esc(age)})</h3><p>${esc(pick(AGES[age]))}</p>
        <h3>4. Thèmes à explorer</h3>${themes.map((t) => `<p><strong>${t}</strong> — ${esc(pick(THEMES[t]))}</p>`).join('')}
        <p class="muted small">👀 Observez : hochements de tête, sourires, changements de respiration. Creusez le thème qui réagit le plus avec un fait flou.</p>
        <h3>5. Conclusion positive</h3><p><em>« Ce que je retiens surtout, c'est que vous êtes à un moment où vous avez plus de cartes en main que vous ne le pensez. »</em></p>
        <div class="callout warn small">Rappel éthique : présentez toujours une lecture comme une démonstration, jamais comme une vraie voyance.</div>
        <button class="btn primary block" id="again">Autre lecture</button></section>`;
      el.querySelector('#bk').onclick = home;
      el.querySelector('#again').onclick = () => { ctx.finish(null, 3); generate(age); };
    };
    const play = () => {
      const qs = shuffle(STATEMENTS).slice(0, 12);
      let i = 0, good = 0;
      const next = () => {
        if (i >= qs.length) {
          const score = Math.round((good / qs.length) * 100);
          ctx.finish(score, good);
          el.innerHTML = `<section class="card result center"><div class="big">🗣️</div><h2>${good}/${qs.length} · ${score} %</h2>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = play;
          el.querySelector('#bk').onclick = home;
          return;
        }
        const [text, tech] = qs[i];
        el.innerHTML = `<div class="muted small">${i + 1}/${qs.length} · ✅ ${good}</div><section class="card quiz"><blockquote>« ${esc(text)} »</blockquote>
          <div class="options">${Object.entries(TECH).map(([k, v]) => `<button class="opt" data-k="${k}">${v}</button>`).join('')}</div></section>`;
        el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
          const ok = b.dataset.k === tech;
          if (ok) good++;
          el.querySelectorAll('.opt').forEach((o) => { o.disabled = true; if (o.dataset.k === tech) o.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          setTimeout(() => { i++; next(); }, ok ? 600 : 1600);
        }));
      };
      next();
    };
    home();
  },
};

// ---------- Carnet de forçages psychologiques ----------
const POLLS = [
  { id: 'n10', q: 'Pensez à un nombre entre 1 et 10.', expected: '7 (puis 3)', target: '7', chance: 10, placeholder: 'ex. 7' },
  { id: 'n50', q: 'Un nombre entre 1 et 50, deux chiffres impairs et différents.', expected: '37 (puis 35), selon le métier', target: '37', chance: 14, placeholder: 'ex. 37' },
  { id: 'n100', q: 'Un nombre entre 1 et 100.', expected: 'tradition du métier : 37, 73, 42… à vérifier avec vos propres données', placeholder: 'ex. 42' },
  { id: 'shape', q: 'Une forme géométrique simple, et une autre à l’intérieur.', expected: 'cercle dans un triangle', placeholder: 'ex. cercle dans triangle' },
  { id: 'color', q: 'Pensez à une couleur.', expected: 'rouge ou bleu', placeholder: 'ex. rouge' },
  { id: 'flower', q: 'Pensez à une fleur.', expected: 'rose', placeholder: 'ex. rose' },
  { id: 'card', q: 'Pensez à une carte à jouer.', expected: 'As de cœur, Dame de cœur', placeholder: 'ex. As de cœur' },
  { id: 'veg', q: 'Pensez à un légume.', expected: 'carotte', placeholder: 'ex. carotte' },
];

export const pollTool = {
  id: 'polls', name: 'Carnet de forçages', icon: '📊', level: 1,
  desc: 'Testez les forçages psychologiques sur vos proches',
  mount(el, ctx) {
    const data = () => store.getData('polls', {});
    const home = () => {
      const d = data();
      el.innerHTML = `<p class="muted">Posez la question à quelqu'un, notez sa réponse, et découvrez vos propres statistiques. C'est ainsi que les professionnels affinent leurs forçages.</p>
        ${POLLS.map((p) => { const n = (d[p.id] || []).length; return `<a class="card module" href="javascript:void 0" data-p="${p.id}"><span class="mod-icon">❓</span><div class="mod-body"><strong>${esc(p.q)}</strong><div class="muted small">Attendu : ${esc(p.expected)} · ${n} réponse${n > 1 ? 's' : ''}</div></div></a>`; }).join('')}`;
      el.querySelectorAll('[data-p]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); poll(POLLS.find((p) => p.id === a.dataset.p)); }));
    };
    const poll = (p) => {
      const answers = data()[p.id] || [];
      const counts = {};
      answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 8);
      const max = top[0]?.[1] || 1;
      el.innerHTML = `<button class="btn ghost" id="bk">← Retour</button><section class="card"><h3>${esc(p.q)}</h3><p class="muted small">Réponse attendue : <strong>${esc(p.expected)}</strong></p>${p.target ? `<div class="vs-chance"><div><b>${answers.length ? Math.round(((counts[p.target] || 0) / answers.length) * 100) : '–'} %</b><span>vos « ${esc(p.target)} »</span></div><div><b>${p.chance} %</b><span>au hasard</span></div></div><p class="muted small">${answers.length < 20 ? `Encore ${20 - answers.length} réponse${20 - answers.length > 1 ? 's' : ''} avant que votre taux veuille dire quelque chose.` : (counts[p.target] || 0) / answers.length > p.chance / 100 * 1.5 ? 'Votre forçage fait nettement mieux que le hasard.' : 'Pas encore nettement au-dessus du hasard : travaillez le ton et le texte.'}</p>` : ''}
        <form id="f" class="row"><input class="input" id="a" placeholder="${esc(p.placeholder)}" autocomplete="off"><button class="btn primary">Ajouter</button></form></section>
        <section class="card"><h3>Vos résultats (${answers.length})</h3>${top.length ? top.map(([k, v]) => `<div class="hbar"><span>${esc(k)}</span><div class="bar"><span style="width:${(v / max) * 100}%"></span></div><b>${Math.round((v / answers.length) * 100)} %</b></div>`).join('') : '<p class="muted small">Aucune réponse encore.</p>'}
        ${answers.length ? '<button class="btn ghost small" id="clr">Effacer ces résultats</button>' : ''}</section>`;
      el.querySelector('#bk').onclick = home;
      const inp = el.querySelector('#a');
      inp.focus();
      el.querySelector('#f').onsubmit = (e) => {
        e.preventDefault();
        const v = inp.value.trim().toLowerCase();
        if (!v) return;
        const d = data();
        d[p.id] = [...(d[p.id] || []), v];
        store.setData('polls', d);
        ctx.finish(null, 2);
        poll(p);
      };
      const clr = el.querySelector('#clr');
      if (clr) clr.onclick = () => { const d = data(); delete d[p.id]; store.setData('polls', d); poll(p); };
    };
    home();
  },
};

// ---------- Journal ----------
const TYPES = { pratique: '🏋️ Pratique', spectacle: '🎭 Représentation', idee: '💡 Idée d’effet', lecture: '📖 Lecture' };
export const journalTool = {
  id: 'journal', name: 'Journal du mentaliste', icon: '📓', level: 1,
  desc: 'Notez vos séances, représentations et idées',
  mount(el, ctx) {
    const render = (prefill = '') => {
      const entries = store.get().journal;
      el.innerHTML = `<section class="card"><form id="f">
        <input class="input" id="t" placeholder="Titre" value="${esc(prefill)}" required>
        <select class="input" id="ty">${Object.entries(TYPES).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select>
        <textarea class="input" id="x" rows="5" placeholder="Ce que j'ai fait, ce qui a marché, ce que je dois améliorer…" required></textarea>
        <button class="btn primary block">Enregistrer (+5 XP)</button></form></section>
        ${entries.map((e) => `<div class="card journal-entry"><div class="row between"><strong>${esc(e.title)}</strong><button class="icon-btn" data-del="${e.id}" aria-label="Supprimer">🗑️</button></div>
          <div class="muted small">${e.date} · ${TYPES[e.type] || ''}</div><p>${esc(e.text).replace(/\n/g, '<br>')}</p></div>`).join('') || '<p class="muted center">Votre journal est vide. Les grands mentalistes notent tout !</p>'}`;
      el.querySelector('#f').onsubmit = (e) => {
        e.preventDefault();
        store.addJournal({ title: el.querySelector('#t').value.trim(), type: el.querySelector('#ty').value, text: el.querySelector('#x').value.trim() });
        ctx.finish(null, 5);
        render();
      };
      el.querySelectorAll('[data-del]').forEach((b) => (b.onclick = () => { store.removeJournal(Number(b.dataset.del)); render(); }));
    };
    let prefill = '';
    try { prefill = sessionStorage.getItem('journalPrefill') || ''; sessionStorage.removeItem('journalPrefill'); } catch { /* indisponible */ }
    render(prefill ? `Exercice : ${prefill}` : '');
  },
};
