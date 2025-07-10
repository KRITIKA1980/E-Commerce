import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowLeft, 
  Shield, 
  CheckCircle, 
  Loader2,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  CreditCard,
  Users
} from "lucide-react"
import axios from "axios";

const CustomerLogin = () => {
  const { loginCustomer, user, logoutSuccess, setLogoutSuccess } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const navigate = useNavigate()

  // Show logout success message and reset it after display
  useEffect(() => {
    if (logoutSuccess) {
      setSuccess("Logout successful!");
      setError("");
    }
    // Only clear login success if logoutSuccess is true
    // (No need to clear here, as setSuccess will overwrite)
  }, [logoutSuccess]);

  // Only clear error on user change, not success
  useEffect(() => {
    setError("");
  }, [user]);

  // Clear logoutSuccess after showing the message
  useEffect(() => {
    if (success === "Logout successful!") {
      setLogoutSuccess(false);
    }
  }, [success, setLogoutSuccess]);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (error) setError("")
    // Clear success when user starts typing
    if (success) setSuccess("")
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          ...formData,
          role: "customer",
        },
        { withCredentials: true }
      );
      setSuccess("Login successful!");
      setError("");
      loginCustomer(response.data.user, response.data.token);
      setFormData({ email: "", password: "" }); // Clear form fields
      // setTimeout(() => navigate("/profile"), 1000); // Optionally redirect
    } catch (err) {
      const apiError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed. Please try again.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  // Load remembered email on component mount
  useState(() => {
    const rememberedEmail = localStorage.getItem('customerEmail')
    const shouldRemember = localStorage.getItem('rememberCustomer')
    if (rememberedEmail && shouldRemember) {
      setFormData(prev => ({ ...prev, email: rememberedEmail }))
      setRememberMe(true)
    }
  }, [])

  const customerBenefits = [
    { icon: ShoppingBag, title: "Easy Shopping", desc: "Browse thousands of fresh products" },
    { icon: Truck, title: "Fast Delivery", desc: "Same-day delivery available" },
    { icon: Heart, title: "Wishlist & Favorites", desc: "Save items for later purchase" },
    { icon: Star, title: "Exclusive Deals", desc: "Member-only discounts and offers" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 p-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Store</span>
        </Link>
      </nav>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-6 shadow-lg">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome Back
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sign in to your account and continue your fresh food journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Login Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">Access your account to start shopping</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-shake">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 text-red-600 flex-shrink-0">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-red-800 font-medium">Sign In Failed</p>
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 animate-fade-in">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 text-green-600 flex-shrink-0">
                        <svg fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold">{success}</p>
                        {/* <p className="text-green-800 font-medium">Login Successful!</p> */}
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className={`w-5 h-5 transition-colors ${
                          focusedField === 'email' ? 'text-orange-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          focusedField === 'email' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`w-5 h-5 transition-colors ${
                          focusedField === 'password' ? 'text-orange-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          focusedField === 'password' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('password')}
                        onBlur={() => setFocusedField(null)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        Remember me
                      </span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Demo Credentials */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Demo Account</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><span className="font-medium">Email:</span> customer@example.com</p>
                          <p><span className="font-medium">Password:</span> customer123</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-xl"
                    } focus:outline-none focus:ring-4 focus:ring-orange-500/20`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <span>Sign In to Your Account</span>
                        <Mail className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/register"
                      className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                    >
                      Create one here
                    </Link>
                  </p>
                </div>

                {/* Security Notice */}
                <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Your data is protected with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>

            {/* Enhanced Benefits Section */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Customer Benefits */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Why Shop With Us?</h3>
                  <p className="text-gray-600">Join thousands of satisfied customers</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {customerBenefits.map((benefit, index) => (
                    <div 
                      key={index}
                      className="group p-6 bg-white/80 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <benefit.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Security */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    Secure & Trusted
                  </h3>
                  <p className="text-gray-600">Your security is our top priority</p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, text: "SSL encrypted checkout process" },
                    { icon: CheckCircle, text: "Secure payment processing" },
                    { icon: CheckCircle, text: "Privacy protection guaranteed" },
                    { icon: CheckCircle, text: "24/7 customer support available" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Stats */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Join Our Community</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">50K+</div>
                    <div className="text-sm text-gray-600">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">4.9★</div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">1M+</div>
                    <div className="text-sm text-gray-600">Orders Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default CustomerLogin