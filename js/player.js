// Lecteur de session façon micro-leçon : cartes courtes, exercices variés, cœurs, combos
import { esc, shuffle } from './util.js';
import { hearts, loseHeart, zen, srsRecord, sound, say, MASCOT, nextHeartIn } from './game.js';
import { haptic } from './fx.js';

// Découpe le contenu HTML d'une leçon en petites cartes faciles à lire
export function chunkContent(html, max = 520) {
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  const chunks = [];
  let cur = [], len = 0;
  const push = () => { if (cur.length) chunks.push(cur.join('')); cur = []; len = 0; };
  [...tpl.content.children].forEach((el) => {
    const t = el.textContent.length;
    if (el.tagName === 'H3' || (len > 0 && len + t > max && !(cur.length === 1 && /^<h3/i.test(cur[0])))) push();
    cur.push(el.outerHTML);
    len += t;
  });
  push();
  return chunks;
}

const hasHeading = (h) => /^\s*<h3/i.test(h);

// ---------- Exercices ----------
function renderEx(ex, body, ui) {
  const t = ex.t || 'mcq';
  if (t === 'mcq') {
    body.innerHTML = `<div class="ex-kind">Choisissez la bonne réponse</div><h2 class="ex-q">${esc(ex.q)}</h2>
      <div class="choices">${shuffle(ex.options.map((o, i) => i)).map((i, k) => `<button class="choice" data-i="${i}"><span class="key">${k + 1}</span>${esc(ex.options[i])}</button>`).join('')}</div>`;
    let sel = null;
    body.querySelectorAll('.choice').forEach((b) => (b.onclick = () => { body.querySelectorAll('.choice').forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); sel = Number(b.dataset.i); sound('tap'); ui.ready(true); }));
    return { check: () => ({ ok: sel === ex.answer, answer: ex.options[ex.answer], explain: ex.explain }), lock: () => body.querySelectorAll('.choice').forEach((b) => { b.disabled = true; if (Number(b.dataset.i) === ex.answer) b.classList.add('right'); else if (b.classList.contains('sel')) b.classList.add('wrong'); }) };
  }
  if (t === 'tf') {
    body.innerHTML = `<div class="ex-kind">Vrai ou faux ?</div><h2 class="ex-q">${esc(ex.s)}</h2>
      <div class="tf"><button class="choice big" data-v="1">👍 Vrai</button><button class="choice big" data-v="0">👎 Faux</button></div>`;
    let sel = null;
    body.querySelectorAll('.choice').forEach((b) => (b.onclick = () => { body.querySelectorAll('.choice').forEach((x) => x.classList.remove('sel')); b.classList.add('sel'); sel = b.dataset.v === '1'; sound('tap'); ui.ready(true); }));
    return { check: () => ({ ok: sel === ex.a, answer: ex.a ? 'Vrai' : 'Faux', explain: ex.e }), lock: () => body.querySelectorAll('.choice').forEach((b) => { b.disabled = true; if ((b.dataset.v === '1') === ex.a) b.classList.add('right'); else if (b.classList.contains('sel')) b.classList.add('wrong'); }) };
  }
  if (t === 'fill') {
    const [a, b] = ex.s.split('___');
    body.innerHTML = `<div class="ex-kind">Complétez la phrase</div><h2 class="ex-q fill">${esc(a)}<span class="blank">&nbsp;</span>${esc(b || '')}</h2>
      <div class="bank">${shuffle(ex.o.map((o, i) => i)).map((i) => `<button class="chip" data-i="${i}">${esc(ex.o[i])}</button>`).join('')}</div>`;
    let sel = null;
    const blank = body.querySelector('.blank');
    body.querySelectorAll('.chip').forEach((c) => (c.onclick = () => { body.querySelectorAll('.chip').forEach((x) => x.classList.remove('used')); c.classList.add('used'); sel = Number(c.dataset.i); blank.textContent = ex.o[sel]; blank.classList.add('filled'); sound('tap'); ui.ready(true); }));
    return { check: () => ({ ok: sel === ex.a, answer: ex.s.replace('___', ex.o[ex.a]), explain: ex.e }), lock: () => { body.querySelectorAll('.chip').forEach((c) => (c.disabled = true)); blank.classList.add(sel === ex.a ? 'right' : 'wrong'); } };
  }
  if (t === 'order') {
    body.innerHTML = `<div class="ex-kind">Remettez dans l'ordre</div><h2 class="ex-q">${esc(ex.q)}</h2>
      <div class="answer-line" aria-label="Votre réponse"></div>
      <div class="bank">${shuffle(ex.items.map((o, i) => i)).map((i) => `<button class="chip" data-i="${i}">${esc(ex.items[i])}</button>`).join('')}</div>`;
    const line = body.querySelector('.answer-line');
    const picked = [];
    const sync = () => {
      line.innerHTML = picked.map((i, k) => `<button class="chip in" data-k="${k}"><b>${k + 1}</b> ${esc(ex.items[i])}</button>`).join('');
      body.querySelectorAll('.bank .chip').forEach((c) => c.classList.toggle('used', picked.includes(Number(c.dataset.i))));
      line.querySelectorAll('.chip').forEach((c) => (c.onclick = () => { picked.splice(Number(c.dataset.k), 1); sound('tap'); sync(); }));
      ui.ready(picked.length === ex.items.length);
    };
    body.querySelectorAll('.bank .chip').forEach((c) => (c.onclick = () => { const i = Number(c.dataset.i); if (!picked.includes(i)) { picked.push(i); sound('tap'); sync(); } }));
    sync();
    return { check: () => ({ ok: picked.every((v, k) => v === k), answer: ex.items.join(' → '), explain: ex.e }), lock: () => body.querySelectorAll('.chip').forEach((c) => (c.disabled = true)) };
  }
  if (t === 'pairs') {
    const L = shuffle(ex.p.map((_, i) => i)), R = shuffle(ex.p.map((_, i) => i));
    body.innerHTML = `<div class="ex-kind">Associez les paires</div><h2 class="ex-q">Touchez un élément à gauche puis son correspondant à droite</h2>
      <div class="pairs"><div>${L.map((i) => `<button class="chip pair" data-s="l" data-i="${i}">${esc(ex.p[i][0])}</button>`).join('')}</div>
      <div>${R.map((i) => `<button class="chip pair" data-s="r" data-i="${i}">${esc(ex.p[i][1])}</button>`).join('')}</div></div>`;
    let selL = null, selR = null, matched = 0, errors = 0;
    const tryMatch = () => {
      if (selL == null || selR == null) return;
      const l = body.querySelector(`[data-s="l"][data-i="${selL}"]`), r = body.querySelector(`[data-s="r"][data-i="${selR}"]`);
      if (selL === selR) {
        [l, r].forEach((x) => { x.classList.remove('sel'); x.classList.add('matched'); x.disabled = true; });
        matched++; sound('ok'); haptic();
        if (matched === ex.p.length) ui.auto();
      } else {
        errors++; sound('ko'); haptic('ko');
        [l, r].forEach((x) => { x.classList.add('shake'); setTimeout(() => x.classList.remove('shake', 'sel'), 400); });
      }
      selL = selR = null;
    };
    body.querySelectorAll('.pair').forEach((c) => (c.onclick = () => {
      const side = c.dataset.s, i = Number(c.dataset.i);
      body.querySelectorAll(`.pair[data-s="${side}"]`).forEach((x) => x.classList.remove('sel'));
      c.classList.add('sel');
      if (side === 'l') selL = i; else selR = i;
      tryMatch();
    }));
    ui.ready(false, true);
    return { check: () => ({ ok: errors === 0, answer: errors ? `${errors} erreur${errors > 1 ? 's' : ''} d'association` : '', explain: ex.e }), lock: () => {} };
  }
  body.innerHTML = '<p>Exercice inconnu.</p>';
  return { check: () => ({ ok: true }), lock: () => {} };
}

// ---------- Session ----------
export function playSession(view, { title, items, onQuit, onFinish }) {
  const queue = [...items];
  const exTotal = items.filter((i) => i.kind === 'ex').length;
  const firstTry = new Map();
  let idx = 0, combo = 0, maxCombo = 0;
  const retries = new Map();
  document.body.classList.add('playing');

  view.innerHTML = `<div class="player">
    <div class="p-top"><button class="p-x" aria-label="Quitter">✕</button><div class="p-bar"><span></span></div><div class="p-hearts" title="Cœurs">❤️ <b></b></div></div>
    <div class="p-combo" hidden></div>
    <div class="p-body"></div>
    <div class="p-foot"><div class="p-fb"></div><button class="btn primary block p-cta" disabled>Vérifier</button></div>
  </div>`;
  const $ = (s) => view.querySelector(s);
  const body = $('.p-body'), cta = $('.p-cta'), fb = $('.p-fb'), foot = $('.p-foot');
  const setHearts = () => { const h = hearts(); $('.p-hearts b').textContent = h === Infinity ? '∞' : h; };
  const setBar = () => { $('.p-bar span').style.width = `${Math.round((idx / queue.length) * 100)}%`; };
  setHearts();

  $('.p-x').onclick = () => {
    if (!$('.p-x').dataset.confirm && idx > 0) { $('.p-x').dataset.confirm = '1'; fb.className = 'p-fb warn'; fb.innerHTML = '<strong>Quitter la leçon ?</strong> Votre progression dans cette session sera perdue. Touchez ✕ à nouveau pour confirmer.'; return; }
    document.body.classList.remove('playing');
    onQuit();
  };

  const finish = () => {
    document.body.classList.remove('playing');
    const ok = [...firstTry.values()].filter(Boolean).length;
    onFinish({ accuracy: exTotal ? Math.round((ok / exTotal) * 100) : 100, maxCombo, exTotal });
  };

  const outOfHearts = () => {
    document.body.classList.remove('playing');
    const ms = nextHeartIn();
    view.innerHTML = `<section class="card result center"><div class="big">💔</div><h2>Plus de cœurs</h2>
      <p class="mascot-say">${MASCOT} ${say('hearts')}</p>
      <p class="muted small">Prochain cœur dans ${Math.ceil(ms / 60000)} min. Chaque entraînement terminé rend un cœur.</p>
      <a class="btn primary block" href="#revision">🔁 S'entraîner pour regagner un cœur</a>
      <a class="btn ghost block" href="#reglages">Activer le mode zen (cœurs illimités)</a>
      <a class="btn ghost block" href="#parcours">Retour au chemin</a></section>`;
  };

  const show = () => {
    if (idx >= queue.length) return finish();
    setBar();
    const it = queue[idx];
    fb.className = 'p-fb'; fb.innerHTML = '';
    foot.classList.remove('ok', 'ko');
    body.classList.remove('in'); void body.offsetWidth; body.classList.add('in');
    if (it.kind === 'learn' || it.kind === 'recap' || it.kind === 'script') {
      body.innerHTML = `<div class="ex-kind">${{ recap: '📌 À retenir', script: '🎬 Répétez à voix haute', learn: '📖 Découvrir' }[it.kind]}</div>${it.kind === 'learn' && !hasHeading(it.html) && it.title ? `<h3>${esc(it.title)}</h3>` : ''}<div class="learn">${it.html}</div>`;
      cta.disabled = false; cta.hidden = false; cta.textContent = it.kind === 'script' ? 'Je l’ai répété ✓' : 'Continuer';
      cta.onclick = () => { idx++; show(); };
      return;
    }
    const ex = it.ex;
    let auto = false;
    const ui = {
      ready: (v, isAuto) => { cta.disabled = !v; if (isAuto) { auto = true; cta.hidden = true; } else cta.hidden = false; },
      auto: () => verify(),
    };
    const ctl = renderEx(ex, body, ui);
    if (!auto) { cta.textContent = 'Vérifier'; cta.disabled = true; cta.hidden = false; }
    function verify() {
      const r = ctl.check();
      ctl.lock();
      if (!firstTry.has(it.id)) { firstTry.set(it.id, r.ok); srsRecord(it.id, r.ok); }
      if (r.ok) {
        combo++; maxCombo = Math.max(maxCombo, combo);
        sound('ok'); haptic('ok');
        if (combo >= 3) { const c = $('.p-combo'); c.hidden = false; c.textContent = `🔥 ${combo} d'affilée !`; c.classList.remove('pop'); void c.offsetWidth; c.classList.add('pop'); }
      } else {
        combo = 0; $('.p-combo').hidden = true;
        sound('ko'); haptic('ko');
        const left = loseHeart();
        setHearts();
        const n = retries.get(it.id) || 0;
        if (n < 2) { retries.set(it.id, n + 1); queue.push({ ...it }); }
        if (left === 0 && !zen()) {
          foot.classList.add('ko');
          fb.className = 'p-fb ko';
          fb.innerHTML = `<strong>Pas tout à fait…</strong>${r.answer ? `<div>Bonne réponse : ${esc(r.answer)}</div>` : ''}`;
          cta.hidden = false; cta.disabled = false; cta.textContent = 'Continuer';
          cta.onclick = outOfHearts;
          return;
        }
      }
      foot.classList.add(r.ok ? 'ok' : 'ko');
      fb.className = `p-fb ${r.ok ? 'ok' : 'ko'}`;
      fb.innerHTML = r.ok
        ? `<strong>${['Excellent !', 'Bravo !', 'Parfait !', 'Exact !'][Math.floor(Math.random() * 4)]}</strong>${r.explain ? `<div>${esc(r.explain)}</div>` : ''}`
        : `<strong>Pas tout à fait…</strong>${r.answer ? `<div>Bonne réponse : <b>${esc(r.answer)}</b></div>` : ''}${r.explain ? `<div>${esc(r.explain)}</div>` : ''}<div class="small muted">Cette question reviendra à la fin.</div>`;
      cta.hidden = false; cta.disabled = false; cta.textContent = 'Continuer';
      cta.onclick = () => { idx++; show(); };
    }
    cta.onclick = verify;
  };

  // Raccourcis clavier : Entrée = valider/continuer, 1-4 = choix
  const onKey = (e) => {
    if (!document.body.classList.contains('playing')) { document.removeEventListener('keydown', onKey); return; }
    if (e.key === 'Enter' && !cta.disabled && !cta.hidden) { e.preventDefault(); cta.click(); }
    const n = Number(e.key);
    if (n >= 1 && n <= 9) { const c = body.querySelectorAll('.choice, .bank .chip:not(.used)')[n - 1]; if (c && !c.disabled) c.click(); }
  };
  document.addEventListener('keydown', onKey);
  show();
}

// Construit la file d'une leçon : cartes courtes intercalées avec des exercices
export function buildLessonItems(lesson, extra = []) {
  const chunks = chunkContent(lesson.content);
  const exs = shuffle([
    ...lesson.quiz.map((q, i) => ({ kind: 'ex', id: `${lesson.id}:q${i}`, ex: { t: 'mcq', ...q } })),
    ...extra.map((x, i) => ({ kind: 'ex', id: `${lesson.id}:x${i}`, ex: x })),
  ]);
  const items = [];
  chunks.forEach((c, i) => {
    items.push({ kind: 'learn', html: c, title: i === 0 ? lesson.title : '' });
    if (exs.length && i < chunks.length - 1 && i % 1 === 0) items.push(exs.shift());
  });
  if (lesson.script) items.push({ kind: 'script', html: `<p class="muted">Lisez ce texte <strong>à voix haute</strong>, trois fois, comme si quelqu'un était en face de vous. C'est la répétition qui rend naturel.</p><ol class="script">${lesson.script.map((l) => `<li>${esc(l)}</li>`).join('')}</ol>` });
  items.push({ kind: 'recap', html: `<ul class="recap">${lesson.keyPoints.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>` });
  items.push(...exs);
  return items;
}
