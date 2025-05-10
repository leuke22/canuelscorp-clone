import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../fetch/useUserAuth";

const AuthRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserAuth();

  if (isAuthenticated) {
    if (user && !user?.isAccountVerified) {
      return <Navigate to="/email-verification" replace />;
    }

    if (user && user?.isAccountVerified) {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

export default AuthRoute;
