// ═══════════════════════════════════════════════════════════════════════════
// FC SUPERSTAR — DLC PROGRESSION SYSTEM
// ═══════════════════════════════════════════════════════════════════════════

const DLC_PACKS = [
  {
    id: 'base',
    name: 'Carrière Standard',
    description: 'La première saison, sans bonus narratif.',
    unlocked: true,
    nextUnlock: 'mercato',
    routes: [
      {
        id: 'base-pro',
        label: 'Le Pro',
        description: 'Construire une carrière solide sans risques excessifs.',
        impact: { confidence: 8, energy: 3, mental: 2, money: 1500, media: 1 },
        log: 'Tu choisis la stabilité et la sécurité. Le club te regarde comme un futur titulaire de long terme. Les entraînements sont réguliers et sans pression excessive.'
      },
      {
        id: 'base-risk',
        label: 'Le Risqué',
        description: 'Tout miser sur les matchs et la confiance.',
        impact: { confidence: 12, energy: -6, mental: -4, money: 1500, media: 2 },
        log: 'Tu joues fort et sans filet, le staff remarque ta personnalité brute. Mais la fatigue commence à peser et le stress monte. C\'est exaltant mais épuisant.'
      },
      {
        id: 'base-silent',
        label: 'Le Discret',
        description: 'Jouer propre, gagner sans faire de bruit.',
        impact: { confidence: 5, energy: 4, mental: 8, money: 800, media: 0 },
        log: 'Tu gardes la tête froide et professionnelle. Ton travail passe inaperçu des médias, mais ta forme s\'installe progressivement et solidement.'
      }
    ]
  },
  {
    id: 'mercato',
    name: 'Le Mercato',
    description: 'Contrat, clubs, agents, pression financière.',
    unlocked: false,
    nextUnlock: 'vestiaire',
    routes: [
      {
        id: 'mercato-loyal',
        label: 'Le Loyal',
        description: 'Rester dans le club et signer long terme.',
        impact: { confidence: 10, money: 4000, media: 2, mental: 2 },
        log: 'Tu choisis la fidélité au club. Ils te récompensent avec un contrat sécurisant et une augmentation confortable. Le vestiaire te respecte pour ton engagement.'
      },
      {
        id: 'mercato-ambitieux',
        label: 'L\'Ambitieux',
        description: 'Chercher un grand club et un salaire plus haut.',
        impact: { confidence: 12, money: 7000, media: 3, mental: -3 },
        log: 'Tu prends le risque du grand saut. La presse se lève déjà, les rumeurs vont bon train. C\'est lucratif mais stressant, tout peut basculer d\'un match.'
      },
      {
        id: 'mercato-rebelle',
        label: 'Le Rebelle',
        description: 'Rompre avec l\'agent et négocier seul.',
        impact: { confidence: 9, money: -500, media: 1, mental: -6 },
        log: 'Tu refuses d\'être piloté par un agent. L\'indépendance a un coût : tu perds des connexions, mais tu gagnes une vraie liberté de décision.'
      }
    ]
  },
  {
    id: 'vestiaire',
    name: 'Le Vestiaire',
    description: 'Rivalités, leadership et tensions internes.',
    unlocked: false,
    nextUnlock: 'medias',
    routes: [
      {
        id: 'vestiaire-leader',
        label: 'Le Leader',
        description: 'Prendre la main et imposer ton aura.',
        impact: { confidence: 14, mental: 2, energy: -4, media: 2 },
        log: 'Tu imposes ta présence au vestiaire. Les coéquipiers te regardent différemment — certains avec respect, d\'autres avec jalousie. Tu deviens une référence.'
      },
      {
        id: 'vestiaire-invisible',
        label: 'L\'Invisible',
        description: 'Rester discret et gagner grâce au travail.',
        impact: { confidence: 6, mental: 7, energy: 5, media: 0 },
        log: 'Tu gardes le silence et laisse la qualité de jeu parler pour toi. Les résultats s\'accumulent, tes coéquipiers te respectent tranquillement.'
      },
      {
        id: 'vestiaire-provocateur',
        label: 'Le Provocateur',
        description: 'Créer la tension pour forcer le respect.',
        impact: { confidence: 15, mental: -8, energy: 3, media: 4 },
        log: 'Tu provoques intentionnellement la tension. Certains t\'admirent pour ton audace, d\'autres te surveillent de près. Le vestiaire bouillonne mais avance.'
      }
    ]
  },
  {
    id: 'medias',
    name: 'Les Médias & Image',
    description: 'Gérer les interviews, la presse et le buzz.',
    unlocked: false,
    nextUnlock: 'heritage',
    routes: [
      {
        id: 'medias-communicant',
        label: 'Le Communicant',
        description: 'Contrôler ta image pour attirer les sponsors.',
        impact: { confidence: 8, money: 5000, media: 4, mental: 2 },
        log: 'Tu maîtrises l\'image et la narration autour de ta personne. Les sponsors commencent à te regarder comme un atout marketing de premier plan.'
      },
      {
        id: 'medias-silencieux',
        label: 'Le Silencieux',
        description: 'Éviter les scandales et garder le cap.',
        impact: { confidence: 4, energy: 5, mental: 8, media: -1 },
        log: 'Tu choisis la sobriété totale. Pas d\'interviews inutiles, pas de buzz artificiel. Le terrain reste ton meilleur support et ta plus grande arme.'
      },
      {
        id: 'medias-buzz',
        label: 'Le Buzz',
        description: 'Faire parler de toi, même au prix d\'un scandale.',
        impact: { confidence: 12, money: 2000, media: 7, mental: -8 },
        log: 'Le buzz grimpe en flèche. Tout le monde parle de toi, pas toujours positivement. C\'est viral, c\'est lucratif, mais le stress émotionnel augmente.'
      }
    ]
  },
  {
    id: 'heritage',
    name: 'L\'Héritage',
    description: 'Fin de saison, légende, retour au club, retraite.',
    unlocked: false,
    nextUnlock: null,
    routes: [
      {
        id: 'heritage-legende',
        label: 'La Légende',
        description: 'Terminer la saison en gloire et marquer l\'histoire.',
        impact: { confidence: 18, money: 12000, media: 6, mental: 6 },
        log: 'Tu choisis la gloire absolue. Tes performances culminent, les records tombent. Ta carrière se lit comme un roman de fin de saison épique. L\'histoire t\'appartient.'
      },
      {
        id: 'heritage-retour',
        label: 'Le Retour',
        description: 'Revenir au club natal et faire grandir la génération suivante.',
        impact: { confidence: 8, money: 3500, media: 2, mental: 6 },
        log: 'Tu reviens à tes racines. L\'héritage devient une vraie transmission de savoir. Les jeunes joueurs te prennent comme modèle, et c\'est plus fort que n\'importe quel titre.'
      },
      {
        id: 'heritage-retraite',
        label: 'La Retraite',
        description: 'Choisir la paix et une vie après le football.',
        impact: { confidence: 3, energy: 2, mental: 10, money: 2500 },
        log: 'Tu choisis la paix. Le football a eu un début, une fin, et un sens profond. La retraite n\'est pas une défaite, c\'est une victoire personnelle.'
      }
    ]
  }
];

const STORAGE_KEY = 'fc-superstar-dlc-save';

const DEFAULT_STATE = {
  stats: {
    energy: 75,
    mental: 70,
    confidence: 80,
    money: 15000,
    media: 3
  },
  activeRoute: null,
  history: [],
  unlocked: {
    base: true,
    mercato: false,
    vestiaire: false,
    medias: false,
    heritage: false
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return deepClone(DEFAULT_STATE);
    
    const parsed = JSON.parse(raw);
    return {
      ...deepClone(DEFAULT_STATE),
      ...parsed,
      stats: { ...deepClone(DEFAULT_STATE.stats), ...(parsed.stats || {}) },
      unlocked: { ...deepClone(DEFAULT_STATE.unlocked), ...(parsed.unlocked || {}) }
    };
  } catch (error) {
    console.error('Failed to load state:', error);
    return deepClone(DEFAULT_STATE);
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// GAME LOGIC
// ═══════════════════════════════════════════════════════════════════════════

function applyImpact(currentState, impact) {
  const nextStats = { ...currentState.stats };

  nextStats.energy = clamp((nextStats.energy || 0) + (impact.energy || 0), 0, 100);
  nextStats.mental = clamp((nextStats.mental || 0) + (impact.mental || 0), 0, 100);
  nextStats.confidence = clamp((nextStats.confidence || 0) + (impact.confidence || 0), 0, 100);
  nextStats.money = (nextStats.money || 0) + (impact.money || 0);
  nextStats.media = clamp((nextStats.media || 0) + (impact.media || 0), 1, 10);

  return { ...currentState, stats: nextStats };
}

function unlockNextPack(packId, state) {
  const pack = DLC_PACKS.find((p) => p.id === packId);
  const next = pack?.nextUnlock;

  if (!next) return state;

  return {
    ...state,
    unlocked: {
      ...state.unlocked,
      [next]: true
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// RENDERING
// ═══════════════════════════════════════════════════════════════════════════

function renderStats(state) {
  const stats = document.getElementById('stats');
  if (!stats) return;

  const items = [
    { label: 'Énergie', value: `${state.stats.energy}%`, color: '#00e676' },
    { label: 'Mental', value: `${state.stats.mental}%`, color: '#60a5fa' },
    { label: 'Confiance', value: `${state.stats.confidence}%`, color: '#fbbf24' },
    { label: 'Argent', value: `${state.stats.money.toLocaleString()} €`, color: '#34d399' },
    { label: 'Médias', value: `${state.stats.media.toFixed(1)}/10`, color: '#c084fc' }
  ];

  stats.innerHTML = items.map((item) => `
    <div class="stat-card">
      <div class="stat-label">${item.label}</div>
      <div class="stat-value" style="color: ${item.color};">${item.value}</div>
    </div>
  `).join('');
}

function renderPacks(state) {
  const packsEl = document.getElementById('packs');
  if (!packsEl) return;

  packsEl.innerHTML = DLC_PACKS.map((pack) => {
    const isUnlocked = state.unlocked[pack.id];
    const unlockLabel = isUnlocked ? '✓ Débloqué' : '🔒 Verrouillé';

    return `
      <article class="pack ${isUnlocked ? '' : 'locked'}">
        <div class="pack-header">
          <h3 class="pack-name">${pack.name}</h3>
          <span class="lock-badge">${unlockLabel}</span>
        </div>
        <div class="pack-description">${pack.description}</div>
        <div class="routes">
          ${pack.routes.map((route) => `
            <button 
              class="route-btn" 
              data-pack-id="${pack.id}" 
              data-route-id="${route.id}" 
              ${isUnlocked ? '' : 'disabled'}
            >
              <strong>${route.label}</strong>
              <span>${route.description}</span>
            </button>
          `).join('')}
        </div>
      </article>
    `;
  }).join('');
}

function renderSummary(state) {
  const selectedRouteEl = document.getElementById('selectedRoute');
  const logEl = document.getElementById('log');
  const historyEl = document.getElementById('history');
  const historyListEl = document.getElementById('historyList');

  if (!selectedRouteEl || !logEl) return;

  if (!state.activeRoute) {
    selectedRouteEl.textContent = '▪ Aucune route sélectionnée. Choisis un DLC et une route pour commencer.';
    logEl.textContent = 'Sélectionne une route pour voir l\'impact dramatique sur ta carrière...';
    if (historyEl) historyEl.style.display = 'none';
    return;
  }

  const current = state.history[state.history.length - 1];
  if (current) {
    selectedRouteEl.innerHTML = `▪ <strong>${current.packName}</strong> → <strong>${current.routeLabel}</strong>`;
    logEl.textContent = current.log;
  }

  // Render history
  if (historyEl && state.history.length > 0) {
    historyEl.style.display = 'block';
    historyListEl.innerHTML = state.history.map((item, idx) => `
      <div class="history-item">
        <strong>#${idx + 1}</strong> ${item.packName} — ${item.routeLabel}
      </div>
    `).join('');
  }
}

function render(state) {
  renderStats(state);
  renderPacks(state);
  renderSummary(state);
}

// ═══════════════════════════════════════════════════════════════════════════
// EVENT HANDLING
// ═══════════════════════════════════════════════════════════════════════════

function handleRouteChoice(packId, routeId) {
  const state = loadState();
  const pack = DLC_PACKS.find((p) => p.id === packId);
  const route = pack?.routes.find((r) => r.id === routeId);

  if (!pack || !route || !state.unlocked[packId]) return;

  // Apply impact to stats
  const updated = applyImpact(state, route.impact);
  
  // Unlock next pack
  const finalState = unlockNextPack(packId, updated);

  // Add to history
  finalState.activeRoute = routeId;
  finalState.history = [
    ...(finalState.history || []),
    {
      packName: pack.name,
      routeLabel: route.label,
      log: route.log
    }
  ].slice(-10); // Keep last 10 items

  saveState(finalState);
  render(finalState);
}

function attachEvents() {
  // Route choice buttons
  document.addEventListener('click', (event) => {
    const btn = event.target.closest('.route-btn');
    if (!btn) return;

    const packId = btn.dataset.packId;
    const routeId = btn.dataset.routeId;
    if (packId && routeId) {
      handleRouteChoice(packId, routeId);
    }
  });

  // Reset button
  const resetBtn = document.getElementById('resetBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Réinitialiser complètement la carrière ?')) {
        localStorage.removeItem(STORAGE_KEY);
        const fresh = deepClone(DEFAULT_STATE);
        saveState(fresh);
        render(fresh);
      }
    });
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════

function init() {
  const initialState = loadState();
  render(initialState);
  attachEvents();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
