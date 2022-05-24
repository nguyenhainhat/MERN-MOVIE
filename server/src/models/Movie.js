const mongoose = require("mongoose");
const {Genre} = require("../models/List")

const MovieSchema = new mongoose.Schema(
  {
    idMovie: {
      type: Number,
      required: true,
    },
    type: { type: String, required: true },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    overview: {
      type: String,
    },
    backdrop_path: {
      type: String,
    },
    popularity: {
      type: Number,
    },
    release_date: {
      type: Date,
    },
    genre_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    vote_average: { type: Number },
    status: { type: String, required: true },
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cast",
      },
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
