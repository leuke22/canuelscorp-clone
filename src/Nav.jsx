import { useState } from "react";
import headerLogo from "./assets/canuels-logo.png";
import { navLinks } from "./constants";
import { HiMenu, HiX } from "react-icons/hi";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  return (
    <header className="px-5 fixed z-50 w-full top-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="flex flex-row justify-between items-center w-full">
        <div className="flex-0.5 flex justify-center shrink-0">
          <a href="/">
            <img
              src={headerLogo}
              alt="canuelscorp-logo"
              className="object-cover sm:ml-16"
              width={100}
              height={100}
            />
          </a>
        </div>
        <ul className="flex flex-1 flex-row justify-center max-lg:hidden gap-10">
          {navLinks.map((item, index) => (
            <a
              key={index}
              onClick={() => setActiveLink(item.href)}
              className={`text-[16px] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bgHeaderNav after:transition-all
                ${
                  activeLink === item.href
                    ? "text-bgHeaderNav after:w-full  "
                    : "text-gray-600 hover:text-gray-900"
                }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </ul>
        <section className="flex flex-row gap-5 items-center mr-10 sm:gap-14">
          <button
            className="hidden max-lg:flex shrink-0 items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <HiX className="w-full h-8" />
            ) : (
              <HiMenu className="w-full h-8" />
            )}
          </button>
        </section>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 text-black">
          <div>
            {navLinks.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`block text-lg font-medium py-2
                  ${
                    activeLink === item.href
                      ? "text-bgHeaderNav after:w-full  "
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                onClick={() => {
                  setActiveLink(item.href);
                  setIsMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;
