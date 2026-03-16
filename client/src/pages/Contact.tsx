/**
 * お問い合わせフォームページ
 * Design: オレンジ基調、Noto Sans JP、クリーンデザイン
 * - ヒーローバナー（オレンジグラデーション）
 * - フォーム: お問い合わせの種類、会社名、名前、ふりがな、メール、電話、内容
 * - プライバシーポリシー同意チェック
 */

import { useState, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { HeartHandshake, Download, Phone, ArrowLeft, CheckCircle2, Lock, ChevronDown } from "lucide-react";
import { toast } from "sonner";

const PRIVACY_SUMMARY = `エシカルコミュニティ有限責任事業組合（以下、「当組合」といいます。）は、お客様からお預かりする個人情報の重要性を認識し、以下の通り取り扱います。

1. 利用目的
お問い合わせへの回答、資料の送付、サービスに関するご案内のために利用します。

2. 第三者提供
法令に基づく場合を除き、本人の同意なく第三者に提供しません。

3. 安全管理
個人情報の漏洩防止のため、適切な安全管理措置を講じます。`;

type InquiryType = "document" | "consultation" | "other";

export default function Contact() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const typeParam = params.get("type");

  const [inquiryType, setInquiryType] = useState<InquiryType>(
    typeParam === "consultation" ? "consultation" : typeParam === "other" ? "other" : "document"
  );
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [furigana, setFurigana] = useState("");
  const [position, setPosition] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!company.trim()) newErrors.company = "会社・団体名を入力してください";
    if (!name.trim()) newErrors.name = "担当者氏名を入力してください";
    if (!furigana.trim()) newErrors.furigana = "ふりがなを入力してください";
    if (!position.trim()) newErrors.position = "役職を入力してください";
    if (!email.trim()) newErrors.email = "メールアドレスを入力してください";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "正しいメールアドレスを入力してください";
    if (!phone.trim()) newErrors.phone = "お電話番号を入力してください";
    if (!agreed) newErrors.agreed = "個人情報保護方針に同意してください";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("入力内容をご確認ください");
      return;
    }
    setSubmitted(true);
    toast.success("お問い合わせを受け付けました");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <ContactHeader />
        <main className="flex-1 flex items-center justify-center px-4 py-20">
          <div className="max-w-[560px] w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-[#FD6C26]/10 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-[#FD6C26]" />
            </div>
            <h2 className="text-2xl font-black text-[#333] mb-4">
              お問い合わせありがとうございます
            </h2>
            <p className="text-[15px] text-[#666] leading-[1.9] mb-3">
              {inquiryType === "document"
                ? "サービス紹介資料のダウンロードリンクを、ご入力いただいたメールアドレスにお送りいたします。"
                : inquiryType === "consultation"
                ? "オンライン個別相談会の日程調整について、担当者よりご連絡いたします。"
                : "お問い合わせ内容を確認の上、担当者よりご連絡いたします。"}
            </p>
            <p className="text-sm text-[#999] mb-8">
              通常1〜2営業日以内にご連絡いたします。
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FD6C26] text-white font-bold rounded-full hover:bg-[#e55e1a] transition-all shadow-lg shadow-[#FD6C26]/20 hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              トップページに戻る
            </Link>
          </div>
        </main>
        <ContactFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <ContactHeader />

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-[#FD6C26] to-[#E55A10] py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
        </div>
        <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">
          <p className="text-white/80 text-sm font-bold tracking-[0.2em] mb-3">CONTACT</p>
          <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">お問い合わせ</h1>
          <p className="text-white/80 text-sm">
            皆様からのお問い合わせをお待ちしております。
          </p>
        </div>
      </div>

      {/* Form Section */}
      <main className="flex-1 py-12 lg:py-16">
        <div className="max-w-[680px] mx-auto px-6">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#F0EDED] p-8 lg:p-12">

            {/* お問い合わせの種類 */}
            <FormGroup label="お問い合わせの種類" required>
              <div className="space-y-3">
                <RadioOption
                  name="inquiryType"
                  value="document"
                  checked={inquiryType === "document"}
                  onChange={() => setInquiryType("document")}
                  label="サービス紹介資料ダウンロード"
                />
                <RadioOption
                  name="inquiryType"
                  value="consultation"
                  checked={inquiryType === "consultation"}
                  onChange={() => setInquiryType("consultation")}
                  label="無料コストシミュレーション・個別相談"
                />
                <RadioOption
                  name="inquiryType"
                  value="other"
                  checked={inquiryType === "other"}
                  onChange={() => setInquiryType("other")}
                  label="その他、一般的なお問い合わせ"
                />
              </div>
            </FormGroup>

            {/* 会社・団体名 */}
            <FormGroup label="会社・団体名" required error={errors.company}>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="例: エシカルコミュニティ株式会社"
                className={`w-full px-4 py-3 border rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white ${errors.company ? "border-red-400" : "border-[#DDD]"}`}
              />
            </FormGroup>

            {/* 担当者氏名 */}
            <FormGroup label="担当者氏名" required error={errors.name}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 山田 太郎"
                className={`w-full px-4 py-3 border rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white ${errors.name ? "border-red-400" : "border-[#DDD]"}`}
              />
            </FormGroup>

            {/* ふりがな */}
            <FormGroup label="ふりがな" required error={errors.furigana}>
              <input
                type="text"
                value={furigana}
                onChange={(e) => setFurigana(e.target.value)}
                placeholder="例: やまだ たろう"
                className={`w-full px-4 py-3 border rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white ${errors.furigana ? "border-red-400" : "border-[#DDD]"}`}
              />
            </FormGroup>

            {/* 役職 */}
            <FormGroup label="役職" required error={errors.position}>
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder="例: 代表取締役、人事部長など"
                className={`w-full px-4 py-3 border rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white ${errors.position ? "border-red-400" : "border-[#DDD]"}`}
              />
            </FormGroup>

            {/* メールアドレス */}
            <FormGroup label="メールアドレス" required error={errors.email}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="例: sample@example.com"
                className={`w-full px-4 py-3 border rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white ${errors.email ? "border-red-400" : "border-[#DDD]"}`}
              />
            </FormGroup>

            {/* お電話番号 */}
            <FormGroup label="お電話番号" required error={errors.phone}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="例: 03-1234-5678"
                className={`w-full px-4 py-3 border rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white ${errors.phone ? "border-red-400" : "border-[#DDD]"}`}
              />
            </FormGroup>

            {/* お問い合わせ内容 */}
            <FormGroup label="お問い合わせ内容" optional>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ご質問、ご相談などをご入力ください。資料請求の場合は空欄でも構いません。"
                rows={5}
                className="w-full px-4 py-3 border border-[#DDD] rounded-lg text-[15px] text-[#333] placeholder:text-[#BBB] focus:outline-none focus:border-[#FD6C26] focus:ring-2 focus:ring-[#FD6C26]/10 transition-all bg-[#FAFAFA] hover:bg-white resize-none"
              />
            </FormGroup>

            {/* Divider */}
            <div className="border-t border-[#E8E8E8] my-8" />

            {/* Agreement Checkbox */}
            <label className={`flex items-center gap-3 justify-center cursor-pointer mb-8 group ${errors.agreed ? "text-red-500" : ""}`}>
              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all flex-shrink-0 ${agreed ? "bg-[#FD6C26] border-[#FD6C26]" : errors.agreed ? "border-red-400" : "border-[#CCC] group-hover:border-[#FD6C26]"}`}>
                {agreed && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
              </div>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="sr-only"
              />
              <span className="text-sm font-medium text-[#444]">
                <Link href="/privacy" className="text-[#FD6C26] hover:underline" onClick={(e) => e.stopPropagation()}>
                  個人情報保護方針
                </Link>
                に同意する
              </span>
            </label>
            {errors.agreed && <p className="text-xs text-red-500 text-center -mt-6 mb-6">{errors.agreed}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full max-w-[400px] mx-auto block py-4 bg-gradient-to-r from-[#FD6C26] to-[#E55A10] text-white text-lg font-bold rounded-full hover:shadow-xl hover:shadow-[#FD6C26]/25 hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              入力内容を確認する &gt;
            </button>

            {/* SSL Notice */}
            <p className="text-center mt-4 text-xs text-[#999] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              このメールフォームはSSL暗号化通信により保護されています。
            </p>
          </form>
        </div>
      </main>

      <ContactFooter />
    </div>
  );
}

// ============================================================
// Sub-components
// ============================================================

function FormGroup({
  label,
  required,
  optional,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 mb-2.5">
        {required && (
          <span className="inline-flex items-center px-2 py-0.5 bg-[#FD6C26] text-white text-[10px] font-bold rounded">
            必須
          </span>
        )}
        {optional && (
          <span className="inline-flex items-center px-2 py-0.5 bg-[#999] text-white text-[10px] font-bold rounded">
            任意
          </span>
        )}
        <label className="text-sm font-bold text-[#333]">{label}</label>
      </div>
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

function RadioOption({
  name,
  value,
  checked,
  onChange,
  label,
}: {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${checked ? "border-[#FD6C26]" : "border-[#CCC] group-hover:border-[#FD6C26]/60"}`}>
        {checked && <div className="w-2.5 h-2.5 rounded-full bg-[#FD6C26]" />}
      </div>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className={`text-[15px] font-medium transition-colors ${checked ? "text-[#333]" : "text-[#666] group-hover:text-[#333]"}`}>
        {label}
      </span>
    </label>
  );
}

function ContactHeader() {
  return (
    <header className="bg-white border-b border-[#F0F0F0] py-4">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <img src="/ethical-community-lp/logo.png" alt="ロゴ" className="h-12 lg:h-14 cursor-pointer" />
        </Link>
        <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#FD6C26] transition-colors flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          サイトに戻る
        </Link>
      </div>
    </header>
  );
}

function ContactFooter() {
  return (
    <footer className="bg-[#333] text-white py-8">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <p className="text-xs text-white/50">
          &copy; 2026 エシカルコミュニティ有限責任事業組合 All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
