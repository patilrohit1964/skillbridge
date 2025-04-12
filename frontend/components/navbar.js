import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">SkillBridge</h1>
      <ul className="flex gap-4">
        <li>
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
        </li>
        <li>
          <a href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </a>
        </li>
        <li>
          <a href="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
