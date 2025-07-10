import React, { useState } from 'react';

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Pizza", price: 250 },
    { id: 2, name: "Burger", price: 120 },
    { id: 3, name: "Pasta", price: 180 }
  ]);

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Manage Menu</h1>
      <table className="w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map(item => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageMenu;
