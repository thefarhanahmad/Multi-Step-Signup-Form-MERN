import React from "react";
import AvatarForm from "../components/AvatarForm";
import BioSelect from "../components/BioSelect";

import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { step } = useSelector((state) => state.auth);

  // console.log("step in bio: ", step);
  return (
    <div>
      <h1 className="text-xl font-serif text-red-500 text-start w-3/4 mx-auto pt-4">
        Dribble
      </h1>
      {step == 1 && <AvatarForm />}
      {step == 2 && <BioSelect />}
    </div>
  );
};

export default Profile;
