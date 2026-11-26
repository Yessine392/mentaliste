// Effets visuels : anneaux de progression, confettis, vibrations, halo lumineux
export function ring(pct, { size = 64, stroke = 7, color = 'url(#ringGrad)', label = '' } = {}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(100, Math.max(0, pct)) / 100);
  return `<svg class="ring" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" aria-label="${pct} %">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-bg" stroke-width="${stroke}"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="ring-fg" stroke="${color}" stroke-width="${stroke}"
      stroke-dasharray="${c.toFixed(2)}" stroke-dashoffset="${c.toFixed(2)}" style="--off:${off.toFixed(2)}" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    ${label ? `<text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" class="ring-label">${label}</text>` : ''}
  </svg>`;
}

export function haptic(kind) {
  try { if (navigator.vibrate) navigator.vibrate(kind === 'ko' ? [30, 40, 30] : 12); } catch { /* pas de vibration */ }
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function confetti(n = 90) {
  if (reduced()) return;
  const cv = document.createElement('canvas');
  cv.className = 'confetti';
  const dpr = window.devicePixelRatio || 1;
  cv.width = innerWidth * dpr;
  cv.height = innerHeight * dpr;
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  ctx.scale(dpr, dpr);
  const colors = ['#f4c36b', '#c4b0ff', '#8a63ff', '#4ad295', '#ff8fb1', '#7cc4f0'];
  const ps = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 12, vy: -Math.random() * 12 - 4,
    s: 4 + Math.random() * 6, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    c: colors[(Math.random() * colors.length) | 0],
  }));
  let t = 0;
  const tick = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ps.forEach((p) => {
      p.vy += 0.32; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - t / 110);
      ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    });
    if (++t < 120) requestAnimationFrame(tick); else cv.remove();
  };
  tick();
}

// Halo qui suit le pointeur sur les cartes (ordinateur)
export function initSpotlight() {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest?.('.card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

// Barre de lecture en haut de l'écran
export function initReadProgress() {
  const bar = document.getElementById('readbar');
  if (!bar) return;
  const upd = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 40 ? Math.min(1, scrollY / h) : 0})`;
  };
  addEventListener('scroll', upd, { passive: true });
  addEventListener('hashchange', () => setTimeout(upd, 50));
}
