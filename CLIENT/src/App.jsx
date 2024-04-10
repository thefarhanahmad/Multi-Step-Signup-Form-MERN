import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

import { useDispatch, useSelector } from "react-redux";
import Profile from "./pages/Profile";
import axios from "axios";
import { useEffect } from "react";
import { setUser } from "./store/slices/authSlice";

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
      console.log("loggedin user : ", res);
    } catch (error) {
      console.log("error to fetch user profile : ", error);
    }
  };

  useEffect(() => {
    UserProfile();
  }, [token]);

  return (
    <div className="text-center w-full bg-red-400">
      {/* navbar */}
      {/* {user && token && avatar && <Navbar />} */}

      {/* routes */}
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
