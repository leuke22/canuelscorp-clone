import { contactInfo, deliveryLocation } from "../../constants";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion";

const Contact = () => {
  const position = { lat: 53.54, lng: 10 };
  return (
    <section className="xl:px-50 md:px-30 py-10 flex flex-col items-center md:gap-20 lg:gap-50 gap-20 mb-20">
      <div className="grid grid-col lg:grid-cols-2 gap-10 items-center lg:ml-20">
        <motion.div
          variants={fadeIn("right", 0.6)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col gap-2 lg:items-end items-center"
        >
          <h1 className="text-3xl font-bold mr-25">Where are we Located</h1>
          <div className="w-full">
            <iframe
              width="100%"
              height="600"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=3HJ%20Foods%20Corporation%20-%20Sauyo+(Canuels)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            >
              <a href="https://www.gps.ie/collections/personal-trackers/">
                Canuels Location
              </a>
            </iframe>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          className=" mx-10"
        >
          <p className="text-green-700">How can we help you?</p>
          <h1 className="text-5xl font-bold mb-5">Contact us</h1>
          <p>
            We’re here to help and answer any questions you might have. We look
            forward to hearing from you!
          </p>
          <div className="mt-10 text-lg">
            {contactInfo.map(({ id, Icons, description }) => (
              <div key={id} className="flex flex-row items-center gap-3 mb-2">
                <Icons size={30} />
                {id === 2 ? (
                  <a href="mailto:5lZCt@example.com" className="text-blue-600">
                    {description}
                  </a>
                ) : (
                  <p>{description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="grid grid-col lg:grid-cols-2 gap-10 w-full">
        <motion.div
          variants={fadeIn("right", 0.6)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col max-sm:items-center"
        >
          <h1 className="text-5xl font-bold mb-5">We Deliver to:</h1>
          <div className="grid grid-cols-2 gap-5">
            {deliveryLocation.map(({ id, location }) => (
              <p key={id} className="text-lg">
                {location}
              </p>
            ))}
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.6)}
          initial="hidden"
          whileInView="show"
          className="w-full"
        >
          <iframe
            width="100%"
            height="600"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Metro%20Manila+(Metro%20Manila)&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          >
            <a href="https://www.gps.ie/collections/personal-trackers/">
              Elderly trackers
            </a>
          </iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
