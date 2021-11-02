const { body, validationResult } = require("express-validator");

const userRegisterRules = () => {
  return [
    body("username")
      .notEmpty()
      .withMessage("Value is required")
      .isAlpha()
      .withMessage("Value must be only alphabetical chars")
      .isLength({ min: 3 })
      .withMessage("Value must be at least 3 chars long")
      .trim()
      .escape(),
    body("email")
      .notEmpty()
      .withMessage("Value is required")
      .isEmail()
      .withMessage("Value is not proper email address")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Value is required")
      .isLength({ min: 3 })
      .withMessage("Value must be at least 3 chars long")
      .trim(),
    body("confirm")
      .notEmpty()
      .withMessage("Value is required")
      .isLength({ min: 3 })
      .withMessage("Value must be at least 3 chars long")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return false;
        }
        return true;
      })
      .withMessage("Password confirmation does not match password"),
  ];
};

const userRegisterValidation = (req, res, next) => {
  const errors = validationResult(req);

  req.userRegisterErrors = errors.array().map((error) => ({ [error.param]: error.msg })) || [];

  return next();
};

const userLoginRules = () => {
  return [
    body("email")
      .notEmpty()
      .withMessage("Value is required")
      .isEmail()
      .withMessage("Value is not proper email address")
      .normalizeEmail(),
    body("password")
      .notEmpty()
      .withMessage("Value is required")
      .isLength({ min: 3 })
      .withMessage("Value must be at least 3 chars long")
      .trim(),
  ];
};

const userLoginValidation = (req, res, next) => {
  const errors = validationResult(req);

  req.userLoginErrors = errors.array().map((error) => ({ [error.param]: error.msg })) || [];

  return next();
};

module.exports = {
  userRegisterRules,
  userRegisterValidation,
  userLoginRules,
  userLoginValidation,
};
