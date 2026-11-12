const jwt = require("jsonwebtoken");

const userVerify = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(500).json({ msg: "not authorized" });
    return;
  }

  //   else
  try {
    const checkToken = jwt.verify(token, process.env.JWT_SECRET);

    console.log(checkToken, " from auth middleware");

    const { id } = checkToken;
    req.userId = id;

    next();
  } catch {
    res.status(500).json({ msg: "error to verify user" });
  }
};


module.exports=userVerify