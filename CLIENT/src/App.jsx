import "./App.css";

import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

import { useDispatch, useSelector } from "react-redux";
import CreateProfile from "./pages/CreateProfile";
import axios from "axios";
import { useEffect } from "react";
import { setAvatarImg, setUser } from "./store/slices/authSlice";
import Profile from "./pages/Profile";

function App() {
  const { user, step, token, avatar } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // console.log("user : ", user);
  // console.log("step : ", step);
  // console.log("token : ", token);
  // console.log("avatar : ", avatar);

  // calling function to get loggedin user
  const apiUrl = import.meta.env.VITE_API_URL;
  const UserProfile = async () => {
    try {
      const res = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(setUser(res.data.user));
      dispatch(setAvatarImg(localStorage.getItem("avatar")));
      // console.log("loggedin user : ", res);
    } catch (error) {
      console.log("error to fetch user profile : ", error);
    }
  };

  useEffect(() => {
    UserProfile();
  }, [token]);

  return (
    <div className="text-center w-full ">
      {/* routes */}
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
