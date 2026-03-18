import React, { useEffect, useRef, useState, useCallback } from "react";
import bubbleBoyImg from "../assets/images/bubble-boy.png";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  sectionId: string;
  label: string;
  wobbleOffset: number;
  wobbleSpeed: number;
  riseSpeed: number;
  opacity: number;
  born: number;
}

const SECTIONS = [
  { id: "problem", label: "課題" },
  { id: "solution", label: "LLPスキーム" },
  { id: "cost", label: "コストメリット" },
  { id: "strengths", label: "強み" },
  { id: "vision", label: "ビジョン" },
];

export default function BubbleNavigation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<Bubble[]>([]);
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

  // Spawn a bubble
  const spawnBubble = useCallback(() => {
    const section = SECTIONS[Math.floor(Math.random() * SECTIONS.length)];
    const size = 40 + Math.random() * 35; // 40-75px
    const bubble: Bubble = {
      id: nextIdRef.current++,
      x: 0, // will be set relative to canvas
      y: 0, // will be set relative to canvas
      size,
      sectionId: section.id,
      label: section.label,
      wobbleOffset: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.5 + Math.random() * 1.0,
      riseSpeed: 0.4 + Math.random() * 0.4,
      opacity: 0,
      born: Date.now(),
    };
    bubblesRef.current.push(bubble);
  }, []);

  // Handle click on bubble
  const handleCanvasClick = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const dpr = window.devicePixelRatio || 1;

    for (let i = bubblesRef.current.length - 1; i >= 0; i--) {
      const b = bubblesRef.current[i];
      const dx = mx * dpr - b.x;
      const dy = my * dpr - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < b.size * dpr * 0.5) {
        // Pop animation - remove bubble
        bubblesRef.current.splice(i, 1);
        // Scroll to section
        const el = document.getElementById(b.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }
    }
  }, []);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastSpawn = Date.now();
    const spawnInterval = 2500; // new bubble every 2.5s

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const drawBubble = (b: Bubble, now: number) => {
      const elapsed = (now - b.born) / 1000;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // Fade in
      b.opacity = Math.min(1, elapsed * 2);

      // Rise
      const boyTopY = h - 160; // approximate top of boy's mouth area
      const startY = boyTopY - 30;
      b.y = startY - elapsed * b.riseSpeed * 50;

      // Wobble horizontally
      const baseX = w - 80;
      b.x = baseX + Math.sin(elapsed * b.wobbleSpeed + b.wobbleOffset) * 25;

      // Remove if off screen
      if (b.y < -b.size) return false;

      ctx.save();
      ctx.globalAlpha = b.opacity * 0.85;

      // Bubble body - gradient
      const gradient = ctx.createRadialGradient(
        b.x - b.size * 0.15, b.y - b.size * 0.15, b.size * 0.05,
        b.x, b.y, b.size * 0.5
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.6)");
      gradient.addColorStop(0.4, "rgba(253, 180, 140, 0.15)");
      gradient.addColorStop(0.7, "rgba(253, 108, 38, 0.08)");
      gradient.addColorStop(1, "rgba(253, 108, 38, 0.03)");

      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Bubble border
      ctx.strokeStyle = "rgba(253, 108, 38, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Highlight / shine
      ctx.beginPath();
      ctx.arc(b.x - b.size * 0.15, b.y - b.size * 0.15, b.size * 0.12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fill();

      // Label text
      ctx.globalAlpha = b.opacity * 0.75;
      const fontSize = Math.max(9, b.size * 0.18);
      ctx.font = `bold ${fontSize}px "Noto Sans JP", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#FD6C26";
      ctx.fillText(b.label, b.x, b.y);

      ctx.restore();
      return true;
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

    // Initial spawn
    spawnBubble();
    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [spawnBubble]);

  // Hide on mobile or when toggled
  if (isMobile) return null;

  return (
    <div
      className={`fixed right-0 bottom-12 z-30 transition-opacity duration-300 ${isHidden ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ width: 200, height: "70vh" }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full cursor-pointer"
        style={{ width: "100%", height: "100%" }}
      />
      {/* Toggle button */}
      <button
        onClick={() => setIsHidden(!isHidden)}
        className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/80 border border-gray-200 text-gray-400 text-xs flex items-center justify-center hover:bg-white transition-colors"
        title={isHidden ? "シャボン玉を表示" : "シャボン玉を非表示"}
      >
        {isHidden ? "○" : "×"}
      </button>
    </div>
  );
}
