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

export const modules = [...part1, ...part2, ...part3].sort((a, b) => a.level - b.level);
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

function viewHome() {
  const s = store.get();
  const r = rankFor(s.xp);
  const nl = nextLesson();
  const pctRank = r.next ? Math.round(((s.xp - r.xp) / (r.next.xp - r.xp)) * 100) : 100;
  const doneCount = Object.keys(s.completed).length;
  const suggestions = shuffle(tools.filter((t) => isLevelUnlocked(t.level))).slice(0, 2);
  const cw = currentWeek();
  const wk = weeks[cw - 1];
  const ws = weekStatus(wk);
  const ph = phases.find((p) => cw >= p.weeks[0] && cw <= p.weeks[1]);
  return `
  <header class="top">
    <div class="greet"><div class="muted">${greeting()} 👋</div><h1>Prêt à <span class="gradient-text">lire les esprits</span> ?</h1></div>
    <a class="avatar" href="#/rangs" aria-label="Rangs">${r.icon}</a>
  </header>
  <section class="card hero">
    <div class="rank-row">
      ${ring(pctRank, { size: 84, stroke: 8, label: `${pctRank}%` })}
      <div><div class="muted small">Votre rang</div><div class="rank-name">${r.name}</div>
      <div class="muted small">${r.next ? `${r.next.xp - s.xp} XP avant « ${r.next.name} »` : 'Rang maximal atteint !'}</div></div>
    </div>
    <div class="chips">
      <span class="chip">⭐ <b>${s.xp}</b> XP</span>
      <span class="chip">🔥 <b>${s.streak.count}</b> jour${s.streak.count > 1 ? 's' : ''}</span>
      <span class="chip">📚 <b>${doneCount}</b>/${allLessons.length}</span>
    </div>
  </section>
  <a class="card continue" href="#/semaine/${cw}">
    <div class="muted small">Programme 52 semaines · Phase ${ph.n} · ${esc(ph.name)}</div>
    <strong>Semaine ${cw} : ${esc(wk.title)}</strong>
    ${bar(ws.pct)}
    <div class="row between"><span class="muted small">${ws.daysDone}/7 jours de pratique · ${ws.lessonsDone}/${wk.lessons.length} leçon${wk.lessons.length > 1 ? 's' : ''}</span><span class="pill">Ouvrir →</span></div>
  </a>
  ${nl ? `<a class="card module" href="#/lecon/${nl.id}">
      <span class="mod-icon">${nl.module.icon}</span>
      <div class="mod-body"><div class="muted small">${doneCount ? 'Prochaine leçon' : 'Première leçon'} · Niveau ${nl.module.level}</div><strong>${esc(nl.title)}</strong></div>
      <span class="tag">${nl.duration} min</span>
    </a>` : `<div class="card"><strong>🏆 Vous avez terminé tout le parcours !</strong><div class="muted small">Continuez à vous entraîner dans le Labo et en révision.</div></div>`}
  <h2 class="section">Cette semaine</h2>
  <div class="card">${weekActivity()}</div>
  <h2 class="section">Niveaux</h2>
  <div class="levels-mini">
    ${levels.map((lv) => { const p = levelProgress(lv.n); const u = isLevelUnlocked(lv.n); return `
      <a class="card lv-mini ${u ? '' : 'locked'}" href="#/parcours">
        ${ring(p.pct, { size: 56, stroke: 6, color: lv.color, label: u ? String(lv.n) : '🔒' })}
        <strong>${lv.name}</strong><span class="muted small">${p.done}/${p.total} leçons</span>
      </a>`; }).join('')}
  </div>
  <h2 class="section">Entraînement du jour</h2>
  <div class="grid2">
    ${suggestions.map((t) => `<a class="card tool-card" href="#/labo/${t.id}"><span class="tool-icon">${t.icon}</span><strong>${t.name}</strong><span class="muted small">${t.desc}</span></a>`).join('')}
  </div>
  <a class="card review-cta" href="#/revision"><span class="tool-icon">🔁</span><div><strong>Révision express</strong><div class="muted small">10 questions tirées des leçons terminées</div></div></a>
  `;
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
    <div class="row"><a class="btn primary" href="#/semaine/${cw}">Semaine ${cw} →</a><button class="btn ghost" id="restart">${prog().start ? 'Recommencer à la semaine 1' : 'Démarrer aujourd’hui'}</button></div>
  </section>
  ${phases.map((ph) => `<section class="level">
    <div class="level-head"><span class="lv-badge" style="background:${ph.color}">${ph.n}</span>
      <div><h2>${esc(ph.name)}</h2><div class="muted small">Semaines ${ph.weeks[0]} à ${ph.weeks[1]} · ${esc(ph.goal)}</div></div></div>
    <div class="weeks-grid">${weeks.filter((w) => w.n >= ph.weeks[0] && w.n <= ph.weeks[1]).map((w) => { const st = weekStatus(w); return `
      <a class="week-cell ${st.done ? 'done' : ''} ${w.n === cw ? 'current' : ''} ${w.milestone ? 'milestone' : ''}" href="#/semaine/${w.n}" style="--c:${ph.color}">
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
  return header(`Semaine ${n}`, '#/programme') + `
  <div class="muted small crumbs">Phase ${ph.n} · ${esc(ph.name)}${wk.milestone ? ' · 🎯 Semaine jalon' : ''}</div>
  <section class="card hero">
    <div class="rank-row">${ring(st.pct, { size: 76, stroke: 8, color: ph.color, label: `${st.pct}%` })}
    <div><div class="rank-name">${esc(wk.title)}</div><div class="muted small">${esc(wk.focus)}</div></div></div>
  </section>
  ${wk.lessons.length ? `<h2 class="section">Leçons</h2>${wk.lessons.map((id) => { const l = lessonById[id]; const d = store.isDone(id); return `
    <a class="card lesson-item ${d ? 'done' : ''}" href="#/lecon/${id}"><span class="num">${d ? '✓' : '•'}</span>
      <div><strong>${esc(l.title)}</strong><div class="muted small">${l.module.icon} ${esc(l.module.title)} · ${l.duration} min</div></div></a>`; }).join('')}`
    : '<h2 class="section">Leçons</h2><p class="card muted small">Semaine de consolidation : pas de nouvelle leçon, place à la pratique.</p>'}
  <h2 class="section">Pratique quotidienne · ${daily} min</h2>
  <section class="card">
    ${wk.d.map(([tool, min, what]) => { const tt = tool && t.find((x) => x.id === tool); return `
      <div class="drill">${tt ? `<a class="tool-icon" href="#/labo/${tool}" title="${esc(tt.name)}">${tt.icon}</a>` : '<span class="tool-icon">🏋️</span>'}
        <div><strong>${min} min</strong>${tt ? ` · <a href="#/labo/${tool}">${esc(tt.name)}</a>` : ''}<div class="muted small">${esc(what)}</div></div></div>`; }).join('')}
    <div class="days">${dayLabels.map((d, i) => `<button class="day ${st.days[i] ? 'on' : ''}" data-day="${i}" aria-pressed="${!!st.days[i]}">${st.days[i] ? '✓' : d}</button>`).join('')}</div>
    <p class="muted small center">Cochez chaque jour de pratique (5 jours minimum pour valider la semaine).</p>
  </section>
  <h2 class="section">Défi de la semaine</h2>
  <label class="card challenge ${st.challenge ? 'on' : ''}"><input type="checkbox" id="chal" ${st.challenge ? 'checked' : ''}><span>${esc(wk.challenge)}</span></label>
  <div class="row between">
    ${n > 1 ? `<a class="btn ghost" href="#/semaine/${n - 1}">← S${n - 1}</a>` : '<span></span>'}
    <button class="btn ghost small" id="setcur">${currentWeek() === n ? '📍 Semaine en cours' : 'Définir comme semaine en cours'}</button>
    ${n < 52 ? `<a class="btn ghost" href="#/semaine/${n + 1}">S${n + 1} →</a>` : '<span></span>'}
  </div>`;
}
function mountWeek(n) {
  const wk = weeks[n - 1];
  if (!wk) return;
  const before = weekStatus(wk).done;
  const after = () => {
    const now = weekStatus(wk).done;
    if (!before && now) { const prev = store.get().xp; store.addXp(30); confetti(); toast(`Semaine ${n} validée ! +30 XP`, 3500); checkRankUp(prev); }
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

function viewParcours() {
  return header('Parcours') + levels.map((lv) => {
    const u = isLevelUnlocked(lv.n);
    const p = levelProgress(lv.n);
    const mods = modules.filter((m) => m.level === lv.n);
    return `<section class="level ${u ? '' : 'locked'}">
      <div class="level-head"><span class="lv-badge" style="background:${lv.color}">${lv.n}</span>
        <div><h2>Niveau ${lv.n} · ${lv.name}</h2><div class="muted small">${lv.sub} · ${p.done}/${p.total} leçons</div></div>${ring(p.pct, { size: 48, stroke: 5, color: lv.color, label: `${p.pct}` })}</div>
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
        haptic(ok ? 'ok' : 'ko');
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
        if (first) { confetti(); checkRankUp(store.get().xp - xp); }
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
    ['#/revision', '🔁', 'Révision express', '10 questions tirées des leçons terminées'],
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
  document.querySelectorAll('.tabbar a').forEach((t) => t.classList.toggle('active', t.dataset.tab === (a || 'home') || (t.dataset.tab === 'parcours' && ['module', 'lecon', 'quiz'].includes(a)) || (t.dataset.tab === 'programme' && a === 'semaine') || (t.dataset.tab === 'plus' && ['glossaire', 'bibliotheque', 'ethique', 'reglages', 'rangs', 'revision'].includes(a))));
  window.scrollTo(0, 0);
  switch (a) {
    case undefined: view.innerHTML = viewHome(); break;
    case 'parcours': view.innerHTML = viewParcours(); break;
    case 'programme': view.innerHTML = viewProgramme(); mountProgramme(); break;
    case 'semaine': view.innerHTML = viewWeek(Number(b)); mountWeek(Number(b)); break;
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
