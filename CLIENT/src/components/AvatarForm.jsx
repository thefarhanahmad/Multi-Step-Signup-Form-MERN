import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { nextStep } from "../store/slices/authSlice";

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
    console.log("Avatar:", avatar);
    console.log("Location:", location);
    try {
      if (token) {
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("location", location);
        dispatch(nextStep());
      }
    } catch (error) {
      console.log("error upload avatar : ", error);
    }
  };

  return (
    <div>
      <h1>Welcome, Let's Create Your Profile</h1>
      <p>Let others get to know you better! You can do these later</p>

      {/* Avatar field */}
      <form onSubmit={createAvatar}>
        <h2>Add an avatar</h2>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {avatar && (
          <div>
            <img
              name="image"
              src={avatar}
              alt="Profile Preview"
              style={{ maxWidth: "200px", maxHeight: "200px" }}
            />
          </div>
        )}

        {/* Location field */}
        <h2>Add your location</h2>
        <input
          type="text"
          placeholder="Enter a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AvatarForm;
