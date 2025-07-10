import { useState, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext.jsx"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3) // Example cart count
  const { isCustomer, user, logout } = useContext(AuthContext)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FV</span>
            </div>
            <h1 className="font-bold text-xl">FoodVerse</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800 ${isActive("/") ? "text-orange-400 bg-gray-800" : "hover:text-orange-400"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Home</span>
            </Link>

            <Link
              to="/products"
              className={`flex items-center space-x-1 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800 ${isActive("/products") ? "text-orange-400 bg-gray-800" : "hover:text-orange-400"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Shop</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center space-x-1 transition-colors duration-200 px-3 py-2 rounded-md hover:bg-gray-800 relative ${isActive("/cart") ? "text-orange-400 bg-gray-800" : "hover:text-orange-400"}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5z"
                />
              </svg>
              <span>Cart</span>
              {/* {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )} */}
            </Link>
          </div>

          {/* Desktop Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isCustomer ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md transition-colors duration-200 ${isActive("/profile") ? "ring-2 ring-green-300" : ""}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="ml-2 flex items-center space-x-1 border border-gray-600 hover:border-gray-500 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors duration-200"
                >
                  <span>Logout</span>
                </button>
                {/* Logout Confirmation Dialog */}
                {showLogoutDialog && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-80 text-gray-900">
                      <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
                      <p className="mb-6">Are you sure you want to log out?</p>
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={cancelLogout}
                          className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmLogout}
                          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/customer-login"
                className={`flex items-center space-x-1 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-md transition-colors duration-200 ${isActive("/customer-login") ? "ring-2 ring-orange-300" : ""}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span>Customer Login</span>
              </Link>
            )}
            <Link
              to="/admin"
              className={`flex items-center space-x-1 border border-gray-600 hover:border-gray-500 hover:bg-gray-800 px-4 py-2 rounded-md transition-colors duration-200 ${isActive("/admin") ? "ring-2 ring-purple-300" : ""}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
              <div className="border-b border-gray-700 pb-3 mb-3">
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider px-3 py-2">Navigation</p>

                <Link
                  to="/"
                  className={`flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 ${isActive("/") ? "text-orange-400 bg-gray-700" : "hover:text-white hover:bg-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>Home</span>
                </Link>

                <Link
                  to="/products"
                  className={`flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 ${isActive("/products") ? "text-orange-400 bg-gray-700" : "hover:text-white hover:bg-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Shop</span>
                </Link>

                <Link
                  to="/cart"
                  className={`flex items-center justify-between text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 ${isActive("/cart") ? "text-orange-400 bg-gray-700" : "hover:text-white hover:bg-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v5a2 2 0 11-4 0v-5m4 0V8a2 2 0 10-4 0v5z"
                      />
                    </svg>
                    <span>Cart</span>
                  </div>
                  {cartCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              <div>
                <p className="text-gray-400 text-sm font-medium uppercase tracking-wider px-3 py-2">Account</p>

                <Link
                  to="/customer-login"
                  className={`flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 ${isActive("/customer-login") ? "text-orange-400 bg-gray-700" : "hover:text-white hover:bg-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>Customer Login</span>
                </Link>

                <Link
                  to="/admin"
                  className={`flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-colors duration-200 ${isActive("/admin") ? "text-orange-400 bg-gray-700" : "hover:text-white hover:bg-gray-700"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
