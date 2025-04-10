import "./index.css";
import Nav from "./Nav";
import Hero from "./homeSections/Hero";
import Suppliers from "./homeSections/Suppliers";
import Quality from "./homeSections/Quality";
import Reviews from "./homeSections/Reviews";
import Gallery from "./homeSections/Gallery";
import Footer from "./Footer";

const App = () => {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Suppliers />
      <Quality />
      <Reviews />
      <Gallery />
      <Footer />
    </main>
  );
};

export default App;
