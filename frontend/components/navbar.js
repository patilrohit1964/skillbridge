import { setUser } from "@/redux/features/authSlice";
import { persistor } from "@/redux/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state?.auth);
  console.log(user);
  const router = useRouter();
  const dispatch = useDispatch();
  const logOutHandler = async () => {
    persistor.purge();
    dispatch(setUser(null));
    router.push("/login");
  };
  let a=[1,2,3]
  a[10]=5
  console.log(a)
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SkillBridge</h1>
      <ul className="flex gap-4 items-center">
        <li>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
        {user ? (
          <>
            <li>Profile</li>
            <li>
              <button
                className="cursor-pointer bg-blue-600 py-2 px-4 text-white rounded-lg"
                onClick={logOutHandler}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
