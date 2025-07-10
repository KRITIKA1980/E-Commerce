import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../../components/ProductGrid";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("featured");
  const [activeFilter, setActiveFilter] = useState("all");

  // Food categories with icons
  const foodCategories = [
    { id: "all", name: "All Items", icon: "🍽️" },
    { id: "groceries", name: "Groceries", icon: "🛒" },
    { id: "fruits", name: "Fruits", icon: "🍎" },
    { id: "vegetables", name: "Vegetables", icon: "🥦" },
    { id: "meat", name: "Meat", icon: "🍗" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products/category/groceries");
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sortProducts = (products) => {
    switch(sortOption) {
      case "price-low": return [...products].sort((a, b) => a.price - b.price);
      case "price-high": return [...products].sort((a, b) => b.price - a.price);
      case "rating": return [...products].sort((a, b) => b.rating - a.rating);
      case "newest": return [...products].reverse();
      default: return products;
    }
  };

  const filteredProducts = sortProducts(
    products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === "all" || 
                          product.category.toLowerCase().includes(activeFilter);
      return matchesSearch && matchesFilter;
    })
  );

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 inline-block max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Menu Unavailable</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
          >
            Refresh Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen">
      {/* New Card-style Header */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 mb-12 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Fresh Food Selection</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Handpicked quality ingredients for your kitchen
        </p>
      </div>

      {/* New Sidebar + Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="sticky top-8 space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search food..."
                className="w-full px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 focus:border-orange-600 pr-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-4 top-3.5 text-gray-400">
                🔍
              </span>
            </div>
            
            {/* Categories */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span>🗂️</span> Categories
              </h3>
              <div className="space-y-2">
                {foodCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg transition-all ${activeFilter === category.id ? 'bg-orange-600 text-white' : 'bg-white text-gray-800 hover:bg-gray-100'}`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sorting */}
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                <span>🔃</span> Sort By
              </h3>
              <select
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-600 text-gray-800"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
            
            {/* Add Product Button */}
            <Link 
              to="/admin/products/new" 
              className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 transition-all"
            >
              <span>+</span>
              <span>Add New Item</span>
            </Link>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeFilter === 'all' ? 'All Products' : foodCategories.find(c => c.id === activeFilter)?.name}
            </h2>
            {!loading && filteredProducts.length > 0 && (
              <p className="text-sm text-gray-500">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>
          
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
              <p className="text-gray-600">Loading delicious options...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-orange-50 rounded-xl">
              <div className="text-7xl mb-6 text-orange-200">🍽️</div>
              <h3 className="text-2xl font-medium mb-3 text-gray-800">No items found</h3>
              <p className="mb-6 text-gray-600 max-w-md mx-auto">
                We couldn't find any food items matching your search. Try different filters.
              </p>
              <button 
                className="px-6 py-3 rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 transition-all"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                  setSortOption('featured');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Product Grid */}
          {!loading && filteredProducts.length > 0 && (
            <div className="bg-white rounded-xl">
              <ProductGrid products={filteredProducts} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;