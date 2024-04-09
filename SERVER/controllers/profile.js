// profileHandler.js
const Profile = require("../models/Profile");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;

const createProfile = async (req, res) => {
  try {
    const userId = req.user;

    // Extract profile data from request body/file
    const { bio } = req.body;

    // Create or update the user's profile
    const profile = await Profile.findByIdAndUpdate(
      userId,
      { bio: bio },
      { new: true, upsert: true }
    );

    //    now update user schema with updated profile
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { profile: profile },
      { new: true }
    ).populate("profile");

    updatedUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "Profile created successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error creating or updating profile:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// UPLOAD AVATAR
const uploadAvatar = async (req, res) => {
  try {
    const userId = req.user;
    const { location } = req.body;
    // extract file and upload on cloudinary
    const avatar = req.files.image;
    console.log("avatar img: ", avatar);

    const supportedType = ["jpg", "jpeg", "png"];
    const fileType = avatar.name.split(".")[1].toLowerCase();
    const supportedFile = supportedType.includes(fileType);

    if (!supportedFile) {
      return res.status(400).json({
        success: false,
        message: "Image format not supported",
      });
    }

    const options = {
      folder: "avatar",
      resource_type: "image",
    };

    const response = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      options,
      (err, result) => {
        if (err) {
          console.log("getting error while uploading image");
          return res.json({
            message: "getting some error while uploading image",
          });
        }
        console.log("image uploaded : ", result);
      }
    );

    // Create or update the user's profile
    const profile = await Profile.findByIdAndUpdate(
      userId,
      { avatar: response.secure_url, location: location },
      { new: true, upsert: true }
    );

    //    now update user schema with updated profile
    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { profile: profile },
      { new: true }
    ).populate("profile");

    updatedUser.password = undefined;

    res.status(200).json({
      success: true,
      message: "avatar created successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error while uploading avatar:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createProfile, uploadAvatar };
