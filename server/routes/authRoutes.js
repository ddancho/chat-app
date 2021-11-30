const router = require("express").Router();
const authController = require("../controllers/authController");
const { userRegisterRules, userLoginRules, authValidation } = require("../middleware/authMiddleware");
const { isProtected } = require("../middleware/isProtected");

router.post("/register", userRegisterRules(), authValidation, authController.register);
router.post("/login", userLoginRules(), authValidation, authController.login);
router.get("/logout", isProtected, authController.logout);

module.exports = router;
