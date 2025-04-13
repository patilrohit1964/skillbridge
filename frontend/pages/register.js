import { useState } from "react";
import Navbar from "../components/navbar";
import { useRegisterMutation, useVerifyOtpMutation } from "./api/authApi";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/authSlice";

export default function Register() {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [register, { isLoading, data }] = useRegisterMutation();
  const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [step, setStep] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const changeHandler = (e) => {
    setFormdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await register(formData).unwrap();
      dispatch(setUser(res?.user));
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };
  const otpVerify = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp({ otp, email: user.email }).unwrap();
      // router.push("/login");
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
                {isLoading ? "Please Wait..." : "Register"}
              </button>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={otpVerify}>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-500"
                name="email"
                value={user.email}
                placeholder="enter your otp"
                readOnly
                disabled
              />
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
                {verifyLoading ? "verify" : "Verify otp"}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
