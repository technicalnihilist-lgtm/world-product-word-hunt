/* ============================================================================
   WORLD PRODUCT WORD HUNT — engine
   Pure vanilla JS, no dependencies, works offline from file:// or a WebView.
   ============================================================================ */
'use strict';

/* ------------------------------- i18n ------------------------------------ */
const I18N = {
  en: {
    play: 'Play', chooseMode: 'Choose mode', level: 'Level', coins: 'Coins', streak: 'Streak', days: 'days',
    wordsFound: 'Words found', dailyChallenge: 'Daily challenge', playDaily: 'Play daily challenge',
    catalogue: 'Catalogue', products: 'products', leaderboard: 'Leaderboard', achievements: 'Achievements',
    modes: 'Game modes', howToPlay: 'How to play', credits: 'Credits', settings: 'Settings',
    pickDifficulty: 'Pick your challenge', score: 'Score', time: 'Time', letterGrid: 'Letter grid',
    remaining: 'Remaining', hint: 'Hint', pause: 'Pause', restart: 'Restart', findThese: 'Find these products',
    settingsSub: 'Sound, look, language, data', audio: 'Audio & feedback', sound: 'Sound effects',
    soundHint: 'Correct, wrong and win sounds', music: 'Background music', musicHint: 'Gentle generated loop',
    vibration: 'Vibration', vibrationHint: 'Haptic feedback on mobile', appearance: 'Appearance', theme: 'Theme',
    themeHint: 'Dark is easier at night', language: 'Language', languageHint: 'Interface language',
    difficulty: 'Difficulty', difficultyHint: 'Used by quick play', more: 'More', refresh: 'Refresh catalogue',
    reset: 'Reset progress', instructions: 'Instructions', paused: 'Paused', pausedSub: 'Timer stopped. Take your time.',
    resume: 'Resume', mainMenu: 'Main menu', best: 'Best', nextLevel: 'Next level', playAgain: 'Play again',
    leaderboardSub: 'Stored on this device', easy: 'Easy', medium: 'Medium', hard: 'Hard', expert: 'Expert',
    unlimited: 'Unlimited', daily: 'Daily challenge', quickPlay: 'Quick play', words: 'words',
    modeNote: 'Every mode draws from the same expanding catalogue. Difficulty changes the grid size, word count, timer and allowed directions (H = horizontal, V = vertical, D = diagonal, rev = backwards).',
  },
  hi: {
    play: 'खेलें', chooseMode: 'मोड चुनें', level: 'स्तर', coins: 'सिक्के', streak: 'स्ट्रीक', days: 'दिन',
    wordsFound: 'मिले शब्द', dailyChallenge: 'दैनिक चुनौती', playDaily: 'दैनिक चुनौती खेलें',
    catalogue: 'उत्पाद सूची', products: 'उत्पाद', leaderboard: 'लीडरबोर्ड', achievements: 'उपलब्धियाँ',
    modes: 'गेम मोड', howToPlay: 'कैसे खेलें', credits: 'श्रेय', settings: 'सेटिंग्स',
    pickDifficulty: 'अपनी चुनौती चुनें', score: 'अंक', time: 'समय', letterGrid: 'अक्षर जाल',
    remaining: 'शेष', hint: 'संकेत', pause: 'रोकें', restart: 'फिर शुरू', findThese: 'ये उत्पाद खोजें',
    settingsSub: 'ध्वनि, रूप, भाषा, डेटा', audio: 'ध्वनि और प्रतिक्रिया', sound: 'ध्वनि प्रभाव',
    soundHint: 'सही, गलत और जीत की आवाज़', music: 'पृष्ठभूमि संगीत', musicHint: 'हल्का स्वर-लूप',
    vibration: 'कंपन', vibrationHint: 'मोबाइल पर हल्का कंपन', appearance: 'रूप', theme: 'थीम',
    themeHint: 'रात में डार्क आसान है', language: 'भाषा', languageHint: 'इंटरफ़ेस भाषा',
    difficulty: 'कठिनाई', difficultyHint: 'क्विक प्ले में उपयोग', more: 'अधिक', refresh: 'सूची ताज़ा करें',
    reset: 'प्रगति मिटाएँ', instructions: 'निर्देश', paused: 'रुका हुआ', pausedSub: 'समय रुका है। आराम से खेलें।',
    resume: 'जारी रखें', mainMenu: 'मुख्य मेनू', best: 'सर्वश्रेष्ठ', nextLevel: 'अगला स्तर', playAgain: 'फिर खेलें',
    leaderboardSub: 'इस डिवाइस पर सहेजा गया', easy: 'आसान', medium: 'मध्यम', hard: 'कठिन', expert: 'विशेषज्ञ',
    unlimited: 'असीमित', daily: 'दैनिक चुनौती', quickPlay: 'तुरंत खेलें', words: 'शब्द',
    modeNote: 'सभी मोड एक ही बढ़ती उत्पाद सूची से बनते हैं। कठिनाई जाल का आकार, शब्दों की संख्या, समय और दिशाएँ बदलती है (H = क्षैतिज, V = लंबवत, D = तिरछा, rev = उल्टा)।',
  },
  es: {
    play: 'Jugar', chooseMode: 'Elegir modo', level: 'Nivel', coins: 'Monedas', streak: 'Racha', days: 'días',
    wordsFound: 'Palabras encontradas', dailyChallenge: 'Desafío diario', playDaily: 'Jugar el desafío diario',
    catalogue: 'Catálogo', products: 'productos', leaderboard: 'Clasificación', achievements: 'Logros',
    modes: 'Modos de juego', howToPlay: 'Cómo jugar', credits: 'Créditos', settings: 'Ajustes',
    pickDifficulty: 'Elige tu reto', score: 'Puntuación', time: 'Tiempo', letterGrid: 'Cuadrícula',
    remaining: 'Restantes', hint: 'Pista', pause: 'Pausa', restart: 'Reiniciar', findThese: 'Encuentra estos productos',
    settingsSub: 'Sonido, aspecto, idioma, datos', audio: 'Audio y respuesta', sound: 'Efectos de sonido',
    soundHint: 'Sonidos de acierto, error y victoria', music: 'Música de fondo', musicHint: 'Bucle suave generado',
    vibration: 'Vibración', vibrationHint: 'Respuesta háptica en móvil', appearance: 'Aspecto', theme: 'Tema',
    themeHint: 'El oscuro es mejor de noche', language: 'Idioma', languageHint: 'Idioma de la interfaz',
    difficulty: 'Dificultad', difficultyHint: 'Se usa en partida rápida', more: 'Más', refresh: 'Actualizar catálogo',
    reset: 'Borrar progreso', instructions: 'Instrucciones', paused: 'En pausa', pausedSub: 'Tiempo detenido. Sin prisa.',
    resume: 'Continuar', mainMenu: 'Menú principal', best: 'Mejor', nextLevel: 'Siguiente nivel', playAgain: 'Jugar otra vez',
    leaderboardSub: 'Guardado en este dispositivo', easy: 'Fácil', medium: 'Medio', hard: 'Difícil', expert: 'Experto',
    unlimited: 'Ilimitado', daily: 'Desafío diario', quickPlay: 'Partida rápida', words: 'palabras',
    modeNote: 'Todos los modos usan el mismo catálogo en crecimiento. La dificultad cambia el tamaño de la cuadrícula, las palabras, el tiempo y las direcciones (H = horizontal, V = vertical, D = diagonal, rev = al revés).',
  },
  fr: {
    play: 'Jouer', chooseMode: 'Choisir un mode', level: 'Niveau', coins: 'Pièces', streak: 'Série', days: 'jours',
    wordsFound: 'Mots trouvés', dailyChallenge: 'Défi du jour', playDaily: 'Jouer le défi du jour',
    catalogue: 'Catalogue', products: 'produits', leaderboard: 'Classement', achievements: 'Succès',
    modes: 'Modes de jeu', howToPlay: 'Comment jouer', credits: 'Crédits', settings: 'Réglages',
    pickDifficulty: 'Choisissez votre défi', score: 'Score', time: 'Temps', letterGrid: 'Grille de lettres',
    remaining: 'Restants', hint: 'Indice', pause: 'Pause', restart: 'Recommencer', findThese: 'Trouvez ces produits',
    settingsSub: 'Son, apparence, langue, données', audio: 'Son et retours', sound: 'Effets sonores',
    soundHint: 'Sons de réussite, erreur et victoire', music: 'Musique de fond', musicHint: 'Boucle douce générée',
    vibration: 'Vibration', vibrationHint: 'Retour haptique sur mobile', appearance: 'Apparence', theme: 'Thème',
    themeHint: "Le sombre est plus reposant la nuit", language: 'Langue', languageHint: "Langue de l'interface",
    difficulty: 'Difficulté', difficultyHint: 'Utilisée en partie rapide', more: 'Plus', refresh: 'Actualiser le catalogue',
    reset: 'Réinitialiser la progression', instructions: 'Instructions', paused: 'En pause', pausedSub: 'Chrono arrêté. Prenez votre temps.',
    resume: 'Reprendre', mainMenu: 'Menu principal', best: 'Meilleur', nextLevel: 'Niveau suivant', playAgain: 'Rejouer',
    leaderboardSub: 'Enregistré sur cet appareil', easy: 'Facile', medium: 'Moyen', hard: 'Difficile', expert: 'Expert',
    unlimited: 'Illimité', daily: 'Défi du jour', quickPlay: 'Partie rapide', words: 'mots',
    modeNote: "Tous les modes puisent dans le même catalogue évolutif. La difficulté change la taille de la grille, le nombre de mots, le chrono et les directions (H = horizontal, V = vertical, D = diagonal, rev = à l'envers).",
  },
  de: {
    play: 'Spielen', chooseMode: 'Modus wählen', level: 'Level', coins: 'Münzen', streak: 'Serie', days: 'Tage',
    wordsFound: 'Gefundene Wörter', dailyChallenge: 'Tägliche Herausforderung', playDaily: 'Tägliche Herausforderung spielen',
    catalogue: 'Katalog', products: 'Produkte', leaderboard: 'Rangliste', achievements: 'Erfolge',
    modes: 'Spielmodi', howToPlay: 'Spielanleitung', credits: 'Danksagungen', settings: 'Einstellungen',
    pickDifficulty: 'Wähle deine Herausforderung', score: 'Punkte', time: 'Zeit', letterGrid: 'Buchstabengitter',
    remaining: 'Verbleibend', hint: 'Hinweis', pause: 'Pause', restart: 'Neustart', findThese: 'Finde diese Produkte',
    settingsSub: 'Ton, Aussehen, Sprache, Daten', audio: 'Audio und Feedback', sound: 'Soundeffekte',
    soundHint: 'Töne für richtig, falsch und Sieg', music: 'Hintergrundmusik', musicHint: 'Sanfte erzeugte Schleife',
    vibration: 'Vibration', vibrationHint: 'Haptisches Feedback am Handy', appearance: 'Aussehen', theme: 'Design',
    themeHint: 'Dunkel ist nachts angenehmer', language: 'Sprache', languageHint: 'Sprache der Oberfläche',
    difficulty: 'Schwierigkeit', difficultyHint: 'Wird im Schnellspiel genutzt', more: 'Mehr', refresh: 'Katalog aktualisieren',
    reset: 'Fortschritt löschen', instructions: 'Anleitung', paused: 'Pausiert', pausedSub: 'Zeit gestoppt. Lass dir Zeit.',
    resume: 'Fortsetzen', mainMenu: 'Hauptmenü', best: 'Bestwert', nextLevel: 'Nächstes Level', playAgain: 'Nochmal spielen',
    leaderboardSub: 'Auf diesem Gerät gespeichert', easy: 'Leicht', medium: 'Mittel', hard: 'Schwer', expert: 'Experte',
    unlimited: 'Unbegrenzt', daily: 'Tägliche Herausforderung', quickPlay: 'Schnellspiel', words: 'Wörter',
    modeNote: 'Alle Modi nutzen denselben wachsenden Katalog. Die Schwierigkeit ändert Gittergröße, Wortzahl, Zeit und Richtungen (H = waagerecht, V = senkrecht, D = diagonal, rev = rückwärts).'
  }
};
const LANGS = [['en', 'English'], ['hi', 'हिन्दी'], ['es', 'Español'], ['fr', 'Français'], ['de', 'Deutsch']];

/* ------------------------------ storage ---------------------------------- */
const STORE_KEY = 'wpwh.state.v1';
const DEFAULT_STATE = {
  settings: { sound: true, music: true, vibration: true, theme: 'dark', lang: 'en', difficulty: 'easy' },
  coins: 120, xp: 0, level: 1,
  stats: { words: 0, games: 0, wins: 0, perfect: 0, coinsTotal: 0, countries: {}, categories: {}, fastest: 99, dailyDone: '' },
  best: { easy: 0, medium: 0, hard: 0, expert: 0, unlimited: 0, daily: 0 },
  board: [], ach: {}, streak: { count: 0, last: '' }, daily: { last: '', day: 0 },
  recent: [], levels: { easy: 1, medium: 1, hard: 1, expert: 1, unlimited: 1, daily: 1 }
};
let S = load();

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return structuredClone(DEFAULT_STATE);
    const parsed = JSON.parse(raw);
    return deepMerge(structuredClone(DEFAULT_STATE), parsed);
  } catch (e) { return structuredClone(DEFAULT_STATE); }
}
function deepMerge(base, extra) {
  if (!extra || typeof extra !== 'object') return base;
  for (const k of Object.keys(extra)) {
    if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && typeof extra[k] === 'object') deepMerge(base[k], extra[k]);
    else base[k] = extra[k];
  }
  return base;
}
let saveTimer = null;
function save(now) {
  const write = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify(S)); } catch (e) {} };
  if (now) return write();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(write, 250);
}
const t = (key) => (I18N[S.settings.lang] && I18N[S.settings.lang][key]) || I18N.en[key] || key;

/* ------------------------------ helpers ---------------------------------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const todayKey = () => new Date().toISOString().slice(0, 10);
const fmtTime = (s) => {
  s = Math.max(0, Math.ceil(s));
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
};
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rnd = Math.random;

/* --------------------------- inline SVG icons ----------------------------- */
const SVG_ICONS = {
  play: '<polygon points="7,4 20,12 7,20" class="fill"/>',
  pause: '<rect x="7" y="4.5" width="3.6" height="15" rx="1.5" class="fill"/><rect x="13.4" y="4.5" width="3.6" height="15" rx="1.5" class="fill"/>',
  settings: '<path d="M4 7h8M17 7h3M4 17h3M11 17h9"/><circle cx="14.5" cy="7" r="2.4"/><circle cx="8.5" cy="17" r="2.4"/>',
  back: '<path d="M15 4.5 7.5 12 15 19.5"/><path d="M8 12h11"/>',
  hint: '<path d="M9.5 18h5M10.5 21h3"/><path d="M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
  restart: '<path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20.5 4v4.8h-4.8"/>',
  refresh: '<path d="M4.2 12a7.8 7.8 0 0 1 13.3-5.5"/><path d="M19.8 12a7.8 7.8 0 0 1-13.3 5.5"/><path d="M18 2.8v4.4h-4.4"/><path d="M6 21.2v-4.4h4.4"/>',
  trash: '<path d="M4 7h16"/><path d="M9.5 7V4.2h5V7"/><path d="M6.5 7 7.6 20.5h8.8L17.5 7"/>',
  trophy: '<path d="M8 4h8v5.5a4 4 0 0 1-8 0z"/><path d="M8 5.2H5v1.9a3 3 0 0 0 3 3"/><path d="M16 5.2h3v1.9a3 3 0 0 1-3 3"/><path d="M12 13.5V17"/><path d="M8.8 21h6.4"/>',
  medal: '<circle cx="12" cy="15" r="4.6"/><path d="M8.6 4.5 12 10l3.4-5.5"/>',
  book: '<path d="M5 4.2h9a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M8 4.2v16"/>',
  copy: '<circle cx="12" cy="12" r="8.6"/><path d="M14.8 9.6a3.4 3.4 0 1 0 0 4.8"/>',
  globe: '<circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2"/><path d="M12 3.4c3 3.4 3 13.8 0 17.2M12 3.4c-3 3.4-3 13.8 0 17.2"/>',
  lock: '<rect x="5" y="10.8" width="14" height="9.4" rx="2.2"/><path d="M8.6 10.8V8a3.4 3.4 0 0 1 6.8 0v2.8"/>',
  check: '<path d="M5 12.8 9.4 17.4 19 6.8"/>',
  star: '<polygon points="12,3.4 14.7,9 20.7,9.8 16.3,14 17.4,20 12,17.1 6.6,20 7.7,14 3.3,9.8 9.3,9" class="fill"/>',
  gift: '<rect x="3.4" y="9" width="17.2" height="11.4" rx="2.2"/><path d="M3.4 13.2h17.2"/><path d="M12 9v11.4"/><path d="M12 9C10 9 7.8 8.2 7.8 6.4A2.4 2.4 0 0 1 12.3 5c.4 1 .4 2.4-.3 4z"/><path d="M12 9c2 0 4.2-.8 4.2-2.6A2.4 2.4 0 0 0 11.7 5c-.4 1-.4 2.4.3 4z"/>',
  coin: '<circle cx="12" cy="12" r="8.4"/><path d="M14.7 9.8a3.1 3.1 0 0 0-4.9.6c-.6 1.2.4 2 1.9 2.4 1.5.4 2.5 1 1.9 2.2a3.1 3.1 0 0 1-4.9.6"/>',
  chevron: '<path d="M9 5l7 7-7 7"/>'
};
const ico = (name, cls = '') => `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SVG_ICONS[name] || ''}</svg>`;
function hydrateIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach((el) => {
    if (el.dataset.done) return;
    el.innerHTML = ico(el.dataset.icon);
    el.dataset.done = '1';
    el.style.display = 'inline-flex';
    el.style.alignItems = 'center';
  });
}


/* ------------------------------- audio ----------------------------------- */
const Sound = {
  ctx: null, musicTimer: null, step: 0,
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      try { this.ctx = new AC(); } catch (e) { return null; }
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    return this.ctx;
  },
  tone(freq, dur, type = 'sine', vol = 0.14, delay = 0, glide = 0) {
    if (!S.settings.sound) return;
    const ctx = this.ensure(); if (!ctx) return;
    const t0 = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + glide), t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + dur + 0.02);
  },
  click() { this.tone(520, 0.05, 'triangle', 0.07); },
  pick() { this.tone(660, 0.04, 'sine', 0.05); },
  correct() { [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.16, 'triangle', 0.13, i * 0.055)); },
  wrong() { this.tone(180, 0.18, 'sawtooth', 0.1, 0, -70); },
  coin() { this.tone(1046, 0.08, 'square', 0.08); this.tone(1568, 0.1, 'square', 0.06, 0.07); },
  win() { [523, 659, 784, 1046, 1318].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.12, i * 0.11)); },
  lose() { [392, 330, 262].forEach((f, i) => this.tone(f, 0.3, 'sine', 0.1, i * 0.14)); },
  startMusic() {
    if (!S.settings.music || this.musicTimer) return;
    const ctx = this.ensure(); if (!ctx) return;
    const scale = [220, 261.6, 293.7, 329.6, 392, 440, 523.3];
    this.musicTimer = setInterval(() => {
      if (!S.settings.music || !G.running || G.paused) return;
      const c = this.ensure(); if (!c) return;
      const n = scale[(this.step * 3 + 2) % scale.length];
      const t0 = c.currentTime;
      const osc = c.createOscillator(), g = c.createGain();
      osc.type = 'sine';
      osc.frequency.value = n;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.035, t0 + 0.25);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 1.5);
      osc.connect(g).connect(c.destination);
      osc.start(t0); osc.stop(t0 + 1.6);
      if (this.step % 4 === 0) this.tone(scale[(this.step) % 3] / 2, 1.2, 'sine', 0.02);
      this.step++;
    }, 900);
  },
  stopMusic() { if (this.musicTimer) { clearInterval(this.musicTimer); this.musicTimer = null; } }
};
function vibrate(pattern) {
  if (!S.settings.vibration) return;
  if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} }
}

/* ------------------------------ catalogue -------------------------------- */
const CATEGORY_STYLE = {
  Smartphones: { glyph: '📱', tint: '#6d5cff' }, Laptops: { glyph: '💻', tint: '#4f8dff' },
  Cars: { glyph: '🚗', tint: '#ff6b6b' }, Bikes: { glyph: '🏍️', tint: '#ff9f43' },
  Clothing: { glyph: '👕', tint: '#ff4d9d' }, Shoes: { glyph: '👟', tint: '#2ee6a8' },
  Watches: { glyph: '⌚', tint: '#c084fc' }, Electronics: { glyph: '🔌', tint: '#38bdf8' },
  Cosmetics: { glyph: '💄', tint: '#fb7185' }, Beauty: { glyph: '🧴', tint: '#f472b6' },
  Food: { glyph: '🍫', tint: '#f59e0b' }, Drinks: { glyph: '🥤', tint: '#22d3ee' },
  Toys: { glyph: '🧸', tint: '#a78bfa' }, Furniture: { glyph: '🛋️', tint: '#94a3b8' },
  Appliances: { glyph: '🧺', tint: '#60a5fa' }, Sports: { glyph: '🏏', tint: '#34d399' },
  Gaming: { glyph: '🎮', tint: '#818cf8' }
};
const catStyle = (c) => CATEGORY_STYLE[c] || { glyph: '🎁', tint: '#7c5cff' };

const PRODUCTS = (CATALOG.products || []).filter((p) => p.letters && p.letters.length >= 4 && p.letters.length <= 14);
const BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
const COUNTRIES = Array.from(new Set(PRODUCTS.map((p) => p.country))).sort();
const CATEGORIES = Array.from(new Set(PRODUCTS.map((p) => p.category))).sort();

/* -------------------------------- modes ---------------------------------- */
const MODES = {
  easy:      { size: 8,  words: 3, time: 180, dirs: [[0, 1], [1, 0], [1, 1]], tint: 'rgba(46,230,168,.5)', label: 'easy' },
  medium:    { size: 10, words: 4, time: 200, dirs: [[0, 1], [1, 0], [1, 1], [0, -1]], tint: 'rgba(56,189,248,.5)', label: 'medium' },
  hard:      { size: 12, words: 5, time: 240, dirs: [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1]], tint: 'rgba(255,193,77,.5)', label: 'hard' },
  expert:    { size: 14, words: 6, time: 300, dirs: [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]], tint: 'rgba(255,77,157,.5)', label: 'expert' },
  unlimited: { size: 12, words: 5, time: 0,   dirs: [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]], tint: 'rgba(167,139,250,.5)', label: 'unlimited' },
  daily:     { size: 10, words: 4, time: 240, dirs: [[0, 1], [1, 0], [1, 1], [0, -1], [-1, 0], [-1, -1], [1, -1], [-1, 1]], tint: 'rgba(255,193,77,.5)', label: 'daily' }
};
const MODE_ORDER = ['easy', 'medium', 'hard', 'expert', 'unlimited', 'daily'];

/* --------------------------- puzzle generation --------------------------- */
function pickWords(cfg, rng, need) {
  const maxLen = Math.min(cfg.size, 12);
  const pool = PRODUCTS.filter((p) => p.letters.length >= 4 && p.letters.length <= maxLen);
  const recent = new Set(S.recent);
  const fresh = pool.filter((p) => !recent.has(p.id));
  const source = fresh.length >= need * 3 ? fresh : pool;
  const picked = [];
  const usedLetters = new Set();
  let guard = 0;
  while (picked.length < need && guard++ < need * 400) {
    const p = source[Math.floor(rng() * source.length)];
    if (!p) break;
    if (usedLetters.has(p.letters)) continue;
    // avoid two words that are substrings of each other (confusing overlaps)
    if (picked.some((q) => q.letters.includes(p.letters) || p.letters.includes(q.letters))) continue;
    usedLetters.add(p.letters);
    picked.push(p);
  }
  return picked.sort((a, b) => b.letters.length - a.letters.length);
}

function placeWords(words, size, dirs, rng) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placed = [];
  for (const word of words) {
    const L = word.letters.length;
    let best = null;
    for (let attempt = 0; attempt < 600; attempt++) {
      const dir = dirs[Math.floor(rng() * dirs.length)];
      const [dr, dc] = dir;
      const rMin = dr < 0 ? L - 1 : 0, rMax = dr > 0 ? size - L : size - 1;
      const cMin = dc < 0 ? L - 1 : 0, cMax = dc > 0 ? size - L : size - 1;
      if (rMax < rMin || cMax < cMin) continue;
      const r0 = rMin + Math.floor(rng() * (rMax - rMin + 1));
      const c0 = cMin + Math.floor(rng() * (cMax - cMin + 1));
      let ok = true, overlap = 0;
      const cells = [];
      for (let i = 0; i < L; i++) {
        const r = r0 + dr * i, c = c0 + dc * i;
        if (r < 0 || c < 0 || r >= size || c >= size) { ok = false; break; }
        const cur = grid[r][c];
        if (cur && cur !== word.letters[i]) { ok = false; break; }
        if (cur === word.letters[i]) overlap++;
        cells.push([r, c]);
      }
      if (!ok) continue;
      if (!best || overlap > best.overlap) best = { r0, c0, dr, dc, cells, overlap };
      if (overlap > 0) break;
    }
    if (!best) continue;
    best.cells.forEach(([r, c], i) => { grid[r][c] = word.letters[i]; });
    placed.push({ product: word, cells: best.cells, dir: [best.dr, best.dc], start: [best.r0, best.c0] });
  }
  // fill the gaps
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const vowelBias = ['A', 'E', 'I', 'O', 'U', 'A', 'E', 'I', 'O', 'U', 'R', 'S', 'T', 'N', 'L'];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (!grid[r][c]) grid[r][c] = rng() < 0.42 ? vowelBias[Math.floor(rng() * vowelBias.length)] : letters[Math.floor(rng() * 26)];
    }
  }
  return { grid, placed };
}

function buildPuzzle(mode) {
  const cfg = MODES[mode];
  let seedRng = mode === 'daily' ? mulberry32(Number(todayKey().replace(/-/g, '')) % 2147483647) : rnd;
  let fallback = null;
  for (let attempt = 0; attempt < 60; attempt++) {
    const words = pickWords(cfg, seedRng, cfg.words);
    if (words.length < 2) continue;
    const { grid, placed } = placeWords(words, cfg.size, cfg.dirs, seedRng);
    if (placed.length === words.length) return { grid, placed, size: cfg.size };
    if (!fallback || placed.length > fallback.placed.length) fallback = { grid, placed, size: cfg.size };
    if (placed.length >= Math.min(3, cfg.words)) { fallback = fallback || { grid, placed, size: cfg.size }; }
  }
  return fallback;
}

/* ------------------------------ live extras ------------------------------ */
let LIVE = [];
try { LIVE = JSON.parse(localStorage.getItem('wpwh.live') || '[]'); } catch (e) { LIVE = []; }
const productsAll = () => (LIVE.length ? PRODUCTS.concat(LIVE.filter((p) => !BY_ID.has(p.id))) : PRODUCTS);

/* ------------------------------- game state ------------------------------ */
const G = {
  mode: null, cfg: null, size: 0, grid: [], placements: [], found: new Set(),
  total: 0, score: 0, coinsEarned: 0, words: 0, running: false, paused: false, ready: false,
  remaining: 0, timer: null, wrong: 0, lastFoundAt: 0, chain: 0, level: 1,
  sel: { anchor: null, path: [] }, dragging: false, daily: false, roundStart: 0, batch: 1
};

/* ------------------------------ DOM helpers ------------------------------ */
function toast(msg, kind = '') {
  const wrap = $('#toasts');
  const el = document.createElement('div');
  el.className = 'toast ' + kind;
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => { el.style.transition = 'opacity .3s, transform .3s'; el.style.opacity = '0'; el.style.transform = 'translateY(-8px)'; }, 2000);
  setTimeout(() => el.remove(), 2400);
}
function showScreen(name) {
  $$('.screen').forEach((s) => s.classList.toggle('active', s.id === 'screen-' + name));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function openOverlay(id) { $('#' + id).classList.add('open'); }
function closeOverlay(id) { $('#' + id).classList.remove('open'); }
function confetti() {
  const box = $('#confetti');
  box.classList.remove('hidden');
  box.innerHTML = '';
  const colors = ['#7c5cff', '#ff4d9d', '#ffc14d', '#2ee6a8', '#38bdf8', '#fff'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('i');
    p.style.left = Math.random() * 100 + 'vw';
    p.style.background = colors[i % colors.length];
    p.style.animationDuration = (1.6 + Math.random() * 1.6) + 's';
    p.style.animationDelay = (Math.random() * 0.5) + 's';
    p.style.transform = `rotate(${Math.random() * 360}deg)`;
    box.appendChild(p);
  }
  setTimeout(() => { box.classList.add('hidden'); box.innerHTML = ''; }, 3600);
}

/* -------------------------------- HUD ------------------------------------ */
function updateHUD() {
  $('#g-score').textContent = G.score;
  $('#g-coins').textContent = S.coins;
  $('#g-remaining').textContent = Math.max(0, G.total - G.found.size);
  $('#g-timer').textContent = fmtTime(G.remaining);
  const pct = G.total ? (G.found.size / G.total) * 100 : 0;
  $('#g-progress').style.width = pct + '%';
  $('#g-timer-chip').classList.toggle('warn', G.cfg && G.cfg.time > 0 && G.remaining <= 20 && G.running);
  const m = MODES[G.mode] || MODES.easy;
  $('#g-mode').textContent = t(m.label);
  $('#g-level').textContent = t('level') + ' ' + G.level + (G.mode === 'unlimited' ? ' · ×' + G.batch : '');
  $$('#word-list .word-chip').forEach((chip) => {
    chip.classList.toggle('done', G.found.has(chip.dataset.id));
  });
  $('#btn-play').innerHTML = ico('play', 'fill') + ' ' + t('play');
  $('#btn-play').disabled = G.running;
}

function renderWordList() {
  const box = $('#word-list');
  box.innerHTML = '';
  G.placements.forEach((pl) => {
    const chip = document.createElement('button');
    chip.className = 'word-chip' + (G.found.has(pl.product.id) ? ' done' : '');
    chip.dataset.id = pl.product.id;
    chip.innerHTML = `<span>${pl.product.name}</span><span class="len">${pl.product.letters.length}</span>`;
    chip.addEventListener('click', () => { Sound.click(); renderProduct(pl.product); });
    box.appendChild(chip);
  });
}

function renderProduct(p, isNew) {
  const vis = $('#p-visual');
  const glyphEl = $('#p-glyph');
  const img = p.image && p.image.local ? p.image.local : null;
  const st = catStyle(p.category);
  vis.querySelectorAll('img').forEach((n) => n.remove());
  glyphEl.style.fontSize = '';
  glyphEl.style.width = ''; glyphEl.style.height = '';
  glyphEl.innerHTML = '';
  if (img) {
    const el = document.createElement('img');
    el.src = img; el.alt = p.name; el.loading = 'lazy';
    el.onerror = () => { el.remove(); glyphEl.classList.remove('hidden'); };
    vis.insertBefore(el, vis.firstChild);
    glyphEl.classList.add('hidden');
  } else {
    glyphEl.classList.remove('hidden');
    glyphEl.className = 'mono-glyph';
    glyphEl.textContent = (p.brand || p.name || '?').trim().charAt(0).toUpperCase();
    vis.style.background = `radial-gradient(120% 120% at 20% 10%, ${st.tint}66, transparent 60%), linear-gradient(140deg, ${st.tint}33, #0b1030 70%)`;
  }
  $('#p-name').textContent = p.name;
  $('#p-brand').textContent = p.brand;
  $('#p-len').textContent = p.letters.length + ' ' + (p.letters.length === 1 ? 'letter' : 'letters');
  $('#p-tags').innerHTML =
    `<span class="tag accent">${p.category}</span>` +
    `<span class="tag">${p.country}</span>` +
    `<span class="tag">${p.brand}</span>`;
  $('#p-desc').textContent = p.wiki && p.wiki.extract
    ? p.wiki.extract
    : `${p.name} by ${p.brand} — a product in the ${p.category} category, from ${p.country}.`;
  const w = p.wiki;
  $('#p-attrib').innerHTML = [
    w && w.url ? `Source: <a href="${w.url}" target="_blank" rel="noopener">Wikipedia — ${escapeHtml(w.title)}</a>` : '',
    p.image && p.image.local ? `Image: Wikimedia Commons, ${escapeHtml(p.image.licence)} — ${escapeHtml(p.image.author)}` : ''
  ].filter(Boolean).join(' · ') || 'No external source attached to this entry.';
  if (isNew) { vis.style.animation = 'none'; void vis.offsetWidth; vis.style.animation = 'fade .45s ease both'; }
}
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

function renderTeaser() {
  const st = { glyph: '🌍', tint: '#7c5cff' };
  $('#p-visual').querySelectorAll('img').forEach((n) => n.remove());
  $('#p-glyph').classList.remove('hidden');
  $('#p-glyph').className = 'product-glyph';
  $('#p-glyph').innerHTML = ico('globe');
  $('#p-glyph').style.fontSize = '0';
  $('#p-glyph').querySelector('svg').style.width = '56px';
  $('#p-glyph').querySelector('svg').style.height = '56px';
  $('#p-glyph').querySelector('svg').style.strokeWidth = '1.3';
  $('#p-visual').style.background = 'linear-gradient(140deg,#2a1f63,#46246b 45%,#7a2352)';
  $('#p-name').textContent = 'World catalogue';
  $('#p-brand').textContent = PRODUCTS.length + ' products · ' + COUNTRIES.length + ' countries';
  $('#p-len').textContent = '🌐';
  $('#p-tags').innerHTML = `<span class="tag accent">${CATEGORIES.length} categories</span><span class="tag">offline</span>`;
  $('#p-desc').textContent = 'Find a product name in the grid to reveal its card, brand, country and source.';
  $('#p-attrib').textContent = 'Product data verified against Wikipedia by the content agent.';
}

/* ------------------------------- grid UI --------------------------------- */
function renderGrid() {
  const grid = $('#grid');
  grid.style.gridTemplateColumns = `repeat(${G.size}, minmax(0, 1fr))`;
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  for (let r = 0; r < G.size; r++) {
    for (let c = 0; c < G.size; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.idx = String(r * G.size + c);
      cell.setAttribute('role', 'gridcell');
      cell.textContent = G.grid[r][c];
      frag.appendChild(cell);
    }
  }
  grid.appendChild(frag);
  fitCellFont();
}
function fitCellFont() {
  const grid = $('#grid');
  const w = grid.clientWidth || 360;
  const size = Math.max(6, Math.floor(w / G.size) * 0.52);
  grid.style.setProperty('--cell-font', size.toFixed(1) + 'px');
  grid.querySelectorAll('.cell').forEach((c) => { c.style.borderRadius = Math.max(7, Math.min(14, w / G.size * 0.18)) + 'px'; });
}
window.addEventListener('resize', () => { if (G.size) fitCellFont(); });

function paintSelection() {
  const cells = $('#grid').children;
  for (let i = 0; i < cells.length; i++) cells[i].classList.remove('sel');
  G.sel.path.forEach((idx) => { const el = cells[idx]; if (el) el.classList.add('sel'); });
}
function paintFound() {
  const cells = $('#grid').children;
  const foundCells = new Set();
  G.placements.forEach((pl) => { if (G.found.has(pl.product.id)) pl.cells.forEach(([r, c]) => foundCells.add(r * G.size + c)); });
  for (let i = 0; i < cells.length; i++) cells[i].classList.toggle('found', foundCells.has(i));
}

function pathBetween(a, b) {
  if (a === null || b === null) return null;
  const size = G.size;
  const r0 = Math.floor(a / size), c0 = a % size, r1 = Math.floor(b / size), c1 = b % size;
  const dr = Math.sign(r1 - r0), dc = Math.sign(c1 - c0);
  const dist = Math.max(Math.abs(r1 - r0), Math.abs(c1 - c0));
  if (dist === 0) return [a];
  if (!(dr === 0 || dc === 0 || Math.abs(r1 - r0) === Math.abs(c1 - c0))) return null;
  const out = [];
  for (let i = 0; i <= dist; i++) out.push((r0 + dr * i) * size + (c0 + dc * i));
  return out;
}
function idxFromPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el || !el.classList || !el.classList.contains('cell')) return null;
  return Number(el.dataset.idx);
}

/* ------------------------------ gameplay --------------------------------- */
function ensureRunning() {
  if (G.ready && !G.running) startClock();
}
function startClock() {
  if (G.running) return;
  G.ready = false; G.running = true; G.paused = false;
  clearInterval(G.timer);
  G.timer = setInterval(tick, 200);
  Sound.startMusic();
  updateHUD();
}
function tick() {
  if (!G.running || G.paused) return;
  if (G.cfg.time > 0) {
    G.remaining -= 0.2;
    if (G.remaining <= 0) { G.remaining = 0; updateHUD(); endGame(false); return; }
  } else {
    G.remaining += 0.2;
  }
  updateHUD();
}
function pauseGame() {
  if (!G.running || G.paused) return;
  G.paused = true;
  Sound.click();
  openOverlay('ov-pause');
}
function resumeGame() {
  if (!G.paused) return;
  G.paused = false;
  closeOverlay('ov-pause');
  Sound.click();
}

function startGame(mode, opts = {}) {
  const cfg = MODES[mode];
  if (!cfg) return;
  const puzzle = buildPuzzle(mode);
  if (!puzzle || !puzzle.placed.length) { toast('Catalogue too small — run the content agent.', 'bad'); return; }

  G.mode = mode; G.cfg = cfg; G.size = puzzle.size; G.grid = puzzle.grid;
  G.placements = puzzle.placed; G.found = new Set(); G.total = puzzle.placed.length;
  G.score = 0; G.coinsEarned = 0; G.words = 0; G.wrong = 0; G.chain = 0;
  G.remaining = cfg.time > 0 ? cfg.time : 0;
  G.running = false; G.paused = false; G.ready = true;
  G.sel = { anchor: null, path: [] };
  G.level = S.levels[mode] || 1;
  G.daily = mode === 'daily';
  G.roundStart = Date.now(); G.batch = 1;
  clearInterval(G.timer); G.timer = null;
  closeOverlay('ov-pause'); closeOverlay('ov-result');

  S.stats.games++;
  renderGrid(); renderWordList(); renderTeaser(); updateHUD();
  $('#g-coins').textContent = S.coins;
  showScreen('game');
  fitCellFont();
  setTimeout(fitCellFont, 60);
  G.placements.forEach((pl) => { if (!S.recent.includes(pl.product.id)) S.recent.push(pl.product.id); });
  S.recent = S.recent.slice(-160);
  save();
  toast(G.cfg.time ? t('play') + ' · ' + fmtTime(G.cfg.time) : t('unlimited'), 'good');
}

function evaluateSelection() {
  const path = G.sel.path;
  if (path.length < 2) return false;
  const letters = path.map((idx) => G.grid[Math.floor(idx / G.size)][idx % G.size]).join('');
  const reversed = letters.split('').reverse().join('');
  const hit = G.placements.find((pl) => !G.found.has(pl.product.id) &&
    (pl.product.letters === letters || pl.product.letters === reversed));
  if (hit) { wordFound(hit); return true; }
  G.wrong++;
  Sound.wrong();
  vibrate([12, 40, 12]);
  G.chain = 0;
  return false;
}

function wordFound(pl) {
  const p = pl.product;
  G.found.add(p.id);
  G.words++;
  const now = Date.now();
  const gap = (now - G.lastFoundAt) / 1000;
  G.chain = gap < 8 ? G.chain + 1 : 1;
  G.lastFoundAt = now;
  const base = p.letters.length * 10;
  const mult = 1 + (G.chain - 1) * 0.25;
  const bonus = G.cfg.time > 0 ? Math.round(G.remaining / 6) : 0;
  const pts = Math.round(base * mult + bonus);
  G.score += pts;
  const coins = (p.letters.length >= 8 ? 8 : 5) * (G.daily ? 2 : 1);
  G.coinsEarned += coins;

  S.stats.words++;
  S.stats.countries[p.country] = (S.stats.countries[p.country] || 0) + 1;
  S.stats.categories[p.category] = (S.stats.categories[p.category] || 0) + 1;
  const took = (now - (G.roundStart || now)) / 1000;
  if (G.words === 1 && took < S.stats.fastest) S.stats.fastest = Math.round(took * 10) / 10;

  Sound.correct(); Sound.coin();
  vibrate([18, 30, 18]);
  paintFound();
  renderProduct(p, true);
  renderWordList();
  updateHUD();
  toast(`+${pts}  ${p.name}`, 'good');
  const vis = $('#p-visual');
  vis.classList.add('pop');
  setTimeout(() => vis.classList.remove('pop'), 500);
  if (G.found.size >= G.total) setTimeout(levelComplete, 520);
  checkAchievements();
  save();
}

function levelComplete() {
  const timeBonus = G.cfg.time > 0 ? Math.round(G.remaining * 3) : 0;
  const perfect = G.wrong === 0;
  const coins = (perfect ? 60 : 35) * (G.daily ? 2 : 1);
  G.score += timeBonus;
  G.coinsEarned += coins;
  if (perfect) S.stats.perfect++;
  S.stats.wins++;
  if (G.daily) S.stats.dailyDone = todayKey();
  S.xp += Math.round(G.score / 8) + 40;
  const newLevel = 1 + Math.floor(S.xp / 900);
  if (newLevel > S.level) { S.level = newLevel; toast(t('level') + ' ' + S.level, 'good'); }
  S.coins += G.coinsEarned;
  S.stats.coinsTotal += G.coinsEarned;
  S.levels[G.mode] = G.level + 1;
  S.best[G.mode] = Math.max(S.best[G.mode] || 0, G.score);
  pushBoard(G.score, G.mode, G.words);
  checkAchievements();
  save(true);

  if (G.mode === 'unlimited') {
    Sound.win();
    G.batch++;
    const puzzle = buildPuzzle('unlimited');
    G.grid = puzzle.grid; G.size = puzzle.size; G.placements = puzzle.placed; G.found = new Set();
    G.total = puzzle.placed.length; G.wrong = 0; G.chain = 0; G.level++;
    renderGrid(); renderWordList(); paintFound(); updateHUD();
    toast(t('unlimited') + ' · ×' + G.batch, 'good');
    return;
  }
  stopClock();
  Sound.win();
  confetti();
  showResult(true, timeBonus, coins);
}

function endGame(won) {
  stopClock();
  if (!won) {
    Sound.lose();
    vibrate([40, 60, 40]);
    S.coins += G.coinsEarned;
    S.stats.coinsTotal += G.coinsEarned;
    S.best[G.mode] = Math.max(S.best[G.mode] || 0, G.score);
    pushBoard(G.score, G.mode, G.words);
    checkAchievements();
    save(true);
    showResult(false, 0, 0);
  }
}
function stopClock() {
  clearInterval(G.timer); G.timer = null;
  G.running = false; G.ready = false;
  Sound.stopMusic();
}

function showResult(won, timeBonus, coins) {
  const stars = won ? (G.wrong === 0 ? 3 : G.wrong <= 2 ? 2 : 1) : 0;
  $('#res-stars').textContent = won ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : '☆☆☆';
  $('#res-title').textContent = won ? (stars === 3 ? 'Flawless hunt!' : 'Level complete') : "Time's up!";
  $('#res-sub').textContent = won
    ? `+${timeBonus} time bonus · ${coins} bonus coins · ${G.found.size}/${G.total} ${t('words')}`
    : `You found ${G.found.size} of ${G.total} ${t('words')}. Try again — the grid is always new.`;
  $('#res-score').textContent = G.score;
  $('#res-coins').textContent = G.coinsEarned;
  $('#res-words').textContent = G.found.size;
  $('#res-best').textContent = S.best[G.mode] || 0;
  $('#btn-next').classList.toggle('hidden', !won || G.mode === 'unlimited');
  openOverlay('ov-result');
}

function useHint() {
  const cost = 25;
  if (S.coins < cost) { toast('Need ' + cost + ' coins', 'bad'); return; }
  const left = G.placements.filter((pl) => !G.found.has(pl.product.id));
  if (!left.length) return;
  const pl = left[Math.floor(Math.random() * left.length)];
  S.coins -= cost; save();
  const [r, c] = pl.cells[0];
  const idx = r * G.size + c;
  const el = $('#grid').children[idx];
  if (el) { el.classList.add('hint'); setTimeout(() => el.classList.remove('hint'), 2400); }
  toast(`${pl.product.name} starts with "${pl.product.letters[0]}" — row ${r + 1}, col ${c + 1}`, '');
  Sound.click(); updateHUD();
}

/* ------------------------------- pointer --------------------------------- */
function bindGrid() {
  const grid = $('#grid');
  grid.addEventListener('pointerdown', (e) => {
    if (!G.size) return;
    if (G.paused || $('.overlay.open')) return;
    const idx = idxFromPoint(e.clientX, e.clientY);
    if (idx === null) return;
    e.preventDefault();
    ensureRunning();
    if (G.sel.anchor !== null && G.sel.path.length === 1 && idx !== G.sel.anchor) {
      const path = pathBetween(G.sel.anchor, idx);
      if (path) { G.sel.path = path; paintSelection(); evaluateSelection(); G.sel = { anchor: null, path: [] }; paintSelection(); return; }
    }
    G.sel = { anchor: idx, path: [idx] };
    G.dragging = true;
    paintSelection();
    Sound.pick();
  });
  window.addEventListener('pointermove', (e) => {
    if (!G.dragging || G.sel.anchor === null) return;
    const idx = idxFromPoint(e.clientX, e.clientY);
    if (idx === null || idx === G.sel.path[G.sel.path.length - 1]) return;
    const path = pathBetween(G.sel.anchor, idx);
    if (path && path.length > 1) { G.sel.path = path; paintSelection(); }
  });
  window.addEventListener('pointerup', () => {
    if (!G.dragging) return;
    G.dragging = false;
    if (G.sel.path.length > 1) {
      evaluateSelection();
      G.sel = { anchor: null, path: [] };
      paintSelection();
    }
  });
  window.addEventListener('pointercancel', () => { G.dragging = false; G.sel = { anchor: null, path: [] }; paintSelection(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if ($('#ov-pause').classList.contains('open')) resumeGame(); else pauseGame(); }
  });
}

/* ----------------------------- achievements ------------------------------ */
const ACHIEVEMENTS = [
  { id: 'first',  g: '🎯', name: 'First Find',        desc: 'Find your first product',                test: (s) => s.stats.words >= 1 },
  { id: 'hunter', g: '🔍', name: 'Word Hunter',       desc: 'Find 25 products',                       test: (s) => s.stats.words >= 25 },
  { id: 'master', g: '🧠', name: 'Word Master',       desc: 'Find 100 products',                      test: (s) => s.stats.words >= 100 },
  { id: 'perfect',g: '💎', name: 'Perfect Round',     desc: 'Clear a level with no wrong selections',  test: (s) => s.stats.perfect >= 1 },
  { id: 'globe',  g: '🌍', name: 'Global Shopper',    desc: 'Find products from 5 countries',          test: (s) => Object.keys(s.stats.countries).length >= 5 },
  { id: 'cats',   g: '🗂️', name: 'Category Explorer', desc: 'Find products from 8 categories',         test: (s) => Object.keys(s.stats.categories).length >= 8 },
  { id: 'streak', g: '🔥', name: 'Streak Starter',    desc: '3-day login streak',                      test: (s) => s.streak.count >= 3 },
  { id: 'coins',  g: '🪙', name: 'Coin Collector',    desc: 'Earn 500 coins in total',                 test: (s) => s.stats.coinsTotal >= 500 },
  { id: 'speed',  g: '⚡', name: 'Speed Seeker',      desc: 'Find a product in under 2.5 seconds',     test: (s) => s.stats.fastest <= 2.5 },
  { id: 'expert', g: '🏅', name: 'Expert Finisher',   desc: 'Complete an Expert level',                test: (s) => (s.best.expert || 0) > 0 },
  { id: 'daily',  g: '📅', name: 'Daily Champion',    desc: 'Finish a daily challenge',                test: (s) => !!s.stats.dailyDone },
  { id: 'lvl10',  g: '👑', name: 'Level 10',          desc: 'Reach player level 10',                   test: (s) => s.level >= 10 }
];
function checkAchievements() {
  let unlocked = 0;
  ACHIEVEMENTS.forEach((a) => {
    if (!S.ach[a.id] && a.test(S)) {
      S.ach[a.id] = Date.now();
      toast(a.name + ' — ' + a.desc, 'good');
      Sound.coin();
      S.coins += 50;
    }
    if (S.ach[a.id]) unlocked++;
  });
  return unlocked;
}
function renderAchievements() {
  const box = $('#ach-list');
  box.innerHTML = '';
  let n = 0;
  ACHIEVEMENTS.forEach((a) => {
    const got = !!S.ach[a.id];
    if (got) n++;
    const row = document.createElement('div');
    row.className = 'list-row';
    row.innerHTML = `<div class="badge mono ${got ? '' : 'locked'}" style="${got ? 'background:linear-gradient(140deg,rgba(124,92,255,.55),rgba(255,77,157,.45));color:#fff' : ''}">${got ? a.name.charAt(0) : ico('lock')}</div>
      <div class="grow"><div class="name">${a.name}</div><div class="sub">${a.desc}</div></div>
      <div class="val">${got ? '✓' : ''}</div>`;
    box.appendChild(row);
  });
  $('#ach-count').textContent = n + ' / ' + ACHIEVEMENTS.length;
}

/* ------------------------------ leaderboard ------------------------------ */
function pushBoard(score, mode, words) {
  if (!score) return;
  S.board.push({ score, mode, words, date: todayKey() });
  S.board.sort((a, b) => b.score - a.score);
  S.board = S.board.slice(0, 12);
}
function renderBoard() {
  const box = $('#board-list');
  box.innerHTML = '';
  if (!S.board.length) {
    box.innerHTML = '<p class="muted center small" style="padding:18px">No scores yet — finish a level to enter the board.</p>';
    return;
  }
  S.board.forEach((row, i) => {
    const el = document.createElement('div');
    el.className = 'list-row';
    el.innerHTML = `<div class="rank">#${i + 1}</div>
      <div class="badge mono" style="${i < 3 ? 'background:linear-gradient(140deg,rgba(255,193,77,.55),rgba(255,77,157,.35));color:#fff' : ''}">${i < 3 ? ico('star', 'fill') : '#' + (i + 1)}</div>
      <div class="grow"><div class="name">${row.score} pts</div><div class="sub">${t(row.mode)} · ${row.words} ${t('words')} · ${row.date}</div></div>
      <div class="val">${S.best[row.mode] === row.score ? '★' : ''}</div>`;
    box.appendChild(el);
  });
}

/* ------------------------------ daily login ------------------------------ */
const DAILY_REWARDS = [20, 30, 40, 50, 60, 80, 150];
function maybeDailyReward() {
  if (S.daily.last === todayKey()) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const nextCount = S.streak.last === yesterday || S.streak.last === todayKey() ? S.streak.count + 1 : 1;
  const day = ((nextCount - 1) % DAILY_REWARDS.length) + 1;
  const reward = DAILY_REWARDS[day - 1];
  $('#daily-glyph').innerHTML = `<span style="display:inline-block;width:46px;height:46px">${ico('gift')}</span>`;
  const gi = $('#daily-glyph svg'); if (gi) { gi.style.width = '46px'; gi.style.height = '46px'; }
  $('#daily-head').textContent = 'Daily reward — day ' + day;
  $('#daily-body').textContent = `Collect ${reward} coins and keep your streak alive. Streak: ${nextCount} day(s).`;
  $('#btn-daily-claim').onclick = () => {
    S.coins += reward;
    S.stats.coinsTotal += reward;
    S.streak.count = nextCount;
    S.streak.last = todayKey();
    S.daily.last = todayKey();
    S.daily.day = day;
    save(true);
    Sound.coin();
    closeOverlay('ov-daily');
    renderHome();
    checkAchievements();
    toast('+' + reward + ' coins', 'good');
  };
  openOverlay('ov-daily');
}

/* -------------------------------- screens -------------------------------- */
function modeCardHTML(mode) {
  const m = MODES[mode];
  const best = S.best[mode] || 0;
  const time = m.time ? fmtTime(m.time) : '∞';
  const dirs = m.dirs.length === 3 ? 'H · V · D' : m.dirs.length >= 8 ? 'H · V · D · rev' : 'H · V · D · rev';
  return `<button class="mode-card" data-mode="${mode}" style="--tint:${m.tint}">
    <div class="mode-name">${modeBars(mode)} ${t(m.label)}</div>
    <div class="mode-meta">${m.size}×${m.size} · ${m.words} ${t('words')} · ${time}</div>
    <div class="mode-meta" style="opacity:.75">${dirs}</div>
    <div class="mode-best">★ ${t('best')}: ${best}</div>
  </button>`;
}
const MODE_LEVEL = { easy: 1, medium: 2, hard: 3, expert: 5, unlimited: 4, daily: 3 };
const modeBars = (m) => {
  const n = MODE_LEVEL[m] || 1;
  let out = '<span class="dbar">';
  for (let i = 1; i <= 5; i++) out += `<i class="${i <= n ? 'on' : ''}"></i>`;
  return out + '</span>';
};

function renderModeCards() {
  $('#mode-grid').innerHTML = MODE_ORDER.map(modeCardHTML).join('');
  $('#mode-grid-full').innerHTML = MODE_ORDER.map(modeCardHTML).join('');
  $$('[data-mode]').forEach((btn) => btn.addEventListener('click', () => {
    Sound.click();
    startGame(btn.dataset.mode);
  }));
}

function renderHome() {
  $('#stat-level').textContent = S.level;
  $('#stat-coins').textContent = S.coins;
  $('#stat-streak').textContent = S.streak.count;
  $('#stat-words').textContent = S.stats.words;
  $('#modes-coins').textContent = S.coins;
  $('#g-coins').textContent = S.coins;
  $('#cat-count').textContent = productsAll().length;
  $('#cat-meta').textContent = `${CATEGORIES.length} categories · ${COUNTRIES.length} countries · ${productsAll().filter((p) => p.wiki && p.wiki.verified).length} Wikipedia-verified`;
  const d = new Date();
  $('#daily-title').textContent = d.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'short' });
  $('#daily-meta').textContent = S.stats.dailyDone === todayKey() ? '✓ Completed today — play again for practice' : 'Same puzzle for everyone today · double coins';
  $('#home-footer').innerHTML = `WORLD PRODUCT WORD HUNT · v${BUILD.version} · ${BUILD.products} products bundled<br>Works fully offline. Product names verified against Wikipedia by the content agent.`;
}

function renderHowTo() {
  $('#howto-body').innerHTML = `
    <div class="settings-list">
      <div class="setting-row"><div class="badge">1</div><div class="grow"><div class="label">Pick a mode</div><div class="hint">Easy to Expert change the grid size, word count, timer and allowed directions. Unlimited never ends. Daily challenge is the same puzzle for everyone today.</div></div></div>
      <div class="setting-row"><div class="badge">2</div><div class="grow"><div class="label">Read the product list</div><div class="hint">The products you must find are listed under the grid. Their names are real product names from around the world.</div></div></div>
      <div class="setting-row"><div class="badge">3</div><div class="grow"><div class="label">Swipe to select letters</div><div class="hint">Press on a letter and drag across the word — horizontally, vertically or diagonally, forwards or backwards. You can also tap the first letter, then tap the last one.</div></div></div>
      <div class="setting-row"><div class="badge">4</div><div class="grow"><div class="label">Score & coins</div><div class="hint">Each found product scores 10 points per letter, plus a time bonus and a chain multiplier for quick finds. Coins buy hints (25 each).</div></div></div>
      <div class="setting-row"><div class="badge">5</div><div class="grow"><div class="label">Progress</div><div class="hint">Finishing a level earns coins, XP, a leaderboard entry and progress toward achievements. Everything is stored on your device.</div></div></div>
    </div>
    <div class="btn-row" style="margin-top:18px">
      <button class="btn btn-primary" data-mode="easy">${ico('play', 'fill')} ${t('play')}</button>
      <button class="btn" data-go="home">${t('mainMenu')}</button>
    </div>`;
  $$('#howto-body [data-mode]').forEach((b) => b.addEventListener('click', () => startGame(b.dataset.mode)));
}

function renderCredits() {
  const verified = productsAll().filter((p) => p.wiki && p.wiki.verified).length;
  const images = (CREDITS_DATA.images || []).length;
  const rows = [
    ['Game', 'WORLD PRODUCT WORD HUNT'],
    ['Concept', 'AI-powered worldwide product-name word search — find the correct spelling of real products from every country and category.'],
    ['Development', 'Built by the repository author as an offline-first HTML/JS game (no frameworks, no CDN, no tracking). Android package wraps the same build in a WebView.'],
    ['AI agent credits', 'Content manager: tools/refresh-catalog.mjs, which searches Wikipedia for each product name, stores the canonical article title and summary, and asks the Wikimedia Commons API for a licence-checked image.'],
    ['Wikipedia', `Product names, spellings and short descriptions are checked against the English Wikipedia API. ${verified} of ${productsAll().length} bundled entries carry a verified Wikipedia source.`],
    ['Wikimedia Commons', `Images are only used when the Commons licence metadata allows reuse (CC0, public domain, CC BY, CC BY-SA). ${images} image(s) bundled, each with author and licence recorded in data/credits.json.`],
    ['Attribution', 'Where an image is shown, the author, licence and Commons file page appear on the product card and in data/credits.json. Product names and brand names are trademarks of their owners and are used here only to identify the products in a word puzzle.'],
    ['Affiliation', 'This game is not affiliated with, endorsed by, or sponsored by Wikipedia, the Wikimedia Foundation, or any brand named in the catalogue.'],
    ['Data sources', 'en.wikipedia.org API · commons.wikimedia.org API · bundled catalogue data/catalog.json'],
    ['Version', `v${BUILD.version} · built ${BUILD.built} · ${BUILD.products} products · ${BUILD.categories} categories`]
  ];
  $('#credits-body').innerHTML = rows.map(([k, v]) => `
    <div class="setting-row" style="margin-bottom:8px;align-items:flex-start">
      <div class="grow"><div class="label">${k}</div><div class="hint" style="font-size:12.5px;line-height:1.6">${escapeHtml(v)}</div></div>
    </div>`).join('') + `
    <p class="small muted" style="margin-top:14px">Text on Wikipedia is available under CC BY-SA 4.0. Each Commons image keeps its own licence, listed in data/credits.json.</p>`;
}

/* ------------------------------- settings -------------------------------- */
function applySettings() {
  document.documentElement.setAttribute('data-theme', S.settings.theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', S.settings.theme === 'light' ? '#eef1fb' : '#070b1c');
  $$('[data-toggle]').forEach((el) => el.classList.toggle('on', !!S.settings[el.dataset.toggle]));
  $$('#seg-theme button').forEach((b) => b.classList.toggle('on', b.dataset.themeSet === S.settings.theme));
  const langSel = $('#sel-lang');
  if (langSel) langSel.value = S.settings.lang;
  const diffSel = $('#sel-difficulty');
  if (diffSel) diffSel.value = S.settings.difficulty;
  if (!S.settings.music) Sound.stopMusic();
}
function renderSettings() {
  $('#sel-lang').innerHTML = LANGS.map(([c, n]) => `<option value="${c}">${n}</option>`).join('');
  $('#sel-difficulty').innerHTML = MODE_ORDER.slice(0, 5).map((m) => `<option value="${m}">${t(MODES[m].label)}</option>`).join('');
  const verified = productsAll().filter((p) => p.wiki && p.wiki.verified).length;
  $('#data-note').textContent = `${productsAll().length} products · ${verified} verified on Wikipedia · ${(CREDITS_DATA.images || []).length} licensed images · cache v${BUILD.version}`;
  applySettings();
}
function applyI18n() {
  $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.documentElement.lang = S.settings.lang;
  renderModeCards();
  renderSettings();
  renderHome();
  renderAchievements();
  renderBoard();
  renderHowTo();
  renderCredits();
  hydrateIcons();
  if (G.placements.length) { renderWordList(); updateHUD(); }
}

async function refreshCatalogue() {
  toast('Contacting content agent…');
  try {
    const res = await fetch('catalog.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const list = (data.products || []).filter((p) => p && p.id && p.letters);
    const known = new Set(PRODUCTS.map((p) => p.id));
    const fresh = list.filter((p) => !known.has(p.id));
    if (!fresh.length) { toast('Catalogue already up to date', 'good'); return; }
    LIVE = LIVE.concat(fresh).slice(-500);
    try { localStorage.setItem('wpwh.live', JSON.stringify(LIVE)); } catch (e) {}
    renderHome(); renderSettings(); hydrateIcons();
    toast('+' + fresh.length + ' new products added', 'good');
  } catch (e) {
    toast('Offline — using the bundled catalogue', 'bad');
  }
}

/* --------------------------------- init ---------------------------------- */
function bindEvents() {
  document.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-go]');
    if (nav) {
      Sound.click();
      if (nav.hasAttribute('data-close-overlay')) {
        $$('.overlay.open').forEach((o) => o.classList.remove('open'));
        if (G.running && !G.paused) pauseGame();
      }
      const target = nav.dataset.go;
      if (target === 'home' && G.running) pauseGame();
      showScreen(target);
      if (target === 'achievements') renderAchievements();
      if (target === 'leaderboard') renderBoard();
      if (target === 'credits') renderCredits();
      if (target === 'settings') renderSettings();
      if (target === 'howto') renderHowTo();
      if (target === 'modes') renderModeCards();
      return;
    }
    const modeBtn = e.target.closest('[data-mode]');
    if (modeBtn) { Sound.click(); startGame(modeBtn.dataset.mode); return; }
    const toggle = e.target.closest('[data-toggle]');
    if (toggle) {
      const key = toggle.dataset.toggle;
      S.settings[key] = !S.settings[key];
      toggle.classList.toggle('on', S.settings[key]);
      save();
      Sound.click();
      if (key === 'music') { if (S.settings.music) { Sound.ensure(); Sound.startMusic(); } else Sound.stopMusic(); }
      return;
    }
    const themeBtn = e.target.closest('[data-theme-set]');
    if (themeBtn) {
      S.settings.theme = themeBtn.dataset.themeSet;
      save(); applySettings(); Sound.click();
    }
  });

  $('#btn-quickplay').addEventListener('click', () => { Sound.ensure(); startGame(S.settings.difficulty || 'easy'); });
  $('#btn-play').addEventListener('click', () => { Sound.ensure(); startClock(); });
  $('#btn-pause').addEventListener('click', pauseGame);
  $('#btn-pause-2').addEventListener('click', pauseGame);
  $('#btn-resume').addEventListener('click', resumeGame);
  $('#btn-restart').addEventListener('click', () => { if (G.mode) startGame(G.mode); });
  $('#btn-restart-2').addEventListener('click', () => { closeOverlay('ov-pause'); if (G.mode) startGame(G.mode); });
  $('#btn-hint').addEventListener('click', useHint);
  $('#btn-next').addEventListener('click', () => { closeOverlay('ov-result'); if (G.mode) startGame(G.mode); });
  $('#btn-again').addEventListener('click', () => { closeOverlay('ov-result'); if (G.mode) startGame(G.mode); });
  $('#btn-refresh').addEventListener('click', refreshCatalogue);
  $('#btn-clear-board').addEventListener('click', () => { S.board = []; save(true); renderBoard(); toast('Leaderboard cleared'); });
  $('#btn-reset').addEventListener('click', () => {
    if (!confirm('Reset all progress, coins, achievements and high scores on this device?')) return;
    localStorage.removeItem(STORE_KEY);
    localStorage.removeItem('wpwh.live');
    S = structuredClone(DEFAULT_STATE);
    save(true); applyI18n(); applySettings(); renderHome();
    toast('Progress reset');
  });
  $('#sel-lang').addEventListener('change', (e) => { S.settings.lang = e.target.value; save(); applyI18n(); });
  $('#sel-difficulty').addEventListener('change', (e) => { S.settings.difficulty = e.target.value; save(); });
  bindGrid();
}

function init() {
  hydrateIcons();
  renderSettings();
  applyI18n();
  bindEvents();
  maybeDailyReward();
  checkAchievements();
  save();
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
document.addEventListener('DOMContentLoaded', init);
