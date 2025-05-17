/* eslint-disable no-unused-vars */
import { bgSec1 } from "../../assets/canuelsImage";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";
import { InquireCard, ShopButton } from "../../components";
import { useUserAuth } from "../../fetch/useUserAuth";

const Hero = () => {
  const { user } = useUserAuth();

  const isUserAdmin = user?.role === "admin" || user?.role === "supervisor";

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
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView="show"
            className="flex flex-col text-white items-baseline lg:pl-5"
          >
            <div>
              <div className="text-star text-2xl">★★★★★</div>
              <p className="text-lg">Quality you can trust.</p>
            </div>
            <h1 className="lg:text-[80px] sm:text-7xl text-6xl font-semibold pb-1">
              Fresh{" "}
              <span className="bg-gradient-to-t from-textGradientDark via-textGradientMed to-textGradientLight bg-clip-text text-transparent">
                Chicken
              </span>
              <br /> Delivery
              <br /> Service
            </h1>
            <p className="lg:text-[20px]/tight text-[17px] pt-2 lg:w-2xl">
              High-quality chicken for restaurants and food services in Metro
              Manila.
            </p>

            <ShopButton />
          </motion.div>
        </div>
        {isUserAdmin ? null : (
          <div className="w-full">
            <InquireCard />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
