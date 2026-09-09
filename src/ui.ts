import { ShapeType, SnowflakeInstance } from './types';
import { CRYSTAL_DEFINITIONS } from './shapes';
import { audioManager } from './audio';

export class UIController {
  private homeView: HTMLElement | null;
  private gameView: HTMLElement | null;
  private scoreEl: HTMLElement | null;
  private levelEl: HTMLElement | null;
  private livesEl: HTMLElement | null;
  private flakeContainer: HTMLElement | null;
private dangerLine: HTMLElement | null;
  private toastEl: HTMLElement | null;
  private buttonsGrid: HTMLElement | null;
  private homeSfxBtn: HTMLElement | null;
  private gameSfxBtn: HTMLElement | null;
  private toastTimer: number | null = null;

  constructor() {
    this.homeView = document.getElementById('home-view');
    this.gameView = document.getElementById('game-view');
    this.scoreEl = document.getElementById('game-score-display');
    this.levelEl = document.getElementById('game-level-display');
    this.livesEl = document.getElementById('game-lives-display');
    this.flakeContainer = document.getElementById('falling-snowflake');
    this.dangerLine = document.getElementById('catch-zone-line');
    this.toastEl = document.getElementById('arena-toast');
    this.buttonsGrid = document.getElementById('buttons-grid');
    this.homeSfxBtn = document.getElementById('home-sfx-btn');
    this.gameSfxBtn = document.getElementById('game-sfx-btn');
  }

  public showHome(): void {
    if (this.homeView) {
      this.homeView.classList.remove('hidden');
      this.homeView.classList.add('flex');
    }
    if (this.gameView) {
      this.gameView.classList.add('hidden');
      this.gameView.classList.remove('flex');
    }
  }

  public showGame(): void {
    if (this.homeView) {
      this.homeView.classList.add('hidden');
      this.homeView.classList.remove('flex');
    }
    if (this.gameView) {
      this.gameView.classList.remove('hidden');
      this.gameView.classList.add('flex');
    }
  }

  public updateScore(score: number, level: number, combo: number): void {
    if (this.scoreEl) {
      this.scoreEl.innerText = score.toLocaleString();
    }
    if (this.levelEl) {
      this.levelEl.innerText = `Lv. ${level}${combo > 1 ? ` (${combo}x)` : ''}`;
    }
  }

  public updateLives(lives: number): void {
    if (!this.livesEl) return;
    let html = '';
    for (let i = 0; i < 3; i++) {
      html += i < lives ? '<span>💖</span>' : '<span class="opacity-30 filter grayscale">🖤</span>';
    }
    this.livesEl.innerHTML = html;
  }

  public updateSnowflake(flake: SnowflakeInstance): void {
    if (!this.flakeContainer) return;
    const def = CRYSTAL_DEFINITIONS[flake.type];
    if (this.flakeContainer.dataset.currentType !== flake.type) {
      this.flakeContainer.innerHTML = def.fallingSvg;
      this.flakeContainer.dataset.currentType = flake.type;
    }
    this.flakeContainer.style.top = `${flake.y}%`;
    this.flakeContainer.style.left = `${flake.x}%`;
    this.flakeContainer.style.transform = `translate(-50%, -50%) rotate(${flake.rotation}deg)`;
    this.flakeContainer.style.display = 'block';
  
  }

  public clearSnowflake(): void {
    if (!this.flakeContainer) return;
    this.flakeContainer.style.display = 'none';
    delete this.flakeContainer.dataset.currentType;
  }

  public setDangerZoneActive(active: boolean): void {
    if (!this.dangerLine) return;
    if (active) {
      this.dangerLine.classList.add('active');
    } else {
      this.dangerLine.classList.remove('active');
    }
  }

  public showArenaToast(text: string, color: string = '#93c5fd'): void {
    if (!this.toastEl) return;
    this.toastEl.innerText = text;
    this.toastEl.style.backgroundColor = color;
    this.toastEl.classList.remove('hidden');

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = window.setTimeout(() => {
      if (this.toastEl) this.toastEl.classList.add('hidden');
    }, 600);
  }

  public renderButtons(order: ShapeType[], onMatchClick: (type: ShapeType) => void): void {
    if (!this.buttonsGrid) return;
    const buttonsGrid = this.buttonsGrid;
    buttonsGrid.innerHTML = '';

    order.forEach((shapeKey, idx) => {
      const def = CRYSTAL_DEFINITIONS[shapeKey];
      const slotNum = idx + 1;

      const btn = document.createElement('button');
      btn.className = `gem-btn-card relative group flex flex-row items-center justify-center gap-2 sm:gap-3.5 px-3 sm:px-5 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${def.cssClass} border-2 sm:border-3 ${def.borderClass} text-white font-fredoka shadow-xl active:scale-95 cursor-pointer select-none transition-all duration-150`;
      btn.setAttribute('data-shape', shapeKey);

      btn.innerHTML = `
        <span class="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 sm:px-3 py-0.5 rounded-full ${def.badgeBg} ${def.badgeText} border-2 border-white font-fredoka font-black text-[10px] sm:text-xs shadow tracking-wide whitespace-nowrap">
          KEY [${slotNum}]
        </span>
        <div class="w-8 h-8 sm:w-11 sm:h-11 flex-shrink-0 flex items-center justify-center filter drop-shadow group-hover:scale-110 transition-transform">
          ${def.gemSvg}
        </div>
        <span class="text-sm sm:text-lg font-black tracking-wide drop-shadow whitespace-nowrap font-fredoka text-white">
          ${def.title}
        </span>
      `;

      btn.onclick = (e) => {
        e.preventDefault();
        onMatchClick(shapeKey);
      };

      buttonsGrid.appendChild(btn);
    });
  }

  public updateAudioButtons(enabled: boolean): void {
    const icon = enabled ? '🔊' : '🔇';
    const title = enabled ? 'Mute Sound' : 'Unmute Sound';
    if (this.homeSfxBtn) {
      this.homeSfxBtn.innerText = icon;
      this.homeSfxBtn.title = title;
    }
    if (this.gameSfxBtn) {
      this.gameSfxBtn.innerText = icon;
      this.gameSfxBtn.title = title;
    }
  }

  public showGameOver(score: number, isNewHigh: boolean, onRetry: () => void, onMenu: () => void): void {
    const modal = document.getElementById('game-over-modal');
    if (!modal) return;

    const scoreEl = document.getElementById('game-over-score');
    if (scoreEl) scoreEl.innerText = score.toLocaleString();

    const highEl = document.getElementById('game-over-high-notice');
    if (highEl) {
      if (isNewHigh) {
        highEl.classList.remove('hidden');
      } else {
        highEl.classList.add('hidden');
      }
    }

    const retryBtn = document.getElementById('btn-retry-game');
    if (retryBtn) {
      retryBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        onRetry();
      };
    }

    const menuBtn = document.getElementById('btn-menu-game');
    if (menuBtn) {
      menuBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        onMenu();
      };
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  public openModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    audioManager.playTone(600, 0.08, 'sine');
  }

  public closeModal(modalId: string): void {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    audioManager.playTone(400, 0.08, 'sine');
  }

  public showNotification(text: string): void {
    const banner = document.getElementById('toast-banner');
    const msg = document.getElementById('toast-message');
    if (!banner || !msg) return;

    msg.innerText = text;
    banner.classList.remove('-translate-y-24', 'opacity-0');
    banner.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      banner.classList.remove('translate-y-0', 'opacity-100');
      banner.classList.add('-translate-y-24', 'opacity-0');
    }, 2200);
  }
}