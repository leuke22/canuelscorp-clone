import "./index.css";
import Nav from "./Nav";
import Footer from "./Footer";

import { Route, Routes } from "react-router-dom";

import { Home, Products, Services, Contact, About } from "./pages/userSections";

import { Login, Signup, EmailVerification, UpdateProfile } from "./pages";
import { Dashboard, Orders, Users, AdminProducts } from "./pages/adminSections";
import ScrollTop from "../ScrollTop";

import { Toaster } from "react-hot-toast";

const App = () => {
  const role = "user";
  return (
    <main>
      <ScrollTop />
      <Nav role={role} />
      <div className="bg-white h-[100px] w-full"></div>
      <section>
        <Routes>
          <Route path="/" element={<Home to="/home" replace />} />
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
