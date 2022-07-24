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
        trailer: req.body.trailer,
        video: req.body.video,
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
    const movieQuery = req.query.sort;
    const find = await Movie.find();
    try {
      if (movieQuery) {
        const movieQueryAggregate = await Movie.aggregate([
          { $sample: { size: 10 } },
          {
            $match: {
              status: "visible",
            },
          },
          { $sort: { vote_average: -1 } },
        ]);
        return res.status(200).json(movieQueryAggregate);
      }else {
        return res.status(200).json(find);
      }
    } catch (error) {
      console.log(error);
     return res.status(403).json(error);
    }
  },
  getMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id).populate("genre_ids cast");
      return res.status(200).json(movie);
    } catch (error) {
      console.log(error);
      return res.status(403).json(error);
    }
  },

  getTypeMovie: async (req, res) => {
    const typeMovie = req.params.type;
    try {
      switch (typeMovie) {
        case "trending":
          const trendingQueryAggregate = await Movie.aggregate([
            {
              $match: {
                popularity: { $gt: 100 },
                vote_average: { $gte: 6 },
                status: "visible",
              },
            },
            { $sort: { vote_average: -1 } },
          ]);
          return res.status(200).json(trendingQueryAggregate);
        case "vote":
          const voteQueryAggregate = await Movie.aggregate([
            {
              $match: {
                popularity: { $lte: 100 },
                status: "visible",
              },
            },
            { $sort: { vote_average: -1 } },
          ]);
          return res.status(200).json(voteQueryAggregate);
        default:
         
          return res.status(403).json("Check again type movie");
      }
    } catch (error) {
      console.log(error);
      return res.status(403).json(error);
    }
  },
  getSimilarMovie: async (req, res) => {
    const idGenreMovie = req.params.id;
    try {
      const similarMovie = await Movie.find({
        genre_ids: { _id: idGenreMovie },
      });
      return res.status(200).json(similarMovie);
    } catch (error) {
      console.log(error);
      return res.status(403).json(error);
    }
  },
  updateMovie: async (req, res) => {
    try {
      const updateMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(200).json(updateMovie);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  },
  deleteMovie: async (req, res) => {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      return res.status(200).json("Delete successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};

module.exports = movieController;
// if (genreQuery) {
//   find.reduce(async (a, item) => {
//     return await Movie.aggregate([
//       { $sample: { size: 10 } },
//       { $match: { genre_ids: item._id, status: "visible" } },
//     ]);
//   });
// }
