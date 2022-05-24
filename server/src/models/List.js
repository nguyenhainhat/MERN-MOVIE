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
  }
});


let Genre = mongoose.model("Genre", genreSchema);
let Cast = mongoose.model("Cast", castSchema);

module.exports = { Cast, Genre };
