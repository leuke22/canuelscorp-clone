import { deliverDescription } from "../../constants";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import FadeCard from "../../components/Cards/FadeCard";

const Quality = () => {
  return (
    <section className="flex flex-col h-full w-full justify-center text-black">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col text-center px-5 gap-4 mb-4"
      >
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">
          Quality Chicken Delivery
        </h1>
        <p className="text-[15px] text-gray-500 sm:text-[18px] lg:text-[20px]">
          Delivering fresh, premium-quality chicken to restaurants and food
          service providers in Metro Manila.
        </p>
      </motion.div>
      <div className="px-8 py-5 text-black grid gap-5 md:grid-cols-2 lg:gap-8">
        {deliverDescription.map((items) => (
          <FadeCard key={items.id} items={items} />
        ))}
      </div>
    </section>
  );
};

export default Quality;
