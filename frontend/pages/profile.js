import Navbar from "@/components/navbar";
import React from "react";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#ddd] min-h-screen flex items-center justify-center">
        <div className="border border-red-500 max-w-7xl m-auto">
          <div className="max-w-6xl border border-blue-700 flex justify-between items-center">
            <div>
              <div className="flex flex-col my-8">
                <label className="mb-4">User Name</label>
                <input
                  type="text"
                  name=""
                  placeholder="Enter Your User Name"
                  //   value={""}
                  className="border-b border-b-gray-500 outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-4">E-MAIL</label>
                <input
                  type="text"
                  name=""
                  placeholder="Enter Your Email"
                  value={""}
                  className="border-b border-b-gray-500 outline-none"
                />
              </div>
              <div className="flex flex-col my-8">
                <label className="mb-4">PASSWORD</label>
                <input
                  type="text"
                  name=""
                  placeholder="Enter Your Password"
                  value={""}
                  className="border-b border-b-gray-500 outline-none"
                />
              </div>{" "}
              <div className="flex flex-col">
                <label className="mb-4">LOCATION</label>
                <input
                  type="text"
                  name=""
                  placeholder="Enter Your Location"
                  value={""}
                  className="border-b border-b-gray-500 outline-none"
                />
              </div>{" "}
              <div className="flex flex-col my-8">
                <label className="mb-4">PHONE</label>
                <input
                  type="text"
                  name=""
                  placeholder="Enter Your Phone"
                  value={""}
                  className="border-b border-b-gray-500 outline-none"
                />
              </div>
            </div>
            <div className="w-60 h-60 rounded-full overflow-hidden">
              <img
                src="https://cdn.dribbble.com/userupload/41930657/file/still-92550ea561f7221c92447018141ae660.gif?resize=400x0"
                className="h-full w-full"
              />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
