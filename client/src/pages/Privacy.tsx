/**
 * プライバシーポリシー（個人情報保護方針）ページ
 * Design: オレンジ基調、クリーンデザイン
 */

import { useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";

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
          <h1 className="text-2xl lg:text-3xl font-black text-white">個人情報保護方針</h1>
          <p className="text-white/70 text-sm mt-2">プライバシーポリシー</p>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-[780px] mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-sm border border-[#F0EDED] p-8 lg:p-12">

            <p className="text-[15px] text-[#444] leading-[2] mb-8">
              当社は、お客様からお預かりする個人情報の重要性を認識し、その適切な保護・管理を社会的責務と考えています。以下の方針に基づき、個人情報の取り扱いに万全を期してまいります。
            </p>

            <PolicySection number="第1条" title="個人情報の定義">
              <p className="text-[15px] text-[#444] leading-[2]">
                本方針において「個人情報」とは、個人情報の保護に関する法律（以下「個人情報保護法」）に定める個人情報を指し、生存する個人に関する情報であって、氏名、生年月日、住所、電話番号、メールアドレスその他の記述等により特定の個人を識別できるものをいいます。
              </p>
            </PolicySection>

            <PolicySection number="第2条" title="個人情報の取得">
              <p className="text-[15px] text-[#444] leading-[2] mb-3">
                当社は、個人情報を取得する際、利用目的を明示したうえで、適法かつ公正な手段により取得いたします。当社が取得する個人情報は、主に以下の場面で発生します。
              </p>
              <ul className="space-y-2 ml-1">
                <PolicyListItem>ウェブサイトのお問い合わせフォームからのご連絡</PolicyListItem>
                <PolicyListItem>メールまたはお電話によるお問い合わせ</PolicyListItem>
                <PolicyListItem>お取引に伴う契約書・発注書等の書面</PolicyListItem>
                <PolicyListItem>名刺交換等のビジネス上のやり取り</PolicyListItem>
              </ul>
            </PolicySection>

            <PolicySection number="第3条" title="利用目的">
              <p className="text-[15px] text-[#444] leading-[2] mb-3">
                当社は、取得した個人情報を以下の目的の範囲内で利用いたします。
              </p>
              <ol className="space-y-2 ml-1 list-none">
                <PolicyListItem>お問い合わせへの回答およびご連絡</PolicyListItem>
                <PolicyListItem>サービスの提供、契約の履行および関連するご連絡</PolicyListItem>
                <PolicyListItem>サービスの改善および新サービスの検討</PolicyListItem>
                <PolicyListItem>当社からのお知らせ・ご案内の送付（ご同意いただいた場合）</PolicyListItem>
                <PolicyListItem>その他、上記利用目的に付随する業務</PolicyListItem>
              </ol>
            </PolicySection>

            <PolicySection number="第4条" title="第三者提供の制限">
              <p className="text-[15px] text-[#444] leading-[2] mb-3">
                当社は、以下の場合を除き、ご本人の同意なく個人情報を第三者に提供いたしません。
              </p>
              <ol className="space-y-2 ml-1 list-none">
                <PolicyListItem>法令に基づく場合</PolicyListItem>
                <PolicyListItem>人の生命、身体または財産の保護のために必要であり、ご本人の同意を得ることが困難な場合</PolicyListItem>
                <PolicyListItem>公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合</PolicyListItem>
                <PolicyListItem>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</PolicyListItem>
              </ol>
            </PolicySection>

            <PolicySection number="第5条" title="業務委託先への提供">
              <p className="text-[15px] text-[#444] leading-[2]">
                当社は、利用目的の達成に必要な範囲で、個人情報の取り扱いを外部に委託する場合があります。その際は、委託先に対して個人情報の適切な管理を義務付け、必要かつ適切な監督を行います。
              </p>
            </PolicySection>

            <PolicySection number="第6条" title="安全管理措置">
              <p className="text-[15px] text-[#444] leading-[2] mb-3">
                当社は、取り扱う個人情報の漏えい、滅失またはき損の防止のため、以下の安全管理措置を講じます。
              </p>
              <ul className="space-y-2 ml-1">
                <PolicyListItem>個人情報へのアクセス制限およびアクセス権限の管理</PolicyListItem>
                <PolicyListItem>個人情報を取り扱う機器・電子媒体等の盗難防止措置</PolicyListItem>
                <PolicyListItem>不正アクセスに対するセキュリティ対策の実施</PolicyListItem>
                <PolicyListItem>従業員に対する個人情報保護に関する教育・啓発</PolicyListItem>
              </ul>
            </PolicySection>

            <PolicySection number="第7条" title="開示・訂正・削除等の請求">
              <p className="text-[15px] text-[#444] leading-[2]">
                ご本人から個人情報の開示、訂正、追加、削除、利用停止等のご請求があった場合、ご本人であることを確認したうえで、合理的な期間および範囲で対応いたします。ご請求の際は、下記のお問い合わせ窓口までご連絡ください。
              </p>
            </PolicySection>

            <PolicySection number="第8条" title="Cookieの利用について">
              <p className="text-[15px] text-[#444] leading-[2]">
                当社ウェブサイトでは、サービスの利便性向上やアクセス状況の分析のため、Cookieおよび類似の技術を使用する場合があります。Cookieの使用により個人を特定する情報を取得することはありませんが、ブラウザの設定によりCookieの受け取りを拒否することも可能です。
              </p>
            </PolicySection>

            <PolicySection number="第9条" title="本方針の変更">
              <p className="text-[15px] text-[#444] leading-[2]">
                当社は、法令の改正や社会情勢の変化等に応じて、本方針を見直し・改定することがあります。変更後の方針は、当社ウェブサイトに掲載した時点から効力を生じるものとします。
              </p>
            </PolicySection>

            <PolicySection number="第10条" title="お問い合わせ窓口" last>
              <p className="text-[15px] text-[#444] leading-[2] mb-4">
                個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <div className="bg-[#F8F8F8] rounded-xl p-6 border border-[#ECECEC]">
                <table className="w-full text-[14px] text-[#444]">
                  <tbody>
                    <tr className="border-b border-[#E8E8E8]">
                      <td className="py-2.5 pr-4 font-bold text-[#333] whitespace-nowrap w-32">会社名</td>
                      <td className="py-2.5">株式会社サミットラン</td>
                    </tr>
                    <tr className="border-b border-[#E8E8E8]">
                      <td className="py-2.5 pr-4 font-bold text-[#333] whitespace-nowrap">所在地</td>
                      <td className="py-2.5">〒813-0035 福岡市東区松崎3-33-36</td>
                    </tr>
                    <tr className="border-b border-[#E8E8E8]">
                      <td className="py-2.5 pr-4 font-bold text-[#333] whitespace-nowrap">担当部署</td>
                      <td className="py-2.5">個人情報保護管理担当</td>
                    </tr>
                    <tr className="border-b border-[#E8E8E8]">
                      <td className="py-2.5 pr-4 font-bold text-[#333] whitespace-nowrap">メール</td>
                      <td className="py-2.5">info@summitrun.co.jp</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-bold text-[#333] whitespace-nowrap">電話番号</td>
                      <td className="py-2.5">0985-64-8252</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </PolicySection>

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
            <span className="text-white/80 font-medium">個人情報保護方針</span>
            <span className="text-white/20">|</span>
            <Link href="/security" className="text-white/50 hover:text-white/80 transition-colors">
              情報セキュリティ基本方針
            </Link>
          </div>
          <p className="text-xs text-white/40">&copy; 2026 株式会社サミットラン. All rights reserved.</p>
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
        <span className="inline-flex items-center justify-center px-3 h-8 bg-[#FD6C26]/10 text-[#FD6C26] text-sm font-bold rounded-lg flex-shrink-0 whitespace-nowrap">
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
