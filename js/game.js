// Mécaniques de jeu : cœurs, objectif quotidien, répétition espacée, succès, sons, mascotte
import { store, today } from './store.js';

// ---------- Cœurs ----------
export const MAX_HEARTS = 5;
const REGEN_MS = 20 * 60 * 1000;

export const zen = () => !!store.get().settings.zen;

export function hearts() {
  if (zen()) return Infinity;
  const h = store.getData('hearts', { n: MAX_HEARTS, ts: Date.now() });
  if (h.n >= MAX_HEARTS) return MAX_HEARTS;
  const gained = Math.floor((Date.now() - h.ts) / REGEN_MS);
  if (gained > 0) {
    const n = Math.min(MAX_HEARTS, h.n + gained);
    store.setData('hearts', { n, ts: h.ts + gained * REGEN_MS });
    return n;
  }
  return h.n;
}
export function nextHeartIn() {
  const h = store.getData('hearts', { n: MAX_HEARTS, ts: Date.now() });
  if (hearts() >= MAX_HEARTS) return 0;
  return Math.max(0, REGEN_MS - ((Date.now() - h.ts) % REGEN_MS));
}
export function loseHeart() {
  if (zen()) return Infinity;
  const n = hearts();
  const h = store.getData('hearts', { n, ts: Date.now() });
  store.setData('hearts', { n: Math.max(0, n - 1), ts: n >= MAX_HEARTS ? Date.now() : h.ts });
  return Math.max(0, n - 1);
}
export function gainHeart(k = 1) {
  const n = hearts();
  if (n === Infinity) return;
  const h = store.getData('hearts', { n, ts: Date.now() });
  store.setData('hearts', { n: Math.min(MAX_HEARTS, n + k), ts: h.ts });
}

// ---------- Objectif quotidien ----------
export const dailyGoal = () => store.get().settings.dailyGoal || 30;
export const todayXp = () => store.get().activity[today()] || 0;

// ---------- Répétition espacée (système de Leitner) ----------
const BOX_DAYS = [0, 1, 3, 7, 16, 35];
export function srsRecord(id, ok) {
  const srs = store.getData('srs', {});
  const cur = srs[id] || { box: 0 };
  const box = ok ? Math.min(BOX_DAYS.length - 1, cur.box + 1) : 1;
  srs[id] = { box, due: Date.now() + BOX_DAYS[box] * 86400000, miss: (cur.miss || 0) + (ok ? 0 : 1) };
  store.setData('srs', srs);
}
export function srsDue() {
  const srs = store.getData('srs', {});
  return Object.entries(srs).filter(([, v]) => v.due <= Date.now()).sort((a, b) => a[1].box - b[1].box || b[1].miss - a[1].miss).map(([k]) => k);
}
export function srsStats() {
  const srs = store.getData('srs', {});
  const v = Object.values(srs);
  return { total: v.length, mastered: v.filter((x) => x.box >= 4).length, due: srsDue().length };
}

// ---------- Sons (Web Audio, sans fichier) ----------
let ac;
export function sound(kind) {
  if (store.get().settings.sound === false) return;
  try {
    ac = ac || new (window.AudioContext || window.webkitAudioContext)();
    const notes = { ok: [[660, 0], [880, 0.09]], ko: [[220, 0], [180, 0.12]], done: [[523, 0], [659, 0.1], [784, 0.2], [1047, 0.3]], tap: [[440, 0]] }[kind] || [];
    notes.forEach(([f, t]) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = kind === 'ko' ? 'triangle' : 'sine';
      o.frequency.value = f;
      const s = ac.currentTime + t;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(kind === 'tap' ? 0.05 : 0.18, s + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, s + 0.22);
      o.connect(g).connect(ac.destination);
      o.start(s); o.stop(s + 0.25);
    });
  } catch { /* audio indisponible */ }
}

// ---------- Mascotte ----------
export const MASCOT = '🔮';
const LINES = {
  start: ['Prêt ? Une petite session et c’est parti !', 'Cinq minutes par jour suffisent pour progresser.', 'Les plus grands mentalistes ont commencé exactement ici.'],
  perfect: ['Sans faute ! Votre esprit est affûté.', 'Parfait. Le public n’a aucune chance.', 'Impressionnant : 100 % de réussite !'],
  good: ['Bien joué ! Les erreurs reviendront en révision.', 'Belle session. On consolide demain ?', 'Vous progressez, ça se voit.'],
  combo: ['Quelle série !', 'Vous êtes en feu !', 'Rien ne vous arrête !'],
  hearts: ['Plus de cœurs… Un petit entraînement pour en regagner ?', 'Pause ! Révisez pour recharger vos cœurs.'],
  goal: ['Objectif du jour atteint ! 🎯', 'Bravo, objectif rempli. Revenez demain pour la série !'],
};
export const say = (k) => LINES[k][Math.floor(Math.random() * LINES[k].length)];

// ---------- Succès ----------
export const BADGES = [
  { id: 'first', icon: '🎩', name: 'Premier pas', desc: 'Terminer une première leçon', test: (s) => Object.keys(s.completed).length >= 1 },
  { id: 'ten', icon: '📚', name: 'Apprenti studieux', desc: 'Terminer 10 leçons', test: (s) => Object.keys(s.completed).length >= 10 },
  { id: 'half', icon: '🧭', name: 'À mi-chemin', desc: 'Terminer 23 leçons', test: (s) => Object.keys(s.completed).length >= 23 },
  { id: 'all', icon: '👑', name: 'Maître du parcours', desc: 'Terminer les 45 leçons', test: (s) => Object.keys(s.completed).length >= 45 },
  { id: 'perfect', icon: '💎', name: 'Sans faute', desc: 'Finir une leçon sans erreur', test: (s) => Object.values(s.completed).some((c) => c.score === 100) },
  { id: 'streak3', icon: '🔥', name: 'Ça chauffe', desc: 'Série de 3 jours', test: (s) => s.streak.count >= 3 },
  { id: 'streak7', icon: '🌋', name: 'Semaine de feu', desc: 'Série de 7 jours', test: (s) => s.streak.count >= 7 },
  { id: 'streak30', icon: '☄️', name: 'Inarrêtable', desc: 'Série de 30 jours', test: (s) => s.streak.count >= 30 },
  { id: 'xp500', icon: '⭐', name: '500 XP', desc: 'Gagner 500 XP', test: (s) => s.xp >= 500 },
  { id: 'xp2000', icon: '🌟', name: '2000 XP', desc: 'Gagner 2000 XP', test: (s) => s.xp >= 2000 },
  { id: 'labo', icon: '🧪', name: 'Chercheur', desc: 'Essayer 6 outils du Labo', test: (s) => Object.keys(s.toolStats).filter((k) => k !== 'revision').length >= 6 },
  { id: 'memory', icon: '🏛️', name: 'Palais de cristal', desc: '100 % au Palais de mémoire', test: (s) => (s.toolStats.palace?.best || 0) >= 100 },
  { id: 'eye', icon: '👁️', name: 'Œil de lynx', desc: '80 % ou plus en micro-expressions', test: (s) => (s.toolStats.micro?.best || 0) >= 80 },
  { id: 'journal', icon: '📓', name: 'Carnet de bord', desc: 'Écrire 5 entrées dans le journal', test: (s) => s.journal.length >= 5 },
  { id: 'week', icon: '📅', name: 'Semaine validée', desc: 'Valider une semaine du programme', test: (s) => Object.values(s.data.program?.weeks || {}).some((w) => w.validated) },
];
export function checkBadges() {
  const s = store.get();
  const got = store.getData('badges', {});
  const fresh = BADGES.filter((b) => !got[b.id] && b.test(s));
  if (fresh.length) {
    fresh.forEach((b) => (got[b.id] = today()));
    store.setData('badges', got);
  }
  return fresh;
}
