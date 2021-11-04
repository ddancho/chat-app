const router = require("express").Router();
const authController = require("../controllers/authController");
const { userRegisterRules, userLoginRules, authValidation } = require("../middleware/authMiddleware");

router.post("/register", userRegisterRules(), authValidation, authController.register);
router.post("/login", userLoginRules(), authValidation, authController.login);
router.get("/logout", authController.logout);

module.exports = router;
