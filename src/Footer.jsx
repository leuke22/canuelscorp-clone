// filepath: c:\Users\kenhm\Desktop\canuelscorp-app\src\Footer.jsx
import canuelsLogo from "./assets/canuels-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-bgFooter text-gray-600 p-10 mt-10">
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
          <a
            href="https://www.facebook.com/canuelscorp"
            className="hover-bounce"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="2xl"
              style={{ color: "#1e2939" }}
            />
          </a>
          <a
            href="https://www.instagram.com/canuelscorp"
            className="hover-bounce"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              size="2xl"
              style={{ color: "#1e2939" }}
            />
          </a>
          <a
            href="https://www.tiktok.com/@canuelscorp"
            className="hover-bounce"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faTiktok}
              size="2xl"
              style={{ color: "#1e2939" }}
            />
          </a>

          <a
            href="https://twitter.com/canuelscorp"
            className="hover-bounce"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              size="2xl"
              style={{ color: "#1e2939" }}
            />
          </a>

          <a
            href="https://www.canuelscorp.com"
            className="hover-bounce"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGlobe}
              size="2xl"
              style={{ color: "#1e2939" }}
            />
          </a>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-10">
        <div className="flex flex-col flex-1/2 gap-4">
          <h1 className="shared-header-footer">Service</h1>
          <p>09171234567</p>
          <p>chickentastic@example.com</p>
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
