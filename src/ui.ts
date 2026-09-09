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
      this.levelEl.innerText = `LEVEL ${level}${combo > 1 ? ` (${combo}x)` : ''}`;
    }
  }

  public updateLives(lives: number): void {
    if (!this.livesEl) return;
    let html = '';
    for (let i = 0; i < 3; i++) {
      const active = i < lives;
      html += `<div class="w-3 h-3 rounded-full ${active ? 'bg-rose-500' : 'bg-slate-700'}"></div>`;
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

  public showArenaToast(text: string, _color: string = '#93c5fd'): void {
    if (!this.toastEl) return;
    this.toastEl.innerText = text;
    this.toastEl.classList.remove('hidden');

    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    this.toastTimer = window.setTimeout(() => {
      if (this.toastEl) this.toastEl.classList.add('hidden');
    }, 500);
  }

  public renderButtons(order: ShapeType[], onMatchClick: (type: ShapeType) => void): void {
    if (!this.buttonsGrid) return;
    const buttonsGrid = this.buttonsGrid;
    buttonsGrid.innerHTML = '';

    order.forEach((shapeKey, idx) => {
      const def = CRYSTAL_DEFINITIONS[shapeKey];
      const slotNum = idx + 1;

      const btn = document.createElement('button');
      btn.className = `gem-btn-card relative flex flex-col items-center justify-center gap-1 p-3 rounded-xl border border-slate-700 text-slate-100 cursor-pointer select-none`;
      btn.setAttribute('data-shape', shapeKey);

      btn.innerHTML = `
        <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
          Key ${slotNum}
        </span>
        <div class="w-9 h-9 flex items-center justify-center my-0.5">
          ${def.gemSvg}
        </div>
        <span class="text-xs font-bold text-slate-200">
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
    const iconSvg = enabled 
      ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>`
      : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>`;
    const title = enabled ? 'Mute Sound' : 'Unmute Sound';
    if (this.homeSfxBtn) {
      this.homeSfxBtn.innerHTML = iconSvg;
      this.homeSfxBtn.title = title;
    }
    if (this.gameSfxBtn) {
      this.gameSfxBtn.innerHTML = iconSvg;
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