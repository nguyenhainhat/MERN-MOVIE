const List = require("../models/List");

const listController = {
  createList: async (req, res) => {
    try {
      const newList = await new List({
        idMovie: req.body.idMovie,
        type: req.body.type,
        title: req.body.title,
        overview: req.body.overview,
        backdrop_path: req.body.backdrop_path,
        popularity: req.body.popularity,
        release_date: req.body.release_date,
        genre_ids: req.body.genre_ids,
        vote_average: req.body.vote_average,
      });
      const list = await newList.save();
      res.status(200).json(list);
    } catch (error) {
      res.status(403).json(error);
    }
  },
  getAllList: async (req, res) => {
    let list = [];
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    const find = await List.find({ genre_ids: { $eq: Number(genreQuery) } });
    let storeReduce = [];
    find.filter((item) => storeReduce.push(item));
    try {
      if (typeQuery) {
        if (genreQuery) {
          storeReduce.reduce(async (a, item) => {
            return (list = await List.aggregate([
              { $sample: { size: 10 } },
              { $match: { type: typeQuery, genre_ids: item.genre_ids } },
            ]));
          });
          return res.status(200).json(storeReduce);
        } else {
          list = await List.aggregate([
            { $match: { type: typeQuery } },
          ]);
          return res.status(200).json(list);
        }
      }
     else {
       const getAllList = await List.find()
       return res.status(200).json(getAllList);
     }
    } catch (error) {
      console.log(error);
      res.status(403).json(error);
    }
  },
  updateList: async (req, res) => {
    try {
      const updateList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updateList);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
  deleteList: async (req, res) => {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = listController;
