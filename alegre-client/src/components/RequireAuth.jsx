import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

function RequireAuth({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0c0e2f] text-slate-400 text-sm">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/auth/signin" replace state={{ from: location }} />
    );
  }

  return children;
}

export default RequireAuth;
