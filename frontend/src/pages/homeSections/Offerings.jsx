import { FaArrowRightLong } from "react-icons/fa6";
import { offers } from "../../constants";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { Link } from "react-router-dom";

const Offerings = () => {
  return (
    <section className="flex flex-col items-center px-5 pr-10 lg:p-10 lg:gap-5 mb-10">
      <motion.div
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        className="flex flex-col items-center gap-5"
      >
        <h1 className="text-4xl font-bold">Our Offerings</h1>
        <p className="text-center lg:px-10 lg:text-xl md:text-lg">
          We offer fresh high-quality chicken sourced from our trusted
          manufacturer, Vitarich Corporation, known for their high standards of
          quality and ethical practices. We also offer frozen imported Beef and
          Pork from top producers around the world.
        </p>
        <p className="text-lg text-gray-500 text-center">
          Explore our Fresh and High-Quality Chicken and Frozen beef and Pork.
        </p>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-20 gap-4 mt-4 lg:p-5 lg:pl-10">
        {offers.map((offer) => (
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView="show"
            className="card bg-base-100 w-96 shadow-sm"
            key={offer.id}
          >
            <figure className="h-80 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.name}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-4xl">{offer.name}</h2>
              <div className="card-actions justify-end">
                <Link
                  to="/products"
                  className="btn btn-primary btn-outline flex items-center"
                >
                  Explore More <FaArrowRightLong className="ml-2" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Offerings;
