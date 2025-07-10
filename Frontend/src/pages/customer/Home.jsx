import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"

const Home = () => {
  const [isVisible, setIsVisible] = useState({})
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const observerRef = useRef()

  // Enhanced food categories data
  const categories = [
    {
      name: "Burgers",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      count: 24,
      description: "Juicy beef and chicken burgers",
    },
    {
      name: "Pizza",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      count: 18,
      description: "Wood-fired authentic pizzas",
    },
    {
      name: "Sushi",
      image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=300&fit=crop",
      count: 15,
      description: "Fresh sushi and sashimi",
    },
    {
      name: "Desserts",
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      count: 12,
      description: "Sweet treats and cakes",
    },
    {
      name: "Salads",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      count: 20,
      description: "Fresh and healthy salads",
    },
    {
      name: "Pasta",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop",
      count: 16,
      description: "Italian pasta dishes",
    },
  ]

  // Enhanced popular dishes data
  const popularDishes = [
    {
      id: 1,
      name: "Double Cheese Burger",
      price: 12.99,
      originalPrice: 15.99,
      rating: 4.8,
      reviews: 124,
      prepTime: "15-20 min",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      badge: "Popular",
      ingredients: ["Beef Patty", "Cheese", "Lettuce", "Tomato"],
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 14.99,
      originalPrice: 18.99,
      rating: 4.6,
      reviews: 89,
      prepTime: "20-25 min",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
      badge: "Chef Special",
      ingredients: ["Mozzarella", "Tomato", "Basil", "Olive Oil"],
    },
    {
      id: 3,
      name: "California Roll",
      price: 18.99,
      originalPrice: 22.99,
      rating: 4.9,
      reviews: 156,
      prepTime: "10-15 min",
      image: "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=400&h=300&fit=crop",
      badge: "Best Seller",
      ingredients: ["Crab", "Avocado", "Cucumber", "Nori"],
    },
    {
      id: 4,
      name: "Caesar Salad",
      price: 9.99,
      originalPrice: 12.99,
      rating: 4.5,
      reviews: 67,
      prepTime: "5-10 min",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      badge: "Healthy",
      ingredients: ["Romaine", "Parmesan", "Croutons", "Caesar Dressing"],
    },
  ]

  // Features data with enhanced descriptions
  const features = [
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Lightning Fast Delivery",
      description: "Average delivery time of 25 minutes or it's free!",
      stat: "25 min avg",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      title: "Premium Quality",
      description: "Fresh ingredients sourced daily from local farms",
      stat: "4.8★ rating",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5z"
          />
        </svg>
      ),
      title: "Easy Ordering",
      description: "One-click ordering with saved preferences and favorites",
      stat: "3-step process",
    },
    {
      icon: (
        <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      title: "Free Delivery",
      description: "No delivery fees on orders over $25. Always!",
      stat: "$25+ orders",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Food Blogger",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      text: "FoodVerse has completely changed how I order food. The quality is consistently amazing and delivery is always on time!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      text: "As someone who works long hours, FoodVerse is a lifesaver. Great food, fast delivery, and the app is so easy to use.",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "The variety of restaurants and cuisines available is incredible. I've discovered so many new favorite dishes!",
      rating: 5,
    },
  ]

  // Stats data
  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "200+", label: "Restaurant Partners" },
    { number: "1M+", label: "Orders Delivered" },
    { number: "4.8★", label: "Average Rating" },
  ]

  // Intersection Observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }))
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-animate]")
    elements.forEach((el) => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/30 to-transparent"></div>

        {/* Floating food icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-4xl opacity-20 animate-bounce" style={{ animationDelay: "0s" }}>
            🍕
          </div>
          <div className="absolute top-40 right-20 text-3xl opacity-20 animate-bounce" style={{ animationDelay: "1s" }}>
            🍔
          </div>
          <div
            className="absolute bottom-40 left-20 text-3xl opacity-20 animate-bounce"
            style={{ animationDelay: "2s" }}
          >
            🍣
          </div>
          <div
            className="absolute bottom-20 right-10 text-4xl opacity-20 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            🥗
          </div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium">🎉 Free delivery on your first order!</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Delicious Food
              <span className="block text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl mb-8 text-orange-100 max-w-lg">
              Order from 200+ restaurants and get your favorite meals delivered in under 30 minutes
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-full p-2 flex items-center mb-8 max-w-md mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Search for food, restaurants..."
                className="flex-1 px-4 py-2 text-gray-800 bg-transparent outline-none"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition duration-300">
                Search
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/menu"
                className="bg-white text-orange-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl shadow-lg transition duration-300 text-center transform hover:scale-105"
              >
                Order Now
              </Link>
              <Link
                to="/restaurants"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 font-bold px-8 py-4 rounded-xl transition duration-300 text-center"
              >
                Browse Restaurants
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop"
                alt="Delicious food"
                className="rounded-2xl shadow-2xl w-full max-w-lg transform hover:scale-105 transition duration-500"
              />
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full font-bold shadow-lg">
                30 min delivery!
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Fresh & Hot 🔥
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-105 transition duration-300">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div
          id="features"
          data-animate
          className={`transition-all duration-1000 ${isVisible.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose FoodVerse?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We're not just another food delivery app. Here's what makes us special.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-500 text-center group hover:-translate-y-2"
              >
                <div className="flex justify-center mb-6 transform group-hover:scale-110 transition duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  {feature.stat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div
            id="categories"
            data-animate
            className={`text-center mb-16 transition-all duration-1000 ${isVisible.categories ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl font-bold mb-4">Explore Food Categories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              From comfort food to healthy options, we have something for every craving
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer transform hover:scale-105 transition duration-500">
                <Link to={`/menu?category=${category.name.toLowerCase()}`} className="block">
                  <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                      <p className="text-xs text-gray-200 mb-1">{category.description}</p>
                      <p className="text-xs text-orange-300">{category.count} items</p>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Popular Dishes */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div
          id="dishes"
          data-animate
          className={`transition-all duration-1000 ${isVisible.dishes ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Customer Favorites</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              These dishes are loved by thousands of customers. Try them today!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularDishes.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 group hover:-translate-y-2"
              >
                <div className="relative">
                  <img
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {dish.badge}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold flex items-center">
                    <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    {dish.rating}
                  </div>
                  <button className="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-orange-50">
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold group-hover:text-orange-600 transition duration-300">
                      {dish.name}
                    </h3>
                    <div className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {dish.prepTime}
                    </div>
                  </div>

                  <div className="flex items-center mb-3 text-sm text-gray-600">
                    <span className="mr-4">
                      ⭐ {dish.rating} ({dish.reviews} reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {dish.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {ingredient}
                        </span>
                      ))}
                      {dish.ingredients.length > 3 && (
                        <span className="text-xs text-gray-500">+{dish.ingredients.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-orange-600">${dish.price}</span>
                      {dish.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${dish.originalPrice}</span>
                      )}
                    </div>
                    <Link
                      to={`/food/${dish.id}`}
                      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition duration-300 transform hover:scale-105"
                    >
                      Add to Cart
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 mb-12 text-lg">Don't just take our word for it</p>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                ))}
              </div>
              <p className="text-xl text-gray-700 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
              <div className="flex items-center justify-center">
                <img
                  src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-bold">{testimonials[currentTestimonial].name}</p>
                  <p className="text-gray-600 text-sm">{testimonials[currentTestimonial].role}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition duration-300 ${
                    index === currentTestimonial ? "bg-orange-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-gray-300">
            Get exclusive offers, new restaurant alerts, and food tips delivered to your inbox
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-lg font-bold transition duration-300 transform hover:scale-105"
            >
              Subscribe
            </button>
          </form>

          {isSubscribed && (
            <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg inline-block">
              ✅ Successfully subscribed! Welcome to FoodVerse family!
            </div>
          )}
        </div>
      </section>

      <br /><br />
      {/* Enhanced CTA Section */}
      <section className="py-20 max-w-7xl rounded-2xl mx-auto px-6 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Order?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Download our app for exclusive offers, faster ordering, and real-time tracking!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-bold transition duration-300 flex items-center transform hover:scale-105">
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z" />
                <path d="M15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-bold">App Store</div>
              </div>
            </button>

            <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-bold transition duration-300 flex items-center transform hover:scale-105">
              <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.494 12l2.204-2.491zM5.864 2.658L16.802 8.99 14.5 11.293 5.864 2.658z" />
              </svg>
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-lg font-bold">Google Play</div>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl mb-2">📱</div>
              <h3 className="font-bold mb-2">Easy Mobile Ordering</h3>
              <p className="text-orange-100">Order with just a few taps</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🚚</div>
              <h3 className="font-bold mb-2">Real-time Tracking</h3>
              <p className="text-orange-100">Track your order every step</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <h3 className="font-bold mb-2">Exclusive App Deals</h3>
              <p className="text-orange-100">Special discounts for app users</p>
            </div>
          </div>
        </div>
      </section>
      <br /><br />

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-30px,0);
          }
          70% {
            transform: translate3d(0,-15px,0);
          }
          90% {
            transform: translate3d(0,-4px,0);
          }
        }
        .animate-bounce {
          animation: bounce 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default Home

