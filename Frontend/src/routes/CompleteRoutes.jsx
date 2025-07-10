import { createBrowserRouter } from "react-router-dom";
import CustomerRoutes from "./CustomerRoutes";
import AdminRoutes from "./AdminRoutes";

const router = createBrowserRouter([
  CustomerRoutes,
  AdminRoutes,
]);

export default router;