
const middlewareController = require("../controllers/middleWareController")
const authController = require("../controllers/authController")
const router = require("express").Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.post("/refresh", authController.reqRefreshToken)
router.post("/logout",middlewareController.verifyToken, authController.userLogout)




module.exports = router;