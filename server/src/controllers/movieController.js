const Movie = require("../models/Movie");

const movieController = {
    createMovie: async (req, res) => {
      try {
        const newMovie = await new Movie({
          idMovie: req.body.idMovie,
          type: req.body.type,
          title: req.body.title,
          overview: req.body.overview,
          backdrop_path: req.body.backdrop_path,
          popularity: req.body.popularity,
          release_date: req.body.release_date,
          genre_ids: req.body.genre_ids,
          vote_average: req.body.vote_average,
          status: req.body.status,
          cast: req.body.cast,
        });
        const movie = await newMovie.save();
        res.status(200).json(movie);
      } catch (error) {
        res.status(403).json(error);
      }
    },
    getAllMovie: async (req, res) => {
      // let movie = [];
      // const typeQuery = req.query.type;
      const genreQuery = req.query.genre;
      const find = await Movie.find({
        "genre_ids": {_id: genreQuery} 
      });
      console.log(find)
      try {
        if (genreQuery) {
          find.reduce(async (a, item) => {
            return await Movie.aggregate([
              { $sample: { size: 10 } },
              { $match: { genre_ids: item._id } },
            ]);
          });
          return res.status(200).json(find);
        } 
         else {
          const getAllMovie = await Movie.find();
          return res.status(200).json(getAllMovie);
        }
      } catch (error) {
        console.log(error);
        res.status(403).json(error);
      }
    },
    getMovie: async (req, res) => {
      try {
        const movie = await Movie.findById(req.params.id).populate("genre_ids cast");
        res.status(200).json(movie);
      } catch (error) {
        console.log(error);
        res.status(403).json(error);
      }
    },
    updateMovie: async (req, res) => {
      try {
        const updateMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateMovie);
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    },
    deleteMovie: async (req, res) => {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    },
  };  
  
  module.exports = movieController;
  