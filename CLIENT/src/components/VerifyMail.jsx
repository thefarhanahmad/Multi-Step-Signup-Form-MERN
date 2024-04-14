import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const VerifyMail = ({ user }) => {
  return (
    <div className="w-3/4 mx-auto flex flex-col items-center justify-center gap-3 py-8">
      <h1 className="text-xl font-semibold">Please Verify Your Email...</h1>
      <div>
        <MdOutlineMarkEmailRead className="text-8xl text-gray-700 " />
      </div>
      <p className="text-sm text-gray-700">
        Please verify your email address. We've sent a confirmation email to :{" "}
      </p>
      <span className="font-semibold">{user?.email}</span>
      <p className="text-sm text-gray-700">
        Click the confirmation link in that email to begin using Dribble.
      </p>
      <p className="text-sm text-gray-700">
        Didn't receive the email? check your spam folder, It may have been
        caught by a filter. If you still don't see it, You can{" "}
        <span className="text-red-600 font-semibold">
          resend the confirmation email.
        </span>
      </p>
      <p className="text-sm text-gray-700">
        Wrong email address ?{" "}
        <span className="text-red-600 font-semibold">Change it.</span>
      </p>
    </div>
  );
};

export default VerifyMail;
