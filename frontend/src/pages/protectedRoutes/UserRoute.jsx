import { Navigate } from "react-router-dom";
import { useUserAuth } from "../../fetch/useUserAuth";

const UserRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !user?.isAccountVerified) {
    return <Navigate to="/email-verification" replace />;
  }

  return <>{children}</>;
};

export default UserRoute;
