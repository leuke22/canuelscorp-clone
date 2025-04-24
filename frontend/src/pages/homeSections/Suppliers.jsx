import { sec2 } from "../../assets/images";
import { chickenDescription } from "../../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Suppliers = () => {
  return (
    <section className="px-8 py-12 text-black">
      <div className="flex flex-col gap-5">
        <motion.h1
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          className="font-bold text-3xl"
        >
          Quality Chicken Distribution in Manila
        </motion.h1>
        <div className="flex flex-row gap-10">
          {chickenDescription.map((items) =>
            items.title === "Fresh Chicken Supplier" ? (
              <motion.div
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                whileInView="show"
                key={items.title}
              >
                <h2 className="text-[20px] font-semibold pb-1">
                  {items.title}
                </h2>
                <p>{items.description}</p>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeIn("left", 0.2)}
                initial="hidden"
                whileInView="show"
                key={items.title}
              >
                <h2 className="text-[20px] font-semibold pb-1">
                  {items.title}
                </h2>
                <p>{items.description}</p>
              </motion.div>
            )
          )}
        </div>
        <motion.img
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          className="w-full max-h-80 object-cover opacity-85 rounded-2xl lg:mt-4 lg:max-h-100 lg:object-center"
          src={sec2}
          alt="sec2"
        />
      </div>
    </section>
  );
};

export default Suppliers;
