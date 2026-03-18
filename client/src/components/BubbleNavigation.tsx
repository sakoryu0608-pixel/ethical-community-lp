import React, { useEffect, useRef, useState, useCallback } from "react";
import bubbleBoyImg from "../assets/images/bubble-boy.png";

interface Bubble {
  id: number;
  size: number;
  sectionId: string;
  label: string;
  wobbleOffset: number;
  wobbleSpeed: number;
  riseSpeed: number;
  born: number;
}

interface PopParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const SECTIONS = [
  { id: "problem", label: "経営課題" },
  { id: "solution", label: "解決策" },
  { id: "cost", label: "コストメリット" },
  { id: "strengths", label: "強み" },
  { id: "vision", label: "ビジョン" },
  { id: "cta", label: "お問い合わせ" },
];

// Calculate bubble position based on elapsed time and canvas dimensions
function getBubblePos(b: Bubble, now: number, canvasW: number, canvasH: number) {
  const elapsed = (now - b.born) / 1000;
  const boyTopY = canvasH - 160;
  const startY = boyTopY - 30;
  const y = startY - elapsed * b.riseSpeed * 50;
  const baseX = canvasW - 80;
  const x = baseX + Math.sin(elapsed * b.wobbleSpeed + b.wobbleOffset) * 25;
  const opacity = Math.min(1, elapsed * 2);
  return { x, y, opacity, elapsed };
}

export default function BubbleNavigation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
  const particlesRef = useRef<PopParticle[]>([]);
  const animFrameRef = useRef<number>(0);
  const nextIdRef = useRef(0);
  const boyImgRef = useRef<HTMLImageElement | null>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load boy image
  useEffect(() => {
    const img = new Image();
    img.src = bubbleBoyImg;
    img.onload = () => { boyImgRef.current = img; };
  }, []);

  // Track which sections are currently shown and the last spawned section
  const lastSectionIdRef = useRef<string | null>(null);
  const sectionQueueRef = useRef<string[]>([]);

  // Build a shuffled queue of all section IDs (excluding the last used one)
  const buildQueue = useCallback((excludeId: string | null): string[] => {
    const ids = SECTIONS.map((s) => s.id).filter((id) => id !== excludeId);
    // Fisher-Yates shuffle
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  }, []);

  // Spawn a bubble - no duplicates among active bubbles, no consecutive repeat
  const spawnBubble = useCallback(() => {
    const activeSectionIds = new Set(bubblesRef.current.map((b) => b.sectionId));

    // Refill queue if empty
    if (sectionQueueRef.current.length === 0) {
      sectionQueueRef.current = buildQueue(lastSectionIdRef.current);
    }

    // Pick next from queue that is not already active
    let sectionId: string | null = null;
    const remaining: string[] = [];
    for (const id of sectionQueueRef.current) {
      if (!activeSectionIds.has(id) && sectionId === null) {
        sectionId = id;
      } else {
        remaining.push(id);
      }
    }
    sectionQueueRef.current = remaining;

    // If all sections are active, skip spawn
    if (!sectionId) return;

    lastSectionIdRef.current = sectionId;
    const section = SECTIONS.find((s) => s.id === sectionId)!;
    const size = 50 + Math.random() * 35; // 50-85px
    const bubble: Bubble = {
      id: nextIdRef.current++,
      size,
      sectionId: section.id,
      label: section.label,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.5 + Math.random() * 1.0,
      riseSpeed: 0.3 + Math.random() * 0.3,
      born: Date.now(),
    };
    bubblesRef.current.push(bubble);
  }, [buildQueue]);

  // Create pop particles at a position
  const createPopParticles = useCallback((x: number, y: number, size: number) => {
    const count = 8 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 1.5 + Math.random() * 3;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        size: 2 + Math.random() * 3,
      });
    }
  }, []);

  // Handle click on canvas - use CSS pixel coordinates (same as draw coordinates)
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const now = Date.now();
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
      const b = bubblesRef.current[i];
      const pos = getBubblePos(b, now, w, h);
      const dx = mx - pos.x;
      const dy = my - pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const hitRadius = b.size * 0.55; // slightly generous hit area

      if (dist < hitRadius) {
        // Create pop particles
        createPopParticles(pos.x, pos.y, b.size);
        // Store section before removing
        const sectionId = b.sectionId;
        // Remove bubble
        bubblesRef.current.splice(i, 1);
        // Scroll to section after a tiny delay for visual feedback
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
        return;
      }
    }
  }, [createPopParticles]);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastSpawn = Date.now();
    const spawnInterval = 2200;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawBubble = (b: Bubble, now: number): boolean => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const { x, y, opacity, elapsed } = getBubblePos(b, now, w, h);

      // Remove if off screen
      if (y < -b.size) return false;

      ctx.save();
      ctx.globalAlpha = opacity * 0.9;

      const radius = b.size * 0.5;

      // Bubble body - gradient
      const gradient = ctx.createRadialGradient(
        x - radius * 0.3, y - radius * 0.3, radius * 0.05,
        x, y, radius
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
      gradient.addColorStop(0.3, "rgba(253, 200, 160, 0.2)");
      gradient.addColorStop(0.6, "rgba(253, 108, 38, 0.1)");
      gradient.addColorStop(1, "rgba(253, 108, 38, 0.05)");

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Bubble border with iridescent effect
      const borderGrad = ctx.createLinearGradient(x - radius, y, x + radius, y);
      borderGrad.addColorStop(0, "rgba(253, 108, 38, 0.15)");
      borderGrad.addColorStop(0.5, "rgba(253, 108, 38, 0.35)");
      borderGrad.addColorStop(1, "rgba(253, 108, 38, 0.15)");
      ctx.strokeStyle = borderGrad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Highlight / shine (top-left)
      ctx.beginPath();
      ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.18, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();

      // Secondary smaller shine
      ctx.beginPath();
      ctx.arc(x - radius * 0.15, y - radius * 0.45, radius * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.fill();

      // Label text
      ctx.globalAlpha = opacity * 0.85;
      const fontSize = Math.max(10, b.size * 0.19);
      ctx.font = `bold ${fontSize}px "Noto Sans JP", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FD6C26";
      ctx.fillText(b.label, x, y + 1);

      ctx.restore();
      return true;
    };

    const drawParticles = () => {
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity
        p.life -= 0.025;
        if (p.life <= 0) return false;

        ctx.save();
        ctx.globalAlpha = p.life * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = "#FD6C26";
        ctx.fill();
        ctx.restore();
        return true;
      });
    };

    const animate = () => {
      const now = Date.now();
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // Spawn new bubbles periodically
      if (now - lastSpawn > spawnInterval && bubblesRef.current.length < 8) {
        spawnBubble();
        lastSpawn = now;
      }

      // Draw & update bubbles
      bubblesRef.current = bubblesRef.current.filter((b) => drawBubble(b, now));

      // Draw pop particles
      drawParticles();

      // Draw boy image
      if (boyImgRef.current) {
        const boyH = 150;
        const boyW = boyH * (boyImgRef.current.width / boyImgRef.current.height);
        const boyX = w - boyW - 5;
        const boyY = h - boyH;
        ctx.drawImage(boyImgRef.current, boyX, boyY, boyW, boyH);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    // Initial spawns
    spawnBubble();
    setTimeout(() => spawnBubble(), 800);
    setTimeout(() => spawnBubble(), 1600);
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawnBubble]);

  // Hide on mobile using display:none to avoid unmounting and losing animation state
  return (
    <div
      className={`fixed right-0 bottom-12 z-30 transition-opacity duration-300 ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ width: 220, height: "75vh", display: isMobile ? "none" : undefined }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full"
        style={{ width: "100%", height: "100%", cursor: "pointer" }}
      />
      {/* Toggle button */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsHidden(!isHidden); }}
        className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/80 border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-white transition-colors"
        title={isHidden ? "シャボン玉を表示" : "シャボン玉を非表示"}
      >
        {isHidden ? "○" : "×"}
      </button>
    </div>
  );
}
