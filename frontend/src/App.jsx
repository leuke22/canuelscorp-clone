import "./index.css";
import Nav from "./Nav";
import Footer from "./Footer";

import { Navigate, Route, Routes } from "react-router-dom";

import { Home, Products, Services, Contact, About } from "./pages/userSections";

import { Login, Signup, EmailVerification, UpdateProfile } from "./pages";
import { Dashboard, Orders, Users, AdminProducts } from "./pages/adminSections";
import ScrollTop from "../ScrollTop";

import { ProtectedRoute, RedirectAuthRoute } from "./pages/protectedRoutes";

import { Toaster } from "react-hot-toast";
import { useUserAuth } from "./fetch/useUserAuth";
import { useEffect } from "react";

const App = () => {
  const { user, getProfile, checkingAuth } = useUserAuth();

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const isUserAdmin = user?.role === "admin" || user?.role === "supervisor";

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
      <Nav />
      <div className="bg-white h-[100px] w-full"></div>
      <section>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home to="/home" replace />
              </ProtectedRoute>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/email-verification" element={<EmailVerification />} />
          <Route path="/profile" element={<UpdateProfile />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </section>
      <Footer />
      <Toaster />
    </main>
  );
};

export default App;
