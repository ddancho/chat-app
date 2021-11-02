const router = require("express").Router();
const authController = require("../controllers/authController");
const {
  userRegisterRules,
  userRegisterValidation,
  userLoginRules,
  userLoginValidation,
} = require("../middleware/authMiddleware");

router.post("/register", userRegisterRules(), userRegisterValidation, authController.register);
router.post("/login", userLoginRules(), userLoginValidation, authController.login);
router.get("/logout", authController.logout);

module.exports = router;
