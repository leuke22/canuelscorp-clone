import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../fetch/useUserAuth";

const EmailRoute = ({ children }) => {
  const { isAuthenticated, user, isVerifiedOtpSuccess } = useUserAuth();

  if (user && !user?.isAccountVerified) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if ((user && user.isAccountVerified) || isVerifiedOtpSuccess) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default EmailRoute;
