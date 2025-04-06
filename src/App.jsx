import "./index.css";
import Header from "./header/Header";
import Hero from "./homeSections/Hero";
import Suppliers from "./homeSections/Suppliers";
import Quality from "./homeSections/Quality";

const App = () => {
  return (
    <main className="relative">
      <Header />
      <section>
        <Hero />
        <Suppliers />
        <Quality />
      </section>
    </main>
  );
};

export default App;
