import "./index.css";
import Nav from "./Nav";
import Footer from "./Footer";

import { Route, Routes } from "react-router-dom";

import { Home, Products, Services, Contact, About, Cart } from "./pages/userSections";

import { Login, Signup, EmailVerification, UpdateProfile, ChangePassword, ResetPassVerification } from "./pages";
import { Dashboard, Orders, Users, AdminProducts } from "./pages/adminSections";
import ScrollTop from "../ScrollTop";

import { AdminRoute, AuthRoute, ProtectedRoute, EmailRoute } from "./pages/protectedRoutes";

import { Toaster } from "react-hot-toast";
import { useUserAuth } from "./fetch/useUserAuth";
import { useEffect } from "react";

const App = () => {
  const { getProfile, checkingAuth, user } = useUserAuth();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <main>
      <ScrollTop />
      <div className="bg-white h-[100px] w-full"></div>
      <section>
        <Nav />
        <Routes>
          <Route path="/" element={ <ProtectedRoute allowFirstVisit={true}> <Home to="/home" replace /> </ProtectedRoute> } />
          <Route path="/products" element={ <ProtectedRoute allowFirstVisit={true}> <Products /> </ProtectedRoute> } />
          <Route path="/services" element={ <ProtectedRoute allowFirstVisit={true}> <Services /> </ProtectedRoute> } />
          <Route path="/contact" element={ <ProtectedRoute allowFirstVisit={true}> <Contact /> </ProtectedRoute> } />
          <Route path="/about" element={ <ProtectedRoute allowFirstVisit={true}> <About /> </ProtectedRoute> } />
          <Route path="/login" element={ <AuthRoute> <Login /> </AuthRoute> } />
          <Route path="/signup" element={ <AuthRoute> <Signup /> </AuthRoute> }/>
          <Route path="/email-verification" element={<EmailRoute><EmailVerification /></EmailRoute>  } />
          <Route path="/profile" element={  <UpdateProfile /> } />
          <Route path="/change-password" element={  <ChangePassword /> } />
          <Route path="/resetOtp-verification" element={ <ResetPassVerification/>} />
          <Route path="/cart" element={ <Cart/>} />

          <Route path="/admin" element={ <AdminRoute> <Dashboard /> </AdminRoute> } />
          <Route path="/admin/products" element={ <AdminRoute> <AdminProducts /> </AdminRoute> } />
          <Route path="/admin/orders" element={ <AdminRoute> <Orders /> </AdminRoute> } />
          <Route path="/admin/users" element={ <AdminRoute> <Users /> </AdminRoute> } />
        </Routes>
      </section>
      <Footer />
      <Toaster />
    </main>
  );
};

export default App;
