import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SkillBridge</h1>
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
        </li>
        <li>
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </li>
        <li>
          <Link href="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
