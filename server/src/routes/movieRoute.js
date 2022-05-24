const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const movieController = require("../controllers/movieController")

// Movie
router.post("/",middlewareController.verifyTokenAdmin, movieController.createMovie)
router.put("/:id",middlewareController.verifyTokenAdmin ,movieController.updateMovie)
router.delete("/:id", middlewareController.verifyTokenAdmin, movieController.deleteMovie)
router.get("/",middlewareController.verifyTokenAdmin, movieController.getAllMovie)
router.get("/:id",middlewareController.verifyTokenAdmin, movieController.getMovie)



module.exports = router;

