import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Tag,
  Share2,
  Check,
} from "lucide-react";
import { fetchBlogNews } from "../services/api";

export default function BlogListPage({ onNavigate, onSelectPost }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const postsPerPage = 9;

  useEffect(() => {
    let isMounted = true;
    async function loadAllBlogPosts() {
      setLoading(true);
      try {
        // Fetch up to 100 posts from live backend
        const res = await fetchBlogNews({ page: 1, limit: 100 });
        if (isMounted) {
          if (res && res.data && Array.isArray(res.data.posts)) {
            setPosts(res.data.posts);
          } else {
            setPosts([]);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Failed to load blog posts:", err);
        if (isMounted) setLoading(false);
      }
    }

    loadAllBlogPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter posts by search query
  const filteredPosts = posts.filter((post) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    const titleMatch = post.title?.toLowerCase().includes(query);
    const excerptMatch = post.excerpt?.toLowerCase().includes(query);
    return titleMatch || excerptMatch;
  });

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1;
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const handlePostClick = (post) => {
    if (onSelectPost) {
      onSelectPost(post.handle);
    } else if (onNavigate) {
      onNavigate("blog-post", { postHandle: post.handle });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Nilkanth Dham";
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Nilkanth Dham";
    }
  };

  // Estimate read time
  const getReadTime = (content, excerpt) => {
    const text = (content || excerpt || "").replace(/<[^>]*>/g, " ");
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 180);
    return `${Math.max(2, minutes || 3)} min read`;
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#1c1917] font-nunito pb-16 md:pb-24">
      {/* 1. Breadcrumb Bar */}
      <div className="w-full border-b border-stone-200/70 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-12 py-3.5 flex items-center gap-2 text-xs sm:text-sm text-stone-500">
          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="hover:text-[#700b10] transition-colors font-medium cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-[#700b10] font-semibold">
            Blogs &amp; Articles
          </span>
        </div>
      </div>

      {/* 2. Top Deep Maroon Header Section */}
      <section className="w-full bg-[#700b10] text-white pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 text-center relative overflow-hidden">
        {/* Subtle Decorative Golden Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#b8944d]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ebd99c]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider uppercase text-white mb-3 leading-tight">
            Shri Nilkanth Store Blog
          </h1>
          <div className="w-20 h-0.5 bg-[#ebd99c] mx-auto mb-4" />
          <p className="text-xs sm:text-sm md:text-base text-stone-200 tracking-wide font-nunito max-w-2xl mx-auto leading-relaxed">
            Explore insightful stories, traditional Ayurvedic wellness,
            authentic attar fragrances, and sacred pooja rituals from Bhagvat
            Poojan.
          </p>

          {/* Quick Search Bar inside Hero */}
          <div className="mt-7 max-w-lg mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search blogs, attars, wellness, pooja tips..."
              className="w-full bg-white/95 text-stone-800 placeholder-stone-400 pl-11 pr-4 py-3 sm:py-3.5 rounded-2xl shadow-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ebd99c]"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-bold px-1.5 py-0.5 bg-stone-100 rounded-full"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Floating Content Container */}
      <section className="max-w-[95rem] mx-auto px-3 sm:px-6 lg:px-12 -mt-16 sm:-mt-20 relative z-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 lg:p-10 shadow-[0_12px_45px_rgba(0,0,0,0.08)] border border-stone-200/80">
          {/* Active Search Notice */}
          {searchQuery && (
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-stone-100 mb-5 sm:mb-8 text-xs sm:text-sm text-stone-600">
              <div>
                Showing results for{" "}
                <span className="font-semibold text-[#700b10]">
                  &ldquo;{searchQuery}&rdquo;
                </span>{" "}
                ({filteredPosts.length}{" "}
                {filteredPosts.length === 1 ? "article" : "articles"})
              </div>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="text-xs text-[#700b10] hover:underline font-semibold cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Loading Skeleton State */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="rounded-xl sm:rounded-2xl border border-stone-100 bg-[#ffffff] p-2.5 sm:p-4 animate-pulse flex flex-col gap-2.5 sm:gap-4"
                >
                  <div className="w-full h-36 sm:h-48 md:h-52 lg:h-56 bg-stone-200 rounded-lg sm:rounded-xl" />
                  <div className="h-3 sm:h-4 bg-stone-200 rounded w-1/3" />
                  <div className="h-4 sm:h-6 bg-stone-200 rounded w-5/6" />
                  <div className="h-10 sm:h-16 bg-stone-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : currentPosts.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 px-4">
              <BookOpen className="w-12 h-12 text-[#b8944d] mx-auto mb-3 opacity-60" />
              <h3 className="font-serif text-xl sm:text-2xl text-stone-800 mb-2">
                No Articles Found
              </h3>
              <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
                We couldn&rsquo;t find any articles matching your search query
                &ldquo;{searchQuery}&rdquo;. Try another keyword or browse all
                articles.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
                className="bg-[#700b10] text-[#ebd99c] px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold hover:bg-[#851016] transition-colors cursor-pointer shadow-md"
              >
                View All Articles
              </button>
            </div>
          ) : (
            /* Blog Posts Grid: 2 Column on Mobile & Tablet, 3 Column on Laptop & Desktop */
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-8">
              {currentPosts.map((post, idx) => {
                return (
                  <article
                    key={post.handle || idx}
                    onClick={() => handlePostClick(post)}
                    className="group bg-[#fcfbf9] hover:bg-white rounded-xl sm:rounded-2xl border border-stone-200/80 hover:border-[#b8944d]/50 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer transform hover:-translate-y-1"
                  >
                    {/* Image Thumbnail */}
                    <div className="relative w-full h-36 sm:h-48 md:h-52 lg:h-56 overflow-hidden bg-stone-100">
                      {post.image_url ? (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#700b10]/10 to-[#b8944d]/20 text-[#700b10]">
                          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 mb-1 opacity-50" />
                          <span className="text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
                            Bhagvat Poojan
                          </span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Tag pill badge */}
                      <div className="absolute top-2 left-2 sm:top-3.5 sm:left-3.5">
                        <span className="inline-flex items-center gap-1 bg-[#700b10]/90 backdrop-blur-md text-[#ebd99c] text-[9px] sm:text-[10px] md:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full uppercase tracking-wider shadow-sm">
                          <Tag className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#ebd99c]" />
                          {post.title?.toLowerCase().includes("attar")
                            ? "Attar"
                            : post.title?.toLowerCase().includes("perfume")
                              ? "Perfume"
                              : "Devotion"}
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-3 sm:p-5 lg:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta: Date & Read Time */}
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 text-[10px] sm:text-xs text-stone-400 font-medium mb-1.5 sm:mb-2.5">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b8944d]" />
                            {formatDate(post.published_at)}
                          </span>
                          <span className="hidden sm:inline">•</span>
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#b8944d]" />
                            {getReadTime(post.content, post.excerpt)}
                          </span>
                        </div>

                        {/* Article Title */}
                        <h2 className="font-serif text-sm sm:text-base md:text-lg lg:text-xl font-bold text-stone-900 group-hover:text-[#700b10] transition-colors duration-200 line-clamp-2 leading-snug mb-1.5 sm:mb-2.5">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-stone-600 text-[11px] sm:text-xs md:text-sm line-clamp-2 sm:line-clamp-3 leading-relaxed mb-2.5 sm:mb-4 font-nunito">
                          {post.excerpt ||
                            (post.content
                              ? post.content
                                .replace(/<[^>]*>/g, " ")
                                .slice(0, 140)
                              : "") ||
                            "Read more about this sacred fragrance and spiritual offering from Shri Nilkanth Store."}
                        </p>
                      </div>

                      {/* Footer Read More Button */}
                      <div className="pt-2 sm:pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] sm:text-xs font-bold text-[#700b10] group-hover:text-[#851016]">
                        <span className="inline-flex items-center gap-1 sm:gap-1.5">
                          Read More
                          <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transform group-hover:translate-x-1 transition-transform duration-200" />
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-normal text-stone-400 hidden xs:inline sm:inline">
                          Bhagvat Poojan
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 pt-8 border-t border-stone-200/80 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => {
                    // Show current page, edges, and near current
                    if (
                      num === 1 ||
                      num === totalPages ||
                      (num >= currentPage - 1 && num <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setCurrentPage(num);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${currentPage === num
                              ? "bg-[#700b10] text-[#ebd99c] shadow-sm"
                              : "bg-white text-stone-700 border border-stone-200/80 hover:bg-stone-100"
                            }`}
                        >
                          {num}
                        </button>
                      );
                    }
                    if (num === currentPage - 2 || num === currentPage + 2) {
                      return (
                        <span
                          key={num}
                          className="px-1 text-stone-400 font-bold text-xs"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  },
                )}
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((p) => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer transition-colors shadow-xs"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
