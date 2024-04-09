const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Profile = require("../models/Profile");

// SIGNUP HANDLER
const signup = async (req, res) => {
  try {
    // Extract user data from request body
    const { name, username, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      // Generate JWT token
      const token = jwt.sign(
        { userId: existingUser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        }
      );

      // Set the token in cookies
      res.cookie("token", token, { httpOnly: true });

      return res.status(400).json({
        success: false,
        message: "Email is already registered",
        token: token,
      });
    }

    // if username already been taken
    const existingUserName = await User.findOne({ username });
    if (existingUserName) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });
    }

    // Check if the password meets the length requirement
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a null profile to set as default
    const profile = await Profile.create({
      avatar: "",
      location: "",
      bio: "",
    });

    // now create user and insert in db
    const user = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword,
      profile: profile._id,
    });

    user.password = undefined;

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "48h",
    });

    // Set the token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      expires: new Date(Date.now() + 50000),
    });

    // Return success response with token
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: user,
      token: token,
    });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({
      success: false,
      message: "Registration failed!",
    });
  }
};

// GET LOGGEDIN USER
const getUser = async (req, res) => {
  try {
    // Get the user ID from the request object
    const userId = req.user;

    console.log("user from req : ", userId);

    // Find the user by their ID
    const user = await User.findById(userId)
      .populate("profile")
      .select("-password");

    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ success: true, message: "User found", user: user });
  } catch (error) {
    console.error("Error finding user by ID:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { signup, getUser };
