"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

const ProductDetails = () => {
  // Existing state
  const params = useParams()
  const id = params?.id
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedColor, setSelectedColor] = useState(0)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    name: "",
    photos: [],
  })

  // NEW ENHANCED STATE
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(0)
  const [wishlist, setWishlist] = useState([])
  const [compareList, setCompareList] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const [showImageZoom, setShowImageZoom] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [showShareModal, setShowShareModal] = useState(false)
  const [showSizeGuide, setShowSizeGuide] = useState(false)
  const [activeTab, setActiveTab] = useState("description")
  const [questions, setQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState("")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [stockStatus, setStockStatus] = useState("in-stock")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [showBundleModal, setShowBundleModal] = useState(false)
  const [bundleProducts, setBundleProducts] = useState([])
  const [showReviewPhotos, setShowReviewPhotos] = useState(false)
  const [selectedReviewPhoto, setSelectedReviewPhoto] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [priceHistory, setPriceHistory] = useState([])
  const [showPriceHistory, setShowPriceHistory] = useState(false)
  const [productSpecs, setProductSpecs] = useState({})
  const [shippingInfo, setShippingInfo] = useState({})
  const [warrantyInfo, setWarrantyInfo] = useState({})

  const imageRef = useRef(null)
  const zoomRef = useRef(null)

  // Enhanced colors and sizes
  const orangeColor = "rgb(234 95 48)"
  const colors = [
    { name: "Classic Red", code: "#dc2626" },
    { name: "Deep Orange", code: orangeColor },
    { name: "Cream White", code: "#f5f5f5" },
    { name: "Midnight Black", code: "#1f2937" },
    { name: "Ocean Blue", code: "#1e40af" },
  ]

  const sizes = [
    { name: "XS", available: true },
    { name: "S", available: true },
    { name: "M", available: true },
    { name: "L", available: true },
    { name: "XL", available: false },
    { name: "XXL", available: true },
  ]

  // Load saved data
  useEffect(() => {
    const savedWishlist = localStorage.getItem("foodverse-wishlist")
    const savedCompareList = localStorage.getItem("foodverse-compare")
    const savedRecentlyViewed = localStorage.getItem("foodverse-recently-viewed")
    const savedCartItems = localStorage.getItem("foodverse-cart")

    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    if (savedCompareList) setCompareList(JSON.parse(savedCompareList))
    if (savedRecentlyViewed) setRecentlyViewed(JSON.parse(savedRecentlyViewed))
    if (savedCartItems) setCartItems(JSON.parse(savedCartItems))
  }, [])

  // Enhanced product fetch
  useEffect(() => {
    if (!id) return

    setLoading(true)
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const enhancedProduct = {
          ...data,
          // Enhanced product data
          sizes: sizes,
          colors: colors,
          inStock: Math.random() > 0.1,
          stockCount: Math.floor(Math.random() * 50) + 1,
          fastDelivery: Math.random() > 0.5,
          freeShipping: data.price > 50,
          returnPolicy: "30-day return policy",
          warranty: "1 year manufacturer warranty",
          specifications: {
            material: "Premium Cotton Blend",
            weight: "250g",
            dimensions: "30cm x 20cm x 5cm",
            origin: "Made in USA",
            careInstructions: "Machine wash cold, tumble dry low",
          },
          features: [
            "Premium quality home textile fabric",
            "Hypoallergenic and skin-friendly",
            "Easy maintenance and durable",
            "Eco-friendly materials",
            "Certified organic cotton",
          ],
          videos: [
            {
              id: 1,
              title: "Product Overview",
              thumbnail: data.thumbnail,
              url: "https://example.com/video1.mp4",
            },
          ],
        }

        setProduct(enhancedProduct)
        setProductSpecs(enhancedProduct.specifications)

        // Set stock status
        setStockStatus(
          enhancedProduct.inStock ? (enhancedProduct.stockCount < 5 ? "low-stock" : "in-stock") : "out-of-stock",
        )

        // Calculate delivery date
        const deliveryDays = enhancedProduct.fastDelivery ? 1 : 3
        const delivery = new Date()
        delivery.setDate(delivery.getDate() + deliveryDays)
        setDeliveryDate(delivery.toLocaleDateString())

        // Enhanced reviews with photos
        setReviews([
          {
            id: 1,
            user: "Alex Johnson",
            rating: 4,
            comment: "Great quality! The color is exactly as shown. Really impressed with the material quality.",
            date: "2023-05-15",
            verified: true,
            helpful: 12,
            photos: [data.thumbnail, data.images?.[0]].filter(Boolean),
            size: "M",
            color: "Deep Orange",
          },
          {
            id: 2,
            user: "Sarah Miller",
            rating: 5,
            comment: "Absolutely love this product. Highly recommend! Fast shipping and excellent customer service.",
            date: "2023-06-22",
            verified: true,
            helpful: 8,
            photos: [data.images?.[1]].filter(Boolean),
            size: "L",
            color: "Classic Red",
          },
          {
            id: 3,
            user: "Mike Chen",
            rating: 5,
            comment: "Perfect fit and amazing quality. Will definitely buy again!",
            date: "2023-07-10",
            verified: false,
            helpful: 5,
            photos: [],
            size: "S",
            color: "Cream White",
          },
        ])

        // Enhanced Q&A
        setQuestions([
          {
            id: 1,
            question: "What's the material composition?",
            answer: "This product is made from 80% organic cotton and 20% recycled polyester blend.",
            askedBy: "Jennifer K.",
            answeredBy: "Product Team",
            date: "2023-06-01",
            helpful: 15,
          },
          {
            id: 2,
            question: "Is this machine washable?",
            answer: "Yes, it's machine washable in cold water. We recommend tumble dry on low heat.",
            askedBy: "Robert M.",
            answeredBy: "Customer Service",
            date: "2023-06-15",
            helpful: 8,
          },
        ])

        // Generate price history
        const history = []
        for (let i = 30; i >= 0; i--) {
          const date = new Date()
          date.setDate(date.getDate() - i)
          const variation = (Math.random() - 0.5) * 10
          history.push({
            date: date.toISOString().split("T")[0],
            price: Math.max(data.price + variation, data.price * 0.8),
          })
        }
        setPriceHistory(history)

        // Add to recently viewed
        addToRecentlyViewed(enhancedProduct)
        setLoading(false)
      })
      .catch(() => setLoading(false))

    // Fetch related products
    fetch("https://dummyjson.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(data.products || [])
      })

    // Generate bundle products
    fetch("https://dummyjson.com/products?limit=3&skip=10")
      .then((res) => res.json())
      .then((data) => {
        setBundleProducts(data.products || [])
      })
  }, [id])

  // Enhanced functions
  const addToRecentlyViewed = (product) => {
    const newRecentlyViewed = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 5)
    setRecentlyViewed(newRecentlyViewed)
    localStorage.setItem("foodverse-recently-viewed", JSON.stringify(newRecentlyViewed))
  }

  const toggleWishlist = () => {
    const newWishlist = wishlist.includes(product.id)
      ? wishlist.filter((id) => id !== product.id)
      : [...wishlist, product.id]
    setWishlist(newWishlist)
    localStorage.setItem("foodverse-wishlist", JSON.stringify(newWishlist))
  }

  const toggleCompare = () => {
    const newCompareList = compareList.find((p) => p.id === product.id)
      ? compareList.filter((p) => p.id !== product.id)
      : compareList.length < 4
        ? [...compareList, product]
        : compareList
    setCompareList(newCompareList)
    localStorage.setItem("foodverse-compare", JSON.stringify(newCompareList))
  }

  const addToCart = () => {
    const cartItem = {
      ...product,
      quantity,
      selectedColor: colors[selectedColor],
      selectedSize: sizes[selectedSize],
      addedAt: Date.now(),
    }
    const newCartItems = [...cartItems, cartItem]
    setCartItems(newCartItems)
    localStorage.setItem("foodverse-cart", JSON.stringify(newCartItems))
    setShowQuickActions(true)
    setTimeout(() => setShowQuickActions(false), 3000)
  }

  const handleImageZoom = useCallback((e) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }, [])

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      user: newReview.name || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      verified: false,
      helpful: 0,
      photos: newReview.photos,
      size: sizes[selectedSize]?.name,
      color: colors[selectedColor]?.name,
    }
    setReviews([...reviews, review])
    setNewReview({ rating: 5, comment: "", name: "", photos: [] })
  }

  const handleQuestionSubmit = (e) => {
    e.preventDefault()
    const question = {
      id: questions.length + 1,
      question: newQuestion,
      answer: "",
      askedBy: "You",
      answeredBy: "",
      date: new Date().toISOString().split("T")[0],
      helpful: 0,
    }
    setQuestions([...questions, question])
    setNewQuestion("")
  }

  const shareProduct = (platform) => {
    const url = window.location.href
    const text = `Check out this amazing product: ${product.title}`

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
      email: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
    }

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank")
    }
    setShowShareModal(false)
  }

  const notifyWhenAvailable = () => {
    // Simulate API call
    console.log(`Notify ${userEmail} when product ${product.id} is available`)
    setShowNotifyModal(false)
    setUserEmail("")
  }

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: orangeColor }}
        ></div>
      </div>
    )

  if (!product)
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h2>
        <Link
          to="/products"
          className="inline-block px-6 py-2 rounded-md font-medium text-white hover:bg-opacity-90 transition-colors"
          style={{ backgroundColor: orangeColor }}
        >
          Browse Products
        </Link>
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-orange-600 transition-colors">
          Home
        </Link>
        <span className="text-gray-400">/</span>
        <Link to="/products" className="text-gray-500 hover:text-orange-600 transition-colors">
          Products
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">{product.category}</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-600">{product.title}</span>
      </nav>

      {/* Quick Actions Notification */}
      {showQuickActions && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <span>✅</span>
          <span>Added to cart!</span>
          <Link to="/cart" className="underline font-medium">
            View Cart
          </Link>
        </div>
      )}

      {/* Product Top Section */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Enhanced Product Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <div
              className="bg-gray-50 rounded-xl aspect-[4/3] flex items-center justify-center p-12 border border-gray-200 relative overflow-hidden cursor-zoom-in"
              onMouseEnter={() => setShowImageZoom(true)}
              onMouseLeave={() => setShowImageZoom(false)}
              onMouseMove={handleImageZoom}
              ref={imageRef}
            >
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-transform duration-300"
              />

              {/* Enhanced badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.discountPercentage > 0 && (
                  <div
                    className="text-white px-3 py-1 rounded-full text-sm font-bold"
                    style={{ backgroundColor: orangeColor }}
                  >
                    {Math.round(product.discountPercentage)}% OFF
                  </div>
                )}
                {product.fastDelivery && (
                  <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    ⚡ Fast Delivery
                  </div>
                )}
                {product.freeShipping && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    🚚 Free Shipping
                  </div>
                )}
                {stockStatus === "low-stock" && (
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">⚠️ Low Stock</div>
                )}
              </div>

              {/* Action buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={toggleWishlist}
                  className={`p-2 rounded-full transition-all ${
                    wishlist.includes(product.id)
                      ? "bg-red-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  ❤️
                </button>
                <button
                  onClick={toggleCompare}
                  className={`p-2 rounded-full transition-all ${
                    compareList.find((p) => p.id === product.id)
                      ? "bg-purple-500 text-white"
                      : "bg-white/80 text-gray-600 hover:bg-purple-500 hover:text-white"
                  }`}
                >
                  📊
                </button>
                <button
                  onClick={() => setShowShareModal(true)}
                  className="p-2 rounded-full bg-white/80 text-gray-600 hover:bg-blue-500 hover:text-white transition-all"
                >
                  📤
                </button>
              </div>

              {/* 360° View button */}
              <button className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium hover:bg-white transition-colors">
                🔄 360° View
              </button>
            </div>

            {/* Zoom overlay */}
            {showImageZoom && (
              <div className="absolute top-0 right-0 w-96 h-96 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-10 hidden lg:block">
                <div
                  className="w-full h-full bg-no-repeat"
                  style={{
                    backgroundImage: `url(${product.images?.[selectedImage] || product.thumbnail})`,
                    backgroundSize: "200%",
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Enhanced thumbnail gallery */}
          <div className="mt-4 grid grid-cols-5 gap-3">
            {product.images?.slice(0, 4).map((img, index) => (
              <div
                key={index}
                className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                  selectedImage === index ? "border-orange-500" : "border-transparent hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={img || "/placeholder.svg"}
                  alt={`${product.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {/* Video thumbnail */}
            {product.videos?.length > 0 && (
              <div
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300 cursor-pointer transition-all relative"
                onClick={() => setShowVideoModal(true)}
              >
                <img
                  src={product.videos[0].thumbnail || "/placeholder.svg"}
                  alt="Product Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">▶️</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Product Info */}
        <div className="w-full lg:w-1/2">
          <div className="mb-2 text-sm uppercase tracking-wider font-medium" style={{ color: orangeColor }}>
            {product.brand}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

          {/* Enhanced Rating with breakdown */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-current" : "fill-none stroke-current"}`}
                  viewBox="0 0 24 24"
                  style={{ color: orangeColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 mr-4">
              {product.rating} ({reviews.length} reviews)
            </span>
            <button
              onClick={() => setShowPriceHistory(true)}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              📈 Price History
            </button>
          </div>

          {/* Enhanced Price with savings */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <p className="text-4xl font-bold text-gray-900">
                R{product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              {product.discountPercentage > 0 && (
                <>
                  <p className="text-xl text-gray-500 line-through">
                    R
                    {(product.price / (1 - product.discountPercentage / 100)).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-bold">
                    Save R
                    {(product.price / (1 - product.discountPercentage / 100) - product.price).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                </>
              )}
            </div>
            {product.freeShipping && (
              <p className="text-green-600 text-sm font-medium">✅ Free shipping on this item</p>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {stockStatus === "in-stock" && (
              <div className="flex items-center gap-2 text-green-600">
                <span>✅</span>
                <span className="font-medium">In Stock ({product.stockCount} available)</span>
              </div>
            )}
            {stockStatus === "low-stock" && (
              <div className="flex items-center gap-2 text-yellow-600">
                <span>⚠️</span>
                <span className="font-medium">Low Stock (Only {product.stockCount} left)</span>
              </div>
            )}
            {stockStatus === "out-of-stock" && (
              <div className="flex items-center gap-2 text-red-600">
                <span>❌</span>
                <span className="font-medium">Out of Stock</span>
                <button
                  onClick={() => setShowNotifyModal(true)}
                  className="ml-4 text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  Notify when available
                </button>
              </div>
            )}
          </div>

          {/* Enhanced Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">COLOR: {colors[selectedColor].name}</h3>
            <div className="flex space-x-3">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-12 h-12 rounded-full border-2 ${selectedColor === index ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900" : "border-transparent"} ${color.code === "#f5f5f5" ? "border-gray-200" : ""} transition-all`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => setSelectedColor(index)}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* NEW: Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-700">SIZE: {sizes[selectedSize]?.name}</h3>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {sizes.map((size, index) => (
                <button
                  key={index}
                  disabled={!size.available}
                  className={`px-4 py-2 border rounded-lg text-sm font-medium transition-all ${
                    selectedSize === index
                      ? "border-gray-900 bg-gray-900 text-white"
                      : size.available
                        ? "border-gray-300 hover:border-gray-400"
                        : "border-gray-200 text-gray-400 cursor-not-allowed line-through"
                  }`}
                  onClick={() => setSelectedSize(index)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>

          {/* NEW: Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">QUANTITY</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                  className="px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-600">Max {product.stockCount} per order</span>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span>🚚</span>
              <span className="font-medium">Delivery Information</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>📅 Estimated delivery: {deliveryDate}</p>
              <p>📍 Ships from: {product.specifications?.origin || "Warehouse"}</p>
              {product.fastDelivery && <p>⚡ Express delivery available</p>}
            </div>
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              className="flex-1 px-6 py-3 rounded-md font-medium text-white uppercase tracking-wider hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: orangeColor }}
              onClick={addToCart}
              disabled={stockStatus === "out-of-stock"}
            >
              {stockStatus === "out-of-stock" ? "Out of Stock" : "Add to Cart"}
            </button>
            <button
              className="flex-1 px-6 py-3 rounded-md font-medium border border-gray-900 hover:bg-gray-50 transition-colors text-gray-900 uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={stockStatus === "out-of-stock"}
            >
              Buy Now
            </button>
          </div>

          {/* NEW: Bundle Offer */}
          {bundleProducts.length > 0 && (
            <div className="mb-6 p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-800">🎁 Bundle & Save</h3>
                <button
                  onClick={() => setShowBundleModal(true)}
                  className="text-sm text-orange-600 hover:text-orange-800 underline"
                >
                  View Bundle
                </button>
              </div>
              <p className="text-sm text-gray-600">Buy this with {bundleProducts.length} related items and save 15%</p>
            </div>
          )}

          {/* Enhanced Links */}
          <div className="flex items-center gap-6">
            <a to="#" className="font-medium flex items-center group" style={{ color: orangeColor }}>
              Try In Editor
              <svg
                className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <button className="font-medium text-gray-600 hover:text-gray-800 transition-colors">📏 Size Guide</button>
            <button className="font-medium text-gray-600 hover:text-gray-800 transition-colors">
              📞 Ask a Question
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs Section */}
      <div className="mb-16">
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {[
              { id: "description", label: "Description", icon: "📝" },
              { id: "specifications", label: "Specifications", icon: "📋" },
              { id: "reviews", label: `Reviews (${reviews.length})`, icon: "⭐" },
              { id: "qa", label: `Q&A (${questions.length})`, icon: "❓" },
              { id: "shipping", label: "Shipping & Returns", icon: "🚚" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <div className="mb-8">
                <p className="text-gray-700 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  This premium product combines exceptional quality with modern design. Crafted with attention to detail
                  and using only the finest materials, it delivers both style and functionality for the discerning
                  customer.
                </p>
              </div>

              {/* Enhanced Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features?.map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <svg
                        className="flex-shrink-0 h-5 w-5 mr-3 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: orangeColor }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-gray-700">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Care Instructions */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Care Instructions</h3>
                <p className="text-gray-700">{product.specifications?.careInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {Object.entries(productSpecs).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-4">Additional Information</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>SKU:</span>
                      <span className="font-mono">{product.sku || `PRD-${product.id}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Category:</span>
                      <span>{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tags:</span>
                      <span>{product.tags?.join(", ") || "Premium, Quality"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Warranty:</span>
                      <span>{product.warranty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Enhanced Reviews Display */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center gap-4">
                    <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                      <option>Most Recent</option>
                      <option>Highest Rated</option>
                      <option>Lowest Rated</option>
                      <option>Most Helpful</option>
                    </select>
                  </div>
                </div>

                {/* Review Summary */}
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-gray-900">{product.rating}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-5 h-5 ${i < Math.round(product.rating) ? "fill-current" : "fill-none stroke-current"}`}
                            viewBox="0 0 24 24"
                            style={{ color: orangeColor }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">Based on {reviews.length} reviews</div>
                    </div>
                  </div>

                  {/* Rating breakdown */}
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => {
                      const count = reviews.filter((r) => r.rating === rating).length
                      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                      return (
                        <div key={rating} className="flex items-center gap-2 text-sm">
                          <span className="w-8">{rating}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor: orangeColor,
                                width: `${percentage}%`,
                              }}
                            />
                          </div>
                          <span className="w-8 text-gray-600">{count}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-6 max-h-[600px] overflow-y-auto">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{review.user}</h4>
                            {review.verified && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                ✓ Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating ? "fill-current" : "fill-none stroke-current"}`}
                                  viewBox="0 0 24 24"
                                  style={{ color: orangeColor }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                  />
                                </svg>
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          {(review.size || review.color) && (
                            <div className="flex gap-4 text-xs text-gray-500 mb-2">
                              {review.size && <span>Size: {review.size}</span>}
                              {review.color && <span>Color: {review.color}</span>}
                            </div>
                          )}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{review.comment}</p>

                      {/* Review photos */}
                      {review.photos && review.photos.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {review.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo || "/placeholder.svg"}
                              alt={`Review photo ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => {
                                setSelectedReviewPhoto(photo)
                                setShowReviewPhotos(true)
                              }}
                            />
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">
                          👍 Helpful ({review.helpful})
                        </button>
                        <button className="text-gray-500 hover:text-gray-700 transition-colors">Reply</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Write Review Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="focus:outline-none hover:scale-110 transition-transform"
                        >
                          <svg
                            className={`w-8 h-8 ${star <= newReview.rating ? "fill-current" : "fill-none stroke-current"}`}
                            viewBox="0 0 24 24"
                            style={{ color: orangeColor }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                      Review
                    </label>
                    <textarea
                      id="comment"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="Share your experience with this product..."
                      required
                    ></textarea>
                  </div>

                  {/* Photo upload */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Photos (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                      <input type="file" multiple accept="image/*" className="hidden" id="review-photos" />
                      <label htmlFor="review-photos" className="cursor-pointer">
                        <div className="text-gray-500">
                          <span className="text-2xl mb-2 block">📷</span>
                          <span className="text-sm">Click to upload photos</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                    style={{ backgroundColor: orangeColor }}
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "qa" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Questions List */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Questions & Answers</h3>
                {questions.length > 0 ? (
                  <div className="space-y-6">
                    {questions.map((qa) => (
                      <div key={qa.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                        <div className="mb-3">
                          <h4 className="font-medium text-gray-900 mb-1">Q: {qa.question}</h4>
                          <div className="text-xs text-gray-500">
                            Asked by {qa.askedBy} on {qa.date}
                          </div>
                        </div>
                        {qa.answer ? (
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 mb-2">A: {qa.answer}</p>
                            <div className="text-xs text-gray-500">Answered by {qa.answeredBy}</div>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">Awaiting answer from our team...</div>
                        )}
                        <div className="mt-3 flex items-center gap-4 text-sm">
                          <button className="text-gray-500 hover:text-gray-700 transition-colors">
                            👍 Helpful ({qa.helpful})
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <span className="text-4xl mb-4 block">❓</span>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No questions yet</h4>
                    <p className="text-gray-500">Be the first to ask a question about this product</p>
                  </div>
                )}
              </div>

              {/* Ask Question Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Ask a Question</h3>
                <form onSubmit={handleQuestionSubmit}>
                  <div className="mb-4">
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                      Your Question
                    </label>
                    <textarea
                      id="question"
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      placeholder="What would you like to know about this product?"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-white rounded-md hover:bg-opacity-90 transition-colors font-medium"
                    style={{ backgroundColor: orangeColor }}
                  >
                    Ask Question
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🚚</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Standard Delivery</h4>
                      <p className="text-gray-600 text-sm">3-5 business days • Free on orders over R500</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Express Delivery</h4>
                      <p className="text-gray-600 text-sm">1-2 business days • R99 additional fee</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🏪</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Store Pickup</h4>
                      <p className="text-gray-600 text-sm">Available at select locations • Free</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">Returns & Exchanges</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">↩️</span>
                    <div>
                      <h4 className="font-medium text-gray-900">30-Day Returns</h4>
                      <p className="text-gray-600 text-sm">Free returns within 30 days of purchase</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Easy Exchanges</h4>
                      <p className="text-gray-600 text-sm">Size or color exchanges made simple</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">🛡️</span>
                    <div>
                      <h4 className="font-medium text-gray-900">Warranty</h4>
                      <p className="text-gray-600 text-sm">{product.warranty}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/products/${relatedProduct.id}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={relatedProduct.thumbnail || "/placeholder.svg"}
                    alt={relatedProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {relatedProduct.title}
                </h3>
                <p className="text-orange-600 font-bold text-sm">R{relatedProduct.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recentlyViewed.slice(1).map((viewedProduct) => (
              <Link key={viewedProduct.id} to={`/products/${viewedProduct.id}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={viewedProduct.thumbnail || "/placeholder.svg"}
                    alt={viewedProduct.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {viewedProduct.title}
                </h3>
                <p className="text-orange-600 font-bold text-sm">R{viewedProduct.price}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MODALS */}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Share Product</h2>
              <button onClick={() => setShowShareModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => shareProduct("facebook")}
                className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                📘 Facebook
              </button>
              <button
                onClick={() => shareProduct("twitter")}
                className="flex items-center justify-center gap-2 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                🐦 Twitter
              </button>
              <button
                onClick={() => shareProduct("whatsapp")}
                className="flex items-center justify-center gap-2 p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                💬 WhatsApp
              </button>
              <button
                onClick={() => shareProduct("email")}
                className="flex items-center justify-center gap-2 p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                📧 Email
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Size Guide</h2>
              <button onClick={() => setShowSizeGuide(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Size</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Chest (cm)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Waist (cm)</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Length (cm)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: "XS", chest: "86-91", waist: "71-76", length: "66" },
                    { size: "S", chest: "91-96", waist: "76-81", length: "68" },
                    { size: "M", chest: "96-101", waist: "81-86", length: "70" },
                    { size: "L", chest: "101-106", waist: "86-91", length: "72" },
                    { size: "XL", chest: "106-111", waist: "91-96", length: "74" },
                    { size: "XXL", chest: "111-116", waist: "96-101", length: "76" },
                  ].map((row) => (
                    <tr key={row.size}>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{row.size}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.chest}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.waist}</td>
                      <td className="border border-gray-300 px-4 py-2">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">How to Measure</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Chest: Measure around the fullest part of your chest</li>
                <li>• Waist: Measure around your natural waistline</li>
                <li>• Length: Measure from shoulder to hem</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Notify When Available Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Get Notified</h2>
              <button onClick={() => setShowNotifyModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <p className="text-gray-600 mb-4">Enter your email to be notified when this product is back in stock.</p>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:ring-orange-500 focus:border-orange-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowNotifyModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={notifyWhenAvailable}
                className="flex-1 px-4 py-3 text-white rounded-lg hover:bg-opacity-90 transition-colors"
                style={{ backgroundColor: orangeColor }}
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Price History Modal */}
      {showPriceHistory && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Price History</h2>
              <button onClick={() => setShowPriceHistory(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    R{product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-sm text-gray-600">Current Price</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">
                    R
                    {Math.min(...priceHistory.map((p) => p.price)).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-sm text-gray-600">Lowest Price (30 days)</div>
                </div>
              </div>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {priceHistory
                .slice(-10)
                .reverse()
                .map((entry, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-sm text-gray-600">{entry.date}</span>
                    <span className="font-medium">
                      R{entry.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Bundle Modal */}
      {showBundleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Bundle & Save</h2>
              <button onClick={() => setShowBundleModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="border-2 border-orange-500 rounded-lg p-4">
                <img
                  src={product.thumbnail || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-sm mb-2">{product.title}</h3>
                <p className="text-orange-600 font-bold">R{product.price}</p>
                <div className="mt-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-center">
                  Current Item
                </div>
              </div>
              {bundleProducts.map((bundleProduct) => (
                <div key={bundleProduct.id} className="border border-gray-200 rounded-lg p-4">
                  <img
                    src={bundleProduct.thumbnail || "/placeholder.svg"}
                    alt={bundleProduct.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-medium text-sm mb-2">{bundleProduct.title}</h3>
                  <p className="text-gray-600 font-bold">R{bundleProduct.price}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Bundle Total:</span>
                <span className="text-lg font-bold">
                  R
                  {(product.price + bundleProducts.reduce((sum, p) => sum + p.price, 0)).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-green-600">You Save (15%):</span>
                <span className="text-lg font-bold text-green-600">
                  R
                  {((product.price + bundleProducts.reduce((sum, p) => sum + p.price, 0)) * 0.15).toLocaleString(
                    "en-US",
                    { minimumFractionDigits: 2 },
                  )}
                </span>
              </div>
              <button
                className="w-full px-6 py-3 text-white rounded-lg hover:bg-opacity-90 transition-colors font-medium"
                style={{ backgroundColor: orangeColor }}
              >
                Add Bundle to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Photos Modal */}
      {showReviewPhotos && selectedReviewPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowReviewPhotos(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
            >
              ✕
            </button>
            <img
              src={selectedReviewPhoto || "/placeholder.svg"}
              alt="Review photo"
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
            >
              ✕
            </button>
            <div className="bg-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Product Video</h3>
              <p className="text-gray-600">Video player would be implemented here</p>
              <div className="mt-4 bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <span className="text-4xl">🎥</span>
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
      `}</style>
    </div>
  )
}

export default ProductDetails
