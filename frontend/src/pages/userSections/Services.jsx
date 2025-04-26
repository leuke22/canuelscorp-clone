import ChooseCard from "../../components/Cards/ChooseCard";
import FadeCard from "../../components/Cards/FadeCard";
import { serviceDescription, services } from "../../constants";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../../utils/motion";

const Services = () => {
  return (
    <section className="p-5 flex flex-col place-content-center">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
      >
        <h1 className="text-4xl font-bold text-center mb-3">Our Services</h1>
        <p className="text-gray-600 text-center">
          We embrace the journey of distribution, for it’s not merely about
          reaching destinations, but about connecting with people, solving their
          needs, and making a difference.
        </p>
      </motion.div>

      <div className="px-8 py-5 text-black grid gap-5 md:grid-cols-2 lg:gap-8 mb-10 lg:mb-15">
        {serviceDescription.map((items) => (
          <FadeCard items={items} />
        ))}
      </div>

      <motion.div
        variants={slideIn("left", "spring", 0.5, 1.5)}
        initial="hidden"
        animate="show"
      >
        <h2 className="text-4xl font-bold text-center mb-8 lg:mb-12">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map(({ id, Icons, title, description }) => (
            <ChooseCard
              key={id}
              Icons={Icons}
              title={title}
              description={description}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Services;
