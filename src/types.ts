export type ShapeType = 'star' | 'flower' | 'needle';

export interface SnowflakeInstance {
  id: number;
  type: ShapeType;
  x: number;
  y: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
}

export interface CrystalDefinition {
  id: ShapeType;
  title: string;
  cssClass: string;
  color: string;
  glowColor: string;
  hotkey: string;
  svg: string;
}

export interface GameState {
  score: number;
  lives: number;
  maxLives: number;
  level: number;
  combo: number;
  maxCombo: number;
  highScore: number;
  isGameRunning: boolean;
  isGameOver: boolean;
  matchesMade: number;
  perfectCatches: number;
  crystalsHarvested: number;
  gemsEarned: number;
}

export interface ParticleParticle {
  x: number;
  y: number;
  radius: number;
  density: number;
  alpha: number;
  speedY: number;
  speedX: number;
  driftAngle: number;
  layer: number;
}

export interface BurstSparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}