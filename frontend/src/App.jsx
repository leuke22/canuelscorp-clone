import "./index.css";
import Nav from "./Nav";

import { Route, Routes } from "react-router-dom";

import Footer from "./Footer";
import { Home, Products, Services, About, Login, Signup } from "./pages";

const App = () => {
  return (
    <main>
      <Nav />
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
