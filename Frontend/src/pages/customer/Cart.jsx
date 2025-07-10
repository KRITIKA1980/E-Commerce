import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
        <p className="text-sm mt-2 text-gray-500">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
          <div className="text-6xl mb-6 text-gray-200">🛒</div>
          <h3 className="text-xl font-medium mb-3 text-gray-800">Your cart is empty</h3>
          <p className="mb-6 text-gray-500">Browse our collection to find something you like</p>
          <button 
            className="px-6 py-3 rounded-md font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 text-sm uppercase tracking-wider text-gray-500">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>
              
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 items-center gap-4">
                      {/* Product Info */}
                      <div className="col-span-5 flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
                          <img 
                            src={item.image || '/placeholder-product.jpg'} 
                            alt={item.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-800">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2 text-center text-gray-800">
                        ${item.price.toFixed(2)}
                      </div>

                      {/* Quantity */}
                      <div className="col-span-3 flex justify-center">
                        <div className="flex items-center border rounded-md border-gray-300">
                          <button 
                            className="px-3 py-1 text-lg hover:bg-gray-100"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            style={{ 
                              color: item.quantity <= 1 ? '#9CA3AF' : '#EA580C',
                            }}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 text-lg hover:bg-gray-100 text-orange-600"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal & Remove */}
                      <div className="col-span-2 flex items-center justify-end space-x-4">
                        <span className="font-medium text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-orange-600 hover:text-orange-800 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cart Actions */}
            <div className="flex justify-between mt-6">
              <button 
                className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button 
                className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6 border border-gray-200">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-800">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-800">$0.00</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg mt-4">
                  <span className="text-gray-800">Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                className="w-full py-3 rounded-md font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                Free shipping on all orders over $50
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;