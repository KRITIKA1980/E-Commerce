import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product || typeof product !== "object") {
    console.warn("Invalid product:", product);
    return null; // Don’t render if product is invalid
  }

  return (
    <div
      className="border border-[#F3F4F6] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
      style={{ backgroundColor: "#F3F4F6" }}
    >
     
      {product.thumbnail && (
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-48 w-full object-cover rounded-lg mb-3"
        />
      )}

      <h3 className="font-bold text-lg mb-1" style={{ color: "#111827" }}>
        {product.title || "No Title"}
      </h3>
      <p className="text-gray-600 font-bold text-lg mb-3">
        ₹{product.price?.toFixed(2) || "0.00"}
      </p>
      <Link
        to={`/products/${product.id}`}
        className="block text-center bg-orange-600 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
      >
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;

