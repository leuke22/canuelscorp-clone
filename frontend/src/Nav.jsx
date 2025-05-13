/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { canuelsLogo } from "./assets/canuelsImage";
import { navLinks, adminLinks } from "./constants";
import { HiMenu, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { fadeIn } from "./utils/motion";
import { useUserAuth } from "./fetch/useUserAuth";
import toast from "react-hot-toast";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/home");

  const { user, logout, isAuthenticated } = useUserAuth();
  const isRoleAdmin = user?.role === "admin" || user?.role === "supervisor";

  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <motion.nav
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="px-5 fixed z-50 w-full top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm dark:bg-gray-800 dark:text-white"
    >
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex-0.5 flex justify-center shrink-0">
          <a href="/">
            <img
              src={canuelsLogo}
              alt="canuelscorp-logo"
              className="object-cover sm:ml-16"
              width={100}
              height={100}
            />
          </a>
        </div>

        <ul className="flex flex-1 flex-row justify-center max-lg:hidden gap-10">
          {isRoleAdmin
            ? adminLinks.map((item, index) => (
                <Link
                  key={index}
                  onClick={() => setActiveLink(item.href)}
                  className={`text-[16px] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bgHeaderNav after:transition-all ${
                    activeLink === item.href
                      ? "text-bgHeaderNav after:w-full"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  to={item.href}
                >
                  {item.label}
                </Link>
              ))
            : navLinks.map((item, index) => (
                <Link
                  key={index}
                  onClick={() => setActiveLink(item.href)}
                  className={`text-[16px] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-bgHeaderNav after:transition-all ${
                    activeLink === item.href
                      ? "text-bgHeaderNav after:w-full"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  to={item.href}
                >
                  {item.label}
                </Link>
              ))}
        </ul>

        <div className="hidden lg:flex items-center">
          {user && isAuthenticated ? (
            <>
              <p className="mr-5">
                {!user?.fullname ? "User Fullname" : user?.fullname}
              </p>
              <div className="dropdown dropdown-end">
                <div tabIndex={0}>
                  <div className="avatar">
                    <div className="w-15 rounded-full">
                      <img
                        src={
                          !user?.profileImg || user?.profileImg === ""
                            ? "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                            : user?.profileImg
                        }
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content bg-base-200 rounded-box z-1 mt-4 w-42 p-2 shadow-sm"
                >
                  <li>
                    <Link
                      to="/profile"
                      className={
                        !isAuthenticated || !user?.isAccountVerified
                          ? "disabled cursor-not-allowed opacity-50"
                          : undefined
                      }
                      aria-disabled={
                        !isAuthenticated || !user?.isAccountVerified
                      }
                      onClick={(e) => {
                        if (!isAuthenticated || !user?.isAccountVerified) {
                          e.preventDefault();
                        }
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={logoutHandler}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center gap-5">
              <Link to="/login" className="btn btn-outline btn-primary w-32">
                Login
              </Link>

              <Link to="/signup" className="btn btn-secondary w-32">
                Signup
              </Link>
            </div>
          )}
        </div>

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
      </div>

      <div
        className={`fixed top-[100px] right-0 h-full w-64 shadow-lg transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white/90 backdrop-blur-sm shadow-sm h-dvh flex flex-col items-center gap-4 p-5">
          {navLinks.map((item, index) => (
            <Link
              to={item.href}
              key={index}
              onClick={() => setIsMenuOpen(false)}
              className={`block text-lg font-medium py-2 w-full text-center ${
                activeLink === item.href
                  ? "text-bgHeaderNav"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to={"/login"}
            className="btn btn-primary w-32"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <div className="divider">or</div>
          <Link
            to={"/signup"}
            className="btn btn-secondary w-32"
            onClick={() => setIsMenuOpen(false)}
          >
            Signup
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
