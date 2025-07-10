import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="p-4    bg-gray-800
text-white flex justify-between">
      <h1 className="font-bold text-lg">FoodVerse</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
       
        <Link to="/cart">Cart</Link>
        <Link to="/products">shop</Link>
        <Link to ="/customer-login">Customer -login</Link>
          <Link to ="/login">admin</Link>
      </div>
    </nav>
  );
};

export default Navbar;
