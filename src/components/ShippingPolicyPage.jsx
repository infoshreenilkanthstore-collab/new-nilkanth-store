import React from "react";
import {
  Clock,
  Truck,
  MapPin,
  CheckCircle,
  CreditCard,
  Package,
  AlertCircle,
  Mail,
  Phone,
} from "lucide-react";

export default function ShippingPolicyPage({ onNavigate }) {
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
          <span className="text-[#700b10] font-semibold">Shipping Policy</span>
        </div>
      </div>

      {/* 2. Top Deep Maroon Header Section matching reference image */}
      <section className="w-full bg-[#700b10] text-white pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 text-center relative overflow-hidden">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider uppercase text-white mb-3">
            Shipping Policy
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
              Thank you for choosing{" "}
              <strong className="text-[#700b10]">
                Shri Nilkanth Store (Trade Name: ILAVIZ)
              </strong>{" "}
              for your spiritual and wellness needs. Our Shipping Policy outlines the details of how we handle shipping and delivery of our products.
            </p>
          </div>

          {/* Processing Time vs Delivery Time (2 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8">
            {/* Processing Time */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 sm:p-6 border border-stone-200/70">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Processing Time
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                Orders are typically processed within{" "}
                <strong className="text-stone-900 font-semibold">1&ndash;2 business days</strong>{" "}
                from the date of purchase. Note that this may vary during peak seasons or holidays.
              </p>
            </div>

            {/* Delivery Time */}
            <div className="bg-[#fcfbf9] rounded-2xl p-5 sm:p-6 border border-stone-200/70">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Delivery Time
                </h3>
              </div>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                Typically, orders are delivered within{" "}
                <strong className="text-stone-900 font-semibold">5&ndash;10 business days</strong>{" "}
                after processing, depending on your location and selected method.
              </p>
            </div>
          </div>

          {/* Shipping Destinations Card */}
          <div className="bg-[#fffdf8] rounded-2xl p-5 sm:p-6 border border-[#ebd99c]/70 mb-8 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-full bg-[#ebd99c]/40 text-[#700b10] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-lg text-stone-900 font-medium mb-1">
                Shipping Destinations
              </h3>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                Shri Nilkanth Store (Trade Name: ILAVIZ) currently offers shipping within India. We are committed to providing reliable and efficient shipping services to our valued customers across the country.
              </p>
            </div>
          </div>

          {/* Shipping Methods vs Shipping Charges (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 pt-2">
            {/* Shipping Methods */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-[#b8944d]" />
                <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Shipping Methods
                </h4>
              </div>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                We partner with trusted logistics providers to ensure the safe and timely delivery of your orders. Available methods will be displayed during checkout.
              </p>
            </div>

            {/* Shipping Charges */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-[#b8944d]" />
                <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium">
                  Shipping Charges
                </h4>
              </div>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                Charges are calculated based on product weight, destination, and method. Total cost is displayed at checkout before completion.
              </p>
            </div>
          </div>

          {/* Order Tracking Card */}
          <div className="bg-[#fbf9f5] border border-stone-200/80 rounded-2xl p-5 sm:p-6 mb-8 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#faeed1] text-[#700b10] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Package className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <h4 className="font-serif text-base sm:text-lg text-[#700b10] font-medium mb-1">
                Order Tracking
              </h4>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                Once shipped, you&rsquo;ll receive a confirmation email with a tracking number and link. You can also track your order via the &ldquo;Order History&rdquo; in your Shri Nilkanth Store (Trade Name: ILAVIZ) account.
              </p>
            </div>
          </div>

          {/* Delivery Attempts vs Shipping Updates (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 pt-2">
            <div>
              <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium mb-1.5">
                Delivery Attempts
              </h4>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                Our partners make reasonable attempts to deliver. If you&rsquo;re unavailable, they may leave a notification or contact you to reschedule.
              </p>
            </div>

            <div>
              <h4 className="font-serif text-base sm:text-lg text-stone-900 font-medium mb-1.5">
                Shipping Updates
              </h4>
              <p className="text-xs sm:text-[13.5px] text-stone-600 leading-relaxed font-nunito">
                We provide regular updates via email, including order confirmation, shipment notification, and relevant tracking info.
              </p>
            </div>
          </div>

          {/* Shipping Restrictions Alert Box */}
          <div className="bg-[#fdf8f7] border border-rose-200/80 rounded-2xl p-4 sm:p-5 mb-10 flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" />
            </div>
            <div>
              <h5 className="font-serif text-sm font-semibold text-rose-900 mb-0.5">
                Shipping Restrictions
              </h5>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-nunito">
                Certain locations may be unavailable due to legal or logistical restrictions. We will notify you promptly and process a refund if your location is affected.
              </p>
            </div>
          </div>

          {/* Contact Information Maroon Card matching reference */}
          <div className="bg-[#700b10] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center mb-8 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2">
              Contact Information
            </h3>
            <p className="text-xs sm:text-[13.5px] text-stone-200 leading-relaxed max-w-lg mx-auto mb-5 font-light">
              If you have any questions or concerns regarding our Shipping Policy, please contact our customer support team at:
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

          {/* Closing Policy Notes */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-[11.5px] sm:text-xs text-stone-400 leading-relaxed font-nunito">
              Shri Nilkanth Store (Trade Name: ILAVIZ) reserves the right to modify this Shipping Policy. Any changes will be effective immediately upon posting on the website.
            </p>
            <p className="text-xs sm:text-sm text-[#b8944d] font-semibold italic">
              Thank you for choosing Shri Nilkanth Store (Trade Name: ILAVIZ). We strive to provide you with an exceptional shopping experience.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
