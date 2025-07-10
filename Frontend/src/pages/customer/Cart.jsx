// import { useContext } from "react";
// import { CartContext } from "../../contexts/CartContext";

// const Cart = () => {
//   const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);

//   const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//   return (
//     <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
//       {/* Header Section */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">Your Shopping Cart</h1>
//         <p className="text-sm mt-2 text-gray-500">
//           {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
//         </p>
//       </div>

//       {cartItems.length === 0 ? (
//         <div className="text-center py-16 bg-white rounded-lg shadow-sm p-8 max-w-md mx-auto">
//           <div className="text-6xl mb-6 text-gray-200">🛒</div>
//           <h3 className="text-xl font-medium mb-3 text-gray-800">Your cart is empty</h3>
//           <p className="mb-6 text-gray-500">Browse our collection to find something you like</p>
//           <button 
//             className="px-6 py-3 rounded-md font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <div className="hidden md:grid grid-cols-12 bg-gray-100 p-4 text-sm uppercase tracking-wider text-gray-500">
//                 <div className="col-span-5">Product</div>
//                 <div className="col-span-2 text-center">Price</div>
//                 <div className="col-span-3 text-center">Quantity</div>
//                 <div className="col-span-2 text-right">Subtotal</div>
//               </div>
              
//               <ul className="divide-y divide-gray-200">
//                 {cartItems.map((item) => (
//                   <li key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
//                     <div className="grid grid-cols-12 items-center gap-4">
//                       {/* Product Info */}
//                       <div className="col-span-5 flex items-center space-x-4">
//                         <div className="w-20 h-20 rounded-md overflow-hidden bg-gray-100">
//                           <img 
//                             src={item.image || '/placeholder-product.jpg'} 
//                             alt={item.title} 
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-800">{item.title}</h3>
//                           <p className="text-sm text-gray-500">{item.category}</p>
//                         </div>
//                       </div>

//                       {/* Price */}
//                       <div className="col-span-2 text-center text-gray-800">
//                         ${item.price.toFixed(2)}
//                       </div>

//                       {/* Quantity */}
//                       <div className="col-span-3 flex justify-center">
//                         <div className="flex items-center border rounded-md border-gray-300">
//                           <button 
//                             className="px-3 py-1 text-lg hover:bg-gray-100"
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             disabled={item.quantity <= 1}
//                             style={{ 
//                               color: item.quantity <= 1 ? '#9CA3AF' : '#EA580C',
//                             }}
//                           >
//                             -
//                           </button>
//                           <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
//                           <button 
//                             className="px-3 py-1 text-lg hover:bg-gray-100 text-orange-600"
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                           >
//                             +
//                           </button>
//                         </div>
//                       </div>

//                       {/* Subtotal & Remove */}
//                       <div className="col-span-2 flex items-center justify-end space-x-4">
//                         <span className="font-medium text-gray-800">
//                           ${(item.price * item.quantity).toFixed(2)}
//                         </span>
//                         <button 
//                           onClick={() => removeFromCart(item.id)}
//                           className="text-orange-600 hover:text-orange-800 transition-colors"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Cart Actions */}
//             <div className="flex justify-between mt-6">
//               <button 
//                 className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
//                 onClick={clearCart}
//               >
//                 Clear Cart
//               </button>
//               <button 
//                 className="px-6 py-2 rounded-md font-medium bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           </div>

//           {/* Order Summary */}
//           <div>
//             <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6 border border-gray-200">
//               <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">Order Summary</h2>
              
//               <div className="space-y-4 mb-6">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Subtotal</span>
//                   <span className="text-gray-800">${total.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Shipping</span>
//                   <span className="text-gray-800">Free</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Tax</span>
//                   <span className="text-gray-800">$0.00</span>
//                 </div>
//                 <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg mt-4">
//                   <span className="text-gray-800">Total</span>
//                   <span className="text-orange-600">${total.toFixed(2)}</span>
//                 </div>
//               </div>

//               <button 
//                 className="w-full py-3 rounded-md font-medium bg-orange-500 text-white hover:bg-orange-600 transition-colors"
//               >
//                 Proceed to Checkout
//               </button>
              
//               <div className="mt-4 text-sm text-gray-500 text-center">
//                 Free shipping on all orders over $50
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import { useContext, useState } from "react";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Shield, 
  Truck, 
  CreditCard,
  Gift,
  Tag,
  Heart,
  Share2
} from "lucide-react";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [showPromoInput, setShowPromoInput] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const discount = appliedPromo ? subtotal * 0.1 : 0; // 10% discount if promo applied
  const total = subtotal + shipping + tax - discount;

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo({ code: "SAVE10", discount: 10 });
      setShowPromoInput(false);
      setPromoCode("");
    } else {
      alert("Invalid promo code");
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link 
                to="/products" 
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Continue Shopping</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-orange-600 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-orange-600 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </nav>

        {/* Main Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            Review your items and proceed to checkout when ready
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Enhanced Empty State */
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h3>
              <p className="text-gray-600 mb-8 text-lg">
                Discover amazing products and start building your perfect order
              </p>
              <div className="space-y-4">
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Start Shopping</span>
                </Link>
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping over $50</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Enhanced Cart Items */}
            <div className="xl:col-span-2 space-y-6">
              {/* Progress Indicator */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">Order Progress</h2>
                  <span className="text-sm text-gray-500">Step 1 of 3</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      1
                    </div>
                    <span className="text-sm font-medium text-orange-600">Cart Review</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 rounded">
                    <div className="h-1 bg-orange-600 rounded w-1/3"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                      2
                    </div>
                    <span className="text-sm text-gray-500">Checkout</span>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium">
                      3
                    </div>
                    <span className="text-sm text-gray-500">Complete</span>
                  </div>
                </div>
              </div>

              {/* Cart Items Container */}
              <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                {/* Desktop Header */}
                <div className="hidden lg:grid grid-cols-12 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-700 border-b">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>
                
                {/* Cart Items */}
                <div className="divide-y divide-gray-100">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors group">
                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-4">
                        <div className="flex space-x-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img 
                              src={item.image || item.thumbnail || '/placeholder-product.jpg'} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</span>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button 
                                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4 text-gray-600" />
                              </button>
                              <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button 
                                className="p-2 hover:bg-gray-100 transition-colors"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4 text-orange-600" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:grid grid-cols-12 items-center gap-4">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                            <img 
                              src={item.image || item.thumbnail || '/placeholder-product.jpg'} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{item.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                            <div className="flex items-center space-x-4">
                              <button className="text-sm text-gray-500 hover:text-orange-600 transition-colors flex items-center space-x-1">
                                <Heart className="w-4 h-4" />
                                <span>Save for later</span>
                              </button>
                              <button className="text-sm text-gray-500 hover:text-orange-600 transition-colors flex items-center space-x-1">
                                <Share2 className="w-4 h-4" />
                                <span>Share</span>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 text-center">
                          <span className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</span>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button 
                              className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button 
                              className="p-2 hover:bg-gray-100 transition-colors"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-4 h-4 text-orange-600" />
                            </button>
                          </div>
                        </div>

                        {/* Total & Actions */}
                        <div className="col-span-2 flex items-center justify-end space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Cart Actions */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <button
                    onClick={clearCart}
                    className="flex items-center space-x-2 px-6 py-3 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition-colors font-medium"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Clear Cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Order Summary */}
            <div className="xl:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Order Summary Card */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-orange-600" />
                    <span>Order Summary</span>
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold text-gray-900">
                        {shipping === 0 ? (
                          <span className="text-green-600">Free</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                    </div>
                    
                    {appliedPromo && (
                      <div className="flex justify-between items-center text-green-600">
                        <span className="flex items-center space-x-1">
                          <Tag className="w-4 h-4" />
                          <span>Discount ({appliedPromo.code})</span>
                        </span>
                        <span className="font-semibold">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Promo Code Section */}
                  <div className="mb-6">
                    {!appliedPromo ? (
                      <div className="space-y-3">
                        {!showPromoInput ? (
                          <button
                            onClick={() => setShowPromoInput(true)}
                            className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors font-medium"
                          >
                            <Gift className="w-4 h-4" />
                            <span>Add promo code</span>
                          </button>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex space-x-2">
                              <input
                                type="text"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              />
                              <button
                                onClick={handlePromoCode}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                              >
                                Apply
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                setShowPromoInput(false);
                                setPromoCode("");
                              }}
                              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center space-x-2 text-green-700">
                          <Tag className="w-4 h-4" />
                          <span className="font-medium">{appliedPromo.code} applied</span>
                        </div>
                        <button
                          onClick={removePromo}
                          className="text-green-600 hover:text-green-800 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Checkout Button */}
                  <button className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg mb-4">
                    Proceed to Checkout
                  </button>
                  
                  {/* Security Features */}
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>
                        {shipping === 0 ? "Free shipping included" : `$${(50 - subtotal).toFixed(2)} away from free shipping`}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-purple-500" />
                      <span>Multiple payment options available</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Why shop with us?</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Secure Payment</div>
                        <div className="text-gray-600">Your payment info is safe</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Truck className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Fast Delivery</div>
                        <div className="text-gray-600">Quick and reliable shipping</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">Quality Guarantee</div>
                        <div className="text-gray-600">100% satisfaction promise</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Cart;