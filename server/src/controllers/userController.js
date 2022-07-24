// const User = require("../models/User");
const { User, UserCommentMovie } = require("../models/User");

const bcryt = require("bcrypt");
// const CryptoJS = require("crypto-js");
const userController = {
  updateUser: async (req, res) => {
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

  CreateCommentsMovie: async (req, res) => {
    try {
      const newComment = await new UserCommentMovie({
        movie: req.body.movie,
        tv: req.body.tv,
        user: req.body.user,
        comment: req.body.comment,
      });
      const comment = await newComment.save();
      if (req.body.user) {
        // const tv = await Tv.findById(req.body.tv);
        await User.updateOne(
          { _id: req.body.user },
          { $push: { comment: comment._id } }
        );
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(403).json(error);
    }
  },

  GetAcomment: async (req, res) => {
    try {
      const getCommentUser = await UserCommentMovie.find(req.params.id).populate(
        "movie user tv"
      );
      res.status(200).json(getCommentUser);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  },

  DeleteComment: async (req, res) => {
    try {
      await User.updateMany(
        { comment: req.params.id },
        { $pull: { comment: req.params.id } }
      );
      const DeleteComment = await UserCommentMovie.findByIdAndDelete(req.params.id)
      res.status(200).json(DeleteComment);
    } catch (error) {
      console.log(error)
      res.status(500).json(error);
    }
  }

};

module.exports = userController;
