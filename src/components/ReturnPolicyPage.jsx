import React from "react";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Truck,
  CreditCard,
  Mail,
  Phone,
} from "lucide-react";

export default function ReturnPolicyPage({ onNavigate }) {
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
          <span className="text-[#700b10] font-semibold">Return Policy</span>
        </div>
      </div>

      {/* 2. Top Deep Maroon Header Section matching reference image */}
      <section className="w-full bg-[#700b10] text-white pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-white mb-3">
            Return Policy
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
            <p>
              At{" "}
              <strong className="text-[#700b10]">
                Shri Nilkanth Store (Trade Name: ILAVIZ)
              </strong>
              , we value our customers and aim to ensure your satisfaction with
              every purchase. If for any reason you are not completely satisfied
              with your purchase, we offer a straightforward return policy to
              make the process as simple as possible.
            </p>
          </div>

          {/* Eligibility vs Non-Returnable Items (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
            {/* Eligibility for Returns */}
            <div className="bg-[#fcfbf7] rounded-2xl p-5 sm:p-6 border border-stone-200/70">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Eligibility for Returns
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-stone-600 leading-relaxed list-disc list-inside">
                <li>The item must be in its original packaging.</li>
                <li>
                  The item must be unused and in the same condition as received.
                </li>
                <li>
                  You must initiate the return process within 7 days from the
                  date of delivery.
                </li>
              </ul>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-[#fdfaf8] rounded-2xl p-5 sm:p-6 border border-stone-200/70">
              <div className="flex items-center gap-2.5 mb-3.5">
                <div className="w-7 h-7 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <XCircle className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Non-Returnable Items
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-[13px] text-stone-600 leading-relaxed list-disc list-inside">
                <li>Items marked as final sale or clearance.</li>
                <li>Customized or personalized items.</li>
                <li>Items damaged due to misuse, accidents, or neglect.</li>
              </ul>
            </div>
          </div>

          {/* Return Process */}
          <div className="mb-10">
            <div className="flex items-center gap-2.5 mb-2.5">
              <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="font-serif text-lg sm:text-xl text-stone-900 font-medium">
                Return Process
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mb-4">
              To start a return, please follow these steps:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
              {/* Step 1 */}
              <div className="border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative bg-white flex flex-col justify-between">
                <span className="text-xs sm:text-sm text-stone-700 leading-snug">
                  Contact our customer support team at{" "}
                  <a
                    href="mailto:shrinilkanthstore@gmail.com"
                    className="text-[#700b10] font-semibold break-all hover:underline"
                  >
                    shrinilkanthstore@gmail.com
                  </a>
                  .
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-stone-200 text-right mt-3 block select-none">
                  01
                </span>
              </div>

              {/* Step 2 */}
              <div className="border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative bg-white flex flex-col justify-between">
                <span className="text-xs sm:text-sm text-stone-700 leading-snug">
                  Provide your order number, details of the item(s), and reason
                  for return.
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-stone-200 text-right mt-3 block select-none">
                  02
                </span>
              </div>

              {/* Step 3 */}
              <div className="border border-stone-200/80 rounded-2xl p-4 sm:p-5 relative bg-white flex flex-col justify-between">
                <span className="text-xs sm:text-sm text-stone-700 leading-snug">
                  Follow our team&rsquo;s guidance to receive your return
                  authorization.
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-stone-200 text-right mt-3 block select-none">
                  03
                </span>
              </div>
            </div>
          </div>

          {/* Return Shipping & Refund Process (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 pt-2 border-t border-stone-100">
            {/* Return Shipping */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-[#b8944d]" />
                <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Return Shipping
                </h4>
              </div>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                Customers are responsible for the cost of return shipping unless
                the return is due to an error on our part or a defective
                product. For your protection, we recommend using a trackable
                shipping service when returning items.
              </p>
            </div>

            {/* Refund Process */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-[#b8944d]" />
                <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Refund Process
                </h4>
              </div>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
                Once we receive the returned item and confirm its eligibility,
                we will process your refund. Refunds will be issued to the
                original payment method used for the purchase.
              </p>
            </div>
          </div>

          {/* Refund Timeframe Box */}
          <div className="bg-[#fcfaf5] border border-[#ebd99c]/70 rounded-2xl p-4 sm:p-5 mb-8">
            <h4 className="font-serif text-sm sm:text-base text-stone-900 font-medium mb-1">
              Refund Timeframe
            </h4>
            <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
              Please allow up to{" "}
              <strong className="text-stone-900 font-bold">
                7 business days
              </strong>{" "}
              for the refund to be processed and reflected in your account. The
              exact timeframe may vary depending on your payment provider.
            </p>
          </div>

          {/* Damaged or Defective Items */}
          <div className="mb-6">
            <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium mb-1.5">
              Damaged or Defective Items
            </h4>
            <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
              If you receive a damaged or defective item, please contact our
              customer support team immediately for assistance. We will arrange
              for a replacement or issue a refund, depending on the
              circumstances.
            </p>
          </div>

          {/* Exchange Policy */}
          <div className="mb-10">
            <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium mb-1.5">
              Exchange Policy
            </h4>
            <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed">
              Currently, Shri Nilkanth Store (Trade Name: ILAVIZ) does not offer
              exchanges. If you require a different item, color, or size, please
              initiate a return for the unwanted item and place a new order for
              the desired item.
            </p>
          </div>

          {/* Deep Maroon Contact Information Card matching reference */}
          <div className="bg-[#700b10] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center mb-8 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
              Contact Information
            </h3>
            <p className="text-xs sm:text-[13.5px] text-stone-200 leading-relaxed max-w-lg mx-auto mb-5 font-light">
              If you have any questions or concerns regarding our Return Policy,
              please do not hesitate to contact our customer support team at:
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
              <a
                href="mailto:shrinilkanthstore@gmail.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#ebd99c] hover:text-white px-4 py-2.5 rounded-xl border border-white/15 transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>shrinilkanthstore@gmail.com</span>
              </a>

              <a
                href="tel:+918238811190"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-[#ebd99c] hover:text-white px-4 py-2.5 rounded-xl border border-white/15 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>+91 82388 11190</span>
              </a>
            </div>
          </div>

          {/* Closing Policy Note */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-[11.5px] sm:text-xs text-stone-400 leading-relaxed">
              Shri Nilkanth Store (Trade Name: ILAVIZ) reserves the right to update or
              modify this Return Policy as needed. Any changes will be effective
              immediately upon posting on our website.
            </p>
            <p className="text-xs sm:text-sm text-[#b8944d] font-semibold italic">
              Thank you for choosing Shri Nilkanth Store (Trade Name: ILAVIZ). We
              appreciate your business and strive to provide a hassle-free
              shopping experience for all our customers.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
