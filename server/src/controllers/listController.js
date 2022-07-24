const {
  Cast,
  Genre,
  GenreTypeSchema,
  CastTypeSchema,
} = require("../models/List");
const Movie = require("../models/Movie");
const { Tv } = require("../models/Tv");

const genreController = {
  createGenre: async (req, res) => {
    try {
      const newGenre = await new Genre({
        name: req.body.name,
      });
      const genre = await newGenre.save();
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllGenre: async (req, res) => {
    try {
      const genre = await Genre.find();
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  createGenreDetail: async (req, res) => {
    try {
      const newGenre = await new GenreTypeSchema({
        movie: req.body.movie,
        tv: req.body.tv,
        genre: req.body.genre,
      });
      const genreDetail = await newGenre.save();
      if (req.body.tv) {
        await Tv.updateOne(
          { _id: req.body.tv },
          { $push: { genre_ids: req.body.genre } }
        );
      }
      if (req.body.movie) {
        await Movie.updateOne(
          { _id: req.body.movie },
          { $push: { genre_ids: req.body.genre } }
        );
      }
      res.status(200).json(genreDetail);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },

  getAllDetailGenre: async (req, res) => {
    try {
      const genre = await Genre.find("tv movie genre");
      res.status(200).json(genre);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

const castController = {
  createCast: async (req, res) => {
    try {
      const newCast = await new Cast({
        name: req.body.name,
        backdrop_path: req.body.backdrop_path,
        tv: req.body.tv,
        movie: req.body.movie,
      });
      const cast = await newCast.save();
      if (req.body.tv) {
        const tv = await Tv.findById(req.body.tv);
        await tv.updateOne({ $push: { cast: cast._id } });
      }
      res.status(200).json(cast);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllCast: async (req, res) => {
    try {
      const cast = await Cast.find();
      res.status(200).json(cast);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCast: async (req, res) => {
    try {
      const updateCast = await Cast.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      if (req.body.tv) {
        const tv = await Tv.findById(req.body.tv);
        await tv.updateOne({ $push: { cast: updateCast._id } });
      }
      return res.status(200).json(updateCast);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  createCastDetail: async (req, res) => {
    try {
      const newCast = await new CastTypeSchema({
        cast: req.body.cast,
        tv: req.body.tv,
        movie: req.body.movie,
      });
      const castDetail = await newCast.save();
      if (req.body.tv) {
        await Tv.updateOne(
          { _id: req.body.tv },
          { $push: { cast: req.body.cast } }
        );
      }
      if (req.body.movie) {
        await Movie.updateOne(
          { _id: req.body.movie },
          { $push: { cast: req.body.cast } }
        );
      }
      res.status(200).json(castDetail);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { castController, genreController };
