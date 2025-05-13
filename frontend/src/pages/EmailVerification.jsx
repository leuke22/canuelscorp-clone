import { useEffect, useRef, useState } from "react";
import { bgSec2 } from "../assets/canuelsImage";
import { useUserAuth } from "../fetch/useUserAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const effectRan = useRef(false);

  const {
    user,
    isLoading,
    userEmail,
    verifyOtp,
    sendVerificationOtp,
    isVerifiedOtpSuccess,
  } = useUserAuth();

  const RESEND_INTERVAL = 60;
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (isVerifiedOtpSuccess) {
      navigate("/");
    }
  }, [isVerifiedOtpSuccess, navigate]);

  useEffect(() => {
    if (effectRan.current === false) {
      const shouldSendCode = user?.email && !user.isAccountVerified;
      if (shouldSendCode) {
        handleSendCodeInEmail();
      }

      effectRan.current = true;
    }
  }, [user]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  const handleSendCodeInEmail = async () => {
    if (resendTimer > 0) return;
    try {
      await sendVerificationOtp({ email: user.email });
      setResendTimer(RESEND_INTERVAL);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
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
      await verifyOtp({
        email: userEmail || user.email,
        otp: code.join(""),
      });
      toast.success("OTP verified successfully!");

      navigate("/");
    } catch (error) {
      toast.error("Verification failed. Please try again.");
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
        <div className="relative z-10 w-full max-w-md flex flex-col gap-5 items-center p-5">
          <div className="relative z-10 w-full max-w-md p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center bg-black text-transparent bg-clip-text">
              Verify Your Email
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Enter the 6-digit code sent to your email address. If you did not
              receive the code, check your spam folder.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="6"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
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
                disabled={isLoading || code.some((digit) => !digit)}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default EmailVerification;
