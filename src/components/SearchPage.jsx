import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Package,
  FolderOpen,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Filter,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
  X,
} from "lucide-react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { fetchAllSearchData } from "../services/api";

const POPULAR_SUGGESTIONS = [
  "Attar",
  "Agarbatti",
  "Dhoop",
  "Perfume",
  "Air Freshner",
  "Bramshir Hil Malam",
  "Honey",
  "Pooja",
  "Rose",
  "Chandan",
];

export default function SearchPage({
  initialQuery = "",
  onNavigate,
  onSelectProduct,
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState("all"); // 'all' | 'products' | 'collections' | 'blogs'
  const [data, setData] = useState({ products: [], collections: [], blogs: [] });
  const [loading, setLoading] = useState(true);

  // Sync initial query if changed
  useEffect(() => {
    if (initialQuery !== undefined) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  // Load store data
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchAllSearchData()
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed loading search data:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const cleanStr = (str) => (str || "").toLowerCase().trim();

  // Search logic
  const searchResults = useMemo(() => {
    const q = cleanStr(query);
    if (!q) {
      return { products: [], collections: [], blogs: [] };
    }

    const matchedProducts = (data.products || []).filter((p) => {
      const titleMatch = cleanStr(p.title).includes(q);
      const descMatch = cleanStr(p.description).includes(q);
      const handleMatch = cleanStr(p.handle).includes(q);
      const tagMatch = Array.isArray(p.tags) && p.tags.some((t) => cleanStr(t).includes(q));
      return titleMatch || descMatch || handleMatch || tagMatch;
    });

    const matchedCollections = (data.collections || []).filter((c) => {
      const titleMatch = cleanStr(c.title).includes(q);
      const handleMatch = cleanStr(c.handle).includes(q);
      const descMatch = cleanStr(c.description).includes(q);
      return titleMatch || handleMatch || descMatch;
    });

    const matchedBlogs = (data.blogs || []).filter((b) => {
      const titleMatch = cleanStr(b.title).includes(q);
      const excerptMatch = cleanStr(b.excerpt).includes(q);
      const contentMatch = cleanStr(b.content).includes(q);
      return titleMatch || excerptMatch || contentMatch;
    });

    return {
      products: matchedProducts,
      collections: matchedCollections,
      blogs: matchedBlogs,
    };
  }, [query, data]);

  const totalResultsCount =
    searchResults.products.length +
    searchResults.collections.length +
    searchResults.blogs.length;

  const handleProductSelect = (product) => {
    if (onSelectProduct) {
      onSelectProduct(product);
    } else if (onNavigate) {
      onNavigate("product", {
        productHandle: product.handle || product.id,
        product,
      });
    }
  };

  const handleCollectionSelect = (col) => {
    const handle = col.handle || col.slug;
    onNavigate?.("collections", { collectionHandle: handle });
  };

  const handleBlogSelect = (post) => {
    onNavigate?.("blog-post", { postHandle: post.handle });
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen pb-16">
      {/* 1. Search Header Banner */}
      <div className="bg-[#faeed1] border-b border-amber-200/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/80 text-[#700b10] border border-amber-200/80 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            Universal Site Search
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#700b10] mb-4">
            Search Everything in Store
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto mb-6">
            Find sacred pooja items, authentic attars, divine fragrances, collections, and wellness blogs.
          </p>

          {/* Search Input Box */}
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#700b10]">
              <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you looking for today? (e.g. Attar, Dhoop, Malam, Honey...)"
              className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 bg-white border-2 border-amber-200/80 focus:border-[#700b10] rounded-2xl text-stone-800 placeholder-stone-400 font-nunito text-sm sm:text-base shadow-lg outline-none transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 p-1 rounded-full transition-colors"
                aria-label="Clear query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick suggestions pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-stone-600 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#700b10]" /> Popular:
            </span>
            {POPULAR_SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className={`text-xs px-3 py-1 rounded-full border transition-all ${query.toLowerCase() === tag.toLowerCase()
                    ? "bg-[#700b10] text-white border-[#700b10] font-bold shadow-xs"
                    : "bg-white/90 text-stone-700 border-amber-200/80 hover:bg-[#700b10] hover:text-white"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Results Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-stone-500 gap-3">
            <div className="w-10 h-10 border-4 border-amber-200 border-t-[#700b10] rounded-full animate-spin" />
            <p className="text-base font-semibold">Searching catalog, collections and blogs...</p>
          </div>
        ) : !query.trim() ? (
          /* Empty Search State: Browse Categories & Popular */
          <div className="space-y-12 py-6">
            {/* Collections Showcase */}
            {data.collections.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5 border-b border-stone-200/70 pb-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#700b10] flex items-center gap-2">
                      <FolderOpen className="w-5 h-5" />
                      Browse by Collections
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500">
                      Explore our handcrafted collections directly from Nilkanth Dham
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate?.("collections")}
                    className="text-xs sm:text-sm text-[#700b10] hover:underline font-bold flex items-center gap-1"
                  >
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {data.collections.map((col) => (
                    <div
                      key={col.id || col.handle}
                      onClick={() => handleCollectionSelect(col)}
                      className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300"
                    >
                      <div className="aspect-square w-full overflow-hidden bg-stone-100">
                        <img
                          src={col.image_url}
                          alt={col.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3 text-center">
                        <h3 className="font-bold text-sm text-stone-900 group-hover:text-[#700b10] transition-colors">
                          {col.title}
                        </h3>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {col.product_count} Products
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Products preview */}
            {data.products.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-5 border-b border-stone-200/70 pb-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-extrabold text-[#700b10] flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Popular Offerings
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-500">
                      Most revered holy items favored by devotees
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate?.("shop")}
                    className="text-xs sm:text-sm text-[#700b10] hover:underline font-bold flex items-center gap-1"
                  >
                    View Shop
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {data.products.slice(0, 8).map((prod) => (
                    <ProductCard
                      key={prod.id || prod.handle}
                      product={prod}
                      onSelectProduct={handleProductSelect}
                      onNavigate={onNavigate}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Active Query Results */
          <div className="space-y-8">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${activeTab === "all"
                      ? "bg-[#700b10] text-white shadow-xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                    }`}
                >
                  All ({totalResultsCount})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("products")}
                  className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === "products"
                      ? "bg-[#700b10] text-white shadow-xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                    }`}
                >
                  <Package className="w-4 h-4" />
                  Products ({searchResults.products.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("collections")}
                  className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === "collections"
                      ? "bg-[#700b10] text-white shadow-xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                    }`}
                >
                  <FolderOpen className="w-4 h-4" />
                  Collections ({searchResults.collections.length})
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("blogs")}
                  className={`px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 whitespace-nowrap ${activeTab === "blogs"
                      ? "bg-[#700b10] text-white shadow-xs"
                      : "bg-white text-stone-600 border border-stone-200 hover:bg-stone-50"
                    }`}
                >
                  <BookOpen className="w-4 h-4" />
                  Blogs ({searchResults.blogs.length})
                </button>
              </div>

              <div className="text-xs sm:text-sm text-stone-500 font-medium">
                Found {totalResultsCount} results for &ldquo;<span className="text-stone-800 font-bold">{query}</span>&rdquo;
              </div>
            </div>

            {/* Zero Results State */}
            {totalResultsCount === 0 ? (
              <div className="py-16 text-center bg-white rounded-2xl border border-stone-200/80 p-8 shadow-xs max-w-xl mx-auto">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-[#700b10]">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-stone-800 mb-2">
                  No matching results found
                </h3>
                <p className="text-stone-500 text-sm mb-6">
                  We couldn&apos;t find any item matching &ldquo;{query}&rdquo;. Check for spelling errors or try searching with simpler keywords.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {POPULAR_SUGGESTIONS.slice(0, 6).map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => setQuery(term)}
                      className="px-3.5 py-1.5 bg-stone-100 hover:bg-[#700b10] hover:text-white rounded-full text-xs font-semibold transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {/* 1. MATCHED COLLECTIONS */}
                {(activeTab === "all" || activeTab === "collections") &&
                  searchResults.collections.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#700b10] flex items-center gap-2 mb-4 border-b border-stone-200/70 pb-2">
                        <FolderOpen className="w-5 h-5" />
                        Collections ({searchResults.collections.length})
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {searchResults.collections.map((col) => (
                          <div
                            key={col.id || col.handle}
                            onClick={() => handleCollectionSelect(col)}
                            className="group p-3 rounded-xl border border-stone-200/90 hover:border-[#700b10] bg-white cursor-pointer transition-all flex items-center gap-3 shadow-xs hover:shadow-md"
                          >
                            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                              <img
                                src={col.image_url}
                                alt={col.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#700b10] truncate transition-colors">
                                {col.title}
                              </h4>
                              <span className="text-xs text-stone-500">
                                {col.product_count} products
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-[#700b10] group-hover:translate-x-0.5 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* 2. MATCHED PRODUCTS */}
                {(activeTab === "all" || activeTab === "products") &&
                  searchResults.products.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#700b10] flex items-center gap-2 mb-4 border-b border-stone-200/70 pb-2">
                        <Package className="w-5 h-5" />
                        Products ({searchResults.products.length})
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {searchResults.products.map((prod) => (
                          <ProductCard
                            key={prod.id || prod.handle}
                            product={prod}
                            onSelectProduct={handleProductSelect}
                            onNavigate={onNavigate}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {/* 3. MATCHED BLOG ARTICLES */}
                {(activeTab === "all" || activeTab === "blogs") &&
                  searchResults.blogs.length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#700b10] flex items-center gap-2 mb-4 border-b border-stone-200/70 pb-2">
                        <BookOpen className="w-5 h-5" />
                        Blog Articles &amp; News ({searchResults.blogs.length})
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {searchResults.blogs.map((post) => (
                          <div
                            key={post.handle}
                            onClick={() => handleBlogSelect(post)}
                            className="group flex flex-col rounded-2xl border border-stone-200/90 hover:border-[#700b10] bg-white overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all"
                          >
                            {post.image_url && (
                              <div className="w-full aspect-16/9 overflow-hidden bg-stone-100">
                                <img
                                  src={post.image_url}
                                  alt={post.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            )}
                            <div className="p-4 flex flex-col flex-1 justify-between">
                              <div>
                                <h4 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-[#700b10] line-clamp-2 transition-colors mb-1.5">
                                  {post.title}
                                </h4>
                                <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                                  {post.excerpt}
                                </p>
                              </div>
                              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#700b10]">
                                <span>Read Full Article</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
