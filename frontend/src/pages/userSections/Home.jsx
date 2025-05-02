import { Hero, Suppliers, Quality, Reviews, Offerings,TopClients } from "../homeSections";

const Home = () => {
  return (
    <div>
      <Hero />
      <Suppliers />
      <Quality />
      <Reviews />
      <TopClients/>
      <Offerings />
    </div>
  );
};

export default Home;
