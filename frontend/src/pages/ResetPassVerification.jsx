import { useEffect, useRef, useState } from "react";
import { bgSec2 } from "../assets/canuelsImage";
import { useUserAuth } from "../fetch/useUserAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ConfirmPassword, Password } from "../components";

const ResetPassVerification = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const RESEND_INTERVAL = 60;
  const [resendTimer, setResendTimer] = useState(0);

  const {
    isLoading,
    userResetPassEmail,
    requestResetPassword,
    resetPassword,
    isResetPassOtpSuccess,
  } = useUserAuth();

  useEffect(() => {
    if (isResetPassOtpSuccess) {
      navigate("/login");
    }
  }, [isResetPassOtpSuccess, navigate]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendCodeInEmail = async () => {
    if (resendTimer > 0) return;

    try {
      await requestResetPassword(userResetPassEmail);
      setResendTimer(RESEND_INTERVAL);
      toast.success("Verification code sent successfully!");
    } catch (error) {
      toast.error("Failed to send verification code. Please try again.");
    }
  };

  const handleCodeChange = (index, value) => {
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      const newCode = [...code];

      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }

      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = Math.min(lastFilledIndex + 1, 5);

      if (focusIndex >= 0 && inputRefs.current[focusIndex]) {
        inputRefs.current[focusIndex].focus();
      }
    } else {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(
        userResetPassEmail,
        code.join(""),
        passwordData.password,
        passwordData.confirmPassword
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error || "Password reset failed. Please check your code and try again."
      );
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgSec2})` }}
      />
      <div className="absolute inset-0 bg-black opacity-50" />

      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="loading loading-spinner loading-xl text-white"></span>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-md rounded-lg mx-5">
          <h2 className="text-3xl font-bold mb-6 text-center bg-black text-transparent bg-clip-text">
            Change Password Verification
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Enter the 6-digit code sent to your email address. If you did not
            receive the code, check your spam folder.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Password
              handleInputChange={handlePasswordChange}
              formData={passwordData}
              show={showPassword}
              setShow={setShowPassword}
              isResetPass={true}
            />

            <ConfirmPassword
              handleInputChange={handlePasswordChange}
              formData={passwordData}
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
              isResetPass={true}
            />

            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-white text-black 
                    border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"
                />
              ))}
            </div>

            <p className="text-center text-gray-500">
              Didn't receive the code?{" "}
              <span
                onClick={handleSendCodeInEmail}
                className={`underline cursor-pointer ${
                  resendTimer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-blue-500"
                }`}
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend"}
              </span>
            </p>

            <button
              className="w-full btn btn-secondary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Reset Password"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default ResetPassVerification;
