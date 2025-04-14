/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const ShopButton = () => {
  return (
    <motion.button
      variants={fadeIn("up", 0.5)}
      initial="hidden"
      whileInView="show"
      className="bg-shopButton hover:bg-shopButtonDark text-white font-bold lg:py-3 py-1.5
      px-4 rounded-full lg:mt-10 mt-4 lg:w-2xs w-[200px]"
      label="Shop Now"
    >
      Shop now
    </motion.button>
  );
};

export default ShopButton;
