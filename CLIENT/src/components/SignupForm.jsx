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
  const [errorText, setErrorText] = useState("");
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
        navigate("/create-profile");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error signing up:", error);
      setErrorText(error.response.data.message);
    }
  };

  return (
    <div>
      <div className=" bg-[#ffe5b4] flex flex-col sm:flex-row w-full">
        {/* left side image */}
        <div className="sm:w-[40%] w-full justify-center flex flex-col mx-auto items-center sm:items-start p-12">
          <h1 className="text-2xl font-bold text-[#be8a2a] mb-4 font-serif">
            dribbble
          </h1>
          <p className="text-xl font-semibold text-[#835e1b]  mb-8">
            Discover the world’s top Designers & Creatives.
          </p>
          <div className=" overflow-hidden w-full sm:h-[330px] ">
            <img
              alt="Art by Peter Tarka"
              className="max-w-xs object-cover w-full"
              src="SignImage.png"
            />
          </div>

          <p className="text-sm text-gray-500 mt-4">Art by Peter Tarka</p>
        </div>

        {/* right side form */}
        <div className="sm:w-[60%] bg-white w-full p-16">
          <div className="flex justify-end">
            <p className="text-sm text-gray-600">
              Already a member?{" "}
              <a className="text-[#ea4c89]" href="#">
                Sign In
              </a>
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 flex flex-col  items-start"
          >
            <h2 className="text-4xl font-bold mb-6">Sign up to Dribbble</h2>
            <p className="text-sm text-red-500 mb-1">
              {errorText && <span>{errorText}</span>}
            </p>
            <div className="flex gap-3">
              <div className="flex flex-col items-start">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  aria-invalid="true"
                  className="border border-gray-300 outline-none rounded-md w-full mb-4 p-2 text-gray-700"
                  id="name"
                  name="name"
                  placeholder="John"
                  type="text"
                  {...register("name", {
                    required: "Please enter your name.",
                  })}
                />
              </div>
              <div className="flex flex-col items-start">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  aria-invalid="true"
                  className="border border-gray-300 outline-none rounded-md w-full mb-4 p-2 text-gray-700"
                  id="username"
                  name="username"
                  placeholder="smith"
                  type="text"
                  {...register("username", {
                    required: "Please enter your username.",
                  })}
                />
              </div>
            </div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-300 outline-none rounded-md w-3/4 mb-4 p-2 text-gray-700"
              id="email"
              name="email"
              placeholder="account@refero.design"
              type="email"
              {...register("email", {
                required: "Please enter your email.",
              })}
            />
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="border border-gray-300 outline-none rounded-md w-3/4 mb-4 p-2 text-gray-700"
              id="password"
              name="password"
              placeholder="6+ characters"
              type="password"
              {...register("password", {
                required: "Please enter password.",
              })}
            />
            <div className="flex items-start pt-1 mb-6">
              <input
                className="rounded text-[#ea4c89] mt-2 border-gray-300 outline-none focus:ring-[#ea4c89]"
                id="terms"
                type="checkbox"
              />
              <label
                className="ml-2 block text-start text-sm text-gray-600"
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
            <button className="bg-[#ea4c89] w-fit text-white rounded-md py-3 px-6 font-medium">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
