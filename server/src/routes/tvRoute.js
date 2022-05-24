const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const {TvController, EpisodesController, SeasonsController} = require("../controllers/tvControllers")

// Tv
router.post("/",middlewareController.verifyTokenAdmin, TvController.createTv)
router.get("/",middlewareController.verifyTokenAdmin, TvController.getAllTv)
router.get("/:id",middlewareController.verifyTokenAdmin, TvController.getTv)
router.put("/:id",middlewareController.verifyTokenAdmin, TvController.updateTv)
router.delete("/:id",middlewareController.verifyTokenAdmin, TvController.deleteTv)

// Seasons
router.post("/seasons/",middlewareController.verifyTokenAdmin, SeasonsController.createSeasons)
router.get("/seasons/",middlewareController.verifyTokenAdmin, SeasonsController.getAllSeasons)
router.get("/seasons/:id",middlewareController.verifyTokenAdmin, SeasonsController.getASeason)
router.put("/seasons/:id",middlewareController.verifyTokenAdmin, SeasonsController.updateSeason)
router.delete("/seasons/:id",middlewareController.verifyTokenAdmin, SeasonsController.deleteSeason)


// Episodes
router.post("/episodes/",middlewareController.verifyTokenAdmin, EpisodesController.createEpisode)
router.get("/episodes/",middlewareController.verifyTokenAdmin, EpisodesController.getAllEpisodes)
router.put("/episodes/:id",middlewareController.verifyTokenAdmin, EpisodesController.updateEpisode)
router.delete("/episodes/:id",middlewareController.verifyTokenAdmin, EpisodesController.deleteEpisode)


module.exports = router;

