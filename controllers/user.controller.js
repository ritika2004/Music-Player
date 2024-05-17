const User = require("../models/User.js");
const { songs, seedSongs } = require("../seeds/songSeed");

const generateToken = async (id) => {
  try {
    const user = await User.findOne(id);
    const accessToken = await user.generateAcessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validityBeforeSave: false }); //
    return { accessToken, refreshToken };
  } catch (error) {
    return "error while generating tokens";
  }
};

const registerUser = async (req, res) => {
  let { name, email, password } = req.body; //destructuring
  console.log(req.body);
  if ([name, email, password].some((field) => field.trim() === "")) {
    return res.status(400).json({
      message: "All fields required",
    });
  }
  const existedUser = await User.findOne({
    $or: [{ name, email }],
  });

  if (existedUser) {
    return res.status(409).json({
      message: "User Already Exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (!user) {
    return res.status(500).json({
      message: "cant create user",
    });
  }
  res.redirect("/");
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  console.log(req.body);
  if (email === null || password === null) {
    return res.status(400).json({
      message: "user details required",
    });
  }
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) return res.render("userNotFound");
  const validpass = await user.isPasswordCorrect(password);
  if (!validpass) return res.render("incorrectPassword");
  const { accessToken, refreshToken } = await generateToken(user._id);
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);
  res.redirect("/");
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: null,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .redirect("/login");
  // .json({
  //   message: "user loggedout successfully",
  //   user: await User.findById(req.user._id),
  // });
};

module.exports = { registerUser, loginUser, logoutUser };
