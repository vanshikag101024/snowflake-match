class AudioManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private bgmInterval: number | null = null;
  private noteIdx: number = 0;
  private readonly winterMelody: number[] = [
    523.25, 659.25, 783.99, 987.77, 1046.50, 783.99, 659.25, 587.33,
    523.25, 698.46, 880.00, 1046.50, 880.00, 698.46, 659.25, 587.33
  ];

  public getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public toggle(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (!this.soundEnabled) {
      this.stopBGM();
    } else {
      try {
        const ctx = this.getContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
      } catch {
        return false;
      }
      this.startBGM();
      this.playTone(587.33, 0.15, 'triangle');
    }
    return this.soundEnabled;
  }

  public playTone(freq: number, duration: number = 0.15, type: OscillatorType = 'sine', volume: number = 0.12): void {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      return;
    }
  }

  public playMatch(combo: number, inDangerZone: boolean): void {
    if (!this.soundEnabled) return;
    const baseFreq = 520 + Math.min(combo, 15) * 45;
    if (inDangerZone) {
      this.playTone(baseFreq, 0.22, 'triangle', 0.16);
    setTimeout(() => this.playTone(baseFreq * 1.25, 0.18, 'sine', 0.14), 45);
      setTimeout(() => this.playTone(baseFreq * 1.5, 0.25, 'sine', 0.12), 90);
    } else {
      this.playTone(baseFreq, 0.18, 'sine', 0.14);
      setTimeout(() => this.playTone(baseFreq * 1.25, 0.15, 'sine', 0.1), 50);
    
    }
  }

  public playMiss(): void {
    if (!this.soundEnabled) return;
    this.playTone(196.00, 0.22, 'sawtooth', 0.12);
    setTimeout(() => this.playTone(146.83, 0.28, 'sawtooth', 0.14), 70);
  }

  public playLevelUp(): void {
    if (!this.soundEnabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((pitch, i) => {
      setTimeout(() => this.playTone(pitch, 0.2, 'triangle', 0.15), i * 75);
    });
  }

  public playGameOver(): void {
    if (!this.soundEnabled) return;
    const notes = [440.00, 392.00, 349.23, 293.66];
    notes.forEach((pitch, i) => {
      setTimeout(() => this.playTone(pitch, 0.3, 'sawtooth', 0.12), i * 110);
    });
  }

  public playReward(type: 'crystal' | 'gem'): void {
    if (!this.soundEnabled) return;
    if (type === 'crystal') {
      this.playTone(784, 0.15, 'sine', 0.12);
    } else {
      this.playTone(987.77, 0.18, 'sine', 0.15);
      setTimeout(() => this.playTone(1318.51, 0.22, 'triangle', 0.13), 60);
    }
  }

  public startBGM(): void {
    if (!this.soundEnabled || this.bgmInterval) return;
    this.bgmInterval = window.setInterval(() => {
      if (!this.soundEnabled) return;
    const freq = this.winterMelody[this.noteIdx % this.winterMelody.length];
      this.playTone(freq, 0.45, 'sine', 0.025);
      this.noteIdx++;
    }, 480);
  }

  public stopBGM(): void {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

export const audioManager = new AudioManager();