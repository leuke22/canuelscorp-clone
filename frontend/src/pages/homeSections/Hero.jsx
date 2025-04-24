/* eslint-disable no-unused-vars */
import { bgSec1 } from "../../assets/canuelsImage";
import { ShopButton, InquireCard } from "../../components";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../utils/motion";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div
        style={{
          backgroundImage: `url(${bgSec1})`,
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
      ></div>

      <div className="relative grid gap-10 grid-cols-1 lg:grid-cols-2 w-full min-h-screen items-center">
        <div className="w-full h-full flex items-center p-5 lg:ml-10">
          <div className="flex flex-col text-white items-baseline lg:pl-5">
            <motion.div
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
            >
              <div className="text-star text-2xl">★★★★★</div>
              <p className="text-lg">Quality you can trust.</p>
            </motion.div>
            <motion.h1
              variants={textVariant(0.3)}
              initial="hidden"
              whileInView="show"
              className="lg:text-[80px] sm:text-7xl text-6xl font-semibold pb-1"
            >
              Fresh{" "}
              <span className="bg-gradient-to-t from-textGradientDark via-textGradientMed to-textGradientLight bg-clip-text text-transparent">
                Chicken
              </span>
              <br /> Delivery
              <br /> Service
            </motion.h1>
            <motion.p
              variants={textVariant(0.3)}
              initial="hidden"
              whileInView="show"
              className="lg:text-[20px]/tight text-[17px] pt-2 lg:w-2xl"
            >
              High-quality chicken for restaurants and food services in Metro
              Manila.
            </motion.p>

            <ShopButton />
          </div>
        </div>
        <div className="w-full">
          <InquireCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;
