import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Orders from "../pages/admin/Orders";
import ProtectedRoute from "./ProtectedRoute";

const AdminRoutes = {
  path: "/admin",
  element: (
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: "", element: <AdminDashboard /> },
    { path: "orders", element: <Orders /> },
  ],
};

export default AdminRoutes;
