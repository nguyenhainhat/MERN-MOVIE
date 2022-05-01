const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  
    name: {
      type: String,
      required: true,
      unique: true,
    },
});


const listSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

let Genre = mongoose.model("Genre", genreSchema);
let List = mongoose.model("List", listSchema);

module.exports = { List, Genre };
