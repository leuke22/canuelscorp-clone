import { useUserAuth } from "../../fetch/useUserAuth";
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user.isVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
