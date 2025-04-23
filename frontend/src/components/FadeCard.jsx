import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

const FadeCard = ({ items }) => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      key={items.id}
      className="h-[180px] md:h-48 lg:h-64 relative rounded-xl overflow-hidden group"
    >
      <img
        className="h-full w-full object-cover"
        src={items.images}
        alt={items.title}
      />

      <div
        className="absolute inset-0 text-white w-full h-full 
                bg-gradient-to-t from-black/80 to-gray-600/50
                flex flex-col justify-center items-center p-5 gap-2 
                opacity-0 group-hover:opacity-100
                transition-all duration-300"
      >
        <h1 className="text-2xl font-bold lg:text-3xl">{items.title}</h1>
        <p className="text-[15px] lg:text-base text-center">
          {items.description}
        </p>
      </div>
    </motion.div>
  );
};

export default FadeCard;
