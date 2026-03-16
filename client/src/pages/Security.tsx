/**
 * 情報セキュリティ基本方針ページ
 * Design: オレンジ基調、クリーンデザイン
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, ShieldCheck } from "lucide-react";

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
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white">情報セキュリティ基本方針</h1>
          <p className="text-white/70 text-sm mt-2">Information Security Policy</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#F0EDED] p-8 lg:p-12">

            {/* 基本理念 */}
            <div className="mb-8 pb-8 border-b border-[#F0EDED]">
              <h2 className="text-lg font-bold text-[#333] mb-4">基本理念</h2>
              <p className="text-[15px] text-[#444] leading-[2]">
                当社は、IT・Web関連サービスを提供する企業として、お客様および当社が保有する情報資産を各種脅威から保護することが、事業活動の基盤であると認識しています。すべての役員および従業員が情報セキュリティの重要性を理解し、以下の方針に基づいて情報資産の適切な保護に取り組みます。
              </p>
            </div>

            <SecuritySection number="1" title="適用範囲">
              <p className="text-[15px] text-[#444] leading-[2]">
                本方針は、当社のすべての役員、従業員（正社員、契約社員、パート・アルバイトを含む）および業務委託先に適用します。また、当社が業務上取り扱うすべての情報資産（電子データ、紙媒体、口頭での情報を含む）を対象とします。
              </p>
            </SecuritySection>

            <SecuritySection number="2" title="情報資産の保護対象">
              <p className="text-[15px] text-[#444] leading-[2] mb-3">
                当社が保護すべき主な情報資産は以下のとおりです。
              </p>
              <ul className="space-y-2 ml-1">
                <SecurityListItem>お客様からお預かりした情報（個人情報、業務データ、ソースコード等）</SecurityListItem>
                <SecurityListItem>当社の業務に関する情報（契約情報、経営情報、技術情報等）</SecurityListItem>
                <SecurityListItem>情報システムおよびネットワーク設備</SecurityListItem>
                <SecurityListItem>従業員に関する情報（人事情報、給与情報等）</SecurityListItem>
              </ul>
            </SecuritySection>

            <SecuritySection number="3" title="情報セキュリティの基本原則">
              <p className="text-[15px] text-[#444] leading-[2] mb-4">
                当社は、情報資産について以下の3つの要素を確保します。
              </p>
              <div className="space-y-4">
                <div className="bg-[#FD6C26]/5 rounded-xl p-5 border border-[#FD6C26]/10">
                  <h3 className="text-[15px] font-bold text-[#333] mb-2">（1）機密性（Confidentiality）</h3>
                  <p className="text-[14px] text-[#444] leading-[1.9]">許可された者のみが情報にアクセスできるよう、適切なアクセス制御を行います。</p>
                </div>
                <div className="bg-[#FD6C26]/5 rounded-xl p-5 border border-[#FD6C26]/10">
                  <h3 className="text-[15px] font-bold text-[#333] mb-2">（2）完全性（Integrity）</h3>
                  <p className="text-[14px] text-[#444] leading-[1.9]">情報および処理方法が正確かつ完全であることを保護します。</p>
                </div>
                <div className="bg-[#FD6C26]/5 rounded-xl p-5 border border-[#FD6C26]/10">
                  <h3 className="text-[15px] font-bold text-[#333] mb-2">（3）可用性（Availability）</h3>
                  <p className="text-[14px] text-[#444] leading-[1.9]">許可された利用者が、必要なときに情報および関連する資産にアクセスできることを確保します。</p>
                </div>
              </div>
            </SecuritySection>

            <SecuritySection number="4" title="具体的な取り組み">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[15px] font-bold text-[#333] mb-3">4-1. アクセス管理</h3>
                  <ul className="space-y-2 ml-1">
                    <SecurityListItem>業務上必要な範囲に限定した情報へのアクセス権限の付与</SecurityListItem>
                    <SecurityListItem>パスワードの適切な管理（推測されにくいパスワードの設定、定期的な変更推奨）</SecurityListItem>
                    <SecurityListItem>退職者・異動者のアクセス権限の速やかな見直し</SecurityListItem>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#333] mb-3">4-2. 技術的対策</h3>
                  <ul className="space-y-2 ml-1">
                    <SecurityListItem>ウイルス対策ソフトの導入および定義ファイルの最新化</SecurityListItem>
                    <SecurityListItem>OSおよびソフトウェアの適時アップデート</SecurityListItem>
                    <SecurityListItem>ファイアウォール等によるネットワークセキュリティの確保</SecurityListItem>
                    <SecurityListItem>重要データの定期的なバックアップの実施</SecurityListItem>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#333] mb-3">4-3. 物理的対策</h3>
                  <ul className="space-y-2 ml-1">
                    <SecurityListItem>オフィスへの入退室管理</SecurityListItem>
                    <SecurityListItem>重要書類の施錠管理</SecurityListItem>
                    <SecurityListItem>PC・記録媒体の持ち出し管理</SecurityListItem>
                  </ul>
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-[#333] mb-3">4-4. 人的対策</h3>
                  <ul className="space-y-2 ml-1">
                    <SecurityListItem>全従業員への情報セキュリティ教育の実施</SecurityListItem>
                    <SecurityListItem>情報セキュリティに関するルールの周知徹底</SecurityListItem>
                    <SecurityListItem>業務委託先に対する必要な安全管理の確認</SecurityListItem>
                  </ul>
                </div>
              </div>
            </SecuritySection>

            <SecuritySection number="5" title="情報セキュリティインシデントへの対応">
              <p className="text-[15px] text-[#444] leading-[2]">
                万一、情報セキュリティに関する事故が発生した場合、またはその恐れがある場合は、速やかに責任者に報告し、被害の最小化および原因究明・再発防止に努めます。お客様の個人情報に影響が及ぶ場合は、関係法令に基づき、お客様および関係機関への通知・報告を行います。
              </p>
            </SecuritySection>

            <SecuritySection number="6" title="法令およびその他の規範の遵守">
              <p className="text-[15px] text-[#444] leading-[2]">
                当社は、情報セキュリティに関連する法令（個人情報保護法、不正アクセス禁止法等）、その他の規範およびお客様との契約上の義務を遵守します。
              </p>
            </SecuritySection>

            <SecuritySection number="7" title="継続的な見直しと改善" last>
              <p className="text-[15px] text-[#444] leading-[2]">
                当社は、社会環境や技術環境の変化、新たな脅威の出現等に応じて、本方針および関連する社内ルールを定期的に見直し、情報セキュリティの維持・向上に継続的に取り組みます。
              </p>
            </SecuritySection>

            {/* 制定日・署名 */}
            <div className="mt-10 pt-8 border-t border-[#F0EDED] text-right">
              <p className="text-[14px] text-[#666]">制定日：2026年3月16日</p>
              <p className="text-[14px] text-[#666] mt-1">株式会社サミットラン</p>
              <p className="text-[14px] text-[#666]">代表取締役 岩切 貴徳</p>
            </div>

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
              個人情報保護方針
            </Link>
            <span className="text-white/20">|</span>
            <span className="text-white/80 font-medium">情報セキュリティ基本方針</span>
          </div>
          <p className="text-xs text-white/40">&copy; 2026 株式会社サミットラン. All rights reserved.</p>
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

function SecurityListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-[#444] leading-[2]">
      <span className="w-1.5 h-1.5 bg-[#FD6C26] rounded-full mt-[10px] flex-shrink-0" />
      {children}
    </li>
  );
}
