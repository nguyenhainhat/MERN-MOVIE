const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const {castController, genreController} = require("../controllers/listController")

// Genre
router.post("/genre/detail", genreController.createGenreDetail)
router.get("/genre/detail", genreController.getAllDetailGenre)
router.post("/genre/", genreController.createGenre)
router.get("/genre/", genreController.getAllGenre)

// Cast
router.post("/cast/detail", castController.createCastDetail)
router.post("/cast/", castController.createCast)
router.get("/cast/", castController.getAllCast)
router.put("/cast/:id", castController.updateCast)



module.exports = router;

