import React, { useEffect, useState } from "react";
import { Loader2, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { verifyPayment, syncFinalOrder, deleteAbandonedOrder, clearCartApi } from "../../services/api";
import { trackPurchase } from "../../services/analytics";

export default function GatewayCallbackPage({ provider = "icici", onNavigate, onPaymentVerified }) {
  const [status, setStatus] = useState("verifying"); // 'verifying' | 'success' | 'failed'
  const [errorMessage, setErrorMessage] = useState("");
  const [verifiedOrder, setVerifiedOrder] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function processCallback() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const hashParams = new URLSearchParams(window.location.hash.replace("#", "?"));

        // Helper to grab param from either search or hash
        const getParam = (key) => urlParams.get(key) || hashParams.get(key) || "";

        let payload = {};
        const savedSession = sessionStorage.getItem("nilkanth_pending_checkout");
        const pendingData = savedSession ? JSON.parse(savedSession) : {};

        if (provider === "icici") {
          payload = {
            provider: "icici",
            order_id: Number(getParam("order_id") || pendingData.order_id || pendingData.id || 0),
            payment_id: Number(getParam("payment_id") || pendingData.payment_id || 0),
            "Response Code": getParam("Response Code") || getParam("response_code") || "E000",
            "Unique Ref Number": getParam("Unique Ref Number") || getParam("unique_ref_number") || getParam("reference_no") || "",
            ReferenceNo: getParam("ReferenceNo") || getParam("reference_no") || "",
            "Transaction Amount": getParam("Transaction Amount") || getParam("amount") || "",
          };
        } else if (provider === "easebuzz") {
          const rawStatus = (getParam("status") || "").trim().toLowerCase();
          const isExplicitFailure = rawStatus && !["success", "successful"].includes(rawStatus);

          if (isExplicitFailure) {
            if (!isMounted) return;
            setStatus("failed");
            const errReason =
              getParam("error_Message") ||
              getParam("error_message") ||
              (rawStatus === "usercancelled" ? "Transaction was cancelled by the user." : `Payment status: ${getParam("status") || "Failed"}. Please retry.`);
            setErrorMessage(errReason);
            return;
          }

          payload = {
            provider: "easebuzz",
            order_id: Number(getParam("order_id") || pendingData.order_id || pendingData.id || 0),
            payment_id: Number(getParam("payment_id") || pendingData.payment_id || 0),
            status: getParam("status") || "success",
            txnid: getParam("txnid") || pendingData.txnid || "",
            amount: getParam("amount") || (pendingData.total ? String(Number(pendingData.total).toFixed(2)) : ""),
            firstname: getParam("firstname") || pendingData.customer?.firstName || pendingData.customer?.name?.split(" ")[0] || "Customer",
            email: getParam("email") || pendingData.customer?.email || "",
            phone: getParam("phone") || pendingData.customer?.phone || "",
            productinfo: getParam("productinfo") || pendingData.productinfo || (pendingData.order_id ? `Order CHK-${pendingData.order_id}` : "Order"),
            hash: getParam("hash") || "",
            easepayid: getParam("easepayid") || "",
            error_Message: getParam("error_Message") || "",
          };
        }

        const res = await verifyPayment(payload);

        if (!isMounted) return;

        if (res.success) {
          const abandonedId = Number(payload.order_id || pendingData.order_id || pendingData.id || 0);
          const items = pendingData.items || [];
          const customer = pendingData.customer || {};
          const shippingAddress = pendingData.shipping_address || {};
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

          // Phase 3: Convert Abandoned Draft to Official Placed Order (POST /checkout/sync)
          const syncPayload = {
            customer_id: null,
            first_name: customer.name?.split(" ")[0] || "",
            last_name: customer.name?.split(" ").slice(1).join(" ") || "",
            customerName: customer.name || "Devoted Customer",
            customerPhone: customer.phone || "",
            customerEmail: customer.email || "",
            abandoned_checkout_id: abandonedId || null,
            items: items.map((it) => ({
              productId: Number(it.product_id || it.productId || it.id || 0),
              variantId: Number(it.variant_id || it.variantId || 0) || null,
              title: it.title || it.product_title || "Sacred Item",
              sku: it.sku || "",
              price: Number(it.price || 0),
              quantity: Number(it.quantity || 1),
            })),
            shippingAddress: {
              name: customer.name || "Devoted Customer",
              line1: shippingAddress.address1 + (shippingAddress.address2 ? `, ${shippingAddress.address2}` : ""),
              city: shippingAddress.city || "",
              state: shippingAddress.state || "",
              pincode: shippingAddress.pincode || "",
              country: shippingAddress.country || "India",
              phone: customer.phone || "",
              email: customer.email || "",
            },
            subtotal: Number(pendingData.total || 0),
            discountAmount: Number(pendingData.discountAmount || 0),
            discountCode: pendingData.discountCode || "",
            shippingAmount: Number(pendingData.shippingAmount || 0),
            shippingMethod: pendingData.shippingMethod || "Standard Shipping",
            taxAmount: Number(pendingData.taxAmount || 0),
            total: Number(pendingData.total || 0),
            currency: "INR",
            paymentMethod: "online",
            paymentProvider: provider,
            paymentStatus: "paid",
            transactionReference: payload["Unique Ref Number"] || payload.txnid || "",
            device_type: isMobile ? "mobile" : "desktop",
            is_mobile: isMobile,
          };

          const syncRes = await syncFinalOrder(syncPayload);
          const officialOrderData = syncRes?.data || {
            id: abandonedId,
            order_number: `ORD-${abandonedId}`,
            total: pendingData.total,
            financial_status: "paid",
          };

          // Phase 4: Delete Abandoned Order Draft & Clean Cart
          if (abandonedId) {
            await deleteAbandonedOrder(abandonedId);
          }
          await clearCartApi();
          sessionStorage.removeItem("nilkanth_checkout_session_id");
          sessionStorage.removeItem("nilkanth_pending_checkout");

          const confirmedOrder = {
            ...officialOrderData,
            customer,
            shipping_address: shippingAddress,
            items,
            total: Number(officialOrderData.total || pendingData.total || 0),
            provider,
            payment_method: "online",
            financial_status: "paid",
          };

          trackPurchase(confirmedOrder);
          setStatus("success");
          setVerifiedOrder(confirmedOrder);

          if (onPaymentVerified) {
            onPaymentVerified(confirmedOrder);
          }
        } else {
          setStatus("failed");
          setErrorMessage(res.message || "Gateway signature or status verification failed");
        }
      } catch (err) {
        if (!isMounted) return;
        setStatus("failed");
        setErrorMessage(err.message || "An unexpected error occurred during verification");
      }
    }

    processCallback();

    return () => {
      isMounted = false;
    };
  }, [provider]);

  return (
    <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center py-16 px-4 font-nunito">
      <div className="max-w-md w-full bg-white border border-stone-200/90 rounded-3xl p-8 text-center shadow-xs">
        {status === "verifying" && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-[#700b10]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Verifying Payment</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Please wait while we confirm your payment securely with the bank gateway...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Payment Verified!</h2>
            <p className="text-xs text-stone-500 leading-relaxed">
              Your transaction has been securely confirmed. Proceeding to order summary...
            </p>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("checkout-success", { orderData: verifiedOrder })}
              className="mt-4 w-full bg-[#700b10] hover:bg-[#54060b] text-white py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>View Order Receipt</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="space-y-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-9 h-9" />
            </div>
            <h2 className="font-serif text-xl font-bold text-stone-900">Verification Failed</h2>
            <p className="text-xs text-rose-700 leading-relaxed bg-rose-50 p-3 rounded-xl border border-rose-200">
              {errorMessage}
            </p>
            <p className="text-xs text-stone-500">
              Your cart items are safe. You can retry with another payment method.
            </p>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate("checkout")}
              className="mt-4 w-full bg-stone-900 hover:bg-stone-800 text-white py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Return to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
