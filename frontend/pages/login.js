import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useLoginMutation } from "./api/authApi";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/authSlice";

export default function Login() {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [login, { data, isLoading, isSuccess, isError, error }] =
    useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await login(formData).unwrap();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "login success");
      dispatch(setUser(data?.user));
    }
  }, [isSuccess, isError, error]);
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
            Login to your Account
          </h2>

          <form className="space-y-4" onSubmit={loginHandler}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              name="email"
              onChange={(e) =>
                setFormdata((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) =>
                setFormdata((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }))
              }
            />
            <div className="flex justify-end">
              <Link
                href="/resetPass"
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              {isLoading ? "Please Wait..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
