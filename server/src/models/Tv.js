const mongoose = require("mongoose");

const TvSchema = new mongoose.Schema(
  {
    idTv: {
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
    first_air_date: {
      type: Date,
    },
    seasons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seasons",
      },
    ],
    episodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Episodes",
      },
    ],
    genre_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
      },
    ],
    cast: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cast",
      },
    ],
    vote_average: { type: Number },
    status: { type: String },
  },
  { timestamps: true }
);

const SeasonsSchema = new mongoose.Schema({
  tv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tv",
  },
  season_number: {
    type: Number,
  },
  episode_count: {
    type: Number,
  },
  backdrop_path: {
    type: String,
  },
});

const EpisodesSchema = new mongoose.Schema({
  tv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tv",
  },
  idTv: {
    type: Number,
    required: true,
  },
  season: {
    type: Number,
    required: true,
  },
  air_date: {
    type: Date,
  },
  episode_number: {
    type: Number,
  },
  name: {
    type: String,
    unique: true,
  },
  overview: {
    type: String,
  },
  image: {
    type: String,
  },
});

let Seasons = mongoose.model("Seasons", SeasonsSchema);

let Tv = mongoose.model("Tv", TvSchema);

let Episodes = mongoose.model("Episodes", EpisodesSchema);

module.exports = { Seasons, Tv, Episodes };
