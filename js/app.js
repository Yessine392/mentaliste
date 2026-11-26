import { part1 } from './data/curriculum1.js';
import { part2 } from './data/curriculum2.js';
import { glossary } from './data/glossary.js';
import { library, resources } from './data/library.js';
import { store, rankFor, ranks } from './store.js';
import { tools } from './tools/index.js';
import { esc, shuffle, toast } from './util.js';

export const modules = [...part1, ...part2];
export const levels = [
  { n: 1, name: 'Débutant', sub: 'Fondations', color: '#7dd3a8' },
  { n: 2, name: 'Apprenti', sub: 'Psychologie et observation', color: '#7cc4f0' },
  { n: 3, name: 'Praticien', sub: 'Techniques classiques', color: '#b79cf5' },
  { n: 4, name: 'Avancé', sub: 'Prouesses et cartes', color: '#f2b46d' },
  { n: 5, name: 'Expert', sub: 'Art, métier et esprit critique', color: '#f07c8f' },
];
const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, module: m })));
const lessonById = Object.fromEntries(allLessons.map((l) => [l.id, l]));
const moduleById = Object.fromEntries(modules.map((m) => [m.id, m]));

const XP_LESSON = 40;
const XP_PERFECT = 10;

const view = document.getElementById('view');

// ---------- Progression ----------
function levelProgress(n) {
  const ls = allLessons.filter((l) => l.module.level === n);
  const done = ls.filter((l) => store.isDone(l.id)).length;
  return { done, total: ls.length, pct: ls.length ? Math.round((done / ls.length) * 100) : 0 };
}
function isLevelUnlocked(n) {
  if (n === 1 || store.get().settings.unlockAll) return true;
  return levelProgress(n - 1).pct >= 75;
}
function moduleProgress(m) {
  const done = m.lessons.filter((l) => store.isDone(l.id)).length;
  return { done, total: m.lessons.length, pct: Math.round((done / m.lessons.length) * 100) };
}
function nextLesson() {
  return allLessons.find((l) => !store.isDone(l.id) && isLevelUnlocked(l.module.level));
}

// ---------- Composants ----------
const bar = (pct, color = 'var(--accent)') => `<div class="bar"><span style="width:${pct}%;background:${color}"></span></div>`;

function header(title, back) {
  return `<header class="page-head">${back ? `<a class="back" href="${back}" aria-label="Retour">←</a>` : ''}<h1>${title}</h1></header>`;
}

// ---------- Vues ----------
function viewHome() {
  const s = store.get();
  const r = rankFor(s.xp);
  const nl = nextLesson();
  const pctRank = r.next ? Math.round(((s.xp - r.xp) / (r.next.xp - r.xp)) * 100) : 100;
  const doneCount = Object.keys(s.completed).length;
  const suggestions = shuffle(tools.filter((t) => isLevelUnlocked(t.level))).slice(0, 2);
  return `
  <section class="hero">
    <div class="hero-eye">👁️</div>
    <h1>Mentaliste</h1>
    <p>De la première illusion à la maîtrise. Un parcours complet, nourri des traditions française, anglaise, allemande, espagnole et américaine.</p>
  </section>
  <section class="card rank">
    <div class="rank-top">
      <span class="rank-icon">${r.icon}</span>
      <div><div class="muted small">Votre rang</div><strong>${r.name}</strong></div>
      <div class="stats"><span title="Points d'expérience">⭐ ${s.xp} XP</span><span title="Jours consécutifs">🔥 ${s.streak.count} j</span></div>
    </div>
    ${bar(pctRank, 'var(--gold)')}
    <div class="muted small">${r.next ? `${r.next.xp - s.xp} XP avant « ${r.next.name} »` : 'Rang maximal atteint !'} · ${doneCount}/${allLessons.length} leçons</div>
  </section>
  ${nl ? `<a class="card continue" href="#/lecon/${nl.id}">
      <div class="muted small">${doneCount ? 'Continuer' : 'Commencer'} · Niveau ${nl.module.level} · ${esc(nl.module.title)}</div>
      <strong>${nl.module.icon} ${esc(nl.title)}</strong>
      <span class="pill">${nl.duration} min →</span>
    </a>` : `<div class="card continue"><strong>🏆 Vous avez terminé tout le parcours !</strong><div class="muted small">Continuez à vous entraîner dans le Labo et en révision.</div></div>`}
  <h2 class="section">Votre parcours</h2>
  <div class="levels-mini">
    ${levels.map((lv) => { const p = levelProgress(lv.n); const u = isLevelUnlocked(lv.n); return `
      <a class="lv-mini ${u ? '' : 'locked'}" href="#/parcours">
        <span class="lv-badge" style="background:${lv.color}">${u ? lv.n : '🔒'}</span>
        <div><strong>${lv.name}</strong><div class="muted small">${lv.sub}</div>${bar(p.pct, lv.color)}</div>
      </a>`; }).join('')}
  </div>
  <h2 class="section">Entraînement du jour</h2>
  <div class="grid2">
    ${suggestions.map((t) => `<a class="card tool-card" href="#/labo/${t.id}"><span class="tool-icon">${t.icon}</span><strong>${t.name}</strong><span class="muted small">${t.desc}</span></a>`).join('')}
  </div>
  <a class="card review-cta" href="#/revision"><strong>🔁 Révision express</strong><span class="muted small">10 questions tirées des leçons terminées</span></a>
  `;
}

function viewParcours() {
  return header('Parcours') + levels.map((lv) => {
    const u = isLevelUnlocked(lv.n);
    const p = levelProgress(lv.n);
    const mods = modules.filter((m) => m.level === lv.n);
    return `<section class="level ${u ? '' : 'locked'}">
      <div class="level-head"><span class="lv-badge" style="background:${lv.color}">${lv.n}</span>
        <div><h2>Niveau ${lv.n} · ${lv.name}</h2><div class="muted small">${lv.sub} · ${p.done}/${p.total} leçons</div></div></div>
      ${u ? '' : `<p class="muted small lock-note">🔒 Terminez 75 % du niveau ${lv.n - 1} pour débloquer (ou activez « tout débloquer » dans Réglages).</p>`}
      ${mods.map((m) => { const mp = moduleProgress(m); return `
        <a class="card module ${u ? '' : 'disabled'}" href="${u ? `#/module/${m.id}` : '#/parcours'}">
          <span class="mod-icon">${m.icon}</span>
          <div class="mod-body"><strong>${esc(m.title)}</strong><div class="muted small">${esc(m.summary)}</div>${bar(mp.pct, lv.color)}</div>
          <span class="muted small">${mp.done}/${mp.total}</span>
        </a>`; }).join('')}
    </section>`;
  }).join('');
}

function viewModule(id) {
  const m = moduleById[id];
  if (!m) return notFound();
  if (!isLevelUnlocked(m.level)) return header('Verrouillé', '#/parcours') + `<p class="card">Ce module appartient à un niveau encore verrouillé.</p>`;
  const lv = levels[m.level - 1];
  return header(`${m.icon} ${esc(m.title)}`, '#/parcours') + `
    <p class="muted">Niveau ${m.level} · ${lv.name} — ${esc(m.summary)}</p>
    <ol class="lesson-list">
      ${m.lessons.map((l, i) => { const d = store.get().completed[l.id]; return `
        <li><a class="card lesson-item ${d ? 'done' : ''}" href="#/lecon/${l.id}">
          <span class="num">${d ? '✓' : i + 1}</span>
          <div><strong>${esc(l.title)}</strong><div class="muted small">${l.duration} min · ${l.quiz.length} questions${d ? ` · meilleur score ${d.score} %` : ''}</div></div>
        </a></li>`; }).join('')}
    </ol>`;
}

function viewLesson(id) {
  const l = lessonById[id];
  if (!l) return notFound();
  if (!isLevelUnlocked(l.module.level)) return header('Verrouillé', '#/parcours') + `<p class="card">Cette leçon appartient à un niveau encore verrouillé.</p>`;
  const m = l.module;
  const idx = m.lessons.indexOf(m.lessons.find((x) => x.id === id));
  return header(esc(l.title), `#/module/${m.id}`) + `
    <div class="muted small crumbs">${m.icon} ${esc(m.title)} · Leçon ${idx + 1}/${m.lessons.length} · ${l.duration} min</div>
    <article class="card lesson">${l.content}</article>
    <section class="card keypoints"><h3>📌 À retenir</h3><ul>${l.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></section>
    <section class="card exercise"><h3>🏋️ Exercice pratique</h3><p>${esc(l.exercise)}</p>
      <button class="btn ghost" data-journal="${l.id}">📓 Noter ma pratique dans le journal</button></section>
    <a class="btn primary block" href="#/quiz/${l.id}">Passer le quiz (${l.quiz.length} questions) →</a>`;
}

function mountLesson(id) {
  const btn = view.querySelector('[data-journal]');
  if (btn) btn.onclick = () => { location.hash = `#/labo/journal?lesson=${id}&lessonTitle=${encodeURIComponent(lessonById[id].title)}`; };
}

// ---------- Quiz ----------
function runQuiz(questions, { onFinish, title, back }) {
  let i = 0, good = 0;
  const qs = questions.map((q) => {
    const order = shuffle(q.options.map((_, k) => k));
    return { ...q, order };
  });
  const render = () => {
    if (i >= qs.length) {
      const score = Math.round((good / qs.length) * 100);
      view.innerHTML = header(title, back) + `<section class="card result">
        <div class="big">${score >= 70 ? '🎉' : '💪'}</div>
        <h2>${good}/${qs.length} bonnes réponses (${score} %)</h2>
        <div id="finish-msg"></div>
      </section>`;
      onFinish(score, view.querySelector('#finish-msg'));
      return;
    }
    const q = qs[i];
    view.innerHTML = header(title, back) + `
      <div class="muted small">Question ${i + 1}/${qs.length}</div>${bar(Math.round((i / qs.length) * 100))}
      <section class="card quiz"><h2>${esc(q.q)}</h2>
        <div class="options">${q.order.map((k) => `<button class="opt" data-k="${k}">${esc(q.options[k])}</button>`).join('')}</div>
        <div class="explain" hidden></div>
      </section>`;
    view.querySelectorAll('.opt').forEach((b) => {
      b.onclick = () => {
        const k = Number(b.dataset.k);
        const ok = k === q.answer;
        if (ok) good++;
        view.querySelectorAll('.opt').forEach((o) => {
          o.disabled = true;
          if (Number(o.dataset.k) === q.answer) o.classList.add('right');
        });
        if (!ok) b.classList.add('wrong');
        const ex = view.querySelector('.explain');
        ex.hidden = false;
        ex.innerHTML = `<p><strong>${ok ? '✅ Exact !' : '❌ Pas tout à fait.'}</strong> ${esc(q.explain || '')}</p><button class="btn primary block" id="nextq">${i + 1 < qs.length ? 'Suivante →' : 'Voir le résultat'}</button>`;
        view.querySelector('#nextq').onclick = () => { i++; render(); };
      };
    });
  };
  render();
}

function mountQuiz(id) {
  const l = lessonById[id];
  if (!l) return;
  runQuiz(l.quiz, {
    title: `Quiz · ${esc(l.title)}`,
    back: `#/lecon/${id}`,
    onFinish(score, el) {
      const m = l.module;
      const nextInModule = m.lessons[m.lessons.findIndex((x) => x.id === id) + 1];
      const nextGlobal = allLessons[allLessons.findIndex((x) => x.id === id) + 1];
      if (score >= 70) {
        const first = store.completeLesson(id, score);
        let xp = 0;
        if (first) { xp = XP_LESSON + (score === 100 ? XP_PERFECT : 0); store.addXp(xp); }
        const nxt = nextInModule || nextGlobal;
        el.innerHTML = `<p>${first ? `Leçon validée ! <strong>+${xp} XP</strong>` : 'Leçon déjà validée : bonne révision !'}</p>
          ${nxt ? `<a class="btn primary block" href="#/lecon/${nxt.id}">Leçon suivante : ${esc(nxt.title)} →</a>` : `<a class="btn primary block" href="#/parcours">Retour au parcours</a>`}
          <a class="btn ghost block" href="#/module/${m.id}">Retour au module</a>`;
        if (first) checkRankUp(store.get().xp - xp);
      } else {
        el.innerHTML = `<p>Il faut 70 % pour valider. Relisez la leçon et réessayez !</p>
          <a class="btn primary block" href="#/lecon/${id}">Relire la leçon</a>
          <button class="btn ghost block" id="retry">Réessayer le quiz</button>`;
        el.querySelector('#retry').onclick = () => mountQuiz(id);
      }
    },
  });
}

function checkRankUp(prevXp) {
  const before = rankFor(prevXp).name, after = rankFor(store.get().xp);
  if (before !== after.name) toast(`${after.icon} Nouveau rang : ${after.name} !`, 4000);
}

function mountRevision() {
  const done = allLessons.filter((l) => store.isDone(l.id));
  const pool = (done.length ? done : allLessons.filter((l) => l.module.level === 1)).flatMap((l) => l.quiz);
  const qs = shuffle(pool).slice(0, 10);
  runQuiz(qs, {
    title: 'Révision express',
    back: '#/',
    onFinish(score, el) {
      const xp = Math.round(score / 10);
      if (xp) { const prev = store.get().xp; store.addXp(xp); checkRankUp(prev); }
      store.recordTool('revision', score);
      el.innerHTML = `<p>${done.length ? '' : 'Astuce : terminez des leçons pour réviser leurs questions. '}<strong>+${xp} XP</strong></p>
        <button class="btn primary block" id="again">Nouvelle série</button><a class="btn ghost block" href="#/">Accueil</a>`;
      el.querySelector('#again').onclick = mountRevision;
    },
  });
}

// ---------- Labo ----------
function viewLabo() {
  const st = store.get().toolStats;
  return header('Labo d’entraînement') + `<p class="muted">Des exercices interactifs pour transformer la théorie en vraies compétences. Chaque session rapporte de l'XP.</p>
  <div class="grid2">${tools.map((t) => { const u = isLevelUnlocked(t.level); const s = st[t.id]; return `
    <a class="card tool-card ${u ? '' : 'disabled'}" href="${u ? `#/labo/${t.id}` : '#/labo'}">
      <span class="tool-icon">${u ? t.icon : '🔒'}</span><strong>${t.name}</strong>
      <span class="muted small">${t.desc}</span>
      <span class="small tag">Niv. ${t.level}${s ? ` · ${s.sessions} session${s.sessions > 1 ? 's' : ''}` : ''}</span>
    </a>`; }).join('')}</div>`;
}

function mountTool(id, params) {
  const t = tools.find((x) => x.id === id);
  if (!t) { view.innerHTML = notFound(); return; }
  view.innerHTML = header(`${t.icon} ${t.name}`, '#/labo') + `<div id="tool"></div>`;
  t.mount(view.querySelector('#tool'), {
    params,
    finish(score, xp = 10) {
      const prev = store.get().xp;
      const s = store.recordTool(id, score);
      if (xp > 0) { store.addXp(xp); toast(`+${xp} XP`); checkRankUp(prev); }
      return s;
    },
    stats: () => store.get().toolStats[id],
  });
}

// ---------- Plus ----------
function viewPlus() {
  const items = [
    ['#/glossaire', '🌍', 'Glossaire multilingue', 'Les termes du métier en français, anglais, allemand et espagnol'],
    ['#/bibliotheque', '📚', 'Bibliothèque', 'Les ouvrages de référence du monde entier, par niveau'],
    ['#/ethique', '⚖️', 'Charte éthique', 'Les règles du mentaliste responsable'],
    ['#/rangs', '🏅', 'Rangs', 'Les étapes de votre progression'],
    ['#/reglages', '⚙️', 'Réglages', 'Sauvegarde, import, réinitialisation'],
  ];
  return header('Plus') + items.map(([h, i, t, d]) => `<a class="card module" href="${h}"><span class="mod-icon">${i}</span><div class="mod-body"><strong>${t}</strong><div class="muted small">${d}</div></div></a>`).join('');
}

function viewGlossaire() {
  return header('Glossaire multilingue', '#/plus') + `
    <input id="gsearch" class="input" type="search" placeholder="Rechercher un terme (toutes langues)…" autocomplete="off">
    <div id="glist"></div>`;
}
function mountGlossaire() {
  const list = view.querySelector('#glist');
  const render = (q = '') => {
    const n = q.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const norm = (s) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
    const items = glossary.filter((g) => !n || norm([g.fr, g.en, g.de, g.es, g.def].join(' ')).includes(n));
    list.innerHTML = items.map((g) => `<div class="card gloss"><strong>${esc(g.fr)}</strong>
      <div class="langs"><span>🇬🇧 ${esc(g.en)}</span><span>🇩🇪 ${esc(g.de)}</span><span>🇪🇸 ${esc(g.es)}</span></div>
      <p class="muted small">${esc(g.def)}</p></div>`).join('') || '<p class="muted">Aucun résultat.</p>';
  };
  view.querySelector('#gsearch').oninput = (e) => render(e.target.value);
  render();
}

function viewBiblio() {
  return header('Bibliothèque', '#/plus') + `<p class="muted">Une sélection internationale. Les livres de magie sont la meilleure source : soutenez leurs auteurs en les achetant.</p>
  ${levels.map((lv) => { const bs = library.filter((b) => b.level === lv.n); return bs.length ? `
    <h2 class="section"><span class="lv-badge sm" style="background:${lv.color}">${lv.n}</span> ${lv.name}</h2>
    ${bs.map((b) => `<div class="card book"><strong>${esc(b.title)}</strong><div class="small">${esc(b.author)}${b.year ? ` · ${b.year}` : ''} · ${b.lang}</div>
      <span class="tag small">${esc(b.theme)}</span><p class="muted small">${esc(b.note)}</p></div>`).join('')}` : ''; }).join('')}
  <h2 class="section">Clubs et associations</h2>
  ${resources.map((r) => `<div class="card book"><strong>${r.lang} ${esc(r.name)}</strong><div class="muted small">${esc(r.type)}</div></div>`).join('')}`;
}

function viewEthique() {
  return header('Charte éthique', '#/plus') + `<article class="card lesson">${lessonById.m1l3.content}</article>`;
}

function viewRangs() {
  const xp = store.get().xp;
  return header('Rangs', '#/plus') + `<p class="muted">Gagnez de l'XP en validant des leçons (+${XP_LESSON}, +${XP_PERFECT} si parfait), en révisant et en vous entraînant dans le Labo.</p>` +
    ranks.map((r) => `<div class="card module ${xp >= r.xp ? '' : 'disabled'}"><span class="mod-icon">${r.icon}</span><div class="mod-body"><strong>${r.name}</strong><div class="muted small">${r.xp} XP</div></div>${xp >= r.xp ? '✓' : ''}</div>`).join('');
}

function viewReglages() {
  const s = store.get();
  return header('Réglages', '#/plus') + `
  <section class="card">
    <label class="switch"><input type="checkbox" id="unlock" ${s.settings.unlockAll ? 'checked' : ''}> <span>Tout débloquer (pour les pratiquants déjà expérimentés)</span></label>
  </section>
  <section class="card">
    <h3>Sauvegarde</h3>
    <p class="muted small">Votre progression est enregistrée uniquement sur cet appareil. Exportez-la pour la transférer.</p>
    <button class="btn ghost" id="exp">⬇️ Exporter</button>
    <label class="btn ghost">⬆️ Importer<input type="file" id="imp" accept="application/json" hidden></label>
  </section>
  <section class="card"><h3>Zone dangereuse</h3><button class="btn danger" id="reset">Réinitialiser toute la progression</button></section>
  <p class="muted small center">Mentaliste · application d'apprentissage. Le mentalisme est un art du spectacle : aucune technique enseignée ici ne relève du surnaturel.</p>`;
}
function mountReglages() {
  view.querySelector('#unlock').onchange = (e) => { store.setSetting('unlockAll', e.target.checked); toast(e.target.checked ? 'Tous les niveaux sont débloqués' : 'Progression normale'); };
  view.querySelector('#exp').onclick = () => {
    const blob = new Blob([store.export()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `mentaliste-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  view.querySelector('#imp').onchange = async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try { store.import(await f.text()); toast('Progression importée'); route(); } catch { toast('Fichier invalide'); }
  };
  const r = view.querySelector('#reset');
  r.onclick = () => {
    if (r.dataset.confirm) { store.reset(); toast('Progression réinitialisée'); location.hash = '#/'; return; }
    r.dataset.confirm = '1';
    r.textContent = 'Appuyez à nouveau pour confirmer';
  };
}

function notFound() { return header('Introuvable', '#/') + '<p class="card">Cette page n’existe pas.</p>'; }

// ---------- Routeur ----------
function route() {
  const [path, query] = (location.hash.slice(1) || '/').split('?');
  const params = Object.fromEntries(new URLSearchParams(query || ''));
  const parts = path.split('/').filter(Boolean);
  const [a, b] = parts;
  document.querySelectorAll('.tabbar a').forEach((t) => t.classList.toggle('active', t.dataset.tab === (a || 'home') || (t.dataset.tab === 'parcours' && ['module', 'lecon', 'quiz'].includes(a)) || (t.dataset.tab === 'plus' && ['glossaire', 'bibliotheque', 'ethique', 'reglages', 'rangs'].includes(a))));
  window.scrollTo(0, 0);
  switch (a) {
    case undefined: view.innerHTML = viewHome(); break;
    case 'parcours': view.innerHTML = viewParcours(); break;
    case 'module': view.innerHTML = viewModule(b); break;
    case 'lecon': view.innerHTML = viewLesson(b); mountLesson(b); break;
    case 'quiz': if (lessonById[b] && isLevelUnlocked(lessonById[b].module.level)) mountQuiz(b); else view.innerHTML = notFound(); break;
    case 'revision': mountRevision(); break;
    case 'labo': if (b) { const t = tools.find((x) => x.id === b); if (t && !isLevelUnlocked(t.level)) { view.innerHTML = viewLabo(); toast('Outil encore verrouillé'); } else mountTool(b, params); } else view.innerHTML = viewLabo(); break;
    case 'plus': view.innerHTML = viewPlus(); break;
    case 'glossaire': view.innerHTML = viewGlossaire(); mountGlossaire(); break;
    case 'bibliotheque': view.innerHTML = viewBiblio(); break;
    case 'ethique': view.innerHTML = viewEthique(); break;
    case 'rangs': view.innerHTML = viewRangs(); break;
    case 'reglages': view.innerHTML = viewReglages(); mountReglages(); break;
    default: view.innerHTML = notFound();
  }
  view.focus({ preventScroll: true });
}

window.addEventListener('hashchange', route);
route();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
