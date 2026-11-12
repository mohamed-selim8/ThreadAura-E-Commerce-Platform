const jwt = require("jsonwebtoken");

const adminChecked = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    console.log(token);

    if (!token) {
      res.status(500).json({
        success: false,
        msg: "not authorized login again",
      });
    }

    //   else verify token
    const check_token = jwt.verify(token, process.env.JWT_SECRET);
    if (!check_token) {
      res.status(500).json({
        success: false,
        msg: "not authorized login again",
      });
    }

    //   else
    console.log(check_token, " from adminAuth");

    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = adminChecked;
