const AdminDashboard = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header with Sidebar-inspired Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar Area */}
        <div className="lg:w-1/4 space-y-8">
          {/* Admin Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border-l-4 border-[#dc2626] animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-[#dc2626] text-2xl font-bold">AD</div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Admin User</h2>
                <p className="text-gray-500 text-sm">Administrator</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-gray-500 text-sm">Notifications</p>
                <p className="text-[#dc2626] font-bold text-xl animate-bounce">3</p>
              </div>
              <div className="text-center">
                <p className="text-gray-500 text-sm">Messages</p>
                <p className="text-[#dc2626] font-bold text-xl animate-bounce">5</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-white text-[#dc2626] hover:bg-red-100 transition-all duration-300 hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Manage Orders</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-white text-[#dc2626] hover:bg-red-100 transition-all duration-300 hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span>Manage Products</span>
              </button>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-red-50 to-white text-[#dc2626] hover:bg-red-100 transition-all duration-300 hover:translate-x-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span>Manage Users</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:w-3/4 space-y-8">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
              <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-300 transition-all duration-300"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Stats Cards - Circular Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
              <div className="relative">
                <svg className="w-12 h-12 text-red-100" viewBox="0 0 36 36">
                  <path 
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-gray-800">1,245</p>
                <p className="text-xs text-[#dc2626] flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  12% from last month
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
              <div className="relative">
                <svg className="w-12 h-12 text-red-100" viewBox="0 0 36 36">
                  <path 
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeDasharray="60, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">320</p>
                <p className="text-xs text-[#dc2626] flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  8% from last month
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center space-x-4 hover:shadow-md transition-shadow duration-300">
              <div className="relative">
                <svg className="w-12 h-12 text-red-100" viewBox="0 0 36 36">
                  <path 
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                    strokeDasharray="85, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#dc2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Revenue</p>
                <p className="text-2xl font-bold text-gray-800">$56,300</p>
                <p className="text-xs text-[#dc2626] flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  15% from last month
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity with Timeline */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
              <button className="text-[#dc2626] text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start group">
                <div className="relative mr-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-[#dc2626] group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-gray-200 transform -translate-x-1/2 group-hover:bg-red-200 transition-colors duration-300"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 group-hover:text-[#dc2626] transition-colors duration-200">New order #1245 received</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                  <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Customer: John Smith | Total: $125.00
                  </div>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="relative mr-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-[#dc2626] group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 bg-gray-200 transform -translate-x-1/2 group-hover:bg-red-200 transition-colors duration-300"></div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 group-hover:text-[#dc2626] transition-colors duration-200">New user registered</p>
                  <p className="text-sm text-gray-500">15 minutes ago</p>
                  <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Username: john.doe | Email: john@example.com
                  </div>
                </div>
              </div>

              <div className="flex items-start group">
                <div className="relative mr-4">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center text-[#dc2626] group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 group-hover:text-[#dc2626] transition-colors duration-200">System updated to v2.3.1</p>
                  <p className="text-sm text-gray-500">1 hour ago</p>
                  <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    Security patches and performance improvements
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;