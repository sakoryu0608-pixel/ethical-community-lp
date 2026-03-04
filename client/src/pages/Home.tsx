/**
 * エシカルコミュニティLLP ランディングページ
 * Design System: Figma (onehr.jp) のオレンジ基調クリーンデザインをベース
 * - Primary: #FD6C26 (orange)
 * - Text: #333333, #666666
 * - Background: #FFFFFF, #FFF4EE, #F5F5F5
 * - Font: Noto Sans JP
 * - Border radius: pill buttons, 8-16px cards
 */

import { useEffect, useRef, useState } from "react";
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
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex items-center justify-between h-[72px]">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#FD6C26] rounded-lg flex items-center justify-center">
            <HeartHandshake className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold text-[#333]">エシカルコミュニティ</span>
            <span className="text-xs text-[#999] ml-1">LLP</span>
          </div>
        </div>
        <nav className="hidden lg:flex items-center gap-8">
          <a href="#problem" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">課題</a>
          <a href="#solution" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">LLPスキーム</a>
          <a href="#cost" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">コストメリット</a>
          <a href="#strengths" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">強み</a>
          <a href="#vision" className="text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium">ビジョン</a>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/contact?type=document"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#FD6C26] text-white text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors shadow-md shadow-[#FD6C26]/20"
          >
            <Download className="w-4 h-4" />
            資料ダウンロード
          </Link>
          <Link
            href="/contact?type=consultation"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#FD6C26] text-[#FD6C26] text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
          >
            <Phone className="w-4 h-4" />
            相談会に申し込む
          </Link>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// IMPACT MINI-SECTION: CINEMATIC TEXT-ONLY FIRST VIEW
// ============================================================
function ImpactSection() {
  const [phase, setPhase] = useState(0); // 0=waiting, 1=chars dropping, 2=flash, 3=shimmer
  const keywordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textParts = [
    { text: "「", isKeyword: true },
    { text: "自社で直接雇用しない", isKeyword: true },
    { text: "」", isKeyword: true },
    { text: "のに、", isKeyword: false },
    { text: "「", isKeyword: true },
    { text: "自社の戦力", isKeyword: true },
    { text: "」", isKeyword: true },
    { text: "が育っていく。", isKeyword: false },
  ];

  // Build flat char array with keyword flag
  const chars = textParts.flatMap(part =>
    part.text.split('').map(ch => ({ ch, isKeyword: part.isKeyword }))
  );

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
    <section className="relative pt-[72px] overflow-hidden bg-[#0d0d0d]" style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-[1px] pointer-events-none z-20"
        style={{
          top: '50%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(253,108,38,0.15) 20%, rgba(253,108,38,0.3) 50%, rgba(253,108,38,0.15) 80%, transparent 100%)',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 1.5s ease-out',
        }}
      />

      {/* Main text container */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-4" style={{ perspective: '1000px' }}>
        {/* Top decorative line */}
        <div
          className={`mb-10 h-[1px] bg-gradient-to-r from-transparent via-[#FD6C26] to-transparent ${phase >= 1 ? 'impact-line' : 'opacity-0'}`}
          style={{ width: '100px', animationDelay: '0.1s' }}
        />

        {/* The headline - forced single line, centered */}
        <h1
          className="whitespace-nowrap text-center w-full"
          style={{
            fontSize: 'clamp(1rem, 3.2vw, 3rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
          }}
        >
          {chars.map((c, i) => {
            const isKw = c.isKeyword;
            const refIdx = isKw ? keywordRefIdx++ : -1;
            return (
              <span
                key={i}
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
            );
          })}
        </h1>

        {/* Bottom decorative line */}
        <div
          className={`mt-10 h-[1px] bg-gradient-to-r from-transparent via-[#FD6C26] to-transparent ${phase >= 2 ? 'impact-line' : 'opacity-0'}`}
          style={{ width: '180px', animationDelay: '0.3s' }}
        />

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
// HERO / SECOND VIEW (Content section)
// ============================================================
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FFF4EE] rounded-full -translate-x-1/2 -translate-y-1/4 opacity-60" />
      <div className="absolute top-[120px] right-[10%] w-28 h-28 bg-[#FFF4EE] rounded-full opacity-50" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <AnimatedSection>
            <div className="space-y-6">
              <p className="text-lg lg:text-xl font-bold text-[#555] leading-relaxed">
                障害者雇用に前向きな企業が選ぶ、第3の選択肢。
              </p>
              <p className="text-sm lg:text-base text-[#666] leading-relaxed">
                プロフェッショナルによる「徹底分析」と障害のある人が、生成AIを武器に働ける社会へ。<br />
                業務分析と生成AI教育を組み合わせ、AIを活用できる人材を育成。<br />
                生産性向上と運用負荷軽減を同時に実現するLLP（有限責任事業組合）モデルです。
              </p>

              {/* Authority badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xl font-bold rounded-full border border-[#FD6C26]/20">
                  <CheckCircle2 className="w-5 h-5" />
                  法定雇用率算定可能
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xl font-bold rounded-full border border-[#FD6C26]/20">
                  <Shield className="w-5 h-5" />
                  経済産業省推進の法人格
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xl font-bold rounded-full border border-[#FD6C26]/20">
                  <Users className="w-5 h-5" />
                  就労支援のプロによる監修
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xl font-bold rounded-full border border-[#FD6C26]/20">
                  <Sparkles className="w-5 h-5" />
                  初期費用・紹介料0円
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/contact?type=document"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FD6C26] text-white text-base font-bold rounded-full hover:bg-[#e55e1a] transition-all shadow-lg shadow-[#FD6C26]/30 hover:shadow-xl hover:shadow-[#FD6C26]/40 hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  詳しい仕組みがわかる！サービス紹介資料ダウンロード（無料）
                </Link>
                <Link
                  href="/contact?type=consultation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#FD6C26] text-[#FD6C26] text-base font-bold rounded-full hover:bg-[#FFF4EE] transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  オンライン個別相談会に申し込む
                </Link>
              </div>
            </div>
          </AnimatedSection>

          {/* Right: Image */}
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-[#FD6C26]/10">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/hero-business-KCzVTP8GEQSdSLVKdNKo3p.webp"
                  alt="エシカルコミュニティLLP - プロフェッショナルチーム"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
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
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 lg:p-6 shadow-lg shadow-black/5 border border-white/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FD6C26] to-[#FF8F5C] flex items-center justify-center text-white shadow-md shadow-[#FD6C26]/20">
              {icon}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xl font-black text-[#FD6C26]/40">{num}</span>
              <span className="text-xl font-bold text-[#333]">{label}</span>
            </div>
            <p className="text-[14px] lg:text-[15px] text-[#555] leading-[1.8]">{text}</p>
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
      text: "求人広告や人材紹介会社を使っても、自社に合う人材に出会えず採用経費ばかりが崩む。",
    },
    {
      icon: <UserMinus className="w-6 h-6" />,
      num: "02",
      label: "早期離職",
      text: "せっかく採用しても、現場の理解やサポートが追いつかず早期離職してしまう。",
    },
    {
      icon: <ClipboardX className="w-6 h-6" />,
      num: "03",
      label: "管理体制不足",
      text: "現場に専任の障害者管理者を配置する余力（コスト・人員）がない。",
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      num: "04",
      label: "インフラ整備の壁",
      text: "オフィス環境の整備や通勤の配慮など、受け入れのインフラ（諸経費）がハードルになっている。",
    },
  ];

  return (
    <section id="problem" className="relative py-24 lg:py-32 overflow-hidden">
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

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 border border-white/25 mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 text-white animate-pulse" />
              <span className="text-sm font-bold text-white tracking-wider">PROBLEM</span>
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

        {/* Infographic image */}
        <AnimatedSection>
          <div className="max-w-[900px] mx-auto mb-12">
            <div className="bg-white rounded-3xl p-4 lg:p-6 shadow-2xl shadow-black/10">
              <img
                src="https://private-us-east-1.manuscdn.com/user_upload_by_module/session_file/310519663384608434/uBggcmdKEFrdssik.png?Expires=1804064504&Signature=cL160oCeMafnqBwDCVQByz~MtYiFABjRCbQ7VI8dvhlFhbRVv9gDDYGeISgQuZN54t~aY6mFGLGIBNeyxbe48x04qjHLE9NhmwWpLC0ED6A3ximjXQ4i-9gpdeyAJ8eMgZQ3JsNDLadvxK~JLu~LEy-AhV85qvdK2ww3vrXv5DG9tJTD4GpcdLXlqi0bWDYZXRQ6x0xyyBI4Wm7oUv1QS9BEl747SZacAPOke7D02uEf0LA7Ul-ek8OxW10USdxRmuNtYPcGPuRe8bohO5FR8rQTPNMsqews3I8GZNPxhXDTAnT0D~5IthbiLlehz34KtV0MsWumSzDBgnCBpcY8uA__&Key-Pair-Id=K2HSFNDJXOU9YS"
                alt="障害者雇用の4つの課題 - 早期離職・採用コスト増大・管理体制不足・インフラ整備の壁"
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Problem detail cards */}
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 max-w-[960px] mx-auto mb-14">
          {problems.map((p, i) => (
            <ProblemDetailCard key={i} icon={p.icon} num={p.num} label={p.label} text={p.text} index={i} />
          ))}
        </div>

        {/* Animated stats bar */}
        <div ref={statsRef} className="max-w-[960px] mx-auto mb-14">
          <div
            className="grid grid-cols-3 gap-3 lg:gap-5"
            style={{
              opacity: statsInView ? 1 : 0,
              transform: statsInView ? "translateY(0)" : "translateY(30px)",
              transition: "opacity 0.7s ease-out 0.3s, transform 0.7s ease-out 0.3s",
            }}
          >
            {[
              { value: 49, suffix: "%", label: "1年以内の離職率", sub: "（障害者雇用の平均）" },
              { value: 200, suffix: "万円〜", label: "年間の採用・管理コスト", sub: "（1名あたり推定）" },
              { value: 2.7, suffix: "%", label: "2026年 法定雇用率", sub: "（段階的引上げ）" },
            ].map((stat, i) => (
              <div
                key={i}
                className="relative text-center py-5 lg:py-7 px-3 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mb-1 drop-shadow-sm">
                  {typeof stat.value === "number" && Number.isInteger(stat.value)
                    ? <AnimatedCounter target={stat.value} suffix={stat.suffix} isInView={statsInView} />
                    : <>{stat.value}{stat.suffix}</>}
                </p>
                <p className="text-xs sm:text-sm font-bold text-white/90">{stat.label}</p>
                <p className="text-[10px] sm:text-xs text-white/60 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>

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
    <section id="solution" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">SOLUTION</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              自社で抱え込まない。
              <br className="hidden sm:block" />
              <span className="text-[#FD6C26]">「共同雇用」</span>という賢い選択で、
              <br className="hidden sm:block" />
              障害者雇用の常識を変える。
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection>
            <div className="space-y-6">
              <p className="text-[15px] text-[#555] leading-[1.9]">
                私たちは、人材派遣でも単なる雇用代行（A型事業所への委託）でもありません。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                企業が共同で出資し合い、事業を運営する<strong className="text-[#333]">「LLP（有限責任事業組合）」</strong>の仕組みを活用。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                <strong className="text-[#333]">「自社で雇用しない（※組合での共同雇用）」</strong>にも関わらず、出資比率に応じて<strong className="text-[#FD6C26]">自社の雇用率算定が可能</strong>です。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                これにより、自社単独で雇用する際のリスクとコストを大幅に最適化します。
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/problem-infographic-v2-avJSvoPQCXEpipYB9VdrMG.webp"
                alt="障害者雇用の4つの課題 - 採用コスト増大・早期離職・管理体制不足・インフラ整備の壁"
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
    <section id="cost" className="bg-[#FFF4EE] py-20 lg:py-28">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-14">
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
            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_1fr] bg-[#F8F8F8] border-b border-[#E8E8E8]">
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

            {/* Table rows */}
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
    <section id="strengths" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">STRENGTHS</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              障害者支援のプロフェッショナルが導く、
              <br className="hidden sm:block" />
              <span className="text-[#FD6C26]">「即戦力化」</span>へのロードマップ。
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-16">
          {strengths.map((s, i) => (
            <AnimatedSection key={i} delay={i * 0.15}>
              <div className={`grid lg:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={`space-y-5 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-[#FD6C26]/15">{s.num}</span>
                    <div className="w-12 h-12 rounded-xl bg-[#FD6C26] flex items-center justify-center text-white">
                      {s.icon}
                    </div>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-[#333] leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[15px] text-[#555] leading-[1.9]">{s.desc}</p>
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
    <section id="vision" ref={sectionRef} className="relative py-24 lg:py-36 overflow-hidden">
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

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 relative z-10">
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
            <span className="text-sm font-bold text-[#FD6C26] tracking-[0.15em]">VISION</span>
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
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-xl overflow-hidden shadow-2xl shadow-[#FD6C26]/10">
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
                    <span style={{color: '#fd6c26'}}>私たちは専門性をもって個性を分析し、<br />
                    生成AIという新しい力を掛け合わせることで、<br />
                    "支援される側"から"選ばれる戦力"へと転換させます。</span>
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
                    ともにその一歩を踏み出してくださる企業様をお待ちしています。
                  </p>

                  {/* Closing quote */}
                  <div className="text-right text-[4rem] font-serif text-[#FD6C26]/10 leading-none select-none -mt-4 -mr-1">&rdquo;</div>
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
// SECTION 7: CTA / CLOSING
// ============================================================
function CTASection() {
  return (
    <section id="cta" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
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
          <div className="bg-gradient-to-br from-[#FD6C26] to-[#E55A10] rounded-2xl p-8 lg:p-12 shadow-xl shadow-[#FD6C26]/20">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
              <Link
                href="/contact?type=document"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#FD6C26] text-lg font-bold rounded-full hover:bg-[#FFF4EE] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full lg:w-auto"
              >
                <Download className="w-5 h-5" />
                3分でわかる！サービス紹介資料ダウンロード（無料）
              </Link>
              <Link
                href="/contact?type=consultation"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5 w-full lg:w-auto"
              >
                <Phone className="w-5 h-5" />
                専門コンサルタントによる オンライン個別相談会（無料）
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
      <div className="max-w-[1440px] mx-auto px-4 py-3 flex items-center justify-center gap-3 flex-wrap">
        <Link
          href="/contact?type=document"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD6C26] text-white text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors shadow-md shadow-[#FD6C26]/20"
        >
          <Download className="w-4 h-4" />
          詳しい仕組みがわかる！資料ダウンロード（無料）
        </Link>
        <Link
          href="/contact?type=consultation"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FD6C26] text-[#FD6C26] text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
        >
          <Phone className="w-4 h-4" />
          オンライン個別相談会に申し込む
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
    <footer className="bg-[#333] text-white py-12 pb-24">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#FD6C26] rounded-lg flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold">エシカルコミュニティLLP</span>
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
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
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
        <CTASection />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
