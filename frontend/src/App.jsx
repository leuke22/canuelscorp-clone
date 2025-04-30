import "./index.css";
import Nav from "./Nav";

import { Route, Routes } from "react-router-dom";

import Footer from "./Footer";
import { Home, Products, Services, About } from "./pages/userSections";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Dashboard, Orders, Users, AdminProducts } from "./pages/adminSections";
import ScrollTop from "../ScrollTop";

const App = () => {
  const role = "admin";
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
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/users" element={<Users />} />
        </Routes>
      </section>
      <Footer />
    </main>
  );
};

export default App;
