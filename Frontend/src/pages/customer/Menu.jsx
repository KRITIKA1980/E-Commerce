import React, { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';

const Menu = () => {
  const { addToCart } = useContext(CartContext);

  const foodItems = [
    { id: 1, name: 'Pizza', price: 250 },
    { id: 2, name: 'Burger', price: 120 },
    { id: 3, name: 'Fries', price: 90 }
  ];

  return (
    <div className="p-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <ul>
        {foodItems.map(item => (
          <li key={item.id} className="border-b py-2 flex justify-between items-center">
            <Link to={`/food/${item.id}`} className="text-lg font-semibold">{item.name}</Link>
            <span>₹{item.price}</span>
            <button onClick={() => addToCart(item)} className="ml-4 bg-green-500 text-white px-2 py-1 rounded">
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
