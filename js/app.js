import { part1 } from './data/curriculum1.js';
import { part2 } from './data/curriculum2.js';
import { part3 } from './data/curriculum3.js';
import { phases, weeks } from './data/program.js';
import { ring, haptic, confetti, initSpotlight, initReadProgress } from './fx.js';
import { glossary } from './data/glossary.js';
import { library, resources } from './data/library.js';
import { store, rankFor, ranks } from './store.js';
import { tools } from './tools/index.js';
import { esc, shuffle, toast } from './util.js';
import { exercises } from './data/exercises.js';
import { sources, lessonSources } from './data/sources.js';
import { hearts, MAX_HEARTS, gainHeart, dailyGoal, todayXp, srsDue, srsStats, sound, say, MASCOT, BADGES, checkBadges, nextHeartIn } from './game.js';
import { playSession, buildLessonItems } from './player.js';

// Ordre du chemin d'apprentissage (identique à celui du programme de 52 semaines)
const ORDER = ['m1', 'm2', 'm3', 'm15', 'm4', 'm5', 'm6', 'm7', 'm8', 'm9', 'm16', 'm17', 'm10', 'm11', 'm18', 'm19', 'm12', 'm13', 'm14', 'm20'];
export const modules = [...part1, ...part2, ...part3].sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));
export const levels = [
  { n: 1, name: 'Débutant', sub: 'Fondations', color: '#34d399' },
  { n: 2, name: 'Apprenti', sub: 'Psychologie, observation, présence', color: '#22d3ee' },
  { n: 3, name: 'Praticien', sub: 'Techniques classiques', color: '#a78bfa' },
  { n: 4, name: 'Avancé', sub: 'Prouesses, cartes, duo, psychokinèse', color: '#fbbf24' },
  { n: 5, name: 'Expert', sub: 'Spectacle, création, métier', color: '#f472b6' },
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
function isLessonUnlocked(id) {
  if (store.get().settings.unlockAll) return true;
  const i = allLessons.findIndex((l) => l.id === id);
  return i <= 0 || store.isDone(allLessons[i - 1].id) || store.isDone(id);
}
function isLevelUnlocked(n) {
  if (n === 1 || store.get().settings.unlockAll) return true;
  const first = allLessons.find((l) => l.module.level === n);
  return first ? isLessonUnlocked(first.id) : false;
}
function moduleProgress(m) {
  const done = m.lessons.filter((l) => store.isDone(l.id)).length;
  return { done, total: m.lessons.length, pct: Math.round((done / m.lessons.length) * 100) };
}
function nextLesson() {
  return allLessons.find((l) => !store.isDone(l.id) && isLessonUnlocked(l.id));
}

// ---------- Composants ----------
const bar = (pct, color = 'var(--accent)') => `<div class="bar"><span style="width:${pct}%;background:${color}"></span></div>`;

function header(title, back) {
  return `<header class="page-head">${back ? `<a class="back" href="${back}" aria-label="Retour">←</a>` : ''}<h1>${title}</h1></header>`;
}

// ---------- Vues ----------
const DAYS_SHORT = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
function greeting() {
  const h = new Date().getHours();
  return h < 6 ? 'Bonne nuit' : h < 12 ? 'Bonjour' : h < 18 ? 'Bon après-midi' : 'Bonsoir';
}
function weekActivity() {
  const act = store.get().activity;
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(Date.now() - (6 - i) * 86400000);
    const k = d.toISOString().slice(0, 10);
    return { label: DAYS_SHORT[d.getDay()], xp: act[k] || 0, today: i === 6 };
  });
  const max = Math.max(30, ...days.map((d) => d.xp));
  return `<div class="week">${days.map((d) => `<div><i class="${d.xp ? '' : 'zero'} ${d.today ? 'today' : ''}" style="height:${Math.max(6, (d.xp / max) * 70)}px" title="${d.xp} XP"></i><span>${d.label}</span></div>`).join('')}</div>`;
}

function statsBar() {
  const s = store.get();
  const h = hearts();
  return `<div class="statsbar">
    <a href="#succes" class="stat" title="Série de jours"><span>🔥</span><b>${s.streak.count}</b></a>
    <a href="#rangs" class="stat" title="Points d'expérience"><span>⭐</span><b>${s.xp}</b></a>
    <a href="#revision" class="stat ${h !== Infinity && h < MAX_HEARTS ? 'low' : ''}" title="Cœurs"><span>❤️</span><b>${h === Infinity ? '∞' : h}</b></a>
  </div>`;
}

function viewHome() {
  const s = store.get();
  const r = rankFor(s.xp);
  const nl = nextLesson();
  const doneCount = Object.keys(s.completed).length;
  const goal = dailyGoal(), tx = todayXp();
  const goalPct = Math.min(100, Math.round((tx / goal) * 100));
  const cw = currentWeek();
  const wk = weeks[cw - 1];
  const ws = weekStatus(wk);
  const due = srsDue().length;
  const suggestions = shuffle(tools.filter((t) => isLevelUnlocked(t.level))).slice(0, 2);
  return `
  <header class="top"><div class="greet"><div class="muted">${greeting()} 👋</div><h1>Prêt à <span class="gradient-text">lire les esprits</span> ?</h1></div></header>
  ${statsBar()}
  <section class="card hero goal">
    <div class="rank-row">
      ${ring(goalPct, { size: 84, stroke: 9, label: goalPct >= 100 ? '🎯' : `${tx}` })}
      <div><div class="muted small">Objectif du jour</div><div class="rank-name">${tx} / ${goal} XP</div>
      <p class="mascot-say small">${MASCOT} ${goalPct >= 100 ? say('goal') : say('start')}</p></div>
    </div>
    ${nl ? `<a class="btn primary block big-cta" href="#jouer-${nl.id}">${doneCount ? '▶ Continuer' : '▶ Commencer'} · ${esc(nl.title)}</a>` : '<a class="btn primary block big-cta" href="#revision">🔁 Entraînement intelligent</a>'}
  </section>
  <div class="grid2 duo">
    <a class="card tool-card" href="#revision"><span class="tool-icon">🧠</span><strong>Entraînement</strong><span class="muted small">${due ? `${due} notion${due > 1 ? 's' : ''} à réviser` : 'Révision espacée de vos points faibles'}</span></a>
    <a class="card tool-card" href="#semaine-${cw}"><span class="tool-icon">📅</span><strong>Semaine ${cw}</strong><span class="muted small">${esc(wk.title)}</span>${bar(ws.pct)}</a>
  </div>
  <h2 class="section">Cette semaine</h2>
  <div class="card">${weekActivity()}</div>
  <h2 class="section">Votre rang</h2>
  <a class="card module" href="#rangs"><span class="mod-icon">${r.icon}</span><div class="mod-body"><strong>${r.name}</strong>
    <div class="muted small">${r.next ? `${r.next.xp - s.xp} XP avant « ${r.next.name} »` : 'Rang maximal atteint !'} · ${doneCount}/${allLessons.length} leçons</div>
    ${bar(r.next ? Math.round(((s.xp - r.xp) / (r.next.xp - r.xp)) * 100) : 100)}</div></a>
  <h2 class="section">Labo du jour</h2>
  <div class="grid2">
    ${suggestions.map((t) => `<a class="card tool-card" href="#labo-${t.id}"><span class="tool-icon">${t.icon}</span><strong>${t.name}</strong><span class="muted small">${t.desc}</span></a>`).join('')}
  </div>`;
}

// ---------- Programme 52 semaines ----------
const prog = () => store.getData('program', { start: null, weeks: {} });
function currentWeek() {
  const p = prog();
  if (p.manual) return p.manual;
  if (!p.start) return 1;
  const n = Math.floor((Date.now() - new Date(p.start).getTime()) / (7 * 86400000)) + 1;
  return Math.min(52, Math.max(1, n));
}
function weekStatus(wk) {
  const st = prog().weeks[wk.n] || {};
  const days = st.days || [];
  const daysDone = days.filter(Boolean).length;
  const lessonsDone = wk.lessons.filter((id) => store.isDone(id)).length;
  const parts = [daysDone / 7, wk.lessons.length ? lessonsDone / wk.lessons.length : 1, st.challenge ? 1 : 0];
  const pct = Math.round((parts.reduce((a, b) => a + b, 0) / 3) * 100);
  const done = daysDone >= 5 && lessonsDone === wk.lessons.length && !!st.challenge;
  return { days, daysDone, lessonsDone, challenge: !!st.challenge, pct, done };
}
function saveWeek(n, patch) {
  const p = prog();
  p.weeks[n] = { ...(p.weeks[n] || {}), ...patch };
  if (!p.start) p.start = new Date().toISOString().slice(0, 10);
  store.setData('program', p);
}

function viewProgramme() {
  const cw = currentWeek();
  const doneWeeks = weeks.filter((w) => weekStatus(w).done).length;
  const totalMin = weeks.reduce((a, w) => a + w.d.reduce((x, d) => x + d[1], 0) * 7, 0);
  return header('Programme 52 semaines') + `
  <section class="card hero">
    <div class="rank-row">${ring(Math.round((doneWeeks / 52) * 100), { size: 84, stroke: 8, label: `${doneWeeks}/52` })}
      <div><div class="rank-name">Une année pour devenir mentaliste</div>
      <div class="muted small">5 phases · 45 leçons · ${Math.round(totalMin / 60)} h de pratique guidée · 6 jalons de représentation</div></div></div>
    <p class="small muted">Chaque semaine : des leçons, une pratique quotidienne de 20 à 35 minutes et un défi concret. Une semaine est validée avec ses leçons, au moins 5 jours de pratique et le défi réussi.</p>
    <div class="row"><a class="btn primary" href="#semaine-${cw}">Semaine ${cw} →</a><button class="btn ghost" id="restart">${prog().start ? 'Recommencer à la semaine 1' : 'Démarrer aujourd’hui'}</button></div>
  </section>
  ${phases.map((ph) => `<section class="level">
    <div class="level-head"><span class="lv-badge" style="background:${ph.color}">${ph.n}</span>
      <div><h2>${esc(ph.name)}</h2><div class="muted small">Semaines ${ph.weeks[0]} à ${ph.weeks[1]} · ${esc(ph.goal)}</div></div></div>
    <div class="weeks-grid">${weeks.filter((w) => w.n >= ph.weeks[0] && w.n <= ph.weeks[1]).map((w) => { const st = weekStatus(w); return `
      <a class="week-cell ${st.done ? 'done' : ''} ${w.n === cw ? 'current' : ''} ${w.milestone ? 'milestone' : ''}" href="#semaine-${w.n}" style="--c:${ph.color}">
        <span class="wn">${st.done ? '✓' : w.n}</span><span class="wt">${esc(w.title)}</span>
        <span class="wbar"><i style="width:${st.pct}%"></i></span>
      </a>`; }).join('')}</div></section>`).join('')}`;
}
function mountProgramme() {
  const b = view.querySelector('#restart');
  b.onclick = () => {
    if (prog().start && !b.dataset.confirm) { b.dataset.confirm = '1'; b.textContent = 'Confirmer (la progression des semaines sera effacée)'; return; }
    store.setData('program', { start: new Date().toISOString().slice(0, 10), weeks: {} });
    toast('Programme démarré : semaine 1 !');
    route();
  };
}

function viewWeek(n) {
  const wk = weeks[n - 1];
  if (!wk) return notFound();
  const ph = phases.find((p) => n >= p.weeks[0] && n <= p.weeks[1]);
  const st = weekStatus(wk);
  const t = tools;
  const dayLabels = ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J7'];
  const daily = wk.d.reduce((a, d) => a + d[1], 0);
  return header(`Semaine ${n}`, '#programme') + `
  <div class="muted small crumbs">Phase ${ph.n} · ${esc(ph.name)}${wk.milestone ? ' · 🎯 Semaine jalon' : ''}</div>
  <section class="card hero">
    <div class="rank-row">${ring(st.pct, { size: 76, stroke: 8, color: ph.color, label: `${st.pct}%` })}
    <div><div class="rank-name">${esc(wk.title)}</div><div class="muted small">${esc(wk.focus)}</div></div></div>
  </section>
  ${wk.lessons.length ? `<h2 class="section">Leçons</h2>${wk.lessons.map((id) => { const l = lessonById[id]; const d = store.isDone(id); return `
    <a class="card lesson-item ${d ? 'done' : ''}" href="#lecon-${id}"><span class="num">${d ? '✓' : '•'}</span>
      <div><strong>${esc(l.title)}</strong><div class="muted small">${l.module.icon} ${esc(l.module.title)} · ${l.duration} min</div></div></a>`; }).join('')}`
    : '<h2 class="section">Leçons</h2><p class="card muted small">Semaine de consolidation : pas de nouvelle leçon, place à la pratique.</p>'}
  <h2 class="section">Pratique quotidienne · ${daily} min</h2>
  <section class="card">
    ${wk.d.map(([tool, min, what]) => { const tt = tool && t.find((x) => x.id === tool); return `
      <div class="drill">${tt ? `<a class="tool-icon" href="#labo-${tool}" title="${esc(tt.name)}">${tt.icon}</a>` : '<span class="tool-icon">🏋️</span>'}
        <div><strong>${min} min</strong>${tt ? ` · <a href="#labo-${tool}">${esc(tt.name)}</a>` : ''}<div class="muted small">${esc(what)}</div></div></div>`; }).join('')}
    <div class="days">${dayLabels.map((d, i) => `<button class="day ${st.days[i] ? 'on' : ''}" data-day="${i}" aria-pressed="${!!st.days[i]}">${st.days[i] ? '✓' : d}</button>`).join('')}</div>
    <p class="muted small center">Cochez chaque jour de pratique (5 jours minimum pour valider la semaine).</p>
  </section>
  <h2 class="section">Défi de la semaine</h2>
  <label class="card challenge ${st.challenge ? 'on' : ''}"><input type="checkbox" id="chal" ${st.challenge ? 'checked' : ''}><span>${esc(wk.challenge)}</span></label>
  <div class="row between">
    ${n > 1 ? `<a class="btn ghost" href="#semaine-${n - 1}">← S${n - 1}</a>` : '<span></span>'}
    <button class="btn ghost small" id="setcur">${currentWeek() === n ? '📍 Semaine en cours' : 'Définir comme semaine en cours'}</button>
    ${n < 52 ? `<a class="btn ghost" href="#semaine-${n + 1}">S${n + 1} →</a>` : '<span></span>'}
  </div>`;
}
function mountWeek(n) {
  const wk = weeks[n - 1];
  if (!wk) return;
  const before = weekStatus(wk).done;
  const after = () => {
    const now = weekStatus(wk).done;
    if (!before && now) { const prev = store.get().xp; saveWeek(n, { validated: true }); store.addXp(30); confetti(); sound('done'); toast(`Semaine ${n} validée ! +30 XP`, 3500); afterProgress(prev); }
    route();
  };
  view.querySelectorAll('[data-day]').forEach((b) => (b.onclick = () => {
    const days = [...(prog().weeks[n]?.days || [])];
    const i = Number(b.dataset.day);
    days[i] = !days[i];
    haptic();
    if (days[i]) store.addXp(5);
    saveWeek(n, { days });
    after();
  }));
  view.querySelector('#chal').onchange = (e) => { haptic(); saveWeek(n, { challenge: e.target.checked }); after(); };
  view.querySelector('#setcur').onclick = () => {
    const p = prog();
    if (!p.start) p.start = new Date().toISOString().slice(0, 10);
    p.manual = n;
    store.setData('program', p);
    toast(`Semaine ${n} définie comme semaine en cours`);
    route();
  };
}

const ZIG = [0, 56, 84, 56, 0, -56, -84, -56];
function viewParcours() {
  const next = nextLesson();
  let k = 0;
  let lastLevel = 0;
  return statsBar() + modules.map((m, mi) => {
    const lv = levels[m.level - 1];
    const mp = moduleProgress(m);
    const levelBanner = m.level !== lastLevel ? `<div class="level-banner" style="--c:${lv.color}"><span>Niveau ${lv.n}</span><strong>${lv.name}</strong><em>${lv.sub}</em></div>` : '';
    lastLevel = m.level;
    return `${levelBanner}<section class="unit" style="--c:${lv.color}">
      <a class="unit-head" href="#module-${m.id}"><div><div class="small">Unité ${mi + 1} · ${mp.done}/${mp.total}</div><strong>${m.icon} ${esc(m.title)}</strong></div><span class="unit-guide" title="Guide de l'unité">📖</span></a>
      <div class="path">${m.lessons.map((l) => {
        const done = store.isDone(l.id), unlocked = isLessonUnlocked(l.id), cur = next && next.id === l.id;
        const x = ZIG[k++ % ZIG.length];
        return `<div class="node-wrap" style="transform:translateX(${x}px)">
          ${cur ? '<div class="node-tip">COMMENCER</div>' : ''}
          <a class="node ${done ? 'done' : ''} ${cur ? 'current' : ''} ${unlocked ? '' : 'locked'}" href="${unlocked ? `#lecon-${l.id}` : '#parcours'}" aria-label="${esc(l.title)}">${done ? '✓' : unlocked ? (cur ? '★' : m.icon) : '🔒'}</a>
          <div class="node-label">${esc(l.title)}</div></div>`;
      }).join('')}</div></section>`;
  }).join('') + `<div class="path-end">🏆<div class="muted small">Le titre de Maître mentaliste vous attend au bout du chemin.</div></div>`;
}

function viewModule(id) {
  const m = moduleById[id];
  if (!m) return notFound();
  const lv = levels[m.level - 1];
  return header(`${m.icon} ${esc(m.title)}`, '#parcours') + `
    <p class="muted">Niveau ${m.level} · ${lv.name} — ${esc(m.summary)}</p>
    <ol class="lesson-list">
      ${m.lessons.map((l, i) => { const d = store.get().completed[l.id]; const u = isLessonUnlocked(l.id); return `
        <li><a class="card lesson-item ${d ? 'done' : ''} ${u ? '' : 'disabled'}" href="#lecon-${l.id}">
          <span class="num">${d ? '✓' : u ? i + 1 : '🔒'}</span>
          <div><strong>${esc(l.title)}</strong><div class="muted small">≈ ${lessonMinutes(l)} min · ${lessonExCount(l)} exercices${d ? ` · précision ${d.score} %` : ''}</div></div>
        </a></li>`; }).join('')}
    </ol>`;
}

const lessonExCount = (l) => l.quiz.length + (exercises[l.id] || []).length;
const lessonMinutes = (l) => Math.max(4, Math.round(lessonExCount(l) * 0.6 + l.content.length / 1400));

function sourcesHtml(id) {
  const ids = lessonSources[id] || [];
  if (!ids.length) return '';
  return `<details class="card sources"><summary>📚 Sources de cette leçon (${ids.length})</summary><ul>${ids.map((k) => sources[k] ? `<li><span class="tag">${sources[k].kind}</span> ${esc(sources[k].ref)}</li>` : '').join('')}</ul></details>`;
}

function viewLesson(id) {
  const l = lessonById[id];
  if (!l) return notFound();
  if (!isLessonUnlocked(id)) return header('Verrouillé', '#parcours') + `<p class="card">Terminez d'abord la leçon précédente du chemin (ou activez « Tout débloquer » dans Réglages).</p>`;
  const m = l.module;
  const d = store.get().completed[id];
  return header(esc(l.title), '#parcours') + `
    <section class="card hero lesson-intro">
      <div class="muted small">${m.icon} ${esc(m.title)} · Niveau ${m.level}</div>
      <div class="intro-stats"><span>⏱️ ≈ ${lessonMinutes(l)} min</span><span>🧩 ${lessonExCount(l)} exercices</span><span>⭐ +${d ? 10 : XP_LESSON} XP</span></div>
      <a class="btn primary block big-cta" href="#jouer-${id}">${d ? '🔁 Refaire la leçon' : '▶ Commencer la leçon'}</a>
      ${d ? `<div class="muted small center">Déjà terminée · précision ${d.score} %</div>` : ''}
    </section>
    <section class="card exercise"><h3>🏋️ Mission pratique</h3><p>${esc(l.exercise)}</p>
      <button class="btn ghost" data-journal="${l.id}">📓 Noter ma pratique dans le journal</button></section>
    <details class="card fiche"><summary>📖 Lire la fiche complète</summary><article class="lesson">${l.content}</article>
      <h3>📌 À retenir</h3><ul>${l.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></details>
    ${sourcesHtml(id)}`;
}

function mountLesson(id) {
  const btn = view.querySelector('[data-journal]');
  if (btn) btn.onclick = () => { try { sessionStorage.setItem('journalPrefill', lessonById[id].title); } catch { /* indisponible */ } location.hash = '#labo-journal'; };
}

function endScreen({ title, xp, accuracy, maxCombo, extra = '', actions }) {
  const perfect = accuracy === 100;
  return `<section class="card result center end">
    <div class="big">${perfect ? '💎' : accuracy >= 70 ? '🎉' : '💪'}</div>
    <h2>${esc(title)}</h2>
    <p class="mascot-say">${MASCOT} ${perfect ? say('perfect') : say('good')}</p>
    <div class="end-stats">
      <div class="es xp"><span>XP gagnés</span><b>+${xp}</b></div>
      <div class="es acc"><span>Précision</span><b>${accuracy} %</b></div>
      <div class="es combo"><span>Meilleure série</span><b>🔥 ${maxCombo}</b></div>
    </div>
    ${extra}${actions}</section>`;
}

function afterProgress(prevXp) {
  checkRankUp(prevXp);
  const goal = dailyGoal();
  const before = (store.get().activity[new Date().toISOString().slice(0, 10)] || 0) - (store.get().xp - prevXp);
  if (before < goal && todayXp() >= goal) setTimeout(() => { confetti(); toast('🎯 Objectif du jour atteint !', 3500); }, 600);
  checkBadges().forEach((b, i) => setTimeout(() => toast(`${b.icon} Succès débloqué : ${b.name}`, 3500), 1400 + i * 1800));
}

function mountPlay(id) {
  const l = lessonById[id];
  if (!l || !isLessonUnlocked(id)) { view.innerHTML = notFound(); return; }
  if (hearts() === 0) { location.hash = `#lecon-${id}`; toast('Plus de cœurs : entraînez-vous pour en regagner'); return; }
  playSession(view, {
    title: l.title,
    items: buildLessonItems(l, exercises[id] || []),
    onQuit: () => { location.hash = `#lecon-${id}`; },
    onFinish: ({ accuracy, maxCombo }) => {
      const prev = store.get().xp;
      const first = store.completeLesson(id, accuracy);
      const xp = first ? XP_LESSON + (accuracy === 100 ? XP_PERFECT : 0) : 10;
      store.addXp(xp);
      sound('done'); confetti();
      const nxt = allLessons[allLessons.findIndex((x) => x.id === id) + 1];
      view.innerHTML = endScreen({
        title: first ? 'Leçon terminée !' : 'Leçon révisée !', xp, accuracy, maxCombo,
        extra: `<div class="card mission"><strong>🏋️ Mission pratique</strong><p class="small">${esc(l.exercise)}</p></div>`,
        actions: `${nxt ? `<a class="btn primary block" href="#jouer-${nxt.id}">Leçon suivante →</a>` : ''}<a class="btn ghost block" href="#parcours">Retour au chemin</a>`,
      });
      afterProgress(prev);
    },
  });
}

function checkRankUp(prevXp) {
  const before = rankFor(prevXp).name, after = rankFor(store.get().xp);
  if (before !== after.name) toast(`${after.icon} Nouveau rang : ${after.name} !`, 4000);
}

// Entraînement intelligent : répétition espacée sur les points faibles
function allExerciseItems() {
  const map = {};
  allLessons.forEach((l) => {
    l.quiz.forEach((q, i) => (map[`${l.id}:q${i}`] = { kind: 'ex', id: `${l.id}:q${i}`, ex: { t: 'mcq', ...q }, lesson: l.id }));
    (exercises[l.id] || []).forEach((x, i) => (map[`${l.id}:x${i}`] = { kind: 'ex', id: `${l.id}:x${i}`, ex: x, lesson: l.id }));
  });
  return map;
}
function viewRevisionIntro() {
  const st = srsStats();
  const h = hearts();
  return header('Entraînement intelligent', '#accueil') + `
  <section class="card hero center">
    <div class="big-emoji">🧠</div>
    <h2>Révisez au bon moment</h2>
    <p class="muted small">L'entraînement choisit d'abord les notions que vous risquez d'oublier, selon la répétition espacée (Cepeda et al., 2006). Se tester est plus efficace que relire (Roediger et Karpicke, 2006).</p>
    <div class="end-stats">
      <div class="es"><span>À réviser</span><b>${st.due}</b></div>
      <div class="es"><span>Maîtrisées</span><b>${st.mastered}</b></div>
      <div class="es"><span>Cœurs</span><b>${h === Infinity ? '∞' : h}/${MAX_HEARTS}</b></div>
    </div>
    <button class="btn primary block big-cta" id="go">▶ Lancer 10 exercices</button>
    <p class="muted small">Terminer un entraînement rend un cœur ❤️.${h !== Infinity && h < MAX_HEARTS ? ` Prochain cœur automatique dans ${Math.ceil(nextHeartIn() / 60000)} min.` : ''}</p>
  </section>`;
}
function mountRevision() {
  view.innerHTML = viewRevisionIntro();
  view.querySelector('#go').onclick = startPractice;
}
function startPractice() {
  const map = allExerciseItems();
  const done = allLessons.filter((l) => store.isDone(l.id)).map((l) => l.id);
  const pool = done.length ? done : allLessons.slice(0, 2).map((l) => l.id);
  const due = srsDue().filter((k) => map[k] && pool.includes(map[k].lesson));
  const rest = shuffle(Object.values(map).filter((x) => pool.includes(x.lesson) && !due.includes(x.id)));
  const items = [...due.slice(0, 10).map((k) => map[k]), ...rest].slice(0, 10);
  playSession(view, {
    title: 'Entraînement',
    items: shuffle(items),
    onQuit: () => { location.hash = '#accueil'; },
    onFinish: ({ accuracy, maxCombo }) => {
      const prev = store.get().xp;
      const xp = 5 + Math.round(accuracy / 10);
      store.addXp(xp);
      store.recordTool('revision', accuracy);
      gainHeart(1);
      sound('done'); if (accuracy >= 80) confetti();
      view.innerHTML = endScreen({ title: 'Entraînement terminé !', xp, accuracy, maxCombo, extra: '<p class="small">❤️ +1 cœur récupéré</p>',
        actions: '<button class="btn primary block" id="again">Encore 10 exercices</button><a class="btn ghost block" href="#accueil">Accueil</a>' });
      view.querySelector('#again').onclick = startPractice;
      afterProgress(prev);
    },
  });
}

// ---------- Labo ----------
function viewLabo() {
  const st = store.get().toolStats;
  return header('Labo d’entraînement') + `<p class="muted">Des exercices interactifs pour transformer la théorie en vraies compétences. Chaque session rapporte de l'XP.</p>
  <div class="grid2">${tools.map((t) => { const u = isLevelUnlocked(t.level); const s = st[t.id]; return `
    <a class="card tool-card ${u ? '' : 'disabled'}" href="${u ? `#labo-${t.id}` : '#labo'}">
      <span class="tool-icon">${u ? t.icon : '🔒'}</span><strong>${t.name}</strong>
      <span class="muted small">${t.desc}</span>
      <span class="small tag">Niv. ${t.level}${s ? ` · ${s.sessions} session${s.sessions > 1 ? 's' : ''}` : ''}</span>
    </a>`; }).join('')}</div>`;
}

function mountTool(id, params) {
  const t = tools.find((x) => x.id === id);
  if (!t) { view.innerHTML = notFound(); return; }
  view.innerHTML = header(`${t.icon} ${t.name}`, '#labo') + `<div id="tool"></div>`;
  t.mount(view.querySelector('#tool'), {
    params,
    finish(score, xp = 10) {
      const prev = store.get().xp;
      const s = store.recordTool(id, score);
      if (xp > 0) { store.addXp(xp); toast(`+${xp} XP`); afterProgress(prev); }
      return s;
    },
    stats: () => store.get().toolStats[id],
  });
}

// ---------- Plus ----------
function viewPlus() {
  const items = [
    ['#revision', '🧠', 'Entraînement intelligent', 'Répétition espacée de vos points faibles'],
    ['#succes', '🏅', 'Succès', 'Vos badges et récompenses'],
    ['#sources', '🔬', 'Sources et méthode', 'Les études et ouvrages de référence utilisés'],
    ['#glossaire', '🌍', 'Glossaire multilingue', 'Les termes du métier en français, anglais, allemand et espagnol'],
    ['#bibliotheque', '📚', 'Bibliothèque', 'Les ouvrages de référence du monde entier, par niveau'],
    ['#ethique', '⚖️', 'Charte éthique', 'Les règles du mentaliste responsable'],
    ['#rangs', '🏅', 'Rangs', 'Les étapes de votre progression'],
    ['#reglages', '⚙️', 'Réglages', 'Sauvegarde, import, réinitialisation'],
  ];
  return header('Plus') + items.map(([h, i, t, d]) => `<a class="card module" href="${h}"><span class="mod-icon">${i}</span><div class="mod-body"><strong>${t}</strong><div class="muted small">${d}</div></div></a>`).join('');
}

function viewGlossaire() {
  return header('Glossaire multilingue', '#plus') + `
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
  return header('Bibliothèque', '#plus') + `<p class="muted">Une sélection internationale. Les livres de magie sont la meilleure source : soutenez leurs auteurs en les achetant.</p>
  ${levels.map((lv) => { const bs = library.filter((b) => b.level === lv.n); return bs.length ? `
    <h2 class="section"><span class="lv-badge sm" style="background:${lv.color}">${lv.n}</span> ${lv.name}</h2>
    ${bs.map((b) => `<div class="card book"><strong>${esc(b.title)}</strong><div class="small">${esc(b.author)}${b.year ? ` · ${b.year}` : ''} · ${b.lang}</div>
      <span class="tag small">${esc(b.theme)}</span><p class="muted small">${esc(b.note)}</p></div>`).join('')}` : ''; }).join('')}
  <h2 class="section">Clubs et associations</h2>
  ${resources.map((r) => `<div class="card book"><strong>${r.lang} ${esc(r.name)}</strong><div class="muted small">${esc(r.type)}</div></div>`).join('')}`;
}

function viewEthique() {
  return header('Charte éthique', '#plus') + `<article class="card lesson">${lessonById.m1l3.content}</article>`;
}

function viewRangs() {
  const xp = store.get().xp;
  return header('Rangs', '#plus') + `<p class="muted">Gagnez de l'XP en validant des leçons (+${XP_LESSON}, +${XP_PERFECT} si parfait), en révisant et en vous entraînant dans le Labo.</p>` +
    ranks.map((r) => `<div class="card module ${xp >= r.xp ? '' : 'disabled'}"><span class="mod-icon">${r.icon}</span><div class="mod-body"><strong>${r.name}</strong><div class="muted small">${r.xp} XP</div></div>${xp >= r.xp ? '✓' : ''}</div>`).join('');
}

function viewSucces() {
  const got = store.getData('badges', {});
  const n = Object.keys(got).length;
  return header('Succès', '#plus') + `<p class="muted">${n}/${BADGES.length} succès débloqués</p>
  <div class="badges">${BADGES.map((b) => `<div class="badge ${got[b.id] ? 'on' : ''}"><span>${got[b.id] ? b.icon : '🔒'}</span><strong>${b.name}</strong><em>${b.desc}</em></div>`).join('')}</div>`;
}

function viewSources() {
  const kinds = ['Étude', 'Article', 'Livre'];
  const labels = { Étude: 'Études scientifiques (revues à comité de lecture)', Article: 'Articles historiques', Livre: 'Ouvrages de référence' };
  return header('Sources et méthode', '#plus') + `
  <section class="card lesson"><h3>Comment l'application vous fait progresser</h3>
    <ul><li><strong>Leçons courtes</strong> : de petites cartes et des exercices intercalés, pour apprendre en 5 minutes.</li>
    <li><strong>Récupération active</strong> : se tester fait mieux retenir que relire (Roediger et Karpicke, 2006).</li>
    <li><strong>Répétition espacée</strong> : l'entraînement vous repose les notions juste avant que vous les oubliiez (Cepeda et al., 2006).</li>
    <li><strong>Pratique réelle</strong> : chaque leçon a une mission à faire dans la vraie vie, et le programme prévoit 6 jalons de représentation.</li></ul></section>
  ${kinds.map((k) => `<h2 class="section">${labels[k]}</h2><div class="card"><ul class="refs">${Object.values(sources).filter((x) => x.kind === k).map((x) => `<li>${esc(x.ref)}</li>`).join('')}</ul></div>`).join('')}`;
}

function viewReglages() {
  const s = store.get();
  return header('Réglages', '#plus') + `
  <section class="card">
    <h3>Objectif quotidien</h3>
    <div class="goal-pick">${[[10, 'Détente', '≈ 5 min'], [20, 'Régulier', '≈ 10 min'], [30, 'Sérieux', '≈ 15 min'], [50, 'Intense', '≈ 25 min']].map(([v, n, t]) => `<button class="choice ${dailyGoal() === v ? 'sel' : ''}" data-goal="${v}"><strong>${n}</strong><span class="small muted">${v} XP · ${t}</span></button>`).join('')}</div>
  </section>
  <section class="card stack-gap">
    <label class="switch"><input type="checkbox" id="sound" ${s.settings.sound === false ? '' : 'checked'}> <span>Sons</span></label>
    <label class="switch"><input type="checkbox" id="zen" ${s.settings.zen ? 'checked' : ''}> <span>Mode zen : cœurs illimités</span></label>
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
  view.querySelectorAll('[data-goal]').forEach((b) => (b.onclick = () => { store.setSetting('dailyGoal', Number(b.dataset.goal)); toast('Objectif quotidien mis à jour'); route(); }));
  view.querySelector('#sound').onchange = (e) => { store.setSetting('sound', e.target.checked); if (e.target.checked) sound('ok'); };
  view.querySelector('#zen').onchange = (e) => { store.setSetting('zen', e.target.checked); toast(e.target.checked ? 'Mode zen activé' : 'Cœurs réactivés'); };
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
    if (r.dataset.confirm) { store.reset(); toast('Progression réinitialisée'); location.hash = '#accueil'; return; }
    r.dataset.confirm = '1';
    r.textContent = 'Appuyez à nouveau pour confirmer';
  };
}

function notFound() { return header('Introuvable', '#accueil') + '<p class="card">Cette page n’existe pas.</p>'; }

// ---------- Routeur ----------
function route() {
  // Routes simples (#parcours, #lecon-m1l1) compatibles avec l'hébergement en artefact ; anciens liens #/x/y acceptés
  const raw = location.hash.replace(/^#\/?/, '').split('?')[0];
  const params = {};
  let [a, ...rest] = raw.split(/[-/]/).filter(Boolean);
  let b = rest.join('-') || undefined;
  if (a === 'accueil') a = undefined;
  document.querySelectorAll('.tabbar a').forEach((t) => t.classList.toggle('active', t.dataset.tab === (a || 'home') || (t.dataset.tab === 'parcours' && ['module', 'lecon', 'quiz', 'jouer'].includes(a)) || (t.dataset.tab === 'programme' && a === 'semaine') || (t.dataset.tab === 'plus' && ['glossaire', 'bibliotheque', 'ethique', 'reglages', 'rangs', 'revision', 'succes', 'sources'].includes(a))));
  window.scrollTo(0, 0);
  document.body.classList.remove('playing');
  switch (a) {
    case undefined: view.innerHTML = viewHome(); break;
    case 'parcours': view.innerHTML = viewParcours(); break;
    case 'programme': view.innerHTML = viewProgramme(); mountProgramme(); break;
    case 'semaine': view.innerHTML = viewWeek(Number(b)); mountWeek(Number(b)); break;
    case 'module': view.innerHTML = viewModule(b); break;
    case 'lecon': view.innerHTML = viewLesson(b); mountLesson(b); break;
    case 'quiz':
    case 'jouer': mountPlay(b); break;
    case 'revision': mountRevision(); break;
    case 'succes': view.innerHTML = viewSucces(); break;
    case 'sources': view.innerHTML = viewSources(); break;
    case 'labo': if (b) { const t = tools.find((x) => x.id === b); if (t && !isLevelUnlocked(t.level)) { view.innerHTML = viewLabo(); toast('Outil encore verrouillé'); } else mountTool(b, params); } else view.innerHTML = viewLabo(); break;
    case 'plus': view.innerHTML = viewPlus(); break;
    case 'glossaire': view.innerHTML = viewGlossaire(); mountGlossaire(); break;
    case 'bibliotheque': view.innerHTML = viewBiblio(); break;
    case 'ethique': view.innerHTML = viewEthique(); break;
    case 'rangs': view.innerHTML = viewRangs(); break;
    case 'reglages': view.innerHTML = viewReglages(); mountReglages(); break;
    default: view.innerHTML = notFound();
  }
  view.classList.remove('enter');
  void view.offsetWidth;
  view.classList.add('enter');
  view.focus({ preventScroll: true });
}

window.addEventListener('hashchange', route);
initSpotlight();
initReadProgress();
route();

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}
