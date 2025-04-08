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
      <section>
        <Hero />
        <Suppliers />
        <Quality />
        <Reviews />
        <Gallery />
        <Footer />
      </section>
    </main>
  );
};

export default App;
