import { esc, shuffle } from '../util.js';

// ---------- Réflexe sorties : répondre vite et bien quand un effet ne se passe pas comme prévu ----------
// s = situation, r = bonne réplique, w = mauvaises répliques, e = explication
const CASES = [
  { s: 'Le 37 : il dit « 37 ».', r: '« Dépliez le papier. » (Silence.)', w: ['« Incroyable, non ? Je suis vraiment doué. »', '« Vous êtes sûr ? Réfléchissez encore. »'], e: 'Laissez la réaction venir d’elle-même.' },
  { s: 'Le 37 : il dit « 35 ».', r: '« J’avais un doute entre deux… » et vous montrez le téléphone.', w: ['« Presque ! C’était 37. »', 'Vous dépliez le papier quand même.'], e: '35 est votre sortie prévue.' },
  { s: 'Le 37 : elle dit « 19 ».', r: '« Gardez bien ce nombre en tête, il va nous servir. »', w: ['« Raté, désolé. »', '« Vous avez mal compris la consigne. »'], e: 'Le papier reste plié et l’effet se transforme.' },
  { s: 'Le 37 : il dit « 42 », hors consignes.', r: '« Vous ne suivez pas les règles, vous ! J’adore. »', w: ['« Non, j’ai dit deux chiffres impairs. »', '« Recommencez. »'], e: 'Riez avec lui, jamais contre lui.' },
  { s: 'Le livre : le calcul donne 1098.', r: '« Vérifions ensemble, c’est moi qui vous ai stressé. »', w: ['« Vous vous êtes trompé. »', '« Prenez la page 109 alors. »'], e: 'La faute n’est jamais celle du spectateur.' },
  { s: 'Le livre : il a choisi 333.', r: '« Trois chiffres différents, sinon c’est trop facile pour moi ! »', w: ['« Parfait, continuez. »', '« Ça ne marchera pas. »'], e: 'Avec des chiffres identiques, le calcul donne 0.' },
  { s: 'L’objet : il prend la clé tout de suite.', r: '« Vous l’avez choisie sans hésiter. » Et vous révélez.', w: ['« Attendez, on doit éliminer d’abord. »', '« Reposez-la. »'], e: 'C’est le meilleur cas : révélez immédiatement.' },
  { s: 'Quelqu’un crie : « C’est un complice ! »', r: '« Si j’avais des complices partout, je serais beaucoup plus riche. »', w: ['« Pas du tout, je vous jure ! »', 'Vous l’ignorez en fronçant les sourcils.'], e: 'Humour, puis faites constater que tout est libre.' },
  { s: 'Un spectateur dit : « Je sais comment tu fais. »', r: '« Gardez-le pour vous, ça fera mon prochain spectacle. »', w: ['« Ah oui ? Expliquez. »', '« Impossible, c’est un vrai don. »'], e: 'Restez léger, ne demandez jamais l’explication.' },
  { s: 'La volontaire refuse de monter.', r: '« Aucun souci, merci ! Qui veut sa place ? »', w: ['« Allez, ne soyez pas timide ! »', 'Vous insistez avec le public.'], e: 'On ne force jamais un volontaire.' },
  { s: 'Après l’effet : « Tu as vraiment un don ? »', r: '« Je joue avec la psychologie et quelques secrets de magicien. »', w: ['« Oui, depuis l’enfance. »', 'Vous laissez planer le doute en privé.'], e: 'En privé, on ne prétend jamais à un pouvoir réel.' },
  { s: 'Le spectateur oublie le mot qu’il a lu.', r: '« Pas de stress : relisez-le, et gardez-le cette fois. »', w: ['« Ça ne marche pas sans vous. »', '« On arrête là. »'], e: 'On répare sans dramatiser.' },
];
const SECONDS = 6;

export const outsTool = {
  id: 'outs', name: 'Réflexe sorties', icon: '🛟', level: 1,
  desc: 'Trouver la bonne réplique en 6 secondes quand ça rate',
  mount(el, ctx) {
    let tick;
    const home = () => {
      clearInterval(tick);
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Une situation s'affiche : un spectateur répond mal, conteste ou refuse. Vous avez <strong>${SECONDS} secondes</strong> pour choisir la bonne réplique. Sur scène, une sortie doit être un réflexe.</p>
        <button class="btn primary block" id="go">Commencer (10 situations)</button>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}</section>`;
      el.querySelector('#go').onclick = play;
    };
    const play = () => {
      const seq = shuffle([...CASES]).slice(0, 10);
      let i = 0, good = 0;
      const next = () => {
        clearInterval(tick);
        if (i >= seq.length) {
          const score = Math.round((good / seq.length) * 100);
          ctx.finish(score, 5 + good);
          el.innerHTML = `<section class="card result center"><div class="big">🛟</div><h2>${good}/${seq.length} · ${score} %</h2>
            <p class="muted">${score >= 90 ? 'Réflexes de pro.' : score >= 60 ? 'Bien. Rejouez demain pour que ça devienne automatique.' : 'Relisez la leçon « Quand ça rate », puis rejouez.'}</p>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = play;
          el.querySelector('#bk').onclick = home;
          return;
        }
        const c = seq[i];
        const opts = shuffle([c.r, ...c.w]);
        el.innerHTML = `<section class="card"><p class="muted small">${i + 1}/${seq.length}</p>
          <div class="outs-timer"><span></span></div>
          <h3>${esc(c.s)}</h3>
          <div class="options">${opts.map((o, k) => `<button class="opt" data-k="${k}">${esc(o)}</button>`).join('')}</div>
          <p class="muted small" id="why"></p></section>`;
        const bar = el.querySelector('.outs-timer span');
        const t0 = Date.now();
        const answer = (k) => {
          clearInterval(tick);
          const ok = k != null && opts[k] === c.r;
          if (ok) good++;
          el.querySelectorAll('.opt').forEach((b) => { b.disabled = true; if (opts[b.dataset.k] === c.r) b.classList.add('right'); });
          if (k != null && !ok) el.querySelector(`.opt[data-k="${k}"]`).classList.add('wrong');
          el.querySelector('#why').textContent = (k == null ? '⏱ Trop tard. ' : '') + c.e;
          setTimeout(() => { i++; next(); }, ok ? 900 : 2200);
        };
        el.querySelectorAll('.opt').forEach((b) => (b.onclick = () => answer(+b.dataset.k)));
        tick = setInterval(() => {
          const left = 1 - (Date.now() - t0) / (SECONDS * 1000);
          if (!el.isConnected) { clearInterval(tick); return; }
          bar.style.width = `${Math.max(0, left) * 100}%`;
          if (left <= 0) answer(null);
        }, 100);
      };
      next();
    };
    home();
  },
};
