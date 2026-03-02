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
import { CheckCircle2, ChevronDown, Download, Users, ArrowRight, Shield, Brain, HeartHandshake, Sparkles, Building2, Phone } from "lucide-react";

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
          <a
            href="#cta"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#FD6C26] text-white text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors shadow-md shadow-[#FD6C26]/20"
          >
            <Download className="w-4 h-4" />
            資料ダウンロード
          </a>
          <a
            href="#cta"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#FD6C26] text-[#FD6C26] text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
          >
            <Phone className="w-4 h-4" />
            相談会に申し込む
          </a>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// HERO / FIRST VIEW
// ============================================================
function HeroSection() {
  return (
    <section className="relative pt-[72px] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[72px] left-0 w-[500px] h-[500px] bg-[#FFF4EE] rounded-full -translate-x-1/2 -translate-y-1/4 opacity-60" />
      <div className="absolute top-[200px] right-[10%] w-28 h-28 bg-[#FFF4EE] rounded-full opacity-50" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <AnimatedSection>
            <div className="space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black leading-tight text-[#333] tracking-tight">
                <span className="text-[#FD6C26]">「自社で直接雇用しない」</span>のに、
                <br />
                <span className="text-[#FD6C26]">「自社の戦力」</span>が育っていく。
              </h1>
              <p className="text-lg lg:text-xl font-bold text-[#555] leading-relaxed">
                障害者雇用に前向きな企業が選ぶ、第3の選択肢。
              </p>
              <p className="text-sm lg:text-base text-[#666] leading-relaxed">
                プロフェッショナルによる「徹底分析」と「AI育成」で、圧倒的なコスト低減と運用負荷低減を実現するLLP（有限責任事業組合）スキーム。
              </p>

              {/* Authority badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xs font-bold rounded-full border border-[#FD6C26]/20">
                  <Shield className="w-3.5 h-3.5" />
                  経済産業省推進の法人格
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xs font-bold rounded-full border border-[#FD6C26]/20">
                  <Users className="w-3.5 h-3.5" />
                  就労支援のプロによる監修
                </span>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FFF4EE] text-[#FD6C26] text-xs font-bold rounded-full border border-[#FD6C26]/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  初期費用・紹介料0円
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FD6C26] text-white text-base font-bold rounded-full hover:bg-[#e55e1a] transition-all shadow-lg shadow-[#FD6C26]/30 hover:shadow-xl hover:shadow-[#FD6C26]/40 hover:-translate-y-0.5"
                >
                  <Download className="w-5 h-5" />
                  詳しい仕組みがわかる！サービス紹介資料ダウンロード（無料）
                </a>
                <a
                  href="#cta"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-[#FD6C26] text-[#FD6C26] text-base font-bold rounded-full hover:bg-[#FFF4EE] transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5" />
                  オンライン個別相談会に申し込む
                </a>
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
              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-[#F0F0F0]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#FD6C26] rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#999] font-medium">法定雇用率</p>
                    <p className="text-lg font-black text-[#333]">算定可能</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// SECTION 2: PROBLEM / PAIN POINTS
// ============================================================
function ProblemSection() {
  const problems = [
    "せっかく採用しても、現場の理解やサポートが追いつかず早期離職してしまう。",
    "求人広告や人材紹介会社を使っても、自社に合う人材に出会えず採用経費ばかりが嵩む。",
    "現場に専任の障害者管理者を配置する余力（コスト・人員）がない。",
    "オフィス環境の整備や通勤の配慮など、受け入れのインフラ（諸経費）がハードルになっている。",
  ];

  return (
    <section id="problem" className="bg-[#F8F8F8] py-20 lg:py-28">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-[#FD6C26] tracking-wider mb-3">PROBLEM</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-[#333] leading-snug">
              障害者雇用に前向きに取り組む企業ほど、
              <br className="hidden sm:block" />
              こんな<span className="text-[#FD6C26]">「壁」</span>にぶつかっていませんか？
            </h2>
          </div>
        </AnimatedSection>

        <div className="space-y-4 max-w-[800px] mx-auto">
          {problems.map((text, i) => (
            <AnimatedSection key={i} delay={i * 0.1}>
              <div className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm border border-[#EFEFEF] hover:shadow-md transition-shadow">
                <div className="w-7 h-7 rounded-full bg-[#FD6C26]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FD6C26]" />
                </div>
                <p className="text-[15px] text-[#444] leading-relaxed font-medium">{text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4}>
          <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-sm border border-[#EFEFEF] max-w-[800px] mx-auto">
            <p className="text-base lg:text-lg text-[#555] leading-relaxed">
              法定雇用率は達成したい。でも「とりあえずの採用」や「ただの作業」ではなく、
              <br className="hidden lg:block" />
              将来的に<strong className="text-[#333]">自社の戦力として活躍してほしい。</strong>
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-12 h-[2px] bg-[#FD6C26]" />
              <p className="text-[#FD6C26] font-bold text-base">
                その想い、エシカルコミュニティが実現します。
              </p>
              <div className="w-12 h-[2px] bg-[#FD6C26]" />
            </div>
          </div>
        </AnimatedSection>
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
                <strong className="text-[#333]">「自社で雇用しない（※組合での共同雇用）」</strong>にも関わらず、出資比率に応じて<strong className="text-[#FD6C26]">自社の障害者雇用率として算定が可能</strong>です。
              </p>
              <p className="text-[15px] text-[#555] leading-[1.9]">
                これにより、自社単独で雇用する際のリスクとコストを大幅に最適化します。
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/llp-concept-Ub7hTP7c2oDdNGmfKj8kRH.webp"
                alt="LLP（有限責任事業組合）の仕組み"
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
              <div className="p-4 lg:p-5 text-center border-l border-[#E8E8E8]">
                <span className="text-sm font-bold text-[#666]">自社雇用</span>
              </div>
              <div className="p-4 lg:p-5 text-center border-l border-[#E8E8E8] bg-[#FD6C26]/5">
                <span className="text-sm font-bold text-[#FD6C26]">エシカルコミュニティ</span>
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
                <div className="p-4 lg:p-5 border-l border-[#F0F0F0] flex items-center">
                  <span className="text-sm text-[#888] leading-relaxed">{item.self}</span>
                </div>
                <div className="p-4 lg:p-5 border-l border-[#F0F0F0] bg-[#FD6C26]/5 flex items-center">
                  <span className="text-sm font-bold text-[#FD6C26] leading-relaxed">{item.ethical}</span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-[15px] text-[#555] leading-[1.9] max-w-[800px] mx-auto">
              採用から定着支援までを組合内で完結させるため、御社の<strong className="text-[#333]">「運用負荷低減」</strong>と、オフィス・賃金・通勤等の<strong className="text-[#333]">「雇用経費の大幅な軽減」</strong>を同時に実現します。
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
      title: "各障害者スタッフの「徹底分析」と最適なマッチング",
      desc: "就労支援の現場を知り尽くしたプロフェッショナルが、経験と専用ツールで一人ひとりの特性・強み・課題を多角的なアセスメントで徹底的に分析。専門的な見地に基づく的確な合理的配慮とマネジメントにより、高い定着率を実現します。",
      icon: <Brain className="w-7 h-7" />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/support-team-UX2tQzq4mDkZ7V86C8bjJv.webp",
    },
    {
      num: "02",
      title: "定着支援・採用・育成の「運用負荷低減」",
      desc: "「どう接すればいいか分からない」という現場の悩みを解消。日々のメンタルケアから業務指導まで、障害特性への理解度が極めて高い専門スタッフが伴走するため、御社の人事・現場の負担は最小限に抑えられます。",
      icon: <HeartHandshake className="w-7 h-7" />,
      image: null,
    },
    {
      num: "03",
      title: "AIを駆使するスタッフの「将来の戦力への期待」",
      desc: "私たちのビジョンは、単なる業務の切り出しではありません。上級者レベルの生成AIスキル（ChatGPT等）を習得できる独自の育成カリキュラムを提供。単純作業から「創造的業務（即戦力）」へとスタッフを育て上げ、最終的には組合員企業への「就職（転籍）」をゴールとしています。",
      icon: <Sparkles className="w-7 h-7" />,
      image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/ai-training-4a3jfYduMD7PchFZ5KqxKL.webp",
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
                {s.image ? (
                  <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                      <img src={s.image} alt={s.title} className="w-full h-auto" />
                    </div>
                  </div>
                ) : (
                  <div className={`${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div className="bg-[#FFF4EE] rounded-2xl p-10 flex flex-col items-center justify-center min-h-[280px]">
                      <div className="w-20 h-20 rounded-full bg-[#FD6C26]/10 flex items-center justify-center mb-4">
                        <HeartHandshake className="w-10 h-10 text-[#FD6C26]" />
                      </div>
                      <p className="text-center text-[#FD6C26] font-bold text-lg">専門スタッフが伴走</p>
                      <p className="text-center text-[#999] text-sm mt-2">御社の人事・現場の負担を最小限に</p>
                    </div>
                  </div>
                )}
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
  return (
    <section id="vision" className="relative py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663384608434/YwT9YaGpotKVs9ejRKfzEn/vision-future-TTqXF5X2ujnQtiwG8E3sm4.webp)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FD6C26]/90 to-[#FD6C26]/75" />

      <div className="max-w-[1100px] mx-auto px-6 lg:px-10 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-white/80 tracking-wider mb-3">VISION</p>
            <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-black text-white leading-snug">
              障害者雇用を、「法的義務」から
              <br className="hidden sm:block" />
              「企業の成長エンジン」へ。
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-[800px] mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 lg:p-10 border border-white/20">
            <p className="text-white text-[15px] lg:text-base leading-[2] font-medium">
              障害を持つ方々の可能性は、環境と正しい理解、そしてテクノロジー（AI）があれば大きく広がります。私たちは「プロとしての専門性」を持って個性を徹底分析し、彼らが御社にとって欠かせない「戦力」となる未来を創ります。このエシカル（倫理的）なコミュニティに賛同いただける企業様との出会いを心待ちにしています。
            </p>
          </div>
        </AnimatedSection>
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
              御社の課題に合わせた、
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
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-[#FD6C26] text-lg font-bold rounded-full hover:bg-[#FFF4EE] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full lg:w-auto"
              >
                <Download className="w-5 h-5" />
                3分でわかる！サービス紹介資料ダウンロード（無料）
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white/10 transition-all hover:-translate-y-0.5 w-full lg:w-auto"
              >
                <Phone className="w-5 h-5" />
                専門コンサルタントによる オンライン個別相談会（無料）
              </a>
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
        <a
          href="#cta"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FD6C26] text-white text-sm font-bold rounded-full hover:bg-[#e55e1a] transition-colors shadow-md shadow-[#FD6C26]/20"
        >
          <Download className="w-4 h-4" />
          詳しい仕組みがわかる！資料ダウンロード（無料）
        </a>
        <a
          href="#cta"
          className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#FD6C26] text-[#FD6C26] text-sm font-bold rounded-full hover:bg-[#FFF4EE] transition-colors"
        >
          <Phone className="w-4 h-4" />
          オンライン個別相談会に申し込む
        </a>
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
                <li><a href="#cta" className="text-sm text-white/50 hover:text-white/80 transition-colors">資料ダウンロード</a></li>
                <li><a href="#cta" className="text-sm text-white/50 hover:text-white/80 transition-colors">オンライン相談会</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-center">
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
