"use client";
import Navbar from "@/components/navbar";
import { useState } from "react";
// import { useForgotPasswordMutation } from "@/redux/api/authApi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  //   const [sendOTP, { isLoading }] = useForgotPasswordMutation();
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendOTP(email).unwrap();
      setSuccess(true);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-md mx-auto mt-10 p-4 shadow-md border rounded">
          <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded mb-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                // disabled={isLoading}
              >
                {"isLoading" ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <p className="text-green-600 font-semibold">
              OTP sent to your email. Now reset your password.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
