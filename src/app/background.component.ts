import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  inject,
  viewChild,
} from '@angular/core';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

/**
 * Animated "constellation" canvas: drifting nodes linked when close, with a
 * cursor-reactive glow. Pauses when offscreen and respects reduced-motion.
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

  private ctx!: CanvasRenderingContext2D;
  private nodes: Node[] = [];
  private raf = 0;
  private w = 0;
  private h = 0;
  private dpr = 1;
  private mouse = { x: -9999, y: -9999 };
  private readonly LINK_DIST = 130;

  private readonly onResize = () => this.resize();
  private readonly onMove = (e: MouseEvent) => {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  };

  ngAfterViewInit(): void {
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

    window.addEventListener('mousemove', this.onMove, { passive: true });
    this.zone.runOutsideAngular(() => this.loop());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMove);
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    canvas.width = this.w * this.dpr;
    canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

    const target = Math.min(90, Math.floor((this.w * this.h) / 16000));
    this.nodes = Array.from({ length: target }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  private loop = (): void => {
    this.step();
    this.draw();
    this.raf = requestAnimationFrame(this.loop);
  };

  private step(): void {
    for (const n of this.nodes) {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > this.w) n.vx *= -1;
      if (n.y < 0 || n.y > this.h) n.vy *= -1;
    }
  }

  private draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    // Links
    for (let i = 0; i < this.nodes.length; i++) {
      const a = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const b = this.nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < this.LINK_DIST) {
          const alpha = (1 - dist / this.LINK_DIST) * 0.32;
          ctx.strokeStyle = `rgba(120, 180, 255, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Nodes + cursor glow
    for (const n of this.nodes) {
      const md = Math.hypot(n.x - this.mouse.x, n.y - this.mouse.y);
      const near = md < 160;
      ctx.beginPath();
      ctx.arc(n.x, n.y, near ? 2.6 : 1.6, 0, Math.PI * 2);
      ctx.fillStyle = near
        ? 'rgba(34, 211, 238, 0.95)'
        : 'rgba(168, 180, 220, 0.55)';
      ctx.fill();
    }
  }
}
