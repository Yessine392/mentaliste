// Persistance locale de la progression (localStorage)
const KEY = 'mentaliste.v1';

const defaults = () => ({
  completed: {}, // lessonId -> { score, date }
  xp: 0,
  streak: { last: null, count: 0 },
  activity: {}, // 'YYYY-MM-DD' -> xp gagnés
  toolStats: {}, // toolId -> { best, sessions }
  journal: [], // { id, date, title, text, type }
  settings: { unlockAll: false },
  data: {}, // données libres des outils (sondages, etc.)
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaults();
    return { ...defaults(), ...JSON.parse(raw) };
  } catch {
    return defaults();
  }
}

function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* stockage indisponible */ }
}

export const today = () => new Date().toISOString().slice(0, 10);

function touchStreak() {
  const t = today();
  if (state.streak.last === t) return;
  const y = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  state.streak.count = state.streak.last === y ? state.streak.count + 1 : 1;
  state.streak.last = t;
}

export const store = {
  get: () => state,
  addXp(amount) {
    state.xp += amount;
    const t = today();
    state.activity[t] = (state.activity[t] || 0) + amount;
    touchStreak();
    save();
  },
  completeLesson(id, score) {
    const prev = state.completed[id];
    const first = !prev;
    if (!prev || score > prev.score) state.completed[id] = { score, date: today() };
    save();
    return first;
  },
  isDone: (id) => Boolean(state.completed[id]),
  recordTool(toolId, score) {
    const s = state.toolStats[toolId] || { best: null, sessions: 0 };
    s.sessions += 1;
    if (score != null && (s.best == null || score > s.best)) s.best = score;
    state.toolStats[toolId] = s;
    save();
    return s;
  },
  addJournal(entry) {
    state.journal.unshift({ id: Date.now(), date: today(), ...entry });
    save();
  },
  removeJournal(id) {
    state.journal = state.journal.filter((e) => e.id !== id);
    save();
  },
  setSetting(k, v) { state.settings[k] = v; save(); },
  getData: (k, def) => (state.data[k] ?? def),
  setData(k, v) { state.data[k] = v; save(); },
  export: () => JSON.stringify(state, null, 2),
  import(json) {
    const data = JSON.parse(json);
    if (typeof data !== 'object' || !data.completed) throw new Error('Fichier invalide');
    state = { ...defaults(), ...data };
    save();
  },
  reset() { state = defaults(); save(); },
};

export const ranks = [
  { xp: 0, name: 'Curieux', icon: '🌱' },
  { xp: 150, name: 'Novice', icon: '🕯️' },
  { xp: 400, name: 'Apprenti', icon: '📜' },
  { xp: 800, name: 'Praticien', icon: '🃏' },
  { xp: 1300, name: 'Illusionniste de l’esprit', icon: '🌀' },
  { xp: 2000, name: 'Mentaliste', icon: '🔮' },
  { xp: 3000, name: 'Maître mentaliste', icon: '👑' },
];

export function rankFor(xp) {
  let r = ranks[0], next = null;
  for (let i = 0; i < ranks.length; i++) {
    if (xp >= ranks[i].xp) { r = ranks[i]; next = ranks[i + 1] || null; }
  }
  return { ...r, next };
}
