// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const { loginAsAdmin } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
    
//     try {
//       const success = await loginAsAdmin(username, password);
//       if (success) {
//         navigate("/admin");
//       } else {
//         setError("Invalid credentials. Try admin / admin123");
//       }
//     } catch (err) {
//       setError("Login failed. Please try again.");
//       console.error("Admin login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <svg
//             className="mx-auto h-12 w-12 text-orange-600"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
//             />
//           </svg>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">
//             Admin Dashboard
//           </h2>
//           <p className="mt-2 text-center text-lg text-gray-600">
//             Sign in to manage your food products
//           </p>
//         </div>

//         <div className="bg-white shadow-lg sm:rounded-lg overflow-hidden">
//           <div className="grid grid-cols-1 md:grid-cols-2">
//             {/* Login Form */}
//             <div className="p-6 sm:p-8">
//               {error && (
//                 <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100">
//                   <div className="flex items-center">
//                     <svg
//                       className="h-5 w-5 mr-2"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                       />
//                     </svg>
//                     {error}
//                   </div>
//                 </div>
//               )}

//               <form className="space-y-6" onSubmit={handleLogin}>
//                 <div>
//                   <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                     Username
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg
//                         className="h-5 w-5 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                         />
//                       </svg>
//                     </div>
//                     <input
//                       id="username"
//                       name="username"
//                       type="text"
//                       required
//                       className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="admin"
//                       value={username}
//                       onChange={(e) => setUsername(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                     Password
//                   </label>
//                   <div className="mt-1 relative rounded-md shadow-sm">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <svg
//                         className="h-5 w-5 text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                         />
//                       </svg>
//                     </div>
//                     <input
//                       id="password"
//                       name="password"
//                       type="password"
//                       required
//                       className="py-2 pl-10 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//                       placeholder="••••••••"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                       loading
//                         ? "bg-orange-400"
//                         : "bg-orange-600 hover:bg-orange-700"
//                     } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
//                   >
//                     {loading ? (
//                       <>
//                         <svg
//                           className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                         >
//                           <circle
//                             className="opacity-25"
//                             cx="12"
//                             cy="12"
//                             r="10"
//                             stroke="currentColor"
//                             strokeWidth="4"
//                           ></circle>
//                           <path
//                             className="opacity-75"
//                             fill="currentColor"
//                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                           ></path>
//                         </svg>
//                         Signing in...
//                       </>
//                     ) : (
//                       "Sign in"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>

//             {/* Security Information */}
//             <div className="bg-orange-50 p-6 sm:p-8 flex flex-col justify-center">
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-800">Security Information</h3>
//                   <p className="mt-1 text-sm text-gray-600">
//                     This system is for authorized personnel only.
//                   </p>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 h-6 w-6 text-orange-600">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                       </svg>
//                     </div>
//                     <div className="ml-3 text-sm text-gray-700">
//                       <p>Unauthorized access is prohibited</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 h-6 w-6 text-orange-600">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                       </svg>
//                     </div>
//                     <div className="ml-3 text-sm text-gray-700">
//                       <p>All data is encrypted</p>
//                     </div>
//                   </div>

//                   <div className="flex items-start">
//                     <div className="flex-shrink-0 h-6 w-6 text-orange-600">
//                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                       </svg>
//                     </div>
//                     <div className="ml-3 text-sm text-gray-700">
//                       <p>Need help? Contact support</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { 
  Eye, 
  EyeOff, 
  Shield, 
  Lock, 
  User, 
  AlertCircle, 
  CheckCircle, 
  Loader2,
  ArrowRight,
  Home,
  Settings,
  Database,
  BarChart3,
  Users,
  Package
} from "lucide-react";

const Login = () => {
  const { loginAsAdmin } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const success = await loginAsAdmin(username, password);
      if (success) {
        if (rememberMe) {
          localStorage.setItem('rememberAdmin', 'true');
        }
        navigate("/admin");
      } else {
        setError("Invalid credentials. Try admin / admin123");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Admin login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const adminFeatures = [
    { icon: Package, title: "Product Management", desc: "Add, edit, and organize products" },
    { icon: BarChart3, title: "Analytics Dashboard", desc: "View sales and performance metrics" },
    { icon: Users, title: "User Management", desc: "Manage customer accounts and orders" },
    { icon: Database, title: "Inventory Control", desc: "Track stock levels and supplies" },
  ];

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
          <Home className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Store</span>
        </Link>
      </nav>

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl mb-6 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Secure access to your food marketplace management system
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Enhanced Login Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                  <p className="text-gray-600">Sign in to access your admin panel</p>
                </div>

                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 animate-shake">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <div>
                        <p className="text-red-800 font-medium">Authentication Failed</p>
                        <p className="text-red-600 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleLogin}>
                  {/* Username Field */}
                  <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`w-5 h-5 transition-colors ${
                          focusedField === 'username' ? 'text-orange-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          focusedField === 'username' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onFocus={() => setFocusedField('username')}
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
                        required
                        className={`w-full pl-12 pr-12 py-4 border-2 rounded-xl transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                          focusedField === 'password' 
                            ? 'border-orange-500 ring-4 ring-orange-500/20 bg-white' 
                            : 'border-gray-200 hover:border-gray-300'
                        } focus:outline-none`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <button
                      type="button"
                      className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Demo Credentials */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Settings className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Demo Credentials</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p><span className="font-medium">Username:</span> admin</p>
                          <p><span className="font-medium">Password:</span> admin123</p>
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
                        <span>Sign in to Dashboard</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    )}
                  </button>
                </form>

                {/* Security Notice */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span>Your connection is secured with 256-bit SSL encryption</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Features Section */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Admin Features */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Admin Features</h3>
                  <p className="text-gray-600">Powerful tools to manage your food marketplace</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {adminFeatures.map((feature, index) => (
                    <div 
                      key={index}
                      className="group p-6 bg-white/80 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <feature.icon className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Information */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    Security & Compliance
                  </h3>
                  <p className="text-gray-600">Enterprise-grade security for your business</p>
                </div>

                <div className="space-y-4">
                  {[
                    { icon: CheckCircle, text: "Multi-factor authentication ready" },
                    { icon: CheckCircle, text: "End-to-end data encryption" },
                    { icon: CheckCircle, text: "Regular security audits" },
                    { icon: CheckCircle, text: "GDPR compliant data handling" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-green-200">
                  <p className="text-xs text-gray-500">
                    This system is monitored for security. Unauthorized access attempts are logged and reported.
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">System Status</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">24/7</div>
                    <div className="text-sm text-gray-600">Support</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">256-bit</div>
                    <div className="text-sm text-gray-600">SSL</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-1">ISO</div>
                    <div className="text-sm text-gray-600">Certified</div>
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
  );
};

export default Login;