import { useState } from "react";
import Navbar from "../components/navbar";
import { useRegisterMutation, useVerifyOtpMutation } from "./api/authApi";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [register] = useRegisterMutation();
  const [verifyOtp] = useVerifyOtpMutation();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const changeHandler = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await register(formData).unwrap();
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };
  const otpVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(otp).unwrap();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            {step == 1 ? "Create Account" : "Verify Otp"}
          </h2>

          {step == 1 ? (
            <form className="space-y-4" onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={changeHandler}
                value={formData.name}
                name="name"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={changeHandler}
                name="email"
                value={formData.email}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={changeHandler}
                name="password"
                value={formData.password}
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Register
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={otpVerify}>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                onChange={(e) => setOtp(e.target.value)}
                name="name"
                value={otp}
                placeholder="enter your otp"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
              >
                Verify
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
