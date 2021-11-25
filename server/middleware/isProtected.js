const isProtected = (req, res, next) => {
  const { user } = req?.session;

  if (user === undefined || user === null) {
    return res.status(401).json({
      errors: ["unauthorized"],
    });
  }

  next();
};

module.exports = { isProtected };
