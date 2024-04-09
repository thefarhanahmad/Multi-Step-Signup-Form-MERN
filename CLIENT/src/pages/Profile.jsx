import React from "react";
import AvatarForm from "../components/AvatarForm";
import BioSelect from "../components/BioSelect";

import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const { step } = useSelector((state) => state.auth);

  console.log("step in bio: ", step);
  return (
    <div>
      {step == 1 && <AvatarForm />}
      {step == 2 && <BioSelect />}
    </div>
  );
};

export default Profile;
