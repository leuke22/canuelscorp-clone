import { bgSec2 } from "../assets/canuelsImage";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Fullname,
  ConfirmPassword,
  Email,
  Password,
  TermsConditions,
  Username,
  PhoneNumber,
} from "../components";
import { useUserAuth } from "../fetch/useUserAuth";

const Signup = () => {
  const [signupFormData, setSignupFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const { signup, isLoading } = useUserAuth();

  const [signupPassShow, setSignupPassShow] = useState(false);
  const [signupConfirmPassShow, setSignupConfirmPassShow] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(signupFormData);
      navigate("/email-verification");
    } catch (error) {
      console.log("Did not navigate because signup failed:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        className="relative z-10 flex flex-col gap-5 items-center p-5 my-10"
      >
        <h1 className="text-2xl font-semibold text-white ">
          Welcome to Canuels Corporation
        </h1>
        <div className="relative z-10 p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Create an Account
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-5">
              <Fullname
                handleInputChange={handleInputChange}
                formData={signupFormData}
              />
              <Password
                handleInputChange={handleInputChange}
                formData={signupFormData}
                show={signupPassShow}
                setShow={setSignupPassShow}
              />
              <Username
                handleInputChange={handleInputChange}
                formData={signupFormData}
              />

              <ConfirmPassword
                handleInputChange={handleInputChange}
                formData={signupFormData}
                show={signupConfirmPassShow}
                setShow={setSignupConfirmPassShow}
              />

              <Email
                handleInputChange={handleInputChange}
                formData={signupFormData}
              />

              <PhoneNumber
                handleInputChange={handleInputChange}
                formData={signupFormData}
              />
            </div>

            <TermsConditions />

            <button type="submit" className="btn btn-primary mt-4">
              {isLoading ? "Loading..." : "Create an Account"}
              {isLoading && <span className="loading loading-spinner"></span>}
            </button>

            <p className="text-[13px] text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-bold">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Signup;
