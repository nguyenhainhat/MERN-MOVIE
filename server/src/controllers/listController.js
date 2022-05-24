const { Cast, Genre } = require("../models/List");

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
};

const castController = {
  createCast: async (req, res) => {
    try {
      const newCast = await new Cast({
        name: req.body.name,
        backdrop_path: req.body.backdrop_path,
      });
      const cast = await newCast.save();
      
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
}



module.exports = { castController, genreController };
