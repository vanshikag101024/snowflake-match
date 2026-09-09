import { ParticleParticle, BurstSparkle } from './types';

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private flakes: ParticleParticle[] = [];
  private sparkles: BurstSparkle[] = [];
  private width: number = 0;
  private height: number = 0;
  private animationId: number | null = null;
  private readonly maxFlakes: number = 75;

  constructor(canvasId: string) {
    const el = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!el) {
      throw new Error(`Canvas #${canvasId} not found`);
 }
    this.canvas = el;
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new Error('Canvas 2D context not supported');
    }
    this.ctx = context;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initFlakes();
    this.start();
  }

  private resize(): void {
    const dpr = window.devicePixelRatio || 1;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(dpr, dpr);
  }

  private initFlakes(): void {
    this.flakes = [];
    for (let i = 0; i < this.maxFlakes; i++) {
      this.flakes.push(this.createFlake(Math.random() * this.height));
      }
    }

  private createFlake(initialY?: number): ParticleParticle {
    const layer = Math.random() < 0.3 ? 1 : Math.random() < 0.7 ? 2 : 3;
    const radius = layer === 1 ? Math.random() * 1.5 + 1 : layer === 2 ? Math.random() * 2 + 1.8 : Math.random() * 3.2 + 2.5;
    const speedY = layer === 1 ? Math.random() * 0.5 + 0.4 : layer === 2 ? Math.random() * 1 + 0.8 : Math.random() * 1.8 + 1.2;

    return {
      x: Math.random() * this.width,
      y: initialY !== undefined ? initialY : -10,
      radius,
      density: Math.random() * 20,
      alpha: layer === 1 ? Math.random() * 0.3 + 0.2 : layer === 2 ? Math.random() * 0.4 + 0.3 : Math.random() * 0.5 + 0.4,
      speedY,
      speedX: (Math.random() - 0.5) * 0.6,
      driftAngle: Math.random() * Math.PI * 2,
      layer
    };
  }

  public triggerBurst(x: number, y: number, color: string = '#ffffff', count: number = 24): void {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 6 + 2;
      this.sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.random() * 3.5 + 2,
        color: '#ffffff'
      });
    }
  }

  private update(): void {
    for (let i = 0; i < this.flakes.length; i++) {
      const f = this.flakes[i];
      f.driftAngle += 0.015;
      f.y += f.speedY;
      f.x += Math.sin(f.driftAngle) * 0.8 + f.speedX;

      if (f.y > this.height + 15 || f.x < -20 || f.x > this.width + 20) {
        this.flakes[i] = this.createFlake(-10);
      }
    }

    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const sp = this.sparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.12;
      sp.vx *= 0.96;
      sp.alpha -= 0.025;

      if (sp.alpha <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  }

  private render(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.flakes.length; i++) {
      const f = this.flakes[i];
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
      this.ctx.shadowBlur = f.layer === 3 ? 8 : 2;
      this.ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
      this.ctx.fill();
    }

    this.ctx.shadowBlur = 10;
    for (let i = 0; i < this.sparkles.length; i++) {
      const sp = this.sparkles[i];
      this.ctx.beginPath();
      this.ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#ffffff';
      this.ctx.globalAlpha = Math.max(0, sp.alpha);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
    this.ctx.shadowBlur = 0;
  }

  public loop = (): void => {
    this.update();
    this.render();
    this.animationId = requestAnimationFrame(this.loop);
  };

  public start(): void {
    if (!this.animationId) {
      this.animationId = requestAnimationFrame(this.loop);
    }
  }

  public stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
    }