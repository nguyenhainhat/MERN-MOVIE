const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const {castController, genreController} = require("../controllers/listController")

// Genre
router.post("/genre/",middlewareController.verifyTokenAdmin, genreController.createGenre)
router.get("/genre/",middlewareController.verifyTokenAdmin, genreController.getAllGenre)

// Cast
router.post("/cast/",middlewareController.verifyTokenAdmin, castController.createCast)
router.get("/cast/",middlewareController.verifyTokenAdmin, castController.getAllCast)



module.exports = router;

