import { canuelsLogo } from "./assets/canuelsImage";
import { socialMediaLinks } from "./constants";

const Footer = () => {
  return (
    <footer className="bg-bgFooter text-gray-600 p-10">
      <div className="flex flex-col items-start mb-5">
        <div className="flex flex-row items-center mb-2">
          <div className="w-25 h-25 -ml-5">
            <img
              className="w-full h-full object-contain"
              src={canuelsLogo}
              alt="canuelsLogo"
            />
          </div>
          <h1 className="items-center text-2xl font-semibold text-black">
            Canuelscorp
          </h1>
        </div>
        <p>Delivering fresh chicken to Metro Manila restaurants.</p>
        <div className="flex flex-row gap-12 mt-7">
          {socialMediaLinks.map(({ id, Icons, url }, index) => {
            const size =
              index === 1 ? 38 : index === 2 ? 41 : index === 3 ? 38 : 35;

            return (
              <a
                key={id}
                href={url}
                className="flex items-center"
                target="_blank"
              >
                <Icons size={size} />
              </a>
            );
          })}
        </div>
      </div>
      <div className="flex flex-row justify-between mt-10">
        <div className="flex flex-col flex-1/2 gap-4">
          <h1 className="shared-header-footer">Service</h1>
          <p>09171234567</p>
          <p>canuelscorp@gmail.com</p>
        </div>
        <div className="flex flex-col flex-1/3 ml-5 gap-4">
          <h1 className="shared-header-footer">Legal</h1>
          <a href="/">Terms of service</a>
          <a href="/">Privacy policy</a>
          <a href="/">License</a>
        </div>
      </div>
      <div className="mt-15 md:mt-20">
        <div className="border-t border-gray-300 my-4 mt-5 mb-10"></div>
        <p>© 2025 Canuels Enterprises Corp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
