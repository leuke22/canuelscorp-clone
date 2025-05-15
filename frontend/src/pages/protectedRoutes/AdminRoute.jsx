import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../fetch/useUserAuth";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserAuth();

  const isUserAdmin = user?.role === "admin" || user?.role === "supervisor";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isAccountVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  if (!isUserAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
