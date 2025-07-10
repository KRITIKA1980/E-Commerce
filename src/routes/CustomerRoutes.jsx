import CustomerLayout from "../layouts/CustomerLayout";
import Home from "../pages/customer/Home";
import ProductList from "../pages/customer/ProductList";
import ProductDetails from "../pages/customer/ProductDetails";
import Cart from "../pages/customer/Cart";
import Login from "../pages/Login"; 
import CustomerLogin from "../pages/CustomerLogin";  // <-- New import

const CustomerRoutes = {
  path: "/",
  element: <CustomerLayout />,
  children: [
    { path: "", element: <Home /> },
    { path: "products", element: <ProductList /> },
    { path: "products/:id", element: <ProductDetails /> },
    { path: "cart", element: <Cart /> },
    { path: "login", element: <Login /> },
    { path: "customer-login", element: <CustomerLogin /> }, 
  ],
};

export default CustomerRoutes;