import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { BsBagX } from "react-icons/bs";

const Navbar = ({ user, avatar }) => {
  // console.log("avatar : ", avatar);
  // console.log("user : ", user);
  const [avataar, setAvataar] = useState("");
  // console.log("avtaar : ", avataar);

  useEffect(() => {
    const storedAvatar = localStorage.getItem("avatar");
    if (storedAvatar) {
      setAvataar(storedAvatar);
    }
  }, []);

  const navLinks = [
    "Inspiration",
    "Find work",
    "Learn Design",
    "Go Pro",
    "Hire Designers",
  ];

  return (
    <div className="w-11/12  mx-auto h-16 flex justify-between items-center">
      {/* navlinks */}
      <div className="flex gap-6">
        <span className="text-xl font-serif hover:cursor-pointer">
          {" "}
          Dribble
        </span>
        <div className="sm:flex hidden justify-center items-center">
          {navLinks.map((link, i) => (
            <Link key={i} to={"#"} className="text-xs mr-2">
              {link}
            </Link>
          ))}
        </div>
      </div>

      {/* avatar and buttons */}
      <div className="flex justify-center items-center gap-2">
        <div className="flex pl-1 bg-gray-300 justify-center items-center rounded overflow-hidden">
          <CiSearch />
          <input
            type="text"
            className="bg-transparent border-l-0 outline-none border w-16 "
          />
        </div>
        <span>
          <BsBagX />
        </span>
        <span className="w-6 h-6 overflow-hidden rounded-full">
          <img
            src={avataar}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        </span>
        <button className="bg-red-500 px-1.5 py-0.5 rounded text-white text-sm">
          Upload
        </button>
      </div>
    </div>
  );
};

export default Navbar;
