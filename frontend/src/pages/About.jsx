import { team } from "../assets/canuelsImage";
import { sec13 } from "../assets/images";
import ChooseCard from "../components/Cards/ChooseCard";
import { coreValues } from "../constants";
import { motion } from "framer-motion";
import { fadeIn, slideIn } from "../utils/motion";

const About = () => {
  return (
    <section className="p-10 overflow-hidden">
      <motion.section
        variants={fadeIn("up", 0.5)}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 lg:grid-cols-2 mb-20 lg:mb-50"
      >
        <div className="flex lg:items-center lg:justify-end">
          <div className="max-w-md p-3">
            <h1 className="mb-5 text-5xl font-bold">About us</h1>
            <p className="mb-5">
              Canuels Enterprises Corporation draws its name from its founders'
              surname, Canuela, embodying a legacy of hard work, dedication, and
              entrepreneurial vision. By integrating the family name into our
              brand, we honor the integrity, perseverance, and community
              commitment passed down through generations. As we grow, "Canuels"
              remains a steadfast reminder of our origins and the people who
              inspire our pursuit of excellence.
            </p>
          </div>
        </div>

        <div className="p-10 relative lg:mr-20">
          <div className="relative max-w-md mx-auto mt-12">
            <div className="absolute inset-0 w-full h-full overflow-visible">
              <svg
                className="absolute top-1/2 left-1/2 w-[300%] h-[250%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#FB7205"
                  d="M33.5,-49.7C47.7,-49.9,66.4,-49.5,69.8,-41.1C73.2,-32.8,61.2,-16.4,51,-5.9C40.7,4.6,32.3,9.2,30.2,19.8C28.1,30.3,32.4,46.9,28.4,57.1C24.4,67.4,12.2,71.3,1.9,67.9C-8.4,64.6,-16.8,54.1,-30,49.2C-43.3,44.3,-61.4,45.1,-71.4,37.9C-81.3,30.6,-83.1,15.3,-74.5,5C-65.9,-5.4,-46.9,-10.7,-38.1,-20C-29.3,-29.3,-30.8,-42.6,-26.2,-47.9C-21.5,-53.1,-10.8,-50.4,-0.5,-49.4C9.7,-48.5,19.4,-49.4,33.5,-49.7Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg z-10">
              <img src={team} alt="Team" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </motion.section>
      <motion.section
        variants={fadeIn("down", 0.3)}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 place-content-center lg:grid-cols-2 gap-5 mb-10 lg:mb-20"
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-lg w-full">
          <img src={sec13} alt="Team" className="h-auto w-full" />
        </div>
        <div className="order-first lg:order-last">
          <div>
            <h1 className="text-3xl font-bold">Our Mission</h1>
            <p className="text-gray-700 text-md">
              To provide safe and food products with a commitment to quality and
              reliability. To build lasting partnerships founded on trust,
              service, and shared success. To innovate and improve our processes
              to meet the evolving needs of the food industry. To support
              sustainable growth for our customers, employees, and communities.
            </p>
          </div>
          <div className="text-right">
            <h1 className="text-3xl font-bold">Our Vision</h1>
            <p className="text-gray-700 text-md">
              To provide safe and food products with a commitment to quality and
              reliability. To build lasting partnerships founded on trust,
              service, and shared success. To innovate and improve our processes
              to meet the evolving needs of the food industry. To support
              sustainable growth for our customers, employees, and communities.
            </p>
          </div>
        </div>
      </motion.section>
      <motion.section
        variants={slideIn("left", "spring", 0.5, 1.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-center">Our Core Values</h1>
        <p className="text-gray-700 text-md lg:text-lg">
          At Canuels Enterprises Corporation, our operations are guided by
          values that define who we are—not just as a business, but as a
          partner, a team, and a community. These core principles drive our
          everyday actions and long-term vision:
        </p>
        <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-2 lg:grid-cols-3">
          {coreValues.map(({ id, Icons, title, description }) => (
            <ChooseCard
              key={id}
              Icons={Icons}
              title={title}
              description={description}
            />
          ))}
        </div>
      </motion.section>
    </section>
  );
};

export default About;
