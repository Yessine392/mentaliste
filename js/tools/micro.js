import { shuffle, pick } from '../util.js';

export const EMOTIONS = {
  joie: { label: 'Joie', tip: 'Coins des lèvres relevés ET yeux plissés (pattes d’oie).' },
  tristesse: { label: 'Tristesse', tip: 'Intérieur des sourcils relevé, coins de la bouche abaissés.' },
  colere: { label: 'Colère', tip: 'Sourcils abaissés et rapprochés, yeux durs, lèvres serrées.' },
  peur: { label: 'Peur', tip: 'Sourcils relevés et rapprochés, yeux écarquillés, bouche étirée.' },
  surprise: { label: 'Surprise', tip: 'Sourcils hauts en arc, yeux ronds, bouche ouverte et détendue.' },
  degout: { label: 'Dégoût', tip: 'Nez plissé, lèvre supérieure relevée.' },
  mepris: { label: 'Mépris', tip: 'Un seul coin de la bouche relevé : asymétrie.' },
};

const F = {
  neutre: { bl: 'M52 74 Q70 68 88 74', br: 'M112 74 Q130 68 148 74', ery: 7, mouth: '<path d="M80 162 Q100 164 120 162" class="lip"/>' },
  joie: { bl: 'M52 72 Q70 66 88 72', br: 'M112 72 Q130 66 148 72', ery: 3.5, mouth: '<path d="M72 154 Q100 186 128 154 Q100 166 72 154Z" class="mouth-open"/><path d="M78 158 Q100 166 122 158" class="teeth"/>', extra: '<path d="M40 92 l-8 -4 M40 97 l-9 0 M40 102 l-8 4 M160 92 l8 -4 M160 97 l9 0 M160 102 l8 4" class="line"/><ellipse cx="62" cy="128" rx="12" ry="7" class="cheek"/><ellipse cx="138" cy="128" rx="12" ry="7" class="cheek"/>' },
  tristesse: { bl: 'M52 78 Q72 74 88 64', br: 'M112 64 Q128 74 148 78', ery: 5.5, lid: true, mouth: '<path d="M80 170 Q100 156 120 170" class="lip"/>' },
  colere: { bl: 'M52 66 Q72 70 92 82', br: 'M108 82 Q128 70 148 66', ery: 5, mouth: '<path d="M82 164 L118 164" class="lip thick"/><path d="M84 170 Q100 172 116 170" class="line"/>', extra: '<path d="M96 80 L98 88 M104 80 L102 88" class="line"/>' },
  peur: { bl: 'M54 64 Q72 56 90 62', br: 'M110 62 Q128 56 146 64', ery: 10.5, small: true, mouth: '<path d="M70 160 Q100 152 130 160 Q100 174 70 160Z" class="mouth-open"/>', extra: '<path d="M84 52 Q100 49 116 52" class="line"/>' },
  surprise: { bl: 'M52 62 Q70 44 88 60', br: 'M112 60 Q130 44 148 62', ery: 11, small: true, mouth: '<ellipse cx="100" cy="166" rx="11" ry="15" class="mouth-open"/>', extra: '<path d="M76 46 Q100 40 124 46 M80 52 Q100 47 120 52" class="line"/>' },
  degout: { bl: 'M52 76 Q70 74 90 80', br: 'M110 80 Q130 74 148 76', ery: 4.5, mouth: '<path d="M80 162 Q88 150 100 155 Q112 150 120 162 Q100 168 80 162Z" class="mouth-open"/>', extra: '<path d="M90 112 Q94 116 92 120 M110 112 Q106 116 108 120 M92 104 Q100 100 108 104" class="line"/>' },
  mepris: { bl: 'M52 74 Q70 68 88 74', br: 'M112 73 Q130 67 148 73', ery: 6, mouth: '<path d="M80 163 Q98 165 114 160 Q121 156 126 151" class="lip"/><path d="M124 156 q4 2 3 6" class="line"/>' },
};

export function face(key) {
  const f = F[key] || F.neutre;
  const eye = (cx) => `<ellipse cx="${cx}" cy="96" rx="11" ry="${f.ery}" class="eye"/><circle cx="${cx}" cy="96" r="${Math.min(f.small ? 3 : 4.5, f.ery)}" class="pupil"/>${f.lid ? `<path d="M${cx - 11} 93 Q${cx} 86 ${cx + 11} 91" class="line"/>` : ''}`;
  return `<svg viewBox="0 0 200 220" class="face" role="img" aria-label="Visage">
    <ellipse cx="100" cy="112" rx="76" ry="96" class="skin"/>
    <path d="M30 70 Q40 10 100 14 Q160 10 170 70 Q150 36 100 38 Q50 36 30 70Z" class="hair"/>
    ${eye(70)}${eye(130)}
    <path d="${f.bl}" class="brow"/><path d="${f.br}" class="brow"/>
    <path d="M100 100 L94 132 Q100 136 106 132" class="line"/>
    ${f.mouth}${f.extra || ''}
  </svg>`;
}

export const microTool = {
  id: 'micro', name: 'Micro-expressions', icon: '😶', level: 2,
  desc: 'Reconnaître les émotions de base en un éclair',
  mount(el, ctx) {
    const keys = Object.keys(EMOTIONS);
    const home = () => {
      const s = ctx.stats();
      el.innerHTML = `<section class="card"><p>Les 6 émotions de base décrites par Paul Ekman en 1971, plus le mépris (ajouté en 1986, le plus discuté). Ce sont des indices, jamais des preuves. Étudiez-les, puis entraînez votre œil en mode flash : l'émotion n'apparaît qu'une fraction de seconde.</p>
        <button class="btn ghost block" id="study">📖 Étudier les 7 visages</button>
        <label class="field">Durée du flash <select id="ms" class="input"><option value="1000">1 seconde (débutant)</option><option value="500" selected>0,5 seconde</option><option value="250">0,25 seconde</option><option value="120">0,12 seconde (expert)</option></select></label>
        <button class="btn primary block" id="go">Lancer 15 flashs</button>
        ${s?.best != null ? `<p class="muted small">Meilleur score : ${s.best} %</p>` : ''}
        <p class="muted small">Ces visages sont des schémas simplifiés pour apprendre les indices. Entraînez-vous ensuite sur de vraies vidéos.</p></section>`;
      el.querySelector('#study').onclick = study;
      el.querySelector('#go').onclick = () => play(Number(el.querySelector('#ms').value));
    };
    const study = () => {
      el.innerHTML = `<button class="btn ghost" id="bk">← Retour</button><div class="face-grid">
        <div class="card center">${face('neutre')}<strong>Neutre</strong><p class="muted small">La ligne de base.</p></div>
        ${keys.map((k) => `<div class="card center">${face(k)}<strong>${EMOTIONS[k].label}</strong><p class="muted small">${EMOTIONS[k].tip}</p></div>`).join('')}</div>`;
      el.querySelector('#bk').onclick = home;
    };
    const play = (ms) => {
      const seq = Array.from({ length: 15 }, () => pick(keys));
      let i = 0, good = 0;
      const next = () => {
        if (i >= seq.length) {
          const score = Math.round((good / seq.length) * 100);
          const xp = Math.round(good * (ms <= 250 ? 1.5 : 1));
          ctx.finish(score, xp);
          el.innerHTML = `<section class="card result center"><div class="big">${score >= 80 ? '👁️' : '💪'}</div><h2>${good}/${seq.length} · ${score} %</h2>
            <p class="muted">${score >= 80 ? 'Excellent œil ! Essayez un flash plus court.' : 'Revoyez les indices dans le mode étude.'}</p>
            <button class="btn primary block" id="again">Rejouer</button><button class="btn ghost block" id="bk">Menu</button></section>`;
          el.querySelector('#again').onclick = () => play(ms);
          el.querySelector('#bk').onclick = home;
          return;
        }
        const target = seq[i];
        el.innerHTML = `<div class="muted small">${i + 1}/${seq.length} · ✅ ${good}</div>
          <section class="card center"><div id="stage">${face('neutre')}</div><p class="muted small" id="hint">Concentrez-vous…</p>
          <div class="options grid-opts" hidden>${shuffle(keys).map((k) => `<button class="opt" data-k="${k}">${EMOTIONS[k].label}</button>`).join('')}</div></section>`;
        const stage = el.querySelector('#stage');
        const opts = el.querySelector('.options');
        setTimeout(() => {
          stage.innerHTML = face(target);
          setTimeout(() => {
            stage.innerHTML = face('neutre');
            el.querySelector('#hint').textContent = 'Quelle émotion avez-vous vue ?';
            opts.hidden = false;
          }, ms);
        }, 700 + Math.random() * 900);
        opts.querySelectorAll('.opt').forEach((b) => (b.onclick = () => {
          const ok = b.dataset.k === target;
          if (ok) good++;
          opts.querySelectorAll('.opt').forEach((o) => { o.disabled = true; if (o.dataset.k === target) o.classList.add('right'); });
          if (!ok) b.classList.add('wrong');
          stage.innerHTML = face(target);
          el.querySelector('#hint').innerHTML = `<strong>${EMOTIONS[target].label}</strong> : ${EMOTIONS[target].tip}`;
          setTimeout(() => { i++; next(); }, ok ? 900 : 2200);
        }));
      };
      next();
    };
    home();
  },
};
