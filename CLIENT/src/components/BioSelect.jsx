import React, { useState } from "react";
import axios from "axios";

import { useSelector } from "react-redux";

const BioSelect = () => {
  const { token } = useSelector((state) => state.auth);
  const [selectedBio, setSelectedBio] = useState(""); // State to store the selected option
  console.log("slected bio : ", selectedBio);

  const handleBioChange = (event) => {
    setSelectedBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const res = await axios.post(`${apiUrl}/profile`, selectedBio, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("bio updated : ", res);
    } catch (error) {
      console.log("error to update bio : ", error);
    }
  };

  return (
    <div>
      <h1>Choose a Bio</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            id="bio1"
            name="bio"
            value="Bio 1"
            checked={selectedBio === "Bio 1"}
            onChange={handleBioChange}
          />
          <label htmlFor="bio1">Bio 1</label>
        </div>
        <div>
          <input
            type="radio"
            id="bio2"
            name="bio"
            value="Bio 2"
            checked={selectedBio === "Bio 2"}
            onChange={handleBioChange}
          />
          <label htmlFor="bio2">Bio 2</label>
        </div>
        <div>
          <input
            type="radio"
            id="bio3"
            name="bio"
            value="Bio 3"
            checked={selectedBio === "Bio 3"}
            onChange={handleBioChange}
          />
          <label htmlFor="bio3">Bio 3</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BioSelect;
