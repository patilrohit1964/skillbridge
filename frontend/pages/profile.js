import Navbar from "@/components/navbar";
import React from "react";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="bg-[#ddd] min-h-screen flex items-center justify-center">
        <div className="flex border border-red-500 max-w-7xl m-auto">
          <div className="max-w-3xl">rohit patil</div>
          <div className="max-w-6xl">
            <div>
              <div>
                <label></label>
              </div>
              <div>
                <label></label>
              </div>
              <div>
                <label></label>
              </div>{" "}
              <div>
                <label></label>
              </div>{" "}
              <div>
                <label></label>
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
