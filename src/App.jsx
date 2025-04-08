import "./index.css";
import Nav from "./Nav";
import Hero from "./homeSections/Hero";
import Suppliers from "./homeSections/Suppliers";
import Quality from "./homeSections/Quality";
import Reviews from "./homeSections/Reviews";

const App = () => {
  return (
    <main className="relative">
      <Nav />
      <section>
        <Hero />
        <Suppliers />
        <Quality />
        <Reviews />
      </section>
    </main>
  );
};

export default App;
