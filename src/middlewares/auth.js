const jwt = require("jsonwebtoken");
const { promisefy } = require("util");

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisefy(jwt.verify)(token, process.env.APP_SECRET);
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).josn({ message: "Invalid token" });
  }
};
