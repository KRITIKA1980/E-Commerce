const Orders = () => {
  // Sample order data - replace with real data from your API
  const orders = [
    { id: '#1001', customer: 'John Doe', date: '2023-05-15', status: 'Delivered', total: '$125.99' },
    { id: '#1002', customer: 'Jane Smith', date: '2023-05-16', status: 'Shipped', total: '$89.50' },
    { id: '#1003', customer: 'Robert Johnson', date: '2023-05-17', status: 'Processing', total: '$234.75' },
    { id: '#1004', customer: 'Emily Davis', date: '2023-05-18', status: 'Pending', total: '$156.20' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-orange-100 text-orange-800';
      case 'Pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500">View and manage all customer orders</p>
        </div>
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-900 hover:bg-gray-200 transition-colors"
          >
            Export Orders
          </button>
          <button 
            className="px-4 py-2 rounded-md text-sm font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            Create New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-lg bg-gray-100">
        <select className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white">
          <option>All Statuses</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
        <input 
          type="date" 
          className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white"
        />
        <input 
          type="text" 
          placeholder="Search orders..." 
          className="px-3 py-2 rounded-md text-sm border border-gray-300 bg-white"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-sm mr-3 text-orange-500 hover:text-orange-700"
                    >
                      View
                    </button>
                    <button 
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing 1 to 4 of 4 orders
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-900 hover:bg-gray-200">Previous</button>
          <button className="px-3 py-1 rounded-md text-sm bg-orange-500 text-white hover:bg-orange-600">1</button>
          <button className="px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-900 hover:bg-gray-200">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;