const useController = require("../controllers/userController");
const middleWareController = require("../controllers/middleWareController");

const router = require("express").Router();

// comment

router.post("/comment", useController.CreateCommentsMovie);

router.get("/comment", useController.GetAcomment);

router.delete("/comment/:id", useController.DeleteComment);

// user
router.get("/stats", useController.getUserStats);

router.get("/", useController.getAllUsers);

router.get("/:id", useController.getUser);

router.put("/:id", useController.updateUser);

router.delete("/:id", useController.deleteUsers);

module.exports = router;
