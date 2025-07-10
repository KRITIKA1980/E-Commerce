import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-60 bg-gray-900 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col space-y-4">
        <Link to="/admin">Dashboard</Link>
        <Link to="/admin/menu">Manage Menu</Link>
        <Link to="/admin/orders">Orders</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;