import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../store/slices/authSlice";

const SignupForm = () => {
  // state management
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();
  //   form submit handler
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    console.log("Form Data :", data);
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/signup`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("submitted data response: ", response);
      if (response.data.success) {
        localStorage.setItem("JWTtoken", response.data.token);
        dispatch(setToken(response.data.token));
        toast.success("Registration successfull");
        reset({
          name: "",
          username: "",
          email: "",
          password: "",
        });
        navigate("/profile");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error signing up:", error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[#ffe5b4] flex">
        <div className="w-1/2 flex flex-col justify-center items-center p-12">
          <h1 className="text-6xl font-bold text-[#ea4c89] mb-4">dribbble</h1>
          <p className="text-2xl text-gray-700 mb-8">
            Discover the world’s top Designers & Creatives.
          </p>
          <img
            alt="Art by Peter Tarka"
            className="max-w-xs"
            height="400"
            src="/placeholder.svg"
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
            width="600"
          />
          <p className="text-sm text-gray-500 mt-4">Art by Peter Tarka</p>
        </div>
        <div className="w-1/2 bg-white p-12">
          <div className="flex justify-end">
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <a className="text-[#ea4c89]" href="#">
                Sign In
              </a>
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-4xl font-bold mb-6">Sign up to Dribbble</h2>
            <p className="text-sm text-red-500 mb-1">
              Username has already been taken
            </p>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Name
            </label>
            <input
              aria-invalid="true"
              className="border border-red-300 rounded-md w-full mb-4 p-2 text-gray-700"
              id="username"
              name="username"
              placeholder="John"
              type="text"
            />
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-300 rounded-md w-full mb-4 p-2 text-gray-700"
              id="email"
              name="email"
              placeholder="account@refero.design"
              type="email"
            />
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 rounded-md w-full mb-4 p-2 text-gray-700"
              id="password"
              name="password"
              placeholder="6+ characters"
              type="password"
            />
            <div className="flex items-center mb-6">
              <input
                className="rounded text-[#ea4c89] border-gray-300 focus:ring-[#ea4c89]"
                id="terms"
                type="checkbox"
              />
              <label
                className="ml-2 block text-sm text-gray-600"
                htmlFor="terms"
              >
                Creating an account means you’re okay with our{" "}
                <a className="text-[#ea4c89]" href="#">
                  Terms of Service
                </a>
                ,{" "}
                <a className="text-[#ea4c89]" href="#">
                  Privacy Policy
                </a>
                , and our default{" "}
                <a className="text-[#ea4c89]" href="#">
                  Notification Settings
                </a>
                .
              </label>
            </div>
            <button className="bg-[#ea4c89] text-white rounded-md w-full py-3 font-medium">
              Create Account
            </button>
            <p className="text-xs text-gray-400 mt-4">
              This site is protected by reCAPTCHA and the Google{" "}
              <a className="text-[#ea4c89]" href="#">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a className="text-[#ea4c89]" href="#">
                Terms of Service
              </a>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
