import { randInt, timer, esc } from '../util.js';

const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const CENTURY = { 18: 5, 19: 3, 20: 2, 21: 0 };
const isLeap = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
const pivotDay = (m, y) => [isLeap(y) ? 4 : 3, isLeap(y) ? 29 : 28, 14, 4, 9, 6, 11, 8, 5, 10, 7, 12][m];
const mod7 = (n) => ((n % 7) + 7) % 7;

export function dayOfWeek(y, m, d) { return new Date(Date.UTC(y, m, d)).getUTCDay(); }

export function explainDoomsday(y, m, d) {
  const c = Math.floor(y / 100), yy = y % 100;
  const a = Math.floor(yy / 12), b = yy % 12, cc = Math.floor(b / 4);
  const anchor = CENTURY[c];
  const dd = mod7(anchor + a + b + cc);
  const p = pivotDay(m, y);
  const diff = d - p;
  return `<ol class="small">
    <li>Siècle ${c}00 → ${DAYS[anchor]} (${anchor})</li>
    <li>y = ${yy} → a = ${a}, b = ${b}, c = ${cc}</li>
    <li>Pivot ${y} = ${anchor} + ${a} + ${b} + ${cc} = ${anchor + a + b + cc} ≡ ${dd} → <strong>${DAYS[dd]}</strong></li>
    <li>Pivot de ${MONTHS[m]} : le ${p} ${MONTHS[m]}${m < 2 && isLeap(y) ? ' (année bissextile)' : ''}</li>
    <li>${d} − ${p} = ${diff} → ${DAYS[dd]} ${diff >= 0 ? '+' : '−'} ${Math.abs(diff)} = <strong>${DAYS[mod7(dd + diff)]}</strong></li>
  </ol>`;
}

export const calendarTool = {
  id: 'calendar', name: 'Calendrier mental', icon: '📅', level: 4,
  desc: 'Trouver le jour de n’importe quelle date',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Méthode Doomsday de John Conway (voir la leçon du niveau 4). Objectif professionnel : moins de 10 secondes par date.</p>
        <label class="field">Période <select id="rng" class="input"><option value="cur">Cette année</option><option value="2000">2000 – 2099</option><option value="1900" selected>1900 – 2099</option><option value="1800">1800 – 2199</option></select></label>
        <button class="btn primary block" id="go">10 dates</button>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>
        <section class="card"><h3>Aide-mémoire</h3><p class="small">Pivots : 3/1 (4/1 bissextile), 28/2 (29), 14/3, 4/4, 9/5, 6/6, 11/7, 8/8, 5/9, 10/10, 7/11, 12/12.<br>Siècles : 1800 vendredi · 1900 mercredi · 2000 mardi · 2100 dimanche.</p></section>`;
      el.querySelector('#go').onclick = () => play(el.querySelector('#rng').value);
    };
    const play = (rng) => {
      const now = new Date().getFullYear();
      const [lo, hi] = { cur: [now, now], 2000: [2000, 2099], 1900: [1900, 2099], 1800: [1800, 2199] }[rng];
      let i = 0, good = 0, times = [];
      const next = () => {
        if (i >= 10) {
          const score = good * 10;
          const avg = times.reduce((a, b) => a + b, 0) / times.length;
          ctx.finish(score, good * 2);
          el.innerHTML = `<section class="card result center"><div class="big">📅</div><h2>${good}/10 · ${score} %</h2><p class="muted">Temps moyen : ${avg.toFixed(1)} s</p>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = () => play(rng);
          el.querySelector('#bk').onclick = home;
          return;
        }
        const y = randInt(lo, hi), m = randInt(0, 11);
        const d = randInt(1, new Date(Date.UTC(y, m + 1, 0)).getUTCDate());
        const ans = dayOfWeek(y, m, d);
        const t = timer();
        el.innerHTML = `<div class="muted small">${i + 1}/10 · ✅ ${good}</div><section class="card quiz center">
          <div class="huge date">${d} ${MONTHS[m]} ${y}</div>
          <div class="options grid-opts">${[1, 2, 3, 4, 5, 6, 0].map((k) => `<button class="opt" data-k="${k}">${DAYS[k]}</button>`).join('')}</div>
          <div class="explain"></div></section>`;
        el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
          const sec = t();
          times.push(sec);
          const ok = Number(b.dataset.k) === ans;
          if (ok) good++;
          el.querySelectorAll('.opt').forEach((o) => { o.disabled = true; if (Number(o.dataset.k) === ans) o.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          el.querySelector('.explain').innerHTML = `<p>${ok ? '✅' : '❌'} ${sec.toFixed(1)} s</p>${explainDoomsday(y, m, d)}<button class="btn primary block" id="n">Suivante →</button>`;
          el.querySelector('#n').onclick = () => { i++; next(); };
        }));
      };
      next();
    };
    home();
  },
};

// ---------- Carré magique ----------
const BASE = [[8, 11, 14, 1], [13, 2, 7, 12], [3, 16, 9, 6], [10, 5, 4, 15]];
export function magicSquare(n) {
  const d = n - 34;
  return BASE.map((r) => r.map((v) => (v >= 13 ? v + d : v)));
}
export function checkMagic(g, n) {
  const sums = [];
  for (let i = 0; i < 4; i++) { sums.push(g[i].reduce((a, b) => a + b, 0)); sums.push(g.reduce((a, r) => a + r[i], 0)); }
  sums.push(g[0][0] + g[1][1] + g[2][2] + g[3][3], g[0][3] + g[1][2] + g[2][1] + g[3][0]);
  return sums.every((s) => s === n);
}

export const squareTool = {
  id: 'square', name: 'Carré magique', icon: '🔲', level: 4,
  desc: 'Construire un carré 4×4 pour n’importe quel total',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Un total au hasard entre 34 et 99 vous est donné. Remplissez la grille pour que chaque ligne, colonne et diagonale donne ce total. Astuce : d = N − 34, à ajouter aux cases 13, 14, 15 et 16 du modèle.</p>
        <button class="btn primary block" id="go">Nouveau défi</button>
        <form id="f2" class="row"><input class="input" id="nn" inputmode="numeric" placeholder="Total (≥ 34)"><button class="btn ghost">Voir la solution</button></form>
        <div id="sol"></div>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} pts</p>` : ''}</section>`;
      el.querySelector('#go').onclick = () => play(randInt(34, 99));
      el.querySelector('#f2').onsubmit = (e) => {
        e.preventDefault();
        const n = Number(el.querySelector('#nn').value);
        el.querySelector('#sol').innerHTML = n >= 34 ? gridHtml(magicSquare(n)) : '<p class="ko small">Choisissez un total de 34 ou plus.</p>';
      };
    };
    const gridHtml = (g) => `<table class="square big">${g.map((r) => `<tr>${r.map((v) => `<td>${v}</td>`).join('')}</tr>`).join('')}</table>`;
    const play = (n) => {
      const t = timer();
      el.innerHTML = `<section class="card center"><div class="muted small">Total demandé</div><div class="huge">${n}</div>
        <form id="f"><div class="sq-input">${Array.from({ length: 16 }, (_, k) => `<input class="input" inputmode="numeric" data-k="${k}" autocomplete="off">`).join('')}</div>
        <button class="btn primary block">Vérifier</button></form><div class="explain"></div></section>`;
      el.querySelector('[data-k="0"]').focus();
      el.querySelector('#f').onsubmit = (e) => {
        e.preventDefault();
        const vals = [...el.querySelectorAll('[data-k]')].map((i) => Number(i.value));
        const g = [0, 1, 2, 3].map((r) => vals.slice(r * 4, r * 4 + 4));
        const sec = t();
        const ok = checkMagic(g, n) && vals.every((v) => v > 0);
        const pts = ok ? Math.max(10, Math.round(100 - sec)) : 0;
        if (ok) ctx.finish(pts, 15);
        el.querySelector('.explain').innerHTML = ok
          ? `<p class="ok">✅ Carré valide en ${sec.toFixed(0)} s ! (${pts} pts)</p><button class="btn primary block" id="again">Autre total</button>`
          : `<p class="ko">❌ Certaines lignes, colonnes ou diagonales ne font pas ${n}.</p><details><summary>Voir une solution</summary>${gridHtml(magicSquare(n))}</details><button class="btn ghost block" id="again">Autre total</button>`;
        el.querySelector('#again').onclick = () => play(randInt(34, 99));
      };
    };
    home();
  },
};

// ---------- Racines cubiques ----------
export const cubeTool = {
  id: 'cube', name: 'Racines cubiques', icon: '🧊', level: 4,
  desc: 'Trouver la racine d’un cube à 6 chiffres',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Dernier chiffre : 2↔8 et 3↔7 s'échangent, les autres restent identiques. Premier chiffre : comparez les milliers aux cubes 1, 8, 27, 64, 125, 216, 343, 512, 729.</p>
        <button class="btn primary block" id="go">10 racines</button>${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>`;
      el.querySelector('#go').onclick = play;
    };
    const play = () => {
      let i = 0, good = 0;
      const t = timer();
      const next = () => {
        if (i >= 10) {
          const score = good * 10;
          ctx.finish(score, good * 2);
          el.innerHTML = `<section class="card result center"><div class="big">🧊</div><h2>${good}/10</h2><p class="muted">Temps total : ${t().toFixed(0)} s</p>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = play;
          el.querySelector('#bk').onclick = home;
          return;
        }
        const r = randInt(11, 99);
        el.innerHTML = `<div class="muted small">${i + 1}/10 · ✅ ${good}</div><section class="card quiz center"><div class="muted small">Racine cubique de</div>
          <div class="huge">${(r ** 3).toLocaleString('fr-FR')}</div>
          <form id="f"><input class="input big-input" id="ans" inputmode="numeric" maxlength="2" autocomplete="off"><button class="btn primary block">Valider</button></form><div class="explain"></div></section>`;
        const inp = el.querySelector('#ans');
        inp.focus();
        el.querySelector('#f').onsubmit = (e) => {
          e.preventDefault();
          const ok = Number(inp.value) === r;
          if (ok) good++;
          inp.disabled = true;
          el.querySelector('.explain').innerHTML = ok ? '<p class="ok">✅ Exact</p>' : `<p class="ko">❌ C'était <strong>${r}</strong></p>`;
          setTimeout(() => { i++; next(); }, ok ? 500 : 1500);
        };
      };
      next();
    };
    home();
  },
};
