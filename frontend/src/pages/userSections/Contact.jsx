import { contactInfo, deliveryLocation } from "../../constants";

const Contact = () => {
  return (
    <section className="px-50 py-10 flex flex-col items-center gap-50 mb-20">
      <div className="grid grid-col md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-2 items-end">
          <h1 className="text-3xl font-bold mr-25">Where are we Located</h1>
          <div className="container bg-black size-100"></div>
        </div>
        <div className="pr-50">
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
        </div>
      </div>
      <div className="grid grid-col md:grid-cols-2 gap-10">
        <div>
          <h1 className="text-5xl font-bold mb-5">We Deliver to:</h1>
          <div className="grid grid-cols-2 gap-5">
            {deliveryLocation.map(({ id, location }) => (
              <p key={id} className="text-lg">
                {location}
              </p>
            ))}
          </div>
        </div>
        <div className="container bg-black size-100"></div>
      </div>
    </section>
  );
};

export default Contact;
