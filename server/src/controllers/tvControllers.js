const { Seasons, Tv, Episodes } = require("../models/Tv");

const TvController = {
  createTv: async (req, res) => {
    try {
      const newTv = await new Tv({
        idTv: req.body.idTv,
        type: req.body.type,
        title: req.body.title,
        overview: req.body.overview,
        backdrop_path: req.body.backdrop_path,
        popularity: req.body.popularity,
        first_air_date: req.body.first_air_date,
        seasons: req.body.seasons,
        episodes: req.body.episodes,
        genre_ids: req.body.genre_ids,
        cast: req.body.cast,
        vote_average: req.body.vote_average,
        status: req.body.status,
      });
      const tv = await newTv.save();
      console.log(tv.seasons, typeof tv.seasons);
      res.status(200).json(tv);
    } catch (error) {
      res.status(403).json(error);
    }
  },
  getAllTv: async (req, res) => {
    try {
      const getAllTv = await Tv.find();
      return res.status(200).json(getAllTv);
    } catch (error) {
      console.log(error);
      res.status(403).json(error);
    }
  },
  getTv: async (req, res) => {
    try {
      const tv = await Tv.findById(req.params.id).populate(
        "genre_ids cast seasons episodes"
      );
      res.status(200).json(tv);
    } catch (error) {
      console.log(error);
      res.status(403).json(error);
    }
  },
  updateTv: async (req, res) => {
    try {
      const updateTv = await Tv.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateTv);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteTv: async (req, res) => {
    try {
      await Seasons.deleteMany({ tv: req.params.id });
      await Episodes.deleteMany({ tv: req.params.id });
      await Tv.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

const SeasonsController = {
  createSeasons: async (req, res) => {
    try {
      const newSeasons = await new Seasons({
        tv: req.body.tv,
        season_number: req.body.season_number,
        episode_count: req.body.episode_count,
        backdrop_path: req.body.backdrop_path,
      });
      const savedSeasons = await newSeasons.save();
      if (req.body.tv) {
        // const tv = await Tv.findById(req.body.tv);
        await Tv.updateOne(
          { _id: req.body.tv },
          { $push: { seasons: savedSeasons._id } }
        );
      }
      // console.log(savedSeasons._id, savedSeasons);
      res.status(200).json(savedSeasons);
    } catch (error) {
      res.status(403).json(error);
    }
  },
  getAllSeasons: async (req, res) => {
    try {
      const getAllSeasons = await Seasons.find({});
      return res.status(200).json(getAllSeasons);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  getASeason: async (req, res) => {
    try {
      const getASeason = await Seasons.findById(req.params.id).populate();
      return res.status(200).json(getASeason);
    } catch (error) {
      console.log(error);
      res.status(403).json(error);
    }
  },
  updateSeason: async (req, res) => {
    try {
      const updateSeason = await Seasons.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateSeason);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteSeason: async (req, res) => {
    try {
      await Tv.updateMany(
        { seasons: req.params.id },
        { $pull: { seasons: req.params.id } }
      );
      await Seasons.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

const EpisodesController = {
  // src="https://www.2embed.ru/embed/tmdb/tv?id=92749&s=1&e=2"
  createEpisode: async (req, res) => {
    try {
      const newEpisodes = await new Episodes({
        tv: req.body.tv,
        idTv: req.body.idTv,
        season: req.body.season,
        air_date: req.body.air_date,
        episode_number: req.body.episode_number,
        name: req.body.name,
        overview: req.body.overview,
        image: req.body.image,
      });
      const savedEpisodes = await newEpisodes.save();
      if (req.body.tv) {
        console.log("a");
        const tv = await Tv.findById(req.body.tv);
        await tv.updateOne({ $push: { episodes: savedEpisodes._id } });
      }
      res.status(200).json(savedEpisodes);
    } catch (error) {
      res.status(403).json(error);
    }
  },
  getAllEpisodes: async (req, res) => {
    const idQuery = req.query.id;
    const seasonQuery = req.query.s;
    const episodeQuery = req.query.e;
    // "idTv": Number(idQuery),
    // "season": Number(seasonQuery),
    // "episode_number": Number(episodeQuery)

    try {
      if (idQuery) {
        if (seasonQuery) {
          const IdSeasonAggregate = await Episodes.aggregate([
            { $sample: { size: 10 } },
            {
              $match: {
                idTv: Number(idQuery),
                season: Number(seasonQuery),
              },
            },
          ]);
          return res.status(200).json(IdSeasonAggregate);
        }
        if (seasonQuery && episodeQuery) {
          const EpisodeSeasonIdAggregate = await Episodes.aggregate([
            { $sample: { size: 10 } },
            {
              $match: {
                idTv: Number(idQuery),
                season: Number(seasonQuery),
                episode_number: Number(episodeQuery),
              },
            },
          ]);
          return res.status(200).json(EpisodeSeasonIdAggregate);
        }
        const episodesIdAggregate = await Episodes.aggregate([
          { $sample: { size: 10 } },
          {
            $match: {
              idTv: Number(idQuery),
            },
          },
        ]);
        console.log(seasonQuery, episodeQuery);
        return res.status(200).json(episodesIdAggregate);
      } else {
        const getAllEpisodes = await Episodes.find();
        return res.status(200).json(getAllEpisodes);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  updateEpisode: async (req, res) => {
    try {
      const updateEpisodes = await Episodes.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateEpisodes);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteEpisode: async (req, res) => {
    try {
      await Tv.updateMany(
        { episodes: req.params.id },
        { $pull: { episodes: req.params.id } }
      );
      await Episodes.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { TvController, SeasonsController, EpisodesController };
