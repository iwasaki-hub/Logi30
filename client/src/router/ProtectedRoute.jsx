import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, initializing } = useAuth();

  const location = useLocation();

  if (initializing) {
    return (
      <div className="screen-locader" role="status" aria-live="polite">
        <div className="screen-loader__mark" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
