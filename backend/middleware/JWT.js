const { sign, verify } = require("jsonwebtoken");

const createToken = (email) => {
  const accessToken = sign({ email }, "process.env.JWT_SECRET", {});
  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies["accessToken"];

  if (!accessToken) {
    return res
      .status(400)
      .json({ status: "failed", message: "user not authenticated" });
  }

  try {
    const validToken = verify(accessToken, "process.env.JWT_SECRET");
    if (validToken) {
      req.email = validToken.email;
      return next();
    }
  } catch (err) {
    res
      .status(400)
      .json({ status: "failed", err, message: "user not authenticated" });
  }
};
module.exports = { createToken, validateToken };
