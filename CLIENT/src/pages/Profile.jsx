import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import VerifyMail from "../components/VerifyMail";
import Footer from "../components/Footer";

const Profile = () => {
  const { user, step, token, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // console.log("user : ", user);
  // console.log("step : ", step);
  // console.log("token : ", token);
  // console.log("avatar : ", avatar);


  return (
    <div>
      {/* navbar */}
      <Navbar user={user} avatar={avatar} />

      <div>
        <VerifyMail user={user} />
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default Profile;
