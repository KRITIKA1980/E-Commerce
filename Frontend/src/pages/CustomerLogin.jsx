// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import Footer from "../components/Footer"; // Make sure the path is correct

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
//            setError("Invalid credentials. Try 'customer' / 'cust123'");
//       }
//     } catch (err) {
//       setError("Login failed. Please try again.");
//       console.error("Admin login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
//         <div className="max-w-5xl w-full mx-auto flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
//           {/* Left: Login Form */}
//           <div className="w-full lg:w-1/2 p-8 sm:p-10">
//             <div className="text-center mb-8">
//               <svg
//                 className="mx-auto h-12 w-12 text-orange-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
//                 />
//               </svg>
//               <h2 className="mt-6 text-3xl font-extrabold text-gray-800">
//                 Admin Dashboard
//               </h2>
//               <p className="mt-2 text-lg text-gray-600">
//                 Sign in to manage your food products
//               </p>
//             </div>

//             {error && (
//               <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm border border-red-100">
//                 <div className="flex items-center">
//                   <svg
//                     className="h-5 w-5 mr-2"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                     />
//                   </svg>
//                   {error}
//                 </div>
//               </div>
//             )}

//             <form className="space-y-6" onSubmit={handleLogin}>
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700">
//                   Username
//                 </label>
//                 <input
//                   id="username"
//                   name="username"
//                   type="text"
//                   required
//                   className="mt-1 py-2 pl-3 pr-4 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//                   placeholder="admin"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   required
//                   className="mt-1 py-2 pl-3 pr-4 block w-full border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   loading
//                     ? "bg-orange-400"
//                     : "bg-orange-600 hover:bg-orange-700"
//                 } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500`}
//               >
//                 {loading ? (
//                   <>
//                     <svg
//                       className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Signing in...
//                   </>
//                 ) : (
//                   "Sign in"
//                 )}
//               </button>
//             </form>
//           </div>

//           {/* Right: Food Image */}
//           <div className="hidden lg:block w-full lg:w-1/2">
            // <img
            //   src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80"
            //   alt="Food Admin Visual"
            //   className="h-full w-full object-cover"
            // />
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <Footer />
//     </>
//   );
// };

// export default Login;
// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// const CustomerLogin = () => {
//   const { loginAsCustomer } = useContext(AuthContext);
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
//       const success = await loginAsCustomer(username, password);
//       if (success) {
//         navigate("/");
//       } else {
//         setError("Invalid credentials. Try 'customer' / 'cust123'");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-800">
//       <div className="border border-gray-700 p-8 rounded-lg shadow-sm w-full max-w-md bg-white">
//         {/* Logo/Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
//           <p className="text-sm text-gray-600">Sign in to your customer account</p>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="mb-4 p-3 rounded-md text-sm bg-red-100 text-red-800">
//             {error}
//           </div>
//         )}

//         {/* Login Form */}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label htmlFor="username" className="block text-sm font-medium mb-1 text-gray-800">
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-800">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full px-4 py-2 rounded-md font-medium flex justify-center items-center bg-orange-600 text-white hover:bg-orange-700 transition-colors"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//                 Signing in...
//               </>
//             ) : 'Sign In'}
//           </button>
//         </form>

//         {/* Additional Links */}
//         <div className="mt-6 text-center text-sm text-gray-600">
//           <Link 
//             to="/forgot-password" 
//             className="hover:text-orange-600 transition-colors duration-200"
//           >
//             Forgot password?
//           </Link>
//           <span className="mx-2">•</span>
//           <Link 
//             to="/register" 
//             className="hover:text-orange-600 transition-colors duration-200"
//           >
//             Create account
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;
// import { useContext, useState } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate, Link } from "react-router-dom";

// const CustomerLogin = () => {
//   const { loginAsCustomer } = useContext(AuthContext);
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
//       const success = await loginAsCustomer(username, password);
//       if (success) {
//         navigate("/");
//       } else {
//         setError("Invalid credentials. Try 'customer' / 'cust123'");
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.");
//       console.error("Login error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <div className="flex shadow-lg rounded-xl overflow-hidden w-full max-w-5xl">
//         {/* Left: Login form */}
//         <div className="w-full md:w-1/2 bg-white p-10">
//           <div className="text-center mb-8">
//             <div className="text-orange-600 text-4xl font-bold mb-2">
//               <svg className="mx-auto h-10 w-10 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105-.895-2-2-2s-2 .895-2 2m6 0c0-1.105-.895-2-2-2s-2 .895-2 2m6 0c0-1.105-.895-2-2-2s-2 .895-2 2m0 6h.01M4 6h16M4 10h16M4 14h16M4 18h16" />
//               </svg>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-800">Customer Dashboard</h2>
//             <p className="text-sm text-gray-500">Sign in to manage your food orders</p>
//           </div>

//           {error && (
//             <div className="mb-4 p-3 rounded-md text-sm bg-red-100 text-red-800">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleLogin}>
//             <div className="mb-4">
//               <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 placeholder="Enter username"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//                 placeholder="Enter password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-orange-600 text-white font-semibold py-2 rounded-md hover:bg-orange-700 transition-colors flex items-center justify-center"
//             >
//               {loading ? (
//                 <>
//                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Signing in...
//                 </>
//               ) : (
//                 "Sign In"
//               )}
//             </button>
//           </form>

//           <div className="mt-6 text-center text-sm text-gray-600">
//             <Link to="/forgot-password" className="hover:text-orange-600 transition-colors">
//               Forgot password?
//             </Link>
//             <span className="mx-2">•</span>
//             <Link to="/register" className="hover:text-orange-600 transition-colors">
//               Create account
//             </Link>
//           </div>
//         </div>

//         {/* Right: Image with direct URL */}
//         <div className="hidden md:block md:w-1/2 bg-black">
//             <img
//               src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80"
//               alt="Food Admin Visual"
//               className="h-full w-full object-cover"
//             />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerLogin;

"use client"

import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { Eye, EyeOff, User, Lock } from "lucide-react"

const CustomerLogin = () => {
  const { loginAsCustomer } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Client-side validation
    if (!formData.username || !formData.password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }

    try {
      const success = await loginAsCustomer(formData.username, formData.password)
      if (success) {
        navigate("/")
      } else {
        setError("Invalid credentials. Please check your username and password.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl border border-orange-100">
        {/* Header */}
        <div className="px-6 py-8 text-center border-b border-gray-100">
          <div className="mx-auto w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to manage your food orders</p>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">{error}</div>
            )}

            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-orange-500 hover:text-orange-600 underline">
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center ${
                loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium underline">
                Create one here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomerLogin
  