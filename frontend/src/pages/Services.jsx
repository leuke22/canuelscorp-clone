import ChooseCard from "../components/ChooseCard";
import FadeCard from "../components/FadeCard";
import { serviceDescription, services } from "../constants";

const Services = () => {
  return (
    <section className="p-5 flex flex-col place-content-center">
      <h1 className="text-4xl font-bold text-center mb-3">Our Services</h1>
      <p className="text-gray-600 text-center">
        We embrace the journey of distribution, for it’s not merely about
        reaching destinations, but about connecting with people, solving their
        needs, and making a difference.
      </p>

      <div className="px-8 py-5 text-black grid gap-5 md:grid-cols-2 lg:gap-8">
        {serviceDescription.map((items, index) => (
          <FadeCard items={items} />
        ))}
      </div>

      <h2 className="text-4xl font-bold text-center mb-3">Why Choose Us</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((items) => (
          <ChooseCard items={items} />
        ))}
      </div>
    </section>
  );
};

export default Services;
