const User = require("../models/User");
const bcryt = require("bcrypt");
// const CryptoJS = require("crypto-js");
const userController = {
  updateUser: async (req, res) => {
    if (req.user?.id === req.params.id || req.user?.admin) {
      if (req.body.password) {
        const salt = await bcryt.genSalt(10);
        const hashed = await bcryt.hash(req.body.password, salt);

        req.body.password = hashed;
      }
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateUser);
      } catch (error) {
        res.status(500).json(error);
      }
    } else return res.status(401).json("You can update only your account!");
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserStats: async (req, res) => {
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  comment: async (req, res) => {
    try {
      if (req.user?.id === req.params.id) {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: { comment: req.body.comment },
          },
          { new: true }
        );

        res.status(401).json(updateUser);
      } else return res.status(401).json("You can update only your account!");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  
};

module.exports = userController;
