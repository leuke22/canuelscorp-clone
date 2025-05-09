const RedirectAuthRoute = ({ children }) => {
  const { isAuthenticated, user } = useUserAuth();

  if (isAuthenticated && user.isAccountVerified) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RedirectAuthRoute;
