const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const {listController, genreController} = require("../controllers/listController")

// Genre
router.post("/genre/",middlewareController.verifyTokenAdmin, genreController.createGenre)
router.get("/genre/",middlewareController.verifyTokenAdmin, genreController.getAllGenre)

// List
router.post("/",middlewareController.verifyTokenAdmin, listController.createList)
router.put("/:id",middlewareController.verifyTokenAdmin ,listController.updateList)
router.delete("/:id", middlewareController.verifyTokenAdmin, listController.deleteList)
router.get("/",middlewareController.verifyTokenAdmin, listController.getAllList)
router.get("/:id",middlewareController.verifyTokenAdmin, listController.getList)



module.exports = router;

