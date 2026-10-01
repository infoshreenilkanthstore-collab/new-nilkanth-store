import React from "react";
import { Mail, Phone, MapPin, ShieldCheck, Compass } from "lucide-react";

export default function TermsAndConditionsPage({ onNavigate }) {
  const sections = [
    {
      id: 1,
      title: "SECTION 1 - ONLINE STORE TERMS",
      items: [
        "1.1 By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence.",
        "1.2 You may not use our products for any illegal or unauthorized purpose, nor violate any laws in your jurisdiction (including copyright laws).",
        "1.3 You must not transmit any worms, viruses, or any code of a destructive nature.",
        "1.4 A breach or violation of any of the Terms will result in an immediate termination of your Services.",
      ],
    },
    {
      id: 2,
      title: "SECTION 2 - GENERAL CONDITIONS",
      items: [
        "2.1 We reserve the right to refuse service to anyone for any reason at any time.",
        "2.2 You understand that your content (not including credit card information) may be transferred unencrypted across various networks. Credit card information is always encrypted during transfer.",
        "2.3 You agree not to reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without express written permission from us.",
      ],
    },
    {
      id: 3,
      title: "SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION",
      items: [
        "3.1 We are not responsible if information made available on this site is not accurate, complete, or current.",
        "3.2 The material on this site is provided for general information only and should not be relied upon as the sole basis for making decisions without consulting primary or more timely sources.",
      ],
    },
    {
      id: 4,
      title: "SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES",
      items: [
        "4.1 Prices for our products are subject to change without notice.",
        "4.2 We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time.",
        "4.3 We shall not be liable to you or to any third-party for any modification, price change, suspension, or discontinuance of the Service.",
      ],
    },
    {
      id: 5,
      title: "SECTION 5 - PRODUCTS OR SERVICES (if applicable)",
      items: [
        "5.1 Certain products or services may be available exclusively online through the website.",
        "5.2 We have made every effort to display as accurately as possible the colors and images of our sacred products on the store.",
        "5.3 We reserve the right to limit the sales of our products or Services to any person, geographic region, or jurisdiction.",
      ],
    },
    {
      id: 6,
      title: "SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION",
      items: [
        "6.1 We reserve the right to refuse any order you place with us.",
        "6.2 You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.",
        "6.3 For more detail, please review our Return Policy.",
      ],
    },
    {
      id: 7,
      title: "SECTION 7 - OPTIONAL TOOLS",
      items: [
        "7.1 We may provide you with access to third-party tools over which we neither monitor nor have any control or input.",
        "7.2 You acknowledge and agree that we provide access to such tools 'as is' and 'as available' without any warranties or endorsements.",
      ],
    },
    {
      id: 8,
      title: "SECTION 8 - THIRD-PARTY LINKS",
      items: [
        "8.1 Certain content, products, and services available via our Service may include materials from third parties.",
        "8.2 Third-party links on this site may direct you to third-party websites that are not affiliated with us.",
      ],
    },
    {
      id: 9,
      title: "SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS",
      items: [
        "9.1 If you send creative ideas, suggestions, or materials, you agree that we may, at any time, without restriction, edit, copy, publish, distribute, and otherwise use them in any medium.",
        "9.2 We are under no obligation to maintain comments in confidence, to pay compensation, or to respond to any comments.",
      ],
    },
    {
      id: 10,
      title: "SECTION 10 - PERSONAL INFORMATION",
      items: [
        "10.1 Your submission of personal information through the store is governed by our Privacy Policy.",
      ],
    },
    {
      id: 11,
      title: "SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS",
      items: [
        "11.1 Occasionally there may be information on our site that contains typographical errors, inaccuracies, or omissions relating to product descriptions, pricing, promotions, and availability.",
      ],
    },
    {
      id: 12,
      title: "SECTION 12 - PROHIBITED USES",
      items: [
        "12.1 You are prohibited from using the site or its content for any unlawful purpose, to solicit others to perform unlawful acts, to violate regulations, or to infringe upon our intellectual property rights.",
      ],
    },
    {
      id: 13,
      title: "SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY",
      items: [
        "13.1 We do not guarantee that your use of our service will be uninterrupted, timely, secure, or error-free.",
        "13.2 You expressly agree that your use of, or inability to use, the service is at your sole risk.",
        "13.3 In no case shall Shri Nilkanth Store (Trade Name: ILAVIZ) or its affiliates be liable for any injury, loss, claim, or direct/indirect damages arising from your use.",
      ],
    },
    {
      id: 14,
      title: "SECTION 14 - INDEMNIFICATION",
      items: [
        "14.1 You agree to indemnify, defend, and hold harmless Shri Nilkanth Store (Trade Name: ILAVIZ) and our partners from any claim or demand made by any third-party.",
      ],
    },
    {
      id: 15,
      title: "SECTION 15 - SEVERABILITY",
      items: [
        "15.1 In the event that any provision of these Terms is determined to be unlawful, void, or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law.",
      ],
    },
    {
      id: 16,
      title: "SECTION 16 - TERMINATION",
      items: [
        "16.1 The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes.",
      ],
    },
    {
      id: 17,
      title: "SECTION 17 - ENTIRE AGREEMENT",
      items: [
        "17.1 These Terms and any policies or operating rules posted by us on this site constitute the entire agreement and understanding between you and us.",
      ],
    },
    {
      id: 18,
      title: "SECTION 18 - GOVERNING LAW",
      items: [
        "18.1 These Terms shall be governed by and construed in accordance with the laws of Rajpipla, Narmada, Gujarat, India.",
      ],
    },
    {
      id: 19,
      title: "SECTION 19 - CHANGES TO TERMS OF SERVICE",
      items: [
        "19.1 You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change, or replace any part of these Terms.",
      ],
    },
  ];

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
          <span className="text-[#700b10] font-semibold">Terms &amp; Conditions</span>
        </div>
      </div>

      {/* 2. Top Deep Maroon Header Section matching reference image */}
      <section className="w-full bg-[#700b10] text-white pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider uppercase text-white mb-3">
            Terms &amp; Conditions
          </h1>
          <div className="w-16 h-0.5 bg-[#ebd99c] mx-auto mb-3" />
          <p className="text-xs sm:text-sm text-stone-300 tracking-wide font-nunito">
            Shri Nilkanth Store (Trade Name: ILAVIZ)
          </p>
        </div>
      </section>

      {/* 3. Main Floating White Card matching reference image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_12px_45px_rgba(0,0,0,0.08)] border border-stone-200/80">

          {/* Overview Callout Card */}
          <div className="bg-[#fffdf7] border border-[#ebd99c] rounded-2xl p-5 sm:p-6 mb-10 shadow-2xs">
            <div className="flex items-center gap-2 mb-2 text-[#700b10]">
              <Compass className="w-5 h-5 stroke-[2]" />
              <h2 className="font-serif text-base sm:text-lg font-semibold tracking-wide uppercase">
                OVERVIEW
              </h2>
            </div>
            <p className="text-xs sm:text-[13.5px] text-stone-700 leading-relaxed font-nunito">
              This website is operated by{" "}
              <strong className="text-[#700b10]">
                Shri Nilkanth Store (Trade Name: ILAVIZ)
              </strong>
              . Throughout the site, the terms &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; refer to Shri Nilkanth Store (Trade Name: ILAVIZ). Shri Nilkanth Store (Trade Name: ILAVIZ) offers this website, including all information, tools, and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies, and notices stated here.
            </p>
          </div>

          {/* Section Blocks 1 to 19 */}
          <div className="space-y-8 divide-y divide-stone-100">
            {sections.map((sec) => (
              <div key={sec.id} className={sec.id !== 1 ? "pt-7" : ""}>
                <h3 className="font-serif text-[15px] sm:text-base md:text-[17px] font-semibold tracking-wide text-[#700b10] uppercase mb-3">
                  {sec.title}
                </h3>
                <div className="space-y-2.5">
                  {sec.items.map((line, idx) => (
                    <p
                      key={idx}
                      className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Section 20 - Deep Maroon Contact Information Card matching reference */}
          <div className="mt-12 bg-[#700b10] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-9 shadow-md">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal text-center mb-1">
              SECTION 20 - CONTACT INFORMATION
            </h3>
            <p className="text-xs sm:text-[13px] text-stone-200 text-center mb-6 font-light">
              Questions about the Terms of Service should be sent to us at:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 pt-2 border-t border-white/15">
              {/* Email & Phone */}
              <div className="space-y-3.5 flex flex-col justify-center">
                <a
                  href="mailto:shrinilkanthstore@gmail.com"
                  className="inline-flex items-center gap-3 text-stone-100 hover:text-[#ebd99c] transition-colors text-xs sm:text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#ebd99c]" />
                  </div>
                  <span className="font-medium">shrinilkanthstore@gmail.com</span>
                </a>

                <a
                  href="tel:+918238811190"
                  className="inline-flex items-center gap-3 text-stone-100 hover:text-[#ebd99c] transition-colors text-xs sm:text-sm"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#ebd99c]" />
                  </div>
                  <span className="font-medium">+91 82388 11190</span>
                </a>
              </div>

              {/* Postal Address */}
              <div className="flex items-start gap-3 text-stone-100 text-xs sm:text-[13px] leading-relaxed">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-[#ebd99c]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#ebd99c] uppercase block mb-0.5 font-nunito">
                    POSTAL ADDRESS:
                  </span>
                  <p className="text-stone-200 font-light">
                    Shri Nilkanth Store (Trade Name: ILAVIZ), NiketanDham Road, Poicha, Taluka: Nandod, District: Narmada, Gujarat - 393145, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
