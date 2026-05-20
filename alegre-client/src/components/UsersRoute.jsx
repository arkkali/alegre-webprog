import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import UsersPage from "../pages/DashboardPages/UsersPage.jsx";

function UsersRoute() {
  const { user } = useAuth();
  if (user?.role !== "Admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return <UsersPage />;
}

export default UsersRoute;
