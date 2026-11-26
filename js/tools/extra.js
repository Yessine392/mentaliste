import { esc, shuffle, pick, norm } from '../util.js';
import { WORDS } from './memory.js';

// ---------- Codes de seconde vue ----------
export const CODES = [
  ['Regardez', 'montre', '⌚'], ['Dites-moi', 'téléphone', '📱'], ['Concentrez-vous', 'clé', '🔑'], ['Voyez-vous', 'bague', '💍'],
  ['Allez', 'stylo', '🖊️'], ['Maintenant', 'lunettes', '👓'], ['Pouvez-vous', 'billet', '💶'], ['Vite', 'carte bancaire', '💳'],
  ['Essayez', 'briquet', '🔥'], ['S’il vous plaît', 'mouchoir', '🤧'],
];
const TAILS = ['qu’est-ce que je tiens ?', 'quel est cet objet ?', 'que me montre ce monsieur ?', 'que me tend cette dame ?', 'décrivez-moi ceci.', 'qu’ai-je dans la main ?'];

export const codesTool = {
  id: 'codes', name: 'Codes de seconde vue', icon: '👥', level: 4,
  desc: 'Apprendre un code verbal de transmission de pensée',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Le premier mot de la question de l'« émetteur » indique l'objet au « receveur ». Apprenez ce code d'exemple, puis créez le vôtre avec votre partenaire.</p>
        <div class="code-list">${CODES.map(([w, o, i]) => `<div><span>${i}</span><strong>${esc(o)}</strong><em>« ${esc(w)}… »</em></div>`).join('')}</div></section>
        <section class="card"><button class="btn primary block" data-m="recv">Je suis le receveur (phrase → objet)</button>
        <button class="btn ghost block" data-m="send">Je suis l'émetteur (objet → phrase)</button>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>`;
      el.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => play(b.dataset.m)));
    };
    const play = (mode) => {
      const seq = Array.from({ length: 15 }, () => pick(CODES));
      let i = 0, good = 0;
      const next = () => {
        if (i >= seq.length) {
          const score = Math.round((good / seq.length) * 100);
          ctx.finish(score, good);
          el.innerHTML = `<section class="card result center"><div class="big">👥</div><h2>${good}/${seq.length} · ${score} %</h2>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = () => play(mode);
          el.querySelector('#bk').onclick = home;
          return;
        }
        const [w, o, ic] = seq[i];
        const prompt = mode === 'recv'
          ? `<blockquote>« ${esc(w)}, ${esc(pick(TAILS))} »</blockquote><p class="muted">Quel objet votre partenaire vous transmet-il ?</p>`
          : `<div class="huge">${ic}</div><p>Le spectateur montre : <strong>${esc(o)}</strong>. Comment commencez-vous votre question ?</p>`;
        const opts = shuffle(CODES);
        el.innerHTML = `<div class="muted small">${i + 1}/${seq.length} · ✅ ${good}</div><section class="card quiz center">${prompt}
          <div class="options grid-opts">${opts.map(([ww, oo, ii]) => `<button class="opt" data-k="${esc(oo)}">${mode === 'recv' ? `${ii} ${esc(oo)}` : `« ${esc(ww)}… »`}</button>`).join('')}</div></section>`;
        el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
          const ok = b.dataset.k === o;
          if (ok) good++;
          el.querySelectorAll('.opt').forEach((x) => { x.disabled = true; if (x.dataset.k === o) x.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          setTimeout(() => { i++; next(); }, ok ? 500 : 1500);
        }));
      };
      next();
    };
    home();
  },
};

// ---------- Lecture flash (coup d'œil) ----------
export const peekTool = {
  id: 'peek', name: 'Lecture flash', icon: '⚡', level: 3,
  desc: 'Lire un mot en une fraction de seconde (coup d’œil)',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Le coup d'œil (<em>peek</em>) demande de lire une information en un instant. Un mot s'affiche très brièvement : retapez-le.</p>
        <label class="field">Durée d'affichage <select id="ms" class="input"><option value="600">0,6 s (débutant)</option><option value="300" selected>0,3 s</option><option value="150">0,15 s</option><option value="80">0,08 s (expert)</option></select></label>
        <button class="btn primary block" id="go">10 mots</button>${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>`;
      el.querySelector('#go').onclick = () => play(Number(el.querySelector('#ms').value));
    };
    const play = (ms) => {
      const words = shuffle(WORDS).slice(0, 10);
      let i = 0, good = 0;
      const next = () => {
        if (i >= words.length) {
          const score = good * 10;
          ctx.finish(score, Math.round(good * (ms <= 150 ? 1.5 : 1)));
          el.innerHTML = `<section class="card result center"><div class="big">⚡</div><h2>${good}/10</h2>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = () => play(ms);
          el.querySelector('#bk').onclick = home;
          return;
        }
        const w = words[i];
        el.innerHTML = `<div class="muted small">${i + 1}/10 · ✅ ${good}</div><section class="card quiz center">
          <div class="peek-stage"><span id="pw">+</span></div>
          <form id="f" hidden><input class="input big-input peek-input" id="ans" autocomplete="off" autocapitalize="off"><button class="btn primary block">Valider</button></form><div class="explain"></div></section>`;
        const pw = el.querySelector('#pw');
        setTimeout(() => {
          pw.textContent = w;
          setTimeout(() => {
            pw.textContent = '▓'.repeat(Math.max(4, w.length));
            const f = el.querySelector('#f');
            f.hidden = false;
            const inp = el.querySelector('#ans');
            inp.focus();
            f.onsubmit = (e) => {
              e.preventDefault();
              const ok = norm(inp.value) === norm(w);
              if (ok) good++;
              inp.disabled = true;
              pw.textContent = w;
              el.querySelector('.explain').innerHTML = ok ? '<p class="ok">✅ Exact</p>' : `<p class="ko">❌ C'était « ${esc(w)} »</p>`;
              setTimeout(() => { i++; next(); }, ok ? 600 : 1400);
            };
          }, ms);
        }, 800 + Math.random() * 700);
      };
      next();
    };
    home();
  },
};
