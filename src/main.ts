import './styles/main.css';
import { audioManager } from './audio';
import { ParticleEngine } from './particles';
import { GameEngine } from './game';
import { UIController } from './ui';

let particleEngine: ParticleEngine | null = null;
let ui: UIController | null = null;
let game: GameEngine | null = null;

let crystalCount = 2450;
let gemCount = 180;
let lastToggleTime = 0;

const g = window as unknown as Record<string, unknown>;

g.switchToGame = () => {
  audioManager.playTone(523.25, 0.12, 'sine');
  if (ui) ui.showGame();
  if (game) game.start();
};

g.switchToHome = () => {
  audioManager.playTone(392.00, 0.1, 'sine');
  if (game) game.stop();
  if (ui) ui.showHome();
};

g.toggleSFX = () => {
  const now = Date.now();
  if (now - lastToggleTime < 150) {
    return;
  }
  lastToggleTime = now;
  const enabled = audioManager.toggle();
  if (ui) {
    ui.updateAudioButtons(enabled);
    ui.showNotification(enabled ? 'Audio Enabled' : 'Audio Muted');
  }
};

g.openHowToPlayModal = () => {
  if (ui) ui.openModal('modal-how-to-play');
};

g.openDailyGiftsModal = () => {
  if (ui) ui.openModal('modal-daily-gifts');
};

g.closeModal = (id: string) => {
  if (ui) ui.closeModal(id);
};

g.addCurrency = (type: 'crystals' | 'gems', amt: number) => {
  if (type === 'crystals') {
    crystalCount += amt;
    const el = document.getElementById('snow-crystals-count');
    if (el) el.innerText = crystalCount.toLocaleString();
    audioManager.playReward('crystal');
    if (ui) ui.showNotification(`+${amt} Crystals claimed`);
  } else {
    gemCount += amt;
    const el = document.getElementById('magic-gems-count');
    if (el) el.innerText = gemCount.toLocaleString();
    audioManager.playReward('gem');
    if (ui) ui.showNotification(`+${amt} Gems claimed`);
  }
};

function init(): void {
  try {
    particleEngine = new ParticleEngine('snowfall-canvas');
  } catch {
    particleEngine = null;
  }

  ui = new UIController();

  game = new GameEngine({
    onScoreUpdate: (score, level, combo) => {
      if (ui) ui.updateScore(score, level, combo);
    },
    onLivesUpdate: (lives) => {
      if (ui) ui.updateLives(lives);
    },
    onSnowflakeMove: (flake) => {
      if (ui) ui.updateSnowflake(flake);
    },
    onSnowflakeDespawn: () => {
      if (ui) ui.clearSnowflake();
    },
    onSlotsShuffled: (order) => {
      if (ui) {
        ui.renderButtons(order, (chosenType) => {
          if (game) game.handleMatchAttempt(chosenType);
        });
      }
    },
    onMatchSuccess: (_type, pts, inDangerZone, combo) => {
      audioManager.playMatch(combo, inDangerZone);
      if (ui) {
        ui.showArenaToast(
          inDangerZone ? `⚡ FUTURE PERFECT! +${pts}` : `FUTURE SYNC +${pts}`,
          inDangerZone ? '#38bdf8' : '#c084fc'
        );
      }
      if (particleEngine) {
        const arenaBox = document.getElementById('arena-box');
        if (arenaBox) {
          const rect = arenaBox.getBoundingClientRect();
          const targetY = inDangerZone ? rect.top + rect.height * 0.78 : rect.top + rect.height * 0.45;
          particleEngine.triggerBurst(rect.left + rect.width * 0.5, targetY, '#ffffff', 25);
        }
      }
    },
    onMatchMiss: () => {
      if (ui) ui.showArenaToast('FUTURE MISS', '#f87171');
    },
    onGameOver: (finalScore, isNewHighScore) => {
      if (ui) {
        ui.showGameOver(
          finalScore,
          isNewHighScore,
        () => {
            if (game) game.start();
        },
          () => {
            if (ui) ui.showHome();
          }
        );
      }
    },
    onDangerZoneState: (active) => {
      if (ui) ui.setDangerZoneActive(active);
    }
  });

  ui.renderButtons(game.getSlotOrder(), (chosenType) => {
    if (game) game.handleMatchAttempt(chosenType);
  });

  const setupAudioUnlock = (): void => {
    audioManager.getContext();
    if (audioManager.isEnabled()) {
      audioManager.startBGM();
    }
    window.removeEventListener('click', setupAudioUnlock);
    window.removeEventListener('keydown', setupAudioUnlock);
  };
  window.addEventListener('click', setupAudioUnlock);
  window.addEventListener('keydown', setupAudioUnlock);

  window.addEventListener('keydown', (e) => {
    if (!game) return;
    const isRunning = game.getState().isGameRunning;
    if (!isRunning) {
      if (e.key === 'Enter') {
        if (ui) ui.showGame();
        game.start();
      }
      return;
    }

    const order = game.getSlotOrder();
    if (e.key === '1' && order[0]) {
      e.preventDefault();
      game.handleMatchAttempt(order[0]);
    } else if (e.key === '2' && order[1]) {
      e.preventDefault();
      game.handleMatchAttempt(order[1]);
    } else if (e.key === '3' && order[2]) {
      e.preventDefault();
      game.handleMatchAttempt(order[2]);
    } else if (e.key === 'Escape') {
      game.stop();
      if (ui) ui.showHome();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}