import { ParticleParticle, BurstSparkle } from './types';

interface PixelStar {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
}

interface PixelCloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offCanvas: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;

  // Virtual retro pixel resolution (16:9)
  private readonly V_WIDTH = 320;
  private readonly V_HEIGHT = 180;

  private flakes: ParticleParticle[] = [];
  private sparkles: BurstSparkle[] = [];
  private stars: PixelStar[] = [];
  private clouds: PixelCloud[] = [];

  private width: number = 0;
  private height: number = 0;
  private animationId: number | null = null;
  private readonly maxFlakes: number = 60;

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

    // Create low-res virtual offscreen buffer canvas for authentic pixel art
    this.offCanvas = document.createElement('canvas');
    this.offCanvas.width = this.V_WIDTH;
    this.offCanvas.height = this.V_HEIGHT;
    const offContext = this.offCanvas.getContext('2d');
    if (!offContext) {
      throw new Error('Offscreen 2D context not supported');
    }
    this.offCtx = offContext;
    this.offCtx.imageSmoothingEnabled = false;
    this.ctx.imageSmoothingEnabled = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.initFlakes();
    this.initStars();
    this.initClouds();
    this.start();
  }

  private resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.imageSmoothingEnabled = false;
  }

  private initStars(): void {
    this.stars = [];
    for (let i = 0; i < 35; i++) {
      this.stars.push({
        x: Math.floor(Math.random() * this.V_WIDTH),
        y: Math.floor(Math.random() * (this.V_HEIGHT * 0.5)),
        size: Math.random() < 0.25 ? 2 : 1,
        alpha: Math.random() * 0.7 + 0.3,
        twinkleSpeed: (Math.random() - 0.5) * 0.03
      });
    }
  }

  private initClouds(): void {
    this.clouds = [
      { x: 20, y: 18, width: 44, height: 14, speed: 0.12 },
      { x: 130, y: 10, width: 60, height: 18, speed: 0.08 },
      { x: 240, y: 26, width: 38, height: 12, speed: 0.15 },
      { x: 310, y: 14, width: 50, height: 16, speed: 0.09 }
    ];
  }

  private initFlakes(): void {
    this.flakes = [];
    for (let i = 0; i < this.maxFlakes; i++) {
      this.flakes.push(this.createFlake(Math.random() * this.V_HEIGHT));
    }
  }

  private createFlake(initialY?: number): ParticleParticle {
    const layer = Math.random() < 0.3 ? 1 : Math.random() < 0.7 ? 2 : 3;
    const radius = layer === 1 ? 1 : layer === 2 ? 2 : 3;
    const speedY = layer === 1 ? 0.3 + Math.random() * 0.3 : layer === 2 ? 0.6 + Math.random() * 0.4 : 1.0 + Math.random() * 0.5;

    return {
      x: Math.random() * this.V_WIDTH,
      y: initialY !== undefined ? initialY : -8,
      radius,
      density: Math.random() * 20,
      alpha: layer === 1 ? 0.45 : layer === 2 ? 0.75 : 0.95,
      speedY,
      speedX: (Math.random() - 0.5) * 0.3,
      driftAngle: Math.random() * Math.PI * 2,
      layer
    };
  }

  public triggerBurst(screenX: number, screenY: number, color: string = '#4f46e5', count: number = 20): void {
    const vx = (screenX / Math.max(1, this.width)) * this.V_WIDTH;
    const vy = (screenY / Math.max(1, this.height)) * this.V_HEIGHT;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const speed = Math.random() * 3 + 1;
      this.sparkles.push({
        x: vx,
        y: vy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        size: Math.floor(Math.random() * 2 + 2),
        color: color || '#4f46e5'
      });
    }
  }

  private update(): void {
    // Twinkle Stars
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      s.alpha += s.twinkleSpeed;
      if (s.alpha > 0.95 || s.alpha < 0.2) {
        s.twinkleSpeed = -s.twinkleSpeed;
      }
    }

    // Move Clouds
    for (let i = 0; i < this.clouds.length; i++) {
      const c = this.clouds[i];
      c.x += c.speed;
      if (c.x > this.V_WIDTH + 20) {
        c.x = -c.width - 20;
      }
    }

    // Move Flakes
    for (let i = 0; i < this.flakes.length; i++) {
      const f = this.flakes[i];
      f.driftAngle += 0.02;
      f.y += f.speedY;
      f.x += Math.sin(f.driftAngle) * 0.4 + f.speedX;

      if (f.y > this.V_HEIGHT + 10 || f.x < -10 || f.x > this.V_WIDTH + 10) {
        this.flakes[i] = this.createFlake(-6);
      }
    }

    // Move Sparkles
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const sp = this.sparkles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.1;
      sp.vx *= 0.94;
      sp.alpha -= 0.04;

      if (sp.alpha <= 0) {
        this.sparkles.splice(i, 1);
      }
    }
  }

  private drawPixelSky(): void {
    const ctx = this.offCtx;

    // Band 1: Upper Sky
    ctx.fillStyle = '#7dd3fc';
    ctx.fillRect(0, 0, this.V_WIDTH, 50);

    // Dither transition 1
    for (let x = 0; x < this.V_WIDTH; x += 2) {
      ctx.fillStyle = '#bae6fd';
      ctx.fillRect(x, 49, 1, 1);
      ctx.fillRect(x + 1, 50, 1, 1);
    }

    // Band 2: Mid Sky
    ctx.fillStyle = '#bae6fd';
    ctx.fillRect(0, 51, this.V_WIDTH, 55);

    // Dither transition 2
    for (let x = 0; x < this.V_WIDTH; x += 2) {
      ctx.fillStyle = '#e0f2fe';
      ctx.fillRect(x, 105, 1, 1);
      ctx.fillRect(x + 1, 106, 1, 1);
    }

    // Band 3: Horizon Sky
    ctx.fillStyle = '#e0f2fe';
    ctx.fillRect(0, 107, this.V_WIDTH, this.V_HEIGHT - 107);

    // Pixel Winter Sun
    const sunX = 265;
    const sunY = 22;
    // Outer glow
    ctx.fillStyle = '#fef08a';
    ctx.fillRect(sunX - 2, sunY - 2, 16, 16);
    // Main Sun Body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(sunX, sunY - 1, 12, 14);
    ctx.fillRect(sunX - 1, sunY, 14, 12);
  }

  private drawPixelStars(): void {
    const ctx = this.offCtx;
    for (let i = 0; i < this.stars.length; i++) {
      const s = this.stars[i];
      ctx.fillStyle = `rgba(2, 132, 199, ${s.alpha.toFixed(2)})`;
      ctx.fillRect(s.x, s.y, s.size, s.size);
    }
  }

  private drawPixelClouds(): void {
    const ctx = this.offCtx;
    for (let i = 0; i < this.clouds.length; i++) {
      const c = this.clouds[i];
      const cx = Math.floor(c.x);
      const cy = Math.floor(c.y);
      const w = c.width;
      const h = c.height;

      // Base shadow (slate blue)
      ctx.fillStyle = '#94a3b8';
      ctx.fillRect(cx + 2, cy + h - 3, w - 4, 3);
      ctx.fillRect(cx + 4, cy + 3, w - 8, h - 3);

      // Cloud Body (White)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(cx + 4, cy, w - 8, h - 3);
      ctx.fillRect(cx + 2, cy + 3, w - 4, h - 6);
      ctx.fillRect(cx, cy + 5, w, h - 9);

      // Highlight Top Line
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(cx + 6, cy, w - 12, 2);
    }
  }

  private drawPixelMountains(): void {
    const ctx = this.offCtx;
    const vh = this.V_HEIGHT;

    // Distant Stepped Pixel Mountain Peaks (#64748b)
    ctx.fillStyle = '#64748b';
    const backPeaks = [
      { x: 0, h: 45 }, { x: 30, h: 70 }, { x: 70, h: 50 },
      { x: 110, h: 85 }, { x: 165, h: 60 }, { x: 210, h: 90 },
      { x: 270, h: 65 }, { x: 320, h: 45 }
    ];

    for (let i = 0; i < backPeaks.length - 1; i++) {
      const p1 = backPeaks[i];
      const p2 = backPeaks[i + 1];
      const dx = p2.x - p1.x;
      const steps = Math.floor(dx / 4);

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const curX = p1.x + s * 4;
        const curH = Math.floor(p1.h * (1 - t) + p2.h * t);
        const topY = vh - curH;
        ctx.fillRect(curX, topY, 4, curH);

        // Snowcap top
        if (curH > 55) {
          ctx.fillStyle = '#cbd5e1';
          ctx.fillRect(curX, topY, 4, 4);
          ctx.fillStyle = '#64748b';
        }
      }
    }

    // Mid-ground Stepped Pixel Mountain Peaks (#94a3b8)
    ctx.fillStyle = '#94a3b8';
    const midPeaks = [
      { x: -10, h: 35 }, { x: 45, h: 55 }, { x: 90, h: 40 },
      { x: 140, h: 65 }, { x: 195, h: 45 }, { x: 245, h: 60 },
      { x: 295, h: 38 }, { x: 330, h: 35 }
    ];

    for (let i = 0; i < midPeaks.length - 1; i++) {
      const p1 = midPeaks[i];
      const p2 = midPeaks[i + 1];
      const dx = p2.x - p1.x;
      const steps = Math.floor(dx / 3);

      for (let s = 0; s <= steps; s++) {
        const t = s / steps;
        const curX = p1.x + s * 3;
        const curH = Math.floor(p1.h * (1 - t) + p2.h * t);
        const topY = vh - curH;
        ctx.fillRect(curX, topY, 3, curH);

        // White snow cap
        if (curH > 40) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(curX, topY, 3, 3);
          ctx.fillStyle = '#e0f2fe';
          ctx.fillRect(curX, topY + 3, 3, 2);
          ctx.fillStyle = '#94a3b8';
        }
      }
    }
  }

  private drawPixelSnowGround(): void {
    const ctx = this.offCtx;
    const vh = this.V_HEIGHT;
    const groundY = vh - 22;

    // Ground Base (#cbd5e1)
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, groundY - 2, this.V_WIDTH, 24);

    // Main Snow Deck (#ffffff)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, groundY, this.V_WIDTH, 22);

    // Pixel Snow Drift Outlines
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(0, groundY + 4, this.V_WIDTH, 2);
    ctx.fillRect(0, groundY + 12, this.V_WIDTH, 2);

    // Pixel Trees along the horizon
    const treePositions = [15, 45, 80, 125, 170, 215, 260, 295];
    for (let i = 0; i < treePositions.length; i++) {
      const tx = treePositions[i];
      this.drawPixelTree(tx, groundY);
    }

    // Cozy Pixel Cabin in background right
    this.drawPixelCabin(235, groundY - 2);
  }

  private drawPixelTree(x: number, groundY: number): void {
    const ctx = this.offCtx;
    const px = Math.floor(x);
    const py = Math.floor(groundY);

    // Trunk (#475569)
    ctx.fillStyle = '#334155';
    ctx.fillRect(px - 1, py - 4, 3, 4);

    // Dark Pine Foliage (#1e293b)
    ctx.fillStyle = '#1e293b';

    // Tier 1 (Bottom)
    ctx.fillRect(px - 6, py - 8, 13, 4);
    // Tier 2 (Mid)
    ctx.fillRect(px - 4, py - 12, 9, 4);
    // Tier 3 (Top)
    ctx.fillRect(px - 2, py - 16, 5, 4);
    // Tip
    ctx.fillRect(px, py - 18, 1, 2);

    // White Pixel Snow Caps
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 4, py - 12, 9, 1);
    ctx.fillRect(px - 2, py - 16, 5, 1);
    ctx.fillRect(px, py - 18, 1, 1);
  }

  private drawPixelCabin(x: number, groundY: number): void {
    const ctx = this.offCtx;
    const px = Math.floor(x);
    const py = Math.floor(groundY);

    // Log Walls (#475569)
    ctx.fillStyle = '#475569';
    ctx.fillRect(px, py - 10, 16, 10);

    // Door (#1e293b)
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(px + 6, py - 6, 4, 6);

    // Window (#fef08a glow)
    ctx.fillStyle = '#fde047';
    ctx.fillRect(px + 2, py - 7, 3, 3);

    // Roof (#334155) with Snow Cover (#ffffff)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(px - 2, py - 13, 20, 3);
    ctx.fillRect(px, py - 14, 16, 2);

    // Chimney Smoke Pixel
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(px + 12, py - 17, 2, 2);
    ctx.fillRect(px + 14, py - 20, 2, 2);
  }

  private drawPixelFlakes(): void {
    const ctx = this.offCtx;
    for (let i = 0; i < this.flakes.length; i++) {
      const f = this.flakes[i];
      const px = Math.floor(f.x);
      const py = Math.floor(f.y);
      const sz = Math.floor(f.radius);

      ctx.fillStyle = `rgba(15, 23, 42, ${f.alpha})`;
      ctx.fillRect(px, py, sz, sz);

      // Pixel cross detail for larger flakes
      if (sz >= 2) {
        ctx.fillStyle = `rgba(2, 132, 199, ${(f.alpha * 0.8).toFixed(2)})`;
        ctx.fillRect(px - 1, py, 1, 1);
        ctx.fillRect(px + sz, py, 1, 1);
        ctx.fillRect(px, py - 1, 1, 1);
        ctx.fillRect(px, py + sz, 1, 1);
      }
    }
  }

  private drawSparkles(): void {
    const ctx = this.offCtx;
    for (let i = 0; i < this.sparkles.length; i++) {
      const sp = this.sparkles[i];
      const px = Math.floor(sp.x);
      const py = Math.floor(sp.y);
      const sz = Math.floor(sp.size);

      ctx.fillStyle = sp.color || '#4f46e5';
      ctx.globalAlpha = Math.max(0, sp.alpha);
      ctx.fillRect(px, py, sz, sz);
    }
    ctx.globalAlpha = 1;
  }

  private render(): void {
    // 1. Render all game world pixel art onto low-res offscreen buffer canvas
    this.drawPixelSky();
    this.drawPixelStars();
    this.drawPixelClouds();
    this.drawPixelMountains();
    this.drawPixelSnowGround();
    this.drawPixelFlakes();
    this.drawSparkles();

    // 2. Upscale offscreen buffer onto main full-screen canvas without anti-aliasing
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(
      this.offCanvas,
      0, 0, this.V_WIDTH, this.V_HEIGHT,
      0, 0, this.width, this.height
    );
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