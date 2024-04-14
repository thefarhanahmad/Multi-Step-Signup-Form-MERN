import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const BioSelect = () => {
  const [bio, setBio] = useState("");
  // console.log("bio : ", bio);

  const bioData = [
    {
      for: "bio1",
      bio: "I'm a designer looking to share my work",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8XiRUq6Rx4lA8E8Y6I5rZ5Pi792xSEQqRJwXbxmMoBx9r1C6zMowM2PRxPjhu0WxKbcc&usqp=CAU",
    },
    {
      for: "bio2",
      bio: "I'm looking to hire a designer",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_J5Bzg30sSEmMqHQlJkuzviIicp-ai4wKVhVtHTPPVRPn9dKK2AHdjVC_rlSd4k51U0A&usqp=CAU",
    },
    {
      for: "bio3",
      bio: "I'm looking for design inspiration",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAFYuUJxvWZC8ho2phd4gryhYUGIM-ySSFERnEnpEH4EI3yZDY0vLYgX7k7OsFWaNvC9s&usqp=CAU",
      caption:
        "With over 7 million shots from a vast community of designers, Dribbles is the leading source for design inspiration.",
    },
  ];

  // Function to handle radio button change
  const handleOptionChange = (event) => {
    setBio(event.target.value);
  };

  // handle submit
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (bio === "") {
      toast.error("Please Select the Bio");
    } else {
      toast.success("Profile created successfully");
      navigate("/profile");
    }
  };

  return (
    <div className="sm:w-3/4 w-[90%] mx-auto flex flex-col gap-4 my-10">
      {/* headers */}
      <div className="mb-10">
        <h1 className="text-xl font-bold ">What brings you to Dribble?</h1>
        <p className="text-xs opacity-80">
          Select the options that best describe you. Don't worry, You can
          explore other options later.
        </p>
      </div>

      {/* images buttons */}
      <div className="flex gap-5 flex-wrap">
        {bioData.map((bio, i) => (
          <div key={i} className="border-2 border-red-400 w-[30%] rounded-xl ">
            <label
              className="flex flex-col  gap-2 items-center justify-center p-2"
              htmlFor={bio.for}
            >
              {/* image  */}
              <div className="w-full h-36  overflow-hidden rounded-t">
                <img
                  src={bio.img}
                  alt="bio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm flex flex-col gap-0 font-bold">
                {bio.bio}
                {/* <span className="text-[9px] opacity-75 font-semibold leading-3">
                  {bio.caption}
                </span> */}
              </div>

              <input
                type="radio"
                name="bio"
                value={bio.for}
                id={bio.for}
                onChange={handleOptionChange}
                className="h-6 w-6 accent-red-500 checked:bg-red-600"
              />
            </label>
          </div>
        ))}
      </div>

      {/*submit button */}
      <div className="flex flex-col items-center justify-center gap-1">
        <p className="text-sm font-semibold mb-2">
          Anything else ? You can select multiple
        </p>
        <button
          onClick={handleSubmit}
          className="text-sm text-white bg-red-400 hover:bg-red-500 px-14 py-1 rounded border"
        >
          Finish
        </button>
        <span className="text-xs opacity-70">or Press RETURN</span>
      </div>
    </div>
  );
};

export default BioSelect;
