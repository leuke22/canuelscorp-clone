import { bgSec2 } from "../assets/canuelsImage";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Email, Password } from "../components";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [loginPassShow, setLoginPassShow] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(loginFormData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isError = false;

  return (
    <motion.section
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView="show"
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgSec2})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />

      <motion.div
        variants={fadeIn("down", 0.4)}
        initial="hidden"
        whileInView="show"
        className="relative z-10 w-full max-w-md flex flex-col gap-5 items-center p-5"
      >
        <h1 className="text-2xl font-semibold text-white ">
          Welcome to Canuels Corporation
        </h1>
        <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Login to your Account
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Email
              handleInputChange={handleInputChange}
              formData={loginFormData}
            />

            <Password
              handleInputChange={handleInputChange}
              formData={loginFormData}
              show={loginPassShow}
              setShow={setLoginPassShow}
            />
            <button type="submit" className="btn btn-primary mt-4">
              Login
            </button>
            {isError && <p className="text-red-500">Something went wrong</p>}

            <p className="text-[13px] text-center mt-4">
              Don't have an account?
              <Link to="/signup" className="text-blue-600 font-bold">
                Signup here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Login;
