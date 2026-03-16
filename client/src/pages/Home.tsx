/**
 * エシカルコミュニティLLP ランディングページ
 * Design System: Figma (onehr.jp) のオレンジ基調クリーンデザインをベース
 * - Primary: #FD6C26 (orange)
 * - Text: #333333, #666666
 * - Background: #FFFFFF, #FFF4EE, #F5F5F5
 * - Font: Noto Sans JP
 * - Border radius: pill buttons, 8-16px cards
 */

import React, { useEffect, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, Download, Users, ArrowRight, Shield, Brain, HeartHandshake, Sparkles, Building2, Phone, TrendingUp, UserMinus, ClipboardX, Wrench, Menu, X } from "lucide-react";
import { Link } from "wouter";

// Intersection Observer hook for scroll animations
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, isInView };
}

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, isInView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on nav click
  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between h-[64px] lg:h-[72px]">
        <div className="flex items-center">
          <img src="/ethical-community-lp/logo.png" alt="エシカルコミュニティLLP ロゴ" className="w-[72px] h-[72px] lg:w-20 lg:h-20 object-contain" />
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#problem" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">課題</a>
          <a href="#solution" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">LLPスキーム</a>
          <a href="#cost" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">コストメリット</a>
          <a href="#strengths" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">強み</a>
          <a href="#vision" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">ビジョン</a>
        </nav>
        <div className="flex items-center gap-2 lg:gap-3">
          <Link
            href="/contact?type=document"
            className="hidden sm:inline-flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 bg-[#FD6C26] text-white text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors shadow-md shadow-[#FD6C26]/20"
          >
            <Download className="w-4 h-4" />
            資料ダウンロード
          </Link>
          <Link
            href="/contact?type=consultation"
            className="hidden md:inline-flex items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 border-2 border-[#FD6C26] text-[#FD6C26] text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
          >
            <Phone className="w-4 h-4" />
            相談会に申し込む
          </Link>
          {/* Hamburger button - mobile only */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-[#FFF4EE] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="メニューを開く"
          >
            {menuOpen ? <X className="w-5 h-5 text-[#333]" /> : <Menu className="w-5 h-5 text-[#333]" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-[#F0F0F0] ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 py-4 space-y-1">
          {[
            { href: "#problem", label: "課題" },
            { href: "#solution", label: "LLPスキーム" },
            { href: "#cost", label: "コストメリット" },
            { href: "#strengths", label: "強み" },
            { href: "#vision", label: "ビジョン" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={closeMenu}
              className="block px-4 py-3 text-base font-medium text-[#333] hover:text-[#FD6C26] hover:bg-[#FFF4EE] rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 space-y-2">
            <Link
              href="/contact?type=document"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#FD6C26] text-white text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors"
            >
              <Download className="w-4 h-4" />
              資料ダウンロード（無料）
            </Link>
            <Link
              href="/contact?type=consultation"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 border-2 border-[#FD6C26] text-[#FD6C26] text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
            >
              <Phone className="w-4 h-4" />
              オンライン相談会に申し込む
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

// ============================================================
// NEON FRAME: Pure CSS animated neon border with light trail
// ============================================================
function NeonFrame({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      className="neon-frame-outer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.95)',
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
      }}
    >
      {/* Rotating gradient border */}
      <div className="neon-frame-border" />
      {/* Inner content area */}
      <div className="neon-frame-inner">
        {children}
      </div>
      {/* Corner accents */}
      <div className="neon-corner-dot" style={{ top: -4, left: -4 }} />
      <div className="neon-corner-dot" style={{ top: -4, right: -4, animationDelay: '0.5s' }} />
      <div className="neon-corner-dot" style={{ bottom: -4, right: -4, animationDelay: '1s' }} />
      <div className="neon-corner-dot" style={{ bottom: -4, left: -4, animationDelay: '1.5s' }} />
    </div>
  );
}

// ============================================================
// IMPACT MINI-SECTION: CINEMATIC TEXT-ONLY FIRST VIEW
// ============================================================
function ImpactSection() {
  const [phase, setPhase] = useState(0); // 0=waiting, 1=chars dropping, 2=flash, 3=shimmer
  const keywordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Line 1: 「自社で直接雇用しない」のに、
  // Line 2: 「自社の戦力」が育っていく。
  // breakAfter=true inserts a mobile-only line break after this part
  const textParts = [
    { text: "共同雇用", isKeyword: true, line: 1 },
    { text: "なのに、", isKeyword: false, line: 1, breakAfter: true },
    { text: "自社の戦力", isKeyword: true, line: 2 },
    { text: "が育つ。", isKeyword: false, line: 2 },
  ];

  // Build flat char array with keyword flag + breakAfter index tracking
  const chars: { ch: string; isKeyword: boolean; breakAfter?: boolean }[] = [];
  textParts.forEach(part => {
    const partChars = part.text.split('').map((ch, ci) => ({
      ch,
      isKeyword: part.isKeyword,
      breakAfter: part.breakAfter && ci === part.text.length - 1,
    }));
    chars.push(...partChars);
  });

  // Track keyword char indices for glow animation
  const keywordIndices = chars.reduce<number[]>((acc, c, i) => {
    if (c.isKeyword) acc.push(i);
    return acc;
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const totalCharTime = chars.length * 50 + 600;
    const t2 = setTimeout(() => setPhase(2), 300 + totalCharTime);
    const t3 = setTimeout(() => setPhase(3), 300 + totalCharTime + 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Auto-scroll to HeroSection 5 seconds after mount
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 5000);
    return () => clearTimeout(scrollTimer);
  }, []);

  // JS-driven glow pulse animation for keywords (avoids CSS animation conflict)
  useEffect(() => {
    if (phase < 3) return;
    let frame: number;
    const animate = () => {
      const t = Date.now() / 1000;
      keywordRefs.current.forEach((el) => {
        if (!el) return;
        const pulse = Math.sin(t * 1.5) * 0.5 + 0.5; // 0-1 oscillation
        const glow = 10 + pulse * 30;
        const glow2 = 5 + pulse * 20;
        el.style.textShadow = `0 0 ${glow}px rgba(253,108,38,${0.3 + pulse * 0.4}), 0 0 ${glow2}px rgba(253,108,38,${0.1 + pulse * 0.2})`;
        // Subtle color shift
        const r = 253;
        const g = Math.round(108 + pulse * 46);
        const b = Math.round(38 + pulse * 30);
        el.style.color = `rgb(${r},${g},${b})`;
        (el.style as any).webkitTextFillColor = `rgb(${r},${g},${b})`;
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  let keywordRefIdx = 0;

  return (
    <section className="relative pt-[64px] lg:pt-[72px] overflow-hidden bg-[#0d0d0d]" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/* Radial gradient spotlight */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(253,108,38,0.06) 0%, transparent 70%)',
      }} />

      {/* Ambient orbs */}
      <div className="impact-orb" />
      <div className="impact-orb" />
      <div className="impact-orb" />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(253,108,38,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(253,108,38,0.02) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />


      {/* Main text container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4 sm:px-8" style={{ perspective: '1000px', maxWidth: '95vw', margin: '0 auto' }}>

        {/* Neon frame wrapper with Canvas animated border */}
        <NeonFrame visible={phase >= 2}>

          {/* The headline
               - PC (md+): font scales down via clamp, single line or natural wrap
               - Mobile (<md): forced break after 「のに、」 at punctuation
          */}
          <h1
            className="text-center w-full relative z-10 impact-headline"
            style={{
              lineHeight: 1.6,
              letterSpacing: '0.02em',
            }}
          >
            {chars.map((c, i) => {
              const isKw = c.isKeyword;
              const refIdx = isKw ? keywordRefIdx++ : -1;
              return (
                <React.Fragment key={i}>
                  <span
                    ref={isKw ? (el) => { keywordRefs.current[refIdx] = el; } : undefined}
                    className={`impact-char ${isKw ? 'impact-keyword' : ''} ${phase >= 2 && isKw ? 'impact-keyword-flash' : ''}`}
                    style={{
                      animationDelay: phase >= 1 ? `${i * 0.05}s` : '999s',
                      color: isKw ? '#FD6C26' : 'rgba(255,255,255,0.85)',
                      fontWeight: isKw ? 900 : 600,
                    }}
                  >
                    {c.ch}
                  </span>
                  {c.breakAfter && <br key={`br-${i}`} className="impact-mobile-br" />}
                </React.Fragment>
              );
            })}
          </h1>
        </NeonFrame>


        {/* Subtitle fade in */}
        <p
          className="mt-8 text-xs tracking-[0.35em] uppercase"
          style={{
            color: 'rgba(253,108,38,0.5)',
            opacity: phase >= 3 ? 1 : 0,
            transform: phase >= 3 ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 1s ease-out, transform 1s ease-out',
          }}
        >
          Ethical Community LLP
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{
          opacity: phase >= 3 ? 1 : 0,
          transition: 'opacity 1s ease-out 0.5s',
        }}
      >
        <span className="text-[9px] font-semibold tracking-[0.5em] uppercase text-white/25">Scroll</span>
        <div className="impact-scroll-arrow">
          <ChevronDown className="w-4 h-4 text-[#FD6C26]/50" />
        </div>
      </div>
    </section>
  );
}

// ============================================================
// HERO / SECOND VIEW (Content section) - Re-build to force label change to ビジョン
// ============================================================
function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[#FAFAF8]">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #FD6C26 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      {/* Soft warm glow top-right */}
      <div className="absolute top-0 right-0 w-[700px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(ellipse, #FFF0E6 0%, transparent 70%)', transform: 'translate(20%, -20%)' }} />
      {/* Soft warm glow bottom-left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(ellipse, #FFE8D6 0%, transparent 70%)', transform: 'translate(-20%, 20%)' }} />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-24 lg:py-32 relative z-10">

        {/* Section label */}
        <AnimatedSection>
          <div className="flex items-center gap-3 mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] text-[#FD6C26]">ビジョン</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(253,108,38,0.4) 0%, transparent 100%)' }} />
          </div>
        </AnimatedSection>

        {/* Main heading — large, bold, centered */}
        <AnimatedSection delay={0.1}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.2rem] font-black text-[#1A1A1A] leading-[1.25] mb-12 lg:mb-16 text-center">
            AIと専門性で障害者雇用を<br />
            <span className="text-[#FD6C26]">「戦力」</span>に変える新しい仕組みを、<br className="hidden sm:block" />
            エシカルコミュニティが実現
          </h2>
        </AnimatedSection>

        {/* Divider line */}
        <AnimatedSection delay={0.15}>
          <div className="flex items-center gap-4 mb-12 lg:mb-16">
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(253,108,38,0.35))' }} />
            <div className="w-2 h-2 rounded-full bg-[#FD6C26]" />
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(253,108,38,0.35), transparent)' }} />
          </div>
        </AnimatedSection>

        {/* Lead paragraphs — stacked, generous line height */}
        <AnimatedSection delay={0.2}>
          <div className="max-w-[820px] mx-auto space-y-6 mb-14 lg:mb-18">
            <p className="text-base sm:text-lg lg:text-xl text-[#444] leading-[2] text-center">
              エシカルコミュニティは、<br />
              障害のある方が<span className="text-[#1A1A1A] font-bold">生成AIを武器に</span>企業の業務に貢献する、
              新しい働き方のコミュニティです。
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-[#444] leading-[2] text-center">
              業務を運営するプロフェッショナル、AIを活用できる人材、
              そして障害者雇用に前向きな企業。
              これらを<span className="text-[#FD6C26] font-bold">LLP（有限責任事業組合）モデル</span>でスマートに統合します。
            </p>
            <p className="text-base sm:text-lg lg:text-xl text-[#444] leading-[2] text-center">
              プロの監修による的確な業務分析と、AIを駆使する人材育成を掛け合わせることで、
              企業の運用負荷を抑えながら
              <span className="text-[#1A1A1A] font-bold">生産性向上と法定雇用率の達成</span>を両立します。
            </p>
          </div>
        </AnimatedSection>

        {/* Closing statement — large accent quote */}
        <AnimatedSection delay={0.3}>
          <div className="max-w-[820px] mx-auto mb-14 lg:mb-16">
            <div className="relative px-6 sm:px-10 py-8 sm:py-10 rounded-2xl border border-[#FD6C26]/20" style={{ background: 'linear-gradient(135deg, #FFF4EE 0%, #FFF8F4 100%)' }}>
              {/* Quote mark */}
              <span className="absolute top-4 left-6 text-5xl font-black leading-none select-none text-[#FD6C26]/25">&ldquo;</span>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#1A1A1A] leading-[1.8] text-center pt-4">
                私たちは、障害者雇用を<br className="hidden sm:block" />
                <span className="text-[#FD6C26]">「義務」</span>ではなく
                <span className="text-[#FD6C26]">価値を生み出す仕組み</span>に変えていきます。
              </p>
              <span className="absolute bottom-4 right-6 text-5xl font-black leading-none select-none text-[#FD6C26]/25">&rdquo;</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Authority badges */}
        <AnimatedSection delay={0.4}>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FFF4EE] text-[#FD6C26] text-sm sm:text-base font-bold rounded-full border border-[#FD6C26]/20">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
              法定雇用率算定可能
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FFF4EE] text-[#FD6C26] text-sm sm:text-base font-bold rounded-full border border-[#FD6C26]/20">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
              厚生労働省推進の組合
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FFF4EE] text-[#FD6C26] text-sm sm:text-base font-bold rounded-full border border-[#FD6C26]/20">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              就労支援のプロによる監修
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#FFF4EE] text-[#FD6C26] text-sm sm:text-base font-bold rounded-full border border-[#FD6C26]/20">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              紹介料0円
            </span>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}

// ============================================================
// SECTION 2: PROBLEM / PAIN POINTS (Orange theme with infographic)
// ============================================================
function AnimatedCounter({ target, suffix = "", isInView }: { target: number; suffix?: string; isInView: boolean }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <>{count}{suffix}</>;
}

function ProblemDetailCard({ icon, num, label, text, index }: { icon: React.ReactNode; num: string; label: string; text: string; index: number }) {
  const { ref, isInView } = useInView(0.2);
  return (
    <div
      ref={ref}
      className="group"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.5s ease-out ${index * 0.12}s, transform 0.5s ease-out ${index * 0.12}s`,
      }}
    >
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 lg:p-6 shadow-lg shadow-black/5 border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#FD6C26] to-[#FF8F5C] flex items-center justify-center text-white shadow-md shadow-[#FD6C26]/20">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg sm:text-xl font-black text-[#FD6C26]/40">{num}</span>
              <span className="text-base sm:text-xl font-bold text-[#333]">{label}</span>
            </div>
            <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#555] leading-[1.8]">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProblemSection() {
  const { ref: statsRef, isInView: statsInView } = useInView(0.3);
  const { ref: ctaRef, isInView: ctaInView } = useInView(0.3);

  const problems = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      num: "01",
      label: "採用コスト増大",
      text: "2026年の法定雇用率2.7%への引き上げを見据え採用活動が激化。求人広告や人材紹介を使っても自社に合う人材に出会えず、採用経費ばかりが嵩んでしまうケースが増える",
    },
    {
      icon: <UserMinus className="w-6 h-6" />,
      num: "02",
      label: "早期離職",
      text: "せっかく採用しても、現場の理解やサポートが追いつかず早期離職。障害者雇用の1年以内の離職率は49%にも上り、定着化が深刻な課題。",
    },
    {
      icon: <ClipboardX className="w-6 h-6" />,
      num: "03",
      label: "管理体制不足",
      text: "現場に専任の障害者管理者を配置する余力（人員・ノウハウ）がない。1名あたりの年間の採用・管理コストは推定200万円以上。自社だけで体制を維持するのは大きな負担。",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      num: "04",
      label: "インフラ整備の壁",
      text: "オフィス環境の整備や通勤の配慮など、受け入れのインフラ（諸経費）がハードルになっている。",
    },
  ];

  return (
    <section id="problem" className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      {/* Warm orange gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FD6C26] via-[#FF7E3F] to-[#FF9A5C]" />

      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />

      {/* Floating soft circles for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[5%] right-[10%] w-64 h-64 rounded-full bg-white/[0.06] blur-3xl animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full bg-white/[0.04] blur-3xl animate-[float_14s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-white animate-pulse" />
              <span className="text-sm font-bold text-white tracking-wider">経営課題</span>
            </div>
          </div>
          <h2 className="text-center text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-white leading-snug mb-4 drop-shadow-sm">
            障害者雇用に前向きに取り組む企業ほど、
            <br className="hidden sm:block" />
            こんな<span className="bg-white/20 px-2 py-0.5 rounded-lg">「壁」</span>にぶつかっていませんか？
          </h2>
                    <p className="text-center text-white/70 text-sm mb-10 max-w-[600px] mx-auto">
            多くの企業が直面する4つの構造的な課題
          </p>
        </AnimatedSection>

        {/* Problem detail cards */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5 max-w-[960px] mx-auto mb-8 sm:mb-14">
          {problems.map((p, i) => (
            <ProblemDetailCard key={i} icon={p.icon} num={p.num} label={p.label} text={p.text} index={i} />
          ))}
        </div>

        {/* Infographic image */}
        <AnimatedSection>
          <div className="max-w-[900px] mx-auto mb-12">
            <div className="bg-white rounded-3xl p-4 lg:p-6 shadow-2xl shadow-black/10">
              <img
                src="/ethical-community-lp/llp-scheme-infographic-v2.png"
                alt="法定雇用率算定の仕組み - LLP有限責任事業組合による共同雇用スキーム"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom CTA message */}
        <div
          ref={ctaRef}
          className="relative max-w-[800px] mx-auto"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.7s ease-out 0.5s, transform 0.7s ease-out 0.5s",
          }}
        >
          <div className="bg-white rounded-2xl p-8 lg:p-10 text-center shadow-xl shadow-black/10">
            <p className="text-base lg:text-lg text-[#555] leading-relaxed">
              法定雇用率は達成したい。でも「とりあえずの採用」や「ただの作業」ではなく、
              <br className="hidden lg:block" />
              将来的に<strong className="text-[#333]">自社の戦力として活躍してほしい。</strong>
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <div className="w-10 h-[2px] bg-gradient-to-r from-transparent to-[#FD6C26]" />
              <p className="text-[#FD6C26] font-bold text-base lg:text-lg">
                その想い、エシカルコミュニティが実現します。
              </p>
              <div className="w-10 h-[2px] bg-gradient-to-l from-transparent to-[#FD6C26]" />
            </div>

            {/* Animated down arrow */}
            <div className="mt-6 flex justify-center">
              <a href="#solution" className="group">
                <div className="w-10 h-10 rounded-full border-2 border-[#FD6C26]/40 flex items-center justify-center group-hover:bg-[#FD6C26]/10 transition-colors duration-300 animate-bounce">
                  <ChevronDown className="w-5 h-5 text-[#FD6C26]" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 3: SOLUTION - LLP FRAMEWORK
// ============================================================
function SolutionSection() {
  return (
    <section id="solution" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-14">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">解決策</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              自社で抱え込まない。
              <br className="hidden sm:block" />
              <span className="text-[#FD6C26]">「共同雇用」</span>という賢い選択で、
              <br className="hidden sm:block" />
              障害者雇用の常識を変える。
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <AnimatedSection>
            <div className="space-y-6">
              <p className="text-[15px] text-[#555] leading-[1.9]">
                私たちは、人材派遣でも単なる雇用代行（A型事業所への委託）でもありません。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                企業が共同で出資し合い、事業を運営する<strong className="text-[#333]">「LLP（有限責任事業組合）」</strong>の仕組みを活用。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                <strong className="text-[#333]">「共同雇用」</strong>にも関わらず、出資比率に応じて<strong className="text-[#FD6C26]">自社の雇用率算定が可能</strong>です。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                これにより、自社単独で雇用する際のリスクとコストを大幅に最適化します。
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
              <img
                src="/ethical-community-lp/solution-japanese-no-text.png"
                alt="共同雇用によるベネフィット：コスト削減、管理負担解消、雇用率達成"
                className="w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 4: COST COMPARISON
// ============================================================
function CostSection() {
  const comparisons = [
    {
      category: "採用コスト",
      self: "求人広告費や有料職業紹介料が高額発生",
      ethical: "不要（0円）",
    },
    {
      category: "管理コスト",
      self: "現場の専任管理者・指導員の増員が必須",
      ethical: "不要（プロが伴走・運用負荷低減）",
    },
    {
      category: "インフラ・諸経費",
      self: "オフィススペースの確保、通勤配慮、専用設備の準備",
      ethical: "不要（完全リモート・組合で環境を用意）",
    },
  ];

  return (
    <section id="cost" className="bg-[#FFF4EE] py-14 sm:py-20 lg:py-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-14">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">COST MERIT</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              一般的な「自社単独雇用」と比較して、
              <br className="hidden sm:block" />
              なぜ<span className="text-[#FD6C26]">圧倒的なコスト低減</span>が可能なのか？
            </h2>
          </div>
        </AnimatedSection>

        {/* Comparison Table */}
        <AnimatedSection delay={0.15}>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Desktop: 3-column table header */}
            <div className="hidden sm:grid grid-cols-[1fr_1fr_1fr] bg-[#F8F8F8] border-b border-[#E8E8E8]">
              <div className="p-4 lg:p-5 text-center">
                <span className="text-sm font-bold text-[#999]">項目</span>
              </div>
              <div className="p-4 lg:p-5 text-center border-l border-[#E8E8E8] bg-[#FD6C26]/5">
                <span className="text-sm font-bold text-[#FD6C26]">エシカルコミュニティ</span>
              </div>
              <div className="p-4 lg:p-5 text-center border-l border-[#E8E8E8]">
                <span className="text-sm font-bold text-[#666]">自社雇用</span>
              </div>
            </div>

            {/* Desktop: 3-column table rows */}
            <div className="hidden sm:block">
              {comparisons.map((item, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_1fr_1fr] ${
                    i < comparisons.length - 1 ? "border-b border-[#F0F0F0]" : ""
                  }`}
                >
                  <div className="p-4 lg:p-5 flex items-center justify-center">
                    <span className="text-sm font-bold text-[#333]">{item.category}</span>
                  </div>
                  <div className="p-4 lg:p-5 border-l border-[#F0F0F0] bg-[#FD6C26]/5 flex items-center">
                    <span className="text-sm font-bold text-[#FD6C26] leading-relaxed">{item.ethical}</span>
                  </div>
                  <div className="p-4 lg:p-5 border-l border-[#F0F0F0] flex items-center">
                    <span className="text-sm text-[#888] leading-relaxed">{item.self}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile: Card-style layout */}
            <div className="sm:hidden divide-y divide-[#F0F0F0]">
              {comparisons.map((item, i) => (
                <div key={i} className="p-4">
                  <p className="text-xs font-bold text-[#999] mb-2">{item.category}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#FD6C26]/5 rounded-xl p-3">
                      <p className="text-[10px] font-bold text-[#FD6C26] mb-1">エシカル</p>
                      <p className="text-xs font-bold text-[#FD6C26] leading-relaxed">{item.ethical}</p>
                    </div>
                    <div className="bg-[#F8F8F8] rounded-xl p-3">
                      <p className="text-[10px] font-bold text-[#999] mb-1">自社雇用</p>
                      <p className="text-xs text-[#888] leading-relaxed">{item.self}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="mt-10 rounded-2xl overflow-hidden shadow-lg bg-white max-w-[800px] mx-auto">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/infographic-cost-comparison-NCrFxZxy69do4x4NoTwLLF.webp"
              alt="自社雇用 vs エシカルコミュニティのコスト比較インフォグラフィック"
              className="w-full h-auto"
            />
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.4}>
          <div className="mt-8 text-center">
            <p className="text-[15px] text-[#555] leading-[1.9] max-w-[800px] mx-auto">
              採用から定着支援までを組合内で完結させるため、貴社の<strong className="text-[#333]">「運用負荷低減」</strong>と、オフィス・賃金・通勤等の<strong className="text-[#333]">「雇用経費の大幅な軽減」</strong>を同時に実現します。
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 5: STRENGTHS
// ============================================================
function StrengthsSection() {
  const strengths = [
    {
      num: "01",
      title: "障害者スタッフ一人ひとりの「徹底分析」と最適なマッチング",
      desc: "就労支援の現場を知り尽くしたプロフェッショナルが、経験と専用ツールで一人ひとりの特性・強み・課題を多角的なアセスメントで徹底的に分析。専門的な見地に基づく的確な合理的配慮とマネジメントにより、高い定着率を実現します。",
      icon: <Brain className="w-7 h-7" />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/support-team-UX2tQzq4mDkZ7V86C8bjJv.webp",
    },
    {
      num: "02",
      title: "定着支援・採用・育成の「運用負荷低減」",
      desc: "「どう接すればいいか分からない」という現場の悩みを解消。日々のメンタルケアから業務指導まで、障害特性への理解度が極めて高い専門スタッフが伴走するため、貴社の人事・現場の負担は最小限に抑えられます。",
      icon: <HeartHandshake className="w-7 h-7" />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/infographic-support-team-UoBB4D3JrnsnnfJy3BRAkH.webp",
    },
    {
      num: "03",
      title: "AIを駆使するスタッフの「将来の戦力への期待」",
      desc: "私たちのビジョンは、単なる業務の切り出しではありません。上級者レベルの生成AIスキル（ChatGPT等）を習得できる独自の育成カリキュラムを提供。単純作業から「創造的業務（即戦力）」へとスタッフを育て上げ、最終的には組合員企業への「就職（転籍）」をゴールとしています。",
      icon: <Sparkles className="w-7 h-7" />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/infographic-ai-training-PUXKTFUUXEtestpD2sytPy.webp",
    },
  ];

  return (
    <section id="strengths" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-14">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">STRENGTHS</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              障害者支援のプロフェッショナルが導く、
              <br className="hidden sm:block" />
              <span className="text-[#FD6C26]">「即戦力化」</span>へのロードマップ。
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-10 sm:space-y-16">
          {strengths.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`space-y-4 sm:space-y-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-[#FD6C26]/15">{s.num}</span>
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FD6C26] flex items-center justify-center text-white">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#333] leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] text-[#555] leading-[1.9]">{s.desc}</p>
                </div>
                <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
                    <img src={s.image} alt={s.title} className="w-full h-auto" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 6: VISION / CEO MESSAGE
// ============================================================
function VisionSection() {
  const { ref: sectionRef, isInView: sectionInView } = useInView(0.1);
  const { ref: photoRef, isInView: photoInView } = useInView(0.2);
  const { ref: nameRef, isInView: nameInView } = useInView(0.3);
  const { ref: quoteRef, isInView: quoteInView } = useInView(0.2);
  const { ref: lineRef, isInView: lineInView } = useInView(0.3);

  return (
    <section id="vision" ref={sectionRef} className="relative py-16 sm:py-24 lg:py-36 overflow-hidden">
      {/* Background image with semi-transparent overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out"
        style={{
          backgroundImage: `url(https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663384608434/dbWugSyHpWSKmKWW.png?Expires=1804064504&Signature=mebZiUO6g3CRHzl9rx8AYh2JIltHKKdJIm9zuHfYErw5U8IvnyszXMY0KN-H2-DcXkW~fAf9fXZnR7FIE08Egkg5s-2nbATdGmIJjDkkqzyQEDHlZM5b9AIIPEiq4fr0fF7jTdfnfGlRTm1Hs74uRtVU6QdmlbTtnyKjdLbFc3m8Av4oy9cew0es-ToueK1lC4q-Gh31hZFfCindoDPZYM2p-ekb-YppAmuC5yL8E1OYZXoWCzY9-PSYRXgBYJkM6S8kMxTJOTcKcIOWKhheDDrsYhC~SGUhi8y26XUtNrfDbA7fHf8sISbghV~93~vHIM1fsr0gscTl7aW00RNjmw__&Key-Pair-Id=K2HSFNDJXOU9YS)`,
          transform: sectionInView ? "scale(1.05)" : "scale(1)",
        }}
      />
      {/* Semi-transparent white overlay for readability */}
      <div className="absolute inset-0 bg-white/85" />
      {/* Subtle orange gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FD6C26]/[0.04] via-transparent to-[#FD6C26]/[0.06]" />

      {/* Decorative geometric elements */}
      <div className="absolute top-12 right-12 w-24 h-24 border-2 border-[#FD6C26]/10 rounded-lg rotate-12 hidden lg:block" />
      <div className="absolute bottom-16 left-16 w-16 h-16 border-2 border-[#FD6C26]/8 rounded-full hidden lg:block" />
      <div className="absolute top-1/3 left-8 w-1 h-20 bg-gradient-to-b from-[#FD6C26]/15 to-transparent hidden lg:block" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        {/* Section label */}
        <div
          className="text-center mb-10"
          style={{
            opacity: sectionInView ? 1 : 0,
            transform: sectionInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FD6C26]/8 border border-[#FD6C26]/15 mb-5">
            <Sparkles className="w-4 h-4 text-[#FD6C26]" />
            <span className="text-xs font-bold text-[#FD6C26] tracking-widest">ビジョン</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-[2.25rem] font-black text-[#333] leading-snug"
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? "translateY(0)" : "translateY(25px)",
              transition: "opacity 0.8s ease-out 0.15s, transform 0.8s ease-out 0.15s",
            }}
          >
            障害者雇用を、「法的義務」から
            <br className="hidden sm:block" />
            <span className="text-[#FD6C26]">「企業の成長エンジン」</span>へ。
          </h2>
        </div>

        {/* Main content: Photo + Message */}
        <div className="max-w-[960px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14">

            {/* CEO Photo - Square frame */}
            <div
              ref={photoRef}
              className="flex-shrink-0"
              style={{
                opacity: photoInView ? 1 : 0,
                transform: photoInView ? "translateX(0) scale(1)" : "translateX(-40px) scale(0.95)",
                transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <div className="relative group">
                {/* Decorative offset frame */}
                <div className="absolute -top-3 -left-3 w-full h-full border-2 border-[#FD6C26]/20 rounded-xl transition-all duration-700 group-hover:-top-4 group-hover:-left-4" />
                <div className="absolute -bottom-3 -right-3 w-full h-full bg-gradient-to-br from-[#FD6C26]/10 to-[#FF8F5C]/5 rounded-xl transition-all duration-700 group-hover:-bottom-4 group-hover:-right-4" />

                {/* Photo container - Square */}
                <div className="relative w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-2xl shadow-[#FD6C26]/10">
                  <img
                    src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663384608434/mGdRqzCpWUaaftfz.jpg?Expires=1804041501&Signature=s-X9oNjm1cG0UvXRGijtPXhhqwgIGugyQ0I-5gCdQA3CCJa3GCP1e8ezetv1GAO1-HOaxhbnggC43aS3IV6bt8R~JAC9a1Qsv3713mgzPtIKWvzvBDezlIGnY6hmOLeFa3HYSIMVSTBh0A0wTuWpSvkPulp3iC5sNf37WJCkNpnv-DFyJpPjvDuUvLyWMB6k0DcPFwBxiCVpQ7FG2JNLgAeellU5nsGkI69S5GgvqBmEgIdscrHAONrhvymy53ph8Q0P~5~3bjxXek36aDNb2iry-tILF~mmYlD52kz~tINbSm4AiBNktnUx9ghNbubkB4-o9JPUj56ripvTJApn8w__&Key-Pair-Id=K2HSFNDJXOU9YS"
                    alt="代表 石原 奈津子"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle gradient overlay at bottom for name readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </div>

              {/* Name and title below photo */}
              <div
                ref={nameRef}
                className="mt-6 text-center"
                style={{
                  opacity: nameInView ? 1 : 0,
                  transform: nameInView ? "translateY(0)" : "translateY(15px)",
                  transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
                }}
              >
                <p className="text-xs font-bold text-[#FD6C26] tracking-[0.2em] mb-1">代表</p>
                <p className="text-xl lg:text-2xl font-black text-[#333] tracking-wide">石原 奈津子</p>
                <div className="mt-2 w-10 h-[2px] bg-[#FD6C26] mx-auto" />
              </div>
            </div>

            {/* Message content */}
            <div className="flex-1 lg:pt-4">
              {/* Quote block */}
              <div
                ref={quoteRef}
                className="relative"
                style={{
                  opacity: quoteInView ? 1 : 0,
                  transform: quoteInView ? "translateX(0)" : "translateX(40px)",
                  transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.2s",
                }}
              >
                {/* Large decorative quote mark */}
                <div className="absolute -top-8 -left-2 lg:-left-6 text-[5rem] lg:text-[7rem] font-serif text-[#FD6C26]/10 leading-none select-none pointer-events-none">
                  &ldquo;
                </div>

                <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl p-7 lg:p-9 shadow-lg shadow-black/[0.04] border border-[#F0EDED]/80">
                  {/* Orange left accent bar */}
                  <div className="absolute top-7 left-0 w-1 h-16 bg-gradient-to-b from-[#FD6C26] to-[#FF8F5C] rounded-r-full" />

                  <p className="text-[15px] lg:text-base text-[#444] leading-[2.1] font-medium pl-4">
                    障害のある方が、AIを武器に社会で活躍する。<br />
                    それは理想ではなく、実現できる未来です。<br /><br />
                    必要なのは、特別扱いではなく、正しい環境設計と育成の仕組み。
                  </p>
                  <p
                    className="text-[15px] lg:text-base text-[#444] leading-[2.1] font-medium pl-4 mt-4"
                    style={{
                      opacity: quoteInView ? 1 : 0,
                      transform: quoteInView ? "translateY(0)" : "translateY(15px)",
                      transition: "opacity 0.7s ease-out 0.5s, transform 0.7s ease-out 0.5s",
                    }}
                  >
                    <span style={{color: '#fd6c26'}}>エシカルコミュニティは、企業が協働しながら<br />
                    障害者雇用とAI人材育成を実現する共同事業コミュニティです。</span><br /><br />
                    <span style={{color: '#fd6c26'}}>私たちは専門性をもって特性を分析し、生成AIという新しい力を掛け合わせることで、「支援される側」から「選ばれる戦力へ」と転換させます。</span>
                  </p>
                  <p
                    className="text-[15px] lg:text-base text-[#444] leading-[2.1] font-medium pl-4 mt-4"
                    style={{
                      opacity: quoteInView ? 1 : 0,
                      transform: quoteInView ? "translateY(0)" : "translateY(15px)",
                      transition: "opacity 0.7s ease-out 0.8s, transform 0.7s ease-out 0.8s",
                    }}
                  >
                    雇用のかたちを、次の時代へ。<br />
                    ともにその一歩を踏み出してくださる企業様との出会いを心よりお待ちしております。
                  </p>

                  {/* Closing quote */}
                  <div className="text-right text-[4rem] font-serif text-[#FD6C26]/10 leading-none select-none -mt-4 -mr-1">”</div>
                </div>
              </div>

              {/* Signature line */}
              <div
                ref={lineRef}
                className="mt-6 flex items-center gap-4 justify-center lg:justify-end"
                style={{
                  opacity: lineInView ? 1 : 0,
                  transform: lineInView ? "translateY(0)" : "translateY(15px)",
                  transition: "opacity 0.7s ease-out 0.5s, transform 0.7s ease-out 0.5s",
                }}
              >
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#FD6C26]/40" />
                <p className="text-sm text-[#888] font-medium">エシカルコミュニティLLP</p>
                <p className="text-sm font-bold text-[#333]"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 7: MANAGEMENT 組織概要・運営体制
// ============================================================
function ManagementSection() {
  const { ref: tableRef, isInView: tableInView } = useInView(0.1);
  const { ref: partnerRef, isInView: partnerInView } = useInView(0.1);

  const orgRows = [
    {
      label: "名称",
      content: "エシカルコミュニティ有限責任事業組合",
    },
    {
      label: "所在地",
      content: "〒813-0035 福岡市東区松崎3-33-36",
    },
    {
      label: "設立",
      content: "2026年2月25日",
    },
    {
      label: "事業内容",
      content: (
        <ul className="space-y-1">
          <li>・LLPスキームによる障害者共同雇用事業の運営</li>
          <li>・障害者に対する生成AIスキル等の教育訓練</li>
          <li>・特性分析システムを用いた定着支援</li>
          <li>・バーチャルオフィス「OASIS」による遠隔労務管理サポート</li>
        </ul>
      ),
    },
    {
      label: "組合員構成",
      content: "《運営会社》株式会社サミットランほか、参画組合員会社",
    },
    {
      label: "監修・パートナー",
      content: (
        <ul className="space-y-1">
          <li>法務監修：[弁護士事務所名]</li>
          <li>労務監修：[社会保険労務士事務所名]</li>
          <li>戦略的パートナー：株式会社サミットラン、株式会社エクステンシブル</li>
          <li>エンドースメント団体：公益財団法人日本ダウン症協会</li>
        </ul>
      ),
    },
  ];

  const partners = [
    { name: "Partner Logo A" },
    { name: "Partner Logo B" },
    { name: "Partner Logo C" },
    { name: "Partner Logo D" },
  ];

  return (
    <section id="management" className="py-14 sm:py-20 lg:py-28 bg-[#FFF4EE] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FD6C26]/5 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FD6C26]/5 rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">

        {/* Section header */}
        <AnimatedSection>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-sm font-bold text-[#FD6C26] tracking-widest mb-3">MANAGEMENT</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              組織概要・運営体制
            </h2>
            <div className="mt-4 w-12 h-[3px] bg-[#FD6C26] mx-auto rounded-full" />
          </div>
        </AnimatedSection>

        {/* Organization table */}
        <div
          ref={tableRef}
          className="mb-16 sm:mb-20"
          style={{
            opacity: tableInView ? 1 : 0,
            transform: tableInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out, transform 0.7s ease-out',
          }}
        >
          <div className="border border-[#FD6C26]/20 rounded-2xl overflow-hidden bg-white shadow-sm shadow-[#FD6C26]/10">
            {orgRows.map((row, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row ${
                  i % 2 === 0 ? 'bg-[#FFF4EE]/60' : 'bg-white'
                } border-b border-[#FD6C26]/10 last:border-b-0`}
                style={{
                  opacity: tableInView ? 1 : 0,
                  transform: tableInView ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 0.5s ease-out ${0.1 + i * 0.07}s, transform 0.5s ease-out ${0.1 + i * 0.07}s`,
                }}
              >
                {/* Label */}
                <div className="w-full sm:w-[200px] lg:w-[240px] flex-shrink-0 px-5 sm:px-8 py-4 sm:py-5 flex items-start">
                  <span className="text-sm sm:text-base font-bold text-[#FD6C26]">{row.label}</span>
                </div>
                {/* Divider */}
                <div className="hidden sm:block w-px bg-[#FD6C26]/15 my-3" />
                {/* Content */}
                <div className="flex-1 px-5 sm:px-8 py-4 sm:py-5">
                  <div className="text-sm sm:text-[15px] text-[#555] leading-relaxed">
                    {row.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner logos */}
        <div
          ref={partnerRef}
          style={{
            opacity: partnerInView ? 1 : 0,
            transform: partnerInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease-out 0.2s, transform 0.7s ease-out 0.2s',
          }}
        >
          <div className="text-center mb-8 sm:mb-10">
            <h3 className="text-xl sm:text-2xl font-black text-[#333]">
              パートナー・参画会社
            </h3>
            <div className="mt-3 w-10 h-[3px] bg-[#FD6C26] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {partners.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-[#FD6C26]/20 rounded-xl p-6 sm:p-8 flex items-center justify-center hover:bg-[#FFF4EE] hover:border-[#FD6C26]/50 transition-all duration-300 group shadow-sm"
                style={{
                  opacity: partnerInView ? 1 : 0,
                  transform: partnerInView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease-out ${0.3 + i * 0.08}s, transform 0.5s ease-out ${0.3 + i * 0.08}s`,
                }}
              >
                <span className="text-xs sm:text-sm text-[#BBB] group-hover:text-[#FD6C26]/60 transition-colors font-medium text-center">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ============================================================
// SECTION 8: CTA / CLOSING
// ============================================================
function CTASection() {
  return (
    <section id="cta" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">CONTACT</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              貴社の課題に合わせた、
              <br className="hidden sm:block" />
              最適な雇用プランとコスト削減をご提案します。
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="max-w-[800px] mx-auto mb-10">
            <div className="space-y-3">
              <p className="text-[15px] text-[#555] leading-[1.9] flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-[#FD6C26] mt-1 flex-shrink-0" />
                「LLPの仕組み（適法性や算定方法）についてもっと詳しく知りたい」
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9] flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-[#FD6C26] mt-1 flex-shrink-0" />
                「自社で独自雇用した場合と、どれくらいコストに差が出るのか比較したい」
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9] flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-[#FD6C26] mt-1 flex-shrink-0" />
                「どんなAIスキルを獲得した人材が育成がされるのか知りたい」
              </p>
            </div>
            <p className="mt-6 text-[15px] text-[#555] leading-[1.9]">
              少しでもご興味をお持ちの人事・経営層の方は、ぜひ無料の紹介資料をご覧いただくか、オンライン相談会をご利用ください。
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="bg-gradient-to-br from-[#FD6C26] to-[#E55A10] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl shadow-[#FD6C26]/20">
            <div className="flex flex-col gap-4 items-center justify-center">
              <Link
                href="/contact?type=document"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-white text-[#FD6C26] text-base sm:text-lg font-bold rounded-full hover:bg-[#FFF4EE] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full"
              >
                <Download className="w-5 h-5 flex-shrink-0" />
                <span>3分でわかる！サービス紹介資料ダウンロード（無料）</span>
              </Link>
              <Link
                href="/contact?type=consultation"
                className="inline-flex items-center justify-center gap-3 px-6 sm:px-10 py-4 sm:py-5 bg-transparent border-2 border-white text-white text-base sm:text-lg font-bold rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5 w-full"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>専門コンサルタントによる オンライン個別相談会（無料）</span>
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ============================================================
// FLOATING CTA
// ============================================================
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[#E8E8E8] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-3 py-2 sm:py-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3">
        <Link
          href="/contact?type=document"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FD6C26] text-white text-xs sm:text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors shadow-md shadow-[#FD6C26]/20"
        >
          <Download className="w-4 h-4 flex-shrink-0" />
          <span>詳しい仕組みがわかる！資料ダウンロード（無料）</span>
        </Link>
        <Link
          href="/contact?type=consultation"
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-[#FD6C26] text-[#FD6C26] text-xs sm:text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
        >
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span>オンライン個別相談会に申し込む</span>
        </Link>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="bg-[#333] text-white py-10 sm:py-12 pb-28 sm:pb-24">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/ethical-community-lp/logo.png" alt="エシカルコミュニティLLP ロゴ" className="w-16 h-16 object-contain" />
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-[400px]">
              障害者雇用に前向きな企業が選ぶ、第3の選択肢。<br />
              LLP（有限責任事業組合）スキームで、<br />
              圧倒的なコスト低減と運用負荷低減を実現。
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-sm font-bold mb-3 text-white/80">サービス</h4>
              <ul className="space-y-2">
                <li><a href="#solution" className="text-sm text-white/50 hover:text-white/80 transition-colors">LLPスキーム</a></li>
                <li><a href="#cost" className="text-sm text-white/50 hover:text-white/80 transition-colors">コストメリット</a></li>
                <li><a href="#strengths" className="text-sm text-white/50 hover:text-white/80 transition-colors">強み</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-white/80">お問い合わせ</h4>
              <ul className="space-y-2">
                <li><Link href="/contact?type=document" className="text-sm text-white/50 hover:text-white/80 transition-colors">資料ダウンロード</Link></li>
                <li><Link href="/contact?type=consultation" className="text-sm text-white/50 hover:text-white/80 transition-colors">オンライン相談会</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold mb-3 text-white/80">ポリシー</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-sm text-white/50 hover:text-white/80 transition-colors">プライバシーポリシー</Link></li>
                <li><Link href="/security" className="text-sm text-white/50 hover:text-white/80 transition-colors">情報セキュリティ方針</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-6 text-xs">
            <Link href="/privacy" className="text-white/40 hover:text-white/60 transition-colors">プライバシーポリシー</Link>
            <Link href="/security" className="text-white/40 hover:text-white/60 transition-colors">情報セキュリティ方針</Link>
          </div>
          <p className="text-xs text-white/40">&copy; 2025 エシカルコミュニティLLP. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN PAGE
// ============================================================
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <ImpactSection />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CostSection />
        <StrengthsSection />
        <VisionSection />
        <ManagementSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
