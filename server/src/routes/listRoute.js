const middlewareController = require("../controllers/middleWareController")
const router = require("express").Router();
const listController = require("../controllers/listController")

router.post("/",middlewareController.verifyTokenAdmin, listController.createList)
router.put("/:id",middlewareController.verifyTokenAdmin ,listController.updateList)
router.delete("/:id", middlewareController.verifyTokenAdmin, listController.deleteList)
router.get("/",middlewareController.verifyTokenAdmin, listController.getAllList)

module.exports = router;

