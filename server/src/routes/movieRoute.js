const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const movieController = require("../controllers/movieController")

// Movie
router.post("/", movieController.createMovie)
router.get("/", movieController.getAllMovie)
router.get("/:id", movieController.getMovie)
router.get("/type/:type", movieController.getTypeMovie)
router.get("/similar/:id", movieController.getSimilarMovie)
router.put("/:id" ,movieController.updateMovie)
router.delete("/:id", movieController.deleteMovie)
// router.get("/:type", movieController.getTypeMovie)



module.exports = router;

