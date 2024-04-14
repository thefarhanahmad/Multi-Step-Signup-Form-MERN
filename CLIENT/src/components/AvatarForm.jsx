import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineChevronRight } from "react-icons/md";
import { useDispatch } from "react-redux";
import { TbCameraPlus } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { nextStep } from "../store/slices/authSlice";
import toast from "react-hot-toast";

const AvatarForm = () => {
  const { token } = useSelector((state) => state.auth);
  const [avatar, setAvatar] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //   onsubmit handler
  const createAvatar = async (e) => {
    e.preventDefault();
    // console.log("Avatar:", avatar);
    // console.log("Location:", location);
    try {
      if (token) {
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("location", location);
      }
      if (avatar === "") {
        toast.error("Please select avatar");
      } else if (location === "") {
        toast.error("Enter your Location");
      } else {
        dispatch(nextStep());
      }
    } catch (error) {
      console.log("error upload avatar : ", error);
    }
  };

  return (
    <div className="sm:w-3/4 w-[90%] mx-auto my-16">
      <h1 className="text-xl font-bold text-start mb-2">
        Welcome! Let's Create Your Profile
      </h1>
      <p className="text-xs opacity-80 text-start">
        Let others get to know you better! You can do these later
      </p>

      {/* Avatar field */}
      <form
        onSubmit={createAvatar}
        className="flex  flex-col items-start gap-7 my-10"
      >
        <div className=" flex flex-row-reverse items-center justify-center gap-5">
          {/* input */}
          <div
            className="flex flex-col gap-1 items-start
          "
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-slate-500 file:px-2 file:py-1
            file:rounded file:border
            file:text-xs file:font-semibold
            file:bg-white"
            />
            <div className="flex items-center opacity-60 text-xs">
              <MdOutlineChevronRight />{" "}
              <span>Or choose one of our defaults</span>
            </div>
          </div>
          {/* avatar */}
          <div className="flex flex-col gap-2 items-start">
            <h2 className="font-bold text-sm ">Add an avatar</h2>
            <div className=" overflow-hidden border-2 flex justify-center items-center border-gray-400 border-dashed rounded-full w-36 h-36">
              {avatar ? (
                <img
                  className="rounded-full w-full h-full object-cover"
                  name="image"
                  src={avatar}
                />
              ) : (
                <div className="text-gray-500 text-3xl">
                  <TbCameraPlus />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Location field */}
        <div className="flex flex-col items-start gap-2 w-full">
          <h2 className="text-sm font-bold">Add your location</h2>
          <input
            className="x w-1/2 outline-none bg-transparent border-b p-1"
            type="text"
            placeholder="Enter a location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="text-sm text-white bg-red-400 hover:bg-red-500 px-14 py-1 rounded border"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default AvatarForm;
