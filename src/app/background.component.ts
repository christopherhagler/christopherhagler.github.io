import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  inject,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Animated radar-scope canvas: concentric range rings and a rotating sweep
 * over a soft gradient. Pauses when offscreen and respects reduced-motion.
 */
@Component({
  selector: 'app-background',
  standalone: true,
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: [
    `
      :host {
        position: fixed;
        inset: 0;
        z-index: -1;
        display: block;
        background:
          radial-gradient(60% 50% at 15% 0%, rgba(34, 211, 238, 0.12), transparent 70%),
          radial-gradient(50% 50% at 90% 10%, rgba(168, 85, 247, 0.14), transparent 70%),
          radial-gradient(70% 60% at 50% 100%, rgba(244, 114, 182, 0.08), transparent 70%),
          var(--bg);
      }
      canvas {
        width: 100%;
        height: 100%;
        display: block;
      }
    `,
  ],
})
export class BackgroundComponent implements AfterViewInit, OnDestroy {
  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private ctx!: CanvasRenderingContext2D;
  private raf = 0;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private sweepAngle = 0;

  private readonly onResize = () => this.resize();

  ngAfterViewInit(): void {
    if (!this.isBrowser) return; // canvas/animation is browser-only (skip during prerender)

    const canvas = this.canvasRef().nativeElement;
    this.ctx = canvas.getContext('2d')!;

    const reduced =
      typeof matchMedia !== 'undefined' &&
      matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.resize();
    window.addEventListener('resize', this.onResize, { passive: true });

    if (reduced) {
      this.draw(); // single static frame
      return;
    }

    this.zone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy(): void {
    if (!this.isBrowser) return;
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    canvas.width = this.w * this.dpr;
    canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private loop = (): void => {
    this.step();
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private step(): void {
    this.sweepAngle = (this.sweepAngle + 0.006) % (Math.PI * 2);
  }

  /** Subtle radar scope: concentric range rings + a rotating sweep. */
  private drawRadar(): void {
    const ctx = this.ctx;
    const cx = this.w / 2;
    const cy = this.h / 2;
    const maxR = Math.min(this.w, this.h) * 0.46;

    ctx.save();
    ctx.translate(cx, cy);

    // Range rings + crosshairs
    ctx.strokeStyle = 'rgba(120, 180, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let r = maxR / 4; r <= maxR; r += maxR / 4) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.beginPath();
    ctx.moveTo(-maxR, 0);
    ctx.lineTo(maxR, 0);
    ctx.moveTo(0, -maxR);
    ctx.lineTo(0, maxR);
    ctx.stroke();

    // Sweep wedge with a fading trail
    const trail = 0.5; // radians
    const grad = ctx.createConicGradient
      ? ctx.createConicGradient(this.sweepAngle - trail, 0, 0)
      : null;
    if (grad) {
      grad.addColorStop(0, 'rgba(34, 211, 238, 0)');
      grad.addColorStop(trail / (Math.PI * 2), 'rgba(34, 211, 238, 0.12)');
      grad.addColorStop(trail / (Math.PI * 2) + 0.0001, 'rgba(34, 211, 238, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, this.sweepAngle - trail, this.sweepAngle);
      ctx.closePath();
      ctx.fill();
    }

    // Leading edge line
    ctx.strokeStyle = 'rgba(34, 211, 238, 0.28)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(this.sweepAngle) * maxR, Math.sin(this.sweepAngle) * maxR);
    ctx.stroke();

    ctx.restore();
  }

  private draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    this.drawRadar();
  }
}
