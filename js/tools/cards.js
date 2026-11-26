import { shuffle, randInt } from '../util.js';

const VAL = ['', 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'V', 'D', 'R'];
const SUITS = [{ s: '♣', n: 'Trèfle', red: false }, { s: '♥', n: 'Cœur', red: true }, { s: '♠', n: 'Pique', red: false }, { s: '♦', n: 'Carreau', red: true }];

// Si Stebbins : départ A♣, +3 en valeur, couleur suivante dans l'ordre Trèfle-Cœur-Pique-Carreau
export const STACK = Array.from({ length: 52 }, (_, i) => ({ v: ((i * 3) % 13) + 1, s: i % 4 }));
const id = (c) => `${c.v}-${c.s}`;
const label = (c) => `${VAL[c.v]}${SUITS[c.s].s}`;
export const cardHtml = (c, big) => `<span class="pcard ${SUITS[c.s].red ? 'red' : ''} ${big ? 'big' : ''}">${label(c)}</span>`;
const nextCard = (c) => ({ v: ((c.v - 1 + 3) % 13) + 1, s: (c.s + 1) % 4 });
const prevCard = (c) => ({ v: ((c.v - 1 + 10) % 13) + 1, s: (c.s + 3) % 4 });

export const stebbinsTool = {
  id: 'stebbins', name: 'Si Stebbins', icon: '♠️', level: 4,
  desc: 'Maîtriser le chapelet cyclique +3',
  mount(el, ctx) {
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Valeur <strong>+3</strong>, couleur suivante (<strong>♣ ♥ ♠ ♦</strong>). As = 1, Valet = 11, Dame = 12, Roi = 13.</p>
        <button class="btn primary block" id="go">15 questions</button><button class="btn ghost block" id="ref">Voir l'ordre complet</button>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>`;
      el.querySelector('#go').onclick = play;
      el.querySelector('#ref').onclick = () => {
        el.innerHTML = `<button class="btn ghost" id="bk">← Retour</button><section class="card"><div class="stack">${STACK.map((c, i) => `<div><span class="muted small">${i + 1}</span>${cardHtml(c)}</div>`).join('')}</div></section>`;
        el.querySelector('#bk').onclick = home;
      };
    };
    const play = () => {
      let i = 0, good = 0;
      const next = () => {
        if (i >= 15) {
          const score = Math.round((good / 15) * 100);
          ctx.finish(score, good);
          el.innerHTML = `<section class="card result center"><div class="big">🃏</div><h2>${good}/15 · ${score} %</h2>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = play;
          el.querySelector('#bk').onclick = home;
          return;
        }
        const c = STACK[randInt(0, 51)];
        const mode = Math.random() < 0.6 ? 'next' : 'prev';
        const ans = mode === 'next' ? nextCard(c) : prevCard(c);
        const near = { v: ans.v, s: (ans.s + 1) % 4 };
        const pool = shuffle(STACK.filter((x) => ![id(ans), id(c), id(near)].includes(id(x)))).slice(0, 2);
        const opts = shuffle([ans, near, ...pool]);
        el.innerHTML = `<div class="muted small">${i + 1}/15 · ✅ ${good}</div><section class="card quiz center">
          <p>${mode === 'next' ? 'Vous apercevez la carte du <strong>dessous</strong> :' : 'Vous apercevez cette carte :'}</p>
          ${cardHtml(c, true)}
          <p class="muted">${mode === 'next' ? 'Quelle carte est sur le dessus du paquet (la suivante) ?' : 'Quelle carte précède celle-ci dans le chapelet ?'}</p>
          <div class="options grid-opts">${opts.map((o) => `<button class="opt" data-k="${id(o)}">${cardHtml(o)}</button>`).join('')}</div><div class="explain"></div></section>`;
        el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
          const ok = b.dataset.k === id(ans);
          if (ok) good++;
          el.querySelectorAll('.opt').forEach((o) => { o.disabled = true; if (o.dataset.k === id(ans)) o.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          setTimeout(() => { i++; next(); }, ok ? 500 : 1600);
        }));
      };
      next();
    };
    home();
  },
};
