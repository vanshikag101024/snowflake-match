import { ShapeType, SnowflakeInstance, GameState } from './types';
import { SHAPE_KEYS, CRYSTAL_DEFINITIONS, shuffleSlots } from './shapes';
import { audioManager } from './audio';

export interface GameCallbacks {
  onScoreUpdate: (score: number, level: number, combo: number) => void;
  onLivesUpdate: (lives: number) => void;
  onSnowflakeMove: (flake: SnowflakeInstance, inDangerZone: boolean) => void;
  onSnowflakeDespawn: () => void;
  onSlotsShuffled: (order: ShapeType[]) => void;
  onMatchSuccess: (type: ShapeType, pts: number, inDangerZone: boolean, combo: number) => void;
  onMatchMiss: () => void;
  onGameOver: (finalScore: number, isNewHighScore: boolean) => void;
  onDangerZoneState: (active: boolean) => void;
}

export class GameEngine {
  private state: GameState;
  private currentFlake: SnowflakeInstance | null = null;
  private slotOrder: ShapeType[] = ['star', 'flower', 'needle'];
  private callbacks: GameCallbacks;
  private animFrameId: number | null = null;
  private lastTime: number = 0;
  private spawnTimeoutId: number | null = null;

  constructor(callbacks: GameCallbacks) {
    this.callbacks = callbacks;
    const storedHighScore = parseInt(localStorage.getItem('snowflake_high_score') || '0', 10);
    this.state = {
      score: 0,
      lives: 3,
      maxLives: 3,
      level: 1,
      combo: 0,
      maxCombo: 0,
      highScore: isNaN(storedHighScore) ? 0 : storedHighScore,
      isGameRunning: false,
      isGameOver: false,
      matchesMade: 0,
      perfectCatches: 0,
      crystalsHarvested: 2450,
      gemsEarned: 180
    };
  }

  public getState(): Readonly<GameState> {
    return this.state;
  }

  public getSlotOrder(): ShapeType[] {
    return [...this.slotOrder];
  }

  public start(): void {
    this.stop();
    this.state.score = 0;
    this.state.lives = 3;
    this.state.level = 1;
    this.state.combo = 0;
    this.state.matchesMade = 0;
    this.state.perfectCatches = 0;
    this.state.isGameRunning = true;
    this.state.isGameOver = false;

    this.callbacks.onScoreUpdate(this.state.score, this.state.level, this.state.combo);
    this.callbacks.onLivesUpdate(this.state.lives);
    this.slotOrder = ['star', 'flower', 'needle'];
    this.callbacks.onSlotsShuffled(this.slotOrder);

    this.lastTime = performance.now();
    this.spawnSnowflake();
    this.animFrameId = requestAnimationFrame(this.gameLoop);
  }

  public stop(): void {
    this.state.isGameRunning = false;
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
       this.animFrameId = null;
    }
    if (this.spawnTimeoutId) {
      clearTimeout(this.spawnTimeoutId);
      this.spawnTimeoutId = null;
    }
    this.currentFlake = null;
    this.callbacks.onSnowflakeDespawn();
    this.callbacks.onDangerZoneState(false);
  }

  private spawnSnowflake(): void {
    if (!this.state.isGameRunning || this.state.isGameOver) return;
    const randomShape = SHAPE_KEYS[Math.floor(Math.random() * SHAPE_KEYS.length)];
    const baseSpeed = 0.72 + Math.min(this.state.level, 12) * 0.10;

    this.currentFlake = {
      id: Date.now(),
      type: randomShape,
      x: 50,
      y: 0,
      speed: baseSpeed,
      rotation: 0,
      rotationSpeed: (Math.random() * 0.9 + 0.5) * (Math.random() > 0.5 ? 1 : -1),
      size: 90
    };
  }

  private gameLoop = (time: number): void => {
    if (!this.state.isGameRunning || this.state.isGameOver) return;

    const delta = Math.min(Math.max((time - this.lastTime) / 16.666, 0.1), 3);
    this.lastTime = time;

    if (this.currentFlake) {
      this.currentFlake.y += this.currentFlake.speed * delta;
      this.currentFlake.rotation += this.currentFlake.rotationSpeed * delta;

      const inDangerZone = this.currentFlake.y >= 70 && this.currentFlake.y <= 88;
      this.callbacks.onSnowflakeMove(this.currentFlake, inDangerZone);
      this.callbacks.onDangerZoneState(inDangerZone);

      if (this.currentFlake.y > 96) {
        this.handleBottomBreach();
      }
    }

    this.animFrameId = requestAnimationFrame(this.gameLoop);
  };

  private handleBottomBreach(): void {
    this.currentFlake = null;
    this.callbacks.onSnowflakeDespawn();
    this.callbacks.onDangerZoneState(false);
    this.state.combo = 0;
    this.state.lives--;
    this.callbacks.onLivesUpdate(this.state.lives);
    this.callbacks.onScoreUpdate(this.state.score, this.state.level, this.state.combo);
    audioManager.playMiss();
    this.callbacks.onMatchMiss();

    if (this.state.lives <= 0) {
      this.triggerGameOver();
    } else {
      this.spawnTimeoutId = window.setTimeout(() => this.spawnSnowflake(), 420);
    }
  }

  public handleMatchAttempt(chosenType: ShapeType): void {
    if (!this.state.isGameRunning || this.state.isGameOver || !this.currentFlake) return;

    const inDangerZone = this.currentFlake.y >= 70 && this.currentFlake.y <= 88;

    if (chosenType === this.currentFlake.type) {
      this.state.combo++;
      if (this.state.combo > this.state.maxCombo) {
        this.state.maxCombo = this.state.combo;
      }
      this.state.matchesMade++;

      let pts = inDangerZone ? 250 : 100;
      pts += Math.floor(this.state.combo * 20);
      if (inDangerZone) {
        this.state.perfectCatches++;
      }

      this.state.score += pts;
      if (this.state.score > this.state.highScore) {
        this.state.highScore = this.state.score;
        localStorage.setItem('snowflake_high_score', this.state.highScore.toString());
      }

      const prevLevel = this.state.level;
      this.state.level = Math.floor(this.state.score / 750) + 1;
      if (this.state.level > prevLevel) {
        audioManager.playLevelUp();
      }

      this.callbacks.onMatchSuccess(chosenType, pts, inDangerZone, this.state.combo);
      this.callbacks.onScoreUpdate(this.state.score, this.state.level, this.state.combo);

      this.slotOrder = shuffleSlots(this.slotOrder);
      this.callbacks.onSlotsShuffled(this.slotOrder);

      this.currentFlake = null;
      this.callbacks.onSnowflakeDespawn();
      this.callbacks.onDangerZoneState(false);

      this.spawnTimeoutId = window.setTimeout(() => this.spawnSnowflake(), 360);
    } else {
      this.state.combo = 0;
      this.state.lives--;
      this.callbacks.onLivesUpdate(this.state.lives);
      this.callbacks.onScoreUpdate(this.state.score, this.state.level, this.state.combo);
      audioManager.playMiss();
      this.callbacks.onMatchMiss();

      if (this.state.lives <= 0) {
        this.triggerGameOver();
      }
    }
  }

  private triggerGameOver(): void {
    this.state.isGameOver = true;
    this.stop();
    const isNewHigh = this.state.score >= this.state.highScore && this.state.score > 0;
    audioManager.playGameOver();
    this.callbacks.onGameOver(this.state.score, isNewHigh);
  }
} 