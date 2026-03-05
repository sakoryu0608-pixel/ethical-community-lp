/**
 * プライバシーポリシー（個人情報保護方針）ページ
 * Design: オレンジ基調、クリーンデザイン
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { HeartHandshake, ArrowLeft, Shield } from "lucide-react";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#E8E8E8] shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/ethical-community-lp/logo.png" alt="エシカルコミュニティLLP ロゴ" className="w-16 h-16 object-contain" />
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
            <Shield className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">プライバシーポリシー</h1>
          <p className="text-white/70 text-sm mt-2">個人情報保護方針</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#F0EDED] p-8 lg:p-12">

            <p className="text-[15px] text-[#444] leading-[2] mb-8">
              エシカルコミュニティ有限責任事業組合（以下、「当組合」といいます。）は、当組合が提供する共同雇用支援サービス（以下、「本サービス」といいます。）において、スタッフおよび組合員企業の皆様からお預かりする個人情報の重要性を認識し、以下の通りプライバシーポリシーを定めます。
            </p>

            <PolicySection number="1" title="個人情報の取得と利用目的">
              <p className="text-[15px] text-[#444] leading-[2] mb-3">
                当組合は、以下の目的のために、氏名、連絡先、障害特性、診断内容、適正分析結果等の個人情報を取得・利用します。
              </p>
              <ul className="space-y-2 ml-1">
                <PolicyListItem>本サービスにおけるスタッフのマッチングおよび雇用管理</PolicyListItem>
                <PolicyListItem>特性分析システムを用いた定着支援および教育カリキュラムの提供</PolicyListItem>
                <PolicyListItem>組合員企業への算定雇用率計上および報告業務</PolicyListItem>
                <PolicyListItem>お問い合わせへの対応および関連情報の提供</PolicyListItem>
              </ul>
            </PolicySection>

            <PolicySection number="2" title="共同利用について">
              <p className="text-[15px] text-[#444] leading-[2]">
                当組合は、LLPの性質上、参画する組合員企業との間で、雇用管理および定着支援に必要な範囲において個人情報を共同利用する場合があります。この場合、当組合が責任を持って管理を行います。
              </p>
            </PolicySection>

            <PolicySection number="3" title="第三者提供の制限">
              <p className="text-[15px] text-[#444] leading-[2]">
                当組合は、法令に基づく場合を除き、本人の同意を得ることなく個人情報を第三者に提供しません。
              </p>
            </PolicySection>

            <PolicySection number="4" title="安全管理措置">
              <p className="text-[15px] text-[#444] leading-[2]">
                当組合は、個人情報の漏洩、滅失、毀損を防止するため、物理的・技術的な安全管理措置（情報の暗号化、アクセス制限等）を講じます。
              </p>
            </PolicySection>

            <PolicySection number="5" title="センシティブ情報の取り扱い" last>
              <p className="text-[15px] text-[#444] leading-[2]">
                障害内容等のセンシティブ情報については、本人の同意に基づき、適切な就労支援および合理的配慮の提供目的に限定して取り扱います。
              </p>
            </PolicySection>

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
            <span className="text-white/80 font-medium">プライバシーポリシー</span>
            <span className="text-white/20">|</span>
            <Link href="/security" className="text-white/50 hover:text-white/80 transition-colors">
              情報セキュリティ方針
            </Link>
          </div>
          <p className="text-xs text-white/40">&copy; 2025 エシカルコミュニティLLP. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function PolicySection({
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

function PolicyListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-[#444] leading-[2]">
      <span className="w-1.5 h-1.5 bg-[#FD6C26] rounded-full mt-[10px] flex-shrink-0" />
      {children}
    </li>
  );
}
