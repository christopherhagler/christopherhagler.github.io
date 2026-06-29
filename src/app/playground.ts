import {
  Component,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

interface Target {
  bin: number;
  snrDb: number;
}

/**
 * Interactive CA-CFAR (cell-averaging constant false-alarm rate) demo.
 *
 * A synthetic range profile — exponential noise power with a few injected
 * targets — is run through a CA-CFAR detector whose training cells, guard
 * cells, and threshold offset are user-adjustable. Detections are classified
 * against the known target bins as hits vs. false alarms. Pure client-side
 * canvas; the page itself still prerenders for SEO.
 */
@Component({
  selector: 'app-playground',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './playground.html',
})
export class Playground {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private ctx!: CanvasRenderingContext2D;

  private readonly NUM_BINS = 240;
  private readonly targets: Target[] = [
    { bin: 50, snrDb: 14 },
    { bin: 96, snrDb: 7 },
    { bin: 150, snrDb: 22 },
    { bin: 196, snrDb: 5 },
  ];
  private power: number[] = [];
  private seed = 1337;

  // User-adjustable parameters.
  protected readonly trainingCells = signal(12);
  protected readonly guardCells = signal(2);
  protected readonly thresholdDb = signal(6);

  // Live readouts.
  protected readonly hits = signal(0);
  protected readonly falseAlarms = signal(0);
  protected readonly targetCount = this.targets.length;

  private readonly onResize = () => this.draw();

  constructor() {
    afterNextRender(() => {
      this.ctx = this.canvasRef().nativeElement.getContext('2d')!;
      this.regenerate();
      window.addEventListener('resize', this.onResize, { passive: true });
    });
  }

  /* ----- parameter handlers ----- */
  setTraining(v: string): void {
    this.trainingCells.set(+v);
    this.draw();
  }
  setGuard(v: string): void {
    this.guardCells.set(+v);
    this.draw();
  }
  setThreshold(v: string): void {
    this.thresholdDb.set(+v);
    this.draw();
  }

  regenerate(): void {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    this.generateData();
    this.draw();
  }

  /* ----- data ----- */
  private rng(): () => number {
    // Deterministic mulberry32 so slider changes don't reshuffle the noise.
    let s = this.seed >>> 0;
    return () => {
      s |= 0;
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  private generateData(): void {
    const rand = this.rng();
    const power = new Array<number>(this.NUM_BINS);
    for (let i = 0; i < this.NUM_BINS; i++) {
      // Exponential noise power, unit mean (Rayleigh-amplitude detector output).
      power[i] = -Math.log(1 - rand());
    }
    for (const t of this.targets) {
      power[t.bin] += Math.pow(10, t.snrDb / 10);
    }
    this.power = power;
  }

  /* ----- CA-CFAR + render ----- */
  private draw(): void {
    if (!this.ctx || this.power.length === 0) return;

    const ctx = this.ctx;
    const canvas = this.canvasRef().nativeElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 720;
    const cssH = 360;
    canvas.width = cssW * dpr;
    canvas.height = cssH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cssW, cssH);

    const padL = 46;
    const padR = 14;
    const padT = 16;
    const padB = 30;
    const plotW = cssW - padL - padR;
    const plotH = cssH - padT - padB;

    const T = this.trainingCells();
    const G = this.guardCells();
    const half = T + G;
    const scale = Math.pow(10, this.thresholdDb() / 10);

    const DB_MIN = -12;
    const DB_MAX = 38;
    const toDb = (p: number) => 10 * Math.log10(Math.max(p, 1e-6));
    const x = (bin: number) => padL + (bin / (this.NUM_BINS - 1)) * plotW;
    const y = (db: number) =>
      padT + (1 - (Math.min(Math.max(db, DB_MIN), DB_MAX) - DB_MIN) / (DB_MAX - DB_MIN)) * plotH;

    // Grid + dB labels.
    ctx.font = '11px ui-monospace, monospace';
    ctx.textBaseline = 'middle';
    for (let db = DB_MIN; db <= DB_MAX; db += 10) {
      const gy = y(db);
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath();
      ctx.moveTo(padL, gy);
      ctx.lineTo(cssW - padR, gy);
      ctx.stroke();
      ctx.fillStyle = '#6a7088';
      ctx.textAlign = 'right';
      ctx.fillText(`${db}`, padL - 8, gy);
    }
    ctx.textAlign = 'center';
    ctx.fillStyle = '#6a7088';
    ctx.fillText('range bin →', padL + plotW / 2, cssH - 8);
    ctx.save();
    ctx.translate(13, padT + plotH / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('power (dB)', 0, 0);
    ctx.restore();

    // Truth markers at target bins.
    for (const t of this.targets) {
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(x(t.bin), padT);
      ctx.lineTo(x(t.bin), padT + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Signal trace.
    ctx.strokeStyle = '#8893ad';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for (let i = 0; i < this.NUM_BINS; i++) {
      const px = x(i);
      const py = y(toDb(this.power[i]));
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.stroke();

    // CA-CFAR threshold + detections.
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    let started = false;
    const detections: number[] = [];
    for (let i = half; i < this.NUM_BINS - half; i++) {
      let sum = 0;
      for (let k = i - half; k <= i - G - 1; k++) sum += this.power[k];
      for (let k = i + G + 1; k <= i + half; k++) sum += this.power[k];
      const noiseEst = sum / (2 * T);
      const thr = noiseEst * scale;

      const px = x(i);
      const py = y(toDb(thr));
      started ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      started = true;

      if (this.power[i] > thr) detections.push(i);
    }
    ctx.stroke();

    // Mark detections; classify as hit (near a target) vs false alarm.
    // Collapse adjacent detection bins so one target isn't counted many times.
    let falseAlarms = 0;
    const grouped = detections.filter((b, idx) => idx === 0 || b - detections[idx - 1] > 2);
    const hitTargets = new Set<number>();
    for (const bin of grouped) {
      const near = this.targets.find((t) => Math.abs(t.bin - bin) <= 2);
      if (near) hitTargets.add(near.bin);
      else falseAlarms++;
      ctx.fillStyle = near ? '#34d399' : '#f472b6';
      ctx.beginPath();
      ctx.arc(x(bin), y(toDb(this.power[bin])), 4, 0, Math.PI * 2);
      ctx.fill();
    }

    this.hits.set(hitTargets.size);
    this.falseAlarms.set(falseAlarms);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', this.onResize);
    }
  }
}
