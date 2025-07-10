import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  if (!Array.isArray(products)) {
    console.warn("ProductGrid expected an array, got:", products);
    return <p className="text-red-600">Invalid product list.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) =>
        product ? (
          <ProductCard key={product.id || index} product={product} />
        ) : (
          <div key={index} className="text-red-400">Invalid product</div>
        )
      )}
    </div>
  );
};

export default ProductGrid;


