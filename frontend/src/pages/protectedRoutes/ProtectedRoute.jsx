import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../fetch/useUserAuth";
const ProtectedRoute = ({ children, allowFirstVisit = false }) => {
  const { isAuthenticated, user, isUserFirstVisit, isVerifiedOtpSuccess } =
    useUserAuth();

  if ((isUserFirstVisit && allowFirstVisit) || isVerifiedOtpSuccess) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user?.isAccountVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
