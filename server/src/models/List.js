const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const castSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  backdrop_path: {
    type: String,
    required: true,
  },
});

const genreDetailSchema = new mongoose.Schema({
  tv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tv",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
});

const castDetailSchema = new mongoose.Schema({
  tv: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tv",
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },
  cast: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cast",
  },
});

let Genre = mongoose.model("Genre", genreSchema);
let Cast = mongoose.model("Cast", castSchema);
let GenreTypeSchema = mongoose.model("GenreType", genreDetailSchema);
let CastTypeSchema = mongoose.model("CastType", castDetailSchema);

module.exports = { Cast, Genre, GenreTypeSchema, CastTypeSchema };
