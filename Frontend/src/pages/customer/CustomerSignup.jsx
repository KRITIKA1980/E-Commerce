// import { useState, useContext } from 'react';
// import { AuthContext } from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { FaUser, FaEnvelope, FaLock, FaSignature } from 'react-icons/fa';
// import axios from 'axios';

// const CustomerSignup = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { loginAsCustomer } = useContext(AuthContext); // ✅
//   const navigate = useNavigate();

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       // ✅ Register with role: customer
//       await axios.post("http://localhost:5000/api/auth/register", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//         role: 'customer'
//       });

//       // ✅ Auto login after signup
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email: form.email,
//         password: form.password,
//         role: 'customer'
//       });

//       // login({ ...res.data.user, token: res.data.token });
//       loginAsCustomer(form.email, form.password);
//       navigate("/");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError(err?.response?.data?.error || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="flex justify-center">
//           <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center">
//             <FaUser className="text-white text-2xl" />
//           </div>
//         </div>
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create Your Account</h2>
//         <p className="mt-2 text-center text-sm text-gray-600">Join us to start shopping today</p>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm rounded">
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <InputField label="Full Name" name="name" icon={<FaSignature />} value={form.name} onChange={handleChange} />
//             <InputField label="Email address" name="email" type="email" icon={<FaEnvelope />} value={form.email} onChange={handleChange} />
//             <InputField label="Password" name="password" type="password" icon={<FaLock />} value={form.password} onChange={handleChange} />
//             <InputField label="Confirm Password" name="confirmPassword" type="password" icon={<FaLock />} value={form.confirmPassword} onChange={handleChange} />

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
//                 } transition`}
//               >
//                 {loading ? 'Creating...' : 'Create Account'}
//               </button>
//             </div>
//           </form>

//           <div className="mt-6 text-center text-sm">
//             Already have an account?{' '}
//             <a href="/customer/login" className="text-blue-600 hover:underline">
//               Sign in
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // 🔄 Reusable input field
// const InputField = ({ label, name, icon, value, onChange, type = "text" }) => (
//   <div>
//     <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
//     <div className="mt-1 relative rounded-md shadow-sm">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">{icon}</div>
//       <input
//         id={name}
//         name={name}
//         type={type}
//         required
//         className="py-3 pl-10 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//         value={value}
//         onChange={onChange}
//       />
//     </div>
//   </div>
// );

// export default CustomerSignup;

"use client"

// import type React from "react"
import { Link } from 'react-router-dom'
import { useState } from "react"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"

export default function Component() {
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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long")
      setLoading(false)
      return
    }

    try {
      // Register user
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: "customer",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      setSuccess("Account created successfully! You can now sign in.")

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      })

      // Optional: Auto-login after successful registration
      // You can uncomment this if you want automatic login
      /*
      try {
        const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            role: "customer",
          }),
        })

        const loginData = await loginResponse.json()
        
        if (loginResponse.ok) {
          // Store token in localStorage or context
          localStorage.setItem("token", loginData.token)
          localStorage.setItem("user", JSON.stringify(loginData.user))
          
          // Redirect to dashboard or home page
          window.location.href = "/"
        }
      } catch (loginError) {
        console.error("Auto-login failed:", loginError)
      }
      */
    } catch (err) {
      console.error("Signup error:", err)
      setError(err.message || "Registration failed. Please try again.")
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
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join us today and start your journey</p>
        </div>

        {/* Form Content */}
        <div className="px-6 py-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded">{error}</div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded">
                {success}
              </div>
            )}
            {/* Full Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  value={formData.email}
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
                  placeholder="Create a strong password"
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

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-medium py-2.5 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                loading ? "bg-orange-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600"
              } text-white`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Sign In Link */}
            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to='/customer-login' className="text-orange-500 hover:text-orange-600 font-medium underline">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
