const User = require("../models/User");
const bcryt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  registerUser: async (req, res) => {
    try {
      const salt = await bcryt.genSalt(10);
      const hashed = await bcryt.hash(req.body.password, salt);

      // Create new user
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      const user = await newUser.save();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  //  GENERATE ACCESS TOKEN
  generateAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "5day" }
    );
  },

  // GENERATE REFRESH TOKEN
  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        admin: user.admin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "5day" }
    );
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      const password = await bcryt.compare(req.body.password, user.password);
      if (!user && !password) {
        return res.status(404).json("Wrong username or password");
      }
      if (user && password) {
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        // await refreshToken.save()
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { password, ...other } = user._doc;

        res.status(200).json({ ...other, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  reqRefreshToken: async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) res.status(401).json("You're not authenticated");
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) console.log(err);
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({ accessToken: newAccessToken });
    });
  },

  userLogout: async (req, res) => {
    res.clearCookie("refreshToken");
    // await refreshToken.remove()
    res.status(200).json("Logged out!");
  },
};

module.exports = authController;
