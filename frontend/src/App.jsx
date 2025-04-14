import "./index.css";
import Nav from "./Nav";

import { Route, Routes } from "react-router-dom";

import Footer from "./Footer";
import { Home, Products, Services, About } from "./pages";

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
        </Routes>
      </section>
      <Footer />
    </main>
  );
};

export default App;
