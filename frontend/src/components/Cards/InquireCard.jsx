import { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motion.js";
import { useUserInquire } from "../../fetch/useUserInquire.js";
import { toast } from "react-hot-toast";

const InquireCard = () => {
  const { userInquire, isLoading } = useUserInquire();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.phoneNumber || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await userInquire(formData);
      setFormData({ name: "", email: "", phoneNumber: "", message: "" });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to submit inquiry");
    }
  };

  return (
    <motion.div
      variants={fadeIn("left", 0.5)}
      initial="hidden"
      whileInView="show"
      className="flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit}
        className="text-white bg-white/10 rounded-xl px-5 py-8 mb-16 lg:mb-0 w-full max-w-[360px]"
      >
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text text-white">Your Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text text-white">Email Address*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text text-white">Phone Number*</span>
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            className="input input-bordered w-full bg-white text-black"
          />
        </div>

        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text text-white">Your Message*</span>
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            required
            className="textarea textarea-bordered h-24 bg-white text-black"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full mt-6"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner"></span>
              Submitting...
            </>
          ) : (
            "Submit Inquiry"
          )}
        </button>

        <p className="text-sm mt-4 text-gray-300">
          Fields with * are required.
        </p>
      </form>
    </motion.div>
  );
};

export default InquireCard;
