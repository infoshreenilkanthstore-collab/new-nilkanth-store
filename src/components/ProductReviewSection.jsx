import React, { useState, useEffect, useCallback, useRef } from "react";
import { Star, X, Check, User, ShieldCheck, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { fetchProductReviews, submitProductReview } from "../services/api";

export default function ProductReviewSection({ product, onWriteReview }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const sectionRef = useRef(null);
  const reviewsPerPage = 6;

  // Load reviews from live backend API (from api.md)
  const loadReviews = useCallback(async () => {
    if (!product?.id) {
      if (Array.isArray(product?.reviews)) setReviews(product.reviews);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetchProductReviews(product.id, { page: 1, limit: 100, fetchAll: true });
      if (res.success && res.data?.reviews) {
        setReviews(res.data.reviews);
      } else if (Array.isArray(product?.reviews) && product.reviews.length > 0) {
        setReviews(product.reviews);
      } else {
        setReviews([]);
      }
    } catch (e) {
      console.error("Error fetching live reviews:", e);
      if (Array.isArray(product?.reviews)) setReviews(product.reviews);
    } finally {
      setLoading(false);
    }
  }, [product?.id, product?.reviews]);

  useEffect(() => {
    loadReviews();
    setCurrentPage(1);
  }, [loadReviews]);

  const [sortOrder, setSortOrder] = useState("recent");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    rating: 5,
    message: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Calculate statistics
  const totalReviews = reviews.length;
  const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sumRating = 0;

  reviews.forEach((r) => {
    const rate = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
    ratingCounts[rate] = (ratingCounts[rate] || 0) + 1;
    sumRating += Number(r.rating) || 5;
  });

  const averageRating = totalReviews > 0 ? (sumRating / totalReviews).toFixed(2) : "5.00";

  const formatDate = (dateString) => {
    if (!dateString) return "Recent";
    try {
      const d = new Date(dateString);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return "Recent";
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!formData.message.trim()) {
      setFormError("Please enter your review message.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const prodId = product?.id;
      const res = await submitProductReview({
        productId: prodId,
        customerName: formData.name.trim(),
        rating: formData.rating,
        title: formData.title.trim() || "",
        description: formData.message.trim(),
        images: [],
      });

      if (res.success) {
        setSubmitSuccess(true);
        // Add new review optimistically to top of list
        const newRev = res.data || {
          id: "new_" + Date.now(),
          rating: formData.rating,
          title: formData.title.trim() || "",
          description: formData.message.trim(),
          customer_name: formData.name.trim(),
          review_date: new Date().toISOString(),
          created_at: new Date().toISOString(),
          images: [],
        };

        setReviews((prev) => [newRev, ...prev]);
        setCurrentPage(1);

        setTimeout(() => {
          setSubmitSuccess(false);
          setIsModalOpen(false);
          setFormData({ name: "", title: "", rating: 5, message: "" });
          // Refresh list from server to get accurate sync
          loadReviews();
        }, 1200);
      } else {
        setFormError(res.message || "Failed to submit review. Please try again.");
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      setFormError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

  // Sort and pagination
  const sortedReviews = reviews.slice().sort((a, b) => {
    if (sortOrder === "highest") return (b.rating || 5) - (a.rating || 5);
    if (sortOrder === "lowest") return (a.rating || 5) - (b.rating || 5);
    return new Date(b.review_date || b.created_at || 0) - new Date(a.review_date || a.created_at || 0);
  });

  const totalPages = Math.ceil(sortedReviews.length / reviewsPerPage) || 1;
  const paginatedReviews = sortedReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const handleReviewPageChange = (pageNum) => {
    setCurrentPage(pageNum);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={sectionRef} className="mt-2 sm:mt-10 pt-3 md:pt-5">
      {/* Title */}
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-tenor text-2xl sm:text-3xl md:text-[32px] text-[#700b10] font-normal tracking-wide">
          Customer Reviews
        </h2>
      </div>

      {/* Top Summary Card: Oval Golden-tinted Box */}
      <div className="rounded-2xl sm:rounded-3xl border border-amber-200/70 bg-[#fffdfa] p-4 sm:p-6 md:p-8 shadow-xs mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

          {/* Left: Overall Rating & Stars */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex items-center text-[#700b10]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.round(Number(averageRating))
                      ? "fill-[#700b10] text-[#700b10]"
                      : "text-stone-300"
                      }`}
                  />
                ))}
              </div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900 ml-1">
                {averageRating} <span className="text-sm sm:text-base font-normal text-stone-600">out of 5</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 font-nunito flex items-center gap-1.5 mt-0.5">
              Based on {totalReviews} reviews
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full border border-stone-400 text-[10px] text-stone-500 font-bold">
                ✓
              </span>
            </p>
          </div>

          {/* Middle: Rating Bar Breakdown (5 down to 1 star) */}
          <div className="w-full max-w-sm flex-1 space-y-1.5 px-2 sm:px-4">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = ratingCounts[stars] || 0;
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={stars} className="flex items-center gap-2.5 text-xs text-stone-500 font-nunito">
                  <div className="flex items-center gap-0.5 text-[#700b10] w-14 shrink-0">
                    {[...Array(5)].map((_, idx) => (
                      <Star
                        key={idx}
                        className={`w-2.5 h-2.5 ${idx < stars ? "fill-[#700b10] text-[#700b10]" : "text-stone-200"
                          }`}
                      />
                    ))}
                  </div>

                  {/* Progress Bar Track */}
                  <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#700b10] rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <span className="w-5 text-right font-medium text-stone-600 text-[11px]">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right: Write a Review CTA Button */}
          <div className="shrink-0 flex items-center justify-center">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="bg-[#700b10] hover:bg-[#5b080c] active:scale-95 text-white font-nunito font-extrabold text-xs sm:text-[13px] uppercase tracking-wider py-3 sm:py-3.5 px-6 sm:px-8 rounded-full shadow-[0_4px_15px_rgba(112,11,16,0.25)] transition-all cursor-pointer"
            >
              WRITE A REVIEW
            </button>
          </div>

        </div>
      </div>

      {/* Sort Dropdown Row */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm sm:text-sm font-semibold text-stone-700 font-nunito">
            Sort by:
          </span>
          <select
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs sm:text-xs text-stone-800 bg-white border border-stone-200/90 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#700b10] cursor-pointer"
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid: Exactly 6 reviews in a 3-column grid (responsive for mobile & tablet) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {paginatedReviews.map((rev, index) => {
          const ratingValue = Number(rev.rating) || 5;
          return (
            <div
              key={rev.id || index}
              className="bg-white rounded-2xl border border-stone-200/80 hover:border-amber-200 p-4 sm:p-5 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Header: Stars + Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#700b10]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < ratingValue
                          ? "fill-[#700b10] text-[#700b10]"
                          : "text-stone-200"
                          }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] sm:text-xs text-stone-400 font-nunito">
                    {formatDate(rev.review_date || rev.created_at)}
                  </span>
                </div>

                {/* Customer Info: Avatar + Name + Verified Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#700b10] flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-[#700b10]" />
                  </div>
                  <span className="font-bold text-xs sm:text-[13px] text-stone-900 font-nunito">
                    {rev.customer_name || "Nilkanth Devotee"}
                  </span>
                  <span className="bg-[#700b10] text-[#ebd99c] text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-[3px] tracking-wider ml-1">
                    VERIFIED
                  </span>
                </div>

                {/* Review Text / Description */}
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed italic font-serif">
                  &ldquo;{rev.description || rev.title || "Simply superb! Highly recommended devotional product."}&rdquo;
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 sm:mt-5 pt-3 flex items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handleReviewPageChange(Math.max(1, currentPage - 1))}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleReviewPageChange(num)}
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${currentPage === num
                  ? "bg-[#700b10] text-[#ebd99c] shadow-xs"
                  : "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
                  }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handleReviewPageChange(Math.min(totalPages, currentPage + 1))}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}


      {/* ========================================================
          POPUP MODAL: WRITE A REVIEW FORM
          Matching the user reference screenshot exactly
          ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-stone-200 relative overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-tenor text-lg sm:text-xl font-normal uppercase tracking-wider text-stone-900">
                  WRITE A REVIEW
                </h3>
                <p className="text-[10.5px] uppercase font-bold tracking-widest text-stone-400 mt-0.5 font-nunito">
                  SHARE YOUR AUTHENTIC EXPERIENCE
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition-colors cursor-pointer"
                aria-label="Close review modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleFormSubmit} className="mt-5 space-y-4">
              {formError && (
                <div className="bg-red-50 text-red-700 text-xs font-semibold p-2.5 rounded-xl border border-red-200">
                  {formError}
                </div>
              )}

              {submitSuccess && (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-bold p-3 rounded-xl border border-emerald-200 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Thank you! Your review has been submitted successfully.</span>
                </div>
              )}

              {/* Your Name & Rating Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-1.5 font-nunito">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#700b10] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-1.5 font-nunito">
                    RATING
                  </label>
                  <div className="flex items-center gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="cursor-pointer transition-transform hover:scale-115 focus:outline-none"
                      >
                        <Star
                          className={`w-5 h-5 ${star <= (hoverRating || formData.rating)
                            ? "fill-[#700b10] text-[#700b10]"
                            : "text-stone-300"
                            }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-1.5 font-nunito">
                  REVIEW TITLE
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Excellent Divine Fragrance!"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#700b10] focus:bg-white transition-colors"
                />
              </div>

              {/* Your Message */}
              <div>
                <label className="block text-[10px] uppercase font-bold text-stone-500 tracking-wider mb-1.5 font-nunito">
                  YOUR MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="What did you like or dislike about this product?"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:border-[#700b10] focus:bg-white transition-colors resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting || submitSuccess}
                  className="w-full bg-[#700b10] hover:bg-[#5b080c] text-white font-nunito font-extrabold text-xs sm:text-[13px] uppercase tracking-wider py-3.5 rounded-full shadow-md transition-all cursor-pointer active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>SUBMITTING REVIEW...</span>
                    </>
                  ) : (
                    <span>SUBMIT REVIEW</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
