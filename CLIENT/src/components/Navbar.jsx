import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user,avatar } = useSelector((state) => state.auth);

  return (
    <div className="w-11/12 bg-gray-600 mx-auto h-16 flex justify-between items-center">
      <div> Dribble</div>
      <div>{user?.name}</div>
      <img src={avatar} width={40} alt="avatar" />
    </div>
  );
};

export default Navbar;
