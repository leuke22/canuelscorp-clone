import { bgSec2 } from "../assets/canuelsImage";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Email } from "../components";
import { useUserAuth } from "../fetch/useUserAuth";

const ChangePassword = () => {
  const [resetFormData, setResetFormData] = useState({
    email: "",
  });

  const { requestResetPassword, isLoading } = useUserAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await requestResetPassword(resetFormData.email);
      navigate("/resetOtp-verification");
    } catch (error) {
      toast.error("Reset password request failed. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetFormData((prev) => ({ ...prev, [name]: value }));
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
        className="relative z-10 w-full max-w-md flex flex-col gap-5 items-center p-5"
      >
        <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Reset Password
          </h1>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Email
              handleInputChange={handleInputChange}
              formData={resetFormData}
            />

            <button
              type="submit"
              className="btn btn-primary mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Reset Password"}
              {isLoading && <span className="loading loading-spinner"></span>}
            </button>

            <p className="text-[13px] text-center mt-4">
              Remember your password?{" "}
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

export default ChangePassword;
