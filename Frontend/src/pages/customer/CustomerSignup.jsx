import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  Lock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  ArrowLeft,
  Shield,
  Loader2,
  Heart,
  ShoppingBag,
  Star,
  Truck,
  Users,
  Gift,
  Clock,
  Award
} from "lucide-react"
import axios from "axios";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isFormValid, setIsFormValid] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const validateField = (name, value) => {
    const errors = {}
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          errors.name = 'Full name is required'
        } else if (value.trim().length < 2) {
          errors.name = 'Name must be at least 2 characters'
        } else if (!/^[a-zA-Z\s]+$/.test(value.trim())) {
          errors.name = 'Name can only contain letters and spaces'
        }
        break
      
      case 'email':
        if (!value) {
          errors.email = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Please enter a valid email address'
        }
        break
      
      case 'password':
        if (!value) {
          errors.password = 'Password is required'
        } else if (value.length < 6) {
          errors.password = 'Password must be at least 6 characters'
        }
        break
      
      case 'confirmPassword':
        if (!value) {
          errors.confirmPassword = 'Please confirm your password'
        } else if (value !== formData.password) {
          errors.confirmPassword = 'Passwords do not match'
        }
        break
    }
    
    return errors
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 6) strength += 1
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1
    return strength
  }

  const getPasswordStrengthText = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return { text: 'Very Weak', color: 'text-red-500' }
      case 2:
        return { text: 'Weak', color: 'text-orange-500' }
      case 3:
        return { text: 'Fair', color: 'text-yellow-500' }
      case 4:
        return { text: 'Good', color: 'text-blue-500' }
      case 5:
      case 6:
        return { text: 'Strong', color: 'text-green-500' }
      default:
        return { text: '', color: '' }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (error) setError("")

    // Real-time validation
    const fieldError = validateField(name, value)
    setFieldErrors((prev) => ({
      ...prev,
      ...fieldError,
      [name]: fieldError[name] || null
    }))

    // Handle password strength
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value))
    }

    // Handle confirm password validation
    if (name === 'confirmPassword' || name === 'password') {
      const confirmPasswordError = validateField('confirmPassword', name === 'confirmPassword' ? value : formData.confirmPassword)
      setFieldErrors((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError.confirmPassword || null
      }))
    }
  }

  const handleInputBlur = (e) => {
    const { name, value } = e.target
    const fieldError = validateField(name, value)
    setFieldErrors((prev) => ({
      ...prev,
      ...fieldError
    }))
  }

  useEffect(() => {
    const hasErrors = Object.values(fieldErrors).some(error => error !== null && error !== undefined)
    const allFieldsFilled = Object.values(formData).every(value => value.trim() !== '')
    setIsFormValid(allFieldsFilled && !hasErrors)
  }, [formData, fieldErrors])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Final validation
    const allErrors = {};
    Object.keys(formData).forEach(key => {
      const fieldError = validateField(key, formData[key]);
      Object.assign(allErrors, fieldError);
    });

    if (Object.keys(allErrors).length > 0) {
      setFieldErrors(allErrors);
      setLoading(false);
      return;
    }

    try {
      // Real API call
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          ...formData,
          role: "customer"
        },
        { withCredentials: true }
      );

      setSuccess("Account created successfully! You can now sign in.");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setFieldErrors({});
      setPasswordStrength(0);
    } catch (err) {
      // Handle API error
      const apiError =
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(apiError);
    } finally {
      setLoading(false);
    }
  };

  const signupBenefits = [
    { icon: ShoppingBag, title: "Instant Access", desc: "Start shopping immediately after signup" },
    { icon: Gift, title: "Welcome Bonus", desc: "Get 10% off your first order" },
    { icon: Star, title: "Member Rewards", desc: "Earn points with every purchase" },
    { icon: Clock, title: "Priority Support", desc: "24/7 dedicated customer service" },
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
              <User className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Join Our Community
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Create your account and start your fresh food journey today
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Signup Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
                  <p className="text-gray-600">Join thousands of satisfied customers</p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-shake">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 text-red-600 flex-shrink-0">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-red-800 font-medium">Registration Failed</p>
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Success Message */}
                {success && (
                  <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <div>
                        <p className="text-green-800 font-medium">Success!</p>
                        <p className="text-green-600 text-sm mt-1">{success}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Full Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`w-5 h-5 transition-colors ${
                          focusedField === 'name' ? 'text-orange-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          fieldErrors.name 
                            ? 'border-red-300 ring-4 ring-red-500/20 bg-red-50' 
                            : focusedField === 'name' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={() => setFocusedField('name')}
                      />
                      {formData.name && !fieldErrors.name && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {fieldErrors.name && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

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
                          fieldErrors.email 
                            ? 'border-red-300 ring-4 ring-red-500/20 bg-red-50' 
                            : focusedField === 'email' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={() => setFocusedField('email')}
                      />
                      {formData.email && !fieldErrors.email && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {fieldErrors.email && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        {fieldErrors.email}
                      </p>
                    )}
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
                        autoComplete="new-password"
                        required
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          fieldErrors.password 
                            ? 'border-red-300 ring-4 ring-red-500/20 bg-red-50' 
                            : focusedField === 'password' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Create a strong password"
                        value={formData.password}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={() => setFocusedField('password')}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="mt-3 space-y-2">
                        <div className="flex space-x-1">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                i < passwordStrength
                                  ? passwordStrength <= 2
                                    ? 'bg-red-500'
                                    : passwordStrength <= 3
                                    ? 'bg-yellow-500'
                                    : passwordStrength <= 4
                                    ? 'bg-blue-500'
                                    : 'bg-green-500'
                                  : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs ${getPasswordStrengthText(passwordStrength).color}`}>
                          Password strength: {getPasswordStrengthText(passwordStrength).text}
                        </p>
                      </div>
                    )}
                    
                    {fieldErrors.password && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        {fieldErrors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className={`w-5 h-5 transition-colors ${
                          focusedField === 'confirmPassword' ? 'text-orange-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        required
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          fieldErrors.confirmPassword 
                            ? 'border-red-300 ring-4 ring-red-500/20 bg-red-50' 
                            : focusedField === 'confirmPassword' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onFocus={() => setFocusedField('confirmPassword')}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {fieldErrors.confirmPassword && (
                      <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        {fieldErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !isFormValid}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 transform ${
                      loading || !isFormValid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-xl"
                    } focus:outline-none focus:ring-4 focus:ring-orange-500/20`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Creating Account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <span>Create Your Account</span>
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                  <p className="text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/customer-login"
                      className="text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                    >
                      Sign in here
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
              {/* Signup Benefits */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Member Benefits</h3>
                  <p className="text-gray-600">Unlock exclusive perks when you join</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {signupBenefits.map((benefit, index) => (
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
                    { icon: CheckCircle, text: "SSL encrypted registration process" },
                    { icon: CheckCircle, text: "Secure data protection" },
                    { icon: CheckCircle, text: "Privacy protection guaranteed" },
                    { icon: CheckCircle, text: "No spam, unsubscribe anytime" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Community Stats */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Join Our Growing Community</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">50K+</div>
                    <div className="text-sm text-gray-600">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">4.9★</div>
                    <div className="text-sm text-gray-600">Member Rating</div>
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
      `}</style>
    </div>
  )
}