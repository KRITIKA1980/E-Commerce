import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    name: ""
  });
  const { addToCart } = useContext(CartContext);

  // Using the new orange color (#ea5f30) as secondary accent color
  const orangeColor = "rgb(234 95 48)";
  const colors = [
    { name: "Classic Red", code: "#dc2626" },
    { name: "Deep Orange", code: orangeColor },
    { name: "Cream White", code: "#f5f5f5" }
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setReviews([
          {
            id: 1,
            user: "Alex Johnson",
            rating: 4,
            comment: "Great quality! The color is exactly as shown.",
            date: "2023-05-15"
          },
          {
            id: 2,
            user: "Sarah Miller",
            rating: 5,
            comment: "Absolutely love this product. Highly recommend!",
            date: "2023-06-22"
          }
        ]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      user: newReview.name || "Anonymous",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, review]);
    setNewReview({ rating: 5, comment: "", name: "" });
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: orangeColor }}></div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Product not found</h2>
      <Link 
        to="/products" 
        className="inline-block px-6 py-2 rounded-md font-medium text-white hover:bg-opacity-90 transition-colors"
        style={{ backgroundColor: orangeColor }}
      >
        Browse Products
      </Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Product Top Section */}
      <div className="flex flex-col lg:flex-row gap-12 mb-16">
        {/* Product Image Gallery */}
        <div className="w-full lg:w-1/2">
          <div className="bg-gray-50 rounded-xl aspect-[4/3] flex items-center justify-center p-12 border border-gray-200 relative">
            <img 
              src={product.images?.[0] || product.thumbnail} 
              alt={product.title} 
              className="max-h-full max-w-full object-contain"
            />
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 text-white px-3 py-1 rounded-full text-sm font-bold"
                style={{ backgroundColor: orangeColor }}>
                {Math.round(product.discountPercentage)}% OFF
              </div>
            )}
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images?.slice(0,4).map((img, index) => (
              <div 
                key={index}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-800 cursor-pointer transition-colors"
                onClick={() => setSelectedImage(index)}
              >
                <img 
                  src={img} 
                  alt={`${product.title} ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <div className="mb-2 text-sm uppercase tracking-wider font-medium"
            style={{ color: orangeColor }}>
            {product.brand}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-current' : 'fill-none stroke-current'}`}
                  viewBox="0 0 24 24"
                  style={{ color: orangeColor }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <p className="text-4xl font-bold text-gray-900">
              R{product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}
            </p>
            {product.discountPercentage > 0 && (
              <p className="text-sm text-gray-500 line-through mt-1">
                R{(product.price / (1 - product.discountPercentage/100)).toLocaleString('en-US', {minimumFractionDigits: 2})}
              </p>
            )}
          </div>

          {/* Color Selection */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">COLOR: {colors[selectedColor].name}</h3>
            <div className="flex space-x-3">
              {colors.map((color, index) => (
                <button 
                  key={index}
                  className={`w-10 h-10 rounded-full border-2 ${selectedColor === index ? 'border-gray-900' : 'border-transparent'} ${color.code === '#f5f5f5' ? 'border-gray-200' : ''}`}
                  style={{ backgroundColor: color.code }}
                  onClick={() => setSelectedColor(index)}
                  aria-label={color.name}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              Low Drain color of urine, coincident following us. Choose an environment store. Measure dementia at item coincident behaviour.
            </p>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Highlights */}
          <div className="mb-8 space-y-2">
            {[
              "Premium quality home textile fabric",
              "Hypoallergenic and skin-friendly", 
              "Easy maintenance and durable"
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <svg className="flex-shrink-0 h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  style={{ color: orangeColor }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              className="flex-1 px-6 py-3 rounded-md font-medium text-white uppercase tracking-wider hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: orangeColor }}
              onClick={() => addToCart({...product, quantity: 1})}
            >
              Add to Cart
            </button>
            <button className="flex-1 px-6 py-3 rounded-md font-medium border border-gray-900 hover:bg-gray-50 transition-colors text-gray-900 uppercase tracking-wider">
              Buy Now
            </button>
          </div>

          {/* Try in Editor Link */}
          <div className="flex items-center">
            <a href="#" className="font-medium flex items-center group"
              style={{ color: orangeColor }}>
              Try In Editor
              <svg className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Reviews Section - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Existing Reviews */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ color: orangeColor }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Customer Reviews ({reviews.length})
          </h3>
          
          {reviews.length > 0 ? (
            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current'}`}
                          viewBox="0 0 24 24"
                          style={{ color: orangeColor }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{review.user}</h4>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h4 className="mt-2 text-lg font-medium text-gray-900">No reviews yet</h4>
              <p className="mt-1 text-gray-500">Be the first to review this product</p>
            </div>
          )}
        </div>

        {/* Write Review Form */}
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              style={{ color: orangeColor }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Write a Review
          </h3>
          <form onSubmit={handleReviewSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({...newReview, rating: star})}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${star <= newReview.rating ? 'fill-current' : 'fill-none stroke-current'}`}
                      viewBox="0 0 24 24"
                      style={{ color: orangeColor }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                value={newReview.name}
                onChange={(e) => setNewReview({...newReview, name: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
              <textarea
                id="comment"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-md hover:bg-opacity-90 transition-colors"
              style={{ backgroundColor: orangeColor }}
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;