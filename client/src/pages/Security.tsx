/**
 * 情報セキュリティ方針ページ
 * Design: オレンジ基調、クリーンデザイン
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { HeartHandshake, ArrowLeft, ShieldCheck } from "lucide-react";

export default function Security() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#FD6C26] rounded-lg flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-[#333]">エシカルコミュニティ <span className="text-xs text-[#999] font-normal">LLP</span></span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#FD6C26] transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            ホームへ戻る
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#FD6C26] to-[#E55A10] py-14 lg:py-18 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">情報セキュリティ方針</h1>
          <p className="text-white/70 text-sm mt-2">Information Security Policy</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#F0EDED] p-8 lg:p-12">

            <p className="text-[15px] text-[#444] leading-[2] mb-8">
              当組合は、独自のテクノロジーを用いた遠隔管理およびAI教育を行う組織として、情報の安全性を最優先課題とし、以下の方針を遵守します。
            </p>

            <SecuritySection number="1" title="情報資産の保護">
              <p className="text-[15px] text-[#444] leading-[2]">
                バーチャルオフィス「OASIS」および特性分析システム「co-mii」で取り扱うすべての情報資産を保護対象とし、適切なアクセス権限管理を行います。
              </p>
            </SecuritySection>

            <SecuritySection number="2" title="リモートワーク環境のセキュリティ">
              <p className="text-[15px] text-[#444] leading-[2]">
                在宅勤務スタッフに対し、エンドポイントセキュリティの導入、通信の暗号化（VPN等）、および定期的な情報セキュリティ教育を義務付け、遠隔地からの安全な接続を担保します。
              </p>
            </SecuritySection>

            <SecuritySection number="3" title="事故対応体制の整備">
              <p className="text-[15px] text-[#444] leading-[2]">
                万が一、情報漏洩等のセキュリティ事故が発生した場合には、直ちに緊急対策チームを設置し、被害の最小化と再発防止策を迅速に講じます。
              </p>
            </SecuritySection>

            <SecuritySection number="4" title="法令・規範の遵守" last>
              <p className="text-[15px] text-[#444] leading-[2]">
                個人情報保護法、LLP法、および関連するガイドラインを遵守し、定期的な内部監査を実施することで、セキュリティ水準の維持・向上に努めます。
              </p>
            </SecuritySection>

          </div>

          {/* Back link */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[#FD6C26] hover:underline font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              トップページに戻る
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#333] text-white py-8">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-6 mb-4 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-white/80 transition-colors">
              プライバシーポリシー
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-white/80 font-medium">情報セキュリティ方針</span>
          </div>
          <p className="text-xs text-white/40">&copy; 2025 エシカルコミュニティLLP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function SecuritySection({
  number,
  title,
  children,
  last,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={`${last ? "" : "mb-8 pb-8 border-b border-[#F0EDED]"}`}>
      <div className="flex items-start gap-3 mb-4">
        <span className="inline-flex items-center justify-center w-8 h-8 bg-[#FD6C26]/10 text-[#FD6C26] text-sm font-bold rounded-lg flex-shrink-0">
          {number}
        </span>
        <h2 className="text-lg font-bold text-[#333] pt-0.5">{title}</h2>
      </div>
      {children}
    </div>
  );
}
