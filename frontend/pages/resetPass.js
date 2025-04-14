"use client";
import Navbar from "@/components/navbar";
import { useState } from "react";
import { useForgotPassMutation, useResetPassMutation } from "./api/authApi";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(false);
  const [formData, setFormdata] = useState({
    newPassword: "",
    otp: "",
  });
  const [forgotPass, { isLoading, isSuccess, data }] = useForgotPassMutation();
  const [resetPass, { isLoading: resetLoading, isSuccess: resetSuccess }] =
    useResetPassMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPass({ email }).unwrap();
      toast.success(data?.message || "OTP sent successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };
  const resetPassHandler = async (e) => {
    e.preventDefault();
    try {
      await resetPass({ ...formData, email });
      toast.success();
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-md mx-auto mt-10 p-4 shadow-md border rounded">
          <p className="text-green-600 font-semibold">
            {step && "OTP sent to your email. Now reset your password."}
          </p>
          <h2 className="text-xl font-bold mb-4 text-center my-2">
            {step ? "Reset Password" : "Forgot Password"}
          </h2>
          {!step ? (
            <form onSubmit={step ? resetPassHandler : handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                readOnly={step}
              />
              {step && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your otp"
                    className="w-full p-2 border rounded mb-3"
                    value={formData.otp}
                    name="otp"
                    onChange={(e) =>
                      setFormdata((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    required
                  />
                  <input
                    type="text"
                    placeholder="Enter your new password"
                    className="w-full p-2 border rounded mb-3"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormdata((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                    required
                  />
                </>
              )}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer"
                disabled={step ? resetLoading : isLoading}
              >
                {step
                  ? resetLoading
                    ? "Verifying"
                    : "Update Password"
                  : isLoading
                  ? "Sending..."
                  : "Send OTP"}
              </button>
            </form>
          ) : (
            <p className="text-red-600 font-semibold text-center">
              "Something Went Wrong."
            </p>
          )}
        </div>
      </div>
    </>
  );
}
