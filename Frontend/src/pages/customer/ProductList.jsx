"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Link } from "react-router-dom"

const ProductList = () => {
  // Existing state
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [error, setError] = useState(null)
  const [sortOption, setSortOption] = useState("featured")
  const [activeFilter, setActiveFilter] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState("grid")
  const [wishlist, setWishlist] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const searchInputRef = useRef(null)

  // NEW ENHANCED STATE
  const [compareList, setCompareList] = useState([])
  const [selectedProducts, setSelectedProducts] = useState([])
  const [bulkMode, setBulkMode] = useState(false)
  const [dietaryFilters, setDietaryFilters] = useState([])
  const [allergenFilters, setAllergenFilters] = useState([])
  const [nutritionFilters, setNutritionFilters] = useState({})
  const [showComparison, setShowComparison] = useState(false)
  const [infiniteScroll, setInfiniteScroll] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [productAlerts, setProductAlerts] = useState([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [showQuickView, setShowQuickView] = useState(null)
  const [recommendations, setRecommendations] = useState([])
  const [userPreferences, setUserPreferences] = useState({})
  const [showExportModal, setShowExportModal] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  // Enhanced food categories with more options
  const foodCategories = [
    { id: "all", name: "All Items", icon: "🍽️", count: 0 },
    { id: "groceries", name: "Groceries", icon: "🛒", count: 0 },
    { id: "fruits", name: "Fresh Fruits", icon: "🍎", count: 0 },
    { id: "vegetables", name: "Vegetables", icon: "🥦", count: 0 },
    { id: "meat", name: "Meat & Poultry", icon: "🍗", count: 0 },
    { id: "dairy", name: "Dairy Products", icon: "🥛", count: 0 },
    { id: "bakery", name: "Bakery Items", icon: "🍞", count: 0 },
    { id: "beverages", name: "Beverages", icon: "🥤", count: 0 },
    { id: "snacks", name: "Snacks", icon: "🍿", count: 0 },
    { id: "frozen", name: "Frozen Foods", icon: "🧊", count: 0 },
  ]

  // NEW: Dietary options
  const dietaryOptions = [
    { id: "vegetarian", name: "Vegetarian", icon: "🥬" },
    { id: "vegan", name: "Vegan", icon: "🌱" },
    { id: "gluten-free", name: "Gluten Free", icon: "🌾" },
    { id: "keto", name: "Keto Friendly", icon: "🥑" },
    { id: "organic", name: "Organic", icon: "🌿" },
    { id: "non-gmo", name: "Non-GMO", icon: "🧬" },
    { id: "sugar-free", name: "Sugar Free", icon: "🚫" },
    { id: "low-sodium", name: "Low Sodium", icon: "🧂" },
  ]

  // NEW: Allergen options
  const allergenOptions = [
    { id: "nuts", name: "Nuts", icon: "🥜" },
    { id: "dairy", name: "Dairy", icon: "🥛" },
    { id: "eggs", name: "Eggs", icon: "🥚" },
    { id: "soy", name: "Soy", icon: "🫘" },
    { id: "wheat", name: "Wheat", icon: "🌾" },
    { id: "fish", name: "Fish", icon: "🐟" },
    { id: "shellfish", name: "Shellfish", icon: "🦐" },
    { id: "sesame", name: "Sesame", icon: "🫘" },
  ]

  // Load all saved data from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem("foodverse-wishlist")
    const savedRecentlyViewed = localStorage.getItem("foodverse-recently-viewed")
    const savedCompareList = localStorage.getItem("foodverse-compare")
    const savedCartItems = localStorage.getItem("foodverse-cart")
    const savedAlerts = localStorage.getItem("foodverse-alerts")
    const savedPreferences = localStorage.getItem("foodverse-preferences")

    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed))
    if (savedCompareList) setCompareList(JSON.parse(savedCompareList))
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems))
    if (savedAlerts) setProductAlerts(JSON.parse(savedAlerts))
    if (savedPreferences) setUserPreferences(JSON.parse(savedPreferences))
  }, [])

  // Enhanced fetch with more product data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://dummyjson.com/products/category/groceries")
        const data = await response.json()

        // Enhanced products with additional data
        const enhancedProducts =
          data.products?.map((product) => ({
            ...product,
            originalPrice: product.price + product.price * 0.2,
            inStock: Math.random() > 0.1,
            fastDelivery: Math.random() > 0.5,
            organic: Math.random() > 0.7,
            newArrival: Math.random() > 0.8,
            // NEW: Enhanced product data
            dietary: dietaryOptions.filter(() => Math.random() > 0.7).map((d) => d.id),
            allergens: allergenOptions.filter(() => Math.random() > 0.8).map((a) => a.id),
            nutrition: {
              calories: Math.floor(Math.random() * 500) + 50,
              protein: Math.floor(Math.random() * 30) + 1,
              carbs: Math.floor(Math.random() * 50) + 5,
              fat: Math.floor(Math.random() * 20) + 1,
              fiber: Math.floor(Math.random() * 15) + 1,
              sugar: Math.floor(Math.random() * 25) + 1,
            },
            reviews: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
              id: i,
              user: `User ${i + 1}`,
              rating: Math.floor(Math.random() * 5) + 1,
              comment: `Great product! Review ${i + 1}`,
              date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
              verified: Math.random() > 0.3,
            })),
            averageRating: product.rating,
            totalReviews: Math.floor(Math.random() * 200) + 10,
            deliveryTime: Math.floor(Math.random() * 60) + 15,
            supplier: `Supplier ${Math.floor(Math.random() * 5) + 1}`,
            origin: ["Local", "Imported", "Regional"][Math.floor(Math.random() * 3)],
            certifications: ["FDA Approved", "USDA Organic", "Fair Trade"].filter(() => Math.random() > 0.6),
          })) || []

        setProducts(enhancedProducts)

        // Generate recommendations based on user preferences
        const recommended = enhancedProducts
          .filter((p) => p.rating > 4.5)
          .sort(() => 0.5 - Math.random())
          .slice(0, 6)
        setRecommendations(recommended)

        // Update category counts
        foodCategories.forEach((category) => {
          if (category.id === "all") {
            category.count = enhancedProducts.length
          } else {
            category.count = enhancedProducts.filter((p) => p.category.toLowerCase().includes(category.id)).length
          }
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // NEW: Search suggestions
  useEffect(() => {
    if (searchQuery.length > 1) {
      const suggestions = products
        .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
        .map((p) => p.title)
      setSearchSuggestions(suggestions)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }, [searchQuery, products])

  // NEW: Infinite scroll
  const loadMoreProducts = useCallback(() => {
    if (infiniteScroll && !loadingMore) {
      setLoadingMore(true)
      setTimeout(() => {
        setItemsPerPage((prev) => prev + 12)
        setLoadingMore(false)
      }, 1000)
    }
  }, [infiniteScroll, loadingMore])

  useEffect(() => {
    if (infiniteScroll) {
      const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
          loadMoreProducts()
        }
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [infiniteScroll, loadMoreProducts])

  // Enhanced sorting function
  const sortProducts = (products) => {
    switch (sortOption) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price)
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price)
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating)
      case "newest":
        return [...products].sort((a, b) => b.newArrival - a.newArrival)
      case "discount":
        return [...products].sort((a, b) => b.originalPrice - b.price - (a.originalPrice - a.price))
      case "popular":
        return [...products].sort((a, b) => b.totalReviews - a.totalReviews)
      case "delivery":
        return [...products].sort((a, b) => a.deliveryTime - b.deliveryTime)
      case "calories":
        return [...products].sort((a, b) => a.nutrition.calories - b.nutrition.calories)
      default:
        return products
    }
  }

  // Enhanced filtering function
  const filteredProducts = sortProducts(
    products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.supplier?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = activeFilter === "all" || product.category.toLowerCase().includes(activeFilter)

      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      const matchesRating = product.rating >= minRating

      // NEW: Enhanced filters
      const matchesDietary =
        dietaryFilters.length === 0 || dietaryFilters.every((filter) => product.dietary.includes(filter))
      const matchesAllergens =
        allergenFilters.length === 0 || !allergenFilters.some((allergen) => product.allergens.includes(allergen))
      const matchesNutrition =
        Object.keys(nutritionFilters).length === 0 ||
        Object.entries(nutritionFilters).every(([key, value]) => {
          if (!value.min && !value.max) return true
          const productValue = product.nutrition[key]
          return (!value.min || productValue >= value.min) && (!value.max || productValue <= value.max)
        })

      return (
        matchesSearch &&
        matchesFilter &&
        matchesPrice &&
        matchesRating &&
        matchesDietary &&
        matchesAllergens &&
        matchesNutrition
      )
    }),
  )

  // Pagination (existing)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = infiniteScroll
    ? filteredProducts.slice(0, itemsPerPage)
    : filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  // NEW: Comparison functions
  const toggleCompare = (product) => {
    const newCompareList = compareList.find((p) => p.id === product.id)
      ? compareList.filter((p) => p.id !== product.id)
      : compareList.length < 4
        ? [...compareList, product]
        : compareList

    setCompareList(newCompareList)
    localStorage.setItem("foodverse-compare", JSON.stringify(newCompareList))
  }

  // NEW: Bulk operations
  const toggleBulkSelect = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const bulkAddToWishlist = () => {
    const newWishlist = [...new Set([...wishlist, ...selectedProducts])]
    setWishlist(newWishlist)
    localStorage.setItem("foodverse-wishlist", JSON.stringify(newWishlist))
    setSelectedProducts([])
    setBulkMode(false)
  }

  const bulkAddToCart = () => {
    const newCartItems = [...cartItems, ...selectedProducts.map((id) => ({ id, quantity: 1, addedAt: Date.now() }))]
    setCartItems(newCartItems)
    localStorage.setItem("foodverse-cart", JSON.stringify(newCartItems))
    setSelectedProducts([])
    setBulkMode(false)
  }

  // Existing functions (keeping all)
  const toggleWishlist = (productId) => {
    const newWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId]

    setWishlist(newWishlist)
    localStorage.setItem("foodverse-wishlist", JSON.stringify(newWishlist))
  }

  const addToRecentlyViewed = (product) => {
    const newRecentlyViewed = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 5)
    setRecentlyViewed(newRecentlyViewed)
    localStorage.setItem("foodverse-recently-viewed", JSON.stringify(newRecentlyViewed))
  }

  const clearAllFilters = () => {
    setActiveFilter("all")
    setSearchQuery("")
    setSortOption("featured")
    setPriceRange([0, 1000])
    setMinRating(0)
    setDietaryFilters([])
    setAllergenFilters([])
    setNutritionFilters({})
    setCurrentPage(1)
  }

  // NEW: Export functionality
  const exportProducts = (format) => {
    const dataToExport = filteredProducts.map((p) => ({
      name: p.title,
      price: p.price,
      rating: p.rating,
      category: p.category,
      brand: p.brand,
      inStock: p.inStock,
    }))

    if (format === "json") {
      const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.url = url
      a.download = "products.json"
      a.click()
    } else if (format === "csv") {
      const csv = [
        Object.keys(dataToExport[0]).join(","),
        ...dataToExport.map((row) => Object.values(row).join(",")),
      ].join("\n")
      const blob = new Blob([csv], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "products.csv"
      a.click()
    }
    setShowExportModal(false)
  }

  // Keyboard shortcuts (existing + new)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
      if (e.ctrlKey && e.key === "b") {
        e.preventDefault()
        setBulkMode(!bulkMode)
      }
      if (e.ctrlKey && e.key === "c") {
        e.preventDefault()
        setShowComparison(!showComparison)
      }
      if (e.key === "Escape") {
        setShowSuggestions(false)
        setShowQuickView(null)
        setShowExportModal(false)
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [bulkMode, showComparison])

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 inline-block max-w-md">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-red-600 mb-3">Menu Unavailable</h2>
          <p className="text-red-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all transform hover:scale-105 font-medium"
          >
            🔄 Refresh Menu
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs (existing) */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 hover:text-orange-600 transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/products" className="text-gray-500 hover:text-orange-600 transition-colors">
                Products
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 font-medium">
                {activeFilter === "all" ? "All Items" : foodCategories.find((c) => c.id === activeFilter)?.name}
              </span>
            </div>

            {/* NEW: Quick actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setInfiniteScroll(!infiniteScroll)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  infiniteScroll ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {infiniteScroll ? "📜 Infinite" : "📄 Pages"}
              </button>
              <button
                onClick={() => setBulkMode(!bulkMode)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  bulkMode ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {bulkMode ? "✅ Bulk Mode" : "☐ Select"}
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all"
              >
                📤 Export
              </button>
            </div>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header (existing) */}
        <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh Food Market</h1>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-6">
              Discover premium quality ingredients delivered fresh to your doorstep
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">🚚 Free delivery over $50</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">🌱 100% Organic options</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">⚡ Same-day delivery</div>
              {/* NEW: Additional badges */}
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">🔍 Smart search</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">📊 Compare products</div>
            </div>
          </div>
        </div>

        {/* NEW: Bulk actions bar */}
        {bulkMode && selectedProducts.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium text-blue-800">{selectedProducts.length} items selected</span>
              <div className="flex gap-2">
                <button
                  onClick={bulkAddToWishlist}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm"
                >
                  ❤️ Add to Wishlist
                </button>
                <button
                  onClick={bulkAddToCart}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedProducts([])
                setBulkMode(false)
              }}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              ✕ Cancel
            </button>
          </div>
        )}

        {/* NEW: Comparison bar */}
        {compareList.length > 0 && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium text-purple-800">{compareList.length} items to compare</span>
              <div className="flex gap-2 overflow-x-auto">
                {compareList.map((product) => (
                  <div key={product.id} className="flex items-center gap-2 bg-white rounded-lg px-3 py-1 min-w-max">
                    <img
                      src={product.thumbnail || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                      alt={product.title}
                      className="w-6 h-6 rounded object-cover"
                    />
                    <span className="text-sm">{product.title.slice(0, 20)}...</span>
                    <button onClick={() => toggleCompare(product)} className="text-red-500 hover:text-red-700 text-xs">
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => setShowComparison(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all text-sm"
            >
              📊 Compare Now
            </button>
          </div>
        )}

        {/* Mobile Filter Toggle (existing) */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>🔍</span>
              <span>Filters & Search</span>
            </span>
            <span className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`}>▼</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Sidebar (existing + new) */}
          <div className={`lg:w-80 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-8 space-y-6">
              {/* Enhanced Search (existing + new) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🔍</span> Smart Search
                </h3>
                <div className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search food items... (Ctrl+K)"
                    className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute right-4 top-3.5 text-gray-400">
                    {searchQuery ? (
                      <button onClick={() => setSearchQuery("")} className="hover:text-gray-600 transition-colors">
                        ✕
                      </button>
                    ) : (
                      <span>🔍</span>
                    )}
                  </div>

                  {/* NEW: Search suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSearchQuery(suggestion)
                            setShowSuggestions(false)
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {searchQuery && (
                  <div className="mt-2 text-sm text-gray-600">
                    Found {filteredProducts.length} results for "{searchQuery}"
                  </div>
                )}
              </div>

              {/* Categories (existing) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🗂️</span> Categories
                </h3>
                <div className="space-y-2">
                  {foodCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setActiveFilter(category.id)
                        setCurrentPage(1)
                      }}
                      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
                        activeFilter === category.id
                          ? "bg-orange-600 text-white shadow-lg transform scale-105"
                          : "bg-gray-50 text-gray-800 hover:bg-gray-100 hover:scale-102"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          activeFilter === category.id ? "bg-white/20" : "bg-gray-200"
                        }`}
                      >
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* NEW: Dietary Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🥗</span> Dietary Preferences
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {dietaryOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setDietaryFilters((prev) =>
                          prev.includes(option.id) ? prev.filter((id) => id !== option.id) : [...prev, option.id],
                        )
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        dietaryFilters.includes(option.id)
                          ? "bg-green-600 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span className="text-xs">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* NEW: Allergen Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⚠️</span> Exclude Allergens
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {allergenOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setAllergenFilters((prev) =>
                          prev.includes(option.id) ? prev.filter((id) => id !== option.id) : [...prev, option.id],
                        )
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        allergenFilters.includes(option.id)
                          ? "bg-red-600 text-white"
                          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span>{option.icon}</span>
                      <span className="text-xs">{option.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* NEW: Advanced Filters Toggle */}
              <button
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all flex items-center justify-between"
              >
                <span className="font-medium text-gray-700">🔧 Advanced Filters</span>
                <span className={`transform transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}>▼</span>
              </button>

              {/* NEW: Advanced Filters */}
              {showAdvancedFilters && (
                <>
                  {/* Nutrition Filters */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border">
                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                      <span>📊</span> Nutrition Range
                    </h3>
                    <div className="space-y-4">
                      {["calories", "protein", "carbs", "fat"].map((nutrient) => (
                        <div key={nutrient}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                            {nutrient} {nutrient === "calories" ? "(kcal)" : "(g)"}
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              placeholder="Min"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              onChange={(e) =>
                                setNutritionFilters((prev) => ({
                                  ...prev,
                                  [nutrient]: { ...prev[nutrient], min: Number.parseInt(e.target.value) || 0 },
                                }))
                              }
                            />
                            <input
                              type="number"
                              placeholder="Max"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                              onChange={(e) =>
                                setNutritionFilters((prev) => ({
                                  ...prev,
                                  [nutrient]: { ...prev[nutrient], max: Number.parseInt(e.target.value) || 999 },
                                }))
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Price Range Filter (existing) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>💰</span> Price Range
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Rating Filter (existing) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>⭐</span> Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1, 0].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setMinRating(rating)}
                      className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
                        minRating === rating ? "bg-orange-100 text-orange-800" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                            ⭐
                          </span>
                        ))}
                      </div>
                      <span className="text-sm">{rating === 0 ? "All ratings" : `${rating}+ stars`}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enhanced Sorting (existing + new) */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🔃</span> Sort By
                </h3>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 text-gray-800 bg-white"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">✨ Featured</option>
                  <option value="popular">🔥 Most Popular</option>
                  <option value="newest">🆕 Newest First</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💎 Price: High to Low</option>
                  <option value="rating">⭐ Top Rated</option>
                  <option value="discount">🏷️ Best Deals</option>
                  <option value="delivery">🚚 Fastest Delivery</option>
                  <option value="calories">🔥 Lowest Calories</option>
                </select>
              </div>

              {/* Clear Filters (existing) */}
              <button
                onClick={clearAllFilters}
                className="w-full px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
              >
                🗑️ Clear All Filters
              </button>

              {/* Add Product Button (existing) */}
              <Link
                to="/admin/products/new"
                className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-medium bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-xl">+</span>
                <span>Add New Product</span>
              </Link>
            </div>
          </div>

          {/* Main Content (existing + enhanced) */}
          <div className="flex-1">
            {/* Results Header with View Toggle (existing + enhanced) */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {activeFilter === "all" ? "All Products" : foodCategories.find((c) => c.id === activeFilter)?.name}
                </h2>
                {!loading && filteredProducts.length > 0 && (
                  <p className="text-gray-600">
                    {infiniteScroll
                      ? `Showing ${paginatedProducts.length} of ${filteredProducts.length} items`
                      : `Showing ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, filteredProducts.length)} of ${filteredProducts.length} items`}
                  </p>
                )}
              </div>

              {/* Enhanced View Mode Toggle */}
              <div className="flex items-center gap-4">
                {/* NEW: Additional view options */}
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Shortcuts:</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+K</kbd>
                  <span className="text-gray-400">Search</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+B</kbd>
                  <span className="text-gray-400">Bulk</span>
                </div>

                <div className="flex items-center gap-2 bg-white rounded-xl p-1 border">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      viewMode === "grid" ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-sm">⊞ Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      viewMode === "list" ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-sm">☰ List</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State with Skeleton (existing) */}
            {loading && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border animate-pulse">
                      <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
                      <div className="space-y-3">
                        <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                        <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                        <div className="bg-gray-200 h-6 rounded w-1/3"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State (existing) */}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border">
                <div className="text-8xl mb-6 text-gray-200">🔍</div>
                <h3 className="text-3xl font-bold mb-4 text-gray-800">No products found</h3>
                <p className="mb-8 text-gray-600 max-w-md mx-auto text-lg">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  className="px-8 py-4 rounded-xl font-medium bg-orange-600 text-white hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
                  onClick={clearAllFilters}
                >
                  🔄 Reset All Filters
                </button>
              </div>
            )}

            {/* Enhanced Product Grid/List - IMPROVED RESPONSIVE DESIGN */}
            {!loading && paginatedProducts.length > 0 && (
              <div className="space-y-6">
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6"
                      : "space-y-4"
                  }
                >
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl transition-all duration-300 group relative ${
                        viewMode === "list" 
                          ? "flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4" 
                          : "hover:-translate-y-1 flex flex-col h-full"
                      } ${selectedProducts.includes(product.id) ? "ring-2 ring-blue-500" : ""}`}
                    >
                      {/* NEW: Bulk select checkbox */}
                      {bulkMode && (
                        <div className="absolute top-2 left-2 z-10">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => toggleBulkSelect(product.id)}
                            className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500"
                          />
                        </div>
                      )}

                      {/* Product Image - RESPONSIVE IMPROVEMENTS */}
                      <div
                        className={`relative ${
                          viewMode === "list" 
                            ? "w-full sm:w-32 h-32 sm:h-24 flex-shrink-0" 
                            : "aspect-square w-full"
                        }`}
                      >
                        <img
                          src={product.thumbnail || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                          alt={product.title}
                          className={`w-full h-full object-cover ${
                            viewMode === "grid" ? "group-hover:scale-105" : "rounded-xl"
                          } transition-transform duration-300`}
                          loading="lazy"
                          onClick={() => addToRecentlyViewed(product)}
                        />

                        {/* Enhanced Badges - MOBILE OPTIMIZED */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.newArrival && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              NEW
                            </span>
                          )}
                          {product.organic && (
                            <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              🌱 ORGANIC
                            </span>
                          )}
                          {!product.inStock && (
                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              OUT
                            </span>
                          )}
                          {product.fastDelivery && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                              ⚡
                            </span>
                          )}
                        </div>

                        {/* Enhanced Action Buttons - MOBILE OPTIMIZED */}
                        <div className="absolute top-2 right-2 flex flex-col gap-1">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className={`p-2 rounded-full transition-all ${
                              wishlist.includes(product.id)
                                ? "bg-red-500 text-white"
                                : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                            }`}
                          >
                            <span className="text-sm">❤️</span>
                          </button>

                          <button
                            onClick={() => toggleCompare(product)}
                            className={`p-2 rounded-full transition-all ${
                              compareList.find((p) => p.id === product.id)
                                ? "bg-purple-500 text-white"
                                : "bg-white/80 text-gray-600 hover:bg-purple-500 hover:text-white"
                            }`}
                          >
                            <span className="text-sm">📊</span>
                          </button>
                        </div>

                        {/* Quick View Button - GRID ONLY */}
                        {viewMode === "grid" && (
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Link
                              to={`/products/${product.id}`}
                              className="bg-white text-gray-800 px-3 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
                            >
                              👁️ View
                            </Link>
                            <button
                              onClick={() => setShowQuickView(product)}
                              className="bg-orange-600 text-white px-3 py-2 rounded-lg font-medium hover:bg-orange-700 transition-colors text-sm"
                            >
                              ⚡ Quick
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Product Info - RESPONSIVE LAYOUT */}
                      <div className={`${viewMode === "grid" ? "p-4 flex-1 flex flex-col" : "flex-1 min-w-0"}`}>
                        {/* Title and Quick Info */}
                        <div className="flex items-start justify-between mb-2">
                          <Link
                            to={`/products/${product.id}`}
                            className="font-bold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2 flex-1 min-w-0"
                            onClick={() => addToRecentlyViewed(product)}
                          >
                            {product.title}
                          </Link>
                          <div className="flex gap-1 ml-2 flex-shrink-0">
                            {product.fastDelivery && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                ⚡ {product.deliveryTime}min
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Brand & Supplier Info - RESPONSIVE */}
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {product.brand && <span className="text-sm text-gray-500">{product.brand}</span>}
                          {product.supplier && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {product.supplier}
                            </span>
                          )}
                          {product.origin && (
                            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                              {product.origin}
                            </span>
                          )}
                        </div>

                        {/* Rating with Reviews */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 truncate">
                            {product.rating} ({product.totalReviews})
                          </span>
                        </div>

                        {/* Dietary & Nutrition Info - MOBILE OPTIMIZED */}
                        {product.dietary.length > 0 && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1 mb-2">
                              {product.dietary.slice(0, viewMode === "list" ? 2 : 3).map((diet) => {
                                const option = dietaryOptions.find((d) => d.id === diet)
                                return (
                                  <span
                                    key={diet}
                                    className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"
                                  >
                                    <span>{option?.icon}</span>
                                    <span className="hidden sm:inline">{option?.name}</span>
                                  </span>
                                )
                              })}
                              {product.dietary.length > (viewMode === "list" ? 2 : 3) && (
                                <span className="text-xs text-gray-500">+{product.dietary.length - (viewMode === "list" ? 2 : 3)}</span>
                              )}
                            </div>
                            {viewMode === "list" && (
                              <div className="text-xs text-gray-600">
                                {product.nutrition.calories} cal • {product.nutrition.protein}g protein • {product.nutrition.carbs}g carbs
                              </div>
                            )}
                          </div>
                        )}

                        {/* Description (List view only) */}
                        {viewMode === "list" && (
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                        )}

                        {/* Price and Actions - RESPONSIVE IMPROVEMENTS */}
                        <div className={`mt-auto ${viewMode === "list" ? "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" : ""}`}>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xl font-bold text-orange-600">${product.price}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <>
                                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                              </>
                            )}
                          </div>

                          {/* Action Buttons - MOBILE FIRST DESIGN */}
                          <div className="flex items-center gap-2 mt-3 sm:mt-0">
                            {viewMode === "list" && (
                              <Link
                                to={`/products/${product.id}`}
                                className="flex-1 sm:flex-none px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm text-center"
                                onClick={() => addToRecentlyViewed(product)}
                              >
                                View Details
                              </Link>
                            )}
                            <button
                              disabled={!product.inStock}
                              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-medium transition-all text-sm text-center ${
                                product.inStock
                                  ? "bg-orange-600 text-white hover:bg-orange-700 transform hover:scale-105"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {product.inStock ? (
                                <>
                                  <span className="sm:hidden">🛒 Add</span>
                                  <span className="hidden sm:inline">🛒 Add to Cart</span>
                                </>
                              ) : (
                                <>
                                  <span className="sm:hidden">Out</span>
                                  <span className="hidden sm:inline">Out of Stock</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Certifications - MOBILE OPTIMIZED */}
                        {product.certifications.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {product.certifications.slice(0, 2).map((cert, index) => (
                              <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                ✓ {cert}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load more for infinite scroll */}
                {infiniteScroll && loadingMore && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading more products...</p>
                  </div>
                )}

                {/* Enhanced Pagination (only show if not infinite scroll) */}
                {!infiniteScroll && totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      ← Previous
                    </button>

                    <div className="flex items-center gap-1 flex-wrap">
                      {[...Array(Math.min(5, totalPages))].map((_, i) => {
                        const pageNum = i + 1
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                              currentPage === pageNum ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {pageNum}
                          </button>
                        )
                      })}
                      {totalPages > 5 && (
                        <>
                          <span className="px-2 text-gray-400">...</span>
                          <button
                            onClick={() => setCurrentPage(totalPages)}
                            className={`px-4 py-2 rounded-lg transition-all ${
                              currentPage === totalPages
                                ? "bg-orange-600 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Recently Viewed Section - MOBILE OPTIMIZED */}
            {recentlyViewed.length > 0 && (
              <div className="mt-12 bg-white rounded-2xl p-6 border">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>👁️</span> Recently Viewed
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {recentlyViewed.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`} className="group block">
                      <div className="aspect-square rounded-xl overflow-hidden mb-2">
                        <img
                          src={product.thumbnail || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {product.title}
                      </p>
                      <p className="text-sm text-orange-600 font-bold">${product.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations Section - MOBILE OPTIMIZED */}
            {recommendations.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-6 border">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span>🎯</span> Recommended for You
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {recommendations.map((product) => (
                    <Link key={product.id} to={`/products/${product.id}`} className="group block">
                      <div className="aspect-square rounded-xl overflow-hidden mb-2 relative">
                        <img
                          src={product.thumbnail || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          ⭐ {product.rating}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {product.title}
                      </p>
                      <p className="text-sm text-orange-600 font-bold">${product.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Comparison Modal - MOBILE RESPONSIVE */}
      {showComparison && compareList.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Product Comparison</h2>
              <button onClick={() => setShowComparison(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {compareList.map((product) => (
                  <div key={product.id} className="border rounded-xl p-4">
                    <img
                      src={product.thumbnail || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-bold text-gray-800 mb-2">{product.title}</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="font-bold text-orange-600">${product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rating:</span>
                        <span>⭐ {product.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Brand:</span>
                        <span>{product.brand || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calories:</span>
                        <span>{product.nutrition.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <span>{product.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery:</span>
                        <span>{product.deliveryTime} min</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleCompare(product)}
                      className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal - MOBILE RESPONSIVE */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Quick View</h2>
              <button onClick={() => setShowQuickView(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={showQuickView.thumbnail || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                    alt={showQuickView.title}
                    className="w-full h-64 object-cover rounded-xl mb-4"
                  />
                  <div className="grid grid-cols-4 gap-2">
                    {showQuickView.images?.slice(0, 4).map((img, index) => (
                      <img
                        key={index}
                        src={img || "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg"}
                        alt={`${showQuickView.title} ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{showQuickView.title}</h3>
                  <p className="text-gray-600 mb-4">{showQuickView.description}</p>

                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-3xl font-bold text-orange-600">${showQuickView.price}</span>
                    {showQuickView.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">${showQuickView.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < Math.floor(showQuickView.rating) ? "text-yellow-400" : "text-gray-300"}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-600">({showQuickView.totalReviews} reviews)</span>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-bold text-gray-800 mb-2">Nutrition Facts (per serving)</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>Calories:</span>
                        <span>{showQuickView.nutrition.calories} kcal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <span>{showQuickView.nutrition.protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carbs:</span>
                        <span>{showQuickView.nutrition.carbs}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fat:</span>
                        <span>{showQuickView.nutrition.fat}g</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-medium">
                      🛒 Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(showQuickView.id)}
                      className={`px-6 py-3 rounded-xl transition-colors font-medium ${
                        wishlist.includes(showQuickView.id)
                          ? "bg-red-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal - MOBILE RESPONSIVE */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-800">Export Products</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">Export {filteredProducts.length} filtered products</p>
              <div className="space-y-3">
                <button
                  onClick={() => exportProducts("json")}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>📄</span>
                  <span>Export as JSON</span>
                </button>
                <button
                  onClick={() => exportProducts("csv")}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>📊</span>
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
}

export default ProductList


// import { useEffect, useState, useRef } from "react"
// import { Link } from "react-router-dom"

// const ProductList = () => {
//   const [products, setProducts] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [error, setError] = useState(null)
//   const [sortOption, setSortOption] = useState("featured")
//   const [activeFilter, setActiveFilter] = useState("all")
//   const [priceRange, setPriceRange] = useState([0, 1000])
//   const [minRating, setMinRating] = useState(0)
//   const [viewMode, setViewMode] = useState("grid") // grid or list
//   const [wishlist, setWishlist] = useState([])
//   const [recentlyViewed, setRecentlyViewed] = useState([])
//   const [showFilters, setShowFilters] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(12)
//   const searchInputRef = useRef(null)

//   // Enhanced food categories with more options
//   const foodCategories = [
//     { id: "all", name: "All Items", icon: "🍽️", count: 0 },
//     { id: "groceries", name: "Groceries", icon: "🛒", count: 0 },
//     { id: "fruits", name: "Fresh Fruits", icon: "🍎", count: 0 },
//     { id: "vegetables", name: "Vegetables", icon: "🥦", count: 0 },
//     { id: "meat", name: "Meat & Poultry", icon: "🍗", count: 0 },
//     { id: "dairy", name: "Dairy Products", icon: "🥛", count: 0 },
//     { id: "bakery", name: "Bakery Items", icon: "🍞", count: 0 },
//     { id: "beverages", name: "Beverages", icon: "🥤", count: 0 },
//   ]

//   // Load wishlist and recently viewed from localStorage
//   useEffect(() => {
//     const savedWishlist = localStorage.getItem("foodverse-wishlist")
//     const savedRecentlyViewed = localStorage.getItem("foodverse-recently-viewed")

//     if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
//     if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed))
//   }, [])

//   // Fetch products data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true)
//         const response = await fetch("https://dummyjson.com/products/category/groceries")
//         const data = await response.json()

//         // Enhance products with additional data
//         const enhancedProducts =
//           data.products?.map((product) => ({
//             ...product,
//             originalPrice: product.price + product.price * 0.2, // Add original price for discount display
//             inStock: Math.random() > 0.1, // 90% chance of being in stock
//             fastDelivery: Math.random() > 0.5, // 50% chance of fast delivery
//             organic: Math.random() > 0.7, // 30% chance of being organic
//             newArrival: Math.random() > 0.8, // 20% chance of being new
//           })) || []

//         setProducts(enhancedProducts)

//         // Update category counts
//         foodCategories.forEach((category) => {
//           if (category.id === "all") {
//             category.count = enhancedProducts.length
//           } else {
//             category.count = enhancedProducts.filter((p) => p.category.toLowerCase().includes(category.id)).length
//           }
//         })
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchData()
//   }, [])

//   // Enhanced sorting function
//   const sortProducts = (products) => {
//     switch (sortOption) {
//       case "price-low":
//         return [...products].sort((a, b) => a.price - b.price)
//       case "price-high":
//         return [...products].sort((a, b) => b.price - a.price)
//       case "rating":
//         return [...products].sort((a, b) => b.rating - a.rating)
//       case "newest":
//         return [...products].sort((a, b) => b.newArrival - a.newArrival)
//       case "discount":
//         return [...products].sort((a, b) => b.originalPrice - b.price - (a.originalPrice - a.price))
//       case "popular":
//         return [...products].sort((a, b) => b.stock - a.stock)
//       default:
//         return products
//     }
//   }

//   // Enhanced filtering function
//   const filteredProducts = sortProducts(
//     products.filter((product) => {
//       const matchesSearch =
//         product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         product.brand?.toLowerCase().includes(searchQuery.toLowerCase())

//       const matchesFilter = activeFilter === "all" || product.category.toLowerCase().includes(activeFilter)

//       const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
//       const matchesRating = product.rating >= minRating

//       return matchesSearch && matchesFilter && matchesPrice && matchesRating
//     }),
//   )

//   // Pagination
//   const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

//   // Wishlist functions
//   const toggleWishlist = (productId) => {
//     const newWishlist = wishlist.includes(productId)
//       ? wishlist.filter((id) => id !== productId)
//       : [...wishlist, productId]

//     setWishlist(newWishlist)
//     localStorage.setItem("foodverse-wishlist", JSON.stringify(newWishlist))
//   }

//   // Add to recently viewed
//   const addToRecentlyViewed = (product) => {
//     const newRecentlyViewed = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 5)
//     setRecentlyViewed(newRecentlyViewed)
//     localStorage.setItem("foodverse-recently-viewed", JSON.stringify(newRecentlyViewed))
//   }

//   // Clear all filters
//   const clearAllFilters = () => {
//     setActiveFilter("all")
//     setSearchQuery("")
//     setSortOption("featured")
//     setPriceRange([0, 1000])
//     setMinRating(0)
//     setCurrentPage(1)
//   }

//   // Keyboard shortcuts
//   useEffect(() => {
//     const handleKeyPress = (e) => {
//       if (e.ctrlKey && e.key === "k") {
//         e.preventDefault()
//         searchInputRef.current?.focus()
//       }
//     }

//     document.addEventListener("keydown", handleKeyPress)
//     return () => document.removeEventListener("keydown", handleKeyPress)
//   }, [])

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-8 text-center">
//         <div className="bg-red-50 border border-red-200 rounded-2xl p-8 inline-block max-w-md">
//           <div className="text-6xl mb-4">😞</div>
//           <h2 className="text-2xl font-bold text-red-600 mb-3">Menu Unavailable</h2>
//           <p className="text-red-500 mb-6">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all transform hover:scale-105 font-medium"
//           >
//             🔄 Refresh Menu
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumbs */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <nav className="flex items-center space-x-2 text-sm">
//             <Link to="/" className="text-gray-500 hover:text-orange-600 transition-colors">
//               Home
//             </Link>
//             <span className="text-gray-400">/</span>
//             <Link to="/products" className="text-gray-500 hover:text-orange-600 transition-colors">
//               Products
//             </Link>
//             <span className="text-gray-400">/</span>
//             <span className="text-gray-900 font-medium">
//               {activeFilter === "all" ? "All Items" : foodCategories.find((c) => c.id === activeFilter)?.name}
//             </span>
//           </nav>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Enhanced Header */}
//         <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
//           <div className="absolute inset-0 bg-black opacity-10"></div>
//           <div className="relative z-10 text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-4">Fresh Food Market</h1>
//             <p className="text-xl text-orange-100 max-w-2xl mx-auto mb-6">
//               Discover premium quality ingredients delivered fresh to your doorstep
//             </p>
//             <div className="flex flex-wrap justify-center gap-4 text-sm">
//               <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">🚚 Free delivery over $50</div>
//               <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">🌱 100% Organic options</div>
//               <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">⚡ Same-day delivery</div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Filter Toggle */}
//         <div className="lg:hidden mb-6">
//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 flex items-center justify-between"
//           >
//             <span className="flex items-center gap-2">
//               <span>🔍</span>
//               <span>Filters & Search</span>
//             </span>
//             <span className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`}>▼</span>
//           </button>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Enhanced Sidebar */}
//           <div className={`lg:w-80 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
//             <div className="sticky top-8 space-y-6">
//               {/* Enhanced Search */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border">
//                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>🔍</span> Search Products
//                 </h3>
//                 <div className="relative">
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     placeholder="Search food items... (Ctrl+K)"
//                     className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 pr-12 transition-all"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                   />
//                   <div className="absolute right-4 top-3.5 text-gray-400">
//                     {searchQuery ? (
//                       <button onClick={() => setSearchQuery("")} className="hover:text-gray-600 transition-colors">
//                         ✕
//                       </button>
//                     ) : (
//                       <span>🔍</span>
//                     )}
//                   </div>
//                 </div>
//                 {searchQuery && (
//                   <div className="mt-2 text-sm text-gray-600">
//                     Found {filteredProducts.length} results for "{searchQuery}"
//                   </div>
//                 )}
//               </div>

//               {/* Enhanced Categories */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border">
//                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>🗂️</span> Categories
//                 </h3>
//                 <div className="space-y-2">
//                   {foodCategories.map((category) => (
//                     <button
//                       key={category.id}
//                       onClick={() => {
//                         setActiveFilter(category.id)
//                         setCurrentPage(1)
//                       }}
//                       className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
//                         activeFilter === category.id
//                           ? "bg-orange-600 text-white shadow-lg transform scale-105"
//                           : "bg-gray-50 text-gray-800 hover:bg-gray-100 hover:scale-102"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3">
//                         <span className="text-lg">{category.icon}</span>
//                         <span className="font-medium">{category.name}</span>
//                       </div>
//                       <span
//                         className={`text-xs px-2 py-1 rounded-full ${
//                           activeFilter === category.id ? "bg-white/20" : "bg-gray-200"
//                         }`}
//                       >
//                         {category.count}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price Range Filter */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border">
//                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>💰</span> Price Range
//                 </h3>
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between text-sm text-gray-600">
//                     <span>${priceRange[0]}</span>
//                     <span>${priceRange[1]}</span>
//                   </div>
//                   <input
//                     type="range"
//                     min="0"
//                     max="1000"
//                     value={priceRange[1]}
//                     onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
//                     className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
//                   />
//                   <div className="flex gap-2">
//                     <input
//                       type="number"
//                       placeholder="Min"
//                       value={priceRange[0]}
//                       onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Max"
//                       value={priceRange[1]}
//                       onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 1000])}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Rating Filter */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border">
//                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>⭐</span> Minimum Rating
//                 </h3>
//                 <div className="space-y-2">
//                   {[4, 3, 2, 1, 0].map((rating) => (
//                     <button
//                       key={rating}
//                       onClick={() => setMinRating(rating)}
//                       className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg transition-all ${
//                         minRating === rating ? "bg-orange-100 text-orange-800" : "hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex">
//                         {[...Array(5)].map((_, i) => (
//                           <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
//                             ⭐
//                           </span>
//                         ))}
//                       </div>
//                       <span className="text-sm">{rating === 0 ? "All ratings" : `${rating}+ stars`}</span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Enhanced Sorting */}
//               <div className="bg-white rounded-2xl p-6 shadow-sm border">
//                 <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>🔃</span> Sort By
//                 </h3>
//                 <select
//                   className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-orange-500 text-gray-800 bg-white"
//                   value={sortOption}
//                   onChange={(e) => setSortOption(e.target.value)}
//                 >
//                   <option value="featured">✨ Featured</option>
//                   <option value="popular">🔥 Most Popular</option>
//                   <option value="newest">🆕 Newest First</option>
//                   <option value="price-low">💰 Price: Low to High</option>
//                   <option value="price-high">💎 Price: High to Low</option>
//                   <option value="rating">⭐ Top Rated</option>
//                   <option value="discount">🏷️ Best Deals</option>
//                 </select>
//               </div>

//               {/* Clear Filters */}
//               <button
//                 onClick={clearAllFilters}
//                 className="w-full px-6 py-3 rounded-xl font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
//               >
//                 🗑️ Clear All Filters
//               </button>

//               {/* Add Product Button */}
//               <Link
//                 to="/admin/products/new"
//                 className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-medium bg-gradient-to-r from-orange-600 to-red-600 text-white hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
//               >
//                 <span className="text-xl">+</span>
//                 <span>Add New Product</span>
//               </Link>
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Results Header with View Toggle */}
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-1">
//                   {activeFilter === "all" ? "All Products" : foodCategories.find((c) => c.id === activeFilter)?.name}
//                 </h2>
//                 {!loading && filteredProducts.length > 0 && (
//                   <p className="text-gray-600">
//                     Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProducts.length)} of{" "}
//                     {filteredProducts.length} items
//                   </p>
//                 )}
//               </div>

//               {/* View Mode Toggle */}
//               <div className="flex items-center gap-2 bg-white rounded-xl p-1 border">
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     viewMode === "grid" ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className="text-sm">⊞ Grid</span>
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     viewMode === "list" ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
//                   }`}
//                 >
//                   <span className="text-sm">☰ List</span>
//                 </button>
//               </div>
//             </div>

//             {/* Loading State with Skeleton */}
//             {loading && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                   {[...Array(8)].map((_, i) => (
//                     <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border animate-pulse">
//                       <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
//                       <div className="space-y-3">
//                         <div className="bg-gray-200 h-4 rounded w-3/4"></div>
//                         <div className="bg-gray-200 h-3 rounded w-1/2"></div>
//                         <div className="bg-gray-200 h-6 rounded w-1/3"></div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Empty State */}
//             {!loading && filteredProducts.length === 0 && (
//               <div className="text-center py-20 bg-white rounded-2xl border">
//                 <div className="text-8xl mb-6 text-gray-200">🔍</div>
//                 <h3 className="text-3xl font-bold mb-4 text-gray-800">No products found</h3>
//                 <p className="mb-8 text-gray-600 max-w-md mx-auto text-lg">
//                   We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
//                 </p>
//                 <button
//                   className="px-8 py-4 rounded-xl font-medium bg-orange-600 text-white hover:bg-orange-700 transition-all transform hover:scale-105 shadow-lg"
//                   onClick={clearAllFilters}
//                 >
//                   🔄 Reset All Filters
//                 </button>
//               </div>
//             )}

//             {/* Enhanced Product Grid/List */}
//             {!loading && paginatedProducts.length > 0 && (
//               <div className="space-y-6">
//                 <div
//                   className={
//                     viewMode === "grid"
//                       ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
//                       : "space-y-4"
//                   }
//                 >
//                   {paginatedProducts.map((product) => (
//                     <div
//                       key={product.id}
//                       className={`bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl transition-all duration-300 group ${
//                         viewMode === "list" ? "flex items-center p-4" : "hover:-translate-y-1"
//                       }`}
//                     >
//                       {/* Product Image */}
//                       <div
//                         className={`relative ${viewMode === "list" ? "w-24 h-24 flex-shrink-0 mr-4" : "aspect-square"}`}
//                       >
//                         <img
//                           src={product.thumbnail || "/placeholder.svg"}
//                           alt={product.title}
//                           className={`w-full h-full object-cover ${viewMode === "grid" ? "group-hover:scale-105" : "rounded-xl"} transition-transform duration-300`}
//                           loading="lazy"
//                           onClick={() => addToRecentlyViewed(product)}
//                         />

//                         {/* Badges */}
//                         <div className="absolute top-2 left-2 flex flex-col gap-1">
//                           {product.newArrival && (
//                             <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                               NEW
//                             </span>
//                           )}
//                           {product.organic && (
//                             <span className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                               🌱 ORGANIC
//                             </span>
//                           )}
//                           {!product.inStock && (
//                             <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
//                               OUT OF STOCK
//                             </span>
//                           )}
//                         </div>

//                         {/* Wishlist Button */}
//                         <button
//                           onClick={() => toggleWishlist(product.id)}
//                           className={`absolute top-2 right-2 p-2 rounded-full transition-all ${
//                             wishlist.includes(product.id)
//                               ? "bg-red-500 text-white"
//                               : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
//                           }`}
//                         >
//                           <span className="text-sm">❤️</span>
//                         </button>

//                         {/* Quick View Button (Grid only) */}
//                         {viewMode === "grid" && (
//                           <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                             <Link
//                               to={`/products/${product.id}`}
//                               className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
//                             >
//                               Quick View
//                             </Link>
//                           </div>
//                         )}
//                       </div>

//                       {/* Product Info */}
//                       <div className={`${viewMode === "grid" ? "p-4" : "flex-1"}`}>
//                         <div className="flex items-start justify-between mb-2">
//                           <Link
//                             to={`/products/${product.id}`}
//                             className="font-bold text-gray-800 hover:text-orange-600 transition-colors line-clamp-2"
//                             onClick={() => addToRecentlyViewed(product)}
//                           >
//                             {product.title}
//                           </Link>
//                           {product.fastDelivery && (
//                             <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full ml-2 flex-shrink-0">
//                               ⚡ Fast
//                             </span>
//                           )}
//                         </div>

//                         {/* Brand */}
//                         {product.brand && <p className="text-sm text-gray-500 mb-2">{product.brand}</p>}

//                         {/* Rating */}
//                         <div className="flex items-center gap-2 mb-3">
//                           <div className="flex items-center">
//                             {[...Array(5)].map((_, i) => (
//                               <span
//                                 key={i}
//                                 className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
//                               >
//                                 ⭐
//                               </span>
//                             ))}
//                           </div>
//                           <span className="text-sm text-gray-600">
//                             {product.rating} ({product.stock} in stock)
//                           </span>
//                         </div>

//                         {/* Description (List view only) */}
//                         {viewMode === "list" && (
//                           <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
//                         )}

//                         {/* Price and Actions */}
//                         <div
//                           className={`flex items-center ${viewMode === "list" ? "justify-between" : "justify-between"}`}
//                         >
//                           <div className="flex items-center gap-2">
//                             <span className="text-xl font-bold text-orange-600">${product.price}</span>
//                             {product.originalPrice && product.originalPrice > product.price && (
//                               <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
//                             )}
//                           </div>

//                           <div className="flex items-center gap-2">
//                             {viewMode === "list" && (
//                               <Link
//                                 to={`/products/${product.id}`}
//                                 className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 transition-colors text-sm"
//                                 onClick={() => addToRecentlyViewed(product)}
//                               >
//                                 View Details
//                               </Link>
//                             )}
//                             <button
//                               disabled={!product.inStock}
//                               className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
//                                 product.inStock
//                                   ? "bg-orange-600 text-white hover:bg-orange-700 transform hover:scale-105"
//                                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                               }`}
//                             >
//                               {product.inStock ? "🛒 Add to Cart" : "Out of Stock"}
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Enhanced Pagination */}
//                 {totalPages > 1 && (
//                   <div className="flex items-center justify-center gap-2 mt-12">
//                     <button
//                       onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                       disabled={currentPage === 1}
//                       className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                     >
//                       ← Previous
//                     </button>

//                     <div className="flex items-center gap-1">
//                       {[...Array(Math.min(5, totalPages))].map((_, i) => {
//                         const pageNum = i + 1
//                         return (
//                           <button
//                             key={pageNum}
//                             onClick={() => setCurrentPage(pageNum)}
//                             className={`px-4 py-2 rounded-lg transition-all ${
//                               currentPage === pageNum ? "bg-orange-600 text-white" : "text-gray-600 hover:bg-gray-100"
//                             }`}
//                           >
//                             {pageNum}
//                           </button>
//                         )
//                       })}
//                       {totalPages > 5 && (
//                         <>
//                           <span className="px-2 text-gray-400">...</span>
//                           <button
//                             onClick={() => setCurrentPage(totalPages)}
//                             className={`px-4 py-2 rounded-lg transition-all ${
//                               currentPage === totalPages
//                                 ? "bg-orange-600 text-white"
//                                 : "text-gray-600 hover:bg-gray-100"
//                             }`}
//                           >
//                             {totalPages}
//                           </button>
//                         </>
//                       )}
//                     </div>

//                     <button
//                       onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                       disabled={currentPage === totalPages}
//                       className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//                     >
//                       Next →
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Recently Viewed Section */}
//             {recentlyViewed.length > 0 && (
//               <div className="mt-12 bg-white rounded-2xl p-6 border">
//                 <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
//                   <span>👁️</span> Recently Viewed
//                 </h3>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
//                   {recentlyViewed.map((product) => (
//                     <Link key={product.id} to={`/products/${product.id}`} className="group block">
//                       <div className="aspect-square rounded-xl overflow-hidden mb-2">
//                         <img
//                           src={product.thumbnail || "/placeholder.svg"}
//                           alt={product.title}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
//                       </div>
//                       <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-orange-600 transition-colors">
//                         {product.title}
//                       </p>
//                       <p className="text-sm text-orange-600 font-bold">${product.price}</p>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//         .slider::-webkit-slider-thumb {
//           appearance: none;
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #ea580c;
//           cursor: pointer;
//         }
//         .slider::-moz-range-thumb {
//           height: 20px;
//           width: 20px;
//           border-radius: 50%;
//           background: #ea580c;
//           cursor: pointer;
//           border: none;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default ProductList
