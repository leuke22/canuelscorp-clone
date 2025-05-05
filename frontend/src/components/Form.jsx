import { bgSec2 } from "../assets/canuelsImage";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscEyeClosed, VscEye } from "react-icons/vsc";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Form = ({ signupPage = false, loginPage = false }) => {
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const initialData = signupPage
    ? { email: "", username: "", password: "" }
    : { username: "", password: "" };

  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [signupPage, loginPage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/email-verification");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
            {signupPage ? "Create an Account" : "Login to your Account"}
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            {signupPage ? (
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-sm">Your Email</legend>
                <label className="input w-full">
                  <MdEmail size={25} />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. username@email.com"
                    title="Only letters, numbers or dash"
                    onChange={handleInputChange}
                    value={formData.email}
                  />
                </label>
              </fieldset>
            ) : null}

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Username</legend>
              <label className="input w-full">
                <FaUser size={20} />
                <input
                  type="input"
                  name="username"
                  required
                  placeholder="e.g. username123"
                  onChange={handleInputChange}
                  value={formData.username}
                />
              </label>
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm">Password</legend>
              <label className="input w-full">
                <RiLockPasswordFill size={25} />
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  required
                  placeholder="●●●●●●●●●"
                  onChange={handleInputChange}
                  value={formData.password}
                />
                <button type="button" onClick={() => setShow((s) => !s)}>
                  {show ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
                </button>
              </label>
            </fieldset>

            <fieldset className="fieldset flex flex-row gap-2 items-center mt-4">
              <input type="checkbox" className="checkbox" />
              <p className="text-[13px]">
                I accept the{" "}
                <a href="#" className="text-blue-600 font-semibold">
                  Terms and Conditions
                </a>
              </p>
            </fieldset>

            <button type="submit" className="btn btn-primary mt-4">
              {signupPage ? "Create an Account" : "Login"}
            </button>
            {isError && <p className="text-red-500">Something went wrong</p>}

            <p className="text-[13px] text-center mt-4">
              {signupPage
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <Link
                to={signupPage ? "/login" : "/signup"}
                className="text-blue-600 font-bold"
              >
                {signupPage ? "Login here" : "Signup here"}
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Form;
