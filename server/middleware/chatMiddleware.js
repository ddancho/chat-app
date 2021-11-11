const { body, validationResult } = require("express-validator");

const createConversationRules = () => {
  return [
    body("memberEmail")
      .notEmpty()
      .withMessage("Value is required")
      .isEmail()
      .withMessage("Value is not proper email address")
      .normalizeEmail()
      .custom((value, { req }) => {
        if (value === req.session.user.email) {
          return false;
        }
        return true;
      })
      .withMessage("Nice try :)"),
  ];
};

const createMessageRules = () => {
  return [
    body("senderId")
      .notEmpty()
      .withMessage("Value is required")
      .isNumeric()
      .withMessage("Value must be only numbers chars")
      .isLength({ min: 1 })
      .withMessage("Value must be at least 1 chars long")
      .trim()
      .escape()
      .custom((value, { req }) => {
        if (parseInt(value) !== req.session.user.id) {
          return false;
        }
        return true;
      })
      .withMessage("SenderId is not match with logged user"),
    body("senderName")
      .notEmpty()
      .withMessage("Value is required")
      .isString()
      .withMessage("Value must be only alphabetical chars")
      .isLength({ min: 1 })
      .withMessage("Value must be at least 1 chars long")
      .trim()
      .escape(),
    body("senderProfilePicture")
      .notEmpty()
      .withMessage("Value is required")
      .isString()
      .withMessage("Value must be only alphabetical chars")
      .isLength({ min: 1 })
      .withMessage("Value must be at least 1 chars long")
      .trim()
      .escape(),
    body("text")
      .notEmpty()
      .withMessage("Value is required")
      .isString()
      .withMessage("Value must be only alphabetical chars")
      .isLength({ min: 1 })
      .withMessage("Value must be at least 1 chars long")
      .trim()
      .escape(),
    body("conversationId")
      .notEmpty()
      .withMessage("Value is required")
      .isNumeric()
      .withMessage("Value must be only numbers chars")
      .isLength({ min: 1 })
      .withMessage("Value must be at least 1 chars long")
      .trim()
      .escape(),
  ];
};

const chatValidation = (req, res, next) => {
  const errors = validationResult(req);

  req.chatErrors = errors.array().map((error) => ({ [error.param]: error.msg })) || [];

  return next();
};

module.exports = {
  createConversationRules,
  createMessageRules,
  chatValidation,
};
