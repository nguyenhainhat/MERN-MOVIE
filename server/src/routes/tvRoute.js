const middlewareController = require("../controllers/middleWareController");
const router = require("express").Router();
const {
  TvController,
  EpisodesController,
  SeasonsController,
} = require("../controllers/tvControllers");

// Episodes
router.post("/episodes/", EpisodesController.createEpisode);
router.get("/episodes/", EpisodesController.getAllEpisodes);
router.get("/episodes/:id", EpisodesController.getAEpisode);
router.put("/episodes/:id", EpisodesController.updateEpisode);
router.delete("/episodes/:id", EpisodesController.deleteEpisode);

// Seasons
router.post("/seasons/", SeasonsController.createSeasons);
router.get("/seasons/", SeasonsController.getAllSeasons);
router.get("/seasons/:id", SeasonsController.getASeason);
router.put("/seasons/:id", SeasonsController.updateSeason);
router.delete("/seasons/:id", SeasonsController.deleteSeason);

// Tv
router.post("/", TvController.createTv);
router.get("/", TvController.getAllTv);
router.get("/:id", TvController.getTv);
router.get("/type/:type", TvController.getTypeTv);
router.get("/similar/:id", TvController.getSimilarTv);
router.put("/:id", TvController.updateTv);
router.delete("/:id", TvController.deleteTv);

module.exports = router;
