const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
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
    genre_ids: { type: Array },
    vote_average: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
