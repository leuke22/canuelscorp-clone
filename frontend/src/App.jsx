import "./index.css";
import Nav from "./Nav";

import { Route, Routes } from "react-router-dom";

import Footer from "./Footer";
import { Home, Products, Services, About } from "./pages/userSections";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  const role = "user";
  return (
    <main>
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
        </Routes>
      </section>
      <Footer />
    </main>
  );
};

export default App;
