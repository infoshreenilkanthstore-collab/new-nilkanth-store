import React from "react";
import {
  FileText,
  UserCheck,
  Target,
  Share2,
  ShieldAlert,
  Mail,
  Scale,
  CheckCircle2,
} from "lucide-react";

export default function PrivacyPolicyPage({ onNavigate }) {
  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#1c1917] font-nunito pb-16 md:pb-24">
      {/* 1. Breadcrumb Bar */}
      <div className="w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-sm">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs sm:text-sm text-stone-500">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="hover:text-[#700b10] transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#700b10] font-semibold">Privacy Policy</span>
        </div>
      </div>

      {/* 2. Top Deep Maroon Header Section matching reference image */}
      <section className="w-full bg-[#700b10] text-white pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider uppercase text-white mb-3">
            Privacy Policy
          </h1>
          <div className="w-16 h-0.5 bg-[#ebd99c] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-stone-300 tracking-wide font-nunito">
            Effective Date: <strong className="text-white">June 1, 2025</strong>
          </p>
        </div>
      </section>

      {/* 3. Main Floating White Card matching reference image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.08)] border border-stone-200/80">

          {/* Introductory Notice */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 text-stone-700 text-xs sm:text-sm md:text-[14.5px] leading-relaxed">
            <p className="font-serif italic text-[#700b10] text-sm sm:text-base mb-2">
              &ldquo;Welcome to Shri Nilkanth Store (Trade Name: ILAVIZ), your online destination for divine offerings and spiritual fulfillment.&rdquo;
            </p>
            <p className="text-stone-600 text-xs sm:text-[13.5px]">
              This Privacy Policy outlines how we handle your personal information on our website. We are committed to safeguarding your privacy and ensuring that your information is handled responsibly and in compliance with applicable laws.
            </p>
          </div>

          {/* Section: Information We Collect */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-medium">
                Information We Collect
              </h3>
            </div>

            {/* 3 Cards: Personal, Transaction, Device & Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              {/* Card A */}
              <div className="bg-[#fffdf8] rounded-2xl p-5 border border-[#ebd99c]/70 shadow-2xs">
                <h4 className="font-serif text-sm sm:text-[15px] font-semibold text-stone-900 mb-2.5">
                  A. Personal Information
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-600 list-disc list-inside">
                  <li>Name</li>
                  <li>Contact details</li>
                  <li>Billing &amp; Shipping address</li>
                  <li>Payment information</li>
                </ul>
              </div>

              {/* Card B */}
              <div className="bg-[#fffdf8] rounded-2xl p-5 border border-[#ebd99c]/70 shadow-2xs">
                <h4 className="font-serif text-sm sm:text-[15px] font-semibold text-stone-900 mb-2.5">
                  B. Transaction Details
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-600 list-disc list-inside">
                  <li>Order history</li>
                  <li>Payment records</li>
                  <li>Invoices and receipts</li>
                </ul>
              </div>

              {/* Card C */}
              <div className="bg-[#fffdf8] rounded-2xl p-5 border border-[#ebd99c]/70 shadow-2xs">
                <h4 className="font-serif text-sm sm:text-[15px] font-semibold text-stone-900 mb-2.5">
                  C. Device &amp; Usage
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-[13px] text-stone-600 list-disc list-inside">
                  <li>IP address &amp; browser types</li>
                  <li>Operating system</li>
                  <li>Site interactions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section: How We Collect vs Purpose of Collection (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
            {/* How We Collect */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 sm:p-6 border border-stone-200/70">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-[#700b10] flex items-center justify-center flex-shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  How We Collect
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-stone-600 leading-relaxed list-disc list-inside">
                <li>Creating an account</li>
                <li>Making a purchase</li>
                <li>Contacting customer support</li>
                <li>Interacting with the website</li>
              </ul>
            </div>

            {/* Purpose of Collection */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 sm:p-6 border border-stone-200/70">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Purpose of Collection
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-stone-600 leading-relaxed list-disc list-inside">
                <li>Efficient order processing and fulfillment</li>
                <li>Providing excellent customer support</li>
                <li>Analyzing site usage to optimize experience</li>
                <li>Complying with legal obligations</li>
              </ul>
            </div>
          </div>

          {/* Section: Sharing of Information & Security Measures (2 Columns in container) */}
          <div className="bg-[#fbf9f5] border border-stone-200/70 rounded-2xl p-5 sm:p-6 mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sharing of Information */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Share2 className="w-4 h-4 text-[#b8944d]" />
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900">
                    Sharing of Information
                  </h4>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                  We may share Personal Information with service providers (e.g. payment processors, shipping companies) and legal authorities when required by law.
                </p>
              </div>

              {/* Security Measures */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-serif text-sm sm:text-base font-semibold text-stone-900">
                    Security Measures
                  </h4>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                  We implement industry-standard security measures to protect your Personal Information from unauthorized access, disclosure, or alteration.
                </p>
              </div>
            </div>
          </div>

          {/* Section: Your Privacy Rights (6 numbered cards) */}
          <div className="mb-10">
            <div className="text-center mb-4">
              <h3 className="font-serif text-xl sm:text-2xl text-[#700b10] font-normal mb-1">
                Your Privacy Rights
              </h3>
              <p className="text-xs sm:text-[13px] text-stone-500 font-nunito">
                As a user of Shri Nilkanth Store (Trade Name: ILAVIZ), you have absolute control over your data.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Right 1 */}
              <div className="border border-[#ebd99c]/80 bg-[#fffdfa] rounded-xl p-3.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ebd99c]/30 text-[#700b10] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-stone-800">
                  Access your Information
                </span>
              </div>

              {/* Right 2 */}
              <div className="border border-[#ebd99c]/80 bg-[#fffdfa] rounded-xl p-3.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ebd99c]/30 text-[#700b10] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-stone-800">
                  Correct Inaccuracies
                </span>
              </div>

              {/* Right 3 */}
              <div className="border border-[#ebd99c]/80 bg-[#fffdfa] rounded-xl p-3.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ebd99c]/30 text-[#700b10] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-stone-800">
                  Withdraw Consent
                </span>
              </div>

              {/* Right 4 */}
              <div className="border border-[#ebd99c]/80 bg-[#fffdfa] rounded-xl p-3.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ebd99c]/30 text-[#700b10] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  4
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-stone-800">
                  Request Erasure
                </span>
              </div>

              {/* Right 5 */}
              <div className="border border-[#ebd99c]/80 bg-[#fffdfa] rounded-xl p-3.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ebd99c]/30 text-[#700b10] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  5
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-stone-800">
                  Object to Processing
                </span>
              </div>

              {/* Right 6 */}
              <div className="border border-[#ebd99c]/80 bg-[#fffdfa] rounded-xl p-3.5 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ebd99c]/30 text-[#700b10] font-bold text-xs flex items-center justify-center flex-shrink-0">
                  6
                </span>
                <span className="text-xs sm:text-[13px] font-medium text-stone-800">
                  Data Portability
                </span>
              </div>
            </div>
          </div>

          {/* Governing Law vs Consent (2 Cards matching reference) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
            {/* Governing Law (Deep Maroon card) */}
            <div className="bg-[#700b10] text-white rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#ebd99c] block mb-2 font-nunito">
                  GOVERNING LAW
                </span>
                <p className="text-xs sm:text-[13px] text-stone-100 leading-relaxed font-light">
                  This Privacy Policy is governed by and construed in accordance with the laws of <strong>Rajpipla, Narmada, Gujarat</strong>. Disputes shall be subject to the exclusive jurisdiction of the courts in Rajpipla.
                </p>
              </div>
            </div>

            {/* Consent (White card with maroon border) */}
            <div className="bg-white border-2 border-[#700b10] rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#700b10] block mb-2 font-nunito">
                  CONSENT
                </span>
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed">
                  By using Shri Nilkanth Store (Trade Name: ILAVIZ), you consent to the collection and use of your Personal Information as outlined in this Privacy Policy.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-[#700b10] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center mb-8 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
              Contact Information
            </h3>
            <p className="text-xs sm:text-[13.5px] text-stone-200 leading-relaxed max-w-lg mx-auto mb-4 font-light">
              For inquiries or concerns regarding this Privacy Policy, please contact us at:
            </p>

            <div className="flex items-center justify-center">
              <a
                href="mailto:shrinilkanthstore@gmail.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#ebd99c] hover:text-white px-5 py-2.5 rounded-xl border border-white/15 transition-all text-xs sm:text-sm font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>shrinilkanthstore@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Closing Policy Notes */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-[11.5px] sm:text-xs text-stone-500 leading-relaxed">
              Thank you for entrusting <strong className="text-stone-800">Shri Nilkanth Store (Trade Name: ILAVIZ)</strong> with your information. Your privacy is paramount to us.
            </p>

            <div className="pt-2">
              <h5 className="font-serif text-xs sm:text-sm font-semibold text-[#700b10] mb-1">
                Changes to Privacy Policy
              </h5>
              <p className="text-[11.5px] sm:text-xs text-stone-400">
                We reserve the right to modify this Privacy Policy. Any changes will be effective immediately upon posting.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
