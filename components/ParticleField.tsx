"use client";

import { useEffect, useRef } from "react";

interface Particle {
  ox: number; oy: number;
  x: number; y: number;
  vx: number; vy: number;
  r: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let animId: number;
    let particles: Particle[] = [];
    let particleColor = "255,255,255";

    const pointer = { x: -9999, y: -9999, active: false };
    const RADIUS = 180;
    const REPULSION = 55;
    const CELL_W = 28;
    const CELL_H = 36;

    function updateColor() {
      particleColor = document.documentElement.classList.contains("dark")
        ? "255,255,255"
        : "0,0,0";
    }

    function init() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
      particles = [];

      const cols = Math.ceil(W / CELL_W) + 1;
      const rows = Math.ceil(H / CELL_H) + 1;
      const jitter = 8;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const ox = (i / Math.max(cols - 1, 1)) * W + (Math.random() - 0.5) * jitter;
          const oy = (j / Math.max(rows - 1, 1)) * H + (Math.random() - 0.5) * jitter;
          particles.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, r: Math.random() * 1.2 + 0.4 });
        }
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);
      const c = particleColor;

      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (pointer.active && dist < REPULSION) {
          const force = (REPULSION - dist) / REPULSION;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force * 3.8;
          p.vy += Math.sin(angle) * force * 3.8;
        }

        p.vx += (p.ox - p.x) * 0.065;
        p.vy += (p.oy - p.y) * 0.065;
        p.vx *= 0.80;
        p.vy *= 0.80;
        p.x += p.vx;
        p.y += p.vy;

        const drawDx = p.x - pointer.x;
        const drawDy = p.y - pointer.y;
        const drawDist = Math.sqrt(drawDx * drawDx + drawDy * drawDy);

        if (!pointer.active || drawDist > RADIUS) continue;

        const t = 1 - drawDist / RADIUS;
        const alpha = Math.pow(t, 1.6) * 0.85 + 0.05;
        const displacement = Math.sqrt((p.x - p.ox) ** 2 + (p.y - p.oy) ** 2);
        const rBoost = Math.min(displacement / 25, 1.5);

        if (displacement > 4) {
          const glowRadius = (p.r + rBoost) * 3.5;
          const grad = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          grad.addColorStop(0, `rgba(${c},${alpha * 0.15})`);
          grad.addColorStop(1, `rgba(${c},0)`);
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        }

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r + rBoost * 0.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${c},${alpha})`;
        ctx!.fill();
      }

      if (pointer.active) {
        const grad = ctx!.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, RADIUS);
        grad.addColorStop(0, `rgba(${c},0.04)`);
        grad.addColorStop(0.3, `rgba(${c},0.015)`);
        grad.addColorStop(1, `rgba(${c},0)`);
        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = grad;
        ctx!.fill();

        ctx!.beginPath();
        ctx!.arc(pointer.x, pointer.y, 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${c},0.9)`;
        ctx!.fill();
      }

      animId = requestAnimationFrame(draw);
    }

    function setPointer(x: number, y: number) {
      pointer.x = x;
      pointer.y = y;
      pointer.active = true;
    }

    const onMouseMove = (e: MouseEvent) => setPointer(e.clientX, e.clientY);
    const onMouseLeave = () => { pointer.active = false; };
    const onTouchStart = (e: TouchEvent) => { e.preventDefault(); setPointer(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchMove = (e: TouchEvent) => { e.preventDefault(); setPointer(e.touches[0].clientX, e.touches[0].clientY); };
    const onTouchEnd = () => { pointer.active = false; };
    const onResize = () => init();

    const mutObs = new MutationObserver(updateColor);
    mutObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("resize", onResize);

    updateColor();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      mutObs.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
