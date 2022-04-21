const useController = require("../controllers/userController");
const middleWareController = require("../controllers/middleWareController");

const router = require("express").Router();
router.get("/stats",middleWareController.verifyTokenAdmin, useController.getUserStats)

router.get("/", middleWareController.verifyToken, useController.getAllUsers);

router.get("/:id", middleWareController.verifyToken, useController.getUser);

router.post("/comment/:id", middleWareController.verifyToken, useController.comment);

router.put(
  "/update/:id",
  middleWareController.verifyToken,
  useController.updateUser
);

router.delete(
  "/delete/:id",
  middleWareController.verifyTokenAdmin,
  useController.deleteUsers
);


module.exports = router;
